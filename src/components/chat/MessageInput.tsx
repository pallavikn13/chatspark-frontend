import { useEffect, useRef, useState } from "react";
import { Paperclip, SendHorizontal } from "lucide-react";

interface MessageInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({
  onSend,
  disabled = false,
  placeholder = "Message AI Chat...",
}: MessageInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }, [value]);

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
  };

  return (
    <div className="w-full">
      <div className="ai-border-glow flex flex-col gap-2 rounded-2xl border border-white/10 bg-surface-high/90 p-2 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all focus-within:border-primary/50">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={1}
          placeholder={placeholder}
          aria-label="Message"
          className="max-h-[150px] min-h-[48px] w-full resize-none bg-transparent px-3 py-2 text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
        />
        <div className="flex items-center justify-between px-2 pb-1">
          <button
            type="button"
            aria-label="Attach file"
            className="flex items-center justify-center rounded-full p-2 text-on-surface-variant transition-colors hover:bg-white/5 hover:text-primary"
          >
            <Paperclip size={20} />
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_0_15px_rgba(173,198,255,0.3)] transition-colors hover:bg-primary-fixed disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
      <p className="mt-3 text-center text-label-sm text-on-surface-variant/70">
        AI can make mistakes. Verify important information.
      </p>
    </div>
  );
}
