package com.sigmacinematic.disguise;

/** A signed Minecraft "textures" profile property, plus a human readable description of where it came from. */
public record Skin(String value, String signature, String source) {
}
