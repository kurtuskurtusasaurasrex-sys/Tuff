package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.disguise.DisguiseData;
import com.sigmacinematic.disguise.DisguiseManager;
import com.sigmacinematic.util.ArgReader;
import com.sigmacinematic.util.CommandFail;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.List;

/**
 * /scnick &lt;name&gt; [player]      - become someone else (tab, nametag, chat, join/leave/death/kill messages)
 * /scnick reset [player]
 * /scnick style [player] &lt;format&gt; - colored name/rank for chat + tab, e.g. {@code <red>[Owner] <name>}
 * /scnick style [player] reset
 */
public final class NickCommand extends BaseCommand {

    public NickCommand(SigmaCinematic plugin) {
        super(plugin);
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        DisguiseManager disguises = plugin.disguises();
        ArgReader in = new ArgReader(args);
        String first = in.next();
        if (first == null) {
            Player player = self(sender);
            DisguiseData d = disguises.get(player.getUniqueId());
            Text.send(sender, "<gray>You are <white><shown></white> (real name <white><real></white>)."
                            + " Use <white>/scnick <name></white> to change it.",
                    Text.arg("shown", player.getName()), Text.arg("real", d == null ? player.getName() : d.realName));
            return;
        }

        if (first.equalsIgnoreCase("style")) {
            style(sender, in);
            return;
        }

        Player target = in.hasNext() ? Targets.player(in.next()) : self(sender);
        if (first.equalsIgnoreCase("reset") || first.equalsIgnoreCase("off")) {
            disguises.setNick(target, null);
            Text.ok(sender, "<name>'s name is back to normal.", Text.arg("name", target.getName()));
            return;
        }
        if (!DisguiseManager.VALID_NAME.matcher(first).matches()) {
            throw new CommandFail("Names must be 1-16 letters, numbers or _ (for colors use /scnick style).");
        }
        if (disguises.nameTaken(first, target)) {
            throw new CommandFail(first + " is already online - pick a name nobody is using.");
        }
        String before = target.getName();
        disguises.setNick(target, first);
        Text.ok(sender, "<before> is now known as <after> everywhere.",
                Text.arg("before", before), Text.arg("after", target.getName()));
    }

    private void style(CommandSender sender, ArgReader in) {
        Player target;
        String maybePlayer = in.peek();
        Player named = maybePlayer == null ? null : Targets.find(maybePlayer);
        if (named != null && named.getName().equalsIgnoreCase(maybePlayer)) {
            in.next();
            target = named;
        } else {
            target = self(sender);
        }
        String format = in.requireRest("a style, like <red>[Owner] <name>");
        if (format.equalsIgnoreCase("reset") || format.equalsIgnoreCase("off")) {
            plugin.disguises().setStyle(target, null);
            Text.ok(sender, "Removed <name>'s name style.", Text.arg("name", target.getName()));
            return;
        }
        if (!format.contains("<name>")) {
            format = format + "<name>";
        }
        plugin.disguises().setStyle(target, format);
        sender.sendMessage(Text.parse("<green>Name style set: </green>").append(plugin.disguises().displayName(target)));
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        if (args.length == 1) {
            List<String> options = new java.util.ArrayList<>(List.of("reset", "style"));
            return Targets.filter(options, args[0]);
        }
        if (args.length == 2 && args[0].equalsIgnoreCase("style")) {
            List<String> options = new java.util.ArrayList<>(Targets.names());
            options.addAll(List.of("reset", "<red>[Owner] <name>", "<gradient:gold:yellow><name>"));
            return Targets.filter(options, args[1]);
        }
        if (args.length == 2) {
            return Targets.filter(Targets.names(), args[1]);
        }
        return List.of();
    }
}
