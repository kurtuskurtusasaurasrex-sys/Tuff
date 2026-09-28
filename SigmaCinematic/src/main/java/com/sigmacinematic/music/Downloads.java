package com.sigmacinematic.music;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.util.Locale;
import java.util.zip.GZIPInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/** Downloads the helper programs (yt-dlp, ffmpeg, deno) and figures out which build fits this machine. */
final class Downloads {

    static final String OS = System.getProperty("os.name", "").toLowerCase(Locale.ROOT);
    static final boolean WINDOWS = OS.contains("win");
    static final boolean MAC = OS.contains("mac");
    static final boolean ARM = System.getProperty("os.arch", "").toLowerCase(Locale.ROOT).matches(".*(aarch64|arm64).*");
    /** Alpine-style Linux (musl instead of glibc) needs different builds. */
    static final boolean MUSL = !WINDOWS && !MAC && new File("/lib").isDirectory()
            && hasMuslLoader(new File("/lib").listFiles());

    private static final HttpClient HTTP = HttpClient.newBuilder()
            .followRedirects(HttpClient.Redirect.ALWAYS)
            .connectTimeout(Duration.ofSeconds(20))
            .build();

    private Downloads() {
    }

    private static boolean hasMuslLoader(File[] files) {
        if (files == null) {
            return false;
        }
        for (File file : files) {
            if (file.getName().startsWith("ld-musl")) {
                return true;
            }
        }
        return false;
    }

    static String exe(String name) {
        return WINDOWS ? name + ".exe" : name;
    }

    static String ytDlpUrl() {
        String asset;
        if (WINDOWS) {
            asset = "yt-dlp.exe";
        } else if (MAC) {
            asset = "yt-dlp_macos";
        } else if (MUSL) {
            asset = ARM ? "yt-dlp_musllinux_aarch64" : "yt-dlp_musllinux";
        } else {
            asset = ARM ? "yt-dlp_linux_aarch64" : "yt-dlp_linux";
        }
        return "https://github.com/yt-dlp/yt-dlp/releases/latest/download/" + asset;
    }

    /** Fully static ffmpeg builds (with the Vorbis encoder), gzipped. */
    static String ffmpegUrl() {
        String platform = WINDOWS ? "win32-x64" : MAC ? (ARM ? "darwin-arm64" : "darwin-x64") : (ARM ? "linux-arm64" : "linux-x64");
        return "https://github.com/eugeneware/ffmpeg-static/releases/download/b6.1.1/ffmpeg-" + platform + ".gz";
    }

    /** Deno is the JavaScript runtime yt-dlp needs for YouTube. Null if there is no build for this system. */
    static String denoUrl() {
        String target;
        if (WINDOWS) {
            target = "x86_64-pc-windows-msvc";
        } else if (MAC) {
            target = ARM ? "aarch64-apple-darwin" : "x86_64-apple-darwin";
        } else if (MUSL) {
            return null;
        } else {
            target = ARM ? "aarch64-unknown-linux-gnu" : "x86_64-unknown-linux-gnu";
        }
        return "https://github.com/denoland/deno/releases/latest/download/deno-" + target + ".zip";
    }

    static void plain(String url, File target) throws IOException {
        try (InputStream in = open(url)) {
            write(in, target);
        }
    }

    static void gunzip(String url, File target) throws IOException {
        try (InputStream in = new GZIPInputStream(open(url))) {
            write(in, target);
        }
    }

    static void unzip(String url, String entryName, File target) throws IOException {
        try (ZipInputStream zip = new ZipInputStream(open(url))) {
            ZipEntry entry;
            while ((entry = zip.getNextEntry()) != null) {
                String name = entry.getName();
                if (name.equals(entryName) || name.endsWith("/" + entryName)) {
                    write(zip, target);
                    return;
                }
            }
        }
        throw new IOException(entryName + " was not in " + url);
    }

    private static InputStream open(String url) throws IOException {
        HttpRequest request = HttpRequest.newBuilder(URI.create(url))
                .header("User-Agent", "SigmaCinematic")
                .timeout(Duration.ofMinutes(10))
                .build();
        try {
            HttpResponse<InputStream> response = HTTP.send(request, HttpResponse.BodyHandlers.ofInputStream());
            if (response.statusCode() != 200) {
                response.body().close();
                throw new IOException("HTTP " + response.statusCode() + " from " + url);
            }
            return response.body();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IOException("Interrupted while downloading " + url);
        }
    }

    private static void write(InputStream in, File target) throws IOException {
        target.getParentFile().mkdirs();
        File tmp = new File(target.getPath() + ".part");
        Files.copy(in, tmp.toPath(), StandardCopyOption.REPLACE_EXISTING);
        Files.move(tmp.toPath(), target.toPath(), StandardCopyOption.REPLACE_EXISTING);
        target.setExecutable(true);
    }
}
