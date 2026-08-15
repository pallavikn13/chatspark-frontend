import type { Message } from "@/types";
import { mockAiReplies, mockMessages } from "@/data/mockData";
import { MOCK_AI_LATENCY, MOCK_LATENCY, STORAGE_KEYS } from "@/utils/constants";
import { createId, delay } from "@/utils/format";
import { readStore, writeStore } from "./storage";

/**
 * Mock chat/message service.
 *
 * Future backend mapping:
 *   listMessages -> GET  /api/conversations/{id}/messages
 *   sendMessage  -> POST /api/conversations/{id}/messages
 */
function load(): Message[] {
  return readStore<Message[]>(STORAGE_KEYS.messages, mockMessages);
}

function save(items: Message[]): void {
  writeStore(STORAGE_KEYS.messages, items);
}

function buildMessage(
  conversationId: string,
  role: Message["role"],
  content: string,
): Message {
  return {
    id: createId(),
    conversationId,
    role,
    content,
    createdAt: new Date().toISOString(),
  };
}

export const chatService = {
  async listMessages(conversationId: string): Promise<Message[]> {
    await delay(MOCK_LATENCY);
    return load().filter((m) => m.conversationId === conversationId);
  },

  /** Persists the user message. */
  async sendMessage(conversationId: string, content: string): Promise<Message> {
    const message = buildMessage(conversationId, "user", content);
    save([...load(), message]);
    return message;
  },

  /**
   * Temporary stand-in for the assistant reply.
   * Once the backend exists, the reply will come from sendMessage's response.
   */
  async getMockReply(conversationId: string): Promise<Message> {
    await delay(MOCK_AI_LATENCY);
    const content = mockAiReplies[Math.floor(Math.random() * mockAiReplies.length)]!;
    const message = buildMessage(conversationId, "assistant", content);
    save([...load(), message]);
    return message;
  },

  async clearConversation(conversationId: string): Promise<void> {
    save(load().filter((m) => m.conversationId !== conversationId));
  },
};
