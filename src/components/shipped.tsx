"use client";

import { useRef } from "react";
import { SectionHead } from "@/components/section-head";
import { gsap, useGSAP } from "@/lib/gsap";
import { shipped } from "@/data/content";

export function Shipped() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>("[data-ship-row]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 90%" } });
        tl.from(row.querySelector("[data-ship-rule]"), { scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "expo.inOut" }).from(
          row.querySelectorAll("[data-ship-text]"),
          { yPercent: 40, autoAlpha: 0, stagger: 0.08, duration: 0.8 },
          0.25,
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative z-10 rounded-t-[2.5rem] bg-pink py-[14vh] text-bg">
      <SectionHead
        tone="pink"
        index="04"
        label="Shipped at HomeLane"
        title={
          <>
            A log of things that <span className="text-fg">moved a number.</span>
          </>
        }
      />

      <ol className="mt-16">
        {shipped.map((s, i) => (
          <li key={s.what} data-ship-row className="group relative">
            <div data-ship-rule className="mx-[var(--gutter)] h-px bg-bg/25" />
            {/* Black band that wipes up behind the row on hover */}
            <span
              aria-hidden
              className="absolute inset-0 origin-bottom scale-y-0 bg-bg transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-y-100"
            />
            <div className="px-gutter relative grid grid-cols-[2.75rem_1fr] gap-x-3 gap-y-2 py-6 transition-colors duration-500 group-hover:text-fg md:grid-cols-12 md:items-center md:gap-6 md:py-7">
              <span data-ship-text className="display text-[1.75rem] transition-colors group-hover:text-pink md:col-span-1 md:text-[2rem]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* GSAP moves the outer span; the CSS hover nudge lives on the inner one
                  so a transform transition never fights the scroll animation. */}
              <span data-ship-text className="text-[clamp(1.4rem,2.6vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.015em] md:col-span-7">
                <span className="inline-block transition-transform duration-500 group-hover:translate-x-3">{s.what}</span>
              </span>
              <span
                data-ship-text
                className="text-[0.95rem] font-medium leading-relaxed text-bg/75 transition-colors group-hover:text-fg/70 col-start-2 md:col-span-4 md:col-start-auto md:text-right"
              >
                {s.result}
              </span>
            </div>
          </li>
        ))}
        <li aria-hidden className="mx-[var(--gutter)] h-px bg-bg/25" />
      </ol>
    </section>
  );
}
