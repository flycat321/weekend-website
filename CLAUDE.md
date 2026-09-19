# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WEEKEND is a zero-carbon weekend lifestyle platform (零碳周末生活方式平台) built with Next.js 14 App Router. It's a Chinese-language accommodation booking site showcasing eco-friendly vacation properties. The project was scaffolded with v0.dev, then significantly redesigned with Raus.life (German cabin rental platform) as the UX benchmark.

**Current state:** Frontend-only with mock/hardcoded data. No backend API, database, or authentication system is integrated yet. All mock data is centralized in `lib/data.ts`.

**Design benchmark:** https://www.raus.life/ — a boutique cabin rental platform in Germany/Austria. Key takeaways applied to this project:
- Experience/extras as an independent product line (not buried in detail pages)
- Transparent "staying with us" guide with honest limitations
- Journal/editorial content for brand building
- Gift cards for viral growth
- Local partner ecosystem model

## Commands

```bash
yarn dev        # Start dev server on http://localhost:3000
yarn build      # Production build (ESLint & TypeScript errors are ignored via next.config.mjs)
yarn start      # Run production build
yarn lint       # Run ESLint
```

## Architecture

### Routing (App Router)

**User-facing pages:**
- `/` — Homepage: hero (framer-motion parallax), value proposition, products/services tabs, tech showcase, carbon calculator, community, brand story, CTA
- `/stay` — Accommodation listing with filters (date, region, guests, amenities), Reveal scroll animations
- `/stay/[id]` — Accommodation detail with sidebar booking panel, features, explore items, FAQ
- `/house` — Weekend House product page with features, specs, process steps
- `/house/order` — House customization: exterior materials, power system, addons with live price calculation
- `/experience` — Extras & Experiences: activities, culinary, goodies, Digital Detox (inspired by Raus /extras)
- `/guide` — Staying with us: cabin features carousel, always-included amenities, season tips, honest limitations, packing list (inspired by Raus /staying-with-us)
- `/journal` — Editorial blog: user stories, nature notes, mindfulness, zero-carbon knowledge
- `/gift` — Gift card builder with amount selection and live preview
- `/about` — Brand story, core values, development timeline
- `/contact` — Contact form with validation
- `/terms` — Terms of service
- `/privacy` — Privacy policy
- `/search` — Redirects to `/stay`

**Admin pages:**
- `/admin` — Login (hardcoded: username `admin`, password `weekend123`)
- `/admin/dashboard` — Dashboard with recharts (line chart, pie chart), KPI cards
- `/admin/content` — Content management (mock CRUD)
- `/admin/content-manager` — Content listing
- `/admin/content-manager/edit/[id]` — Content editor

### Component Organization

```
components/
├── brand/          — Logo SVG component (leaf+house icon)
├── home/           — Homepage sections (5 components extracted from page.tsx)
│   ├── value-proposition.tsx
│   ├── products-services.tsx
│   ├── community-section.tsx
│   ├── brand-story.tsx
│   └── cta-section.tsx
├── motion/         — Animation utilities
│   └── reveal.tsx  — Scroll-triggered reveal (framer-motion + useInView)
├── search/         — Map component (Leaflet, currently unused)
├── admin/          — Admin panel components
├── ui/             — shadcn/ui library (60+ components)
├── navbar.tsx      — Responsive nav with Logo, NavigationMenu, mobile Sheet
├── footer.tsx      — Newsletter subscription, link columns, social links
├── hero-section.tsx — Parallax hero with framer-motion, CountUp stats, particles
├── product-showcase.tsx — 3D tilt effect, hotspot markers, tech specs tabs
└── carbon-calculator.tsx — recharts BarChart, live calculation with sliders
```

### Shared Data Layer

- `lib/types.ts` — Canonical `House`, `Feature`, `ExploreItem`, `FAQItem` types
- `lib/data.ts` — All mock house data (6 houses), centralized. Exports `mockHouses`, `getHouseById()`, `allRegions`
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

### Design System

- **shadcn/ui** with CSS variables (`components.json`)
- **Brand colors** defined as CSS custom properties in `app/globals.css`:
  - `--brand-turquoise: 174 100% 40%` (primary teal)
  - `--brand-earth: 30 21% 44%` (warm brown)
  - `--brand-cream: 36 33% 97%` (warm background)
  - `--brand-forest: 150 30% 20%` (deep green)
- **Tailwind brand tokens:** `brand-turquoise`, `brand-earth`, `brand-cream`, `brand-forest`
- **Fonts:** Noto Sans SC (body, `--font-sans`) + Noto Serif SC (headings, `--font-serif`) via `next/font/google`
- **Icons:** lucide-react
- **Animations:** framer-motion for scroll reveals, parallax, tab transitions; CSS keyframes for float, ripple, particle-drift
- **Dark/light mode:** next-themes ThemeProvider (default: light)

### Key Patterns

- **Path alias:** `@/*` maps to project root
- **Reveal animation:** `<Reveal direction="up" delay={0.1}>` wraps sections for scroll-triggered entrance
- **Image strategy:** ALL images are local (`/public/*.avif`, `/house-new1.png`). No external image URLs — Unsplash is unreliable in China network environment
- **Forms:** react-hook-form + zod for validation
- **Charts:** recharts for carbon calculator and admin dashboard

### Build Configuration

- `next.config.mjs`: ESLint and TypeScript errors ignored during builds; image optimization disabled (`unoptimized: true`)
- `tailwind.config.ts`: Container max-width 1400px, padding 2rem; brand colors; custom animations; tailwindcss-animate plugin
- Language: `zh-CN` set in root layout html tag

## Important Notes

### Image Loading
- **Never use Unsplash or external image URLs** — they timeout in China (>5s). Always use local images from `/public/`
- Available local images: `house1-8.avif` (cabin photos), `house-new1.png` (product render)
- For images inside `<Reveal>` wrappers, add `loading="eager"` or `priority` — framer-motion's initial opacity prevents browser lazy loading from triggering
- The `Reveal` component uses `opacity: 0.01` (not `0`) as initial state to allow browser image preloading

### Framer Motion
- `framer-motion` is used for: hero parallax (`useScroll` + `useTransform`), section reveals (`useInView`), product showcase 3D tilt (`useMotionValue`), tab transitions (`AnimatePresence`)
- The `Reveal` component in `components/motion/reveal.tsx` is the core animation wrapper used across all pages

### Mock Data
- All house data lives in `lib/data.ts` — do NOT duplicate data in page components
- House IDs 1-6 map to `/house1-6.avif` images
- Each house has: basic info, features, travel times, explore items, FAQs, host info, getting-there directions

### Design Decisions
- Homepage was refactored from 449-line monolith into 5 extracted sub-components + page.tsx as composition root
- `/search` redirects to `/stay` (previously duplicate pages)
- Admin pages are retained for demo purposes (login + dashboard only)
- Font choice: Noto Sans/Serif SC specifically for Chinese market premium feel
- Rounded-full buttons (`rounded-full px-6`) are the standard CTA style
