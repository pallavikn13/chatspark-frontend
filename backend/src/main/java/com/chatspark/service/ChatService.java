package com.chatspark.service;

import com.chatspark.ai.AIService;
import com.chatspark.dto.MessageDto;
import com.chatspark.dto.SendMessageRequest;
import com.chatspark.dto.SendMessageResponse;
import com.chatspark.entity.Conversation;
import com.chatspark.entity.Message;
import com.chatspark.entity.User;
import com.chatspark.repository.ConversationRepository;
import com.chatspark.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ChatService {

    private final ConversationService conversationService;
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final AIService aiService;

    public ChatService(ConversationService conversationService,
                       ConversationRepository conversationRepository,
                       MessageRepository messageRepository,
                       AIService aiService) {
        this.conversationService = conversationService;
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
        this.aiService = aiService;
    }

    @Transactional(readOnly = true)
    public List<MessageDto> listMessages(Long conversationId, User currentUser) {
        Conversation conversation = conversationService.findConversationAndCheckOwner(conversationId, currentUser);
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId())
                .stream()
                .map(MessageDto::fromEntity)
                .toList();
    }

    @Transactional
    public SendMessageResponse sendMessage(Long conversationId, SendMessageRequest request, User currentUser) {
        Conversation conversation = conversationService.findConversationAndCheckOwner(conversationId, currentUser);

        String userContent = request.getContent().trim();

        // 1. Save user message
        Message userMessage = Message.builder()
                .conversation(conversation)
                .sender("USER")
                .content(userContent)
                .build();
        userMessage = messageRepository.save(userMessage);

        // 2. Fetch history for AI context
        List<Message> history = messageRepository.findByConversationIdOrderByCreatedAtAsc(conversation.getId());

        // 3. Generate AI response
        String aiReplyContent = aiService.generateReply(history, userContent);

        // 4. Save AI message
        Message aiMessage = Message.builder()
                .conversation(conversation)
                .sender("AI")
                .content(aiReplyContent)
                .build();
        aiMessage = messageRepository.save(aiMessage);

        // 5. Update title if needed (e.g. initial message for "New Chat")
        if ("New Chat".equalsIgnoreCase(conversation.getTitle()) || conversation.getTitle().isBlank()) {
            String generatedTitle = aiService.generateTitle(userContent);
            conversation.setTitle(generatedTitle);
        }

        conversationRepository.save(conversation);

        return SendMessageResponse.builder()
                .conversationId(String.valueOf(conversation.getId()))
                .userMessage(MessageDto.fromEntity(userMessage))
                .aiMessage(MessageDto.fromEntity(aiMessage))
                .build();
    }
}
