"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Ex = { id: string; type: string; severity: string; description: string | null; status: string; ai_analysis: any; shipments: { reference: string } | null };

export default function ExceptionsClient({ rows, ships, userId }: { rows: Ex[]; ships: { id: string; reference: string }[]; userId: string }) {
  const r = useRouter();
  const sb = createClient();
  const [err, setErr] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  async function add(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr("");
    const f = new FormData(e.currentTarget);
    const { error } = await sb.from("exceptions").insert({ user_id: userId, shipment_id: f.get("shipment") || null, type: f.get("type"), severity: f.get("severity"), description: f.get("description") });
    if (error) setErr(error.message); else { (e.target as HTMLFormElement).reset(); r.refresh(); }
  }
  async function analyze(id: string) {
    setBusyId(id); setErr("");
    const res = await fetch("/api/ai/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ exceptionId: id }) });
    const j = await res.json().catch(() => ({}));
    setBusyId(null);
    if (!res.ok) setErr(j.error || "Analysis failed."); else r.refresh();
  }
  async function resolve(id: string) { await sb.from("exceptions").update({ status: "resolved" }).eq("id", id); r.refresh(); }

  return (
    <div className="space-y-6">
      <h1 className="text-[30px]">Exceptions</h1>
      <form onSubmit={add} className="grid gap-3 rounded-2xl bg-white p-5 sm:grid-cols-2 lg:grid-cols-4">
        <select name="shipment" className="input"><option value="">No shipment</option>{ships.map((s) => <option key={s.id} value={s.id}>{s.reference}</option>)}</select>
        <input name="type" required placeholder="Type (e.g. Port congestion)" className="input" />
        <select name="severity" className="input" defaultValue="medium"><option>low</option><option>medium</option><option>high</option><option>critical</option></select>
        <input name="description" placeholder="What happened?" className="input" />
        <button className="btn btn-lg w-fit">Log exception</button>
      </form>
      {err && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{err}</p>}
      <div className="space-y-4">
        {rows.length === 0 && <p className="text-[#5b6470]">No exceptions logged.</p>}
        {rows.map((e) => (
          <div key={e.id} className="rounded-2xl bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><span className="font-semibold">{e.type}</span> <span className="text-[#5b6470]">· {e.shipments?.reference ?? "no shipment"}</span>
                <span className="ml-2 rounded-full bg-pale px-3 py-0.5 text-xs capitalize">{e.severity}</span>
                {e.status === "resolved" && <span className="ml-2 text-xs text-emerald-700">resolved</span>}</div>
              {e.status === "open" && <div className="flex gap-2"><button onClick={() => analyze(e.id)} disabled={busyId === e.id} className="btn disabled:opacity-60">{busyId === e.id ? "Analyzing…" : e.ai_analysis ? "Re-analyze (1 credit)" : "AI analyze (1 credit)"}</button><button onClick={() => resolve(e.id)} className="btn btn-ghost !text-black">Resolve</button></div>}
            </div>
            {e.description && <p className="mt-2 text-[#3a4350]">{e.description}</p>}
            {e.ai_analysis && (
              <div className="mt-4 space-y-2 rounded-xl bg-pale p-4 text-sm">
                <p><b>Summary:</b> {e.ai_analysis.summary}</p><p><b>Root cause:</b> {e.ai_analysis.root_cause}</p>
                <p><b>Delay:</b> {e.ai_analysis.computed?.delay_days} days · <b>Est. cost:</b> ${Number(e.ai_analysis.computed?.estimated_delay_cost_usd ?? 0).toLocaleString()} · <b>Risk:</b> {e.ai_analysis.risk_level}</p>
                <ul className="list-disc pl-5">{e.ai_analysis.recommended_actions?.map((a: any, i: number) => <li key={i}>{a.action} <i>({a.owner}, {a.urgency})</i></li>)}</ul>
                <p><b>Draft customer message:</b> {e.ai_analysis.customer_message}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
