package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.util.CommandFail;
import com.sigmacinematic.util.Text;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.command.TabExecutor;
import org.bukkit.entity.Player;

import java.util.List;

/** Shared admin check + error handling for every SigmaCinematic command. */
public abstract class BaseCommand implements TabExecutor {

    public static final String PERMISSION = "sigmacinematic.admin";

    protected final SigmaCinematic plugin;

    protected BaseCommand(SigmaCinematic plugin) {
        this.plugin = plugin;
    }

    @Override
    public final boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!sender.hasPermission(PERMISSION)) {
            Text.error(sender, "Only admins can use SigmaCinematic.");
            return true;
        }
        try {
            execute(sender, args);
        } catch (CommandFail fail) {
            Text.error(sender, "<msg>", Text.arg("msg", fail.getMessage()));
        } catch (IllegalArgumentException ex) {
            Text.error(sender, "<msg>", Text.arg("msg", String.valueOf(ex.getMessage())));
        }
        return true;
    }

    @Override
    public final List<String> onTabComplete(CommandSender sender, Command command, String alias, String[] args) {
        if (!sender.hasPermission(PERMISSION)) {
            return List.of();
        }
        List<String> result = complete(sender, args);
        return result == null ? List.of() : result;
    }

    protected abstract void execute(CommandSender sender, String[] args);

    protected List<String> complete(CommandSender sender, String[] args) {
        return List.of();
    }

    protected static Player self(CommandSender sender) {
        if (sender instanceof Player player) {
            return player;
        }
        throw new CommandFail("From the console you have to name a player.");
    }
}
