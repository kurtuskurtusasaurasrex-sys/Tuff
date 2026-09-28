package com.sigmacinematic.disguise;

import com.destroystokyo.paper.profile.PlayerProfile;
import com.destroystokyo.paper.profile.ProfileProperty;
import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.util.Text;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.format.NamedTextColor;
import org.bukkit.Bukkit;
import org.bukkit.configuration.ConfigurationSection;
import org.bukkit.configuration.file.YamlConfiguration;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.event.player.AsyncPlayerPreLoginEvent;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerQuitEvent;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Level;
import java.util.regex.Pattern;

/**
 * Tracks each player's real and fake name/skin and applies the fake one.
 *
 * <p>The fake name is written into the player's actual game profile, both live and at login
 * (before the server builds the join message), so vanilla join, leave, death, kill and
 * advancement messages, the tab list and the nametag all use it.
 */
public final class DisguiseManager implements Listener {

    public static final Pattern VALID_NAME = Pattern.compile("[A-Za-z0-9_]{1,16}");
    private static final String TEXTURES = "textures";

    private final SigmaCinematic plugin;
    private final File file;
    private final Map<UUID, DisguiseData> data = new ConcurrentHashMap<>();

    public DisguiseManager(SigmaCinematic plugin) {
        this.plugin = plugin;
        this.file = new File(plugin.getDataFolder(), "disguises.yml");
    }

    // ---------------------------------------------------------------- storage

    public void load() {
        data.clear();
        YamlConfiguration yml = YamlConfiguration.loadConfiguration(file);
        for (String key : yml.getKeys(false)) {
            ConfigurationSection s = yml.getConfigurationSection(key);
            if (s == null) {
                continue;
            }
            UUID uuid;
            try {
                uuid = UUID.fromString(key);
            } catch (IllegalArgumentException ex) {
                continue;
            }
            DisguiseData d = new DisguiseData(uuid, s.getString("real-name", "?"));
            d.realSkinValue = s.getString("real-skin.value");
            d.realSkinSignature = s.getString("real-skin.signature");
            d.nick = s.getString("nick");
            d.style = s.getString("style");
            d.skinValue = s.getString("skin.value");
            d.skinSignature = s.getString("skin.signature");
            d.skinSource = s.getString("skin.source");
            if (!d.isEmpty()) {
                data.put(uuid, d);
            }
        }
    }

    public void save() {
        YamlConfiguration yml = new YamlConfiguration();
        for (DisguiseData d : data.values()) {
            if (d.isEmpty()) {
                continue;
            }
            ConfigurationSection s = yml.createSection(d.uuid.toString());
            s.set("real-name", d.realName);
            s.set("real-skin.value", d.realSkinValue);
            s.set("real-skin.signature", d.realSkinSignature);
            s.set("nick", d.nick);
            s.set("style", d.style);
            s.set("skin.value", d.skinValue);
            s.set("skin.signature", d.skinSignature);
            s.set("skin.source", d.skinSource);
        }
        try {
            yml.save(file);
        } catch (IOException ex) {
            plugin.getLogger().log(Level.SEVERE, "Could not save disguises.yml", ex);
        }
    }

    // ---------------------------------------------------------------- queries

    public DisguiseData get(UUID uuid) {
        return data.get(uuid);
    }

    public Collection<DisguiseData> all() {
        return data.values();
    }

    public String realName(Player player) {
        DisguiseData d = data.get(player.getUniqueId());
        return d != null && d.realName != null ? d.realName : player.getName();
    }

    public Player findByRealName(String name) {
        for (Player player : Bukkit.getOnlinePlayers()) {
            DisguiseData d = data.get(player.getUniqueId());
            if (d != null && name.equalsIgnoreCase(d.realName)) {
                return player;
            }
        }
        return null;
    }

    /** True if some other online player currently shows as, or really is, {@code name}. */
    public boolean nameTaken(String name, Player except) {
        for (Player player : Bukkit.getOnlinePlayers()) {
            if (player.equals(except)) {
                continue;
            }
            if (player.getName().equalsIgnoreCase(name) || name.equalsIgnoreCase(realName(player))) {
                return true;
            }
        }
        return false;
    }

    /** The player's name as shown in chat, tab and join/leave messages (with their style, if any). */
    public Component displayName(Player player) {
        DisguiseData d = data.get(player.getUniqueId());
        if (d == null || d.style == null) {
            return Component.text(player.getName());
        }
        return Text.parse(d.style, Text.arg("name", player.getName()));
    }

    // ---------------------------------------------------------------- changes

    private DisguiseData getOrCreate(Player player) {
        return data.computeIfAbsent(player.getUniqueId(), uuid -> {
            // No record yet means the player is currently undisguised, so their profile is the real one.
            DisguiseData d = new DisguiseData(uuid, player.getName());
            ProfileProperty textures = textures(player.getPlayerProfile());
            if (textures != null) {
                d.realSkinValue = textures.getValue();
                d.realSkinSignature = textures.getSignature();
            }
            return d;
        });
    }

    public void setNick(Player player, String nick) {
        DisguiseData d = getOrCreate(player);
        d.nick = nick == null || nick.equals(d.realName) ? null : nick;
        commit(player, "name -> " + (d.nick == null ? d.realName + " (real)" : d.nick));
    }

    public void setStyle(Player player, String style) {
        getOrCreate(player).style = style;
        commit(player, "style -> " + (style == null ? "none" : style));
    }

