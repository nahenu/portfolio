import { Marquee } from "@/components/ui/marquee";
import { tickerWords } from "@/data/content";

// Two tapes crossing each other: pink running left, blue running right.
export function TickerBand() {
  const words = (sep: string) =>
    tickerWords.map((w) => (
      <span key={w} className="flex items-center">
        <span className="display px-6 text-[clamp(2rem,4.5vw,4.25rem)] leading-none">{w}</span>
        <span className={`text-[clamp(1.25rem,2vw,2rem)] leading-none ${sep}`} aria-hidden>
          ✺
        </span>
      </span>
    ));

  return (
    <div className="relative z-10 overflow-hidden py-16 md:py-24" aria-label="Tools I work with">
      <div className="relative -ml-[5%] w-[110%] -rotate-3 bg-blue text-fg">
        <Marquee reverse className="py-3 [--duration:46s] [--gap:0rem]" repeat={3}>
          {words("text-bg")}
        </Marquee>
      </div>
      <div className="relative -ml-[5%] mt-2 w-[110%] rotate-2 bg-pink text-bg shadow-[0_20px_40px_-20px_rgb(0_0_0/0.8)]">
        <Marquee className="py-3 [--duration:38s] [--gap:0rem]" repeat={3}>
          {words("text-fg")}
        </Marquee>
      </div>
    </div>
  );
}
