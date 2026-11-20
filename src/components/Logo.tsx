import Link from "next/link";

export function LogoMark({ size = 40, light = false }: { size?: number; light?: boolean }) {
  const navy = light ? "#ffffff" : "#0b1a4a";
  const cut = light ? "#0a0f1a" : "#ffffff";
  return (
    <svg width={size} height={size * 1.04} viewBox="0 0 337 350" fill="none" aria-hidden>
      <path d="M38 150 L160 86 L232 120 L232 238 L150 252 L38 210 Z" fill={navy} />
      {[62, 94, 126].map((x) => (<rect key={x} x={x} y={140 + (x - 62) * -0.28 + 18} width="16" height="66" rx="3" fill={cut} />))}
      <rect x="150" y="116" width="10" height="130" rx="3" fill={cut} opacity="0" />
      <path d="M258 112 C292 112 308 138 300 166 C296 182 276 204 258 226 C240 204 220 182 216 166 C208 138 224 112 258 112 Z" fill="#f47b20" stroke={cut} strokeWidth="8" />
      <circle cx="258" cy="150" r="15" fill={cut} />
      <path d="M78 270 C150 282 250 262 306 196 C282 250 190 300 78 270 Z" fill="#f47b20" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="cargosight home">
      <LogoMark size={46} light={light} />
      <span className="text-[26px] font-bold leading-none tracking-tight">
        <span style={{ color: light ? "#fff" : "#0b1a4a" }}>cargo</span><span style={{ color: "#f47b20" }}>sight</span>
      </span>
    </Link>
  );
}
