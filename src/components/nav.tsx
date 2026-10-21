"use client";

import { useRef } from "react";
import { LocalTime } from "@/components/local-time";
import { gsap, useGSAP, onIntroDone } from "@/lib/gsap";
import { profile } from "@/data/content";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// Text that rolls up to a pink copy of itself on hover.
function Roll({ children }: { children: string }) {
  return (
    <span className="link-roll">
      <span>{children}</span>
      <span aria-hidden className="text-pink">
        {children}
      </span>
    </span>
  );
}

export function Nav() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    (_, contextSafe) => {
      gsap.set("[data-nav-item]", { yPercent: -150, autoAlpha: 0 });
      // contextSafe: the signal fires from the preloader's timeline, and without
      // it these selectors would be resolved inside the preloader instead of here.
      return onIntroDone(
        contextSafe!(() => {
          gsap.to("[data-nav-item]", { yPercent: 0, autoAlpha: 1, stagger: 0.08, duration: 0.9, delay: 0.5, ease: "expo.out" });
        }),
      );
    },
    { scope: root },
  );

  return (
    <header ref={root} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <nav className="px-gutter flex items-center justify-between gap-3 py-4">
        <a
          href="#top"
          data-nav-item
          className="eyebrow pointer-events-auto flex items-center gap-2 rounded-full border border-fg/10 bg-bg-raised px-4 py-2.5 text-fg"
        >
          <span className="size-2 rounded-full bg-pink" />
          <Roll>{profile.name}</Roll>
        </a>

        <p data-nav-item className="eyebrow pointer-events-auto hidden rounded-full border border-fg/10 bg-bg-raised px-4 py-2.5 text-fg-soft lg:block">
          {profile.location} · <LocalTime /> IST
        </p>

        <ul data-nav-item className="eyebrow pointer-events-auto flex items-center gap-1 rounded-full border border-fg/10 bg-bg-raised p-1 text-fg">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="block rounded-full px-3 py-1.5 transition-colors hover:bg-fg/10">
                <Roll>{l.label}</Roll>
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="block rounded-full bg-pink px-4 py-1.5 text-bg transition-colors hover:bg-fg"
            >
              Résumé ↗
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
