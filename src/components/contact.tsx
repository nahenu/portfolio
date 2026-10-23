"use client";

import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { Magnetic } from "@/components/magnetic";
import { LocalTime } from "@/components/local-time";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { profile } from "@/data/content";

// The footer is fixed to the bottom of the viewport and clipped by its
// wrapper, so the page above slides off it like a curtain.
export function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const lenis = useLenis();

  const links = [
    { label: "Email", href: `mailto:${profile.email}` },
    { label: "Résumé", href: profile.resume },
    { label: "Cover letter", href: profile.coverLetter },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
  ].filter((l) => l.href);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const split = SplitText.create("[data-contact-title]", { type: "lines", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 105,
        stagger: 0.1,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 40%" },
      });
      gsap.fromTo(
        "[data-contact-inner]",
        { yPercent: -25 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
      );
      return () => split.revert();
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <div
      ref={root}
      id="contact"
      className="relative h-svh min-h-[560px]"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      <div className="fixed inset-x-0 bottom-0 h-svh min-h-[560px] bg-blue">
        <footer data-contact-inner className="flex h-full flex-col justify-between py-6 text-fg">
          <div className="px-gutter eyebrow flex justify-between gap-4 pt-14 font-semibold text-fg/80 md:pt-16">
            <p className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-full bg-bg text-sm font-bold text-fg">07</span>
              Contact
            </p>
            <p>
              {profile.location} · <LocalTime withSeconds /> IST
            </p>
          </div>

          <div className="px-gutter">
            <h2 data-contact-title className="display text-[clamp(3rem,min(11vw,13svh),12rem)]">
              Slow page? Leaky form?
              <br />
              <span className="text-bg">Let&apos;s talk.</span>
            </h2>

            <div className="mt-6 flex flex-col gap-5 md:mt-[4svh] md:gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="link-draw text-[clamp(1.25rem,2.8vw,2.6rem)] font-semibold tracking-tight"
                  data-cursor="Write"
                >
                  {profile.email}
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="eyebrow rounded-full bg-bg px-4 py-2 font-semibold text-fg transition-colors hover:bg-fg hover:text-bg"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>

              <Magnetic>
                <a
                  href={`mailto:${profile.email}`}
                  className="display flex size-24 items-center justify-center rounded-full bg-pink text-center text-[1.2rem] text-bg transition-transform duration-500 hover:scale-105 md:size-[min(11rem,20svh)] md:text-[2rem]"
                >
                  Say
                  <br />
                  hello
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="px-gutter eyebrow grid gap-6 border-t border-fg/25 pt-5 font-semibold md:grid-cols-3 md:items-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="link-draw"
                  >
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-fg/70 md:text-center">Designed &amp; built by {profile.name}</p>
            <button
              type="button"
              onClick={() => lenis?.scrollTo(0, { duration: 2.2 })}
              className="link-draw w-fit md:justify-self-end"
            >
              Back to top ↑
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
