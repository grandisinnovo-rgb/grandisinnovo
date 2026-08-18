-- Grandis Innovo — Supabase schema
-- Run via: supabase db push  (or paste into the SQL editor)

-- Extensions
create extension if not exists "uuid-ossp";

-- 1. Contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  service text not null,
  message text not null,
  intent text, -- 'start-project' | 'consultation' | 'quote' | null (general)
  plan text,   -- pricing plan slug, if request came from Pricing section
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

-- 2. Consultation bookings
create table if not exists public.consultation_bookings (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  preferred_date date,
  preferred_time text,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- 3. Newsletter subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  subscribed_at timestamptz not null default now(),
  is_active boolean not null default true
);

-- 4. Testimonials (editable via admin instead of hardcoded)
create table if not exists public.testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  business_name text,
  review text not null,
  rating smallint not null check (rating between 1 and 5),
  photo_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- 5. Portfolio projects
create table if not exists public.portfolio_projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null check (
    category in ('Websites', 'Mobile Apps', 'UI/UX', 'Branding', 'Hardware')
  ),
  blurb text not null,
  cover_image_url text,
  project_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.contact_submissions enable row level security;
alter table public.consultation_bookings enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.testimonials enable row level security;
alter table public.portfolio_projects enable row level security;

-- Public (anon) can INSERT leads/newsletter signups, but never read them back
create policy "Public can submit contact form" on public.contact_submissions
  for insert to anon with check (true);

create policy "Public can book consultation" on public.consultation_bookings
  for insert to anon with check (true);

create policy "Public can subscribe to newsletter" on public.newsletter_subscribers
  for insert to anon with check (true);

-- Public (anon) can only READ published content
create policy "Public can read published testimonials" on public.testimonials
  for select to anon using (is_published = true);

create policy "Public can read published portfolio" on public.portfolio_projects
  for select to anon using (is_published = true);

-- service_role (used only in server-side API routes) bypasses RLS automatically.
-- Admin dashboard access should use an authenticated Supabase role with full policies — not covered here.
