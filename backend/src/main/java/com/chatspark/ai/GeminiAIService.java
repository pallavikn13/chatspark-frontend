package com.chatspark.ai;

import com.chatspark.entity.Message;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class GeminiAIService implements AIService {

    private static final Logger log = LoggerFactory.getLogger(GeminiAIService.class);

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private final String apiKey;
    private final String model;

    public GeminiAIService(
            @Value("${app.ai.gemini.api-key:}") String apiKey,
            @Value("${app.ai.gemini.model:gemini-1.5-flash}") String model,
            ObjectMapper objectMapper) {
        this.apiKey = apiKey;
        this.model = StringUtils.hasText(model) ? model : "gemini-1.5-flash";
        this.objectMapper = objectMapper;
        this.restClient = RestClient.create();
    }

    @Override
    public String generateReply(List<Message> history, String userPrompt) {
        // Resolve API key from injected property or System environment/property fallback
        String resolvedApiKey = StringUtils.hasText(apiKey) ? apiKey : System.getenv("GEMINI_API_KEY");
        if (!StringUtils.hasText(resolvedApiKey)) {
            resolvedApiKey = System.getProperty("GEMINI_API_KEY");
        }

        if (!StringUtils.hasText(resolvedApiKey)) {
            log.warn("GEMINI_API_KEY environment variable is missing. Returning guidance response.");
            return "Hello! I am ChatSpark AI. To enable live Google Gemini responses, please configure your GEMINI_API_KEY environment variable.";
        }

        try {
            String url = String.format("https://generativelanguage.googleapis.com/v1beta/models/%s:generateContent?key=%s", model, resolvedApiKey);

            List<Map<String, Object>> contents = new ArrayList<>();

            // Limit history to last 10 messages for context
            int startIndex = Math.max(0, history.size() - 10);
            for (int i = startIndex; i < history.size(); i++) {
                Message msg = history.get(i);
                String sender = msg.getSender();
                String role = ("USER".equalsIgnoreCase(sender) || "user".equalsIgnoreCase(sender)) ? "user" : "model";

                Map<String, Object> part = Map.of("text", msg.getContent());
                Map<String, Object> contentMap = Map.of(
                        "role", role,
                        "parts", List.of(part)
                );
                contents.add(contentMap);
            }

            // If history was empty or didn't end with the current prompt, append user prompt
            if (contents.isEmpty() || !"user".equals(contents.get(contents.size() - 1).get("role"))) {
                Map<String, Object> currentPart = Map.of("text", userPrompt);
                Map<String, Object> currentContent = Map.of(
                        "role", "user",
                        "parts", List.of(currentPart)
                );
                contents.add(currentContent);
            }

            Map<String, Object> requestBody = Map.of("contents", contents);

            log.info("Sending request to Google Gemini API (model: {})", model);

            String rawResponse = restClient.post()
                    .uri(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            JsonNode root = objectMapper.readTree(rawResponse);
            JsonNode candidates = root.path("candidates");
            if (candidates.isArray() && !candidates.isEmpty()) {
                JsonNode firstCandidate = candidates.get(0);
                JsonNode parts = firstCandidate.path("content").path("parts");
                if (parts.isArray() && !parts.isEmpty()) {
                    String aiText = parts.get(0).path("text").asText();
                    log.info("Successfully received Gemini AI response (length: {} chars)", aiText.length());
                    return aiText;
                }
            }

            return "I received a response from Gemini AI, but no text content was returned.";

        } catch (Exception e) {
            log.error("Error communicating with Google Gemini API", e);
            return "I encountered an error communicating with Gemini AI: " + e.getMessage();
        }
    }

    @Override
    public String generateTitle(String firstPrompt) {
        if (firstPrompt == null || firstPrompt.isBlank()) {
            return "New Chat";
        }
        String cleaned = firstPrompt.trim();
        if (cleaned.length() <= 30) {
            return capitalize(cleaned);
        }
        String substring = cleaned.substring(0, 30);
        int lastSpace = substring.lastIndexOf(' ');
        if (lastSpace > 10) {
            return capitalize(substring.substring(0, lastSpace));
        }
        return capitalize(substring) + "...";
    }

    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
