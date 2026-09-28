package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.util.ArgReader;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.event.HoverEvent;
import net.kyori.adventure.text.format.NamedTextColor;
import net.kyori.adventure.text.minimessage.tag.resolver.Placeholder;
import net.kyori.adventure.text.serializer.gson.GsonComponentSerializer;
import net.kyori.adventure.title.Title;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.time.Duration;
import java.util.List;

/**
 * Easy tellraw. Text uses simple tags instead of JSON:
 * {@code <red>}, {@code <bold>}, {@code <gradient:gold:red>}, {@code <hover:show_text:'hi'>},
 * {@code <click:run_command:'/spawn'>}, {@code <player>} (the reader's name), and &-codes.
 *
 * <ul>
 *   <li>/sctell &lt;players&gt; &lt;message&gt;</li>
 *   <li>/sctell json &lt;message&gt; - gives you the real /tellraw command to copy (for command blocks)</li>
 *   <li>/sctitle &lt;players&gt; &lt;title&gt; [| subtitle]   (or "clear")</li>
 *   <li>/scactionbar &lt;players&gt; &lt;message&gt;</li>
 * </ul>
 */
public final class TellCommand extends BaseCommand {

    public enum Mode { CHAT, TITLE, ACTIONBAR }

    private final Mode mode;

    public TellCommand(SigmaCinematic plugin, Mode mode) {
        super(plugin);
        this.mode = mode;
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        ArgReader in = new ArgReader(args);
        String who = in.require("who to send it to (player, @a, all)");
        if (mode == Mode.CHAT && who.equalsIgnoreCase("json")) {
            json(sender, in.requireRest("a message"));
            return;
        }
        List<Player> players = Targets.resolve(sender, who);
        String message = in.requireRest("a message");
        for (Player player : players) {
            Component reader = plugin.disguises().displayName(player);
            switch (mode) {
                case CHAT -> player.sendMessage(Text.parse(message, Placeholder.component("player", reader)));
                case ACTIONBAR -> player.sendActionBar(Text.parse(message, Placeholder.component("player", reader)));
                case TITLE -> title(player, message, reader);
            }
        }
        if (!(sender instanceof Player p && players.size() == 1 && players.get(0).equals(p))) {
            Text.ok(sender, "Sent to <count> player(s).", Text.arg("count", players.size()));
        }
    }

    private void title(Player player, String message, Component reader) {
        if (message.equalsIgnoreCase("clear")) {
            player.clearTitle();
            return;
        }
        var nameTag = Placeholder.component("player", reader);
        int bar = message.indexOf('|');
        Component title = Text.parse(bar < 0 ? message.trim() : message.substring(0, bar).trim(), nameTag);
        Component subtitle = bar < 0 ? Component.empty() : Text.parse(message.substring(bar + 1).trim(), nameTag);
        Title.Times times = Title.Times.times(
                ticks(plugin.getConfig().getInt("titles.fade-in", 10)),
                ticks(plugin.getConfig().getInt("titles.stay", 70)),
                ticks(plugin.getConfig().getInt("titles.fade-out", 20)));
        player.showTitle(Title.title(title, subtitle, times));
    }

    private static Duration ticks(int ticks) {
        return Duration.ofMillis(ticks * 50L);
    }

    private void json(CommandSender sender, String message) {
        Component component = Text.parse(message);
        String command = "/tellraw @a " + GsonComponentSerializer.gson().serialize(component);
        sender.sendMessage(Component.text("Preview: ", NamedTextColor.GRAY).append(component));
        sender.sendMessage(Component.text("[Click to copy the /tellraw command]", NamedTextColor.AQUA)
                .hoverEvent(HoverEvent.showText(Component.text(command)))
                .clickEvent(ClickEvent.copyToClipboard(command)));
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        if (args.length == 1) {
            List<String> options = new java.util.ArrayList<>(Targets.namesAndSelectors());
            if (mode == Mode.CHAT) {
                options.add("json");
            }
            return Targets.filter(options, args[0]);
        }
        if (args.length == 2) {
            List<String> examples = switch (mode) {
                case CHAT -> List.of("<gold>Hello <player>!", "<gradient:red:gold>", "<hover:show_text:'hi'>", "<click:run_command:'/spawn'>");
                case TITLE -> List.of("clear", "<red><bold>Chapter 1", "<gold>Title | <gray>subtitle");
                case ACTIONBAR -> List.of("<yellow>", "<gradient:aqua:blue>");
            };
            return Targets.filter(examples, args[1]);
        }
        return List.of();
    }
}
