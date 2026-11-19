import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Page() {
  const sb = await createClient();
  const { data } = await sb.from("notifications").select("*").order("created_at", { ascending: false }).limit(50);
  return (
    <div className="space-y-6">
      <h1 className="text-[30px]">Notifications</h1>
      <ul className="divide-y rounded-2xl bg-white">
        {(data ?? []).length === 0 && <li className="p-5 text-[#5b6470]">You're all caught up.</li>}
        {(data ?? []).map((n) => (<li key={n.id} className="p-5"><div className="font-semibold">{n.title}</div><div className="text-sm text-[#5b6470]">{n.body}</div><div className="mt-1 text-xs text-[#8a93a0]">{new Date(n.created_at).toLocaleString()}</div></li>))}
      </ul>
    </div>
  );
}
