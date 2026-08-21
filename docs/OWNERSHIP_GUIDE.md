# Grandis Innovo — Ownership & Customization Guide

## What happened here (read this first)

This project used to be two different builds tangled together in one folder — different
fonts, different components, different data files (`site-config.ts` *and* `data.ts` both
existed). Nothing in navigation linked to half of it, but it was still live on the deployed
site, still compiling, and still pulling in dependencies (`@supabase/*`, `react-hook-form`)
that were the direct cause of the repeated "module not found" build failures chased down
across many rounds of debugging.

This version is a clean consolidation: **one design system, one data file, every route
reachable from navigation, nothing orphaned.** If anything below looks unfamiliar compared
to an earlier version of the site, this is why.

## Routes (all 8, all real, all linked from nav + footer)
`/`, `/about`, `/team`, `/services`, `/pricing`, `/why-us`, `/portfolio`, `/faq`, `/contact`

`/pricing`, `/faq`, and `/team` are new — built fresh in this project's actual design system
(not carried over from the other build), using `card-base`, `btn-primary`, `FadeIn` /
`StaggerContainer` / `SectionBadge` from `components/ui/Motion.tsx`, same as every other page.

## Where everything lives

**Company info, Reg No., WhatsApp number** — `src/lib/data.ts` (`REG_NO`, `WHATSAPP_NUMBER`,
`buildWhatsAppLink()`). Contact details themselves (email/phone/address) are still duplicated
between `Footer.tsx` and `contact/page.tsx` — edit both if you change them.

**Team** — `src/lib/data.ts`, the `team` array. Feeds both the `/team` page and the "Meet the
Team" mention on `/about`. Real photos already in `public/team/`.

**Services** — `src/lib/data.ts`, the `services` array. Feeds the homepage strip and `/services`.

**Pricing** — `src/lib/data.ts`, the `pricingPlans` array. **Prices are placeholders** — replace
with real figures before launch.

**FAQ** — `src/lib/data.ts`, the `faqs` array. Feeds `/faq`'s accordion (the actual accordion
logic lives in `src/app/faq/FAQAccordion.tsx`, split out from `page.tsx` because a page can't
be both a Client Component and export `metadata` at the same time).

**Portfolio** — `src/lib/data.ts`, `portfolioHighlights`. Real projects with real links to live
Netlify deployments — already done, not a placeholder.

**Testimonials** — `src/app/HomeClient.tsx`, search `const testimonials`. Only place they live;
not in `data.ts`.

**Contact form** — `src/app/contact/ContactForm.tsx`. Posts directly to Formspree
(`NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `.env.local`, currently defaulted in code too). No backend
route of ours involved — `src/app/api/contact/` doesn't exist anymore, it was dead code calling
nothing.

**Newsletter (footer)** — `src/app/api/newsletter/route.ts`, using Resend
(`RESEND_API_KEY` / `CONTACT_NOTIFY_EMAIL` in `.env.local`).

**Nav / footer links** — `src/components/Navbar.tsx` (`navLinks`) and `src/components/Footer.tsx`
(`footerLinks`). Add a new page → add it here → add it to `src/app/sitemap.ts` too.

**Colors / fonts / logo** — `tailwind.config.ts` (`brand-blue`, `brand-blue-light`,
`brand-blue-50`, `brand-red` — note dark mode's blue, `#4a6cf7`, is hardcoded inline in many
`dark:` classes rather than pulled from config, so change both if you touch it). Fonts via
`<link>` tags in `layout.tsx`. Logo: `public/GI LOG.svg`, referenced in `Navbar.tsx` and
`Footer.tsx`.

## What was removed, and why
- `@supabase/supabase-js`, `@supabase/ssr`, `react-hook-form`, `@hookform/resolvers`,
  `embla-carousel-react`, `next-sitemap` — all only used by the other build's leftover files,
  which are now deleted. Removing them cut the install from ~419 packages to ~344, and
  eliminates the specific packages that were silently failing to install throughout this
  project's build troubleshooting.
- `src/lib/site-config.ts`, `src/lib/supabase/`, `src/components/layout/`,
  `src/components/sections/`, `src/components/shared/`, `supabase/` (migrations) — the other
  build's files, none reachable from navigation, all deleted.
- Duplicate logo/team photo files in `public/` that weren't referenced anywhere.

## Known limitation, stated plainly
Contact info (email/phone/address) is still duplicated across two files instead of pulled from
one shared source (`Footer.tsx` and `contact/page.tsx` both hardcode it). Small, contained fix
if you want it centralized later — not urgent.

## Deployment
```
npm install
git add .
git commit -m "Consolidate to single design system"
git push
```
Vercel will pick up the push automatically if already connected. Set
`NEXT_PUBLIC_FORMSPREE_ENDPOINT`, `RESEND_API_KEY`, and `CONTACT_NOTIFY_EMAIL` in Vercel's
Environment Variables settings, same as `.env.local`.
