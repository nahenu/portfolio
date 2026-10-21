"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { gsap, useGSAP, finishIntro } from "@/lib/gsap";
import { profile } from "@/data/content";

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);
  const lenis = useLenis();

  // Keep the page still while the loader is up. Lenis mounts a beat after
  // us, so this re-runs once it exists.
  useEffect(() => {
    if (!lenis) return;
    if (gone) lenis.start();
    else lenis.stop();
  }, [lenis, gone]);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setGone(true);
        finishIntro();
        return;
      }

      html.classList.add("is-loading");
      window.scrollTo(0, 0);

      const letters = gsap.utils.toArray<HTMLElement>("[data-pl-letter]");
      const counter = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          html.classList.remove("is-loading");
          setGone(true);
        },
      });

      tl.from(letters, { yPercent: 105, duration: 0.7, ease: "expo.out", stagger: 0.03 }, 0)
        .to(
          counter,
          {
            v: 100,
            duration: 1.3,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v));
            },
          },
          0.15,
        )
        .to("[data-pl-bar]", { scaleX: 1, duration: 1.3, ease: "power2.inOut" }, 0.15)
        .to(letters, { yPercent: -105, duration: 0.5, ease: "power3.in", stagger: 0.02 }, "+=0.1")
        .add(() => finishIntro(), "-=0.05")
        .to("[data-pl-layer]", { yPercent: -100, duration: 0.9, ease: "expo.inOut", stagger: 0.09 }, "<");

      return () => html.classList.remove("is-loading");
    },
    { scope: root },
  );

  if (gone) return null;

  const words = profile.name.toUpperCase().split(" ");

  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[100]">
      {/* Panels peel away top-first, so the colour layers flash past underneath. */}
      <div data-pl-layer className="absolute inset-0 z-30 flex flex-col justify-between bg-bg px-gutter py-6">
        <div className="eyebrow flex justify-between text-fg-soft">
          <span>Portfolio of a frontend developer</span>
          <span>Agra, India</span>
        </div>

        <h2 className="display text-[clamp(5rem,24vw,18rem)] md:text-[clamp(4.5rem,17vw,18rem)]">
          {words.map((w) => (
            <span key={w} className="block overflow-hidden">
              {w.split("").map((ch, i) => (
                <span key={i} data-pl-letter className="inline-block">
                  {ch}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="flex items-end gap-6">
          <div className="h-2 flex-1 bg-fg/10">
            <div data-pl-bar className="h-full origin-left scale-x-0 bg-pink" />
          </div>
          <span className="display w-[3ch] text-right text-[clamp(2rem,4vw,3.5rem)] tabular-nums">
            <span ref={count}>0</span>
          </span>
        </div>
      </div>
      <div data-pl-layer className="absolute inset-0 z-20 bg-pink" />
      <div data-pl-layer className="absolute inset-0 z-10 bg-blue" />
    </div>
  );
}
