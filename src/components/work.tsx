"use client";

import { useRef } from "react";
import { SectionHead } from "@/components/section-head";
import { ProjectVisual } from "@/components/project-visual";
import { gsap, useGSAP, type ScrollTrigger } from "@/lib/gsap";
import { profile, projects } from "@/data/content";

type ST = (extra?: ScrollTrigger.Vars) => ScrollTrigger.Vars;

export function Work() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Animations that live inside each poster. `st` decides when they run —
      // horizontally via containerAnimation on desktop, vertically on mobile.
      const posterAnims = (panel: HTMLElement, st: ST) => {
        const spin = panel.querySelector("[data-spin]");
        if (spin) gsap.fromTo(spin, { rotate: -25 }, { rotate: 25, ease: "none", svgOrigin: "200 250", scrollTrigger: st({ scrub: true, start: "left right", end: "right left" }) });

        const gauge = panel.querySelector("[data-gauge]");
        if (gauge) gsap.fromTo(gauge, { strokeDashoffset: 1 - 50 / 82 }, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", scrollTrigger: st({ start: "left 60%" }) });

        const tiles = panel.querySelectorAll("[data-tile]");
        if (tiles.length) gsap.from(tiles, { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%", stagger: { each: 0.015, from: "random" }, duration: 0.6, scrollTrigger: st({ start: "left 70%" }) });

        gsap.from(panel.querySelectorAll("[data-panel-text] > *"), { y: 40, autoAlpha: 0, stagger: 0.07, duration: 1, scrollTrigger: st({ start: "left 65%" }) });
      };

      // The Vastu scan line just keeps sweeping.
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) gsap.fromTo("[data-scan]", { y: 0 }, { y: 580, duration: 3.2, ease: "power1.inOut", repeat: -1, yoyo: true });

      mm.add(
        {
          desktop: "(min-width: 900px)",
          mobile: "(max-width: 899px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
          const reduce = ctx.conditions?.reduce;

          if (ctx.conditions?.desktop) {
            const t = track.current!;
            const distance = () => t.scrollWidth - window.innerWidth;

            const scroll = gsap.to(t, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: pin.current,
                pin: true,
                scrub: 0.8,
                start: "top top",
                end: () => `+=${distance()}`,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                  const n = Math.min(projects.length, Math.floor(self.progress * projects.length) + 1);
                  if (counter.current) counter.current.textContent = String(n).padStart(2, "0");
                  if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
                },
              },
            });

            if (reduce) return;
            panels.forEach((panel) => {
              const st: ST = (extra = {}) => ({ trigger: panel, containerAnimation: scroll, ...extra });
              posterAnims(panel, st);
              const art = panel.querySelector("[data-art]");
              if (art) gsap.fromTo(art, { xPercent: -10 }, { xPercent: 10, ease: "none", scrollTrigger: st({ scrub: true, start: "left right", end: "right left" }) });
            });
          } else if (!reduce) {
            panels.forEach((panel) => {
              // On a vertical page "left/right" become "top/bottom".
              const flip = (v: ScrollTrigger.Vars["start"]) =>
                typeof v === "string" ? v.replace("left", "top").replace("right", "bottom") : v;
              const st: ST = (extra = {}) => ({ trigger: panel, ...extra, start: flip(extra.start), end: flip(extra.end) });
              posterAnims(panel, st);
            });
          }
        },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-bg pt-[12vh]">
      <SectionHead
        index="03"
        label="Selected work"
        title={
          <>
            Four products. One job: <span className="text-pink">get a yes.</span>
          </>
        }
      />

      <div ref={pin} className="relative min-[900px]:h-svh min-[900px]:overflow-hidden">
        <div
          ref={track}
          className="px-gutter flex flex-col gap-12 py-12 min-[900px]:h-full min-[900px]:w-max min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-[4vw] min-[900px]:py-0"
        >
          {projects.map((p, i) => (
            <article
              key={p.name}
              data-panel
              className="grid gap-5 min-[900px]:h-[74svh] min-[900px]:w-[min(86vw,1280px)] min-[900px]:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] min-[900px]:gap-[3vw]"
            >
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-3xl min-[900px]:aspect-auto min-[900px]:h-full"
                style={{ background: p.tone }}
                data-cursor={p.href ? "Visit" : undefined}
              >
                <div data-art className="absolute inset-y-0 -inset-x-[12%]">
                  <ProjectVisual visual={p.visual} />
                </div>
                <span className="display absolute left-5 top-4 text-[2.5rem] text-bg mix-blend-normal">
                  <span className="rounded-full bg-fg px-3">{p.index}</span>
                </span>
                {p.href && <a href={p.href} target="_blank" rel="noreferrer" className="absolute inset-0" aria-label={`Visit ${p.name}`} />}
              </div>

              <div data-panel-text className="flex flex-col justify-between gap-4 py-1 min-[900px]:gap-7 min-[900px]:py-2">
                <div className="eyebrow flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1 font-semibold ${i % 2 ? "bg-blue text-fg" : "bg-pink text-bg"}`}>{p.kind}</span>
                  <span className="rounded-full border border-line px-3 py-1 text-fg-soft">{p.role}</span>
                </div>

                <h3 className="display text-[clamp(3.25rem,7vw,7.5rem)]">{p.name}</h3>

                <p className="max-w-[46ch] text-[clamp(1.05rem,1.2vw,1.2rem)] leading-relaxed text-fg-soft">{p.summary}</p>

                <ul className="hidden space-y-2.5 border-t border-line pt-5 text-[0.95rem] min-[900px]:block">
                  {p.detail.map((d, j) => (
                    <li key={d} className="flex items-baseline gap-3">
                      <span className={`size-2 shrink-0 rounded-full ${j % 2 ? "bg-blue" : "bg-pink"}`} />
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <ul className="eyebrow flex flex-wrap gap-1.5 text-fg-soft">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full bg-fg/[0.07] px-2.5 py-1">
                        {s}
                      </li>
                    ))}
                  </ul>
                  {p.href && (
                    <a href={p.href} target="_blank" rel="noreferrer" className="eyebrow link-draw font-semibold text-pink">
                      Visit site ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}

          <aside className="flex flex-col justify-center gap-6 rounded-3xl bg-pink p-8 text-bg min-[900px]:h-[74svh] min-[900px]:w-[34vw]">
            <p className="eyebrow font-semibold">That&apos;s the highlights.</p>
            <p className="display text-[clamp(2.5rem,4.2vw,4.5rem)]">
              Lead forms, 8+ pages, fixes shipped inside a day — the rest is in the résumé.
            </p>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="eyebrow inline-flex w-fit items-center gap-3 rounded-full bg-bg px-5 py-3 font-semibold text-fg transition-colors hover:bg-blue"
            >
              Read the résumé ↗
            </a>
          </aside>
        </div>

        <div className="px-gutter pointer-events-none absolute inset-x-0 bottom-5 hidden items-center gap-6 min-[900px]:flex">
          <span className="display text-2xl tabular-nums">
            <span ref={counter} className="text-pink">01</span> / {String(projects.length).padStart(2, "0")}
          </span>
          <div className="h-1 flex-1 rounded-full bg-fg/10">
            <div ref={bar} className="h-full origin-left scale-x-0 rounded-full bg-pink" />
          </div>
          <span className="eyebrow text-fg-soft">Keep scrolling →</span>
        </div>
      </div>
    </section>
  );
}
