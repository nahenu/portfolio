import type { Project } from "@/data/content";

// Poster-style illustrations for each project. Pure SVG so they stay sharp,
// weigh nothing and can be animated from the outside via data-* hooks.

// Trig results differ in the last digit between Node and browsers, which
// breaks hydration — round every computed coordinate.
const rd = (n: number) => Math.round(n * 100) / 100;

const INK = "#0a0a0a";
const PAPER = "#f4f1ec";
const BLUE = "#007ba7";
const PINK = "#ff2d95";
const font = { fontFamily: "var(--font-archivo)", fontWeight: 600 };

function Orbit() {
  const chips = [
    { label: "Rooms", r: 92, a: -40 },
    { label: "Style", r: 140, a: 210 },
    { label: "Budget", r: 140, a: 20 },
    { label: "Timeline", r: 188, a: 140 },
    { label: "Kitchen", r: 188, a: -95 },
  ];
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="400" height="500" fill={PINK} />
      <g transform="translate(200 250)" fill="none" stroke={INK}>
        {[92, 140, 188, 236].map((r, i) => (
          <circle key={r} r={r} strokeOpacity={0.5 - i * 0.08} strokeWidth={1.5} strokeDasharray={i % 2 ? "3 7" : undefined} />
        ))}
        <g data-spin>
          {chips.map((c) => {
            const rad = (c.a * Math.PI) / 180;
            const x = rd(Math.cos(rad) * c.r);
            const y = rd(Math.sin(rad) * c.r);
            const w = c.label.length * 8 + 26;
            return (
              <g key={c.label} transform={`translate(${x} ${y})`}>
                <rect x={-w / 2} y={-15} width={w} height={30} rx={15} fill={INK} stroke="none" />
                <text textAnchor="middle" y={5} fill={PAPER} stroke="none" fontSize="12" style={font}>
                  {c.label}
                </text>
              </g>
            );
          })}
        </g>
        <circle r="50" fill={BLUE} stroke="none" />
        <text textAnchor="middle" y="-2" fill={PAPER} stroke="none" fontSize="12" style={font}>
          YOUR
        </text>
        <text textAnchor="middle" y="14" fill={PAPER} stroke="none" fontSize="12" style={font}>
          SUMMARY
        </text>
      </g>
    </svg>
  );
}

function Plan() {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="size-full">
      <defs>
        <pattern id="vastu-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke={PAPER} strokeOpacity="0.14" />
        </pattern>
        <linearGradient id="scan" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={PINK} stopOpacity="0" />
          <stop offset="1" stopColor={PINK} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill={BLUE} />
      <rect width="400" height="500" fill="url(#vastu-grid)" />
      <g fill="none" stroke={PAPER} strokeWidth="3">
        <path d="M70 110H330V390H70Z" />
        <path d="M70 230H190V390M190 110V180M190 205V230M250 230H330M250 230V300M250 330V390M130 230V270" />
      </g>
      <g fill={PAPER} fontSize="10" style={font}>
        <text x="84" y="132">LIVING</text>
        <text x="204" y="132">KITCHEN</text>
        <text x="84" y="252">BED 1</text>
        <text x="264" y="252">BED 2</text>
        <text x="204" y="252">HALL</text>
        <text x="264" y="352">POOJA</text>
      </g>
      <g transform="translate(200 250)" stroke={PAPER} strokeOpacity="0.45" strokeDasharray="3 5">
        {[0, 45, 90, 135].map((r) => (
          <line key={r} x1="-210" x2="210" transform={`rotate(${r})`} />
        ))}
      </g>
      <g transform="translate(335 445)" fill={PAPER} fontSize="11" textAnchor="middle" style={font}>
        <circle r="24" fill={INK} />
        <path d="M0 -17L5 0H-5Z" fill={PINK} />
        <text y="-30">N</text>
      </g>
      <rect data-scan x="0" y="-80" width="400" height="80" fill="url(#scan)" />
      <line data-scan x1="0" x2="400" y1="0" y2="0" stroke={PINK} strokeWidth="2.5" />
    </svg>
  );
}

