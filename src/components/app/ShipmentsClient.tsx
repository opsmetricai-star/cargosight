"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Ship = { id: string; reference: string; mode: string; origin: string; destination: string; status: string; planned_eta: string | null; predicted_eta: string | null; cargo_value: number };
const STATUSES = ["booked", "in_transit", "delayed", "at_risk", "delivered"];
const day = (n: number) => new Date(Date.now() + n * 86400000).toISOString();

export default function ShipmentsClient({ rows, userId }: { rows: Ship[]; userId: string }) {
  const r = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const sb = createClient();

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setBusy(true);
    const f = new FormData(e.currentTarget);
    const eta = String(f.get("eta") || "");
    const { error } = await sb.from("shipments").insert({
      user_id: userId, reference: f.get("reference"), mode: f.get("mode"), origin: f.get("origin"), destination: f.get("destination"),
      cargo_value: Number(f.get("value") || 0), planned_eta: eta ? new Date(eta).toISOString() : null, predicted_eta: eta ? new Date(eta).toISOString() : null,
    });
    setBusy(false);
    if (error) setErr(error.message.includes("limit") ? error.message : error.message); else { (e.target as HTMLFormElement).reset(); r.refresh(); }
  }
  async function setStatus(id: string, status: string) { await sb.from("shipments").update({ status }).eq("id", id); r.refresh(); }
  async function del(id: string) { if (confirm("Delete this shipment?")) { await sb.from("shipments").delete().eq("id", id); r.refresh(); } }
  async function demo() {
    setBusy(true);
    const seed = [
      ["CS-1001", "ocean", "Shanghai", "Rotterdam", "delayed", 12, 15.5, 240000], ["CS-1002", "road", "Chicago", "Dallas", "in_transit", 2, 2, 38000],
      ["CS-1003", "air", "Frankfurt", "New York", "at_risk", 1, 2.5, 120000], ["CS-1004", "rail", "Los Angeles", "Kansas City", "in_transit", 5, 5, 64000], ["CS-1005", "ocean", "Santos", "Antwerp", "booked", 20, 20, 91000],
    ] as const;
    const { error } = await sb.from("shipments").insert(seed.map(([reference, mode, origin, destination, status, p, q, v]) => ({ user_id: userId, reference, mode, origin, destination, status, planned_eta: day(p), predicted_eta: day(q), cargo_value: v })));
    setBusy(false); if (error) setErr(error.message); else r.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3"><h1 className="text-[30px]">Shipments</h1>
        {rows.length === 0 && <button onClick={demo} disabled={busy} className="btn btn-ghost !text-black">Load demo data</button>}</div>
      <form onSubmit={add} className="grid gap-3 rounded-2xl bg-white p-5 sm:grid-cols-2 lg:grid-cols-6">
        <input name="reference" required placeholder="Reference" className="input" />
        <select name="mode" className="input"><option>ocean</option><option>road</option><option>air</option><option>rail</option></select>
        <input name="origin" required placeholder="Origin" className="input" />
        <input name="destination" required placeholder="Destination" className="input" />
        <input name="eta" type="date" className="input" aria-label="ETA" />
        <input name="value" type="number" min="0" placeholder="Cargo value $" className="input" />
        <button disabled={busy} className="btn btn-lg lg:col-span-6 sm:w-fit disabled:opacity-60">Add shipment</button>
        {err && <p role="alert" className="text-sm text-red-600 lg:col-span-6">{err}</p>}
      </form>
      <div className="overflow-x-auto rounded-2xl bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b text-[#5b6470]"><tr>{["Reference", "Mode", "Route", "ETA", "Value", "Status", ""].map((h) => <th key={h} className="p-4 font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={7} className="p-6 text-[#5b6470]">No shipments yet.</td></tr>}
            {rows.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="p-4 font-semibold">{s.reference}</td><td className="p-4 capitalize">{s.mode}</td><td className="p-4">{s.origin} → {s.destination}</td>
                <td className="p-4">{s.predicted_eta ? new Date(s.predicted_eta).toLocaleDateString() : "n/a"}</td><td className="p-4">${Number(s.cargo_value).toLocaleString()}</td>
                <td className="p-4"><select value={s.status} onChange={(e) => setStatus(s.id, e.target.value)} className="rounded-full bg-pale px-3 py-1">{STATUSES.map((x) => <option key={x}>{x}</option>)}</select></td>
                <td className="p-4"><button onClick={() => del(s.id)} className="text-red-600">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
