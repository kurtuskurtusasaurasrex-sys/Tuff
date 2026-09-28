package com.sigmacinematic.music;

import com.sigmacinematic.SigmaCinematic;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Runs the programs that turn a link into a song Minecraft can play:
 * yt-dlp (downloads the audio), deno (lets yt-dlp read YouTube) and ffmpeg (converts it to Ogg Vorbis).
 * Anything missing is downloaded into plugins/SigmaCinematic/bin, so it works on hosts where you
 * can't install software (like Seedloaf).
 */
final class AudioTools {

    record Meta(String extractor, String id, String title, int durationSeconds) {
    }

    private record Result(int exitCode, List<String> output) {
    }

    private static final Pattern DURATION = Pattern.compile("Duration: (\\d+):(\\d+):(\\d+(?:\\.\\d+)?)");

    private final SigmaCinematic plugin;
    private final File bin;
    private final File tmp;
    private volatile String ytDlp;
    private volatile String ffmpeg;
    private volatile boolean denoChecked;

    AudioTools(SigmaCinematic plugin) {
        this.plugin = plugin;
        this.bin = new File(plugin.getDataFolder(), "bin");
        this.tmp = new File(plugin.getDataFolder(), "tmp");
    }

    synchronized void forget() {
        ytDlp = null;
        ffmpeg = null;
        denoChecked = false;
    }

    /** Makes sure every tool is ready, downloading what's missing. */
    synchronized void prepare() throws IOException {
        ytDlp();
        ffmpeg();
        deno();
    }

    private boolean autoDownload() {
        return plugin.getConfig().getBoolean("music.auto-download-tools", true);
    }

    private synchronized String ytDlp() throws IOException {
        if (ytDlp == null) {
            ytDlp = find("yt-dlp", plugin.getConfig().getString("music.yt-dlp-path", "yt-dlp"), "--version",
                    () -> Downloads.plain(Downloads.ytDlpUrl(), local("yt-dlp")));
        }
        return ytDlp;
    }

    private synchronized String ffmpeg() throws IOException {
        if (ffmpeg == null) {
            ffmpeg = find("ffmpeg", plugin.getConfig().getString("music.ffmpeg-path", "ffmpeg"), "-version",
                    () -> Downloads.gunzip(Downloads.ffmpegUrl(), local("ffmpeg")));
        }
        return ffmpeg;
    }

    /** Deno only improves YouTube support, so problems here are warnings, not errors. */
    private synchronized void deno() {
        if (denoChecked) {
            return;
        }
        denoChecked = true;
        if (works("deno", "--version") || works(local("deno").getAbsolutePath(), "--version")) {
            return;
        }
        String url = Downloads.denoUrl();
        if (url == null || !autoDownload()) {
            plugin.getLogger().warning("Music: deno is not installed - some YouTube videos may fail. See https://deno.com");
            return;
        }
        try {
            plugin.getLogger().info("Music: downloading deno (lets yt-dlp read YouTube)...");
            Downloads.unzip(url, Downloads.exe("deno"), local("deno"));
        } catch (IOException ex) {
            plugin.getLogger().warning("Music: could not download deno (" + ex.getMessage() + ") - some YouTube videos may fail.");
        }
    }

    private interface Download {
        void run() throws IOException;
    }

    private String find(String name, String configured, String versionFlag, Download download) throws IOException {
        if (works(configured, versionFlag)) {
            return configured;
        }
        File local = local(name);
        if (local.isFile() && works(local.getAbsolutePath(), versionFlag)) {
            return local.getAbsolutePath();
        }
        if (!autoDownload()) {
            throw new IOException(name + " is not installed. Install it or set music." + name + "-path in config.yml.");
        }
        plugin.getLogger().info("Music: downloading " + name + " into " + bin.getPath() + " ...");
        download.run();
        if (!works(local.getAbsolutePath(), versionFlag)) {
            throw new IOException("The downloaded " + name + " won't run on this server. Install it yourself and set music."
                    + name + "-path in config.yml.");
        }
        plugin.getLogger().info("Music: " + name + " is ready.");
        return local.getAbsolutePath();
    }

    private File local(String name) {
        return new File(bin, Downloads.exe(name));
    }

    Meta metadata(String url) throws IOException {
        List<String> cmd = ytDlpBase();
        cmd.addAll(List.of("--skip-download", "--print", "%(extractor_key)s\t%(id)s\t%(duration)s\t%(title)s", url));
        Result result = run(cmd, 120);
        for (String line : result.output()) {
            String[] parts = line.split("\t", 4);
            if (parts.length == 4) {
                int duration;
                try {
                    duration = (int) Math.round(Double.parseDouble(parts[2]));
                } catch (NumberFormatException ex) {
                    duration = -1;
                }
                return new Meta(parts[0], parts[1], parts[3], duration);
            }
        }
        throw new IOException(describe(result, "Could not read that link."));
    }

    /** Downloads the audio and converts it to Ogg Vorbis (the only format Minecraft plays) at {@code dir/<id>.ogg}. */
    File downloadAudio(String url, File dir, String id) throws IOException {
        List<String> cmd = ytDlpBase();
        cmd.addAll(List.of("-f", "bestaudio/best", "--no-part", "--force-overwrites",
                "-o", new File(dir, id + ".src.%(ext)s").getAbsolutePath(), url));
        Result download = run(cmd, 15 * 60);
        File source = null;
        File[] files = dir.listFiles((d, name) -> name.startsWith(id + ".src."));
        if (files != null && files.length > 0) {
            source = files[0];
        }
        if (download.exitCode() != 0 || source == null) {
            throw new IOException(describe(download, "Download failed."));
        }
        File ogg = new File(dir, id + ".ogg");
        try {
            convert(source, ogg);
        } finally {
            source.delete();
        }
        return ogg;
    }

