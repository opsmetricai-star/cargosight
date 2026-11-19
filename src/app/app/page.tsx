import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import StatusChart from "@/components/app/StatusChart";

export const metadata = { title: "Dashboard | cargosight" };
export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const sb = await createClient();
  const [{ data: ships }, { data: exs }, { count: carriers }] = await Promise.all([
    sb.from("shipments").select("id,status,cargo_value,planned_eta,predicted_eta"),
    sb.from("exceptions").select("id,type,severity,status,created_at,shipments(reference)").eq("status", "open").order("created_at", { ascending: false }).limit(5),
    sb.from("carriers").select("id", { count: "exact", head: true }),
  ]);
  const s = ships ?? [];
  const count = (k: string) => s.filter((x) => x.status === k).length;
  const active = s.filter((x) => x.status !== "delivered");
  const delivered = s.filter((x) => x.status === "delivered").length;
  const atRisk = count("at_risk") + count("delayed");
  const valueInTransit = active.reduce((a, x) => a + Number(x.cargo_value || 0), 0);
  const chart = ["booked", "in_transit", "delayed", "at_risk", "delivered"].map((k) => ({ name: k.replace("_", " "), value: count(k) }));

  const kpis = [["Active shipments", active.length], ["At risk / delayed", atRisk], ["Delivered", delivered], ["Value in transit", `$${valueInTransit.toLocaleString()}`], ["Connected carriers", carriers ?? 0]];
  return (
    <div className="space-y-8">
      <h1 className="text-[30px]">Dashboard</h1>
      {s.length === 0 && (
        <div className="rounded-2xl bg-white p-6">No data yet. <Link href="/app/shipments" className="text-brand">Add your first shipment</Link> or load demo data from the shipments page.</div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {kpis.map(([l, v]) => (<div key={l} className="rounded-2xl bg-white p-5"><div className="text-sm text-[#5b6470]">{l}</div><div className="mt-1 text-[32px] font-light">{v}</div></div>))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6"><h2 className="mb-4 font-semibold">Shipments by status</h2><StatusChart data={chart} /></div>
        <div className="rounded-2xl bg-white p-6">
          <div className="mb-4 flex items-center justify-between"><h2 className="font-semibold">Open exceptions</h2><Link href="/app/exceptions" className="text-sm text-brand">View all</Link></div>
          {(exs ?? []).length === 0 ? <p className="text-[#5b6470]">Nothing needs attention.</p> : (
            <ul className="divide-y">
              {(exs ?? []).map((e: any) => (<li key={e.id} className="flex items-center justify-between py-3"><span>{e.type} <span className="text-[#5b6470]">· {e.shipments?.reference ?? "n/a"}</span></span><span className="rounded-full bg-pale px-3 py-0.5 text-xs capitalize">{e.severity}</span></li>))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
