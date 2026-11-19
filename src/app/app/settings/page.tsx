"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Settings() {
  const sb = createClient();
  const [form, setForm] = useState({ full_name: "", company: "" });
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  useEffect(() => {
    (async () => {
      const { data: { user } } = await sb.auth.getUser(); if (!user) return;
      setEmail(user.email ?? "");
      const { data } = await sb.from("profiles").select("full_name, company").eq("id", user.id).single();
      if (data) setForm({ full_name: data.full_name ?? "", company: data.company ?? "" });
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function save(e: React.FormEvent) {
    e.preventDefault(); setMsg("");
    const { data: { user } } = await sb.auth.getUser();
    const { error } = await sb.from("profiles").update(form).eq("id", user!.id);
    setMsg(error ? error.message : "Saved.");
  }
  return (
    <div className="max-w-lg space-y-6">
      <h1 className="text-[30px]">Settings</h1>
      <form onSubmit={save} className="space-y-4 rounded-2xl bg-white p-6">
        <div><label className="text-sm text-[#5b6470]">Email</label><input className="input" value={email} disabled /></div>
        <div><label className="text-sm text-[#5b6470]">Full name</label><input className="input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
        <div><label className="text-sm text-[#5b6470]">Company</label><input className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
        <button className="btn btn-lg">Save changes</button>{msg && <p className="text-sm">{msg}</p>}
      </form>
    </div>
  );
}
