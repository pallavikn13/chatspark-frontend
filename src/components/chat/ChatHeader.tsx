import { useEffect, useRef, useState } from "react";
import { Menu, MoreVertical, Trash2, Eraser } from "lucide-react";
import { APP_NAME } from "@/utils/constants";

interface ChatHeaderProps {
  title?: string | undefined;
  onOpenSidebar: () => void;
  onClearChat: () => void;
  onDeleteChat: () => void;
  hasConversation: boolean;
}

export function ChatHeader({
  title,
  onOpenSidebar,
  onClearChat,
  onDeleteChat,
  hasConversation,
}: ChatHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-surface/80 px-4 backdrop-blur-xl md:px-10">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Open menu"
        className="flex items-center justify-center rounded-full p-2 text-on-surface-variant transition-colors hover:bg-white/5 md:hidden"
      >
        <Menu size={20} />
      </button>

      <h1 className="flex-1 truncate text-center text-headline-md font-bold text-primary md:text-left">
        {title ?? APP_NAME}
      </h1>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Conversation options"
          className="flex items-center justify-center rounded-full p-2 text-on-surface-variant transition-colors hover:bg-white/5"
        >
          <MoreVertical size={20} />
        </button>

        {menuOpen && (
          <div className="glass-panel absolute right-0 top-12 w-52 overflow-hidden rounded-lg py-1 shadow-2xl">
            <button
              type="button"
              disabled={!hasConversation}
              onClick={() => {
                onClearChat();
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-body-md text-on-surface-variant transition-colors hover:bg-white/5 disabled:opacity-40"
            >
              <Eraser size={16} /> Clear messages
            </button>
            <button
              type="button"
              disabled={!hasConversation}
              onClick={() => {
                onDeleteChat();
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2 text-body-md text-error transition-colors hover:bg-white/5 disabled:opacity-40"
            >
              <Trash2 size={16} /> Delete conversation
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
