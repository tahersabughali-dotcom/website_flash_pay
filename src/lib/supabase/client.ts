import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabasePublicConfig } from "./isConfigured";

let browserClient: SupabaseClient | null = null;

/**
 * Browser-safe Supabase client (anon key only).
 * Returns null when env vars are missing — callers must handle fallback.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (browserClient) {
    return browserClient;
  }

  const config = getSupabasePublicConfig();
  if (!config) {
    return null;
  }

  browserClient = createClient(config.url, config.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return browserClient;
}
