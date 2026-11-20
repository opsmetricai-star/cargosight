import Link from "next/link";
import Logo from "./Logo";
import { NAV } from "@/lib/site";

const cols = [
  { t: "Platform", l: [["Transportation Management", "/platform/tms"], ["Visibility", "/platform/visibility"], ["Yard Management", "/platform/yard"], ["eCommerce Logistics", "/platform/ecommerce"], ["AI Orchestration", "/ai-agent-orchestration"]] },
  { t: "Solutions", l: [["Shippers", "/sectors/shippers"], ["Logistics Providers", "/sectors/lsps"], ["Industries", "/industries"], ["Partner Ecosystem", "/partner-ecosystem"], ["Tariff Tracker", "/tariff-tracker"]] },
  { t: "Carriers", l: [["For Carriers", "/carriers"], ["How to Connect", "/carriers/how-to-connect"], ["Preferred Network", "/carriers/preferred-carrier-program"], ["Carrier FAQs", "/carriers/faqs"]] },
  { t: "Resources", l: [["Customer Hub", "/customer-hub"], ["Blog", "/blog"], ["Newsroom", "/newsroom"], ["Events & Webinars", "/events"], ["Glossary", "/resources/glossary"], ["Help Center", "/help-center"]] },
  { t: "Company", l: [["About", "/company"], ["Leadership", "/company/leadership"], ["Careers", "/company/careers"], ["Pricing", "/pricing"], ["Contact", "/contact"]] },
] as const;

export default function SiteFooter() {
  void NAV;
  return (
    <footer className="bg-[#0a0f1a] text-white">
      <div className="container-x py-16 grid gap-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-white/60">Decision intelligence for the global supply chain. One connected picture, agents that act on it.</p>
          <div className="mt-6 flex gap-3"><Link href="/signup" className="btn btn-lg">Sign up</Link><Link href="/login" className="btn btn-lg btn-ghost">Sign in</Link></div>
        </div>
        {cols.map((c) => (
          <div key={c.t}>
            <div className="eyebrow text-white/50">{c.t}</div>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              {c.l.map(([a, h]) => (<li key={h}><Link href={h} className="text-white/85 hover:text-white">{a}</Link></li>))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-wrap items-center justify-between gap-4 text-sm text-white/55">
          <span>© {new Date().getFullYear()} cargosight. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy">Privacy Policy</Link><Link href="/security">Security</Link><Link href="/terms">Terms</Link><Link href="/contact">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
