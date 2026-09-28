package com.sigmacinematic.util;

/**
 * Reads command arguments one token at a time. Tokens may be wrapped in "double quotes"
 * to include spaces, and {@link #rest()} returns everything left exactly as typed.
 */
public final class ArgReader {

    private final String input;
    private int pos;

    public ArgReader(String[] args) {
        this.input = String.join(" ", args);
    }

    public boolean hasNext() {
        skipSpaces();
        return pos < input.length();
    }

    public String next() {
        skipSpaces();
        if (pos >= input.length()) {
            return null;
        }
        if (input.charAt(pos) == '"') {
            int end = input.indexOf('"', pos + 1);
            String token = end < 0 ? input.substring(pos + 1) : input.substring(pos + 1, end);
            pos = end < 0 ? input.length() : end + 1;
            return token;
        }
        int end = input.indexOf(' ', pos);
        if (end < 0) {
            end = input.length();
        }
        String token = input.substring(pos, end);
        pos = end;
        return token;
    }

    public String require(String what) {
        String token = next();
        if (token == null || token.isEmpty()) {
            throw new CommandFail("Missing " + what + ".");
        }
        return token;
    }

    public String peek() {
        int saved = pos;
        String token = next();
        pos = saved;
        return token;
    }

    /** Everything that has not been read yet, as typed. */
    public String rest() {
        skipSpaces();
        String rest = input.substring(pos);
        pos = input.length();
        return rest;
    }

    public String requireRest(String what) {
        String rest = rest();
        if (rest.isEmpty()) {
            throw new CommandFail("Missing " + what + ".");
        }
        return rest;
    }

    private void skipSpaces() {
        while (pos < input.length() && input.charAt(pos) == ' ') {
            pos++;
        }
    }
}
