"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TABS = [
  { k: "Freight Procurement", rows: [["Lane", "Shanghai → Rotterdam"], ["Market rate", "$2,140 / FEU"], ["Agent", "Negotiating with 4 carriers"]], status: "Rates compared" },
  { k: "Network Operations", rows: [["Active shipments", "12,480"], ["At risk", "37"], ["Agent", "Rerouting 6 loads"]], status: "Monitoring network" },
  { k: "Slot Booking", rows: [["Facility", "Chicago DC 04"], ["Open docks", "9 of 24"], ["Agent", "Rescheduling 3 arrivals"]], status: "Booking slots" },
  { k: "Exception Management", rows: [["Exception", "Port congestion – Savannah"], ["Impact", "14 containers, +2.1 days"], ["Agent", "Drafting customer notices"]], status: "Resolving" },
  { k: "Disruption Management", rows: [["Event", "Typhoon – South China Sea"], ["Exposure", "$4.2M in transit"], ["Agent", "Evaluating alternates"]], status: "Reviewing AI steps" },
];

export default function HeroTabs() {
  const [i, setI] = useState(2);
  const t = TABS[i];
  return (
    <div className="mx-auto mt-14 w-full max-w-[870px] rounded-t-3xl border border-white/15 bg-[#0c0f14]/90 text-white backdrop-blur">
      <div className="flex items-center gap-2 overflow-x-auto px-3 py-3">
        {TABS.map((x, n) => (
          <button key={x.k} onClick={() => setI(n)} className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[12px] font-medium transition ${n === i ? "bg-white text-black" : "bg-white/15 hover:bg-white/25"}`}>{x.k}</button>
        ))}
        <div className="ml-auto flex items-center gap-2 pl-2">
          <button aria-label="Previous" onClick={() => setI((i + TABS.length - 1) % TABS.length)} className="grid h-6 w-6 place-items-center rounded-full border border-white/30"><ChevronLeft size={14} /></button>
          <button aria-label="Next" onClick={() => setI((i + 1) % TABS.length)} className="grid h-6 w-6 place-items-center rounded-full border border-white/30"><ChevronRight size={14} /></button>
          <Link href="/ai-agent-orchestration" className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-black">See all</Link>
        </div>
      </div>
      <div className="relative grid gap-6 overflow-hidden border-t border-white/10 p-6 md:grid-cols-2">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(#6b7a8f 1.2px, transparent 1.4px)", backgroundSize: "14px 14px", maskImage: "radial-gradient(70% 80% at 30% 40%, #000, transparent)" }} />
        <div className="relative rounded-2xl border border-white/15 bg-black/40 p-4 backdrop-blur">
          <div className="text-sm font-medium">Route Details</div>
          <div className="mt-3 grid gap-2">
            {t.rows.map(([a, b]) => (
              <div key={a} className="flex items-center justify-between rounded-lg bg-brand px-3 py-2 text-xs"><span className="text-white/75">{a}</span><span className="font-semibold">{b}</span></div>
            ))}
          </div>
        </div>
        <div className="relative rounded-2xl bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />Agent monitoring</div>
          <div className="mt-2 text-lg">{t.status}</div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div key={i} className="h-full w-2/3 rounded-full bg-brand" style={{ animation: "fade .8s ease both" }} /></div>
        </div>
      </div>
    </div>
  );
}
