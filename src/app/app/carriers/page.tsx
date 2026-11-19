import CarriersClient from "@/components/app/CarriersClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data } = await sb.from("carriers").select("*").order("created_at", { ascending: false });
  return <CarriersClient rows={data ?? []} userId={user!.id} />;
}
