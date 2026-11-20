import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroTabs from "@/components/home/HeroTabs";
import Testimonials from "@/components/home/Testimonials";

const METRICS = [
  { t: "Decrease costs", v: "$16M", d: "in avoided cost during a major bridge collapse", s: "$29B automotive manufacturer rerouting shipments in real time", img: "from-slate-300 to-slate-100" },
  { t: "Improve working capital", v: "$12M", d: "annual savings from lower safety stock", s: "$300B+ automotive group improving inventory decisions", img: "from-blue-200 to-slate-100" },
  { t: "Decrease costs", v: "99%", d: "reduction in detention & demurrage fees", s: "Global spirits company ($5.6B) stopping delays before fees accrue", img: "from-amber-100 to-slate-100" },
  { t: "Increase efficiency", v: "86%", d: "reduction in gate wait time", s: "Canadian auto-parts retailer ($16B) streamlining yard operations", img: "from-sky-200 to-slate-100" },
  { t: "Elevate customer experience", v: "72%", d: "faster response to supply chain exceptions", s: "Global home-improvement retailer ($150B+) automating issue resolution", img: "from-indigo-100 to-slate-100" },
];
const STORIES = [
  { tag: "AGRICULTURE", t: "How a Chilean protein exporter reached a 95% success rate tracking ocean exports", g: "from-emerald-700 to-emerald-900" },
  { tag: "RETAIL", t: "“We live in the never-normal supply chain. Better tools give us predictability.”", g: "from-slate-700 to-slate-900" },
  { tag: "MANUFACTURING", t: "“Connecting ocean visibility to our ERP gave sales, ops and service one live ETA.”", g: "from-blue-700 to-blue-900" },
];
const FAMILIES = [
  ["01", "Intelligent Transportation Management", "Multimodal rating, booking and planning, enhanced with live market intelligence and autonomous rate negotiation.", "/platform/tms"],
  ["02", "Intelligent Shipment & Inventory Visibility", "Optimizes shipments and orders on every mode and node, with AI agents that resolve disruptions and exceptions.", "/platform/visibility"],
  ["03", "Intelligent Yard Management", "Orchestrates yard scheduling, prioritization and movements from real-time conditions and automated processes.", "/platform/yard"],
  ["04", "Intelligent eCommerce Logistics", "Improve last-mile delivery with predictive alerts, streamlined resolution and proactive customer communication.", "/platform/ecommerce"],
];
const STATS = [["3.7T", "validated data points annually"], ["700M+", "logistics events processed daily"], ["8B", "external risk signals captured daily"], ["1.5B+", "shipments across the network annually"], ["282K", "carriers connected globally"], ["1M+", "connected logistics facilities: ports, warehouses, yards, rail"], ["125K", "carriers instantly live on the network"]];
const QUOTES = [
  { q: "Tariff volatility makes it harder for companies to plan with confidence. Clear visibility into cost impact and supplier options is critical to staying competitive.", n: "Global Head of Logistics", r: "$25B multinational consumer company" },
  { q: "The platform helped us build a more connected and visible supply chain. With intelligent TMS we can connect planning, execution and analytics across the whole network.", n: "EVP & Chief Supply Chain Officer", r: "Specialty apparel retailer" },
  { q: "Trusted data and real-time insight let us evaluate carriers during RFPs and manage performance every day. That clarity helps us build stronger partnerships.", n: "Director of Logistics", r: "Global manufacturer" },
  { q: "A perfectly coordinated global supply chain is essential for us, and real-time transport visibility makes it more resilient and our decisions faster.", n: "Head of Global Logistics", r: "European confectionery group" },
  { q: "Real-time visibility expands our capabilities and helps us anticipate what to do next, every single day.", n: "VP, Supply Chain", r: "$25B power-management company" },
  { q: "The assistant simplifies how we use our data. Quick, smart decisions across global routes, straight from the answers.", n: "Global Transportation Excellence Manager", r: "Industrial group" },
];
const TILES = [["7 of top 10", "Global CPG Companies"], ["3 of top 6", "Global Retailers"], ["7 of top 10", "Global Automotive Manufacturers"], ["6 of top 10", "Global Industrial Manufacturers"], ["4 of top 5", "Global Spirit Brands"], ["5 of top 10", "Global Fortune 500 Companies"]];
const RES = [
  ["Survey: 54% of shoppers would pay more to guarantee on-time holiday delivery", "On-time arrival is the number-one priority when shoppers choose where to buy online, and nearly half say they will not return after a late delivery.", "November 19, 2026"],
  ["cargosight recognized by four market insight firms in three months", "Our intelligent TMS appeared in four independent 2026 assessments of the transportation management marketplace.", "November 12, 2026"],
  ["Why usability belongs in every TMS evaluation", "A top-two usability ranking in a leading value matrix shows why ease of use belongs in your scorecard.", "November 11, 2026"],
];

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative flex min-h-[700px] flex-col items-center overflow-hidden bg-[#050a12] px-6 pt-28 text-center text-white">
        <div className="absolute inset-0 opacity-70" style={{ background: "radial-gradient(60% 50% at 20% 30%, #1f4d57 0, transparent 70%), radial-gradient(50% 50% at 85% 25%, #1b3b4a 0, transparent 70%), radial-gradient(40% 40% at 55% 45%, #28606c 0, transparent 70%)" }} />
        <svg className="absolute inset-x-0 top-10 mx-auto h-[300px] w-full max-w-5xl opacity-40" viewBox="0 0 900 300" aria-hidden>
          {[40, 170, 300, 430, 560, 690, 820].map((x, n) => (<g key={x} opacity={0.4 + (n % 3) * 0.2}><rect x={x} y="120" width="70" height="170" rx="14" fill="#2f6f7a" /><rect x={x + 8} y="96" width="54" height="30" rx="6" fill="#1b3f48" /></g>))}
        </svg>
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent to-black" />
        <div className="relative z-10 w-full">
          <h1 className="text-[44px] leading-[1.1] md:text-[72px]">Your Supply Chain at Work</h1>
          <p className="mx-auto mt-24 max-w-3xl text-[20px] font-semibold md:text-[24px]">Decision intelligence that orchestrates AI agents to detect, decide and act in real time.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/get-a-demo" className="btn btn-lg">Get a demo</Link>
            <Link href="/signup" className="btn btn-lg btn-ghost">Start free</Link>
          </div>
          <HeroTabs />
        </div>
      </section>

      {/* 1b. Logo strip */}
      <section className="border-b border-black/5 bg-white py-8">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[22px] font-bold tracking-tight text-[#6b7480] opacity-80">
          {["NORDAXLE", "Halcyon Foods", "TRANSVECTA", "Brightmill", "Kestrel Auto", "Orbis Retail", "SOLENNE", "Vantage Steel"].map((n) => (<span key={n}>{n}</span>))}
        </div>
      </section>

      {/* 2. Proven results */}
      <section className="container-x py-20">
        <h2 className="h-section">Proven results. <span className="text-brand">Better outcomes.</span></h2>
        <p className="mt-3 max-w-xl text-[18px] text-[#3a4350]">The world's most complex supply chains run on cargosight. Here is what that looks like in practice.</p>
        <Link href="/customer-hub" className="btn mt-4">See more</Link>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {METRICS.slice(0, 3).map((m) => <MetricCard key={m.v} m={m} />)}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {METRICS.slice(3).map((m) => <MetricCard key={m.v} m={m} big />)}
        </div>
      </section>

      {/* 3. Customer stories */}
      <section className="container-x pb-20">
        <h2 className="h-section">Impact across <span className="text-brand">Industries</span></h2>
        <p className="mt-3 text-[18px] text-[#3a4350]">Hear directly from the people behind the world's best supply chains.</p>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STORIES.map((s) => (
            <Link key={s.tag} href="/customer-hub" className="group flex min-h-[420px] flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition hover:shadow-xl">
              <div className={`grid h-44 place-items-center rounded-2xl bg-gradient-to-br ${s.g}`}>
                <span className="grid h-14 w-20 place-items-center rounded-xl bg-brand text-white shadow-lg transition group-hover:scale-110"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z" /></svg></span>
              </div>
              <span className="eyebrow mt-6 text-[#5b6470]">{s.tag}</span>
              <p className="mt-3 flex-1 text-[17px] leading-snug">{s.t}</p>
              <div className="mt-5 flex gap-3 text-sm font-semibold"><span className="btn">Learn more</span><span className="btn btn-ghost !text-black">Watch the video</span></div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center"><Link href="/customer-hub" className="btn btn-lg">See all customer testimonials</Link></div>
      </section>

      {/* 4. Platform families */}
      <section className="container-x pb-20">
        <h2 className="h-section text-brand">The Decision Intelligence Platform</h2>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <p className="max-w-xl text-[18px] text-[#3a4350]">Purpose-built product families designed to improve your supply chain operations end to end through collaboration and exception management.</p>
          <Link href="/platform" className="btn">Go to product families</Link>
        </div>
        <div className="mt-8 grid gap-6 rounded-[32px] bg-[#0b5fc0] p-6 text-white md:grid-cols-2 md:p-10 lg:grid-cols-4">
          {FAMILIES.map(([n, t, d, h]) => (
            <Link key={n} href={h} className="group flex min-h-[340px] flex-col justify-between rounded-3xl bg-white/10 p-7 transition hover:bg-white hover:text-[#0b5fc0]">
              <span className="text-[44px] font-light">{n}</span>
              <div><h3 className="text-[22px] font-semibold leading-tight">{t}</h3><p className="mt-3 text-[15px] opacity-85">{d}</p><ArrowRight className="mt-4" /></div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Data context */}
      <section className="relative overflow-hidden bg-black py-24 text-white">
        <div className="absolute -left-40 top-1/3 h-96 w-[70%] rotate-[-8deg] blur-3xl" style={{ background: "radial-gradient(ellipse, #0a6bff 0, transparent 70%)", opacity: 0.55 }} />
        <div className="container-x relative">
          <h2 className="h-section max-w-xl">Fueling AI with <span className="text-brand">industry leading</span> context</h2>
          <p className="mt-4 max-w-xl text-[17px] text-white/75">Our agents don't operate on guesswork. They run on a large, accurate, real-time logistics data graph. That context is what makes the intelligence real.</p>
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(([v, l]) => { const m = v.match(/^([\d.]+)(.*)$/)!; return (
              <div key={v} className="rounded-2xl border border-white/20 bg-black/40 p-5 backdrop-blur"><div className="text-[44px] leading-none">{m[1]}<span className="text-brand">{m[2]}</span></div><div className="mt-3 text-white/80">{l}</div></div>
            ); })}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <Testimonials items={QUOTES} />

      {/* 7. Industry leaders */}
      <section className="bg-black py-20 text-white">
        <div className="container-x">
          <h2 className="h-section">Our customers are <span className="text-brand">industry leaders</span></h2>
          <p className="mt-3 max-w-xl text-[18px] text-white/75">Global brands rely on cargosight for actionable insight that cuts delay and lifts supply chain efficiency.</p>
          <Link href="/customer-hub" className="btn mt-4">Learn more</Link>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {TILES.map(([a, b], i) => (<div key={b} className="min-h-[170px] rounded-3xl p-8" style={{ background: `linear-gradient(135deg, ${["#10233d", "#1b1b22", "#2a1d12", "#101f2e", "#22150d", "#0f1c2a"][i]}, #050505)` }}><div className="text-[34px]">{a}</div><div className="mt-2 text-[16px] text-white/80">{b}</div></div>))}
          </div>
        </div>
      </section>

      {/* 8. Resources */}
      <section className="container-x py-20 text-center">
        <h2 className="h-section">Resources and insights</h2>
        <p className="mt-3 text-[18px] text-[#3a4350]">Get the latest and greatest supply chain insights to power your supply chain transformation.</p>
        <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
          {RES.map(([t, d, dt], i) => (
            <Link key={t} href="/blog" className="group overflow-hidden rounded-3xl border border-black/10 transition hover:shadow-xl">
              <div className="relative h-44" style={{ background: ["linear-gradient(135deg,#c99a5b,#7a4b2a)", "linear-gradient(135deg,#0a4ea8,#0b2a5c)", "linear-gradient(135deg,#1c2735,#0b6bff)"][i] }}>
                <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-black"><ArrowRight size={16} className="-rotate-45" /></span>
              </div>
              <div className="p-6"><div className="text-sm text-[#5b6470]">{dt}</div><h3 className="mt-2 text-[20px] font-semibold leading-snug">{t}</h3><p className="mt-3 text-[15px] text-[#3a4350]">{d}</p></div>
            </Link>
          ))}
        </div>
        <Link href="/resources" className="btn btn-lg mt-8">View all resources</Link>
      </section>

      {/* 9. CTA */}
      <section className="bg-gradient-to-br from-[#0b5fc0] to-[#0072e9] py-20 text-center text-white">
        <div className="container-x">
          <h2 className="h-section mx-auto max-w-3xl">Your supply chain deserves better than the status quo</h2>
          <p className="mx-auto mt-4 max-w-2xl text-[18px] text-white/85">Join 1,000+ enterprise brands moving faster, resolving exceptions automatically and deciding with confidence.</p>
          <div className="mt-8 flex justify-center gap-3"><Link href="/signup" className="btn btn-lg btn-white">Get started</Link><Link href="/contact" className="btn btn-lg btn-ghost">Contact us</Link></div>
        </div>
      </section>
    </>
  );
}

function MetricCard({ m, big }: { m: (typeof METRICS)[number]; big?: boolean }) {
  return (
    <div className={`card-glass bg-gradient-to-br ${m.img} flex flex-col justify-between p-8 ${big ? "min-h-[320px]" : "min-h-[360px]"}`}>
      <div className="text-[15px]">{m.t}</div>
      <div><div className="text-[72px] leading-none font-light">{m.v}</div><div className="mt-3 text-[19px]">{m.d}</div><div className="mt-2 text-[15px] italic text-[#3a4350]">{m.s}</div></div>
    </div>
  );
}
