package com.sigmacinematic.util;

import com.sigmacinematic.SigmaCinematic;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Entity;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/** Resolves "who should this affect" arguments: names, nicknames, real names, selectors, all. */
public final class Targets {

    public static final List<String> SELECTORS = List.of("all", "@a", "@p", "@r", "@s");

    private Targets() {
    }

    /** Accepts a player name, a comma list, {@code all}/{@code *}, or any vanilla selector like {@code @a[distance=..10]}. */
    public static List<Player> resolve(CommandSender sender, String arg) {
        Set<Player> out = new LinkedHashSet<>();
        for (String part : arg.split(",")) {
            if (part.isEmpty()) {
                continue;
            }
            if (part.equalsIgnoreCase("all") || part.equals("*")) {
                out.addAll(Bukkit.getOnlinePlayers());
            } else if (part.startsWith("@")) {
                List<Entity> entities;
                try {
                    entities = Bukkit.selectEntities(sender, part);
                } catch (IllegalArgumentException ex) {
                    throw new CommandFail("Invalid selector " + part + ": " + ex.getMessage());
                }
                for (Entity entity : entities) {
                    if (entity instanceof Player player) {
                        out.add(player);
                    }
                }
            } else {
                out.add(player(part));
            }
        }
        if (out.isEmpty()) {
            throw new CommandFail("No players matched " + arg + ".");
        }
        return new ArrayList<>(out);
    }

    /** Finds an online player by current (possibly disguised) name or by their real name. */
    public static Player player(String name) {
        Player player = find(name);
        if (player == null) {
            throw new CommandFail("No online player called " + name + ".");
        }
        return player;
    }

    public static Player find(String name) {
        Player exact = Bukkit.getPlayerExact(name);
        if (exact != null) {
            return exact;
        }
        Player real = SigmaCinematic.get().disguises().findByRealName(name);
        return real != null ? real : Bukkit.getPlayer(name);
    }

    public static List<String> names() {
        List<String> names = new ArrayList<>();
        for (Player player : Bukkit.getOnlinePlayers()) {
            names.add(player.getName());
        }
        return names;
    }

    public static List<String> namesAndSelectors() {
        List<String> list = new ArrayList<>(SELECTORS);
        list.addAll(names());
        return list;
    }

    public static List<String> filter(Collection<String> options, String typed) {
        String lower = Text.lower(typed);
        List<String> out = new ArrayList<>();
        for (String option : options) {
            if (Text.lower(option).startsWith(lower)) {
                out.add(option);
            }
        }
        return out;
    }
}
