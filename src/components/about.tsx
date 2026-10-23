"use client";

import { useRef } from "react";
import Image from "next/image";
import { Highlighter } from "@/components/ui/highlighter";
import { LocalTime } from "@/components/local-time";
import { SectionHead } from "@/components/section-head";
import { gsap, useGSAP } from "@/lib/gsap";
import { career, facts, profile } from "@/data/content";

// Deterministic "barcode" from the name, so it renders the same on server and client.
const bars = Array.from(profile.name.replace(" ", "") + "frontend", (c, i) => ({
  w: (c.charCodeAt(0) % 3) + 1,
  gap: ((c.charCodeAt(0) + i) % 2) + 1,
}));

function IdCard() {
  return (
    <div className="relative w-[min(78%,360px)] rounded-[18px] md:w-[min(92%,360px)] bg-fg p-5 text-bg shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
      {/* Slot the strap goes through */}
      <div className="mx-auto mb-5 h-2.5 w-16 rounded-full bg-bg/80" />

      <div className="flex items-start justify-between">
        <span className="eyebrow font-semibold">Frontend / 2024 →</span>
        <span className="eyebrow rounded-full bg-pink px-2 py-0.5 font-semibold text-bg">Pass</span>
      </div>

      <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl bg-blue">
        <span className="display absolute -bottom-3 -left-1 text-[6.5rem] leading-none text-fg/20">AG</span>
        <Image
          src="/avatar/coding.webp"
          alt="A 3D cartoon of Arpit coding on a laptop"
          width={890}
          height={906}
          sizes="320px"
          className="absolute inset-x-0 top-[6%] mx-auto h-auto w-[86%]"
        />
      </div>

      <p className="display mt-5 text-[2.6rem]">{profile.name}</p>
      <p className="eyebrow mt-1 text-bg/70">{profile.role}</p>

      <dl className="eyebrow mt-5 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-bg/15 pt-4">
        <dt className="text-bg/55">Based</dt>
        <dd className="font-semibold">{profile.location}</dd>
        <dt className="text-bg/55">Works in</dt>
        <dd className="font-semibold">React · Next.js</dd>
        <dt className="text-bg/55">Local time</dt>
        <dd className="font-semibold">
          <LocalTime /> IST
        </dd>
      </dl>

      <div className="mt-5 flex h-10 items-stretch" aria-hidden>
        {bars.map((b, i) => (
          <span key={i} className="bg-bg" style={{ width: b.w * 2, marginRight: b.gap * 2 }} />
        ))}
      </div>
    </div>
  );
}

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const card = root.current?.querySelector<HTMLElement>("[data-card]");
      const tilt = root.current?.querySelector<HTMLElement>("[data-card-tilt]");
      if (!card || !tilt || reduce) return;

      // The card hangs from its strap and swings as the section moves past —
      // gently on phones, where a big swing would push it off the screen.
      const amp = window.innerWidth < 768 ? 0.35 : 1;
      gsap.fromTo(
        card,
        { rotate: 7 * amp },
        {
          rotate: -5 * amp,
          ease: "none",
          transformOrigin: "50% 0%",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.2 },
        },
      );

      // ...and leans toward the pointer.
      const rx = gsap.quickTo(tilt, "rotationX", { duration: 0.6, ease: "power3" });
      const ry = gsap.quickTo(tilt, "rotationY", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        const r = tilt.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 22);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 22);
      };
      const reset = () => {
        rx(0);
        ry(0);
      };
      tilt.addEventListener("pointermove", move);
      tilt.addEventListener("pointerleave", reset);

      gsap.from("[data-fact]", {
        y: 60,
        rotate: (i) => (i % 2 ? 6 : -6),
        autoAlpha: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: "back.out(1.4)",
        scrollTrigger: { trigger: "[data-facts]", start: "top 85%" },
      });

      gsap.from("[data-career-row]", {
        x: -30,
        autoAlpha: 0,
        stagger: 0.1,
        scrollTrigger: { trigger: "[data-career]", start: "top 85%" },
      });

      return () => {
        tilt.removeEventListener("pointermove", move);
        tilt.removeEventListener("pointerleave", reset);
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="about" className="overflow-x-clip py-[12vh]">
      <SectionHead index="01" label="About" title={<>Hi, I&apos;m Arpit.</>} />

      <div className="px-gutter mt-14 grid gap-16 md:grid-cols-12 md:gap-10">
        {/* The hanging card */}
        <div className="relative flex justify-center md:col-span-5">
          <div data-card className="relative flex w-full flex-col items-center">
            <div className="h-24 w-9 bg-pink md:h-32" aria-hidden />
            <div className="-mt-6 w-full [perspective:900px]">
              <div data-card-tilt className="flex justify-center [transform-style:preserve-3d]">
                <IdCard />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 md:pt-24">
          <p className="text-[clamp(1.5rem,2.7vw,2.6rem)] font-medium leading-[1.3] tracking-[-0.01em]">
            I&apos;m a frontend developer at{" "}
            <Highlighter action="highlight" color="#007ba7" isView animationDuration={900}>
              HomeLane
            </Highlighter>
            . For two and a half years I&apos;ve owned the screens people use to plan their homes —{" "}
            <Highlighter action="underline" color="#ff2d95" isView strokeWidth={3} animationDuration={900}>
              the forms, the flows,
            </Highlighter>{" "}
            the pages that load before anyone decides to stay. I care about the boring numbers:{" "}
            <Highlighter action="circle" color="#ff2d95" isView strokeWidth={2.5} padding={6} animationDuration={900}>
              drop-off
            </Highlighter>
            ,{" "}
            <Highlighter action="box" color="#007ba7" isView strokeWidth={2.5} padding={4} animationDuration={900}>
              load time
            </Highlighter>
            , cost per lead. Those are the ones that move.
          </p>

          <ul data-facts className="mt-10 grid grid-cols-2 gap-2.5 md:mt-14 md:gap-3 lg:grid-cols-4">
            {facts.map((f, i) => (
              <li
                key={f.big}
                data-fact
                className={`@container flex aspect-[5/4] flex-col justify-between rounded-2xl p-4 lg:aspect-square ${
                  ["bg-pink text-bg", "bg-blue text-fg", "bg-fg text-bg", "border border-line text-fg"][i % 4]
                }`}
              >
                <span className="eyebrow opacity-75">{f.small}</span>
                {/* Sized off the tile's own width (cqw) so long words like TYPESCRIPT always fit */}
                <span className="display text-[min(2.6rem,15cqw)]">{f.big}</span>
              </li>
            ))}
          </ul>

          <div data-career className="mt-14">
            <p className="eyebrow mb-3 text-fg-soft">Where I&apos;ve been</p>
            <ul>
              {career.map((c, i) => (
                <li
                  key={c.role}
                  data-career-row
                  className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 border-t border-line py-4 last:border-b"
                >
                  <span className={`size-2.5 translate-y-[-2px] rounded-full ${["bg-pink", "bg-blue", "bg-fg"][i % 3]}`} />
                  <span>
                    <span className="block text-lg font-semibold">{c.role}</span>
                    <span className="text-sm text-fg-soft">{c.place}</span>
                    {c.note && <span className="mt-1 block text-sm text-fg-mute">{c.note}</span>}
                  </span>
                  <span className="eyebrow text-fg-soft">{c.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
