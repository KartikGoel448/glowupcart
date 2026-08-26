import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — GlowCart" },
      { name: "description", content: "Choose a new password for your GlowCart account." },
      { property: "og:title", content: "Set a new password — GlowCart" },
      { property: "og:description", content: "Choose a new password for your GlowCart account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Password updated");
    navigate({ to: "/account", replace: true });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <h1 className="text-2xl font-extrabold tracking-tight">Set a new password</h1>
        {ready ? (
          <form onSubmit={onSubmit} className="mt-6 space-y-3">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={6}
                autoComplete="new-password"
                placeholder="New password"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <button
              disabled={busy}
              className="w-full py-3 rounded-xl bg-gradient-hero text-primary-foreground font-semibold shadow-pop disabled:opacity-60"
            >
              {busy ? "Updating…" : "Update password"}
            </button>
          </form>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Open this page from the reset link in your email to set a new password.
          </p>
        )}
      </div>
    </div>
  );
}
