"use client";
import Link from "next/link";
import { useState } from "react";
import { Globe, Menu, Search, X, ChevronDown } from "lucide-react";
import { NAV } from "@/lib/site";
import Logo from "./Logo";

export default function SiteHeader() {
  const [bar, setBar] = useState(true);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="sticky top-0 z-50">
      {bar && (
        <div className="relative bg-[#0b5fc0] px-10 py-3 text-center text-[15px] text-white">
          Announcing Horizon26, our flagship event. Join us to see supply chain AI in action.{" "}
          <Link href="/events" className="ml-3 font-semibold">Register Now →</Link>
          <button aria-label="Dismiss" onClick={() => setBar(false)} className="absolute right-4 top-1/2 -translate-y-1/2"><X size={20} /></button>
        </div>
      )}
      <header className="bg-white shadow-[0_1px_0_rgba(0,0,0,.06)]" onMouseLeave={() => setOpen(null)}>
        <div className="mx-auto flex h-14 max-w-[1362px] items-center justify-between px-6">
          <Logo />
          <nav className="hidden lg:flex items-center gap-5 xl:gap-9 whitespace-nowrap lg:mx-4">
            {NAV.map((m) => (
              <div key={m.label} onMouseEnter={() => setOpen(m.label)} className="h-14 flex items-center">
                <Link href={m.href} className={`text-[15px] font-medium ${open === m.label ? "text-brand" : ""}`}>{m.label}</Link>
              </div>
            ))}
            <div className="h-14 flex items-center" onMouseEnter={() => setOpen(null)}>
              <Link href="/pricing" className="text-[15px] font-medium">Pricing</Link>
            </div>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/search" aria-label="Search" className="hidden xl:grid h-7 w-10 place-items-center rounded-full bg-[#c9ccd0]"><Search size={15} /></Link>
            <button aria-label="Language" className="hidden xl:grid h-7 w-10 place-items-center rounded-full bg-[#c9ccd0]"><Globe size={15} /></button>
            <Link href="/login" className="hidden sm:block text-[15px] px-2">Sign in</Link>
            <Link href="/signup" className="btn">Sign up</Link>
            <button className="lg:hidden" aria-label="Menu" onClick={() => setMobile(true)}><Menu /></button>
          </div>
        </div>
        {open && (
          <div className="absolute left-0 right-0 hidden lg:block bg-white shadow-xl border-t border-black/5 fade-in">
            <div className="mx-auto grid max-w-[1240px] gap-8 px-6 py-8" style={{ gridTemplateColumns: `repeat(${Math.min(NAV.find((n) => n.label === open)!.groups.length, 5)}, minmax(0,1fr))` }}>
              {NAV.find((n) => n.label === open)!.groups.map((g) => (
                <div key={g.title}>
                  <Link href={g.href ?? "#"} className="eyebrow text-brand">{g.title}</Link>
                  <ul className="mt-3 space-y-3">
                    {g.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={() => setOpen(null)} className="block hover:text-brand">
                          <span className="font-medium text-[15px]">{l.label}</span>
                          {l.desc && <span className="block text-[13px] text-[#5b6470] leading-snug">{l.desc}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
      {mobile && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-white">
          <div className="flex h-14 items-center justify-between px-6 border-b">
            <Logo />
            <button aria-label="Close" onClick={() => setMobile(false)}><X /></button>
          </div>
          <div className="px-6 py-4">
            {NAV.map((m) => (
              <div key={m.label} className="border-b">
                <button className="flex w-full items-center justify-between py-4 text-lg" onClick={() => setExpanded(expanded === m.label ? null : m.label)}>
                  {m.label}<ChevronDown className={expanded === m.label ? "rotate-180" : ""} />
                </button>
                {expanded === m.label && (
                  <div className="pb-4 space-y-4">
                    {m.groups.map((g) => (
                      <div key={g.title}>
                        <div className="eyebrow text-brand mb-2">{g.title}</div>
                        {g.links.map((l) => (
                          <Link key={l.href} href={l.href} onClick={() => setMobile(false)} className="block py-1.5 text-[15px]">{l.label}</Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/pricing" onClick={() => setMobile(false)} className="block border-b py-4 text-lg">Pricing</Link>
            <div className="mt-6 flex gap-3">
              <Link href="/login" onClick={() => setMobile(false)} className="btn btn-lg btn-ghost">Sign in</Link>
              <Link href="/signup" onClick={() => setMobile(false)} className="btn btn-lg">Sign up</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
