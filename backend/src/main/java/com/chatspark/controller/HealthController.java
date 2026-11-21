package com.chatspark.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Public health and root endpoints for ChatSpark backend.
 * These are accessible without authentication to allow easy
 * verification that the backend is online.
 */
@RestController
public class HealthController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        return ResponseEntity.ok(buildHealthResponse());
    }

    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(buildHealthResponse());
    }

    private Map<String, Object> buildHealthResponse() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "ChatSpark Backend");
        response.put("version", "1.0.0");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("endpoints", Map.of(
                "auth", "/api/auth  (POST /register, POST /login, GET /me)",
                "conversations", "/api/conversations  (GET, POST, GET /{id}, PUT /{id}, DELETE /{id})",
                "messages", "/api/conversations/{id}/messages  (GET, POST)"
        ));
        return response;
    }
}
