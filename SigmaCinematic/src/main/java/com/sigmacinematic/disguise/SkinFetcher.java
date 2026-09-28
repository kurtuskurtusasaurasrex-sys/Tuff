package com.sigmacinematic.disguise;

import com.destroystokyo.paper.profile.PlayerProfile;
import com.destroystokyo.paper.profile.ProfileProperty;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.sigmacinematic.SigmaCinematic;
import org.bukkit.Bukkit;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Turns "a link to a skin" (or a player name) into a signed skin the game will actually display.
 *
 * <p>Minecraft only shows skins signed by Mojang, so image links are uploaded through
 * <a href="https://mineskin.org">MineSkin</a>, which returns a signed texture.
 */
public final class SkinFetcher {

    private static final Pattern PLAYER_NAME = Pattern.compile("[A-Za-z0-9_]{1,16}");
    private static final Pattern NAMEMC = Pattern.compile("namemc\\.com/skin/([0-9A-Za-z]+)");
    private static final Pattern MINESKIN = Pattern.compile("(?:mineskin\\.org/(?:skins/)?|minesk\\.in/)([0-9a-fA-F-]{32,36})");
    private static final String API = "https://api.mineskin.org";

    private final SigmaCinematic plugin;
    private final HttpClient http = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    public SkinFetcher(SigmaCinematic plugin) {
        this.plugin = plugin;
    }

    /**
     * @param input a skin image link, NameMC / MineSkin link, or a Minecraft username to copy
     * @param slim  thin (Alex) arms instead of classic (Steve) arms; only used for image links
     */
    public CompletableFuture<Skin> fetch(String input, boolean slim) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                if (PLAYER_NAME.matcher(input).matches()) {
                    return fromPlayer(input);
                }
                return fromLink(input, slim);
            } catch (RuntimeException ex) {
                throw ex;
            } catch (Exception ex) {
                throw new CompletionException(ex);
            }
        }, plugin.async());
    }

    private Skin fromPlayer(String name) {
        PlayerProfile profile = Bukkit.createProfile(name);
        if (!profile.complete(true)) {
            throw new IllegalStateException("There is no Minecraft account called " + name + ".");
        }
        for (ProfileProperty property : profile.getProperties()) {
            if (property.getName().equals("textures") && property.isSigned()) {
                return new Skin(property.getValue(), property.getSignature(), "player " + profile.getName());
            }
        }
        throw new IllegalStateException(name + " has no skin to copy.");
    }

    private Skin fromLink(String link, boolean slim) throws Exception {
        String url = link.contains("://") ? link : "https://" + link;

        Matcher mineskin = MINESKIN.matcher(url);
        if (mineskin.find()) {
            JsonObject json = request(HttpRequest.newBuilder(URI.create(API + "/v2/skins/" + mineskin.group(1))).GET());
            return parse(json, url);
        }

        Matcher namemc = NAMEMC.matcher(url);
        if (namemc.find()) {
            url = "https://s.namemc.com/i/" + namemc.group(1) + ".png";
        }

        JsonObject body = new JsonObject();
        body.addProperty("url", url);
        body.addProperty("variant", slim ? "slim" : "classic");
        body.addProperty("visibility", "unlisted");
        body.addProperty("name", "SigmaCinematic");
        JsonObject json = request(HttpRequest.newBuilder(URI.create(API + "/v2/generate"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(body.toString())));
        return parse(json, link);
    }

    private JsonObject request(HttpRequest.Builder builder) throws Exception {
        builder.timeout(Duration.ofSeconds(90))
                .header("User-Agent", "SigmaCinematic/" + plugin.getPluginMeta().getVersion())
                .header("Accept", "application/json");
        String key = plugin.getConfig().getString("skins.mineskin-api-key", "");
        if (key != null && !key.isBlank()) {
            builder.header("Authorization", "Bearer " + key.trim());
        }
        HttpResponse<String> response = http.send(builder.build(), HttpResponse.BodyHandlers.ofString());
        JsonObject json;
        try {
            json = JsonParser.parseString(response.body()).getAsJsonObject();
        } catch (RuntimeException ex) {
            throw new IllegalStateException("MineSkin returned HTTP " + response.statusCode() + " (not JSON).");
        }
        if (response.statusCode() >= 300 || (json.has("success") && !json.get("success").getAsBoolean())) {
            String reason = errorMessage(json);
            if (response.statusCode() == 401 || response.statusCode() == 403) {
                reason += " (set skins.mineskin-api-key in config.yml - get a free key at https://account.mineskin.org/keys)";
            }
            throw new IllegalStateException("MineSkin: " + reason);
        }
        return json;
    }

    private static String errorMessage(JsonObject json) {
        if (json.has("errors") && json.get("errors").isJsonArray()) {
            JsonArray errors = json.getAsJsonArray("errors");
            StringBuilder sb = new StringBuilder();
            for (JsonElement e : errors) {
                if (e.isJsonObject() && e.getAsJsonObject().has("message")) {
                    if (!sb.isEmpty()) {
                        sb.append("; ");
                    }
                    sb.append(e.getAsJsonObject().get("message").getAsString());
                }
            }
            if (!sb.isEmpty()) {
                return sb.toString();
            }
        }
        for (String field : new String[]{"error", "message"}) {
            if (json.has(field) && json.get(field).isJsonPrimitive()) {
                return json.get(field).getAsString();
            }
        }
        return "request failed";
    }

    private static Skin parse(JsonObject json, String source) {
        // v2: { skin: { texture: { data: { value, signature } } } }
        JsonObject data = path(json, "skin", "texture", "data");
        if (data == null) {
            // v1: { data: { texture: { value, signature } } }
            data = path(json, "data", "texture");
        }
        if (data == null || !data.has("value") || !data.has("signature")) {
            throw new IllegalStateException("MineSkin did not return a skin for that link.");
        }
        return new Skin(data.get("value").getAsString(), data.get("signature").getAsString(), source);
    }

    private static JsonObject path(JsonObject root, String... keys) {
        JsonObject current = root;
        for (String key : keys) {
            if (current == null || !current.has(key) || !current.get(key).isJsonObject()) {
                return null;
            }
            current = current.getAsJsonObject(key);
        }
        return current;
    }
}
