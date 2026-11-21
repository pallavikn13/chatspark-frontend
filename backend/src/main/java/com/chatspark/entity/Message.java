package com.chatspark.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @Column(nullable = false)
    private String sender; // "USER" or "AI"

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    public Message() {
    }

    public Message(Long id, Conversation conversation, String sender, String content, LocalDateTime createdAt) {
        this.id = id;
        this.conversation = conversation;
        this.sender = sender;
        this.content = content;
        this.createdAt = createdAt;
    }

    public static MessageBuilder builder() {
        return new MessageBuilder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public static class MessageBuilder {
        private Long id;
        private Conversation conversation;
        private String sender;
        private String content;
        private LocalDateTime createdAt;

        MessageBuilder() {
        }

        public MessageBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public MessageBuilder conversation(Conversation conversation) {
            this.conversation = conversation;
            return this;
        }

        public MessageBuilder sender(String sender) {
            this.sender = sender;
            return this;
        }

        public MessageBuilder content(String content) {
            this.content = content;
            return this;
        }

        public MessageBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Message build() {
            return new Message(id, conversation, sender, content, createdAt);
        }
    }
}
