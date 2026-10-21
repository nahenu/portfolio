"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type Tone = "dark" | "pink" | "blue";

const tones: Record<Tone, { rule: string; chip: string; label: string }> = {
  dark: { rule: "bg-line", chip: "bg-pink text-bg", label: "text-fg-soft" },
  pink: { rule: "bg-bg/25", chip: "bg-bg text-pink", label: "text-bg/70" },
  blue: { rule: "bg-fg/25", chip: "bg-bg text-fg", label: "text-fg/75" },
};

// A numbered chip + label on the left, one big line of condensed caps on the
// right. The title rises in line by line when it scrolls into view.
export function SectionHead({
  index,
  label,
  title,
  className,
  tone = "dark",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  className?: string;
  tone?: Tone;
}) {
  const root = useRef<HTMLDivElement>(null);
  const t = tones[tone];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      SplitText.create("[data-head-title]", {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 105,
            stagger: 0.08,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: root.current, start: "top 82%" },
          }),
      });
      gsap.from("[data-head-rule]", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.4,
        ease: "expo.inOut",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
      gsap.from("[data-head-chip]", {
        scale: 0,
        rotate: -90,
        duration: 0.9,
        ease: "back.out(2)",
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={cn("px-gutter", className)}>
      <div data-head-rule className={cn("h-px w-full", t.rule)} />
      <div className="grid gap-5 pt-5 md:grid-cols-12">
        <p className={cn("eyebrow flex items-center gap-3 md:col-span-3 md:items-start", t.label)}>
          <span
            data-head-chip
            className={cn("grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold", t.chip)}
          >
            {index}
          </span>
          <span className="md:pt-2">{label}</span>
        </p>
        <h2 data-head-title className="display text-[clamp(3rem,8vw,8.5rem)] md:col-span-9">
          {title}
        </h2>
      </div>
    </div>
  );
}
