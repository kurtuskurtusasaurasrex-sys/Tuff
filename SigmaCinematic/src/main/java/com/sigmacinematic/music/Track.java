package com.sigmacinematic.music;

import net.kyori.adventure.key.Key;

import java.io.File;
import java.util.UUID;

/** A downloaded song, packed into its own tiny resource pack. */
public record Track(String id, String title, String url, int durationSeconds, File pack, String sha1) {

    public static final String NAMESPACE = "sigmacinematic";

    public Key soundKey() {
        return Key.key(NAMESPACE, "music." + id);
    }

    public UUID packId() {
        return UUID.nameUUIDFromBytes((NAMESPACE + ":" + id + ":" + sha1).getBytes(java.nio.charset.StandardCharsets.UTF_8));
    }

    public String duration() {
        if (durationSeconds <= 0) {
            return "?:??";
        }
        return String.format("%d:%02d", durationSeconds / 60, durationSeconds % 60);
    }
}
