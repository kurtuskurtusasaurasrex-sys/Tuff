package com.sigmacinematic.music;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Free, no-account file hosts used to hand music packs to players when the server can't open an
 * extra port. They are tried in order until one works. Uploads expire, and are redone when needed.
 */
final class FileHosts {

    static final List<String> DEFAULT_ORDER = List.of("litterbox", "uguu", "tmpfiles");

    record Hosted(String host, URI uri, long expiresAt) {
    }

    private static final Pattern TITLE = Pattern.compile("<title>(.*?)</title>", Pattern.CASE_INSENSITIVE | Pattern.DOTALL);
    private static final HttpClient HTTP = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_1_1)
            .connectTimeout(Duration.ofSeconds(20))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    private FileHosts() {
    }

    /** Uploads to the first host in {@code order} that accepts the file. */
    static Hosted upload(File file, List<String> order) throws IOException {
        List<String> errors = new ArrayList<>();
        if (order.isEmpty()) {
            throw new IOException("no upload hosts left to try");
        }
        for (String host : order) {
            try {
                return switch (host.toLowerCase(Locale.ROOT)) {
                    case "litterbox" -> litterbox(file);
                    case "uguu" -> uguu(file);
                    case "tmpfiles" -> tmpfiles(file);
                    default -> throw new IOException("unknown host (use litterbox, uguu or tmpfiles)");
                };
            } catch (IOException | RuntimeException ex) {
                errors.add(host + ": " + ex.getMessage());
            }
        }
        throw new IOException("every upload host failed - " + String.join("; ", errors));
    }

    /** litterbox.catbox.moe - kept 72 hours. */
    private static Hosted litterbox(File file) throws IOException {
        String body = post("https://litterbox.catbox.moe/resources/internals/api.php",
                Map.of("reqtype", "fileupload", "time", "72h"), "fileToUpload", file).trim();
        if (!body.startsWith("https://")) {
            throw new IOException("unexpected reply " + shorten(body));
        }
        return new Hosted("litterbox", URI.create(body), expiresIn(Duration.ofHours(72)));
    }

    /** uguu.se - kept 3 hours. */
    private static Hosted uguu(File file) throws IOException {
        JsonObject json = json(post("https://uguu.se/upload", Map.of(), "files[]", file));
        JsonArray files = json.has("files") ? json.getAsJsonArray("files") : null;
        if (files == null || files.isEmpty() || !files.get(0).getAsJsonObject().has("url")) {
            throw new IOException("unexpected reply " + shorten(json.toString()));
        }
        return new Hosted("uguu", URI.create(files.get(0).getAsJsonObject().get("url").getAsString()), expiresIn(Duration.ofHours(3)));
    }

    /** tmpfiles.org - kept 60 minutes. */
    private static Hosted tmpfiles(File file) throws IOException {
        JsonObject json = json(post("https://tmpfiles.org/api/v1/upload", Map.of(), "file", file));
        if (!json.has("data") || !json.getAsJsonObject("data").has("url")) {
            throw new IOException("unexpected reply " + shorten(json.toString()));
        }
        // The page link is https://tmpfiles.org/<id>/<name>; the raw file is under /dl/.
        String page = json.getAsJsonObject("data").get("url").getAsString().replace("http://", "https://");
        String direct = page.replaceFirst("^https://tmpfiles\\.org/", "https://tmpfiles.org/dl/");
        return new Hosted("tmpfiles", URI.create(direct), expiresIn(Duration.ofMinutes(60)));
    }

    private static long expiresIn(Duration duration) {
        return System.currentTimeMillis() + duration.toMillis();
    }

    private static JsonObject json(String body) throws IOException {
        try {
            return JsonParser.parseString(body).getAsJsonObject();
        } catch (RuntimeException ex) {
            throw new IOException("unexpected reply " + shorten(body));
        }
    }

    static String post(String url, Map<String, String> fields, String fileField, File file) throws IOException {
        String boundary = "----SigmaCinematic" + UUID.randomUUID().toString().replace("-", "");
        StringBuilder head = new StringBuilder();
        for (Map.Entry<String, String> field : fields.entrySet()) {
            head.append("--").append(boundary).append("\r\n")
                    .append("Content-Disposition: form-data; name=\"").append(field.getKey()).append("\"\r\n\r\n")
                    .append(field.getValue()).append("\r\n");
        }
        head.append("--").append(boundary).append("\r\n")
                .append("Content-Disposition: form-data; name=\"").append(fileField)
                .append("\"; filename=\"").append(file.getName()).append("\"\r\n")
                .append("Content-Type: application/zip\r\n\r\n");
        String tail = "\r\n--" + boundary + "--\r\n";
        HttpRequest request = HttpRequest.newBuilder(URI.create(url))
                .timeout(Duration.ofMinutes(5))
                .header("User-Agent", "Mozilla/5.0 (compatible; SigmaCinematic Minecraft plugin)")
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .POST(HttpRequest.BodyPublishers.concat(
                        HttpRequest.BodyPublishers.ofString(head.toString(), StandardCharsets.UTF_8),
                        HttpRequest.BodyPublishers.ofFile(file.toPath()),
                        HttpRequest.BodyPublishers.ofString(tail, StandardCharsets.UTF_8)))
                .build();
        try {
            HttpResponse<String> response = HTTP.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() != 200) {
                throw new IOException("HTTP " + response.statusCode() + " " + shorten(response.body()));
            }
            return response.body();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IOException("interrupted");
        }
    }

    /** A short, readable version of a reply (the page title for HTML error pages). */
    private static String shorten(String body) {
        Matcher title = TITLE.matcher(body);
        String text = title.find() ? title.group(1) : body.replaceAll("<[^>]*>", " ");
        text = text.replaceAll("\\s+", " ").trim();
        return text.length() > 80 ? "(" + text.substring(0, 80) + "...)" : "(" + text + ")";
    }
}
