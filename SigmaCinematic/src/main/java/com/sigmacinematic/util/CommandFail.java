package com.sigmacinematic.util;

/** Thrown from a command to show the sender an error message and stop. */
public final class CommandFail extends RuntimeException {

    public CommandFail(String message) {
        super(message, null, false, false);
    }
}
