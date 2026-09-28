package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.music.MusicManager;
import com.sigmacinematic.music.Track;
import com.sigmacinematic.util.ArgReader;
import com.sigmacinematic.util.CommandFail;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import net.kyori.adventure.text.Component;
import net.kyori.adventure.text.event.ClickEvent;
import net.kyori.adventure.text.event.HoverEvent;
import net.kyori.adventure.text.format.NamedTextColor;
import org.bukkit.Bukkit;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

/**
 * /scmusic play &lt;youtube link | #number&gt; [players]
 * /scmusic loop &lt;youtube link | #number&gt; [players]
 * /scmusic stop [players]
 * /scmusic list
 * /scmusic delete &lt;#number&gt;
 * /scmusic unload [players]
 * /scmusic status
 */
public final class MusicCommand extends BaseCommand {

    private static final List<String> SUBCOMMANDS = List.of("play", "loop", "stop", "list", "delete", "unload", "status");

    public MusicCommand(SigmaCinematic plugin) {
        super(plugin);
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        MusicManager music = plugin.music();
        ArgReader in = new ArgReader(args);
        String sub = in.next();
        if (sub == null) {
            help(sender);
            return;
        }
        switch (Text.lower(sub)) {
            case "play", "loop" -> {
                String link = in.require("a YouTube link (or a number from /scmusic list)");
                List<Player> targets = Targets.resolve(sender, in.hasNext() ? in.next() : "all");
                music.play(sender, link, targets, Text.lower(sub).equals("loop"));
            }
            case "stop" -> {
                List<Player> targets = Targets.resolve(sender, in.hasNext() ? in.next() : "all");
                targets.forEach(music::stop);
                Text.ok(sender, "Stopped music for <count> player(s).", Text.arg("count", targets.size()));
            }
            case "list" -> list(sender);
            case "delete" -> {
                Track track = music.find(in.require("a song number"));
                if (track == null) {
                    throw new CommandFail("No such song. See /scmusic list.");
                }
                for (Player player : Bukkit.getOnlinePlayers()) {
                    if (track.equals(music.nowPlaying(player))) {
                        music.stop(player);
                    }
                }
                music.delete(track);
                Text.ok(sender, "Deleted <title>.", Text.arg("title", track.title()));
            }
            case "unload" -> {
                List<Player> targets = Targets.resolve(sender, in.hasNext() ? in.next() : "all");
                int packs = music.unload(targets);
                Text.ok(sender, "Removed <packs> music pack(s) from <count> player(s).",
                        Text.arg("packs", packs), Text.arg("count", targets.size()));
            }
            case "status" -> Text.send(sender, "<gray>Music: <white><status></white>, <white><songs></white> song(s) cached.",
                    Text.arg("status", music.status()), Text.arg("songs", music.tracks().size()));
            default -> help(sender);
        }
    }

    private void help(CommandSender sender) {
        Text.send(sender, "<gold>Music</gold> <gray>(YouTube and most music/video sites):");
        for (String line : new String[]{
                "/scmusic play <link|#> [players]", "/scmusic loop <link|#> [players]", "/scmusic stop [players]",
                "/scmusic list", "/scmusic delete <#>", "/scmusic unload [players]", "/scmusic status"}) {
            sender.sendMessage(Component.text(" " + line, NamedTextColor.GRAY)
                    .clickEvent(ClickEvent.suggestCommand(line.indexOf(' ', 9) < 0 ? line : line.substring(0, line.indexOf(' ', 9) + 1))));
        }
    }

    private void list(CommandSender sender) {
        List<Track> tracks = plugin.music().tracks();
        if (tracks.isEmpty()) {
            Text.send(sender, "<gray>No songs yet. Play one with <white>/scmusic play <link></white>.");
            return;
        }
        Text.send(sender, "<gold>Cached songs</gold> <gray>(click to play for everyone):");
        for (int i = 0; i < tracks.size(); i++) {
            Track track = tracks.get(i);
            String command = "/scmusic play #" + (i + 1);
            sender.sendMessage(Component.text(" #" + (i + 1) + " ", NamedTextColor.GOLD)
                    .append(Component.text(track.title(), NamedTextColor.WHITE))
                    .append(Component.text(" [" + track.duration() + "]", NamedTextColor.GRAY))
                    .hoverEvent(HoverEvent.showText(Component.text(track.url() + "\nClick: " + command)))
                    .clickEvent(ClickEvent.runCommand(command)));
        }
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        if (args.length == 1) {
            return Targets.filter(SUBCOMMANDS, args[0]);
        }
        String sub = Text.lower(args[0]);
        if (args.length == 2 && (sub.equals("play") || sub.equals("loop") || sub.equals("delete"))) {
            List<String> options = new ArrayList<>();
            options.add("https://www.youtube.com/watch?v=");
            for (int i = 1; i <= plugin.music().tracks().size(); i++) {
                options.add("#" + i);
            }
            return Targets.filter(options, args[1]);
        }
        if ((args.length == 3 && (sub.equals("play") || sub.equals("loop")))
                || (args.length == 2 && (sub.equals("stop") || sub.equals("unload")))) {
            return Targets.filter(Targets.namesAndSelectors(), args[args.length - 1]);
        }
        return List.of();
    }
}
