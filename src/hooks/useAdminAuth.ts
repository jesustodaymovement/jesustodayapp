import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      if (!s) {
        setIsAdmin(false);
        setLoading(false);
      } else {
        // defer to avoid deadlock
        setTimeout(() => checkRole(s.user.id), 0);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) checkRole(data.session.user.id);
      else {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function checkRole(userId: string) {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data && !error);
    setLoading(false);
  }

  return { session, isAdmin, loading };
}