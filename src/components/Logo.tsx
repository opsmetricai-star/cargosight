import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  const c = light ? "#fff" : "#0072e9";
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="cargosight home">
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="15" cy="15" r="14" stroke={c} strokeWidth="2.5" />
        <circle cx="15" cy="15" r="5" fill={c} />
        <path d="M15 1v6M15 23v6M1 15h6M23 15h6" stroke={c} strokeWidth="2.5" />
      </svg>
      <span style={{ color: c }} className="text-[26px] font-bold tracking-tight leading-none">cargosight</span>
    </Link>
  );
}
