import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, User } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { TextField } from "@/components/auth/TextField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — AI Chat Assistant" },
      {
        name: "description",
        content: "Create your AI Chat account and initialize your AI workspace.",
      },
      { property: "og:title", content: "Create account — AI Chat Assistant" },
      {
        property: "og:description",
        content: "Create your AI Chat account and initialize your AI workspace.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await register({ fullName, email, password });
      void navigate({ to: "/" });
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Initialize your AI workspace"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:text-primary-fixed">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          id="fullName"
          label="Full Name"
          icon={User}
          value={fullName}
          placeholder="Ada Lovelace"
          onChange={setFullName}
        />
        <TextField
          id="email"
          label="Email Address"
          type="email"
          icon={Mail}
          value={email}
          placeholder="ada@example.com"
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
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          icon={Lock}
          value={confirmPassword}
          placeholder="••••••••"
          onChange={setConfirmPassword}
        />
        {error && <p className="text-label-sm text-error">{error}</p>}
        <SubmitButton label="Create Account" loading={loading} />
      </form>
    </AuthLayout>
  );
}
