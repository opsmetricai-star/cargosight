import { NextResponse } from "next/server";
import { z } from "zod";
import { createServiceClient } from "@/lib/supabase/server";

const Body = z.object({ name: z.string().min(1).max(120), email: z.string().email(), company: z.string().max(160).optional(), message: z.string().max(2000).optional() });

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return NextResponse.json({ error: "Server is not configured yet." }, { status: 503 });
  const { error } = await createServiceClient().from("demo_requests").insert(parsed.data);
  if (error) return NextResponse.json({ error: "Could not save your request." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
