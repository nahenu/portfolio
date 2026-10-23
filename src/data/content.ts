// Everything the site says lives here. Edit this file, not the components.

export const profile = {
  name: "Arpit Goyal",
  firstName: "Arpit",
  lastName: "Goyal",
  role: "Frontend Developer",
  location: "Agra, India",
  timezone: "Asia/Kolkata",
  email: "arpitgoyal841@gmail.com",
  resume: "/arpit-goyal-resume.pdf",
  coverLetter: "/arpit-goyal-cover-letter.pdf",
  // Fill these in — links with an empty string are hidden on the site.
  linkedin: "",
  github: "",
};

export const intro =
  "I'm a frontend developer at HomeLane. For the last two and a half years I've owned the screens people use to plan their homes — the forms, the flows, the pages that load before anyone decides to stay. I care about the boring numbers: drop-off, load time, cost per lead. Those are the ones that move.";

// The four colour tiles in the About section.
export const facts = [
  { small: "Based in", big: "Agra" },
  { small: "B.Tech, CSE", big: "Class of '24" },
  { small: "Also writes", big: "TypeScript" },
  { small: "Side products", big: "2 live" },
];

export const numbers = [
  {
    value: 75,
    prefix: "₹",
    suffix: "L",
    label: "Ad spend saved",
    note: "By swapping one form field — pincode out, city dropdown in.",
  },
  {
    value: 80,
    start: 50,
    suffix: "+",
    label: "Lighthouse score",
    note: "homelane.com, up from 50. Images, scripts, fonts, layout shift.",
  },
  {
    value: 30,
    suffix: "+",
    label: "Landing pages retired",
    note: "Hand-edited Unbounce pages folded into one Strapi template.",
  },
  {
    value: 50,
    suffix: "+",
    label: "Daily users, zero ads",
    note: "On TextToHand AI, a side product I built and launched myself.",
  },
];

export type Project = {
  index: string;
  name: string;
  kind: string;
  role: string;
  summary: string;
  detail: string[];
  stack: string[];
  visual: "orbit" | "plan" | "gauge" | "tiles";
  tone: string;
  href?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Supernova",
    kind: "Guided requirements platform",
    role: "Frontend owner",
    summary:
      "A homeowner answers a few questions about their space. Supernova turns those answers into a personalised design summary — and quietly drives a steady flow of qualified leads and design appointments.",
    detail: [
      "Built and own the entire frontend",
      "Multi-step forms with Redux state + OTP verification",
      "WebEngage and Clarity events across the whole funnel",
    ],
    stack: ["Next.js", "Redux", "REST", "WebEngage", "Clarity"],
    visual: "orbit",
    tone: "#ff2d95",
  },
  {
    index: "02",
    name: "HomeLane Vastu",
    kind: "AI floor-plan reader",
    role: "Frontend owner",
    summary:
      "Upload a floor plan, the AI scans it, and you get a Vastu plan written for your actual home. I built the frontend end to end — upload, scanning states, and the result.",
    detail: [
      "Built and own the entire frontend",
      "Upload → scan → personalised plan flow",
      "First-touch traffic attribution for every lead",
    ],
    stack: ["React", "Next.js", "Redux", "OTP", "Analytics"],
    visual: "plan",
    tone: "#007ba7",
  },
  {
    index: "03",
    name: "homelane.com",
    kind: "The main website",
    role: "Performance + CMS",
    summary:
      "Took Lighthouse from 50 to 80+, then moved the marketing team off code. 30+ Unbounce pages became one dynamic Strapi template, and 10+ page types now edit without a deploy.",
    detail: [
      "WebP, compression, lazy loading, code splitting",
      "Deferred JS/CSS and third-party scripts, CLS fixes",
      "8+ pages: Reviews, Bedroom, Bathroom, Cities, Decko…",
    ],
    stack: ["Next.js", "Strapi", "Core Web Vitals", "Sass"],
    visual: "gauge",
    tone: "#151515",
    href: "https://www.homelane.com",
  },
  {
    index: "04",
    name: "MakeMyBath",
    kind: "Group brand storefront",
    role: "UI + integrations",
    summary:
      "UI and frontend integrations for a HomeLane group brand that closed ₹1 Cr+ in a single quarter. I also integrated the end-to-end payment flow on the frontend.",
    detail: [
      "UI build and frontend integrations",
      "Payment gateway, end to end",
      "Lead attribution with first-touch source tracking",
    ],
    stack: ["Next.js", "Payments", "Tailwind", "REST APIs"],
    visual: "tiles",
    tone: "#f4f1ec",
  },
];

export const shipped = [
  {
    what: "Swapped the pincode field for a city dropdown",
    result: "Fewer drop-offs, more leads, ₹75L saved in ad spend",
  },
  {
    what: "Rebuilt how homelane.com loads",
    result: "Lighthouse 50 → 80+",
  },
  {
    what: "Moved 30+ landing pages into one Strapi template",
    result: "Marketing ships pages without a developer",
  },
  {
    what: "Added first-touch source tracking to three products",
    result: "Every lead knows where it came from",
  },
  {
    what: "Built 8+ pages on homelane.com",
    result: "Reviews, Interior, Bedroom, Bathroom, Offerings, Decko, Partner, Cities",
  },
  {
    what: "Fixed an OTP bug blocking form completion",
    result: "Live in production within a day",
  },
];

export const sideProjects = [
  {
    name: "TextToHand AI",
    url: "https://texttohandai.com",
    host: "texttohandai.com",
    line: "Type text, get it back as handwriting. Designed, built and launched end to end — 50+ daily users from organic search, zero ad spend.",
  },
  {
    name: "AgeCalcNow",
    url: "https://agecalcnow.com",
    host: "agecalcnow.com",
    line: "Your exact age in years, months and days — with seconds that tick, a birthday countdown, life milestones and a share link.",
  },
];

export const stack = [
  {
    group: "Build",
    items: ["JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Redux", "HTML5 / CSS3"],
  },
  {
    group: "Style",
    items: ["Tailwind CSS", "Sass", "Bootstrap", "Responsive layouts"],
  },
  {
    group: "Wire up",
    items: ["Strapi (headless)", "REST APIs", "OTP auth", "Payment gateways"],
  },
  {
    group: "Measure",
    items: ["WebEngage", "Microsoft Clarity", "Event tracking", "Lighthouse / CWV"],
  },
  {
    group: "Also",
    items: ["Node.js", "Express", "MongoDB", "Redis", "Git", "Claude AI"],
  },
];

export const tickerWords = [
  "React",
  "Next.js",
  "Redux",
  "Strapi",
  "Tailwind",
  "Core Web Vitals",
  "WebEngage",
  "Clarity",
  "Lead funnels",
  "TypeScript",
];

export const career = [
  {
    place: "HomeLane",
    role: "Frontend Developer",
    when: "Apr 2024 — Now",
  },
  {
    place: "HomeLane",
    role: "Frontend Intern",
    when: "Feb — Apr 2024",
    note: "Built an interactive data dashboard with dynamic filters.",
  },
  {
    place: "Tula's Institute, Dehradun",
    role: "B.Tech, Computer Science",
    when: "2020 — 2024",
  },
];
