package com.chatspark.controller;

import com.chatspark.dto.*;
import com.chatspark.entity.User;
import com.chatspark.service.ChatService;
import com.chatspark.service.ConversationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;
    private final ChatService chatService;

    public ConversationController(ConversationService conversationService, ChatService chatService) {
        this.conversationService = conversationService;
        this.chatService = chatService;
    }

    @GetMapping
    public ResponseEntity<List<ConversationDto>> listConversations(@AuthenticationPrincipal User currentUser) {
        List<ConversationDto> conversations = conversationService.listConversations(currentUser);
        return ResponseEntity.ok(conversations);
    }

    @PostMapping
    public ResponseEntity<ConversationDto> createConversation(
            @RequestBody(required = false) CreateConversationRequest request,
            @AuthenticationPrincipal User currentUser) {
        ConversationDto conversation = conversationService.createConversation(request, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(conversation);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationDto> getConversation(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        ConversationDto conversation = conversationService.getConversation(id, currentUser);
        return ResponseEntity.ok(conversation);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConversationDto> updateConversation(
            @PathVariable Long id,
            @RequestBody CreateConversationRequest request,
            @AuthenticationPrincipal User currentUser) {
        ConversationDto updated = conversationService.updateConversation(id, request, currentUser);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConversation(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        conversationService.deleteConversation(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<List<MessageDto>> listMessages(
            @PathVariable Long id,
            @AuthenticationPrincipal User currentUser) {
        List<MessageDto> messages = chatService.listMessages(id, currentUser);
        return ResponseEntity.ok(messages);
    }

    @PostMapping("/{id}/messages")
    public ResponseEntity<SendMessageResponse> sendMessage(
            @PathVariable Long id,
            @Valid @RequestBody SendMessageRequest request,
            @AuthenticationPrincipal User currentUser) {
        SendMessageResponse response = chatService.sendMessage(id, request, currentUser);
        return ResponseEntity.ok(response);
    }
}
