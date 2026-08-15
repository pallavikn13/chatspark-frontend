import type { ReactNode } from "react";
import { Bot } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[20%] -top-[40%] h-[80%] w-[80%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[40%] -right-[20%] h-[80%] w-[80%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <main className="relative z-10 w-full max-w-[440px]">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-surface-high shadow-[0_0_30px_rgba(173,198,255,0.15)]">
            <Bot size={32} className="text-primary" />
          </div>
          <h1 className="mb-2 text-headline-lg tracking-tight text-on-surface">{title}</h1>
          <p className="text-body-md text-on-surface-variant">{subtitle}</p>
        </div>

        <div className="glass-panel relative rounded-xl p-8 shadow-2xl">
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          {children}
          <div className="mt-6 text-center text-body-md text-on-surface-variant">{footer}</div>
        </div>

        <footer className="mt-8 flex justify-center gap-4 text-label-sm text-on-surface-variant/70">
          <span>© 2024 AI Chat Inc.</span>
          <span>Privacy</span>
          <span>Terms</span>
        </footer>
      </main>
    </div>
  );
}
