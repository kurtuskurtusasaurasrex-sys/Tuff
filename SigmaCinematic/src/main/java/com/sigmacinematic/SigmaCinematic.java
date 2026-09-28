package com.sigmacinematic;

import com.sigmacinematic.command.DimensionCommand;
import com.sigmacinematic.command.FakeCommand;
import com.sigmacinematic.command.MainCommand;
import com.sigmacinematic.command.MusicCommand;
import com.sigmacinematic.command.NickCommand;
import com.sigmacinematic.command.SceneCommand;
import com.sigmacinematic.command.SkinCommand;
import com.sigmacinematic.command.TellCommand;
import com.sigmacinematic.command.WhoCommand;
import com.sigmacinematic.disguise.DisguiseManager;
import com.sigmacinematic.disguise.SkinFetcher;
import com.sigmacinematic.fake.ToastSender;
import com.sigmacinematic.music.MusicManager;
import com.sigmacinematic.scene.SceneManager;
import org.bukkit.Bukkit;
import org.bukkit.command.PluginCommand;
import org.bukkit.command.TabExecutor;
import org.bukkit.entity.Player;
import org.bukkit.plugin.java.JavaPlugin;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

/** SigmaCinematic: identity, message and music tools for cinematics and roleplay. */
public final class SigmaCinematic extends JavaPlugin {

    private static SigmaCinematic instance;

    private ExecutorService async;
    private DisguiseManager disguises;
    private SkinFetcher skins;
    private SceneManager scenes;
    private ToastSender toasts;
    private MusicManager music;

    public static SigmaCinematic get() {
        return instance;
    }

    @Override
    public void onEnable() {
        instance = this;
        saveDefaultConfig();
        AtomicInteger threads = new AtomicInteger();
        async = Executors.newCachedThreadPool(r -> {
            Thread thread = new Thread(r, "SigmaCinematic-worker-" + threads.incrementAndGet());
            thread.setDaemon(true);
            return thread;
        });

        disguises = new DisguiseManager(this);
        disguises.load();
        skins = new SkinFetcher(this);
        scenes = new SceneManager(this);
        toasts = new ToastSender(this);
        music = new MusicManager(this);
        music.start();

        Bukkit.getPluginManager().registerEvents(disguises, this);
        Bukkit.getPluginManager().registerEvents(scenes, this);
        Bukkit.getPluginManager().registerEvents(music, this);

        register("sigmacinematic", new MainCommand(this));
        register("scnick", new NickCommand(this));
        register("scskin", new SkinCommand(this));
        register("scwho", new WhoCommand(this));
        register("scfake", new FakeCommand(this));
        register("sctell", new TellCommand(this, TellCommand.Mode.CHAT));
        register("sctitle", new TellCommand(this, TellCommand.Mode.TITLE));
        register("scactionbar", new TellCommand(this, TellCommand.Mode.ACTIONBAR));
        register("scdim", new DimensionCommand(this));
        register("scmusic", new MusicCommand(this));
        register("scfreeze", new SceneCommand(this, SceneCommand.Mode.FREEZE));
        register("scvanish", new SceneCommand(this, SceneCommand.Mode.VANISH));
        register("scblackout", new SceneCommand(this, SceneCommand.Mode.BLACKOUT));
        register("sccountdown", new SceneCommand(this, SceneCommand.Mode.COUNTDOWN));
        register("scsudo", new SceneCommand(this, SceneCommand.Mode.SUDO));

        // After a /reload, re-apply disguises to players who are already online.
        for (Player player : Bukkit.getOnlinePlayers()) {
            disguises.apply(player);
        }
    }

    @Override
    public void onDisable() {
        if (music != null) {
            music.shutdown();
        }
        if (disguises != null) {
            disguises.save();
        }
        if (async != null) {
            async.shutdownNow();
        }
    }

    private void register(String name, TabExecutor executor) {
        PluginCommand command = getCommand(name);
        if (command == null) {
            getLogger().severe("Command /" + name + " is missing from plugin.yml");
            return;
        }
        command.setExecutor(executor);
        command.setTabCompleter(executor);
    }

    public ExecutorService async() {
        return async;
    }

    public DisguiseManager disguises() {
        return disguises;
    }

    public SkinFetcher skins() {
        return skins;
    }

    public SceneManager scenes() {
        return scenes;
    }

    public ToastSender toasts() {
        return toasts;
    }

    public MusicManager music() {
        return music;
    }
}
