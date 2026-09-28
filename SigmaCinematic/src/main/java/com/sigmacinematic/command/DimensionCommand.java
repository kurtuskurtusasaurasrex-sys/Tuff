package com.sigmacinematic.command;

import com.sigmacinematic.SigmaCinematic;
import com.sigmacinematic.util.ArgReader;
import com.sigmacinematic.util.CommandFail;
import com.sigmacinematic.util.Targets;
import com.sigmacinematic.util.Text;
import org.bukkit.Bukkit;
import org.bukkit.Location;
import org.bukkit.Material;
import org.bukkit.World;
import org.bukkit.block.Block;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

import java.util.ArrayList;
import java.util.List;

/**
 * /scdim &lt;dimension&gt; [players] - teleports to the spawn of any dimension on the server
 * (overworld, nether, end, and any datapack/custom dimension), always landing somewhere safe.
 * /scdim list
 */
public final class DimensionCommand extends BaseCommand {

    public DimensionCommand(SigmaCinematic plugin) {
        super(plugin);
    }

    @Override
    protected void execute(CommandSender sender, String[] args) {
        ArgReader in = new ArgReader(args);
        String name = in.next();
        if (name == null || name.equalsIgnoreCase("list")) {
            list(sender);
            return;
        }
        World world = resolve(name);
        if (world == null) {
            throw new CommandFail("No dimension called " + name + ". Try /scdim list.");
        }
        List<Player> players = in.hasNext() ? Targets.resolve(sender, in.next()) : List.of(self(sender));
        world.getChunkAtAsync(world.getSpawnLocation()).thenAccept(chunk -> {
            Location spawn = safeSpawn(world);
            for (Player player : players) {
                player.teleportAsync(spawn);
            }
            Text.ok(sender, "Teleported <count> player(s) to the spawn of <world>.",
                    Text.arg("count", players.size()), Text.arg("world", world.getKey().asString()));
        });
    }

    private void list(CommandSender sender) {
        Text.send(sender, "<gold>Dimensions:");
        for (World world : Bukkit.getWorlds()) {
            Text.send(sender, "<gray>- <white><name></white> <dark_gray>(<key>, <env>)",
                    Text.arg("name", world.getName()), Text.arg("key", world.getKey().asString()),
                    Text.arg("env", Text.lower(world.getEnvironment().name())));
        }
    }

    static World resolve(String input) {
        String s = Text.lower(input);
        World.Environment alias = switch (s) {
            case "overworld", "world", "normal" -> World.Environment.NORMAL;
            case "nether", "the_nether", "hell" -> World.Environment.NETHER;
            case "end", "the_end" -> World.Environment.THE_END;
            default -> null;
        };
        for (World world : Bukkit.getWorlds()) {
            if (world.getName().equalsIgnoreCase(input) || world.getKey().asString().equals(s)
                    || world.getKey().getKey().equals(s)) {
                return world;
            }
        }
        if (alias != null) {
            for (World world : Bukkit.getWorlds()) {
                if (world.getEnvironment() == alias) {
                    return world;
                }
            }
        }
        return null;
    }

    /** The dimension's spawn point, nudged to a spot where you won't suffocate, fall or burn. */
    private static Location safeSpawn(World world) {
        Location spawn = world.getSpawnLocation();
        if (world.getEnvironment() == World.Environment.THE_END) {
            // Same place vanilla puts you when you enter the End: the obsidian platform.
            buildEndPlatform(world);
            return new Location(world, 100.5, 50, 0.5, 90f, 0f);
        }
        int x = spawn.getBlockX();
        int z = spawn.getBlockZ();
        if (world.hasCeiling()) {
            int top = Math.min(world.getLogicalHeight(), world.getMaxHeight()) - 2;
            for (int radius = 0; radius <= 24; radius += 4) {
                for (int dx = -radius; dx <= radius; dx += Math.max(1, radius)) {
                    for (int dz = -radius; dz <= radius; dz += Math.max(1, radius)) {
                        for (int y = top; y > world.getMinHeight(); y--) {
                            if (safe(world, x + dx, y, z + dz)) {
                                return new Location(world, x + dx + 0.5, y, z + dz + 0.5, spawn.getYaw(), 0f);
                            }
                        }
                    }
                }
            }
            // Nothing safe nearby: make a small platform in the open.
            int y = Math.max(world.getMinHeight() + 5, Math.min(top - 4, 70));
            platform(world, x, y - 1, z, Material.OBSIDIAN);
            return new Location(world, x + 0.5, y, z + 0.5, spawn.getYaw(), 0f);
        }
        int y = spawn.getBlockY();
        if (!safe(world, x, y, z)) {
            y = world.getHighestBlockYAt(x, z) + 1;
            if (!safe(world, x, y, z)) {
                platform(world, x, y - 1, z, Material.GLASS);
            }
        }
        return new Location(world, x + 0.5, y, z + 0.5, spawn.getYaw(), 0f);
    }

    private static boolean safe(World world, int x, int y, int z) {
        Block feet = world.getBlockAt(x, y, z);
        Block head = feet.getRelative(0, 1, 0);
        Block ground = feet.getRelative(0, -1, 0);
        return feet.isPassable() && !feet.isLiquid() && head.isPassable() && !head.isLiquid()
                && ground.getType().isSolid() && !hazard(ground.getType()) && !hazard(feet.getType());
    }

    private static boolean hazard(Material type) {
        return type == Material.LAVA || type == Material.MAGMA_BLOCK || type == Material.FIRE
                || type == Material.SOUL_FIRE || type == Material.CAMPFIRE || type == Material.SOUL_CAMPFIRE
                || type == Material.CACTUS || type == Material.POWDER_SNOW || type == Material.SWEET_BERRY_BUSH;
    }

    private static void platform(World world, int x, int y, int z, Material floor) {
        for (int dx = -1; dx <= 1; dx++) {
            for (int dz = -1; dz <= 1; dz++) {
                world.getBlockAt(x + dx, y, z + dz).setType(floor);
                world.getBlockAt(x + dx, y + 1, z + dz).setType(Material.AIR);
                world.getBlockAt(x + dx, y + 2, z + dz).setType(Material.AIR);
            }
        }
    }

    private static void buildEndPlatform(World world) {
        for (int dx = -2; dx <= 2; dx++) {
            for (int dz = -2; dz <= 2; dz++) {
                world.getBlockAt(100 + dx, 49, dz).setType(Material.OBSIDIAN);
                for (int dy = 1; dy <= 3; dy++) {
                    world.getBlockAt(100 + dx, 49 + dy, dz).setType(Material.AIR);
                }
            }
        }
    }

    @Override
    protected List<String> complete(CommandSender sender, String[] args) {
        if (args.length == 1) {
            List<String> options = new ArrayList<>(List.of("list", "overworld", "nether", "end"));
            for (World world : Bukkit.getWorlds()) {
                options.add(world.getName());
                options.add(world.getKey().asString());
            }
            return Targets.filter(options.stream().distinct().toList(), args[0]);
        }
        if (args.length == 2) {
            return Targets.filter(Targets.namesAndSelectors(), args[1]);
        }
        return List.of();
    }
}
