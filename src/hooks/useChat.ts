import { useCallback, useEffect, useRef, useState } from "react";
import type { Conversation, Message } from "@/types";
import { chatService } from "@/services/chatService";
import { conversationService } from "@/services/conversationService";
import { titleFromMessage } from "@/utils/format";

/**
 * Owns all chat state for the dashboard: conversations, active conversation,
 * messages and the assistant typing state. Backed by the mock services.
 */
export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const requestRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    conversationService.list().then((items) => {
      if (cancelled) return;
      setConversations(items);
      setIsLoadingConversations(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

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
      await chatService.clearConversation(id);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      setActiveId((current) => (current === id ? null : current));
    },
    [],
  );

  const clearActiveChat = useCallback(async () => {
    if (!activeId) return;
    await chatService.clearConversation(activeId);
    setMessages([]);
  }, [activeId]);

  const sendMessage = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || isTyping) return;

      let conversationId = activeId;
      if (!conversationId) {
        const created = await conversationService.create(titleFromMessage(content));
        conversationId = created.id;
        setConversations((prev) => [created, ...prev]);
        setActiveId(created.id);
      }

      const userMessage = await chatService.sendMessage(conversationId, content);
      setMessages((prev) => [...prev, userMessage]);
      await conversationService.touch(conversationId);

      setIsTyping(true);
      const reply = await chatService.getMockReply(conversationId);
      setIsTyping(false);
      setMessages((prev) => [...prev, reply]);
    },
    [activeId, isTyping],
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
