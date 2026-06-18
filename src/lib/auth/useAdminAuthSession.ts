"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminAuthState } from "@/types/auth";
import { createSupabaseBrowserAuthClient } from "@/lib/supabase/browserAuth";
import { isSupabaseConfigured } from "@/lib/supabase/isConfigured";

function initialAuthState(): AdminAuthState {
  return isSupabaseConfigured() ? "loading" : "unauthenticated";
}

export function useAdminAuthSession() {
  const [authState, setAuthState] = useState<AdminAuthState>(initialAuthState);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    const supabase = createSupabaseBrowserAuthClient();
    if (!supabase) {
      return;
    }

    void supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user?.email) {
        setAuthState("unauthenticated");
        setEmail(null);
        return;
      }

      setEmail(data.user.email);
      setAuthState("authenticated");
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const nextEmail = session?.user?.email ?? null;
      setEmail(nextEmail);
      setAuthState(nextEmail ? "authenticated" : "unauthenticated");
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithMagicLink = useCallback(async (inputEmail: string) => {
    const supabase = createSupabaseBrowserAuthClient();
    if (!supabase) {
      return { ok: false as const, message: "Supabase is not configured." };
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/admin`
        : undefined;

    const { error } = await supabase.auth.signInWithOtp({
      email: inputEmail.trim(),
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      return { ok: false as const, message: error.message };
    }

    return {
      ok: true as const,
      message: "Check your email for the magic link.",
    };
  }, []);

  const signOut = useCallback(async () => {
    const supabase = createSupabaseBrowserAuthClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    setEmail(null);
    setAuthState("unauthenticated");
  }, []);

  return {
    authState,
    email,
    supabaseConfigured: isSupabaseConfigured(),
    signInWithMagicLink,
    signOut,
  };
}
