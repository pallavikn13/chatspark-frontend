import type { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types";
import { MOCK_LATENCY, STORAGE_KEYS } from "@/utils/constants";
import { createId, delay } from "@/utils/format";
import { readStore, removeStore, writeStore } from "./storage";

/**
 * Mock authentication service.
 *
 * Future backend mapping:
 *   login    -> POST /api/auth/login
 *   register -> POST /api/auth/register
 *
 * Replace the bodies below with fetch() calls; the signatures stay the same.
 */
export const authService = {
  async login({ email }: LoginPayload): Promise<AuthResponse> {
    await delay(MOCK_LATENCY);
    const user: User = {
      id: createId(),
      fullName: email.split("@")[0] || "User",
      email,
      plan: "Pro Plan",
    };
    const token = `mock-token-${createId()}`;
    writeStore(STORAGE_KEYS.user, user);
    writeStore(STORAGE_KEYS.token, token);
    return { user, token };
  },

  async register({ fullName, email }: RegisterPayload): Promise<AuthResponse> {
    await delay(MOCK_LATENCY);
    const user: User = { id: createId(), fullName, email, plan: "Free Plan" };
    const token = `mock-token-${createId()}`;
    writeStore(STORAGE_KEYS.user, user);
    writeStore(STORAGE_KEYS.token, token);
    return { user, token };
  },

  async logout(): Promise<void> {
    removeStore(STORAGE_KEYS.user);
    removeStore(STORAGE_KEYS.token);
  },

  getCurrentUser(): User | null {
    return readStore<User | null>(STORAGE_KEYS.user, null);
  },

  getToken(): string | null {
    return readStore<string | null>(STORAGE_KEYS.token, null);
  },
};
