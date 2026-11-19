import Link from "next/link";
import { Check } from "lucide-react";
import { PAYMENT_LINKS } from "@/lib/site";

export const metadata = { title: "Pricing | cargosight" };

const PLANS = [
  { name: "Free", price: "$0", note: "Explore the platform", features: ["Up to 25 shipments", "3 carriers", "5 AI analysis credits", "Email support"], href: "/signup", cta: "Start free" },
  { name: "Starter", price: "$57", note: "per month", features: ["Up to 500 shipments", "25 carriers", "100 AI analysis credits", "Document storage", "Priority email support"], href: PAYMENT_LINKS.starter, cta: "Upgrade to Starter", ext: true },
  { name: "Pro", price: "$97", note: "per month", features: ["Unlimited shipments", "Unlimited carriers", "500 AI analysis credits", "Advanced analytics", "Dedicated onboarding"], href: PAYMENT_LINKS.pro, cta: "Upgrade to Pro", ext: true, hot: true },
];

export default function Pricing() {
  return (
    <>
      <section className="bg-[#050a12] py-20 text-center text-white">
        <div className="container-x"><div className="eyebrow text-[#6cb4ff]">Pricing</div><h1 className="h-display mt-2">Simple plans that scale with your network</h1>
          <p className="mx-auto mt-4 max-w-2xl text-[18px] text-white/75">Start free. Upgrade when your volume grows. Paid plans are activated after payment is confirmed.</p></div>
      </section>
      <section className="container-x grid gap-6 py-20 md:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.name} className={`flex flex-col rounded-3xl p-8 ${p.hot ? "bg-brand text-white" : "bg-pale"}`}>
            <h2 className="text-[22px] font-semibold">{p.name}</h2>
            <div className="mt-4 text-[56px] font-light leading-none">{p.price}</div>
            <div className={p.hot ? "text-white/80" : "text-[#5b6470]"}>{p.note}</div>
            <ul className="my-8 flex-1 space-y-3">{p.features.map((f) => (<li key={f} className="flex gap-2"><Check size={18} className="mt-1 shrink-0" />{f}</li>))}</ul>
            {p.ext
              ? <a href={p.href} target="_blank" rel="noopener noreferrer" className={`btn btn-lg ${p.hot ? "btn-white" : ""}`}>{p.cta}</a>
              : <Link href={p.href} className="btn btn-lg">{p.cta}</Link>}
          </div>
        ))}
      </section>
      <section className="container-x max-w-3xl pb-20">
        <h2 className="h-section">Billing questions</h2>
        {[["When does my plan activate?", "After your payment is confirmed on our side, usually within one business day. Returning from the checkout page alone does not change your plan."], ["Which email should I use at checkout?", "The same email you registered with, so we can match your payment to your account."], ["Can I cancel?", "Yes. Your plan stays active until the end of the paid period."]].map(([q, a]) => (
          <details key={q} className="border-b py-4"><summary className="cursor-pointer font-semibold">{q}</summary><p className="mt-2 text-[#3a4350]">{a}</p></details>
        ))}
      </section>
    </>
  );
}
