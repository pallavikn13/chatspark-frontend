import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { TextField } from "@/components/auth/TextField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AI Chat Assistant" },
      {
        name: "description",
        content: "Sign in to AI Chat to continue your conversations with the assistant.",
      },
      { property: "og:title", content: "Sign in — AI Chat Assistant" },
      {
        property: "og:description",
        content: "Sign in to AI Chat to continue your conversations with the assistant.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("ada@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      void navigate({ to: "/" });
    } catch (err: any) {
      setError(err?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to AI Chat"
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-primary hover:text-primary-fixed">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <TextField
          id="email"
          label="Email"
          type="email"
          icon={Mail}
          value={email}
          placeholder="Enter your email"
          onChange={setEmail}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          placeholder="••••••••"
          onChange={setPassword}
        />
        {error && <p className="text-label-sm text-error">{error}</p>}
        <SubmitButton label="Login" loading={loading} />
      </form>
    </AuthLayout>
  );
}
