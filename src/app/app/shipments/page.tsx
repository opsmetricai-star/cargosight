import ShipmentsClient from "@/components/app/ShipmentsClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data } = await sb.from("shipments").select("*").order("created_at", { ascending: false });
  return <ShipmentsClient rows={data ?? []} userId={user!.id} />;
}
