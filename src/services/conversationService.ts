import type { Conversation } from "@/types";
import { mockConversations } from "@/data/mockData";
import { MOCK_LATENCY, STORAGE_KEYS } from "@/utils/constants";
import { createId, delay } from "@/utils/format";
import { readStore, writeStore } from "./storage";

/**
 * Mock conversation service.
 *
 * Future backend mapping:
 *   list   -> GET    /api/conversations
 *   create -> POST   /api/conversations
 *   get    -> GET    /api/conversations/{id}
 *   remove -> DELETE /api/conversations/{id}
 */
function load(): Conversation[] {
  return readStore<Conversation[]>(STORAGE_KEYS.conversations, mockConversations);
}

function save(items: Conversation[]): void {
  writeStore(STORAGE_KEYS.conversations, items);
}

export const conversationService = {
  async list(): Promise<Conversation[]> {
    await delay(MOCK_LATENCY);
    return [...load()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },

  async get(id: string): Promise<Conversation | null> {
    await delay(MOCK_LATENCY);
    return load().find((c) => c.id === id) ?? null;
  },

  async create(title = "New Chat"): Promise<Conversation> {
    await delay(MOCK_LATENCY);
    const nowIso = new Date().toISOString();
    const conversation: Conversation = {
      id: createId(),
      title,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    save([conversation, ...load()]);
    return conversation;
  },

  async rename(id: string, title: string): Promise<void> {
    const items = load().map((c) =>
      c.id === id ? { ...c, title, updatedAt: new Date().toISOString() } : c,
    );
    save(items);
  },

  async touch(id: string): Promise<void> {
    const items = load().map((c) =>
      c.id === id ? { ...c, updatedAt: new Date().toISOString() } : c,
    );
    save(items);
  },

  async remove(id: string): Promise<void> {
    await delay(MOCK_LATENCY);
    save(load().filter((c) => c.id !== id));
  },
};
