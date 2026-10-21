"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/content";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export function LocalTime({ withSeconds = false }: { withSeconds?: boolean }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const shown = now ? (withSeconds ? now : now.slice(0, 5)) : withSeconds ? "--:--:--" : "--:--";
  return <span className="tabular-nums">{shown}</span>;
}
