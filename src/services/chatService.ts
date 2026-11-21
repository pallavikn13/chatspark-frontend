import type { Message } from "@/types";
import { API_BASE_URL } from "@/utils/constants";
import { getAuthHeader } from "./authService";

export interface SendMessageApiResponse {
  conversationId: string;
  userMessage: Message;
  aiMessage: Message;
}

export const chatService = {
  async listMessages(conversationId: string): Promise<Message[]> {
    const headers = getAuthHeader();
    if (!headers['Authorization']) return [];

    const res = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return [];
    return await res.json();
  },

  /**
   * Sends user message to backend, which persists user message, calls Gemini AI,
   * persists AI response, and returns both userMessage and aiMessage in one response.
   */
  async sendMessage(conversationId: string, content: string): Promise<SendMessageApiResponse> {
    const headers = getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to send message");
    }

    return await res.json();
  },
};
