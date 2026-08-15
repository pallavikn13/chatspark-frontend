import { useMemo, useState } from "react";
import { Bot, LogOut, Plus, Search, X } from "lucide-react";
import type { Conversation, User } from "@/types";
import { APP_NAME, APP_VERSION } from "@/utils/constants";
import { ConversationItem } from "@/components/chat/ConversationItem";

interface SidebarProps {
  user: User | null;
  conversations: Conversation[];
  activeId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onLogout: () => void;
}

export function Sidebar({
  user,
  conversations,
  activeId,
  isOpen,
  onClose,
  onNewChat,
  onSelect,
  onDelete,
  onLogout,
}: SidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return conversations;
    return conversations.filter((c) => c.title.toLowerCase().includes(q));
  }, [conversations, query]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-white/10 bg-surface-container/95 p-6 backdrop-blur-xl transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="ai-glow flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface-highest">
            <Bot size={22} className="text-primary" />
          </div>
          <h2 className="text-headline-md font-bold text-primary">{APP_NAME}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="ml-auto rounded-full p-1.5 text-on-surface-variant hover:bg-white/5 md:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            onNewChat();
            onClose();
          }}
          className="mb-4 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-body-md font-semibold text-on-primary transition-colors hover:bg-primary-fixed"
        >
          <Plus size={18} /> New Chat
        </button>

        <div className="relative mb-4">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            aria-label="Search conversations"
            className="w-full rounded-lg border border-outline-variant/50 bg-surface-lowest/60 py-2 pl-9 pr-3 text-body-md text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary focus:outline-none"
          />
        </div>

        <p className="mb-2 px-1 text-label-sm uppercase text-on-surface-variant/60">
          Recent Conversations
        </p>

        <nav className="-mr-2 flex-1 space-y-1 overflow-y-auto pr-2">
          {filtered.length === 0 ? (
            <p className="px-1 py-4 text-body-md text-on-surface-variant/60">
              No conversations found.
            </p>
          ) : (
            filtered.map((conversation) => (
              <ConversationItem
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeId}
                onSelect={(id) => {
                  onSelect(id);
                  onClose();
                }}
                onDelete={onDelete}
              />
            ))
          )}
        </nav>

        <div className="mt-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 px-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-surface-highest text-body-md font-semibold uppercase text-primary">
              {user?.fullName.charAt(0) ?? "U"}
            </div>
            <div className="min-w-0">
              <p className="truncate text-body-md font-semibold text-on-surface">
                {user?.fullName ?? "Guest"}
              </p>
              <p className="text-label-sm text-on-surface-variant">
                {user?.plan ?? "Free Plan"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="mt-3 flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-body-md text-on-surface-variant transition-colors hover:bg-white/5 hover:text-error"
          >
            <LogOut size={18} /> Logout
          </button>
          <span className="ml-4 text-label-sm text-on-surface-variant opacity-50">
            {APP_VERSION}
          </span>
        </div>
      </aside>
    </>
  );
}
