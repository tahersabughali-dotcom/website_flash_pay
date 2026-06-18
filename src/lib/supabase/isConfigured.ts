/**
 * Supabase configuration checks — safe when env vars are missing.
 */

function readPublicUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || undefined;
}

function readAnonKey(): string | undefined {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || undefined;
}

function readServiceRoleKey(): string | undefined {
  return process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || undefined;
}

/** Browser + client components: public URL + anon key */
export function isSupabaseConfigured(): boolean {
  return Boolean(readPublicUrl() && readAnonKey());
}

/** Server-only admin operations (future API routes) — never use in client components */
export function isSupabaseAdminConfigured(): boolean {
  return isSupabaseConfigured() && Boolean(readServiceRoleKey());
}

export function getSupabasePublicConfig(): { url: string; anonKey: string } | null {
  const url = readPublicUrl();
  const anonKey = readAnonKey();
  if (!url || !anonKey) return null;
  return { url, anonKey };
}
