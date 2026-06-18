import { createBrowserClient } from "@supabase/ssr";
import { getSupabasePublicConfig } from "@/lib/supabase/isConfigured";

export function createSupabaseBrowserAuthClient() {
  const config = getSupabasePublicConfig();
  if (!config || typeof window === "undefined") return null;

  return createBrowserClient(config.url, config.anonKey);
}
