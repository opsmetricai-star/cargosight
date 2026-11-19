"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type D = { id: string; name: string; path: string; size: number | null; created_at: string };
const MAX = 10 * 1024 * 1024;

export default function DocumentsClient({ rows, userId }: { rows: D[]; userId: string }) {
  const r = useRouter(); const sb = createClient(); const [err, setErr] = useState(""); const [busy, setBusy] = useState(false);

  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return; setErr("");
    if (file.size > MAX) { setErr("File is larger than 10 MB."); return; }
    setBusy(true);
    const path = `${userId}/${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
    const up = await sb.storage.from("documents").upload(path, file);
    if (up.error) { setErr(up.error.message); setBusy(false); return; }
    const { error } = await sb.from("documents").insert({ user_id: userId, name: file.name, path, size: file.size });
    setBusy(false); if (error) setErr(error.message); else r.refresh();
    e.target.value = "";
  }
  async function open(d: D) { const { data } = await sb.storage.from("documents").createSignedUrl(d.path, 60); if (data) window.open(data.signedUrl, "_blank"); }
  async function del(d: D) { if (!confirm("Delete document?")) return; await sb.storage.from("documents").remove([d.path]); await sb.from("documents").delete().eq("id", d.id); r.refresh(); }

  return (
    <div className="space-y-6">
      <h1 className="text-[30px]">Documents</h1>
      <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-[#b9c7dc] bg-white p-8 text-center">
        <input type="file" className="hidden" onChange={upload} disabled={busy} />{busy ? "Uploading…" : "Click to upload a document (max 10 MB)"}
      </label>
      {err && <p role="alert" className="text-sm text-red-600">{err}</p>}
      <ul className="divide-y rounded-2xl bg-white">
        {rows.length === 0 && <li className="p-5 text-[#5b6470]">No documents yet.</li>}
        {rows.map((d) => (
          <li key={d.id} className="flex items-center justify-between p-4">
            <button onClick={() => open(d)} className="text-left text-brand">{d.name}</button>
            <span className="flex items-center gap-4 text-sm text-[#5b6470]">{d.size ? `${Math.ceil(d.size / 1024)} KB` : ""}<button onClick={() => del(d)} className="text-red-600">Delete</button></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
