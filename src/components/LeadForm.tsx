"use client";
import { useState } from "react";

export default function LeadForm({ cta = "Request a demo" }: { cta?: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  const [err, setErr] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("busy"); setErr("");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    const r = await fetch("/api/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (r.ok) setState("done");
    else { setErr((await r.json().catch(() => ({}))).error || "Failed to send."); setState("idle"); }
  }
  if (state === "done") return <p className="rounded-2xl bg-pale p-6 text-lg">Thanks, we received your request and will be in touch shortly.</p>;
  return (
    <form onSubmit={submit} className="space-y-4">
      <input name="name" required placeholder="Full name" className="input" />
      <input name="email" type="email" required placeholder="Work email" className="input" />
      <input name="company" placeholder="Company" className="input" />
      <textarea name="message" rows={4} placeholder="What would you like to see?" className="input" />
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <button disabled={state === "busy"} className="btn btn-lg disabled:opacity-60">{state === "busy" ? "Sending…" : cta}</button>
    </form>
  );
}
