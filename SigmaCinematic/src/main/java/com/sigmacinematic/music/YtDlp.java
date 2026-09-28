package com.sigmacinematic.music;

import com.sigmacinematic.SigmaCinematic;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.TimeUnit;

/** Wrapper around the yt-dlp program, which downloads the audio from YouTube (and many other sites). */
final class YtDlp {

    record Meta(String extractor, String id, String title, int durationSeconds) {
    }

    private record Result(int exitCode, List<String> output) {
    }

    private final SigmaCinematic plugin;
    private volatile String executable;

    YtDlp(SigmaCinematic plugin) {
        this.plugin = plugin;
    }

    /** Finds a working yt-dlp, downloading the official standalone build into plugins/SigmaCinematic/bin if allowed. */
    synchronized String executable() throws IOException {
        if (executable != null) {
            return executable;
        }
        String configured = plugin.getConfig().getString("music.yt-dlp-path", "yt-dlp");
        if (works(configured)) {
            return executable = configured;
        }
        File local = new File(plugin.getDataFolder(), "bin/" + assetName());
        if (!local.isFile()) {
            if (!plugin.getConfig().getBoolean("music.auto-download-yt-dlp", true)) {
                throw new IOException("yt-dlp was not found. Install it (https://github.com/yt-dlp/yt-dlp) "
                        + "or set music.yt-dlp-path in config.yml.");
            }
            download(local);
        }
        if (!works(local.getAbsolutePath())) {
            throw new IOException("Downloaded yt-dlp does not run on this machine. Install it manually and set music.yt-dlp-path.");
        }
        return executable = local.getAbsolutePath();
    }

    synchronized void forget() {
        executable = null;
    }

    Meta metadata(String url) throws IOException {
        List<String> cmd = base();
        cmd.addAll(List.of("--skip-download", "--print", "%(extractor_key)s\t%(id)s\t%(duration)s\t%(title)s", url));
        Result result = run(cmd, 60);
        for (String line : result.output()) {
            String[] parts = line.split("\t", 4);
            if (parts.length == 4) {
                int duration;
                try {
                    duration = (int) Math.round(Double.parseDouble(parts[2]));
                } catch (NumberFormatException ex) {
                    duration = -1;
                }
                return new Meta(parts[0], parts[1], parts[3], duration);
            }
        }
        throw new IOException(describeError(result, "Could not read that link."));
    }

    /** Downloads the audio as Ogg Vorbis (the only format Minecraft plays) into {@code dir/<id>.ogg}. */
    File downloadAudio(String url, File dir, String id) throws IOException {
        int quality = Math.max(0, Math.min(10, plugin.getConfig().getInt("music.audio-quality", 4)));
        List<String> cmd = base();
        cmd.addAll(List.of(
                "-f", "bestaudio/best",
                "-x", "--audio-format", "vorbis", "--audio-quality", String.valueOf(quality),
                "--no-part", "--force-overwrites",
                "-o", new File(dir, id + ".%(ext)s").getAbsolutePath()));
        String ffmpeg = plugin.getConfig().getString("music.ffmpeg-path", "ffmpeg");
        if (ffmpeg != null && !ffmpeg.isBlank() && !ffmpeg.equals("ffmpeg")) {
            cmd.addAll(List.of("--ffmpeg-location", ffmpeg));
        }
        cmd.add(url);
        Result result = run(cmd, 15 * 60);
        File ogg = new File(dir, id + ".ogg");
        if (result.exitCode() != 0 || !ogg.isFile()) {
            throw new IOException(describeError(result, "Download failed."));
        }
        return ogg;
    }

    private List<String> base() throws IOException {
        List<String> cmd = new ArrayList<>();
        cmd.add(executable());
        cmd.addAll(List.of("--no-playlist", "--no-warnings", "--no-progress", "--encoding", "utf-8"));
        return cmd;
    }

    private static String describeError(Result result, String fallback) {
        String error = null;
        for (String line : result.output()) {
            if (line.startsWith("ERROR:")) {
                error = line.substring(6).trim();
            }
        }
        if (error == null) {
            return fallback;
        }
        if (error.toLowerCase(Locale.ROOT).contains("ffmpeg") || error.toLowerCase(Locale.ROOT).contains("ffprobe")) {
            return "ffmpeg is not installed on the server (needed to convert music). Install it from https://ffmpeg.org "
                    + "or set music.ffmpeg-path in config.yml. (" + error + ")";
        }
        return error;
    }

    private static boolean works(String exe) {
        if (exe == null || exe.isBlank()) {
            return false;
        }
        try {
            return run(List.of(exe, "--version"), 20).exitCode() == 0;
        } catch (IOException ex) {
            return false;
        }
    }

    private static Result run(List<String> cmd, long timeoutSeconds) throws IOException {
        Process process = new ProcessBuilder(cmd).redirectErrorStream(true).start();
        List<String> output = Collections.synchronizedList(new ArrayList<>());
        Thread reader = new Thread(() -> {
            try (BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = in.readLine()) != null) {
                    output.add(line);
                }
            } catch (IOException ignored) {
                // process ended
            }
        }, "SigmaCinematic-yt-dlp-output");
        reader.setDaemon(true);
        reader.start();
        try {
            if (!process.waitFor(timeoutSeconds, TimeUnit.SECONDS)) {
                process.destroyForcibly();
                throw new IOException("yt-dlp took too long and was stopped.");
            }
            reader.join(2000);
        } catch (InterruptedException ex) {
            process.destroyForcibly();
            Thread.currentThread().interrupt();
            throw new IOException("Interrupted.");
        }
        synchronized (output) {
            return new Result(process.exitValue(), new ArrayList<>(output));
        }
    }

    private static String assetName() {
        String os = System.getProperty("os.name", "").toLowerCase(Locale.ROOT);
        String arch = System.getProperty("os.arch", "").toLowerCase(Locale.ROOT);
        if (os.contains("win")) {
            return "yt-dlp.exe";
        }
        if (os.contains("mac")) {
            return "yt-dlp_macos";
        }
        return arch.contains("aarch64") || arch.contains("arm64") ? "yt-dlp_linux_aarch64" : "yt-dlp_linux";
    }

    private void download(File target) throws IOException {
        plugin.getLogger().info("yt-dlp not found - downloading " + assetName() + " from GitHub...");
        target.getParentFile().mkdirs();
        HttpClient http = HttpClient.newBuilder()
                .followRedirects(HttpClient.Redirect.ALWAYS)
                .connectTimeout(Duration.ofSeconds(20))
                .build();
        HttpRequest request = HttpRequest.newBuilder(
                        URI.create("https://github.com/yt-dlp/yt-dlp/releases/latest/download/" + assetName()))
                .timeout(Duration.ofMinutes(5))
                .build();
        File tmp = new File(target.getPath() + ".part");
        try {
            HttpResponse<java.nio.file.Path> response = http.send(request, HttpResponse.BodyHandlers.ofFile(tmp.toPath()));
            if (response.statusCode() != 200) {
                throw new IOException("GitHub returned HTTP " + response.statusCode() + " while downloading yt-dlp.");
            }
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IOException("Interrupted while downloading yt-dlp.");
        }
        java.nio.file.Files.move(tmp.toPath(), target.toPath(), StandardCopyOption.REPLACE_EXISTING);
        target.setExecutable(true);
        plugin.getLogger().info("Downloaded yt-dlp to " + target.getPath());
    }
}
