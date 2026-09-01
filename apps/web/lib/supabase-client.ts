"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null | undefined;

/**
 * Browser-only Realtime client — зөвхөн public/anon key ашиглана.
 * Service-role key энд хэзээ ч ирэхгүй (тэр зөвхөн apps/service дотор, серверт л ашиглагдана).
 * Env тохируулагдаагүй бол null буцааж, дуудагч тал polling-гүйгээр чимээгүй disable хийнэ.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (client !== undefined) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  client = url && anonKey ? createClient(url, anonKey) : null;
  return client;
}
