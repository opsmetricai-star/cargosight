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

      {/* 2. Proven results */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h2 className="h-section">Proven results. Better outcomes.</h2>
            <p className="mt-3 max-w-xl text-[18px] text-[#3a4350]">The world's most complex supply chains run on cargosight. Here is what that looks like in practice.</p></div>
          <Link href="/customer-hub" className="btn btn-lg">See more</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {METRICS.slice(0, 3).map((m) => <MetricCard key={m.v} m={m} />)}
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {METRICS.slice(3).map((m) => <MetricCard key={m.v} m={m} big />)}
        </div>
      </section>

      {/* 3. Customer stories */}
      <section className="bg-[#f5f7fa] py-20">
        <div className="container-x">
          <div className="eyebrow text-brand">Customer stories</div>
          <h2 className="h-section mt-2">Impact across industries</h2>
          <p className="mt-3 text-[18px] text-[#3a4350]">Hear directly from the people behind the world's best supply chains.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STORIES.map((s) => (
              <Link key={s.tag} href="/customer-hub" className={`group flex min-h-[360px] flex-col justify-between rounded-3xl bg-gradient-to-br ${s.g} p-7 text-white transition hover:-translate-y-1`}>
                <span className="eyebrow">{s.tag}</span>
                <div><p className="text-[20px] leading-snug">{s.t}</p>
                  <div className="mt-5 flex gap-3 text-sm font-semibold"><span className="rounded-full bg-white px-4 py-1.5 text-black">Learn more</span><span className="rounded-full border border-white/50 px-4 py-1.5">Watch the video</span></div></div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center"><Link href="/customer-hub" className="btn btn-lg">See all customer testimonials</Link></div>
        </div>
      </section>

      {/* 4. Platform families */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h2 className="h-section">The Decision Intelligence Platform</h2>
            <p className="mt-3 max-w-2xl text-[18px] text-[#3a4350]">Purpose-built product families that improve your supply chain end to end through collaboration and exception management.</p></div>
          <Link href="/platform" className="btn btn-lg">Go to product families</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {FAMILIES.map(([n, t, d, h]) => (
            <Link key={n} href={h} className="group flex min-h-[320px] flex-col justify-between rounded-3xl bg-pale p-7 transition hover:bg-brand hover:text-white">
              <span className="text-[44px] font-light text-brand group-hover:text-white">{n}</span>
              <div><h3 className="text-[22px] font-semibold leading-tight">{t}</h3><p className="mt-3 text-[15px] opacity-80">{d}</p><ArrowRight className="mt-4" /></div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Data context */}
      <section className="bg-[#050a12] py-20 text-white">
        <div className="container-x">
          <h2 className="h-section max-w-2xl">Fueling AI with industry-leading context</h2>
          <p className="mt-4 max-w-2xl text-[18px] text-white/70">Our agents don't operate on guesswork. They run on a large, accurate, real-time logistics data graph. That context is what makes the intelligence real.</p>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map(([v, l]) => (<div key={v} className="border-t border-white/20 pt-5"><div className="text-[48px] font-light leading-none text-[#4da3ff]">{v}</div><div className="mt-2 text-white/75">{l}</div></div>))}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <Testimonials items={QUOTES} />

      {/* 7. Industry leaders */}
      <section className="bg-pale py-20">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><h2 className="h-section">Our customers are industry leaders</h2>
              <p className="mt-3 text-[18px] text-[#3a4350]">Global brands rely on cargosight for actionable insight that cuts delay and lifts supply chain efficiency.</p></div>
            <Link href="/customer-hub" className="btn btn-lg">Learn more</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TILES.map(([a, b]) => (<div key={b} className="rounded-3xl bg-white p-8"><div className="text-[44px] font-light text-brand">{a}</div><div className="mt-1 text-[17px]">{b}</div></div>))}
          </div>
        </div>
      </section>

      {/* 8. Resources */}
      <section className="container-x py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><h2 className="h-section">Resources and insights</h2><p className="mt-3 text-[18px] text-[#3a4350]">The latest supply chain thinking to power your transformation.</p></div>
          <Link href="/resources" className="btn btn-lg">View all resources</Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {RES.map(([t, d, dt]) => (
            <Link key={t} href="/blog" className="group rounded-3xl border border-black/10 p-7 transition hover:shadow-xl">
              <div className="text-sm text-[#5b6470]">{dt}</div>
              <h3 className="mt-3 text-[22px] font-semibold leading-snug">{t}</h3>
              <p className="mt-3 text-[15px] text-[#3a4350]">{d}</p>
              <span className="mt-5 inline-flex items-center gap-1 font-semibold text-brand">Learn more <ArrowRight size={16} /></span>
            </Link>
          ))}
        </div>
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
