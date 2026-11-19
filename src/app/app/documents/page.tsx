import DocumentsClient from "@/components/app/DocumentsClient";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const { data } = await sb.from("documents").select("*").order("created_at", { ascending: false });
  return <DocumentsClient rows={data ?? []} userId={user!.id} />;
}
