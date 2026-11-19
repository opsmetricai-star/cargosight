import { createClient } from "@/lib/supabase/server";
import { PAYMENT_LINKS } from "@/lib/site";

export const dynamic = "force-dynamic";

const LIMITS = { free: { ships: 25, carriers: 3 }, starter: { ships: 500, carriers: 25 }, pro: { ships: Infinity, carriers: Infinity } } as const;

export default async function Billing() {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  const [{ data: p }, { data: subs }, { data: usage }, { count: ships }, { count: carriers }] = await Promise.all([
    sb.from("profiles").select("plan, ai_credits, email").eq("id", user!.id).single(),
    sb.from("subscriptions").select("*").order("activated_at", { ascending: false }),
    sb.from("usage_events").select("*").order("created_at", { ascending: false }).limit(10),
    sb.from("shipments").select("id", { count: "exact", head: true }),
    sb.from("carriers").select("id", { count: "exact", head: true }),
  ]);
  const plan = (p?.plan ?? "free") as keyof typeof LIMITS;
  const lim = LIMITS[plan];
  const fmt = (n: number) => (n === Infinity ? "Unlimited" : n);
  return (
    <div className="space-y-6">
      <h1 className="text-[30px]">Billing & usage</h1>
      <div className="grid gap-4 md:grid-cols-4">
        {[["Plan", plan], ["AI credits left", p?.ai_credits ?? 0], ["Shipments", `${ships ?? 0} / ${fmt(lim.ships)}`], ["Carriers", `${carriers ?? 0} / ${fmt(lim.carriers)}`]].map(([l, v]) => (
          <div key={String(l)} className="rounded-2xl bg-white p-5"><div className="text-sm text-[#5b6470]">{l}</div><div className="mt-1 text-[26px] font-light capitalize">{v}</div></div>))}
      </div>
      <div className="rounded-2xl bg-white p-6">
        <h2 className="font-semibold">Upgrade</h2>
        <p className="mt-1 text-sm text-[#5b6470]">Pay with the same email you registered with ({p?.email}). Your plan is activated once we confirm the payment; returning from checkout does not change it automatically.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a className="btn btn-lg" target="_blank" rel="noopener noreferrer" href={PAYMENT_LINKS.starter}>Starter · $57</a>
          <a className="btn btn-lg" target="_blank" rel="noopener noreferrer" href={PAYMENT_LINKS.pro}>Pro · $97</a>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6"><h2 className="mb-3 font-semibold">Subscription history</h2>{(subs ?? []).length === 0 ? <p className="text-[#5b6470]">None yet.</p> : (subs ?? []).map((s) => <p key={s.id} className="text-sm capitalize">{s.plan} · {new Date(s.activated_at).toLocaleDateString()}</p>)}</div>
        <div className="rounded-2xl bg-white p-6"><h2 className="mb-3 font-semibold">Recent usage</h2>{(usage ?? []).length === 0 ? <p className="text-[#5b6470]">No usage yet.</p> : (usage ?? []).map((u) => <p key={u.id} className="text-sm">{u.kind} · {u.credits} credit · {new Date(u.created_at).toLocaleString()}</p>)}</div>
      </div>
    </div>
  );
}
