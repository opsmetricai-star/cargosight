"use client";
import { useEffect, useState } from "react";

// Quotes below are illustrative sample copy.
export default function Testimonials({ items }: { items: { q: string; n: string; r: string }[] }) {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % items.length), 7000); return () => clearInterval(t); }, [items.length]);
  const c = items[i];
  return (
    <div className="container-x py-20 text-center">
      <blockquote key={i} className="fade-in mx-auto max-w-4xl text-[22px] leading-snug md:text-[28px]">“{c.q}”</blockquote>
      <div className="mt-6 font-semibold">{c.n}</div>
      <div className="text-sm text-[#5b6470]">{c.r}</div>
      <div className="mt-8 flex justify-center gap-2">
        {items.map((_, n) => (<button key={n} aria-label={`Quote ${n + 1}`} onClick={() => setI(n)} className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-brand" : "w-2 bg-black/20"}`} />))}
      </div>
    </div>
  );
}
