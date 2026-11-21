import type { AuthResponse, LoginPayload, RegisterPayload, User } from "@/types";
import { API_BASE_URL, STORAGE_KEYS } from "@/utils/constants";
import { readStore, removeStore, writeStore } from "./storage";

export function getAuthHeader(): Record<string, string> {
  const token = readStore<string | null>(STORAGE_KEYS.token, null);
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Invalid email or password");
    }

    const data: AuthResponse = await res.json();
    writeStore(STORAGE_KEYS.user, data.user);
    writeStore(STORAGE_KEYS.token, data.token);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Registration failed");
    }

    const data: AuthResponse = await res.json();
    writeStore(STORAGE_KEYS.user, data.user);
    writeStore(STORAGE_KEYS.token, data.token);
    return data;
  },

  async fetchCurrentUser(): Promise<User | null> {
    const headers = getAuthHeader();
    if (!headers['Authorization']) return null;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        this.logout();
        return null;
      }

      const user: User = await res.json();
      writeStore(STORAGE_KEYS.user, user);
      return user;
    } catch {
      return this.getCurrentUser();
    }
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
