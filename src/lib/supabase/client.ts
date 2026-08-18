import { createBrowserClient } from "@supabase/ssr";

/**
 * Client-side Supabase client using the public anon key.
 * Safe to use in client components — RLS policies restrict it to
 * inserting leads and reading published content only (see migration 0001).
 */
export function getSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
