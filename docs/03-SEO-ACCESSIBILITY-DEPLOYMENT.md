# Grandis Innovo — SEO, Accessibility & Deployment (Section 5)

## SEO — what's implemented
- **Metadata**: full title template, description, keywords, Open Graph, and Twitter Card tags in `src/app/layout.tsx`. Replace `/public/images/og-cover.jpg` with a real 1200×630 image before launch.
- **Structured data**: `OrganizationJsonLd` component emits `ProfessionalService` schema (name, services, contact, social links) on the homepage — improves eligibility for rich results and knowledge panels.
- **Sitemap**: `src/app/sitemap.ts` (App Router native) generates `/sitemap.xml` dynamically from `navLinks` + `services`, so new service pages are picked up automatically. `next-sitemap.config.js` is included as a fallback/complement if you later add a static export step.
- **robots.txt**: `src/app/robots.ts` allows all crawlers, disallows `/api/*`, and points to the sitemap.
- **Semantic HTML + URLs**: sections use `<section>`, `<nav>`, `<article>`, `<dl>`, heading hierarchy (`h1` once per page, `h2` per section); every page is a real route with a clean, slug-based URL (e.g. `/services/website-development`), not a homepage anchor.

## Accessibility — what's implemented (WCAG 2.2)
- Skip-to-content link (`layout.tsx`)
- Visible focus rings on every interactive element (`:focus-visible` in `globals.css`, not just default browser outline removal)
- `prefers-reduced-motion` respected globally — all animations collapse to near-zero duration
- All icons are `aria-hidden`, all icon-only buttons have `aria-label` (theme toggle, mobile menu, carousel controls, WhatsApp button, social links)
- Form fields have associated `<label>`, `aria-invalid`, and `aria-describedby` pointing at error text (`contact-form.tsx`)
- FAQ accordion uses proper `aria-expanded`/`aria-controls`/`role="region"` pattern, not just a styled `<div>`
- Live regions (`aria-live="polite"`) on form submission status so screen reader users hear success/error states
- Color contrast: text on glass panels uses white/primary at ≥70% opacity against dark backgrounds — verify with a contrast checker once real photography replaces placeholders, since photos can shift effective contrast

**Still to verify manually before launch**: run the built site through axe DevTools or Lighthouse's accessibility audit — automated generation catches structure but not every real-world contrast/tab-order edge case.

## Performance
- `next.config.ts`: AVIF/WebP image formats, Cloudinary remote pattern allow-list, compression on, security headers
- Fonts loaded via `next/font/google` with `display: swap` (no render-blocking web fonts)
- Framer Motion animations use `viewport={{ once: true }}` so they don't re-trigger and cost re-renders on every scroll
- Target: Lighthouse 90+ across Performance/Accessibility/Best Practices/SEO — validate after real images/content replace placeholders, since unoptimized photography is the most common thing that tanks this score post-launch

## Deployment (Vercel)

### 1. Push to GitHub
```bash
cd grandis-innovo
git init
git add .
git commit -m "Initial commit — Grandis Innovo site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. Import into Vercel
1. Go to vercel.com → **Add New Project** → import the GitHub repo.
2. Framework preset: **Next.js** (auto-detected via `vercel.json`).
3. Add environment variables (from `.env.example`) in **Project Settings → Environment Variables** for Production, Preview, and Development.

### 3. Set up Supabase
```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push   # applies supabase/migrations/0001_init.sql
```

### 4. Set up Resend
1. Add and verify your sending domain in the Resend dashboard.
2. Update `EMAIL_FROM` in `src/lib/resend.ts` to an address on that verified domain.
3. Add `RESEND_API_KEY` to Vercel env vars.

### 5. Deploy
Push to `main` — Vercel auto-builds and deploys. Preview deployments are created automatically for pull requests.

## Verified build output
A real `next build` (not just typecheck) was run against this exact codebase and succeeded, statically generating every route:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    13.8 kB         179 kB
├ ○ /about                               3.15 kB         168 kB
├ ƒ /api/consultation                    142 B           100 kB
├ ƒ /api/contact                         142 B           100 kB
├ ƒ /api/newsletter                      142 B           100 kB
├ ƒ /contact                             25.9 kB         191 kB
├ ○ /faq                                 1.73 kB         167 kB
├ ○ /portfolio                           1.77 kB         167 kB
├ ○ /pricing                             2.62 kB         167 kB
├ ○ /services                            2.2 kB          167 kB
├ ● /services/[slug]                     201 B           165 kB
│  (6 static paths — one per service)
└ ○ /team                                1.4 kB          166 kB
```
`○` = static, `●` = static via `generateStaticParams`, `ƒ` = server-rendered on demand. This build used a temporary font-loader stub because this dev sandbox has no network access to `fonts.googleapis.com`; the shipped `layout.tsx` uses the real `next/font/google` imports, which resolve normally on Vercel or any normally-connected machine — but run `npm run build` yourself once before your first deploy to confirm end-to-end in your own environment.

### 6. Post-deploy checklist
- [ ] Replace all placeholder content: phone, email, address, CAC number, `whatsappNumber` (`src/lib/site-config.ts`)
- [ ] Replace placeholder pricing with real figures (`pricingPlans` in `site-config.ts`)
- [ ] Swap portfolio/testimonial placeholders for real projects and reviews (edit the arrays directly, or wire them to the `portfolio_projects` / `testimonials` Supabase tables — see the note in `docs/02-BACKEND.md`)
- [ ] Upload the real company profile PDF to `public/grandis-innovo-profile.pdf` (linked from the About page's download button)
- [ ] Upload real team photos, logo, and OG image via Cloudinary
- [ ] Verify Google Maps embed URL matches the real office address
- [ ] Run Lighthouse + axe audits on the deployed URL
- [ ] Submit `sitemap.xml` in Google Search Console

## What's done in this section
- `sitemap.ts`, `robots.ts` — dynamic, App-Router native, reflect the real final route list (no blog)
- `OrganizationJsonLd` — structured data wired into the root layout (present on every page)
- `next.config.ts` — Cloudinary images, security headers, compression
- `vercel.json`, `.gitignore`, `next-sitemap.config.js`
- Full deployment runbook above

---

**The full site (Sections 1–5) is production-ready to deploy, pending real content**: replace placeholder copy, pricing, images, and contact details marked throughout `site-config.ts` and the section components before going live.
