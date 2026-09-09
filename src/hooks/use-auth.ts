import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

/** Client-side Supabase session state. Safe to use in components only. */
export function useAuth(): AuthState {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const refresh = () => {
      supabase.auth.getSession().then(({ data }) => {
        if (!mounted) return;
        setSession(data.session);
        setLoading(false);
      });
    };

    refresh();
    window.addEventListener("glowcart-auth-change", refresh);

    return () => {
      mounted = false;
      window.removeEventListener("glowcart-auth-change", refresh);
    };
  }, []);

  return { session, user: session?.user ?? null, loading };
}

export function displayName(user: User | null): string {
  if (!user) return "";
  const meta = user.user_metadata as { full_name?: string } | undefined;
  return meta?.full_name?.trim() || user.email || "Account";
}
