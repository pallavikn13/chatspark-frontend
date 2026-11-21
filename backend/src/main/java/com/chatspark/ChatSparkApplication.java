package com.chatspark;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class ChatSparkApplication {

    private static final Logger log = LoggerFactory.getLogger(ChatSparkApplication.class);

    public static void main(String[] args) {
        loadDotEnvIfPresent();
        SpringApplication.run(ChatSparkApplication.class, args);
    }

    private static void loadDotEnvIfPresent() {
        try {
            Path[] potentialPaths = new Path[]{
                    Paths.get(".env"),
                    Paths.get("../.env"),
                    Paths.get("backend/.env")
            };

            for (Path path : potentialPaths) {
                if (Files.exists(path)) {
                    log.info("Loading environment properties from .env file: {}", path.toAbsolutePath());
                    List<String> lines = Files.readAllLines(path);
                    for (String line : lines) {
                        String trimmed = line.trim();
                        if (trimmed.isEmpty() || trimmed.startsWith("#") || !trimmed.contains("=")) {
                            continue;
                        }
                        int eqIdx = trimmed.indexOf('=');
                        String key = trimmed.substring(0, eqIdx).trim();
                        String value = trimmed.substring(eqIdx + 1).trim();

                        if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
                            value = value.substring(1, value.length() - 1);
                        }

                        if (System.getProperty(key) == null && System.getenv(key) == null) {
                            System.setProperty(key, value);
                        }
                    }
                    break;
                }
            }
        } catch (Exception e) {
            log.warn("Could not load .env file: {}", e.getMessage());
        }
    }
}
