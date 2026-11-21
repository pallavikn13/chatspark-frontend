package com.chatspark.service;

import com.chatspark.dto.ConversationDto;
import com.chatspark.dto.CreateConversationRequest;
import com.chatspark.entity.Conversation;
import com.chatspark.entity.User;
import com.chatspark.exception.ResourceNotFoundException;
import com.chatspark.exception.UnauthorizedException;
import com.chatspark.repository.ConversationRepository;
import com.chatspark.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;

    public ConversationService(ConversationRepository conversationRepository, MessageRepository messageRepository) {
        this.conversationRepository = conversationRepository;
        this.messageRepository = messageRepository;
    }

    @Transactional(readOnly = true)
    public List<ConversationDto> listConversations(User currentUser) {
        return conversationRepository.findByUserIdOrderByUpdatedAtDesc(currentUser.getId())
                .stream()
                .map(ConversationDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public ConversationDto getConversation(Long id, User currentUser) {
        Conversation conversation = findConversationAndCheckOwner(id, currentUser);
        return ConversationDto.fromEntity(conversation);
    }

    @Transactional
    public ConversationDto createConversation(CreateConversationRequest request, User currentUser) {
        String title = (request != null && StringUtils.hasText(request.getTitle())) ? request.getTitle().trim() : "New Chat";
        Conversation conversation = Conversation.builder()
                .user(currentUser)
                .title(title)
                .build();

        conversation = conversationRepository.save(conversation);
        return ConversationDto.fromEntity(conversation);
    }

    @Transactional
    public ConversationDto updateConversation(Long id, CreateConversationRequest request, User currentUser) {
        Conversation conversation = findConversationAndCheckOwner(id, currentUser);
        if (request != null && StringUtils.hasText(request.getTitle())) {
            conversation.setTitle(request.getTitle().trim());
        }
        conversation = conversationRepository.save(conversation);
        return ConversationDto.fromEntity(conversation);
    }

    @Transactional
    public void deleteConversation(Long id, User currentUser) {
        Conversation conversation = findConversationAndCheckOwner(id, currentUser);
        messageRepository.deleteByConversationId(conversation.getId());
        conversationRepository.delete(conversation);
    }

    public Conversation findConversationAndCheckOwner(Long id, User currentUser) {
        Conversation conversation = conversationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found with id " + id));

        if (!conversation.getUser().getId().equals(currentUser.getId())) {
            throw new UnauthorizedException("Access denied: You do not own this conversation.");
        }

        return conversation;
    }
}
