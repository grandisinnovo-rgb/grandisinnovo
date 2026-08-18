# Grandis Innovo — Architecture

## Tech stack
- **Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS
- **Animation:** Framer Motion (component-level) + Embla Carousel (testimonials)
- **Backend:** Next.js Route Handlers + Supabase (Postgres — leads, bookings, newsletter, testimonials, portfolio)
- **Email:** Resend (contact form, consultation booking, newsletter confirmations)
- **Forms:** React Hook Form + Zod
- **Images:** Cloudinary (remote loader configured in `next.config.ts`)
- **Icons:** lucide-react
- **Deployment:** Vercel

## Routes (all real, independent pages — not homepage anchors)
| Route | File | Notes |
|---|---|---|
| `/` | `src/app/page.tsx` | Landing page: Hero, Why Us, Services preview, Testimonials, Pricing teaser |
| `/about` | `src/app/about/page.tsx` | Mission, core value, Why Us, full Team, company profile PDF download |
| `/services` | `src/app/services/page.tsx` | Full services grid |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | Statically generated for all 6 services (`generateStaticParams`) |
| `/portfolio` | `src/app/portfolio/page.tsx` | Filterable project grid |
| `/team` | `src/app/team/page.tsx` | Full team grid |
| `/pricing` | `src/app/pricing/page.tsx` | 3 tiers + FAQ |
| `/faq` | `src/app/faq/page.tsx` | Standalone FAQ accordion |
| `/contact` | `src/app/contact/page.tsx` | Contact form + WhatsApp automation + consultation booking |
| `/api/contact` | route handler | Validates, rate-limits, writes to Supabase, sends email via Resend |
| `/api/consultation` | route handler | Same pattern for consultation bookings |
| `/api/newsletter` | route handler | Newsletter signups |
| `/sitemap.xml`, `/robots.txt` | `sitemap.ts`, `robots.ts` | Dynamic, includes every static route + all service slugs |

Every page is wrapped in `<SiteShell>` (`src/components/layout/site-shell.tsx`), which provides the promo banner, sticky header, footer, scroll-progress bar, and the floating WhatsApp button consistently — so no page duplicates that wiring.

**Note on scope:** there is no blog. It was in the original brief but was explicitly removed at the client's request, along with the live chat widget. `robots.ts`/`sitemap.ts`/nav/footer all reflect this — there are no dangling `/blog` links anywhere.

## Folder structure
```
grandis-innovo/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # fonts, metadata, theme provider, sitewide JSON-LD
│   │   ├── globals.css           # design tokens, glass/gradient utilities
│   │   ├── page.tsx              # home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── services/[slug]/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── team/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── api/{contact,consultation,newsletter}/route.ts
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/               # site-shell, header, footer, promo-banner
│   │   ├── sections/             # hero, services, team, portfolio, testimonials,
│   │   │                         # pricing, faq, contact, contact-form, consultation-booking
│   │   ├── ui/                   # section-heading, theme-toggle
│   │   └── shared/                # theme-provider, scroll-progress, whatsapp-button, json-ld
│   ├── lib/
│   │   ├── site-config.ts        # single source of truth: company info, nav, services, team,
│   │   │                         # pricing, and the buildWhatsAppLink() automation helper
│   │   ├── validations.ts        # Zod schemas
│   │   ├── utils.ts              # cn() helper
│   │   ├── rate-limit.ts
│   │   ├── resend.ts
│   │   └── supabase/{client,server}.ts
├── supabase/migrations/0001_init.sql
├── public/images/
├── tailwind.config.ts
├── next.config.ts
├── vercel.json
└── docs/
```

## Design system (locked from brief)
| Token | Value | Use |
|---|---|---|
| `primary` | `#0B1020` | base dark surface |
| `secondary` | `#2563EB` | links, primary CTAs |
| `accent` | `#7C3AED` | highlights, focus glow |
| `dark` | `#030712` | dark theme background |
| `glass` | `rgba(255,255,255,0.08)` | glass panels |
| gradient | Blue → Purple → Cyan | hero, buttons, dividers |

Fonts: **Sora** (display/headings), **Inter** (body), **Space Grotesk** (mono/data/labels), loaded via `next/font/google`.

## Signature visual motif
A "circuit trace" divider/background (`.trace-divider`, `bg-trace-lines`) reflects Grandis Innovo's dual identity — software and hardware — instead of a generic gradient blob.

## Verified build
`npx tsc --noEmit` passes with zero errors. A full `next build` was run (with a temporary font-loader stub, since this sandbox can't reach `fonts.googleapis.com`) and successfully compiled and statically generated all 9 page routes plus the 3 API routes — see `docs/03-SEO-ACCESSIBILITY-DEPLOYMENT.md` for the real build output. The Google Fonts loader itself is untouched in the shipped code; it will resolve normally on Vercel or any machine with normal internet access.
