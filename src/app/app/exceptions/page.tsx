import ExceptionsClient from "@/components/app/ExceptionsClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const [{ data: rows }, { data: ships }] = await Promise.all([
    sb.from("exceptions").select("*, shipments(reference)").order("created_at", { ascending: false }),
    sb.from("shipments").select("id, reference").order("created_at", { ascending: false }),
  ]);
  return <ExceptionsClient rows={(rows as any) ?? []} ships={ships ?? []} userId={user!.id} />;
}