    public void setSkin(Player player, Skin skin) {
        DisguiseData d = getOrCreate(player);
        d.skinValue = skin == null ? null : skin.value();
        d.skinSignature = skin == null ? null : skin.signature();
        d.skinSource = skin == null ? null : skin.source();
        commit(player, "skin -> " + (skin == null ? "real" : skin.source()));
    }

    public void resetAll(Player player) {
        DisguiseData d = data.get(player.getUniqueId());
        if (d == null) {
            return;
        }
        d.nick = null;
        d.style = null;
        d.skinValue = null;
        d.skinSignature = null;
        d.skinSource = null;
        commit(player, "fully reset");
    }

    private void commit(Player player, String what) {
        DisguiseData d = data.get(player.getUniqueId());
        plugin.getLogger().info("[Disguise] " + (d != null ? d.realName : player.getName())
                + " (" + player.getUniqueId() + ") " + what);
        apply(player);
        if (d != null && d.isEmpty()) {
            data.remove(player.getUniqueId());
        }
        save();
    }

    /** Pushes the tracked name + skin onto the live player. Must be called on the main thread. */
    public void apply(Player player) {
        DisguiseData d = data.get(player.getUniqueId());
        if (d != null) {
            PlayerProfile current = player.getPlayerProfile();
            String name = d.nick != null ? d.nick : d.realName;
            String value = d.skinValue != null ? d.skinValue : d.realSkinValue;
            String signature = d.skinValue != null ? d.skinSignature : d.realSkinSignature;
            ProfileProperty currentTextures = textures(current);
            String currentValue = currentTextures == null ? null : currentTextures.getValue();
            if (!name.equals(current.getName()) || !Objects.equals(value, currentValue)) {
                player.setPlayerProfile(buildProfile(current, name, value, signature));
            }
        }
        applyNames(player);
    }

    /** Sets chat + tab names from the style (or back to default). */
    public void applyNames(Player player) {
        DisguiseData d = data.get(player.getUniqueId());
        if (d == null || d.style == null) {
            player.displayName(null);
            player.playerListName(null);
        } else {
            Component name = displayName(player);
            player.displayName(name);
            player.playerListName(name);
        }
    }

    private static PlayerProfile buildProfile(PlayerProfile base, String name, String skinValue, String skinSignature) {
        PlayerProfile profile = Bukkit.createProfileExact(base.getId(), name);
        List<ProfileProperty> props = new ArrayList<>();
        for (ProfileProperty property : base.getProperties()) {
            if (!property.getName().equals(TEXTURES)) {
                props.add(property);
            }
        }
        if (skinValue != null) {
            props.add(new ProfileProperty(TEXTURES, skinValue, skinSignature));
        }
        profile.setProperties(props);
        return profile;
    }

    private static ProfileProperty textures(PlayerProfile profile) {
        for (ProfileProperty property : profile.getProperties()) {
            if (property.getName().equals(TEXTURES)) {
                return property;
            }
        }
        return null;
    }

    // ---------------------------------------------------------------- events

    /** Swap in the fake profile before the player even joins, so every vanilla message uses the fake name. */
    @EventHandler(priority = EventPriority.HIGHEST)
    public void onPreLogin(AsyncPlayerPreLoginEvent event) {
        if (event.getLoginResult() != AsyncPlayerPreLoginEvent.Result.ALLOWED) {
            return;
        }
        DisguiseData d = data.get(event.getUniqueId());
        if (d == null) {
            return;
        }
        PlayerProfile real = event.getPlayerProfile();
        // Keep tracking the exact real identity, in case they renamed their account or changed their skin.
        d.realName = real.getName();
        ProfileProperty realTextures = textures(real);
        if (realTextures != null) {
            d.realSkinValue = realTextures.getValue();
            d.realSkinSignature = realTextures.getSignature();
        }
        String name = d.nick != null && Bukkit.getPlayerExact(d.nick) == null ? d.nick : real.getName();
        String value = d.skinValue != null ? d.skinValue : d.realSkinValue;
        String signature = d.skinValue != null ? d.skinSignature : d.realSkinSignature;
        event.setPlayerProfile(buildProfile(real, name, value, signature));
        Bukkit.getScheduler().runTask(plugin, this::save);
    }

    @EventHandler(priority = EventPriority.NORMAL)
    public void onJoin(PlayerJoinEvent event) {
        Player player = event.getPlayer();
        DisguiseData d = data.get(player.getUniqueId());
        if (d == null) {
            return;
        }
        if (d.nick != null && !d.nick.equals(player.getName())) {
            // Login-time swap did not stick (e.g. name clash); apply it live instead.
            Bukkit.getScheduler().runTask(plugin, () -> {
                if (player.isOnline()) {
                    apply(player);
                }
            });
        }
        applyNames(player);
        if (event.joinMessage() != null) {
            event.joinMessage(Component.translatable("multiplayer.player.joined", nameWithHover(player)).color(NamedTextColor.YELLOW));
        }
    }

    @EventHandler(priority = EventPriority.NORMAL)
    public void onQuit(PlayerQuitEvent event) {
        Player player = event.getPlayer();
        if (data.containsKey(player.getUniqueId()) && event.quitMessage() != null) {
            event.quitMessage(Component.translatable("multiplayer.player.left", nameWithHover(player)).color(NamedTextColor.YELLOW));
        }
    }

    public Component nameWithHover(Player player) {
        return displayName(player).hoverEvent(player);
    }
}
