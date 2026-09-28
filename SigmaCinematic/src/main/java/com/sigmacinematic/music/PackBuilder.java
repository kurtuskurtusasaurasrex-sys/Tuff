package com.sigmacinematic.music;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/** Builds a one-song resource pack: {@code assets/sigmacinematic/sounds/music/<id>.ogg} + sounds.json. */
final class PackBuilder {

    private PackBuilder() {
    }

    static void build(String id, String title, File ogg, File zip) throws IOException {
        String safeTitle = title.replace("\\", "\\\\").replace("\"", "\\\"");
        // pack_format/supported_formats cover older clients, min/max_format cover 1.21.9+ and 26.x.
        String mcmeta = """
                {
                  "pack": {
                    "description": "SigmaCinematic music: %s",
                    "pack_format": 15,
                    "supported_formats": [15, 9999],
                    "min_format": 15,
                    "max_format": 9999
                  }
                }
                """.formatted(safeTitle);
        String sounds = """
                {
                  "music.%1$s": {
                    "sounds": [ { "name": "%2$s:music/%1$s", "stream": true } ]
                  }
                }
                """.formatted(id, Track.NAMESPACE);

        File tmp = new File(zip.getPath() + ".tmp");
        try (ZipOutputStream out = new ZipOutputStream(Files.newOutputStream(tmp.toPath()))) {
            put(out, "pack.mcmeta", mcmeta.getBytes(StandardCharsets.UTF_8));
            put(out, "assets/" + Track.NAMESPACE + "/sounds.json", sounds.getBytes(StandardCharsets.UTF_8));
            ZipEntry entry = new ZipEntry("assets/" + Track.NAMESPACE + "/sounds/music/" + id + ".ogg");
            entry.setTime(0);
            out.putNextEntry(entry);
            Files.copy(ogg.toPath(), out);
            out.closeEntry();
        }
        Files.move(tmp.toPath(), zip.toPath(), java.nio.file.StandardCopyOption.REPLACE_EXISTING);
    }

    private static void put(ZipOutputStream out, String name, byte[] bytes) throws IOException {
        ZipEntry entry = new ZipEntry(name);
        entry.setTime(0);
        out.putNextEntry(entry);
        out.write(bytes);
        out.closeEntry();
    }

    static String sha1(File file) throws IOException {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            try (InputStream in = new DigestInputStream(Files.newInputStream(file.toPath()), digest)) {
                in.transferTo(OutputStream.nullOutputStream());
            }
            return HexFormat.of().formatHex(digest.digest());
        } catch (NoSuchAlgorithmException ex) {
            throw new IOException(ex);
        }
    }
}
