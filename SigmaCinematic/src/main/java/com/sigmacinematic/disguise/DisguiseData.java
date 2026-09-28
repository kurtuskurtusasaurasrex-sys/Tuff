package com.sigmacinematic.disguise;

import java.util.UUID;

/** Everything tracked about one player's identity: who they really are, and who they look like. */
public final class DisguiseData {

    public final UUID uuid;

    /** The real account name and skin, refreshed from Mojang on every login. */
    public volatile String realName;
    public volatile String realSkinValue;
    public volatile String realSkinSignature;

    /** Fake account name (null = use real name). Used everywhere: tab, nametag, join/leave/death messages. */
    public volatile String nick;
    /** MiniMessage format for chat/tab/join messages, containing {@code <name>}. Null = plain name. */
    public volatile String style;

    /** Fake skin (null = real skin), plus where it came from. */
    public volatile String skinValue;
    public volatile String skinSignature;
    public volatile String skinSource;

    public DisguiseData(UUID uuid, String realName) {
        this.uuid = uuid;
        this.realName = realName;
    }

    public boolean isEmpty() {
        return nick == null && style == null && skinValue == null;
    }
}
