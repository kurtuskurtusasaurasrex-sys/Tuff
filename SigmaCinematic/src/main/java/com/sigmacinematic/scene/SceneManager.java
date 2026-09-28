package com.sigmacinematic.scene;

import com.sigmacinematic.SigmaCinematic;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.format.NamedTextColor;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.entity.Player;
import org.bukkit.event.EventHandler;
import org.bukkit.event.EventPriority;
import org.bukkit.event.Listener;
import org.bukkit.event.player.PlayerJoinEvent;
import org.bukkit.event.player.PlayerMoveEvent;
import org.bukkit.event.player.PlayerQuitEvent;

import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/** Scene helpers that need to remember state: frozen actors and vanished camera operators. */
public final class SceneManager implements Listener {

    private final SigmaCinematic plugin;
    private final Set<UUID> frozen = ConcurrentHashMap.newKeySet();
    private final Set<UUID> vanished = ConcurrentHashMap.newKeySet();

    public SceneManager(SigmaCinematic plugin) {
        this.plugin = plugin;
    }

    // ---------------------------------------------------------------- freeze

    public boolean isFrozen(Player player) {
        return frozen.contains(player.getUniqueId());
    }

    public void setFrozen(Player player, boolean freeze) {
        if (freeze) {
            frozen.add(player.getUniqueId());
        } else {
            frozen.remove(player.getUniqueId());
        }
    }

    /** Frozen players can still look around (nice for reaction shots) but cannot move. */
    @EventHandler(ignoreCancelled = true)
    public void onMove(PlayerMoveEvent event) {
        if (!frozen.contains(event.getPlayer().getUniqueId()) || !event.hasChangedPosition()) {
            return;
        }
        Location back = event.getFrom().clone();
        back.setYaw(event.getTo().getYaw());
        back.setPitch(event.getTo().getPitch());
        event.setTo(back);
    }

    // ---------------------------------------------------------------- vanish

    public boolean isVanished(Player player) {
        return vanished.contains(player.getUniqueId());
    }

    public void setVanished(Player player, boolean vanish) {
        boolean fakeMessages = plugin.getConfig().getBoolean("vanish.fake-messages", true);
        if (vanish) {
            vanished.add(player.getUniqueId());
            for (Player other : Bukkit.getOnlinePlayers()) {
                if (!other.equals(player)) {
                    other.hidePlayer(plugin, player);
                }
            }
            player.setCollidable(false);
            player.setAffectsSpawning(false);
            if (fakeMessages) {
                broadcastExcept(player, "multiplayer.player.left");
            }
        } else {
            vanished.remove(player.getUniqueId());
            for (Player other : Bukkit.getOnlinePlayers()) {
                other.showPlayer(plugin, player);
            }
            player.setCollidable(true);
            player.setAffectsSpawning(true);
            if (fakeMessages) {
                broadcastExcept(player, "multiplayer.player.joined");
            }
        }
    }

    private void broadcastExcept(Player player, String key) {
        Component message = Component.translatable(key, plugin.disguises().nameWithHover(player)).color(NamedTextColor.YELLOW);
        for (Player other : Bukkit.getOnlinePlayers()) {
            if (!other.equals(player)) {
                other.sendMessage(message);
            }
        }
        Bukkit.getConsoleSender().sendMessage(message);
    }

    @EventHandler(priority = EventPriority.HIGH)
    public void onJoin(PlayerJoinEvent event) {
        Player joined = event.getPlayer();
        for (UUID id : vanished) {
            Player hidden = Bukkit.getPlayer(id);
            if (hidden != null && !hidden.equals(joined)) {
                joined.hidePlayer(plugin, hidden);
            }
        }
        if (vanished.contains(joined.getUniqueId())) {
            for (Player other : Bukkit.getOnlinePlayers()) {
                if (!other.equals(joined)) {
                    other.hidePlayer(plugin, joined);
                }
            }
            event.joinMessage(null);
        }
    }

    @EventHandler(priority = EventPriority.HIGH)
    public void onQuit(PlayerQuitEvent event) {
        if (vanished.contains(event.getPlayer().getUniqueId())) {
            event.quitMessage(null);
        }
    }
}
