import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, Package, AlertTriangle, Truck, FileText, CreditCard, Settings, Bell } from "lucide-react";
import Logo from "@/components/Logo";
import SignOut from "@/components/SignOut";
import { createClient } from "@/lib/supabase/server";

const ITEMS = [
  ["/app", "Dashboard", LayoutDashboard], ["/app/shipments", "Shipments", Package], ["/app/exceptions", "Exceptions", AlertTriangle],
  ["/app/carriers", "Carriers", Truck], ["/app/documents", "Documents", FileText], ["/app/notifications", "Notifications", Bell],
  ["/app/billing", "Billing", CreditCard], ["/app/settings", "Settings", Settings],
] as const;

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect("/login");
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  const { data: p } = await sb.from("profiles").select("plan, ai_credits, full_name").eq("id", user.id).single();

  return (
    <div className="min-h-screen bg-[#f5f7fa] lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b bg-white p-4 lg:min-h-screen lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between lg:block"><Logo /><div className="lg:hidden"><SignOut /></div></div>
        <nav className="mt-4 flex gap-1 overflow-x-auto lg:mt-8 lg:flex-col">
          {ITEMS.map(([h, l, Icon]) => (
            <Link key={h} href={h} className="flex items-center gap-3 whitespace-nowrap rounded-xl px-3 py-2 text-[15px] hover:bg-pale"><Icon size={18} />{l}</Link>
          ))}
        </nav>
        <div className="mt-8 hidden rounded-2xl bg-pale p-4 text-sm lg:block">
          <div className="font-semibold capitalize">{p?.plan ?? "free"} plan</div>
          <div className="text-[#5b6470]">{p?.ai_credits ?? 0} AI credits left</div>
          <Link href="/app/billing" className="mt-2 inline-block text-brand">Upgrade</Link>
          <div className="mt-4"><SignOut /></div>
        </div>
      </aside>
      <div className="p-5 sm:p-8">{children}</div>
    </div>
  );
}
