"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient, supabaseConfigured } from "@/lib/supabase/client";
import Logo from "./Logo";

type Mode = "login" | "signup" | "forgot" | "reset";
const TITLES: Record<Mode, string> = { login: "Log in", signup: "Create your account", forgot: "Reset your password", reset: "Choose a new password" };

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const next = useSearchParams().get("next") || "/app";
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(""); setMsg("");
    if (!supabaseConfigured()) { setErr("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."); return; }
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email") || ""), password = String(f.get("password") || "");
    setBusy(true);
    const sb = createClient();
    try {
      if (mode === "login") {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error; router.push(next); router.refresh();
      } else if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password, options: { data: { full_name: f.get("name"), company: f.get("company") }, emailRedirectTo: `${location.origin}/auth/callback` } });
        if (error) throw error;
        if (data.session) { router.push("/app"); router.refresh(); } else setMsg("Check your email to confirm your account.");
      } else if (mode === "forgot") {
        const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: `${location.origin}/auth/callback?next=/reset-password` });
        if (error) throw error; setMsg("If that email exists, a reset link is on its way.");
      } else {
        const { error } = await sb.auth.updateUser({ password });
        if (error) throw error; router.push("/app");
      }
    } catch (x) { setErr(x instanceof Error ? x.message : "Something went wrong"); }
    setBusy(false);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-16">
        <div className="mb-10"><Logo /></div>
        <h1 className="text-[34px] leading-tight">{TITLES[mode]}</h1>
        <form onSubmit={submit} className="mt-8 max-w-md space-y-4">
          {mode === "signup" && (<><input name="name" required placeholder="Full name" className="input" /><input name="company" placeholder="Company" className="input" /></>)}
          {mode !== "reset" && <input name="email" type="email" required placeholder="Work email" className="input" />}
          {mode !== "forgot" && <input name="password" type="password" required minLength={8} placeholder="Password (8+ characters)" className="input" />}
          {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
          {msg && <p className="text-sm text-emerald-700">{msg}</p>}
          <button disabled={busy} className="btn btn-lg w-full disabled:opacity-60">{busy ? "Please wait…" : TITLES[mode]}</button>
        </form>
        <div className="mt-6 space-y-1 text-sm text-[#5b6470]">
          {mode === "login" && (<><p>New here? <Link className="text-brand" href="/signup">Create an account</Link></p><p><Link className="text-brand" href="/forgot-password">Forgot password?</Link></p></>)}
          {mode === "signup" && <p>Already registered? <Link className="text-brand" href="/login">Log in</Link></p>}
          {mode === "forgot" && <p><Link className="text-brand" href="/login">Back to login</Link></p>}
        </div>
      </div>
      <div className="hidden bg-[#050a12] p-16 text-white lg:flex lg:flex-col lg:justify-end" style={{ backgroundImage: "radial-gradient(60% 50% at 70% 20%, #0f4a8a, transparent 70%)" }}>
        <p className="text-[32px] leading-tight">Your supply chain, at work.</p>
        <p className="mt-3 text-white/70">Track shipments, catch exceptions early and let AI draft the response.</p>
      </div>
    </div>
  );
}
