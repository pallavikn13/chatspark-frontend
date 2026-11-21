import type { Conversation } from "@/types";
import { API_BASE_URL } from "@/utils/constants";
import { getAuthHeader } from "./authService";

export const conversationService = {
  async list(): Promise<Conversation[]> {
    const headers = getAuthHeader();
    if (!headers['Authorization']) return [];

    const res = await fetch(`${API_BASE_URL}/conversations`, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) return [];
      throw new Error("Failed to fetch conversations");
    }

    return await res.json();
  },

  async get(id: string): Promise<Conversation | null> {
    const headers = getAuthHeader();
    if (!headers['Authorization']) return null;

    const res = await fetch(`${API_BASE_URL}/conversations/${id}`, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;
    return await res.json();
  },

  async create(title = "New Chat"): Promise<Conversation> {
    const headers = getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/conversations`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      throw new Error("Failed to create conversation");
    }

    return await res.json();
  },

  async rename(id: string, title: string): Promise<void> {
    const headers = getAuthHeader();
    await fetch(`${API_BASE_URL}/conversations/${id}`, {
      method: "PUT",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
  },

  async remove(id: string): Promise<void> {
    const headers = getAuthHeader();
    await fetch(`${API_BASE_URL}/conversations/${id}`, {
      method: "DELETE",
      headers,
    });
  },
};
