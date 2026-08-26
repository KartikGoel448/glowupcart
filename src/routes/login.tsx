import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Lock, User as UserIcon, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

type Mode = "signin" | "signup" | "forgot";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" && search.redirect.startsWith("/")
      ? search.redirect
      : undefined,
    mode: search.mode === "signup" ? ("signup" as const) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign in — GlowCart" },
      { name: "description", content: "Sign in or create your GlowCart account to track orders and checkout faster." },
      { property: "og:title", content: "Sign in — GlowCart" },
      { property: "og:description", content: "Sign in or create your GlowCart account to track orders and checkout faster." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

const field =
  "w-full pl-10 pr-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function LoginPage() {
  const { redirect, mode: initialMode } = Route.useSearch();
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode ?? "signin");
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState<null | "confirm" | "reset">(null);

  useEffect(() => {
    if (!loading && session) navigate({ to: redirect ?? "/account", replace: true });
  }, [loading, session, redirect, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: redirect ?? "/account", replace: true });
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name.trim() },
          },
        });
        if (error) throw error;
        if (data.session) {
          toast.success("Account created!");
          navigate({ to: redirect ?? "/account", replace: true });
        } else {
          setSent("confirm");
        }
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setSent("reset");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-hero grid place-items-center text-primary-foreground">
          <Mail className="h-6 w-6" />
        </div>
        <h1 className="mt-6 text-2xl font-extrabold">Check your inbox</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {sent === "confirm"
            ? `We sent a confirmation link to ${email}. Click it to activate your account, then sign in.`
            : `We sent a password reset link to ${email}.`}
        </p>
        <button
          onClick={() => {
            setSent(null);
            setMode("signin");
          }}
          className="mt-6 text-sm font-semibold text-primary"
        >
          ← Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="mt-6 rounded-2xl border border-border bg-card p-7 shadow-card">
        <h1 className="text-2xl font-extrabold tracking-tight">
          {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Reset password"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Welcome back to GlowCart."
            : mode === "signup"
              ? "Track orders, save your cart, and unlock student pricing."
              : "We'll email you a link to set a new password."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          {mode === "signup" && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Full name"
                className={field}
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              className={field}
            />
          </div>
          {mode !== "forgot" && (
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                placeholder="Password"
                className={field}
              />
            </div>
          )}
          <button
            disabled={busy}
            className="w-full py-3 rounded-xl bg-gradient-hero text-primary-foreground font-semibold shadow-pop disabled:opacity-60"
          >
            {busy
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset link"}
          </button>
        </form>

        <div className="mt-5 space-y-2 text-sm">
          {mode === "signin" && (
            <>
              <button onClick={() => setMode("forgot")} className="text-muted-foreground hover:text-foreground">
                Forgot your password?
              </button>
              <p className="text-muted-foreground">
                New here?{" "}
                <button onClick={() => setMode("signup")} className="font-semibold text-primary">
                  Create an account
                </button>
              </p>
            </>
          )}
          {mode !== "signin" && (
            <button onClick={() => setMode("signin")} className="font-semibold text-primary">
              ← Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
