# Arpit Goyal — Portfolio

Personal portfolio of Arpit Goyal, frontend developer at HomeLane.

Built with **Next.js**, **GSAP** (ScrollTrigger + SplitText) for animation, **Lenis** for smooth scrolling, and a few **Magic UI** components (Marquee, NumberTicker, Highlighter, ScrollProgress). Styled with Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Editing content

All the copy — projects, numbers, skills, links — lives in [`src/data/content.ts`](src/data/content.ts). Change it there; the components read from it.

## Structure

- `src/app` — layout, global styles, the single page
- `src/components` — one file per section (hero, about, work, …) plus the preloader, cursor and smooth-scroll setup
- `src/components/ui` — Magic UI components
- `public/avatar` — 3D avatar illustrations
