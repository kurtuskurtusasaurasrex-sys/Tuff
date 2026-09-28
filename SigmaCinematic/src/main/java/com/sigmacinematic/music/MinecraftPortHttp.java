package com.sigmacinematic.music;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFutureListener;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import net.kyori.adventure.key.Key;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.function.Function;
import java.util.logging.Logger;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Serves music packs on the Minecraft server's own port, so no extra port or upload site is needed.
 *
 * <p>A small handler sits at the front of every new connection. If the first bytes are an HTTP
 * request for a music pack, it answers it and closes the connection. Anything else (a normal
 * Minecraft login or server-list ping) is passed on untouched and the handler removes itself.
 * It hooks in through Paper's channel-initialize listeners.
 */
final class MinecraftPortHttp {

    static final String PATH_PREFIX = "/sigmacinematic/pack/";
    private static final Key KEY = Key.key("sigmacinematic", "music_http");
    private static final String HOLDER = "io.papermc.paper.network.ChannelInitializeListenerHolder";
    private static final String LISTENER = "io.papermc.paper.network.ChannelInitializeListener";
    private static final Pattern REQUEST = Pattern.compile(
            "^(GET|HEAD) " + Pattern.quote(PATH_PREFIX) + "([a-z0-9]{1,64})\\.zip(?:\\?\\S*)? HTTP/1\\.[01]$");
    private static final byte[] PROXY_V1 = "PROXY ".getBytes(StandardCharsets.US_ASCII);
    private static final byte[] PROXY_V2 = {0x0D, 0x0A, 0x0D, 0x0A, 0x00, 0x0D, 0x0A, 0x51, 0x55, 0x49, 0x54, 0x0A};
    private static final byte[] GET = "GET /".getBytes(StandardCharsets.US_ASCII);
    private static final byte[] HEAD = "HEAD /".getBytes(StandardCharsets.US_ASCII);
    private static final int MAX_REQUEST = 8192;

    private final Function<String, File> packs;
    private final Logger logger;
    private volatile boolean installed;

    MinecraftPortHttp(Function<String, File> packs, Logger logger) {
        this.packs = packs;
        this.logger = logger;
    }

    boolean installed() {
        return installed;
    }

    /** Registers with Paper. Returns false (the plugin then uses other ways) if this server lacks the hook. */
    boolean install() {
        try {
            Class<?> holder = Class.forName(HOLDER);
            Class<?> listenerType = Class.forName(LISTENER);
            InvocationHandler handler = (proxy, method, args) -> switch (method.getName()) {
                case "afterInitChannel" -> {
                    ((Channel) args[0]).pipeline().addFirst("sigmacinematic_http", new Sniffer(packs, logger));
                    yield null;
                }
                case "hashCode" -> System.identityHashCode(proxy);
                case "equals" -> proxy == args[0];
                case "toString" -> "SigmaCinematic music downloads";
                default -> null;
            };
            Object listener = Proxy.newProxyInstance(listenerType.getClassLoader(), new Class<?>[]{listenerType}, handler);
            holder.getMethod("addListener", Key.class, listenerType).invoke(null, KEY, listener);
            installed = true;
        } catch (ReflectiveOperationException | LinkageError | RuntimeException ex) {
            logger.info("Music: can't send songs through the Minecraft port on this server (" + ex + ").");
            installed = false;
        }
        return installed;
    }

    void uninstall() {
        if (!installed) {
            return;
        }
        installed = false;
        try {
            Class.forName(HOLDER).getMethod("removeListener", Key.class).invoke(null, KEY);
        } catch (ReflectiveOperationException | LinkageError | RuntimeException ignored) {
            // server is shutting down anyway
        }
    }

    enum Kind { MINECRAFT, NEED_MORE, HTTP }

    /** Tells a song download apart from a Minecraft client by the first bytes of a connection. */
    static final class Sniffer extends ChannelInboundHandlerAdapter {

        private final Function<String, File> packs;
        private final Logger logger;
        private ByteBuf buffered;

        Sniffer(Function<String, File> packs, Logger logger) {
            this.packs = packs;
            this.logger = logger;
        }

