package com.sigmacinematic.fake;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sigmacinematic.SigmaCinematic;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.serializer.gson.GsonComponentSerializer;
import org.bukkit.Bukkit;
import org.bukkit.NamespacedKey;
import org.bukkit.advancement.Advancement;
import org.bukkit.entity.Player;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

/**
 * Pops a real advancement toast ("Advancement Made!", "Goal Reached!", "Challenge Complete!") in the
 * corner of the screen, using a throwaway advancement that is deleted a moment later.
 */
public final class ToastSender {

    public static final List<String> FRAMES = List.of("task", "goal", "challenge");

    private final SigmaCinematic plugin;

    public ToastSender(SigmaCinematic plugin) {
        this.plugin = plugin;
    }

    @SuppressWarnings("deprecation")
    public void show(Collection<Player> players, String icon, String frame, Component title, Component description) {
        NamespacedKey key = new NamespacedKey(plugin, "toast/" + UUID.randomUUID().toString().replace("-", ""));

        JsonObject trigger = new JsonObject();
        trigger.addProperty("trigger", "minecraft:impossible");
        JsonObject criteria = new JsonObject();
        criteria.add("shown", trigger);

        JsonObject iconJson = new JsonObject();
        iconJson.addProperty("id", icon.contains(":") ? icon : "minecraft:" + icon);
        iconJson.addProperty("count", 1);

        JsonObject display = new JsonObject();
        display.add("icon", iconJson);
        display.add("title", JsonParser.parseString(GsonComponentSerializer.gson().serialize(title)));
        display.add("description", JsonParser.parseString(GsonComponentSerializer.gson().serialize(description)));
        display.addProperty("frame", frame);
        display.addProperty("show_toast", true);
        display.addProperty("announce_to_chat", false);
        display.addProperty("hidden", true);

        JsonObject root = new JsonObject();
        root.add("criteria", criteria);
        root.add("display", display);

        Advancement advancement;
        try {
            advancement = Bukkit.getUnsafe().loadAdvancement(key, root.toString());
        } catch (RuntimeException ex) {
            throw new IllegalArgumentException("Minecraft rejected that toast (is " + icon + " a real item?)");
        }
        if (advancement == null) {
            throw new IllegalArgumentException("Minecraft rejected that toast (is " + icon + " a real item?)");
        }
        for (Player player : players) {
            player.getAdvancementProgress(advancement).awardCriteria("shown");
        }
        Bukkit.getScheduler().runTaskLater(plugin, () -> {
            for (Player player : players) {
                if (player.isOnline()) {
                    player.getAdvancementProgress(advancement).revokeCriteria("shown");
                }
            }
            Bukkit.getUnsafe().removeAdvancement(key);
        }, 40L);
    }
}
