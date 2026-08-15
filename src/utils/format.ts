/** Formats an ISO date string as a short message timestamp, e.g. "10:42 AM". */
export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

/** Groups label for a message date: "Today", "Yesterday" or a short date. */
export function formatDateDivider(iso: string): string {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const same = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  if (same(date, today)) return "Today";
  if (same(date, yesterday)) return "Yesterday";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

/** Builds a conversation title from the first user message. */
export function titleFromMessage(text: string): string {
  const clean = text.trim().replace(/\s+/g, " ");
  return clean.length > 34 ? `${clean.slice(0, 34)}…` : clean || "New Chat";
}

export function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