        @Override
        public void channelRead(ChannelHandlerContext ctx, Object msg) {
            if (!(msg instanceof ByteBuf in)) {
                done(ctx, msg);
                return;
            }
            buffered = buffered == null ? in : Unpooled.wrappedBuffer(buffered, in);
            switch (classify(buffered)) {
                case MINECRAFT -> {
                    ByteBuf data = buffered;
                    buffered = null;
                    done(ctx, data);
                }
                case HTTP -> {
                    ByteBuf data = buffered;
                    buffered = null;
                    try {
                        respond(ctx, requestLine(data));
                    } finally {
                        data.release();
                    }
                }
                case NEED_MORE -> {
                    if (buffered.readableBytes() > MAX_REQUEST) {
                        release();
                        ctx.close();
                    }
                }
            }
        }

        /** Not a song download: step aside and give Minecraft everything we read. */
        private void done(ChannelHandlerContext ctx, Object msg) {
            ctx.pipeline().remove(this);
            ctx.fireChannelRead(msg);
        }

        @Override
        public void channelInactive(ChannelHandlerContext ctx) throws Exception {
            release();
            super.channelInactive(ctx);
        }

        private void release() {
            if (buffered != null) {
                buffered.release();
                buffered = null;
            }
        }

        static Kind classify(ByteBuf buf) {
            int start = buf.readerIndex();
            int end = buf.writerIndex();
            if (matchesSoFar(buf, start, end, PROXY_V1) || matchesSoFar(buf, start, end, PROXY_V2)) {
                start = payloadStart(buf);
                if (start < 0) {
                    return Kind.NEED_MORE;
                }
            }
            if (!matchesSoFar(buf, start, end, GET) && !matchesSoFar(buf, start, end, HEAD)) {
                return Kind.MINECRAFT;
            }
            for (int i = start; i + 3 < end; i++) {
                if (buf.getByte(i) == '\r' && buf.getByte(i + 1) == '\n' && buf.getByte(i + 2) == '\r' && buf.getByte(i + 3) == '\n') {
                    return Kind.HTTP;
                }
            }
            return Kind.NEED_MORE;
        }

        /** Where the request starts after a PROXY protocol header (added by some hosts' proxies); -1 = need more bytes. */
        static int payloadStart(ByteBuf buf) {
            int start = buf.readerIndex();
            int end = buf.writerIndex();
            if (matchesSoFar(buf, start, end, PROXY_V1)) {
                for (int i = start; i + 1 < Math.min(end, start + 108); i++) {
                    if (buf.getByte(i) == '\r' && buf.getByte(i + 1) == '\n') {
                        return i + 2;
                    }
                }
                return end - start >= 108 ? start : -1;
            }
            if (matchesSoFar(buf, start, end, PROXY_V2)) {
                if (end - start < 16) {
                    return -1;
                }
                int total = 16 + buf.getUnsignedShort(start + 14);
                return end - start >= total ? start + total : -1;
            }
            return start;
        }

        /** True if the bytes received so far agree with {@code prefix} (possibly not all of it yet). */
        private static boolean matchesSoFar(ByteBuf buf, int start, int end, byte[] prefix) {
            int check = Math.min(end - start, prefix.length);
            for (int i = 0; i < check; i++) {
                if (buf.getByte(start + i) != prefix[i]) {
                    return false;
                }
            }
            return true;
        }

        static String requestLine(ByteBuf buf) {
            int start = payloadStart(buf);
            int end = start;
            while (end < buf.writerIndex() && buf.getByte(end) != '\r') {
                end++;
            }
            return buf.toString(start, end - start, StandardCharsets.US_ASCII);
        }

        private void respond(ChannelHandlerContext ctx, String requestLine) {
            Matcher m = REQUEST.matcher(requestLine);
            File file = m.matches() ? packs.apply(m.group(2)) : null;
            if (file == null || !file.isFile()) {
                ctx.writeAndFlush(Unpooled.copiedBuffer("HTTP/1.1 404 Not Found\r\nContent-Length: 0\r\nConnection: close\r\n\r\n",
                        StandardCharsets.US_ASCII)).addListener(ChannelFutureListener.CLOSE);
                return;
            }
            byte[] body;
            try {
                body = m.group(1).equals("HEAD") ? new byte[0] : Files.readAllBytes(file.toPath());
            } catch (IOException ex) {
                logger.warning("Music: could not read " + file.getName() + ": " + ex.getMessage());
                ctx.close();
                return;
            }
            String headers = "HTTP/1.1 200 OK\r\nContent-Type: application/zip\r\nContent-Length: " + file.length()
                    + "\r\nConnection: close\r\n\r\n";
            ctx.write(Unpooled.copiedBuffer(headers, StandardCharsets.US_ASCII));
            ctx.writeAndFlush(Unpooled.wrappedBuffer(body)).addListener(ChannelFutureListener.CLOSE);
        }
    }
}
