"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Kept in sync with --pink / --fg in globals.css (GSAP tweens real colours).
const ACCENT = "#ff2d95";
const PAPER = "#f4f1ec";

// A small dot that follows the pointer. Anything with data-cursor="Label"
// swells it into a disc with that label inside. Only on real mice.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = dot.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    let active: Element | null = null;

    const move = (e: PointerEvent) => {
      x(e.clientX);
      y(e.clientY);
      gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });

      const target = (e.target as Element | null)?.closest("[data-cursor], a, button") ?? null;
      if (target === active) return;
      active = target;

      const label = target?.getAttribute("data-cursor") ?? "";
      if (text.current) text.current.textContent = label;

      gsap.to(el, {
        width: label ? 88 : target ? 44 : 10,
        height: label ? 88 : target ? 44 : 10,
        backgroundColor: label ? ACCENT : PAPER,
        duration: 0.45,
        ease: "power3.out",
      });
      gsap.to(text.current, { autoAlpha: label ? 1 : 0, duration: 0.25 });
      el.style.mixBlendMode = label ? "normal" : "difference";
    };

    const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  });

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] flex size-2.5 items-center justify-center rounded-full bg-fg opacity-0 mix-blend-difference"
    >
      <span ref={text} className="eyebrow font-semibold text-bg opacity-0" />
    </div>
  );
}
