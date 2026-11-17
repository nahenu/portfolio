"use client";

import { useRef } from "react";
import { SectionHead } from "@/components/section-head";
import { gsap, useGSAP } from "@/lib/gsap";
import { sideProjects, type SideProject } from "@/data/content";

// VitalsWatch's demo: a Lighthouse score line that dips on one deploy, with
// the real-user vitals underneath. Illustrative numbers, not live data.
const SCORES = [91, 92, 90, 93, 92, 94, 93, 71, 74, 88, 91, 92, 93, 94];
const DIP = 7;

function VitalsDemo() {
  const x = (i: number) => 10 + (i * 280) / (SCORES.length - 1);
  const y = (s: number) => 100 - ((s - 60) / 40) * 90;
  const d = SCORES.map((s, i) => `${i ? "L" : "M"}${x(i)} ${y(s)}`).join(" ");
  return (
    <div className="flex h-full flex-col justify-between gap-2 bg-blue p-5 text-fg">
      <div className="eyebrow flex items-center justify-between font-semibold">
        <span>Lighthouse · last 14 deploys</span>
        <span className="rounded-full bg-pink px-2 py-0.5 text-[0.7rem] text-bg">1 alert</span>
      </div>
      <svg viewBox="0 0 300 110" className="min-h-0 w-full flex-1" preserveAspectRatio="none" aria-hidden>
        {[10, 55, 100].map((gy) => (
          <line key={gy} x1="0" x2="300" y1={gy} y2={gy} stroke="currentColor" strokeOpacity="0.15" />
        ))}
        <path data-vw-line d={d} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" />
        <circle cx={x(DIP)} cy={y(SCORES[DIP])} r="6" fill="#ff2d95" />
      </svg>
      <div className="flex items-center justify-between gap-2">
        <span className="eyebrow rounded-full bg-bg px-2.5 py-1 text-[0.7rem] font-semibold text-fg">deploy #41 → score 93 → 71</span>
        <span className="eyebrow text-[0.7rem] font-semibold opacity-80">LCP · INP · CLS</span>
      </div>
    </div>
  );
}

// FormFlow's demo: a branching three-step form and its per-step drop-off.
// Illustrative numbers, not live data.
const FUNNEL = [
  { step: "Contact", pct: 100 },
  { step: "Budget", pct: 74 },
  { step: "Book", pct: 58 },
];

function FormDemo() {
  return (
    <div className="flex h-full flex-col justify-between gap-3 bg-pink p-5 text-bg">
      <div className="eyebrow flex flex-wrap items-center gap-1.5 font-semibold">
        {FUNNEL.map((f, i) => (
          <span key={f.step} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>→</span>}
            <span className="rounded-lg bg-bg px-2.5 py-1 text-fg">
              {i + 1} · {f.step}
            </span>
          </span>
        ))}
      </div>
      <p className="eyebrow text-[0.75rem] font-semibold opacity-80">↳ budget below ₹5L? branch to “Callback”</p>
      <div className="space-y-1.5">
        {FUNNEL.map((f) => (
          <div key={f.step} className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-2 text-[0.75rem] font-semibold">
            <span>{f.step}</span>
            <span className="h-2.5 rounded-full bg-bg/15">
              <span data-ff-bar className="block h-full origin-left rounded-full bg-bg" style={{ width: `${f.pct}%` }} />
            </span>
            <span className="text-right tabular-nums">{f.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// TextToHand's demo: a few lines in a handwriting face on ruled paper.
function Handwriting() {
  return (
    <div
      className="flex h-full flex-col justify-center bg-fg p-6"
      style={{
        backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 39px, rgb(0 123 167 / 0.25) 39px 40px)",
        backgroundPosition: "0 14px",
      }}
    >
      <p className="text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[40px] text-[#0a3d8f]" style={{ fontFamily: "var(--font-hand)" }}>
        Dear diary,
        <br />
        built it, shipped it,
        <br />
        people <span className="text-pink">actually</span> use it.
      </p>
    </div>
  );
}

const demos: Record<SideProject["demo"], () => React.JSX.Element> = {
  vitals: VitalsDemo,
  form: FormDemo,
  hand: Handwriting,
};

export function SideProjects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const st = { trigger: "[data-side-grid]", start: "top 80%" };
      gsap.from("[data-side-card]", {
        y: 100,
        rotate: (i) => (i - 1) * 4,
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: st,
      });
      // The demos come alive once the cards land.
      gsap.fromTo("[data-vw-line]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, delay: 0.5, ease: "power2.inOut", scrollTrigger: st });
      gsap.from("[data-ff-bar]", { scaleX: 0, duration: 1, delay: 0.7, stagger: 0.15, ease: "expo.out", scrollTrigger: st });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-bg py-[14vh]">
      <SectionHead
        index="05"
        label="After hours"
        title={
          <>
            Three side projects. <span className="text-blue">All live.</span>
          </>
        }
      />

      <div data-side-grid className="px-gutter mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {sideProjects.map((p, i) => {
          const Demo = demos[p.demo];
          return (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-side-card
              data-cursor="Visit"
              className={`group @container flex flex-col overflow-hidden rounded-3xl bg-bg-raised ${
                i === sideProjects.length - 1 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative h-[210px] overflow-hidden md:h-[240px]">
                <div className="h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]">
                  <Demo />
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
                <p className={`eyebrow font-semibold ${["text-pink", "text-blue", "text-fg-soft"][i % 3]}`}>{p.kind}</p>
                {/* Sized off the card width (cqw) so long names never overflow */}
                <h3 className="display -mt-2 text-[min(3.25rem,11.5cqw)] transition-colors group-hover:text-pink">{p.name}</h3>
                <p className="text-fg-soft">{p.line}</p>

                <ul className="space-y-1.5 text-[0.9rem]">
                  {p.points.map((pt, j) => (
                    <li key={pt} className="flex items-baseline gap-2.5">
                      <span className={`size-1.5 shrink-0 translate-y-[-2px] rounded-full ${j % 2 ? "bg-blue" : "bg-pink"}`} />
                      {pt}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4">
                  <p className="eyebrow max-w-[30ch] text-fg-mute">{p.stack.join(" · ")}</p>
                  <span className="eyebrow rounded-full bg-fg px-3 py-1.5 font-semibold text-bg transition-colors group-hover:bg-pink">
                    Live ↗
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
