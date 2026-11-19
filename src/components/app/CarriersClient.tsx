"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type C = { id: string; name: string; scac: string | null; mode: string; connection: string; status: string; on_time_pct: number };

export default function CarriersClient({ rows, userId }: { rows: C[]; userId: string }) {
  const r = useRouter(); const sb = createClient(); const [err, setErr] = useState("");
  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); const f = new FormData(e.currentTarget);
    const { error } = await sb.from("carriers").insert({ user_id: userId, name: f.get("name"), scac: f.get("scac") || null, mode: f.get("mode"), connection: f.get("connection") });
    if (error) setErr(error.message); else { (e.target as HTMLFormElement).reset(); r.refresh(); }
  }
  async function set(id: string, status: string) { await sb.from("carriers").update({ status }).eq("id", id); r.refresh(); }
  async function del(id: string) { if (confirm("Remove carrier?")) { await sb.from("carriers").delete().eq("id", id); r.refresh(); } }
  return (
    <div className="space-y-6">
      <h1 className="text-[30px]">Carriers</h1>
      <form onSubmit={add} className="grid gap-3 rounded-2xl bg-white p-5 sm:grid-cols-2 lg:grid-cols-5">
        <input name="name" required placeholder="Carrier name" className="input" /><input name="scac" placeholder="SCAC" className="input" maxLength={4} />
        <select name="mode" className="input"><option>road</option><option>ocean</option><option>air</option><option>rail</option></select>
        <select name="connection" className="input"><option value="app">Driver app</option><option value="telematics">Telematics</option><option value="api">API</option><option value="edi">EDI</option></select>
        <button className="btn btn-lg">Invite carrier</button>
        {err && <p role="alert" className="text-sm text-red-600 lg:col-span-5">{err}</p>}
      </form>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.length === 0 && <p className="text-[#5b6470]">No carriers yet.</p>}
        {rows.map((c) => (
          <div key={c.id} className="rounded-2xl bg-white p-5">
            <div className="flex justify-between"><b>{c.name}</b><span className="text-sm text-[#5b6470]">{c.scac}</span></div>
            <div className="mt-1 text-sm capitalize text-[#5b6470]">{c.mode} · {c.connection}</div>
            <div className="mt-4 flex items-center justify-between">
              <select value={c.status} onChange={(e) => set(c.id, e.target.value)} className="rounded-full bg-pale px-3 py-1 text-sm">{["invited", "connecting", "live", "paused"].map((s) => <option key={s}>{s}</option>)}</select>
              <button onClick={() => del(c.id)} className="text-sm text-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
