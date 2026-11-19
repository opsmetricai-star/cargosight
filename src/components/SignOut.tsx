"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOut() {
  const r = useRouter();
  return (
    <button className="text-sm text-[#5b6470] hover:text-black" onClick={async () => { await createClient().auth.signOut(); r.push("/login"); r.refresh(); }}>
      Log out
    </button>
  );
}
