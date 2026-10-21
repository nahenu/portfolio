import type { Metadata, Viewport } from "next";
import { Archivo, Caveat } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

// One variable family does both jobs: condensed heavy caps for headlines
// (via the wdth axis) and regular width for everything else.
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
// Only used inside the TextToHand demo card.
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Arpit Goyal — Frontend Developer",
  description:
    "Frontend developer at HomeLane. React, Next.js and the unglamorous work that makes pages fast and forms convert.",
  openGraph: {
    title: "Arpit Goyal — Frontend Developer",
    description: "Fast pages, forms people finish, and the numbers to prove it.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${hand.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
