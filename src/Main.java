import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Main {

    private static final int PORT = 8080;
    private static final Path WEBSITE_FOLDER = Paths.get(".").toAbsolutePath().normalize();

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        server.createContext("/", Main::handleRequest);

        server.setExecutor(null);
        server.start();

        System.out.println("Website started successfully.");
        System.out.println("Open: http://localhost:" + PORT);
    }

    private static void handleRequest(HttpExchange exchange) throws IOException {

        String requestPath = exchange.getRequestURI().getPath();

        if (requestPath.equals("/")) {
            requestPath = "/index.html";
        }

        Path requestedFile = WEBSITE_FOLDER.resolve(requestPath.substring(1)).normalize();

        if (!requestedFile.startsWith(WEBSITE_FOLDER) || !Files.exists(requestedFile) || Files.isDirectory(requestedFile)) {

            String errorMessage = "404 - File Not Found";

            exchange.sendResponseHeaders(404, errorMessage.length());

            try (OutputStream outputStream = exchange.getResponseBody()) {
                outputStream.write(errorMessage.getBytes());
            }

            return;
        }

        String contentType = getContentType(requestedFile);

        byte[] fileBytes = Files.readAllBytes(requestedFile);

        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(200, fileBytes.length);

        try (OutputStream outputStream = exchange.getResponseBody()) {
            outputStream.write(fileBytes);
        }
    }

    private static String getContentType(Path file) {

        String fileName = file.getFileName().toString().toLowerCase();

        if (fileName.endsWith(".html")) {
            return "text/html; charset=UTF-8";
        }

        if (fileName.endsWith(".css")) {
            return "text/css; charset=UTF-8";
        }

        if (fileName.endsWith(".js")) {
            return "application/javascript; charset=UTF-8";
        }

        if (fileName.endsWith(".png")) {
            return "image/png";
        }

        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return "image/jpeg";
        }

        if (fileName.endsWith(".gif")) {
            return "image/gif";
        }

        if (fileName.endsWith(".svg")) {
            return "image/svg+xml";
        }

        if (fileName.endsWith(".mp4")) {
            return "video/mp4";
        }

        return "application/octet-stream";
    }
}