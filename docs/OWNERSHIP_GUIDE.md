# Making Grandis Innovo Yours: A Complete Customization Guide

This document walks through **every** placeholder in the project — what it is, exactly which file it lives in, and how to change it.

**Note:** this file (along with `.env.example` and `.gitignore`) went missing from the delivered project for a few rebuilds in a row — a packaging mistake, not something you did. If you're reading this, that's now fixed. If anything else ever seems to have silently vanished between deliveries, it's worth asking to double-check rather than assuming it was intentional.

---

## 1. Environment variables (`.env.local`)

**This file is never shipped to you** — it holds real secrets and should never be committed or shared. You create it yourself:
```bash
cp .env.example .env.local
```
Then fill in the real values. See Section 8 below for what each one is.

---

## 2. Company Info (contact details, registration number)

| What | Current placeholder | File | Location |
|---|---|---|---|
| Email | `hello@grandisinovo.com` | `src/components/Footer.tsx` | contact info array |
| Phone | `+234 900 000 0000` | `src/components/Footer.tsx` | same array |
| Address | `Abuja, Nigeria` | `src/components/Footer.tsx` | same array |
| Email (again) | `hello@grandisinovo.com` | `src/app/contact/page.tsx` | `mailto:` link |
| Phone (again) | `+234 900 000 0000` | `src/app/contact/page.tsx` | `tel:` link |
| Address (again) | `Abuja, Nigeria` | `src/app/contact/page.tsx` | info card |
| CAC Reg No. | `RC 1234567` | `src/lib/data.ts` | `REG_NO` constant |
| WhatsApp number | `2349000000000` | `src/lib/data.ts` | `WHATSAPP_NUMBER` constant — used by both the Contact page's "Chat on WhatsApp" button and `buildWhatsAppLink()` |

Contact info is duplicated between the footer and the contact page rather than pulled from one shared source — edit both if you change it.

---

## 3. Team Members

**File:** `src/lib/data.ts` — the `team` array. Each member has `name`, `role`, `bio`, `photo`, and `social`.

**Photos are already real** (not placeholders) — they live in `public/team/` (`ini-tom.png`, `daniel-shaku-jimjel.png`, `tope-sunday.png`, `ann-haa-fatema.png`) and are referenced via the `photo` field. To swap a photo, either replace the file at that path directly, or point `photo` at a new filename.

**Social links are still `"#"` placeholders** — replace with real profile URLs. Only the keys present (`linkedin`, `twitter`, `github`, `instagram`, `facebook`) render an icon.

---

## 4. Services

**File:** `src/lib/data.ts` — the `services` array. Feeds both the homepage strip and the full `/services` page from one place.

`anchorGroup` controls grouping on `/services` and which footer link jumps where. Valid values: `"web-dev"`, `"mobile"`, `"design"`, `"support"`, `"sales"`. Adding a new category means also updating the `groups` array in `src/app/services/page.tsx` and `footerLinks.services` in `src/components/Footer.tsx`.

---

## 5. Portfolio Projects

**File:** `src/lib/data.ts` — the `portfolioHighlights` array. Each project has `title`, `category`, `description`, `tech`, `color`, `Icon`, `image`, and `link`.

- **Thumbnails**: real files now, in `public/portfolio/` (`novamart.png`, `payvault.png`, `trustlend.png`). Replace the file at the same path, or change the `image` field to a new filename.
- **Project links**: currently all `"#"` placeholders. Each card (on both the homepage and `/portfolio`) is a real clickable link that opens in a new tab — just replace `link: "#"` with the real project URL or case-study URL.
- **The projects themselves are still fictional examples** (NovaMart, PayVault, TrustLend) — replace `title`/`category`/`description`/`tech` with your real work.

---

## 6. Testimonials

**File:** `src/app/HomeClient.tsx` — search for `const testimonials = [`. Not moved into `data.ts`, so this is the only place they exist. Still fictional example quotes — replace with real ones.

---

## 7. Contact Form (Formspree)

The contact form submits directly to Formspree — no backend code of ours involved.

1. Sign up at [formspree.io](https://formspree.io), create a form, copy the endpoint (`https://formspree.io/f/xxxxxxxx`).
2. Put it in `.env.local` as `NEXT_PUBLIC_FORMSPREE_ENDPOINT`.
3. Add the same variable in your hosting provider's dashboard for production.
4. Formspree emails you a confirmation link the first time — click it before submissions start working.

**`src/app/api/contact/route.ts` and `src/lib/resend.ts` are currently unused dead code** — the form was switched to Formspree and nothing calls that route anymore. Safe to delete if you want a cleaner codebase, or leave it if you might switch back.

The newsletter signup in the footer still uses Resend separately — see Section 8.

---

## 8. Newsletter Email (Resend)

1. Sign up at [resend.com](https://resend.com), verify a sending domain you own.
2. In `.env.local`: `RESEND_API_KEY=...` and `CONTACT_NOTIFY_EMAIL=...`.
3. Update `EMAIL_FROM` in `src/lib/resend.ts` to an address on your verified domain.
4. Add the same env vars in your hosting dashboard for production.

---

## 9. Navigation & Footer Links

**Nav:** `src/components/Navbar.tsx` — `navLinks` array drives both desktop and mobile menu.
**Footer:** `src/components/Footer.tsx` — `footerLinks` object (`company`, `services`, `social` arrays).

New page = new folder under `src/app/` + an entry in the relevant array above + a route in `src/app/sitemap.ts`.

---

## 10. Brand Colors, Fonts & Logo

**Colors:** `tailwind.config.ts` → `brand-blue`, `brand-blue-light`, `brand-blue-50`, `brand-red`. Note: dark mode's blue (`#4a6cf7`) is hardcoded inline in many `dark:` classes rather than pulled from this config — search-and-replace it too if you change the blue.

**Fonts:** loaded via `<link>` tags in `src/app/layout.tsx`'s `<head>` (Syne + DM Sans), matched to `--font-syne`/`--font-dm` in `src/app/globals.css`.

**Logo:** real file now, `public/logo.svg`, referenced via `<Image>` in both `src/components/Navbar.tsx` and `src/components/Footer.tsx` — replace the file, or update both references if you rename it.

---

## 11. Domain & SEO

| File | What to change |
|---|---|
| `src/app/layout.tsx` | `metadataBase`, `openGraph.url` |
| `src/app/sitemap.ts` | `siteUrl` |
| `src/app/robots.ts` | `sitemap:` field |

`/og-cover.jpg` (social preview image) and a favicon are both referenced/expected but not present in `public/` — add them before launch.

---

## 12. Deployment (Vercel)

```bash
npm install
git init && git add . && git commit -m "Initial commit"
git remote add origin <your-repo-url> && git push -u origin main
```
Import into Vercel → auto-detects Next.js → add the env vars from Sections 7–8 → Deploy.

---

## Quick-Start Checklist

- [ ] `.env.local` created with real Formspree endpoint + (optionally) Resend keys
- [ ] Real email, phone, address, Reg No., WhatsApp number (Section 2)
- [ ] Real team social links (Section 3 — photos already done)
- [ ] Review the 6 services (Section 4)
- [ ] Real portfolio projects, thumbnails already swapped, links still need real URLs (Section 5)
- [ ] Real testimonials (Section 6)
- [ ] Formspree confirmation email clicked (Section 7)
- [ ] Real domain in `layout.tsx`, `sitemap.ts`, `robots.ts` (Section 11)
- [ ] `/og-cover.jpg` + favicon (Section 11)
- [ ] Deploy to Vercel (Section 12)
