"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, SplitText, onIntroDone } from "@/lib/gsap";
import { profile, projects } from "@/data/content";

function Asterisk({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      {[0, 30, 60, 90, 120, 150].map((r) => (
        <rect key={r} x="44" y="0" width="12" height="100" transform={`rotate(${r} 50 50)`} fill="currentColor" />
      ))}
    </svg>
  );
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const split = SplitText.create("[data-hero-name]", { type: "chars" });

      if (!reduce) {
        gsap.set(split.chars, { yPercent: 110 });
        gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
        gsap.set("[data-hero-pop]", { scale: 0, rotate: -120 });
        gsap.set("[data-hero-disc]", { scale: 0 });
        gsap.set("[data-hero-avatar]", { yPercent: 40, autoAlpha: 0 });
      }

      // contextSafe keeps these selectors scoped to the hero (see nav.tsx).
      const off = onIntroDone(
        contextSafe!(() => {
          if (reduce) return;
          gsap
            .timeline({ delay: 0.1 })
            .to(split.chars, { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.04 })
            .to("[data-hero-disc]", { scale: 1, duration: 1.2, ease: "expo.out" }, 0.15)
            .to("[data-hero-avatar]", { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: "back.out(1.3)" }, 0.35)
            .to("[data-hero-pop]", { scale: 1, rotate: 0, duration: 1.3, ease: "back.out(1.6)", stagger: 0.12 }, 0.45)
            .to("[data-hero-fade]", { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.9 }, 0.5)
            // Idle: a slow sway from the feet, like he's waving.
            .to("[data-hero-sway]", { rotate: 2.5, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }, 1.4);
        }),
      );

      if (!reduce) {
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to("[data-hero-names]", { yPercent: -12, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-figure]", { yPercent: 14, ease: "none", scrollTrigger: st });
        gsap.to("[data-hero-spin]", { rotate: 300, ease: "none", scrollTrigger: st });

        // The avatar leans a touch toward the pointer.
        const fig = root.current?.querySelector<HTMLElement>("[data-hero-lean]");
        if (fig && window.matchMedia("(hover: hover)").matches) {
          const x = gsap.quickTo(fig, "x", { duration: 1, ease: "power3" });
          const y = gsap.quickTo(fig, "y", { duration: 1, ease: "power3" });
          const move = (e: PointerEvent) => {
            x((e.clientX / window.innerWidth - 0.5) * 30);
            y((e.clientY / window.innerHeight - 0.5) * 16);
          };
          window.addEventListener("pointermove", move);
          return () => {
            window.removeEventListener("pointermove", move);
            off();
            split.revert();
          };
        }
      }

      return () => {
        off();
        split.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="top" className="relative overflow-hidden pb-12 pt-24 md:min-h-svh md:pt-28">
      <div className="px-gutter grid items-end gap-6 md:min-h-[calc(100svh-10rem)] md:grid-cols-12">
        {/* Left: name, line, projects */}
        <div data-hero-names className="relative z-10 md:col-span-7">
          <p data-hero-fade className="eyebrow mb-5 text-fg-soft">
            <span className="text-pink">●</span> {profile.role} at HomeLane · since Feb 2024
          </p>

          <h1 className="display text-[26vw] md:text-[clamp(4.75rem,min(19vw,28svh),19rem)]">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden className="flex items-start gap-[0.05em]">
              <span className="-my-[0.1em] inline-block overflow-hidden py-[0.1em]">
                <span data-hero-name className="block">
                  {profile.firstName}
                </span>
              </span>
              <span data-hero-pop className="mt-[0.06em] inline-block text-blue">
                <span data-hero-spin className="block">
                  <Asterisk className="size-[0.32em]" />
                </span>
              </span>
            </span>
            <span aria-hidden className="block">
              <span className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] text-pink">
                <span data-hero-name className="block">
                  {profile.lastName}
                </span>
              </span>
            </span>
          </h1>

          <p data-hero-fade className="mt-8 max-w-[34ch] text-[clamp(1.1rem,1.6vw,1.45rem)] font-medium leading-snug">
            I build the parts of a website that decide whether someone stays —{" "}
            <span className="text-blue">pages that load fast</span>,{" "}
            <span className="text-pink">forms people actually finish</span>, and the tracking that proves it.
          </p>

          <ul data-hero-fade className="eyebrow mt-6 flex flex-wrap gap-2">
            {projects.map((p, i) => (
              <li
                key={p.name}
                className={`rounded-full border px-3 py-1.5 ${i % 2 ? "border-pink text-pink" : "border-blue bg-blue text-fg"}`}
              >
                {p.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: the waving avatar on a blue disc */}
        <div data-hero-figure className="relative order-first mx-auto w-[min(72vw,320px)] md:order-none md:col-span-5 md:w-full md:max-w-[520px]">
          <div data-hero-disc className="absolute inset-x-[2%] bottom-[4%] aspect-square rounded-full bg-blue" />
          <span
            data-hero-pop
            className="absolute left-0 top-[22%] z-10 grid size-[5.5rem] place-items-center rounded-full bg-pink text-center text-bg md:size-28"
          >
            <span data-hero-spin className="display block text-[1.15rem] md:text-[1.45rem]">
              2.5+ yrs
              <br />
              shipping
            </span>
          </span>
          <div data-hero-lean className="relative">
            <div data-hero-avatar>
              <div data-hero-sway className="origin-bottom">
                <Image
                  src="/avatar/hello.webp"
                  alt="A 3D cartoon of Arpit in an orange hoodie, waving hello"
                  width={491}
                  height={927}
                  priority
                  sizes="(min-width: 768px) 30vw, 60vw"
                  className="relative mx-auto h-auto w-[62%] drop-shadow-[0_30px_40px_rgb(0_0_0/0.45)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
