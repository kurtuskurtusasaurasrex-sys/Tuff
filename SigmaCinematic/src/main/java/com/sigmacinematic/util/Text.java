package com.sigmacinematic.util;

import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.minimessage.MiniMessage;
import net.kyori.adventure.text.minimessage.tag.resolver.Placeholder;
import net.kyori.adventure.text.minimessage.tag.resolver.TagResolver;
import net.kyori.adventure.text.serializer.plain.PlainTextComponentSerializer;
import org.bukkit.command.CommandSender;

import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Message helpers. All user text is MiniMessage, with old-school &-color codes also accepted. */
public final class Text {

    public static final MiniMessage MM = MiniMessage.miniMessage();

    private static final Component PREFIX = MM.deserialize(
            "<dark_gray>[<gradient:#ff5fd2:#8b5cff>SigmaCinematic</gradient>]</dark_gray> ");

    private static final Pattern HEX = Pattern.compile("[&§]#([0-9a-fA-F]{6})");
    private static final Pattern LEGACY = Pattern.compile("[&§]([0-9a-fk-orA-FK-OR])");
    private static final Map<Character, String> CODES = Map.ofEntries(
            Map.entry('0', "black"), Map.entry('1', "dark_blue"), Map.entry('2', "dark_green"),
            Map.entry('3', "dark_aqua"), Map.entry('4', "dark_red"), Map.entry('5', "dark_purple"),
            Map.entry('6', "gold"), Map.entry('7', "gray"), Map.entry('8', "dark_gray"),
            Map.entry('9', "blue"), Map.entry('a', "green"), Map.entry('b', "aqua"),
            Map.entry('c', "red"), Map.entry('d', "light_purple"), Map.entry('e', "yellow"),
            Map.entry('f', "white"), Map.entry('k', "obfuscated"), Map.entry('l', "bold"),
            Map.entry('m', "strikethrough"), Map.entry('n', "underlined"), Map.entry('o', "italic"),
            Map.entry('r', "reset"));

    private Text() {
    }

    /** Parses MiniMessage (and &-codes) into a component. */
    public static Component parse(String input, TagResolver... resolvers) {
        return MM.deserialize(legacyToMini(input), resolvers);
    }

    public static String legacyToMini(String input) {
        if (input.indexOf('&') < 0 && input.indexOf('§') < 0) {
            return input;
        }
        String out = HEX.matcher(input).replaceAll("<#$1>");
        Matcher m = LEGACY.matcher(out);
        StringBuilder sb = new StringBuilder();
        while (m.find()) {
            char code = Character.toLowerCase(m.group(1).charAt(0));
            m.appendReplacement(sb, "<" + CODES.get(code) + ">");
        }
        m.appendTail(sb);
        return sb.toString();
    }

    public static String plain(Component component) {
        return PlainTextComponentSerializer.plainText().serialize(component);
    }

    /** A placeholder whose value is inserted as plain text (never parsed as tags). */
    public static TagResolver arg(String key, Object value) {
        return Placeholder.unparsed(key, String.valueOf(value));
    }

    public static void send(CommandSender to, String mini, TagResolver... resolvers) {
        to.sendMessage(PREFIX.append(MM.deserialize(mini, resolvers)));
    }

    public static void ok(CommandSender to, String mini, TagResolver... resolvers) {
        send(to, "<green>" + mini, resolvers);
    }

    public static void error(CommandSender to, String mini, TagResolver... resolvers) {
        send(to, "<red>" + mini, resolvers);
    }

    public static String lower(String s) {
        return s.toLowerCase(Locale.ROOT);
    }
}
