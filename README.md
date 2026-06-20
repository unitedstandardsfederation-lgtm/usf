# United Standards Federation (USF) — Homepage

A world-class, enterprise-grade homepage for the **United Standards Federation (USF)**, an internationally focused federation advancing standards, certification, education, innovation, collaboration, workforce development, and sustainable growth.

The site is designed to feel like a real, multi-decade international institution — comparable to the World Economic Forum, ISO, IEEE, the International Chamber of Commerce, and UN agencies — not a SaaS landing page, agency template, or AI-generated layout.

---

## Tech Stack

- **React 18** + **Vite 5** (fast dev server, instant HMR)
- **Tailwind CSS 3** with a fully custom USF design system (brand colors, typography scale, institutional components)
- **Framer Motion** for restrained, professional scroll-reveal animations
- **Lucide React** for institutional iconography
- **Source Serif 4** + **Inter** typography pair (editorial display + modern UI)
- **Custom SVG world map** with federation nodes, connection arcs, and pulse animations (no third-party map dependency)

No image assets are bundled — the entire site is rendered programmatically with SVG, type, and tokens.

## Brand System

| Token | Hex |
|---|---|
| Primary Blue | `#0C2B5B` |
| Dark Navy | `#081E40` |
| Federation Red (accent only) | `#D6141B` |
| White | `#FDFDFD` |
| Light Gray | `#F5F7FA` |
| Text | `#1A1A1A` |
| Muted Text | `#666666` |

Blue dominates the identity. Red is used strategically for primary buttons, eyebrow rules, accent lines, and federation nodes — never decoratively.

## Sections (in render order)

1. **Navbar** — utility bar + sticky main header + condensed sub-nav (8 menu items + Become a Member CTA)
2. **Hero** — full-bleed dark navy panel with the custom dotted world map, headline, lead copy, two CTAs, side "Federation Brief" card, and federation pillars row
3. **Global Stats** — overlapping institutional stat card (animated counters, qualitative activity strip)
4. **Global Ecosystem** — four partner cards (Industry / Education / Government / Non-Profit)
5. **About USF** — editorial split with mandate copy, fact grid, and pull quote
6. **Mission & Vision** — two-panel mandate block with roman numeral typography
7. **Core Services (What We Do)** — eight premium service cards on a deep blue band
8. **Why Organisations Join USF** — six benefit cards with hover-invert states
9. **Industries We Support** — twelve sector tiles with committee numbering
10. **Global Consortium** — radial connection diagram with six stakeholder pills
11. **International Development** — six development pillars
12. **Global Presence** — interactive labelled world map + timeline of seven federation countries
13. **Leadership** — four executive council cards with stylised portraits
14. **Membership** — eight benefit chips + three membership tiers (Institutional / Affiliate / Partner)
15. **Final CTA** — dark navy join panel with Secretariat office card
16. **Footer** — six-column institutional footer with newsletter, social, and legal strip

## Local Development

```bash
npm install
npm run dev
```

Open <http://localhost:5173>.

## Production Build

```bash
npm run build
npm run preview
```

The static build is emitted to `dist/`.

## Project Layout

```
src/
  App.jsx                # Section composition
  index.css              # Tailwind layers + USF component classes
  main.jsx               # React root
  components/
    Navbar.jsx
    Hero.jsx
    WorldMap.jsx         # Custom SVG dotted world map (used in Hero + Global Presence)
    GlobalStats.jsx
    Ecosystem.jsx
    About.jsx
    MissionVision.jsx
    Services.jsx
    WhyJoin.jsx
    Industries.jsx
    GlobalConsortium.jsx
    InternationalDevelopment.jsx
    GlobalPresence.jsx
    Leadership.jsx
    Membership.jsx
    FinalCTA.jsx
    Footer.jsx
tailwind.config.js       # USF color tokens + typography + animations
vite.config.js
index.html               # Google Fonts (Source Serif 4 + Inter)
```

## Design Principles Applied

- **Editorial typography hierarchy** — serif display headings, Inter UI body
- **Strategic whitespace** — generous vertical rhythm, restrained card density
- **Alternating sections** — light / navy / dark navy bands, not a repeating SaaS grid
- **Eyebrow rule pattern** — uppercase eyebrows with a red prefix bar replace generic "labels"
- **Hairline borders** — institutional 1px dividers instead of drop shadows
- **Roman numerals / committee codes** — small numeric tokens add institutional polish
- **No glassmorphism, neon, gradients, or crypto/startup aesthetics**

---

© United Standards Federation (USF). All Rights Reserved.
