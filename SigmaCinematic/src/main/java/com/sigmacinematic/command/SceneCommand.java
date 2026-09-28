package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.scene.SceneManager;
import com.sigmacinematic.util.ArgReader;
import com.sigmacinematic.util.CommandFail;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import net.kyori.adventure.key.Key;
import net.kyori.adventure.sound.Sound;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.title.Title;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.potion.PotionEffect;
import org.bukkit.potion.PotionEffectType;
import org.bukkit.scheduler.BukkitRunnable;

import java.time.Duration;
import java.util.List;

/**
 * Filming tools:
 * <ul>
 *   <li>/scfreeze &lt;players&gt; [on|off] - actors can look around but not move</li>
 *   <li>/scvanish [player] - invisible camera operator (fake leave/join message)</li>
 *   <li>/scblackout &lt;players&gt; &lt;seconds|off&gt; [text] - fade the screen to black</li>
 *   <li>/sccountdown &lt;seconds&gt; [players] [final text] - "3, 2, 1, Action!"</li>
 *   <li>/scsudo &lt;player&gt; &lt;message | /command&gt; - make someone say or run something</li>
 * </ul>
 */
public final class SceneCommand extends BaseCommand {

    public enum Mode { FREEZE, VANISH, BLACKOUT, COUNTDOWN, SUDO }

    private final Mode mode;

    public SceneCommand(SigmaCinematic plugin, Mode mode) {
        super(plugin);
        this.mode = mode;
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        ArgReader in = new ArgReader(args);
        switch (mode) {
            case FREEZE -> freeze(sender, in);
            case VANISH -> vanish(sender, in);
            case BLACKOUT -> blackout(sender, in);
            case COUNTDOWN -> countdown(sender, in);
            case SUDO -> sudo(sender, in);
        }
    }

    private void freeze(CommandSender sender, ArgReader in) {
        SceneManager scenes = plugin.scenes();
        List<Player> players = Targets.resolve(sender, in.require("who to freeze (player, @a, all)"));
        String state = in.next();
        int frozen = 0;
        for (Player player : players) {
            boolean freeze = state == null ? !scenes.isFrozen(player) : isOn(state);
            scenes.setFrozen(player, freeze);
            if (freeze) {
                frozen++;
            }
        }
        Text.ok(sender, "<frozen> frozen, <free> free to move.",
                Text.arg("frozen", frozen), Text.arg("free", players.size() - frozen));
    }

    private void vanish(CommandSender sender, ArgReader in) {
        Player player = in.hasNext() ? Targets.player(in.next()) : self(sender);
        boolean vanish = !plugin.scenes().isVanished(player);
        plugin.scenes().setVanished(player, vanish);
        Text.ok(sender, vanish ? "<name> is now invisible to everyone." : "<name> is visible again.",
                Text.arg("name", player.getName()));
    }

    private void blackout(CommandSender sender, ArgReader in) {
        List<Player> players = Targets.resolve(sender, in.require("who (player, @a, all)"));
        String time = in.require("how many seconds (or off)");
        if (isOff(time)) {
            for (Player player : players) {
                player.removePotionEffect(PotionEffectType.BLINDNESS);
                player.removePotionEffect(PotionEffectType.DARKNESS);
                player.clearTitle();
            }
            Text.ok(sender, "Lights back on.");
            return;
        }
        int ticks = (int) Math.round(parseSeconds(time) * 20);
        String text = in.rest();
        for (Player player : players) {
            player.addPotionEffect(new PotionEffect(PotionEffectType.BLINDNESS, ticks, 0, false, false, false));
            player.addPotionEffect(new PotionEffect(PotionEffectType.DARKNESS, ticks, 0, false, false, false));
            if (!text.isEmpty()) {
                int bar = text.indexOf('|');
                Component title = Text.parse(bar < 0 ? text : text.substring(0, bar).trim());
                Component sub = bar < 0 ? Component.empty() : Text.parse(text.substring(bar + 1).trim());
                player.showTitle(Title.title(title, sub, Title.Times.times(
                        Duration.ofMillis(500), Duration.ofMillis(Math.max(0, ticks * 50L - 1500)), Duration.ofMillis(1000))));
            }
        }
        Text.ok(sender, "Blacked out <count> player(s).", Text.arg("count", players.size()));
    }

