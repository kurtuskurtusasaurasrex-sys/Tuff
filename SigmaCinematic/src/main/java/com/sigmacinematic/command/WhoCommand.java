package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.disguise.DisguiseData;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.List;

/** /scwho [name] - who is really behind each fake name, and which skin they wear. */
public final class WhoCommand extends BaseCommand {

    public WhoCommand(SigmaCinematic plugin) {
        super(plugin);
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        if (args.length > 0) {
            show(sender, Targets.player(args[0]));
            return;
        }
        int count = 0;
        Text.send(sender, "<gold>Disguised players:");
        for (Player player : Bukkit.getOnlinePlayers()) {
            if (plugin.disguises().get(player.getUniqueId()) != null) {
                show(sender, player);
                count++;
            }
        }
        if (count == 0) {
            Text.send(sender, "<gray>Nobody online is disguised.");
        }
    }

    private void show(CommandSender sender, Player player) {
        DisguiseData d = plugin.disguises().get(player.getUniqueId());
        if (d == null) {
            Text.send(sender, "<white><name></white> <gray>is not disguised.", Text.arg("name", player.getName()));
            return;
        }
        Text.send(sender, "<white><shown></white> <gray>is really</gray> <yellow><real></yellow> <dark_gray>(<uuid>)</dark_gray>"
                        + "<gray> | skin: <white><skin></white>",
                Text.arg("shown", player.getName()), Text.arg("real", d.realName), Text.arg("uuid", d.uuid),
                Text.arg("skin", d.skinSource == null ? "their own" : d.skinSource));
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        return args.length == 1 ? Targets.filter(Targets.names(), args[0]) : List.of();
    }
}
