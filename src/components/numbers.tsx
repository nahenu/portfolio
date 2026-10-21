"use client";

import { useRef } from "react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { SectionHead } from "@/components/section-head";
import { gsap, useGSAP } from "@/lib/gsap";
import { numbers } from "@/data/content";

export function Numbers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-num]", {
        y: 80,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-num-grid]", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative z-10 rounded-t-[2.5rem] bg-blue py-[14vh] text-fg">
      <SectionHead
        tone="blue"
        index="02"
        label="In numbers"
        title={
          <>
            Small changes. <span className="text-bg">Big numbers.</span>
          </>
        }
      />

      <div data-num-grid className="px-gutter mt-10 grid grid-cols-2 gap-2.5 md:mt-16 md:gap-3 lg:grid-cols-4">
        {numbers.map((n, i) => (
          <article
            key={n.label}
            data-num
            className={`flex min-h-[170px] flex-col justify-between gap-4 rounded-2xl p-4 md:min-h-[340px] md:gap-10 md:rounded-3xl md:p-6 ${
              i === 0 ? "bg-pink text-bg" : i === 2 ? "bg-bg text-fg" : "bg-fg/10 text-fg"
            }`}
          >
            <p className="eyebrow font-semibold opacity-80">{n.label}</p>
            <div>
              <p className="display flex items-baseline text-[clamp(2.75rem,8vw,8rem)]">
                {n.prefix && <span className="mr-1 text-[0.5em]">{n.prefix}</span>}
                <NumberTicker value={n.value} startValue={n.start ?? 0} className="tracking-tight text-inherit dark:text-inherit" />
                {n.suffix && <span>{n.suffix}</span>}
              </p>
              <p className="mt-2 max-w-[30ch] text-xs font-medium leading-snug opacity-85 md:mt-4 md:text-[0.95rem] md:leading-relaxed">{n.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
