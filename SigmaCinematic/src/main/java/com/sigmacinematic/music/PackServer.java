package com.sigmacinematic.music;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Function;
import java.util.regex.Pattern;

/** Tiny built-in web server that hands the music packs to players' game clients. */
final class PackServer {

    private static final Pattern FILE = Pattern.compile("/pack/([a-z0-9]{1,64})\\.zip");

    private final Function<String, File> packs;
    private HttpServer server;
    private ExecutorService executor;

    PackServer(Function<String, File> packs) {
        this.packs = packs;
    }

    void start(String bindAddress, int port) throws IOException {
        server = HttpServer.create(new InetSocketAddress(bindAddress, port), 0);
        server.createContext("/pack/", this::handle);
        executor = Executors.newFixedThreadPool(4, r -> {
            Thread thread = new Thread(r, "SigmaCinematic-web");
            thread.setDaemon(true);
            return thread;
        });
        server.setExecutor(executor);
        server.start();
    }

    void stop() {
        if (server != null) {
            server.stop(0);
            server = null;
        }
        if (executor != null) {
            executor.shutdownNow();
            executor = null;
        }
    }

    private void handle(HttpExchange exchange) throws IOException {
        try (exchange) {
            var matcher = FILE.matcher(exchange.getRequestURI().getPath());
            File file = matcher.matches() ? packs.apply(matcher.group(1)) : null;
            if (file == null || !file.isFile()) {
                exchange.sendResponseHeaders(404, -1);
                return;
            }
            exchange.getResponseHeaders().add("Content-Type", "application/zip");
            if ("HEAD".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(200, -1);
                return;
            }
            exchange.sendResponseHeaders(200, file.length());
            try (OutputStream out = exchange.getResponseBody()) {
                Files.copy(file.toPath(), out);
            }
        }
    }
}
