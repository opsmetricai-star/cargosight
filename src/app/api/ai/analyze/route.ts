import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient, createServiceClient } from "@/lib/supabase/server";

const Input = z.object({ exceptionId: z.string().uuid() });
const Analysis = z.object({
  summary: z.string(),
  root_cause: z.string(),
  risk_level: z.enum(["low", "medium", "high", "critical"]),
  recommended_actions: z.array(z.object({ action: z.string(), owner: z.string(), urgency: z.enum(["now", "today", "this_week"]) })).min(1).max(5),
  customer_message: z.string(),
});

export async function POST(req: Request) {
  const parsed = Input.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "AI is not configured (GEMINI_API_KEY missing)." }, { status: 503 });

  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const { data: profile } = await sb.from("profiles").select("ai_credits").eq("id", user.id).single();
  if (!profile || profile.ai_credits < 1) return NextResponse.json({ error: "No AI credits left. Upgrade your plan on the billing page." }, { status: 402 });

  const { data: ex } = await sb.from("exceptions").select("*, shipments(*)").eq("id", parsed.data.exceptionId).single();
  if (!ex) return NextResponse.json({ error: "Exception not found." }, { status: 404 });

  // Deterministic numbers are computed here, not by the model.
  const s = ex.shipments;
  const delayDays = s?.planned_eta && s?.predicted_eta ? Math.round(((+new Date(s.predicted_eta) - +new Date(s.planned_eta)) / 86400000) * 10) / 10 : 0;
  const exposure = Math.round((s?.cargo_value ?? 0) * Math.min(Math.max(delayDays, 0) * 0.01, 0.25));
  const facts = {
    exception: { type: ex.type, severity: ex.severity, description: ex.description },
    shipment: s && { reference: s.reference, mode: s.mode, origin: s.origin, destination: s.destination, status: s.status },
    computed: { delay_days: delayDays, estimated_delay_cost_usd: exposure },
  };

  const model = process.env.GEMINI_MODEL || "gemini-3.1-flash-lite";
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    signal: AbortSignal.timeout(30000),
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: "You are a logistics exception analyst. Use only the facts provided. Do not invent numbers; quote the computed values as given. Reply in the requested JSON." }] },
      contents: [{ role: "user", parts: [{ text: JSON.stringify(facts) }] }],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
        responseSchema: {
          type: "OBJECT",
          required: ["summary", "root_cause", "risk_level", "recommended_actions", "customer_message"],
          properties: {
            summary: { type: "STRING" },
            root_cause: { type: "STRING" },
            risk_level: { type: "STRING", enum: ["low", "medium", "high", "critical"] },
            recommended_actions: { type: "ARRAY", items: { type: "OBJECT", required: ["action", "owner", "urgency"], properties: { action: { type: "STRING" }, owner: { type: "STRING" }, urgency: { type: "STRING", enum: ["now", "today", "this_week"] } } } },
            customer_message: { type: "STRING" },
          },
        },
      },
    }),
  }).catch(() => null);
  if (!r || !r.ok) return NextResponse.json({ error: "AI provider error. Please retry." }, { status: 502 });
  let analysis;
  try {
    const j = await r.json();
    analysis = Analysis.parse(JSON.parse(j.candidates[0].content.parts[0].text));
  } catch {
    return NextResponse.json({ error: "AI returned an unusable response. No credit was used." }, { status: 502 });
  }

  const result = { ...analysis, computed: facts.computed };
  const admin = createServiceClient();
  await admin.from("exceptions").update({ ai_analysis: result }).eq("id", ex.id).eq("user_id", user.id);
  await admin.from("profiles").update({ ai_credits: profile.ai_credits - 1 }).eq("id", user.id);
  await admin.from("usage_events").insert({ user_id: user.id, kind: "ai_exception_analysis", credits: 1 });
  return NextResponse.json({ analysis: result, creditsLeft: profile.ai_credits - 1 });
}
