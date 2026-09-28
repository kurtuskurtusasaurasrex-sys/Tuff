package com.sigmacinematic.music;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.util.Text;
import net.kyori.adventure.resource.ResourcePackInfo;
import net.kyori.adventure.resource.ResourcePackRequest;
import net.kyori.adventure.resource.ResourcePackStatus;
import net.kyori.adventure.sound.Sound;
import net.kyori.adventure.sound.SoundStop;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerQuitEvent;
import org.bukkit.scheduler.BukkitTask;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;

/**
 * Plays music from YouTube (or any site yt-dlp supports) to vanilla clients.
 *
 * <p>How it works: yt-dlp downloads the audio, ffmpeg converts it to Ogg Vorbis, the song is wrapped in
 * a tiny resource pack, the built-in web server (or a free file host) hands that pack to each listener's game, and once
 * their game has loaded it the plugin plays it as a normal sound. Songs are cached, so replays are instant.
 */
public final class MusicManager implements Listener {

    private record Playing(Track track, boolean loop, BukkitTask loopTask) {
    }

    private final SigmaCinematic plugin;
    private final File dir;
    private final File indexFile;
    private final AudioTools tools;
    private final PackServer server;

    private final Map<String, Track> tracks = Collections.synchronizedMap(new LinkedHashMap<>());
    private final Map<String, CompletableFuture<Track>> downloads = new ConcurrentHashMap<>();
    /** Main thread only. */
    private final Map<UUID, Set<UUID>> loadedPacks = new HashMap<>();
    private final Map<UUID, Playing> playing = new HashMap<>();
    /** File-host links per track id, when songs are uploaded instead of served by our web server. */
    private final Map<String, FileHosts.Hosted> uploads = new ConcurrentHashMap<>();
    private final Map<String, CompletableFuture<URI>> uploading = new ConcurrentHashMap<>();
    /** Upload hosts players' games couldn't download from this session; skipped until restart or reload. */
    private final Set<String> failedHosts = ConcurrentHashMap.newKeySet();

    /** Still usable for a fresh download (with 10 minutes to spare). */
    private static boolean fresh(FileHosts.Hosted hosted) {
        return hosted.expiresAt() - System.currentTimeMillis() > 10 * 60 * 1000L;
    }

    private volatile String baseUrl;
    private volatile boolean serverRunning;
    /** In "auto" mode: the web address players couldn't reach, so we upload instead while it stays the same. */
    private volatile String unreachableUrl;

    public MusicManager(SigmaCinematic plugin) {
        this.plugin = plugin;
        this.dir = new File(plugin.getDataFolder(), "music");
        this.indexFile = new File(dir, "tracks.yml");
        this.tools = new AudioTools(plugin);
        this.server = new PackServer(id -> {
            Track track = tracks.get(id);
            return track == null ? null : track.pack();
        });
    }

    // ---------------------------------------------------------------- lifecycle

    public void start() {
        dir.mkdirs();
        loadIndex();
        unreachableUrl = YamlConfiguration.loadConfiguration(stateFile()).getString("unreachable-url");
        warmUp();
        if (hostSetting().equals("upload")) {
            plugin.getLogger().info("Music packs will be uploaded to a file host (music.pack-host: upload).");
            return;
        }
        if (!plugin.getConfig().getBoolean("music.web-server.enabled", true)) {
            plugin.getLogger().warning("music.web-server.enabled is false"
                    + (hostSetting().equals("self") ? " and pack-host is self - /scmusic will not work." : " - songs will be uploaded instead."));
            return;
        }
        String bind = plugin.getConfig().getString("music.web-server.bind-address", "0.0.0.0");
        int port = plugin.getConfig().getInt("music.web-server.port", 8163);
        try {
            server.start(bind, port);
            serverRunning = true;
        } catch (IOException ex) {
            plugin.getLogger().log(Level.SEVERE, "Could not start the music web server on port " + port
                    + " - change music.web-server.port in config.yml", ex);
            return;
        }
        resolveBaseUrl(port);
    }

