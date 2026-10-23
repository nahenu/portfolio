"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionHead } from "@/components/section-head";
import { gsap, useGSAP } from "@/lib/gsap";
import { stack } from "@/data/content";

const groupColours = ["bg-pink text-bg", "bg-blue text-fg", "bg-fg text-bg", "bg-pink text-bg", "bg-blue text-fg"];

export function Toolbox() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from("[data-tool]", {
        y: 24,
        autoAlpha: 0,
        stagger: 0.025,
        duration: 0.8,
        scrollTrigger: { trigger: "[data-tools]", start: "top 80%" },
      });
      gsap.from("[data-desk]", {
        yPercent: 30,
        autoAlpha: 0,
        duration: 1.2,
        ease: "back.out(1.2)",
        scrollTrigger: { trigger: "[data-desk-panel]", start: "top 75%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="pb-[20vh]">
      <SectionHead index="06" label="Toolbox" title={<>What I reach for.</>} />

      <div className="px-gutter mt-10 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div
          data-desk-panel
          className="relative mx-auto flex aspect-[5/4] w-full max-w-[420px] lg:aspect-[4/5] items-end justify-center overflow-hidden rounded-[2rem] bg-pink lg:col-span-4"
        >
          <span className="display absolute left-5 top-4 text-[4.5rem] leading-none text-bg/15">
            SKILLS
            <br />
            SKILLS
            <br />
            SKILLS
          </span>
          <div data-desk className="relative w-[62%] lg:w-[92%]">
            <Image
              src="/avatar/skills.webp"
              alt="A 3D cartoon of Arpit typing at a desk, with a 'My Skills' speech bubble"
              width={842}
              height={928}
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div data-tools className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
          {stack.map((g, i) => (
            <div key={g.group}>
              <p data-tool className={`eyebrow mb-4 inline-block rounded-full px-3 py-1 font-semibold ${groupColours[i]}`}>
                {g.group}
              </p>
              <ul className="space-y-2">
                {g.items.map((item) => (
                  <li key={item} data-tool className="text-[clamp(1.05rem,1.35vw,1.25rem)] font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p data-tool className="eyebrow col-span-full text-fg-soft">
            Certified in React.js and Responsive Web Design (HTML, CSS, JavaScript)
          </p>
        </div>
      </div>
    </section>
  );
}
