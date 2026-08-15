import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface Block {
  type: "text" | "code";
  content: string;
  language?: string | undefined;
}

/** Splits a message into plain text and fenced code blocks. */
function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content))) {
    if (match.index > lastIndex) {
      blocks.push({ type: "text", content: content.slice(lastIndex, match.index) });
    }
    blocks.push({ type: "code", content: match[2] ?? "", language: match[1] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < content.length) {
    blocks.push({ type: "text", content: content.slice(lastIndex) });
  }
  return blocks.filter((b) => b.content.trim().length > 0);
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group/code relative w-full overflow-hidden rounded-xl border border-outline-variant bg-black">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161b22] px-4 py-2">
        <span className="text-label-sm text-on-surface-variant">{language ?? "code"}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded bg-white/5 px-2 py-1 text-label-sm text-on-surface-variant transition-colors hover:text-on-surface"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="font-mono text-code text-on-surface">{code.trimEnd()}</code>
      </pre>
    </div>
  );
}

export function MessageContent({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <>
      {blocks.map((block, index) =>
        block.type === "code" ? (
          <CodeBlock key={index} code={block.content} language={block.language} />
        ) : (
          <p key={index} className="whitespace-pre-wrap text-body-md">
            {block.content.trim()}
          </p>
        ),
      )}
    </>
  );
}
