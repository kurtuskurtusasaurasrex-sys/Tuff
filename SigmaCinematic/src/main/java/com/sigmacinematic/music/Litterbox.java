package com.sigmacinematic.music;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.List;
import java.util.UUID;

/**
 * Uploads a music pack to litterbox.catbox.moe, a free temporary file host, for servers that can't
 * open an extra port. Files expire after 3 days; the plugin re-uploads when needed.
 */
final class Litterbox {

    static final Duration LIFETIME = Duration.ofHours(72);
    private static final String API = "https://litterbox.catbox.moe/resources/internals/api.php";

    private Litterbox() {
    }

    static URI upload(File file) throws IOException {
        String boundary = "----SigmaCinematic" + UUID.randomUUID().toString().replace("-", "");
        String head = field(boundary, "reqtype", "fileupload") + field(boundary, "time", "72h")
                + "--" + boundary + "\r\n"
                + "Content-Disposition: form-data; name=\"fileToUpload\"; filename=\"" + file.getName() + "\"\r\n"
                + "Content-Type: application/zip\r\n\r\n";
        String tail = "\r\n--" + boundary + "--\r\n";
        HttpRequest request = HttpRequest.newBuilder(URI.create(API))
                .timeout(Duration.ofMinutes(5))
                .header("User-Agent", "SigmaCinematic")
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .POST(HttpRequest.BodyPublishers.concat(
                        HttpRequest.BodyPublishers.ofString(head, StandardCharsets.UTF_8),
                        HttpRequest.BodyPublishers.ofFile(file.toPath()),
                        HttpRequest.BodyPublishers.ofString(tail, StandardCharsets.UTF_8)))
                .build();
        try {
            HttpResponse<String> response = HttpClient.newBuilder()
                    .connectTimeout(Duration.ofSeconds(20))
                    .followRedirects(HttpClient.Redirect.NORMAL)
                    .build()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            String body = response.body().trim();
            if (response.statusCode() != 200 || !body.startsWith("https://")) {
                throw new IOException("Upload to litterbox failed (HTTP " + response.statusCode() + "): "
                        + body.substring(0, Math.min(200, body.length())));
            }
            return URI.create(body);
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IOException("Interrupted while uploading.");
        }
    }

    private static String field(String boundary, String name, String value) {
        return String.join("\r\n", List.of("--" + boundary,
                "Content-Disposition: form-data; name=\"" + name + "\"", "", value)) + "\r\n";
    }
}
