# Grandis Innovo

## Quick start
```bash
npm install
cp .env.example .env.local   # add your real RESEND_API_KEY
npm run dev
```

## What this is
A rebuild of the uploaded 12 files (PromoBar, ThemeProvider, BackToTop, CustomCursor,
Footer, HeaderWrapper, Navbar, Motion, HomeClient, not-found, page, globals.css, layout)
into a complete, working Next.js 15 project — every missing config file added, every page
the nav/footer link to actually built, and every real bug found along the way fixed.

## Bugs found and fixed
1. **`postcss.config.js` was missing entirely.** Without it, Tailwind never processes
   `globals.css`, so every utility class in every component silently does nothing. This
   was the exact cause of the "unstyled site" issue from earlier in this project's history
   — same root cause, different codebase. Added.
2. **`brand-blue`, `brand-blue-light`, `brand-blue-50`, `brand-red` were used everywhere**
   (`bg-brand-blue`, `text-brand-red`, `border-brand-blue/20`, etc.) but never defined in a
   Tailwind config — because there was no Tailwind config. Added `tailwind.config.ts` with
   these colors matching the hex values already used inline elsewhere in the CSS
   (`#283889`, `#3a4fa3`, `#3f1119`).
3. **`Footer.tsx` used `font-800`/`font-600`**, which aren't real Tailwind classes (Tailwind
   uses named weights: `font-extrabold`, `font-semibold`). The logo text was silently
   rendering at default weight instead of bold. Fixed.
4. **The typewriter `<h1>` in `HomeClient.tsx`** cycled through words of very different
   lengths ("Websites" → "Mobile Apps" → "Ideas"), which could rewrap the line and shift
   the subtitle/buttons/social proof below it as it typed. Fixed with a fixed-width
   "ghost" span sized to the longest word, plus a `min-height` reservation on the `<h1>`
   itself.
5. **`HeaderWrapper`/`PromoBar` disagreed about visibility.** `PromoBar` checked
   `sessionStorage` itself to decide whether to render, but `HeaderWrapper` always assumed
   the promo was visible and told `Navbar` to leave 44px of space for it — so once someone
   dismissed the promo earlier in a session, later page loads would show `Navbar` still
   floating 44px too low, over an empty gap. Refactored so `HeaderWrapper` is the single
   source of truth: it checks `sessionStorage` once and passes the real state down to both
   `PromoBar` (what renders) and `Navbar` (how far down it sits).
6. **`CustomCursor`'s `cursor: none` was applied unconditionally** via a bare CSS media
   query, independent of whether the JS component actually mounted. If JS failed to load
   or errored, users would lose their cursor with nothing to replace it. Now the CSS rule
   only fires once `CustomCursor.tsx` adds a `custom-cursor-active` class to `<html>` —
   graceful degradation instead of a silent trap.
7. **Fonts were double-loaded** — `globals.css` had a Google Fonts `@import` *and*
   `layout.tsx` had proper `<link rel="preconnect">`/`<link rel="stylesheet">` tags for the
   same fonts. `@import` is also a known performance anti-pattern (it's only discovered
   after the CSS file itself downloads, adding a render-blocking step the `<link>` approach
   avoids). Removed the `@import`, kept the `<link>` approach.
8. **Anchor links to `/services#web-dev` etc. had nothing to land on** — `/services` didn't
   exist as a page. Built it with matching `id` sections and `scroll-mt-32` so the fixed
   navbar doesn't cover the target heading when you jump to it.
9. **Newsletter form in the footer had no submit handler** — typing an email and clicking
   the arrow button did nothing. Wired to a real `/api/newsletter` route.

## What's new (pages that didn't exist)
`/about`, `/services`, `/why-us`, `/portfolio`, `/contact` — all real routes, all linked
correctly from `Navbar` and `Footer`, all using the same design system (`card-base`,
`btn-primary`, `FadeIn`/`StaggerContainer`/`SectionBadge` from `Motion.tsx`) so nothing
feels bolted on. Service/portfolio/why-us content was pulled out of `HomeClient.tsx` into
`src/lib/data.ts` so the homepage and `/services` page share one source instead of two
copies that could drift apart.

## Backend
`/api/contact` and `/api/newsletter` are real route handlers: server-side Zod validation,
a honeypot field, basic IP rate limiting (documented in-memory limitation — see
`src/lib/rate-limit.ts`, same caveat as before: fine for now, swap for Upstash Redis at
real scale), and email via Resend. **There's no database** in this version — submissions
only trigger emails, nothing is stored. That's a deliberate scope choice to keep this
project's footprint lean rather than pulling in Supabase like the other build; say the
word if you want persistence added back in.

## Verified
`npx tsc --noEmit` passes clean. A real `npx next build` was run and succeeded — all 8
page routes compiled and statically generated, plus both API routes. The compiled CSS
output was inspected directly to confirm the previously-undefined brand colors, the
font-weight fix, the scroll-margin fix, and the cursor progressive-enhancement class all
actually made it into the shipped stylesheet — not just that the build didn't error.

## Manual input still needed before launch
- `RESEND_API_KEY` and a verified sending domain (update `EMAIL_FROM` in `src/lib/resend.ts`)
- Real phone/email/address (currently placeholders in `Footer.tsx` and `contact/page.tsx`)
- Real portfolio projects, testimonials, and team/company details
- `/og-cover.jpg` for social share previews (referenced in `layout.tsx` metadata, not
  currently present in `public/`)
- Update `siteUrl` in `layout.tsx`, `sitemap.ts`, and `robots.ts` if the real domain differs
