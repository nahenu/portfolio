import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Preloader } from "@/components/preloader";
import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { TickerBand } from "@/components/ticker-band";
import { About } from "@/components/about";
import { Numbers } from "@/components/numbers";
import { Work } from "@/components/work";
import { Shipped } from "@/components/shipped";
import { SideProjects } from "@/components/side-projects";
import { Toolbox } from "@/components/toolbox";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <ScrollProgress className="z-[60] h-[3px] bg-pink bg-none" />
      <Nav />

      <main className="relative z-10 bg-bg">
        <Hero />
        <TickerBand />
        <About />
        <Numbers />
        <Work />
        <Shipped />
        <SideProjects />
        <Toolbox />
      </main>

      <Contact />
      <div className="grain" aria-hidden />
    </>
  );
}