    /** Gets yt-dlp, ffmpeg and deno ready in the background so the first /scmusic play is quicker. */
    private void warmUp() {
        plugin.async().execute(() -> {
            try {
                tools.prepare();
            } catch (IOException ex) {
                plugin.getLogger().warning("Music: " + ex.getMessage());
            }
        });
    }

    private String hostSetting() {
        String setting = Text.lower(plugin.getConfig().getString("music.pack-host", "auto"));
        return switch (setting) {
            case "self" -> "self";
            case "upload", "litterbox" -> "upload";
            default -> "auto";
        };
    }

    /** True when songs should be uploaded to a file host rather than served by our own web server. */
    private boolean uploadMode() {
        return switch (hostSetting()) {
            case "upload" -> true;
            case "self" -> false;
            default -> !serverRunning || (unreachableUrl != null && unreachableUrl.equals(baseUrl));
        };
    }

    private File stateFile() {
        return new File(dir, "state.yml");
    }

    private void rememberUnreachable(String url) {
        unreachableUrl = url;
        YamlConfiguration yml = new YamlConfiguration();
        yml.set("unreachable-url", url);
        try {
            yml.save(stateFile());
        } catch (IOException ex) {
            plugin.getLogger().log(Level.WARNING, "Could not save music/state.yml", ex);
        }
    }

    public void shutdown() {
        for (Playing p : playing.values()) {
            if (p.loopTask() != null) {
                p.loopTask().cancel();
            }
        }
        playing.clear();
        server.stop();
        serverRunning = false;
    }

    public void reload() {
        tools.forget();
        failedHosts.clear();
        warmUp();
        if (serverRunning) {
            resolveBaseUrl(plugin.getConfig().getInt("music.web-server.port", 8163));
        }
    }

