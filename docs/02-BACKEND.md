# Grandis Innovo — Backend (Section 4)

## Database (Supabase / Postgres)
Schema lives in `supabase/migrations/0001_init.sql`. Tables:

| Table | Purpose |
|---|---|
| `contact_submissions` | Every contact form lead |
| `consultation_bookings` | Free consultation requests |
| `newsletter_subscribers` | Footer newsletter signups |
| `testimonials` | Editable client reviews |
| `portfolio_projects` | Editable portfolio |

**Row Level Security** is enabled on every table:
- The public `anon` key can only **insert** into leads/newsletter tables (never read them back) and can only **select** rows marked `published`/`is_published` on content tables.
- Admin read/write (a future dashboard) needs an authenticated Supabase role — not built in this pass, since no admin UI was requested. Note this if you want a CMS dashboard later.
- API routes use the **service role key** server-side, which bypasses RLS — that key must never reach the browser.

Apply the migration with the Supabase CLI:
```bash
supabase link --project-ref your-project-ref
supabase db push
```

## API routes
| Route | Method | Does |
|---|---|---|
| `/api/contact` | POST | Validates with Zod, honeypot spam check, rate-limited (5/min/IP), inserts into `contact_submissions`, emails the team + a confirmation to the customer via Resend |
| `/api/consultation` | POST | Same pattern for consultation bookings (3/min/IP) |
| `/api/newsletter` | POST | Upserts into `newsletter_subscribers`, sends a confirmation email |

All three: validate input server-side (never trust the client schema alone), rate-limit by IP, and fail closed with a clear JSON error the frontend already handles (see `contact-form.tsx`).

## Email (Resend)
`src/lib/resend.ts` wraps the Resend client. **Before going live:**
1. Verify your sending domain in the Resend dashboard.
2. Replace `EMAIL_FROM` in `resend.ts` with a verified address on that domain.
3. Set `RESEND_API_KEY` and `CONTACT_NOTIFY_EMAIL` in your environment.

## Rate limiting — known limitation
`src/lib/rate-limit.ts` is in-memory and resets on cold start / isn't shared across serverless instances. It stops naive double-submits and basic bots today. For real production abuse protection, swap it for **Upstash Redis + `@upstash/ratelimit`**, or move the check into Vercel Edge Middleware. Flagging this now rather than presenting the current version as bulletproof.

## WhatsApp automation
`src/lib/site-config.ts` exports `buildWhatsAppLink({ name, service, message })`, which builds a `wa.me` deep link with a prefilled message. This is used in three places so nothing needs retyping:
1. The floating WhatsApp button (generic greeting)
2. The contact form — a live button that updates in real time as the visitor fills in name/service/message, plus a "get a faster reply on WhatsApp" prompt after a successful submission, carrying the exact details just submitted
3. Each service detail page (`/services/[slug]`) — prefilled with that specific service name

This works without any WhatsApp Business API credentials. **What it does not do**: automatically send a message on your behalf, or let the team reply from a shared inbox. For true two-way automation (auto-replies, ticket routing, canned responses), you'd integrate the WhatsApp Business Platform (via Twilio or Meta directly) — that needs a verified business number and API credentials only you can provide, so it's intentionally out of scope here.

## Known simplification: testimonials & portfolio
The `testimonials` and `portfolio_projects` tables exist with full RLS policies, but the `Testimonials` and `Portfolio` components currently render from hardcoded placeholder arrays in their own files, not from Supabase. Swapping them to fetch from Supabase is a small, contained change (a server-side `supabase.from(...).select()` call in each page) — flagging this now rather than presenting it as already wired up. Until then, edit the arrays directly in `src/components/sections/testimonials.tsx` and `portfolio.tsx`.


See `.env.example` — copy to `.env.local` for development and add the same keys in Vercel's project settings for production. Never commit `.env.local`.

## What's done in this section
- Full Postgres schema with RLS policies (`supabase/migrations/0001_init.sql`)
- Server + browser Supabase clients (`src/lib/supabase/`)
- Resend email wrapper
- Rate limiter (with documented limitation)
- Three working API routes wired to the forms already built in Section 3
- `.env.example`

## Next up — Section 5
SEO (`sitemap.ts`, `robots.ts`, structured data/JSON-LD), remaining static pages, Cloudinary image config, and Vercel deployment instructions.
