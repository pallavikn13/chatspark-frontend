package com.chatspark.dto;

import com.chatspark.entity.Message;
import java.time.format.DateTimeFormatter;

public class MessageDto {
    private String id;
    private String conversationId;
    private String sender;
    private String role;
    private String content;
    private String createdAt;

    public MessageDto() {
    }

    public MessageDto(String id, String conversationId, String sender, String role, String content, String createdAt) {
        this.id = id;
        this.conversationId = conversationId;
        this.sender = sender;
        this.role = role;
        this.content = content;
        this.createdAt = createdAt;
    }

    public static MessageDto fromEntity(Message message) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        String rawSender = message.getSender() != null ? message.getSender().toUpperCase() : "USER";
        String normalizedSender = rawSender.equals("USER") ? "USER" : "AI";
        String role = rawSender.equalsIgnoreCase("USER") ? "user" : "assistant";

        return MessageDto.builder()
                .id(String.valueOf(message.getId()))
                .conversationId(String.valueOf(message.getConversation().getId()))
                .sender(normalizedSender)
                .role(role)
                .content(message.getContent())
                .createdAt(message.getCreatedAt() != null ? message.getCreatedAt().format(formatter) : "")
                .build();
    }

    public static MessageDtoBuilder builder() {
        return new MessageDtoBuilder();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public static class MessageDtoBuilder {
        private String id;
        private String conversationId;
        private String sender;
        private String role;
        private String content;
        private String createdAt;

        MessageDtoBuilder() {
        }

        public MessageDtoBuilder id(String id) {
            this.id = id;
            return this;
        }

        public MessageDtoBuilder conversationId(String conversationId) {
            this.conversationId = conversationId;
            return this;
        }

        public MessageDtoBuilder sender(String sender) {
            this.sender = sender;
            return this;
        }

        public MessageDtoBuilder role(String role) {
            this.role = role;
            return this;
        }

        public MessageDtoBuilder content(String content) {
            this.content = content;
            return this;
        }

        public MessageDtoBuilder createdAt(String createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public MessageDto build() {
            return new MessageDto(id, conversationId, sender, role, content, createdAt);
        }
    }
}