    private void countdown(CommandSender sender, ArgReader in) {
        int seconds = (int) parseSeconds(in.require("how many seconds"));
        if (seconds < 1 || seconds > 600) {
            throw new CommandFail("Countdown must be 1-600 seconds.");
        }
        List<Player> players = Targets.resolve(sender, in.hasNext() ? in.next() : "all");
        String end = in.rest();
        Component finalText = Text.parse(end.isEmpty() ? "<gold><bold>Action!" : end);
        Title.Times times = Title.Times.times(Duration.ZERO, Duration.ofMillis(1100), Duration.ofMillis(200));
        new BukkitRunnable() {
            int left = seconds;

            @Override
            public void run() {
                for (Player player : players) {
                    if (!player.isOnline()) {
                        continue;
                    }
                    if (left > 0) {
                        player.showTitle(Title.title(Text.parse("<yellow><bold>" + left), Component.empty(), times));
                        player.playSound(Sound.sound(Key.key("block.note_block.pling"), Sound.Source.MASTER, 1f, 1f));
                    } else {
                        player.showTitle(Title.title(finalText, Component.empty(),
                                Title.Times.times(Duration.ZERO, Duration.ofMillis(1500), Duration.ofMillis(500))));
                        player.playSound(Sound.sound(Key.key("block.note_block.pling"), Sound.Source.MASTER, 1f, 2f));
                    }
                }
                if (left-- <= 0) {
                    cancel();
                }
            }
        }.runTaskTimer(plugin, 0L, 20L);
    }

    private void sudo(CommandSender sender, ArgReader in) {
        Player player = Targets.player(in.require("a player"));
        String what = in.requireRest("a message or /command");
        if (what.startsWith("/")) {
            player.performCommand(what.substring(1));
            Text.ok(sender, "Made <name> run <cmd>.", Text.arg("name", player.getName()), Text.arg("cmd", what));
        } else {
            player.chat(what);
        }
    }

    private static boolean isOn(String s) {
        return switch (Text.lower(s)) {
            case "on", "true", "yes", "freeze" -> true;
            case "off", "false", "no", "unfreeze" -> false;
            default -> throw new CommandFail("Use on or off.");
        };
    }

    private static boolean isOff(String s) {
        return List.of("off", "stop", "clear", "0").contains(Text.lower(s));
    }

    private static double parseSeconds(String s) {
        try {
            double value = Double.parseDouble(s.endsWith("s") ? s.substring(0, s.length() - 1) : s);
            if (value <= 0 || value > 3600) {
                throw new CommandFail("Seconds must be between 0 and 3600.");
            }
            return value;
        } catch (NumberFormatException ex) {
            throw new CommandFail(s + " is not a number of seconds.");
        }
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        String last = args[args.length - 1];
        return switch (mode) {
            case FREEZE -> args.length == 1 ? Targets.filter(Targets.namesAndSelectors(), last)
                    : args.length == 2 ? Targets.filter(List.of("on", "off"), last) : List.of();
            case VANISH -> args.length == 1 ? Targets.filter(Targets.names(), last) : List.of();
            case BLACKOUT -> args.length == 1 ? Targets.filter(Targets.namesAndSelectors(), last)
                    : args.length == 2 ? Targets.filter(List.of("3", "5", "10", "off"), last)
                    : args.length == 3 ? Targets.filter(List.of("<gray><italic>Three hours later..."), last) : List.of();
            case COUNTDOWN -> args.length == 1 ? Targets.filter(List.of("3", "5", "10"), last)
                    : args.length == 2 ? Targets.filter(Targets.namesAndSelectors(), last) : List.of();
            case SUDO -> args.length == 1 ? Targets.filter(Targets.names(), last) : List.of();
        };
    }
}