    private void resolveBaseUrl(int port) {
        String configured = plugin.getConfig().getString("music.web-server.public-url", "auto");
        if (configured != null && !configured.isBlank() && !configured.equalsIgnoreCase("auto")) {
            baseUrl = stripSlash(configured.contains("://") ? configured : "http://" + configured);
            plugin.getLogger().info("Music packs are served at " + baseUrl);
            return;
        }
        plugin.async().execute(() -> {
            String host = null;
            try {
                HttpClient http = HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(5)).build();
                HttpResponse<String> response = http.send(HttpRequest.newBuilder(URI.create("https://api.ipify.org"))
                        .timeout(Duration.ofSeconds(8)).build(), HttpResponse.BodyHandlers.ofString());
                if (response.statusCode() == 200 && response.body().trim().matches("[0-9a-fA-F.:]+")) {
                    host = response.body().trim();
                    if (host.contains(":")) {
                        host = "[" + host + "]";
                    }
                }
            } catch (Exception ex) {
                if (ex instanceof InterruptedException) {
                    Thread.currentThread().interrupt();
                }
            }
            if (host == null) {
                host = Bukkit.getIp() == null || Bukkit.getIp().isBlank() ? "127.0.0.1" : Bukkit.getIp();
            }
            baseUrl = "http://" + host + ":" + port;
            plugin.getLogger().info("Music packs are served at " + baseUrl
                    + " (auto-detected; set music.web-server.public-url if players can't hear music)");
        });
    }

    private static String stripSlash(String s) {
        return s.endsWith("/") ? s.substring(0, s.length() - 1) : s;
    }

    // ---------------------------------------------------------------- tracks

    public List<Track> tracks() {
        synchronized (tracks) {
            return new ArrayList<>(tracks.values());
        }
    }

    /** Finds a cached song by list number, id, or the exact link used before. */
    public Track find(String input) {
        List<Track> list = tracks();
        String key = input.startsWith("#") ? input.substring(1) : input;
        if (key.matches("\\d{1,4}")) {
            int index = Integer.parseInt(key) - 1;
            return index >= 0 && index < list.size() ? list.get(index) : null;
        }
        for (Track track : list) {
            if (track.id().equalsIgnoreCase(key) || track.url().equals(input)) {
                return track;
            }
        }
        return null;
    }

    public boolean delete(Track track) {
        tracks.remove(track.id());
        uploads.remove(track.id());
        saveIndex();
        return track.pack().delete();
    }

    private CompletableFuture<Track> download(String url) {
        CompletableFuture<Track> future = new CompletableFuture<>();
        CompletableFuture<Track> existing = downloads.putIfAbsent(url, future);
        if (existing != null) {
            return existing;
        }
        plugin.async().execute(() -> {
            try {
                future.complete(fetch(url));
            } catch (Throwable ex) {
                future.completeExceptionally(ex);
            } finally {
                downloads.remove(url, future);
            }
        });
        return future;
    }

    private Track fetch(String url) throws IOException {
        AudioTools.Meta meta = tools.metadata(url);
        int max = plugin.getConfig().getInt("music.max-duration-seconds", 900);
        if (max > 0 && meta.durationSeconds() > max) {
            throw new IOException("That is " + (meta.durationSeconds() / 60) + " minutes long; the limit is "
                    + (max / 60) + " minutes (music.max-duration-seconds in config.yml).");
        }
        String id = hash(meta.extractor() + ":" + meta.id());
        Track cached = tracks.get(id);
        if (cached != null && cached.pack().isFile()) {
            return cached;
        }
        File ogg = tools.downloadAudio(url, dir, id);
        int duration = meta.durationSeconds() > 0 ? meta.durationSeconds() : tools.probeDuration(ogg);
        File zip = new File(dir, id + ".zip");
        try {
            PackBuilder.build(id, meta.title(), ogg, zip);
        } finally {
            ogg.delete();
        }
        Track track = new Track(id, meta.title(), url, duration, zip, PackBuilder.sha1(zip));
        tracks.put(id, track);
        saveIndex();
        plugin.getLogger().info("Music: cached \"" + meta.title() + "\" (" + zip.length() / 1024 + " KB)");
        return track;
    }

    private static String hash(String s) {
        try {
            byte[] digest = MessageDigest.getInstance("SHA-1").digest(s.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(digest).substring(0, 16);
        } catch (NoSuchAlgorithmException ex) {
            throw new IllegalStateException(ex);
        }
    }

    private void loadIndex() {
        YamlConfiguration yml = YamlConfiguration.loadConfiguration(indexFile);
        for (String id : yml.getKeys(false)) {
            ConfigurationSection s = yml.getConfigurationSection(id);
            File zip = new File(dir, id + ".zip");
            if (s == null || !zip.isFile()) {
                continue;
            }
            try {
                tracks.put(id, new Track(id, s.getString("title", id), s.getString("url", ""),
                        s.getInt("duration", -1), zip, PackBuilder.sha1(zip)));
                String uploaded = s.getString("upload.url");
                if (uploaded != null) {
                    uploads.put(id, new FileHosts.Hosted(s.getString("upload.host", "?"), URI.create(uploaded), s.getLong("upload.expires")));
                }
            } catch (IOException ex) {
                plugin.getLogger().warning("Music: skipping unreadable " + zip.getName());
            }
        }
    }

    private synchronized void saveIndex() {
        YamlConfiguration yml = new YamlConfiguration();
        for (Track track : tracks()) {
            yml.set(track.id() + ".title", track.title());
            yml.set(track.id() + ".url", track.url());
            yml.set(track.id() + ".duration", track.durationSeconds());
            FileHosts.Hosted upload = uploads.get(track.id());
            if (upload != null) {
                yml.set(track.id() + ".upload.host", upload.host());
                yml.set(track.id() + ".upload.url", upload.uri().toString());
                yml.set(track.id() + ".upload.expires", upload.expiresAt());
            }
        }
        try {
            yml.save(indexFile);
        } catch (IOException ex) {
            plugin.getLogger().log(Level.WARNING, "Could not save music/tracks.yml", ex);
        }
    }

    // ---------------------------------------------------------------- playback

    public String status() {
        if (uploadMode()) {
            return "songs are uploaded to a file host (" + String.join(", ", uploadHosts()) + ")"
                    + (hostSetting().equals("auto") && serverRunning ? " (players couldn't reach " + baseUrl + ")" : "");
        }
        if (!serverRunning) {
            return "web server is OFF (see console)";
        }
        return baseUrl == null ? "starting..." : "packs served at " + baseUrl;
    }

    /** Plays a link (or a cached song) to the given players. Call on the main thread. */
    public void play(CommandSender sender, String input, List<Player> targets, boolean loop) {
        if (!uploadMode() && (!serverRunning || baseUrl == null)) {
            Text.error(sender, "Music is unavailable: <why>.", Text.arg("why", status()));
            return;
        }
        Track cached = find(input);
        if (cached != null) {
            start(sender, cached, targets, loop);
            return;
        }
        if (!input.contains(".") && !input.contains("://")) {
            Text.error(sender, "That isn't a link or a song from <white>/scmusic list</white>.");
            return;
        }
        String url = input.contains("://") ? input : "https://" + input;
        Text.send(sender, "<gray>Downloading <white><url></white> ... this can take a little while the first time.",
                Text.arg("url", url));
        download(url).whenComplete((track, error) -> Bukkit.getScheduler().runTask(plugin, () -> {
            if (error != null) {
                Throwable cause = error.getCause() != null ? error.getCause() : error;
                Text.error(sender, "Could not get that song: <why>", Text.arg("why", String.valueOf(cause.getMessage())));
                return;
            }
            List<Player> online = new ArrayList<>();
            for (Player player : targets) {
                if (player.isOnline()) {
                    online.add(player);
                }
            }
            start(sender, track, online, loop);
        }));
    }

    private void start(CommandSender sender, Track track, List<Player> targets, boolean loop) {
        List<Player> needPack = new ArrayList<>();
        for (Player player : targets) {
            if (loadedPacks.getOrDefault(player.getUniqueId(), Set.of()).contains(track.packId())) {
                begin(player, track, loop);
            } else {
                needPack.add(player);
            }
        }
        int loading = needPack.size();
        if (!needPack.isEmpty()) {
            packUri(track).whenComplete((uri, error) -> Bukkit.getScheduler().runTask(plugin, () -> {
                if (error != null) {
                    Throwable cause = error.getCause() != null ? error.getCause() : error;
                    Text.error(sender, "Could not host the song for players: <why>", Text.arg("why", String.valueOf(cause.getMessage())));
                    return;
                }
                for (Player player : needPack) {
                    if (player.isOnline()) {
                        sendPack(sender, player, track, loop, uri);
                    }
                }
            }));
        }
        Text.ok(sender, "<light_purple>♪</light_purple> <white><title></white> <gray>[<time>]</gray> for <count> player(s)"
                        + (loop ? " <gray>(looping)</gray>" : "") + (loading > 0 ? " <gray>- <loading> loading it first</gray>" : ""),
                Text.arg("title", track.title()), Text.arg("time", track.duration()),
                Text.arg("count", targets.size()), Text.arg("loading", loading));
    }

    /** Where players' games download this song's pack from: our own web server, or a file-host upload. */
    private CompletableFuture<URI> packUri(Track track) {
        if (!uploadMode()) {
            return CompletableFuture.completedFuture(URI.create(baseUrl + "/pack/" + track.id() + ".zip"));
        }
        FileHosts.Hosted upload = uploads.get(track.id());
        if (upload != null && fresh(upload) && !failedHosts.contains(upload.host())) {
            return CompletableFuture.completedFuture(upload.uri());
        }
        CompletableFuture<URI> future = new CompletableFuture<>();
        CompletableFuture<URI> existing = uploading.putIfAbsent(track.id(), future);
        if (existing != null) {
            return existing;
        }
        plugin.async().execute(() -> {
            try {
                FileHosts.Hosted hosted = FileHosts.upload(track.pack(), uploadHosts());
                uploads.put(track.id(), hosted);
                saveIndex();
                plugin.getLogger().info("Music: uploaded \"" + track.title() + "\" to " + hosted.host() + " (" + hosted.uri() + ")");
                future.complete(hosted.uri());
            } catch (Throwable ex) {
                future.completeExceptionally(ex);
            } finally {
                uploading.remove(track.id(), future);
            }
        });
        return future;
    }

    private List<String> uploadHosts() {
        List<String> hosts = new ArrayList<>(plugin.getConfig().getStringList("music.upload-hosts"));
        if (hosts.isEmpty()) {
            hosts.addAll(FileHosts.DEFAULT_ORDER);
        }
        hosts.removeIf(host -> failedHosts.contains(Text.lower(host)));
        return hosts;
    }

    private void sendPack(CommandSender sender, Player player, Track track, boolean loop, URI uri) {
        UUID playerId = player.getUniqueId();
        ResourcePackInfo info = ResourcePackInfo.resourcePackInfo(track.packId(), uri, track.sha1());
        boolean selfHosted = baseUrl != null && uri.toString().startsWith(baseUrl);
        FileHosts.Hosted upload = uploads.get(track.id());
        String uploadHost = !selfHosted && upload != null && upload.uri().equals(uri) ? upload.host() : null;
        ResourcePackRequest request = ResourcePackRequest.resourcePackRequest()
                .packs(info)
                .replace(false)
                .required(false)
                .prompt(Text.parse(plugin.getConfig().getString("music.prompt", "Music for this scene")))
                .callback((id, status, audience) -> {
                    if (Bukkit.isPrimaryThread()) {
                        onStatus(sender, playerId, track, loop, status, selfHosted, uploadHost);
                    } else {
                        Bukkit.getScheduler().runTask(plugin, () -> onStatus(sender, playerId, track, loop, status, selfHosted, uploadHost));
                    }
                })
                .build();
        player.sendResourcePacks(request);
    }

    private void onStatus(CommandSender sender, UUID playerId, Track track, boolean loop, ResourcePackStatus status,
                          boolean selfHosted, String uploadHost) {
        Player player = Bukkit.getPlayer(playerId);
        String name = player == null ? "A player" : player.getName();
        switch (status) {
            case SUCCESSFULLY_LOADED -> {
                loadedPacks.computeIfAbsent(playerId, k -> new HashSet<>()).add(track.packId());
                if (player != null) {
                    begin(player, track, loop);
                }
            }
            case DECLINED -> Text.error(sender, "<name> has server resource packs disabled, so they can't hear music "
                    + "(Multiplayer > Edit server > Server Resource Packs: Enabled).", Text.arg("name", name));
            case FAILED_DOWNLOAD, INVALID_URL -> {
                if (selfHosted && hostSetting().equals("auto")) {
                    // The music port isn't reachable from the internet (common on free hosts): upload instead, and remember that.
                    if (!uploadMode()) {
                        plugin.getLogger().warning("Music: players can't reach " + baseUrl
                                + " - switching to uploading songs to a file host.");
                        rememberUnreachable(baseUrl);
                        Text.send(sender, "<gray>Players can't reach the music port, so songs will be uploaded instead. Retrying...");
                    }
                    if (player != null) {
                        packUri(track).whenComplete((uri, error) -> Bukkit.getScheduler().runTask(plugin, () -> {
                            if (error != null) {
                                Throwable cause = error.getCause() != null ? error.getCause() : error;
                                Text.error(sender, "Could not upload the song: <why>", Text.arg("why", String.valueOf(cause.getMessage())));
                            } else if (player.isOnline()) {
                                sendPack(sender, player, track, loop, uri);
                            }
                        }));
                    }
                } else if (selfHosted) {
                    Text.error(sender, "<name>'s game couldn't download the song from <url>. Open that port, set "
                                    + "music.web-server.public-url, or set music.pack-host: auto in config.yml.",
                            Text.arg("name", name), Text.arg("url", String.valueOf(baseUrl)));
                } else {
                    // Players can't download from this host (it may block games, or be down): stop using it and try the next one.
                    uploads.remove(track.id());
                    if (uploadHost != null && failedHosts.add(uploadHost)) {
                        plugin.getLogger().warning("Music: players couldn't download from " + uploadHost + " - skipping it from now on.");
                    }
                    if (player != null && !uploadHosts().isEmpty()) {
                        Text.send(sender, "<gray><name>'s game couldn't download from <host>, trying <next>...",
                                Text.arg("name", name), Text.arg("host", uploadHost == null ? "that host" : uploadHost),
                                Text.arg("next", uploadHosts().get(0)));
                        packUri(track).whenComplete((uri, error) -> Bukkit.getScheduler().runTask(plugin, () -> {
                            if (error != null) {
                                Throwable cause = error.getCause() != null ? error.getCause() : error;
                                Text.error(sender, "Could not upload the song: <why>", Text.arg("why", String.valueOf(cause.getMessage())));
                            } else if (player.isOnline()) {
                                sendPack(sender, player, track, loop, uri);
                            }
                        }));
                    } else {
                        Text.error(sender, "<name>'s game couldn't download the song from any upload host. Check "
                                + ".minecraft/logs/latest.log on their computer for the reason (search for \"resource pack\").",
                                Text.arg("name", name));
                    }
                }
            }
            case FAILED_RELOAD, DISCARDED -> Text.error(sender, "<name>'s game failed to load the song.", Text.arg("name", name));
            default -> {
                // accepted / downloaded: still in progress
            }
        }
    }

    private void begin(Player player, Track track, boolean loop) {
        stop(player);
        Sound sound = Sound.sound(track.soundKey(), source(), (float) plugin.getConfig().getDouble("music.volume", 1.0), 1f);
        player.playSound(sound, Sound.Emitter.self());
        BukkitTask task = null;
        if (loop && track.durationSeconds() > 0) {
            UUID id = player.getUniqueId();
            task = Bukkit.getScheduler().runTaskLater(plugin, () -> {
                Playing current = playing.get(id);
                Player p = Bukkit.getPlayer(id);
                if (p != null && current != null && current.track().id().equals(track.id())) {
                    begin(p, track, true);
                }
            }, track.durationSeconds() * 20L + 20L);
        }
        playing.put(player.getUniqueId(), new Playing(track, loop, task));
        player.sendActionBar(Text.parse("<light_purple>♪ <white><title>", Text.arg("title", track.title())));
    }

    public void stop(Player player) {
        Playing current = playing.remove(player.getUniqueId());
        if (current != null) {
            if (current.loopTask() != null) {
                current.loopTask().cancel();
            }
            player.stopSound(SoundStop.named(current.track().soundKey()));
        }
    }

    public Track nowPlaying(Player player) {
        Playing current = playing.get(player.getUniqueId());
        return current == null ? null : current.track();
    }

    /** Removes the music packs from players' games (frees memory; songs re-download from cache when played again). */
    public int unload(Collection<Player> players) {
        int count = 0;
        for (Player player : players) {
            stop(player);
            Set<UUID> packs = loadedPacks.remove(player.getUniqueId());
            if (packs != null && !packs.isEmpty()) {
                List<UUID> ids = new ArrayList<>(packs);
                player.removeResourcePacks(ids.get(0), ids.subList(1, ids.size()).toArray(new UUID[0]));
                count += ids.size();
            }
        }
        return count;
    }

    private Sound.Source source() {
        String name = plugin.getConfig().getString("music.sound-category", "record");
        try {
            return Sound.Source.valueOf(name.toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            return Sound.Source.RECORD;
        }
    }

    @EventHandler
    public void onQuit(PlayerQuitEvent event) {
        UUID id = event.getPlayer().getUniqueId();
        loadedPacks.remove(id);
        Playing current = playing.remove(id);
        if (current != null && current.loopTask() != null) {
            current.loopTask().cancel();
        }
    }
}
