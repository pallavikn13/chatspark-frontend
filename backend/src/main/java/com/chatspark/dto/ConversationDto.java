package com.chatspark.dto;

import com.chatspark.entity.Conversation;
import java.time.format.DateTimeFormatter;

public class ConversationDto {
    private String id;
    private String title;
    private String createdAt;
    private String updatedAt;

    public ConversationDto() {
    }

    public ConversationDto(String id, String title, String createdAt, String updatedAt) {
        this.id = id;
        this.title = title;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ConversationDto fromEntity(Conversation conversation) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        return ConversationDto.builder()
                .id(String.valueOf(conversation.getId()))
                .title(conversation.getTitle())
                .createdAt(conversation.getCreatedAt() != null ? conversation.getCreatedAt().format(formatter) : "")
                .updatedAt(conversation.getUpdatedAt() != null ? conversation.getUpdatedAt().format(formatter) : "")
                .build();
    }

    public static ConversationDtoBuilder builder() {
        return new ConversationDtoBuilder();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public static class ConversationDtoBuilder {
        private String id;
        private String title;
        private String createdAt;
        private String updatedAt;

        ConversationDtoBuilder() {
        }

        public ConversationDtoBuilder id(String id) {
            this.id = id;
            return this;
        }

        public ConversationDtoBuilder title(String title) {
            this.title = title;
            return this;
        }

        public ConversationDtoBuilder createdAt(String createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ConversationDtoBuilder updatedAt(String updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public ConversationDto build() {
            return new ConversationDto(id, title, createdAt, updatedAt);
        }
    }
}
