import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex w-full gap-3">
      <div
        className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-high text-primary"
        aria-hidden
      >
        <Bot size={18} />
      </div>
      <div className="relative flex w-fit items-center gap-1.5 overflow-hidden rounded-2xl rounded-bl-none border border-primary/20 bg-surface-high/80 px-4 py-3 backdrop-blur-xl">
        <div className="absolute inset-0 animate-pulse bg-primary/5" />
        <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
        <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
        <span className="typing-dot h-2 w-2 rounded-full bg-primary" />
        <span className="z-10 ml-2 text-label-sm text-primary">AI is thinking...</span>
      </div>
    </div>
  );
}
