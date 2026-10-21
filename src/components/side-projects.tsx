"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/section-head";
import { gsap, useGSAP } from "@/lib/gsap";
import { sideProjects } from "@/data/content";

// AgeCalcNow's demo: counts how long you've been on this page, in its format.
function TimeHere() {
  const [s, setS] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setS(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return (
    <div className="flex h-full flex-col justify-center gap-4 bg-blue p-8 text-fg">
      <p className="eyebrow font-semibold opacity-80">You&apos;ve been on this page for</p>
      <p className="display text-[clamp(4rem,8vw,7.5rem)] tabular-nums">
        {hh}:{mm}:<span className="text-bg">{ss}</span>
      </p>
      <p className="eyebrow font-semibold opacity-80">0 years · 0 months · 0 days — and counting</p>
    </div>
  );
}

// TextToHand's demo: a few lines in a handwriting face on ruled paper.
function Handwriting() {
  return (
    <div
      className="flex h-full flex-col justify-center bg-fg p-8"
      style={{
        backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 43px, rgb(0 123 167 / 0.25) 43px 44px)",
        backgroundPosition: "0 18px",
      }}
    >
      <p className="text-[clamp(1.9rem,3.2vw,2.8rem)] leading-[44px] text-[#0a3d8f]" style={{ fontFamily: "var(--font-hand)" }}>
        Dear diary,
        <br />
        built it in a day,
        <br />
        people <span className="text-pink">actually</span> use it.
      </p>
    </div>
  );
}

export function SideProjects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-side-card]", {
        y: 100,
        rotate: (i) => (i ? 4 : -4),
        autoAlpha: 0,
        stagger: 0.15,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-side-grid]", start: "top 80%" },
      });
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
            Two side products. <span className="text-blue">Both live.</span>
          </>
        }
      />

      <div data-side-grid className="px-gutter mt-16 grid gap-5 md:grid-cols-2">
        {sideProjects.map((p, i) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            data-side-card
            data-cursor="Visit"
            className="group flex flex-col overflow-hidden rounded-3xl bg-bg-raised"
          >
            <div className="relative h-[200px] overflow-hidden md:h-[clamp(260px,30vw,400px)]">
              <div className="h-full transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.04]">
                {i === 0 ? <Handwriting /> : <TimeHere />}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3 p-5 md:gap-6 md:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="display text-[clamp(2.5rem,4vw,4rem)] transition-colors group-hover:text-pink">{p.name}</h3>
                <span className="eyebrow rounded-full border border-line px-3 py-1 text-fg-soft transition-colors group-hover:border-pink group-hover:text-pink">
                  {p.host} ↗
                </span>
              </div>
              <p className="max-w-[48ch] text-fg-soft">{p.line}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
