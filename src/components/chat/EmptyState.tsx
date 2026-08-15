import { Bug, Code2, Lightbulb, GraduationCap, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SUGGESTED_PROMPTS } from "@/utils/constants";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  bug: Bug,
  school: GraduationCap,
  lightbulb: Lightbulb,
};

export function EmptyState({ onPromptSelect }: { onPromptSelect: (prompt: string) => void }) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center py-8">
      <div className="ai-glow glass-panel mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <Sparkles size={40} className="text-primary" />
      </div>
      <h1 className="ai-text-glow mb-4 text-center text-headline-lg md:text-display">
        How can I help you today?
      </h1>
      <p className="mb-12 max-w-2xl text-center text-body-lg text-on-surface-variant">
        I'm your intelligent assistant. Select a suggested prompt below or type your own
        message to begin our conversation.
      </p>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
        {SUGGESTED_PROMPTS.map((item) => {
          const Icon = ICONS[item.icon] ?? Sparkles;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => onPromptSelect(item.prompt)}
              className="ai-border-glow group glass-panel rounded-xl p-4 text-left transition-all duration-300 hover:bg-white/5"
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="text-headline-md text-primary">{item.title}</span>
                <Icon
                  size={20}
                  className="text-on-surface-variant transition-colors group-hover:text-primary"
                />
              </div>
              <p className="text-body-md text-on-surface-variant">{item.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