    private void convert(File source, File ogg) throws IOException {
        int quality = Math.max(0, Math.min(10, plugin.getConfig().getInt("music.audio-quality", 4)));
        Result result = run(ffmpegCmd(source, ogg, List.of("-c:a", "libvorbis", "-q:a", String.valueOf(quality))), 10 * 60);
        if (result.exitCode() != 0 && String.join("\n", result.output()).contains("libvorbis")) {
            // An ffmpeg without libvorbis: fall back to the built-in (lower quality) encoder.
            result = run(ffmpegCmd(source, ogg, List.of("-c:a", "vorbis", "-strict", "experimental", "-b:a", "160k")), 10 * 60);
        }
        if (result.exitCode() != 0 || !ogg.isFile()) {
            String last = result.output().isEmpty() ? "unknown error" : result.output().get(result.output().size() - 1);
            throw new IOException("Converting the audio failed: " + last);
        }
    }

    /** Length of an audio file in seconds, or -1 if unknown. */
    int probeDuration(File audio) {
        try {
            Result result = run(List.of(ffmpeg(), "-hide_banner", "-nostdin", "-i", audio.getAbsolutePath()), 60);
            for (String line : result.output()) {
                Matcher m = DURATION.matcher(line);
                if (m.find()) {
                    return Integer.parseInt(m.group(1)) * 3600 + Integer.parseInt(m.group(2)) * 60
                            + (int) Math.round(Double.parseDouble(m.group(3)));
                }
            }
        } catch (IOException | NumberFormatException ignored) {
            // unknown
        }
        return -1;
    }

    private List<String> ffmpegCmd(File source, File ogg, List<String> codec) throws IOException {
        List<String> cmd = new ArrayList<>(List.of(ffmpeg(), "-nostdin", "-y", "-loglevel", "error",
                "-i", source.getAbsolutePath(), "-vn", "-map_metadata", "-1", "-ac", "2"));
        cmd.addAll(codec);
        cmd.add(ogg.getAbsolutePath());
        return cmd;
    }

    private List<String> ytDlpBase() throws IOException {
        List<String> cmd = new ArrayList<>();
        cmd.add(ytDlp());
        deno();
        cmd.addAll(List.of("--no-playlist", "--no-warnings", "--no-progress", "--encoding", "utf-8"));
        String cookies = plugin.getConfig().getString("music.cookies-file", "");
        if (cookies != null && !cookies.isBlank()) {
            File file = new File(cookies);
            if (!file.isAbsolute()) {
                file = new File(plugin.getDataFolder(), cookies);
            }
            if (file.isFile()) {
                cmd.addAll(List.of("--cookies", file.getAbsolutePath()));
            } else {
                plugin.getLogger().warning("Music: cookies file " + file.getPath() + " does not exist.");
            }
        }
        return cmd;
    }

    private static String describe(Result result, String fallback) {
        String error = null;
        for (String line : result.output()) {
            if (line.startsWith("ERROR:")) {
                error = line.substring(6).trim();
            }
        }
        if (error == null) {
            return fallback;
        }
        String lower = error.toLowerCase(Locale.ROOT);
        if (lower.contains("not a bot") || lower.contains("sign in to confirm")) {
            return "YouTube is blocking the server's internet address (common on hosting companies). "
                    + "Export your YouTube cookies to plugins/SigmaCinematic/cookies.txt and set music.cookies-file: cookies.txt "
                    + "(see the README), or use a SoundCloud / direct .mp3 link instead.";
        }
        return error;
    }

    private boolean works(String exe, String versionFlag) {
        if (exe == null || exe.isBlank()) {
            return false;
        }
        try {
            return run(List.of(exe, versionFlag), 30).exitCode() == 0;
        } catch (IOException ex) {
            return false;
        }
    }

    private Result run(List<String> cmd, long timeoutSeconds) throws IOException {
        tmp.mkdirs();
        ProcessBuilder builder = new ProcessBuilder(cmd).redirectErrorStream(true);
        Map<String, String> env = builder.environment();
        // Let yt-dlp find our downloaded deno/ffmpeg, and unpack itself somewhere we're allowed to run programs.
        String pathKey = env.keySet().stream().filter(k -> k.equalsIgnoreCase("PATH")).findFirst().orElse("PATH");
        env.put(pathKey, bin.getAbsolutePath() + File.pathSeparator + env.getOrDefault(pathKey, ""));
        env.put("TMPDIR", tmp.getAbsolutePath());
        env.put("TEMP", tmp.getAbsolutePath());
        env.put("TMP", tmp.getAbsolutePath());
        Process process = builder.start();
        List<String> output = Collections.synchronizedList(new ArrayList<>());
        Thread reader = new Thread(() -> {
            try (BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = in.readLine()) != null) {
                    output.add(line);
                }
            } catch (IOException ignored) {
                // process ended
            }
        }, "SigmaCinematic-tool-output");
        reader.setDaemon(true);
        reader.start();
        try {
            if (!process.waitFor(timeoutSeconds, TimeUnit.SECONDS)) {
                process.destroyForcibly();
                throw new IOException(new File(cmd.get(0)).getName() + " took too long and was stopped.");
            }
            reader.join(2000);
        } catch (InterruptedException ex) {
            process.destroyForcibly();
            Thread.currentThread().interrupt();
            throw new IOException("Interrupted.");
        }
        synchronized (output) {
            return new Result(process.exitValue(), new ArrayList<>(output));
        }
    }
}
