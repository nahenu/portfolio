"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

function ScrollTriggerSync() {
  useLenis(() => ScrollTrigger.update());
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Drive Lenis from GSAP's ticker so ScrollTrigger and the scroll
    // position are always computed on the same frame.
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Web fonts change line lengths, which moves every trigger. Re-measure once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.09, wheelMultiplier: 1, anchors: true }}
    >
      <ScrollTriggerSync />
      {children}
    </ReactLenis>
  );
}
