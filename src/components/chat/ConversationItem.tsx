import { MessageSquare, Trash2 } from "lucide-react";
import type { Conversation } from "@/types";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
}: ConversationItemProps) {
  return (
    <div
      className={`group flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors ${
        isActive ? "bg-white/10 text-primary" : "text-on-surface-variant hover:bg-white/5"
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(conversation.id)}
        className="flex min-w-0 flex-1 items-center gap-3 text-left"
      >
        <MessageSquare size={18} className="shrink-0" />
        <span className="truncate text-body-md">{conversation.title}</span>
      </button>
      <button
        type="button"
        aria-label={`Delete ${conversation.title}`}
        onClick={() => onDelete(conversation.id)}
        className="shrink-0 rounded p-1 text-on-surface-variant opacity-0 transition-all hover:text-error focus:opacity-100 group-hover:opacity-100"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
