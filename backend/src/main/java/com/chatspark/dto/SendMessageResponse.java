package com.chatspark.dto;

public class SendMessageResponse {
    private String conversationId;
    private MessageDto userMessage;
    private MessageDto aiMessage;

    public SendMessageResponse() {
    }

    public SendMessageResponse(String conversationId, MessageDto userMessage, MessageDto aiMessage) {
        this.conversationId = conversationId;
        this.userMessage = userMessage;
        this.aiMessage = aiMessage;
    }

    public static SendMessageResponseBuilder builder() {
        return new SendMessageResponseBuilder();
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public MessageDto getUserMessage() {
        return userMessage;
    }

    public void setUserMessage(MessageDto userMessage) {
        this.userMessage = userMessage;
    }

    public MessageDto getAiMessage() {
        return aiMessage;
    }

    public void setAiMessage(MessageDto aiMessage) {
        this.aiMessage = aiMessage;
    }

    public static class SendMessageResponseBuilder {
        private String conversationId;
        private MessageDto userMessage;
        private MessageDto aiMessage;

        SendMessageResponseBuilder() {
        }

        public SendMessageResponseBuilder conversationId(String conversationId) {
            this.conversationId = conversationId;
            return this;
        }

        public SendMessageResponseBuilder userMessage(MessageDto userMessage) {
            this.userMessage = userMessage;
            return this;
        }

        public SendMessageResponseBuilder aiMessage(MessageDto aiMessage) {
            this.aiMessage = aiMessage;
            return this;
        }

        public SendMessageResponse build() {
            return new SendMessageResponse(conversationId, userMessage, aiMessage);
        }
    }
}
