import { Bot } from "lucide-react";
import type { Message } from "@/types";
import { formatTime } from "@/utils/format";
import { MessageContent } from "./MessageContent";

interface MessageBubbleProps {
  message: Message;
  userInitial: string;
}

export function MessageBubble({ message, userInitial }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`group flex w-full gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 ${
          isUser ? "bg-surface-highest text-primary" : "bg-surface-high text-primary ai-glow"
        }`}
        aria-hidden
      >
        {isUser ? (
          <span className="text-label-sm font-semibold uppercase">{userInitial}</span>
        ) : (
          <Bot size={18} />
        )}
      </div>

      <div className={`flex min-w-0 flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={
            isUser
              ? "flex max-w-[85%] flex-col gap-2 rounded-2xl rounded-br-none bg-primary p-4 text-on-primary md:max-w-[75%]"
              : "relative flex max-w-[95%] flex-col gap-4 rounded-2xl rounded-bl-none border border-white/10 bg-surface-high/80 p-4 text-on-surface backdrop-blur-xl md:max-w-[85%]"
          }
        >
          <MessageContent content={message.content} />
        </div>
        <span className="mt-1 text-label-sm text-on-surface-variant opacity-0 transition-opacity group-hover:opacity-100">
          {formatTime(message.createdAt)}
        </span>
      </div>
    </div>
  );
}
