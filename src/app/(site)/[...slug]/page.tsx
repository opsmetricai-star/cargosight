import Link from "next/link";
import { notFound } from "next/navigation";
import { PAGES, allSlugs } from "@/lib/pages";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return allSlugs().map((s) => ({ slug: s.split("/") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const p = PAGES[slug.join("/")];
  return p ? { title: `${p.title} | cargosight`, description: p.lead } : {};
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const p = PAGES[slug.join("/")];
  if (!p) notFound();
  return (
    <>
      <section className="relative overflow-hidden bg-[#050a12] py-24 text-white">
        <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(50% 60% at 80% 20%, #0f4a8a 0, transparent 70%), radial-gradient(40% 50% at 10% 90%, #1f4d57 0, transparent 70%)" }} />
        <div className="container-x relative">
          <div className="eyebrow text-[#6cb4ff]">{p.eyebrow}</div>
          <h1 className="h-display mt-3 max-w-4xl">{p.title}</h1>
          <p className="mt-6 max-w-2xl text-[19px] text-white/80">{p.lead}</p>
          <div className="mt-8 flex gap-3"><Link href="/signup" className="btn btn-lg">Sign up</Link><Link href="/login" className="btn btn-lg btn-ghost">Sign in</Link></div>
        </div>
      </section>

      <section className="container-x py-20">
        <h2 className="h-section max-w-2xl">What you can do</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map(([t, d], i) => (
            <div key={t} className="rounded-3xl bg-pale p-7 min-h-[200px]">
              <div className="text-[40px] font-light text-brand">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 text-[20px] font-semibold">{t}</h3>
              <p className="mt-2 text-[15px] text-[#3a4350]">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {p.stats && (
        <section className="bg-[#050a12] py-16 text-white"><div className="container-x grid gap-8 sm:grid-cols-3">
          {p.stats.map(([v, l]) => (<div key={l} className="border-t border-white/20 pt-5"><div className="text-[52px] font-light text-[#4da3ff]">{v}</div><div className="text-white/75">{l}</div></div>))}
        </div></section>
      )}

      {p.steps && (
        <section className="container-x py-20">
          <h2 className="h-section">How it works</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-4">
            {p.steps.map(([t, d], i) => (<li key={t} className="rounded-3xl border border-black/10 p-6"><div className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white font-semibold">{i + 1}</div><h3 className="mt-4 font-semibold text-lg">{t}</h3><p className="text-[15px] text-[#3a4350]">{d}</p></li>))}
          </ol>
        </section>
      )}

      {p.faq && (
        <section className="container-x pb-20 max-w-3xl">
          <h2 className="h-section">Frequently asked</h2>
          {p.faq.map(([q, a]) => (<details key={q} className="border-b py-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 text-[#3a4350]">{a}</p></details>))}
        </section>
      )}

      <section className="bg-gradient-to-br from-[#0b5fc0] to-[#0072e9] py-16 text-center text-white">
        <div className="container-x">
          <h2 className="h-section">Start tracking your own shipments</h2>
          <Link href="/signup" className="btn btn-lg btn-white mt-6">Sign up free <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
