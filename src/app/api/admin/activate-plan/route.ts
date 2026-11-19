import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

// Trusted payment confirmation. A redirect from the payment page never activates a plan.
// Call with `Authorization: Bearer $ADMIN_SECRET` after verifying the payment in Selar.
const Body = z.object({ email: z.string().email(), plan: z.enum(["starter", "pro"]), reference: z.string().min(3) });
const CREDITS = { starter: 100, pro: 500 } as const;

export async function POST(req: Request) {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const p = Body.safeParse(await req.json().catch(() => null));
  if (!p.success) return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  const admin = createServiceClient();
  const { data: prof } = await admin.from("profiles").select("id, ai_credits").eq("email", p.data.email).single();
  if (!prof) return NextResponse.json({ error: "User not found" }, { status: 404 });
  await admin.from("profiles").update({ plan: p.data.plan, ai_credits: prof.ai_credits + CREDITS[p.data.plan] }).eq("id", prof.id);
  await admin.from("subscriptions").insert({ user_id: prof.id, plan: p.data.plan, reference: p.data.reference });
  await admin.from("notifications").insert({ user_id: prof.id, title: "Plan activated", body: `Your ${p.data.plan} plan is now active.` });
  return NextResponse.json({ ok: true });
}
