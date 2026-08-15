import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { LoginPayload, RegisterPayload, User } from "@/types";
import { authService } from "@/services/authService";

interface AuthContextValue {
  user: User | null;
  isReady: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setIsReady(true);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const { user: next } = await authService.login(payload);
    setUser(next);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const { user: next } = await authService.register(payload);
    setUser(next);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isReady, isAuthenticated: Boolean(user), login, register, logout }),
    [user, isReady, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
