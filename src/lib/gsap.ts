"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

gsap.defaults({ ease: "power3.out", duration: 1 });

export { gsap, ScrollTrigger, SplitText, useGSAP };

// The preloader fires this once it has cleared the screen. Anything that
// wants to animate "on arrival" (the hero, the nav) waits for it.
let introDone = false;
const listeners = new Set<() => void>();

export function finishIntro() {
  if (introDone) return;
  introDone = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onIntroDone(fn: () => void) {
  if (introDone) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
