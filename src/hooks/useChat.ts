import { useCallback, useEffect, useRef, useState } from "react";
import type { Conversation, Message } from "@/types";
import { chatService } from "@/services/chatService";
import { conversationService } from "@/services/conversationService";
import { titleFromMessage } from "@/utils/format";

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const requestRef = useRef(0);

  const reloadConversations = useCallback(async () => {
    try {
      const items = await conversationService.list();
      setConversations(items);
    } catch (e) {
      console.error("Failed to load conversations", e);
    } finally {
      setIsLoadingConversations(false);
    }
  }, []);

  useEffect(() => {
    void reloadConversations();
  }, [reloadConversations]);

  useEffect(() => {
    if (!activeId) {
      setMessages([]);
      return;
    }
    const requestId = ++requestRef.current;
    chatService.listMessages(activeId).then((items) => {
      if (requestRef.current === requestId) setMessages(items);
    });
  }, [activeId]);

  const startNewChat = useCallback(() => {
    setActiveId(null);
    setMessages([]);
  }, []);

  const selectConversation = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const deleteConversation = useCallback(
    async (id: string) => {
      await conversationService.remove(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      setActiveId((current) => (current === id ? null : current));
    },
    [],
  );

  const clearActiveChat = useCallback(async () => {
    if (!activeId) return;
    setMessages([]);
  }, [activeId]);

  const sendMessage = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || isTyping) return;

      let conversationId = activeId;

      if (!conversationId) {
        try {
          const created = await conversationService.create(titleFromMessage(content));
          conversationId = created.id;
          setActiveId(created.id);
          setConversations((prev) => [created, ...prev]);
        } catch (err) {
          console.error("Failed to create conversation", err);
          return;
        }
      }

      // Optimistic user message insertion
      const tempUserMsgId = `temp-${Date.now()}`;
      const tempUserMsg: Message = {
        id: tempUserMsgId,
        conversationId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, tempUserMsg]);
      setIsTyping(true);

      try {
        const response = await chatService.sendMessage(conversationId, content);

        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== tempUserMsgId);
          return [...filtered, response.userMessage, response.aiMessage];
        });

        void reloadConversations();
      } catch (error) {
        console.error("Failed to send message", error);
        setMessages((prev) => prev.filter((m) => m.id !== tempUserMsgId));
      } finally {
        setIsTyping(false);
      }
    },
    [activeId, isTyping, reloadConversations],
  );

  const activeConversation =
    conversations.find((c) => c.id === activeId) ?? null;

  return {
    conversations,
    activeConversation,
    activeId,
    messages,
    isTyping,
    isLoadingConversations,
    startNewChat,
    selectConversation,
    deleteConversation,
    clearActiveChat,
    sendMessage,
  };
}
