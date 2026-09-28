package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.fake.ToastSender;
import com.sigmacinematic.util.ArgReader;
import com.sigmacinematic.util.CommandFail;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import net.kyori.adventure.key.Key;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.ComponentLike;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.event.HoverEvent;
import net.kyori.adventure.text.format.NamedTextColor;
import net.kyori.adventure.text.format.TextColor;
import net.kyori.adventure.text.format.TextDecoration;
import org.bukkit.Bukkit;
import org.bukkit.Material;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Fake vanilla messages that look exactly like the real thing (they use the game's own translations,
 * so they even show up in each viewer's language). Any name can be used - online or made up.
 * Wrap names with spaces in "quotes"; names and text accept colors like {@code <red>} or {@code &c}.
 */
public final class FakeCommand extends BaseCommand {

    private static final Map<String, String> DEATHS = new LinkedHashMap<>();

    static {
        DEATHS.put("died", "death.attack.generic");
        DEATHS.put("killed", "death.attack.genericKill");
        DEATHS.put("fall", "death.attack.fall");
        DEATHS.put("fell", "death.fell.accident.generic");
        DEATHS.put("lava", "death.attack.lava");
        DEATHS.put("fire", "death.attack.inFire");
        DEATHS.put("burned", "death.attack.onFire");
        DEATHS.put("drowned", "death.attack.drown");
        DEATHS.put("void", "death.attack.outOfWorld");
        DEATHS.put("explosion", "death.attack.explosion");
        DEATHS.put("lightning", "death.attack.lightningBolt");
        DEATHS.put("starved", "death.attack.starve");
        DEATHS.put("suffocated", "death.attack.inWall");
        DEATHS.put("froze", "death.attack.freeze");
        DEATHS.put("cactus", "death.attack.cactus");
        DEATHS.put("magic", "death.attack.magic");
        DEATHS.put("wither", "death.attack.wither");
        DEATHS.put("anvil", "death.attack.anvil");
        DEATHS.put("kinetic", "death.attack.flyIntoWall");
        DEATHS.put("magma", "death.attack.hotFloor");
        DEATHS.put("berries", "death.attack.sweetBerryBush");
        DEATHS.put("stalagmite", "death.attack.stalagmite");
        DEATHS.put("sonicboom", "death.attack.sonic_boom");
        DEATHS.put("dragonbreath", "death.attack.dragonBreath");
    }

    private static final List<String> SUBCOMMANDS = List.of(
            "join", "leave", "death", "kill", "shot", "advancement", "toast", "chat", "say", "whisper",
            "command", "gamemode", "op", "deop", "kick", "custom");

    public FakeCommand(SigmaCinematic plugin) {
        super(plugin);
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        ArgReader in = new ArgReader(args);
        String sub = in.next();
        if (sub == null) {
            help(sender);
            return;
        }
        switch (Text.lower(sub)) {
            case "join" -> broadcast(Component.translatable("multiplayer.player.joined", name(in.require("a name"))).color(NamedTextColor.YELLOW));
            case "leave", "quit" -> broadcast(Component.translatable("multiplayer.player.left", name(in.require("a name"))).color(NamedTextColor.YELLOW));
            case "death", "die" -> death(in);
            case "kill" -> kill(in, "death.attack.player");
            case "shot" -> kill(in, "death.attack.arrow");
            case "advancement", "achievement", "adv" -> advancement(sender, in);
            case "toast" -> toast(sender, in);
            case "chat" -> {
                Component who = name(in.require("a name"));
                broadcast(Component.translatable("chat.type.text", who, Text.parse(in.requireRest("a message"))));
            }
            case "say" -> {
                Component who = name(in.require("a name"));
                broadcast(Component.translatable("chat.type.announcement", who, Text.parse(in.requireRest("a message"))));
            }
            case "whisper", "msg", "tell" -> {
                Component from = name(in.require("who it's from"));
                List<Player> to = Targets.resolve(sender, in.require("who receives it"));
                Component msg = Component.translatable("commands.message.display.incoming", from, Text.parse(in.requireRest("a message")))
                        .color(NamedTextColor.GRAY).decorate(TextDecoration.ITALIC);
                to.forEach(p -> p.sendMessage(msg));
            }
            case "command", "cmd" -> {
                Component who = name(in.require("a name"));
                broadcast(admin(who, Text.parse(in.requireRest("what the command did"))));
            }
            case "gamemode", "gm" -> {
                Component who = name(in.require("a name"));
                String mode = Text.lower(in.require("a game mode"));
                if (!List.of("survival", "creative", "adventure", "spectator").contains(mode)) {
                    throw new CommandFail("Game mode must be survival, creative, adventure or spectator.");
                }
                broadcast(admin(who, Component.translatable("commands.gamemode.success.self", Component.translatable("gameMode." + mode))));
            }
            case "op" -> broadcast(admin(Component.text("Server"), Component.translatable("commands.op.success", name(in.require("a name")))));
            case "deop" -> broadcast(admin(Component.text("Server"), Component.translatable("commands.deop.success", name(in.require("a name")))));
            case "kick" -> {
                Component who = name(in.require("a name"));
                String reason = in.rest();
                broadcast(Component.translatable("multiplayer.player.left", who).color(NamedTextColor.YELLOW));
                broadcast(admin(Component.text("Server"), Component.translatable("commands.kick.success", who,
                        reason.isEmpty() ? Component.translatable("multiplayer.disconnect.kicked") : Text.parse(reason))));
            }
            case "custom", "raw" -> broadcast(Text.parse(in.requireRest("a message")));
            default -> help(sender);
        }
    }

    private void help(CommandSender sender) {
        Text.send(sender, "<gold>Fake messages</gold> <gray>(names can be anyone; use \"quotes\" for spaces):");
        String[] lines = {
                "/scfake join <name>", "/scfake leave <name>",
                "/scfake death <name> <" + String.join("|", DEATHS.keySet()) + "|any custom text>",
                "/scfake kill <killer> <victim> [weapon]", "/scfake shot <shooter> <victim> [bow]",
                "/scfake advancement <name> <task|goal|challenge> <title> [| description]",
                "/scfake toast <players> <task|goal|challenge> <icon item> <title> [| description]",
                "/scfake chat <name> <message>", "/scfake say <name> <message>",
                "/scfake whisper <from> <players> <message>",
                "/scfake command <name> <what it did>", "/scfake gamemode <name> <mode>",
                "/scfake op <name>", "/scfake deop <name>", "/scfake kick <name> [reason]",
                "/scfake custom <message>"};
        for (String line : lines) {
            sender.sendMessage(Component.text(" " + line, NamedTextColor.GRAY)
                    .clickEvent(ClickEvent.suggestCommand(line.substring(0, line.indexOf(' ', 8) + 1))));
        }
    }

    private void death(ArgReader in) {
        Component victim = name(in.require("who died"));
        String cause = in.requireRest("how they died");
        String key = DEATHS.get(Text.lower(cause));
        if (key != null) {
            broadcast(Component.translatable(key, victim));
        } else {
            broadcast(Component.text().append(victim).append(Component.text(" ")).append(Text.parse(cause)).build());
        }
    }

    private void kill(ArgReader in, String key) {
        Component killer = name(in.require("the killer"));
        Component victim = name(in.require("the victim"));
        String weapon = in.rest();
        if (weapon.isEmpty()) {
            broadcast(Component.translatable(key, victim, killer));
        } else {
            Component item = Component.text().append(Component.text("[")).append(Text.parse(weapon)).append(Component.text("]"))
                    .hoverEvent(HoverEvent.showText(Text.parse(weapon))).build();
            broadcast(Component.translatable(key + ".item", victim, killer, item));
        }
    }

    private void advancement(CommandSender sender, ArgReader in) {
        String nameArg = in.require("a name");
        String frame = frame(in.require("task, goal or challenge"));
        String[] text = splitDescription(in.requireRest("the advancement title"));
        TextColor color = frame.equals("challenge") ? NamedTextColor.DARK_PURPLE : NamedTextColor.GREEN;
        Component title = Text.parse(text[0]);
        Component hover = title.colorIfAbsent(color);
        if (!text[1].isEmpty()) {
            hover = hover.append(Component.newline()).append(Text.parse(text[1]));
        }
        Component shown = Component.text().color(color)
                .append(Component.text("[")).append(title).append(Component.text("]"))
                .hoverEvent(HoverEvent.showText(hover)).build();
        broadcast(Component.translatable("chat.type.advancement." + frame, name(nameArg), shown));

        Player real = Targets.find(nameArg);
        if (real != null && plugin.getConfig().getBoolean("fake.advancement-toast", true)) {
            plugin.toasts().show(List.of(real), frame.equals("challenge") ? "nether_star" : "diamond", frame,
                    title, text[1].isEmpty() ? Component.empty() : Text.parse(text[1]));
        }
    }

    private void toast(CommandSender sender, ArgReader in) {
        List<Player> players = Targets.resolve(sender, in.require("who sees it (player, @a, all)"));
        String frame = frame(in.require("task, goal or challenge"));
        String icon = Text.lower(in.require("an icon item, like diamond"));
        String[] text = splitDescription(in.requireRest("the title"));
        plugin.toasts().show(players, icon, frame, Text.parse(text[0]), text[1].isEmpty() ? Component.empty() : Text.parse(text[1]));
        Text.ok(sender, "Toast shown to <count> player(s).", Text.arg("count", players.size()));
    }

    private static String frame(String input) {
        String frame = Text.lower(input);
        if (!ToastSender.FRAMES.contains(frame)) {
            throw new CommandFail("Type must be task, goal or challenge.");
        }
        return frame;
    }

    private static String[] splitDescription(String text) {
        int bar = text.indexOf('|');
        if (bar < 0) {
            return new String[]{text.trim(), ""};
        }
        return new String[]{text.substring(0, bar).trim(), text.substring(bar + 1).trim()};
    }

    private static Component admin(Component who, ComponentLike what) {
        return Component.translatable("chat.type.admin", who, what)
                .color(NamedTextColor.GRAY).decorate(TextDecoration.ITALIC);
    }

    private static void broadcast(Component message) {
        Bukkit.broadcast(message);
    }

    /** A name exactly like the game shows it: hover card with the player's info, click to message them. */
    private Component name(String raw) {
        Player online = Bukkit.getPlayerExact(raw);
        if (online != null) {
            return plugin.disguises().nameWithHover(online)
                    .clickEvent(ClickEvent.suggestCommand("/tell " + online.getName() + " "));
        }
        Component display = Text.parse(raw);
        String plain = Text.plain(display);
        UUID fakeId = UUID.nameUUIDFromBytes(("OfflinePlayer:" + plain).getBytes(StandardCharsets.UTF_8));
        return display
                .hoverEvent(HoverEvent.showEntity(Key.key("minecraft", "player"), fakeId, Component.text(plain)))
                .clickEvent(ClickEvent.suggestCommand("/tell " + plain + " "));
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        if (args.length == 1) {
            return Targets.filter(SUBCOMMANDS, args[0]);
        }
        String sub = Text.lower(args[0]);
        String last = args[args.length - 1];
        return switch (sub) {
            case "death", "die" -> args.length == 2 ? Targets.filter(Targets.names(), last)
                    : args.length == 3 ? Targets.filter(DEATHS.keySet(), last) : List.of();
            case "kill", "shot" -> args.length <= 3 ? Targets.filter(Targets.names(), last)
                    : args.length == 4 ? Targets.filter(List.of("Diamond_Sword", "Netherite_Sword", "Bow", "<aqua>Excalibur"), last) : List.of();
            case "advancement", "achievement", "adv" -> args.length == 2 ? Targets.filter(Targets.names(), last)
                    : args.length == 3 ? Targets.filter(ToastSender.FRAMES, last) : List.of();
            case "toast" -> switch (args.length) {
                case 2 -> Targets.filter(Targets.namesAndSelectors(), last);
                case 3 -> Targets.filter(ToastSender.FRAMES, last);
                case 4 -> Targets.filter(items(), last);
                default -> List.of();
            };
            case "whisper", "msg", "tell" -> args.length <= 3 ? Targets.filter(
                    args.length == 3 ? Targets.namesAndSelectors() : Targets.names(), last) : List.of();
            case "gamemode", "gm" -> args.length == 2 ? Targets.filter(Targets.names(), last)
                    : args.length == 3 ? Targets.filter(List.of("survival", "creative", "adventure", "spectator"), last) : List.of();
            case "join", "leave", "quit", "chat", "say", "command", "cmd", "op", "deop", "kick" ->
                    args.length == 2 ? Targets.filter(Targets.names(), last) : List.of();
            default -> List.of();
        };
    }

    private static List<String> items() {
        List<String> items = new ArrayList<>();
        for (Material material : Material.values()) {
            if (material.isItem() && !material.name().startsWith("LEGACY_")) {
                items.add(Text.lower(material.name()));
            }
        }
        return items;
    }
}
