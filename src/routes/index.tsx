import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { EmptyState } from "@/components/chat/EmptyState";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { MessageInput } from "@/components/chat/MessageInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { formatDateDivider } from "@/utils/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Chat — Your intelligent coding assistant" },
      {
        name: "description",
        content:
          "Chat with an AI assistant about Java, Spring Boot and more. Organize conversations in a fast, focused workspace.",
      },
      { property: "og:title", content: "AI Chat — Your intelligent coding assistant" },
      {
        property: "og:description",
        content:
          "Chat with an AI assistant about Java, Spring Boot and more. Organize conversations in a fast, focused workspace.",
      },
    ],
  }),
  component: ChatDashboard,
});

function ChatDashboard() {
  const navigate = useNavigate();
  const { user, isReady, isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    conversations,
    activeConversation,
    activeId,
    messages,
    isTyping,
    startNewChat,
    selectConversation,
    deleteConversation,
    clearActiveChat,
    sendMessage,
  } = useChat();

  useEffect(() => {
    if (isReady && !isAuthenticated) void navigate({ to: "/login" });
  }, [isReady, isAuthenticated, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!isReady || !isAuthenticated) {
    return <div className="min-h-screen bg-background" />;
  }

  const handleLogout = async () => {
    await logout();
    void navigate({ to: "/login" });
  };

  const userInitial = user?.fullName.charAt(0) ?? "U";

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        user={user}
        conversations={conversations}
        activeId={activeId}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={startNewChat}
        onSelect={selectConversation}
        onDelete={(id) => void deleteConversation(id)}
        onLogout={() => void handleLogout()}
      />

      <main className="relative flex h-screen flex-1 flex-col md:ml-[280px]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/5 blur-[100px]" />
          <div className="absolute bottom-[20%] -left-[10%] h-[600px] w-[600px] rounded-full bg-secondary-container/5 blur-[120px]" />
        </div>

        <ChatHeader
          title={activeConversation?.title}
          hasConversation={Boolean(activeId)}
          onOpenSidebar={() => setSidebarOpen(true)}
          onClearChat={() => void clearActiveChat()}
          onDeleteChat={() => activeId && void deleteConversation(activeId)}
        />

        <div className="relative z-10 flex flex-1 justify-center overflow-y-auto">
          <div className="flex w-full max-w-[800px] flex-col gap-6 px-4 py-6 md:px-10">
            {messages.length === 0 && !isTyping ? (
              <EmptyState onPromptSelect={(prompt) => void sendMessage(prompt)} />
            ) : (
              <>
                <div className="my-2 flex w-full justify-center">
                  <span className="rounded-full border border-white/5 bg-surface-high px-3 py-1 text-label-sm text-on-surface-variant">
                    {formatDateDivider(messages[0]?.createdAt ?? new Date().toISOString())}
                  </span>
                </div>
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    userInitial={userInitial}
                  />
                ))}
                {isTyping && <TypingIndicator />}
              </>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="relative z-10 flex justify-center px-4 pb-6 md:px-10">
          <div className="w-full max-w-[800px]">
            <MessageInput onSend={(text) => void sendMessage(text)} disabled={isTyping} />
          </div>
        </div>
      </main>
    </div>
  );
}
