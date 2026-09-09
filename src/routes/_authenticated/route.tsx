import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) {
      const redirectPath = `${location.pathname}${location.searchStr ?? ""}${location.hash ?? ""}`;
      throw redirect({ to: "/login", search: { redirect: redirectPath } });
    }
  },
  component: () => <Outlet />,
});