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
- **d3-geo** + **topojson-client** + **world-atlas** for the orthographic earth visualization in the hero
- **Custom SVG world map** with federation nodes, connection arcs, and pulse animations (no third-party map dependency)

No image assets are bundled — the entire site is rendered programmatically with SVG, type, and tokens.

## Content Editing (for non-developers)

All copy on the homepage lives in a single file:

```
src/content/site.json
```

Editing this file changes every visible text on the site — hero, about,
services, leadership bios, contact details, footer — without touching any
code. A non-technical owner can edit it directly on github.com.

See **[HOW-TO-EDIT.md](./HOW-TO-EDIT.md)** for a full, illustrated guide.

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

## Deployment — Cloudflare Pages

The site is built as a static SPA and deploys cleanly to Cloudflare Pages
(free tier). Every push to `main` rebuilds and goes live automatically.

### One-time setup

1. Push the repository to GitHub (already done at `higleemy-gif/usf`).
2. Sign in to <https://dash.cloudflare.com/?to=/:account/pages> and choose
   **Create application → Pages → Connect to Git**.
3. Select the `higleemy-gif/usf` repository and authorise Cloudflare.
4. Configure the build:

   | Setting                       | Value           |
   | ----------------------------- | --------------- |
   | Framework preset              | **Vite**        |
   | Build command                 | `npm run build` |
   | Build output directory        | `dist`          |
   | Root directory                | `/` (default)   |
   | Node version (env. variable)  | `NODE_VERSION=20` |

5. Click **Save and Deploy**. First build takes ~1 minute.
6. (Optional) Add the custom domain under **Custom domains**.

### How rebuilds happen

- Every commit on `main` triggers a production deploy.
- Every commit on any other branch / PR triggers a preview deploy with its
  own URL — useful for reviewing edits before merging to `main`.

### What's bundled in this repo for Cloudflare

- `public/_redirects` — SPA fallback so deep links resolve to `index.html`.
- `public/_headers` — caching strategy: hashed assets cached for a year,
  HTML revalidated every request, plus baseline security headers.
- `package.json → engines.node` — Node 18+ pin.

## Project Layout

```
src/
  App.jsx                # Section composition
  index.css              # Tailwind layers + USF component classes
  main.jsx               # React root
  content/
    site.json            # ← All editable copy lives here (see HOW-TO-EDIT.md)
  components/
    Navbar.jsx
    Hero.jsx
    EarthGlobe.jsx       # Orthographic d3-geo earth (hero background)
    WorldMap.jsx         # Custom SVG dotted world map (Global Presence)
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
public/
  usf-logo.png
  _redirects             # Cloudflare Pages SPA fallback
  _headers               # Cloudflare Pages caching + security headers
tailwind.config.js       # USF color tokens + typography + animations
vite.config.js
index.html               # Google Fonts (Source Serif 4 + Inter)
HOW-TO-EDIT.md           # Non-technical content editing guide
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