function Gauge() {
  // Semicircle from 180° to 360°; score maps 0..100 across it.
  const R = 130;
  const arc = (from: number, to: number) => {
    const a = (v: number) => Math.PI + (v / 100) * Math.PI;
    const p = (v: number) => `${rd(200 + R * Math.cos(a(v)))} ${rd(270 + R * Math.sin(a(v)))}`;
    return `M${p(from)} A${R} ${R} 0 0 1 ${p(to)}`;
  };
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="400" height="500" fill="#151515" />
      {Array.from({ length: 21 }, (_, i) => {
        const a = Math.PI + (i / 20) * Math.PI;
        const r1 = R + 18;
        const r2 = R + (i % 5 === 0 ? 30 : 24);
        return (
          <line
            key={i}
            x1={rd(200 + r1 * Math.cos(a))}
            y1={rd(270 + r1 * Math.sin(a))}
            x2={rd(200 + r2 * Math.cos(a))}
            y2={rd(270 + r2 * Math.sin(a))}
            stroke={PAPER}
            strokeOpacity={i % 5 === 0 ? 0.7 : 0.3}
          />
        );
      })}
      <path d={arc(0, 100)} fill="none" stroke={PAPER} strokeOpacity="0.1" strokeWidth="18" />
      <path d={arc(0, 50)} fill="none" stroke={BLUE} strokeWidth="18" />
      <path data-gauge d={arc(0, 82)} fill="none" stroke={PINK} strokeWidth="18" pathLength="1" strokeDasharray="1 1" />
      <text x="200" y="262" textAnchor="middle" fill={PAPER} fontSize="96" style={{ ...font, fontWeight: 800, fontVariationSettings: '"wdth" 72' }}>
        80+
      </text>
      <text x="200" y="300" textAnchor="middle" fill={PAPER} fillOpacity="0.6" fontSize="12" style={font}>
        PERFORMANCE · WAS 50
      </text>
      <g fontSize="11" fill={PAPER} fillOpacity="0.6" style={font}>
        {["WebP", "Lazy load", "Code split", "Defer 3P", "CLS"].map((t, i) => (
          <text key={t} x={200 + (i - 2) * 66} y="420" textAnchor="middle">
            {t}
          </text>
        ))}
      </g>
      <line x1="40" x2="360" y1="400" y2="400" stroke={PAPER} strokeOpacity="0.15" />
    </svg>
  );
}

function Tiles() {
  const cols = 6;
  const rows = 8;
  const size = 400 / cols;
  const colour = (i: number) => (i % 7 === 3 ? BLUE : i % 11 === 5 ? PINK : "#e4ded3");
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" className="size-full">
      <rect width="400" height="500" fill={PAPER} />
      {Array.from({ length: cols * rows }, (_, i) => {
        const x = (i % cols) * size;
        const y = Math.floor(i / cols) * (500 / rows);
        return (
          <rect
            key={i}
            data-tile
            x={rd(x + 4)}
            y={rd(y + 4)}
            width={rd(size - 8)}
            height={rd(500 / rows - 8)}
            rx="6"
            fill={colour(i)}
          />
        );
      })}
      <g transform="translate(200 250) rotate(-8)">
        <rect x="-130" y="-50" width="260" height="100" rx="50" fill={INK} />
        <text textAnchor="middle" y="16" fill={PAPER} fontSize="48" style={{ ...font, fontWeight: 800, fontVariationSettings: '"wdth" 72' }}>
          ₹1 CR+ / QTR
        </text>
      </g>
      <g transform="translate(200 370)">
        <rect x="-80" y="-19" width="160" height="38" rx="19" fill={PINK} />
        <circle cx="-56" r="8" fill={INK} />
        <text x="-40" y="5" fill={INK} fontSize="13" style={font}>
          PAYMENT OK
        </text>
      </g>
    </svg>
  );
}

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  switch (visual) {
    case "orbit":
      return <Orbit />;
    case "plan":
      return <Plan />;
    case "gauge":
      return <Gauge />;
    case "tiles":
      return <Tiles />;
  }
}
