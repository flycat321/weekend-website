# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WEEKEND is a zero-carbon weekend lifestyle platform (零碳周末生活方式平台) built with Next.js 14 App Router. It's a Chinese-language accommodation booking site showcasing eco-friendly vacation properties. The project was scaffolded with v0.dev.

**Current state:** Frontend-only with mock/hardcoded data. No backend API, database, or authentication system is integrated yet.

## Commands

```bash
yarn dev        # Start dev server on http://localhost:3000
yarn build      # Production build (ESLint & TypeScript errors are ignored via next.config.mjs)
yarn start      # Run production build
yarn lint        # Run ESLint
```

## Architecture

### Routing (App Router)

- `/` — Homepage: hero section, product showcase, carbon calculator
- `/stay` — Accommodation listing with filters (date, region, guests, amenities)
- `/stay/[id]` — Accommodation detail page
- `/house` — House/product information
- `/house/order` — House ordering/customization
- `/search` — Search with Leaflet map integration
- `/admin` — Admin login (hardcoded: username `admin`, password `weekend123`)
- `/admin/dashboard` — Statistics and activity logs
- `/admin/content` — CMS visual editor
- `/admin/content-manager` — Content listing
- `/admin/content-manager/edit/[id]` — Content block editor
- `/admin/media`, `/admin/forum`, `/admin/users` — Management pages (with loading states)

### Component Organization

- `components/ui/` — shadcn/ui component library (60+ components, installed via `npx shadcn@latest add`)
- `components/admin/` — Admin panel components (sidebar, header, content editors)
- `components/` (root) — Feature components: `navbar.tsx`, `footer.tsx`, `hero-section.tsx`, `product-showcase.tsx`, `carbon-calculator.tsx`, `search/map-component.tsx`

### Design System

- **shadcn/ui** with default style, neutral base color, CSS variables enabled (`components.json`)
- Colors defined as HSL CSS variables in `app/globals.css` with dark mode support (note: `styles/globals.css` also exists but is not imported)
- Brand colors: turquoise (`#00CED1`) and brown (`#8B7355`)
- Icons: `lucide-react`
- Font: Inter (via `next/font/google`)
- Dark/light mode via `next-themes` ThemeProvider (default: light)

### Key Patterns

- **Path alias:** `@/*` maps to project root
- **Class names:** Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge)
- **Content types:** Block-based CMS types defined in `types/content.ts` — `HeadingBlock`, `TextBlock`, `ImageBlock`, `FeaturesBlock`, `GalleryBlock` composed as `ContentBlock` union type
- **Maps:** Leaflet/react-leaflet for property location maps
- **Forms:** react-hook-form + zod for validation
- **Charts:** recharts for data visualization

### Build Configuration

- `next.config.mjs`: ESLint and TypeScript errors ignored during builds; image optimization disabled (`unoptimized: true`)
- `tailwind.config.ts`: Container max-width 1400px, padding 2rem; tailwindcss-animate plugin
- Language: `zh-CN` set in root layout html tag
