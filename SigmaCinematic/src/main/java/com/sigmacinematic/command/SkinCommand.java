package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.util.ArgReader;
import com.sigmacinematic.util.CommandFail;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.List;
import java.util.UUID;

/**
 * /scskin &lt;link | player name&gt; [slim|classic] [player]
 * /scskin reset [player]
 */
public final class SkinCommand extends BaseCommand {

    public SkinCommand(SigmaCinematic plugin) {
        super(plugin);
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        ArgReader in = new ArgReader(args);
        String source = in.next();
        if (source == null) {
            throw new CommandFail("Usage: /scskin <skin link | player name> [slim|classic] [player]  or  /scskin reset [player]");
        }
        String next = in.next();
        boolean slim = plugin.getConfig().getString("skins.default-variant", "classic").equalsIgnoreCase("slim");
        if (next != null && (next.equalsIgnoreCase("slim") || next.equalsIgnoreCase("classic"))) {
            slim = next.equalsIgnoreCase("slim");
            next = in.next();
        }
        Player target = next != null ? Targets.player(next) : self(sender);

        if (source.equalsIgnoreCase("reset") || source.equalsIgnoreCase("off")) {
            plugin.disguises().setSkin(target, null);
            Text.ok(sender, "<name> has their real skin back.", Text.arg("name", target.getName()));
            return;
        }

        UUID targetId = target.getUniqueId();
        Text.send(sender, "<gray>Fetching skin <white><src></white>...", Text.arg("src", source));
        plugin.skins().fetch(source, slim).whenComplete((skin, error) -> Bukkit.getScheduler().runTask(plugin, () -> {
            if (error != null) {
                Throwable cause = error.getCause() != null ? error.getCause() : error;
                Text.error(sender, "Could not load that skin: <why>", Text.arg("why", String.valueOf(cause.getMessage())));
                return;
            }
            Player online = Bukkit.getPlayer(targetId);
            if (online == null) {
                Text.error(sender, "That player left before the skin finished loading.");
                return;
            }
            plugin.disguises().setSkin(online, skin);
            Text.ok(sender, "<name> now has the skin from <src>.", Text.arg("name", online.getName()), Text.arg("src", skin.source()));
        }));
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        if (args.length == 1) {
            List<String> options = new java.util.ArrayList<>(List.of("reset", "https://"));
            options.addAll(Targets.names());
            return Targets.filter(options, args[0]);
        }
        if (args.length == 2) {
            List<String> options = new java.util.ArrayList<>(List.of("slim", "classic"));
            options.addAll(Targets.names());
            return Targets.filter(options, args[1]);
        }
        if (args.length == 3) {
            return Targets.filter(Targets.names(), args[2]);
        }
        return List.of();
    }
}
