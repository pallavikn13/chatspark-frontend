/**
 * Tiny localStorage wrapper used by the mock services.
 * When the Java Spring Boot backend is ready this file can be deleted.
 */
export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota errors */
  }
}

export function removeStore(key: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
