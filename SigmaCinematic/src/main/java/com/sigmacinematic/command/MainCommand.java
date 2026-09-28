package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.event.HoverEvent;
import net.kyori.adventure.text.format.NamedTextColor;
import org.bukkit.command.CommandSender;

import java.util.List;

/** /sigmacinematic [help|reload] */
public final class MainCommand extends BaseCommand {

    private static final String[][] HELP = {
            {"/scnick <name> [player]", "Change your name everywhere (tab, nametag, join/leave, deaths)"},
            {"/scnick style <format>", "Colored name / fake rank in chat + tab"},
            {"/scskin <link|player> [slim]", "Change your skin from a link or another player"},
            {"/scwho [name]", "See who is really behind each fake name"},
            {"/scfake ", "Fake join/leave/death/kill/advancement/toast/chat/command messages"},
            {"/sctell <players> <text>", "Easy tellraw (colors, hover, click) - /sctell json to export"},
            {"/sctitle <players> <title> | <sub>", "Big title on screen"},
            {"/scactionbar <players> <text>", "Text above the hotbar"},
            {"/scdim <dimension> [players]", "Teleport to the spawn of any dimension"},
            {"/scmusic play <youtube link> [players]", "Play music from YouTube"},
            {"/scfreeze <players> [on|off]", "Freeze actors in place"},
            {"/scvanish [player]", "Invisible camera operator"},
            {"/scblackout <players> <seconds> [text]", "Fade to black"},
            {"/sccountdown <seconds> [players] [text]", "3, 2, 1, Action!"},
            {"/scsudo <player> <message|/command>", "Make someone talk or run a command"},
    };

    public MainCommand(SigmaCinematic plugin) {
        super(plugin);
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        if (args.length > 0 && args[0].equalsIgnoreCase("reload")) {
            plugin.reloadConfig();
            plugin.disguises().load();
            plugin.music().reload();
            Text.ok(sender, "Config reloaded. (A new music web-server port needs a restart.)");
            return;
        }
        Text.send(sender, "<gray>v<version> - click a command to use it.",
                Text.arg("version", plugin.getPluginMeta().getVersion()));
        for (String[] entry : HELP) {
            String suggest = entry[0].contains("<") ? entry[0].substring(0, entry[0].indexOf('<')) : entry[0];
            sender.sendMessage(Component.text(" " + entry[0], NamedTextColor.LIGHT_PURPLE)
                    .append(Component.text(" - " + entry[1], NamedTextColor.GRAY))
                    .hoverEvent(HoverEvent.showText(Component.text("Click to type " + suggest)))
                    .clickEvent(ClickEvent.suggestCommand(suggest)));
        }
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        return args.length == 1 ? Targets.filter(List.of("help", "reload"), args[0]) : List.of();
    }
}
