import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { LogOut, Package, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { displayName, useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/account")({
  head: () => ({ meta: [
    { title: "My Account — GlowCart" },
    { name: "description", content: "Manage your GlowCart profile and account." },
    { property: "og:title", content: "My Account — GlowCart" },
    { property: "og:description", content: "Manage your GlowCart profile and account." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: AccountPage,
});

function AccountPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const profileQuery = useQuery({
    queryKey: ["profile", user?.id],
    enabled: Boolean(user),
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase.from("profiles").select("full_name, email").eq("id", user.id).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  async function signOut() {
    setBusy(true);
    await queryClient.cancelQueries();
    queryClient.clear();
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("We couldn't sign you out. Please try again.");
      setBusy(false);
      return;
    }
    navigate({ to: "/login", replace: true });
  }

  if (!user) return null;
  const name = profileQuery.data?.full_name?.trim() || displayName(user);
  const email = profileQuery.data?.email || user.email || "";

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      <p className="text-xs uppercase tracking-brand text-muted-foreground">Account</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">Welcome, {name}</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <UserRound className="h-5 w-5 text-primary" />
          <h2 className="mt-4 font-bold">Profile details</h2>
          <p className="mt-2 text-sm text-muted-foreground">Name</p><p className="font-semibold">{name}</p>
          <p className="mt-3 text-sm text-muted-foreground">Email</p><p className="font-semibold break-all">{email}</p>
        </section>
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <Package className="h-5 w-5 text-primary" />
          <h2 className="mt-4 font-bold">Your orders</h2>
          <p className="mt-2 text-sm text-muted-foreground">Review your purchases and delivery status.</p>
          <Link to="/orders" className="mt-5 inline-flex rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background">View orders</Link>
        </section>
      </div>
      <button disabled={busy} onClick={signOut} className="mt-8 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary disabled:opacity-60">
        <LogOut className="h-4 w-4" /> {busy ? "Signing out…" : "Sign out"}
      </button>
    </div>
  );
}