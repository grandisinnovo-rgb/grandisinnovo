"use client";

import { useState } from "react";
import Link from "next/link";
import { Linkedin, Facebook, Twitter, Instagram, Github, Send } from "lucide-react";
import { navLinks, services, siteConfig } from "@/lib/site-config";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="border-t border-glass-border bg-dark text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:px-20">
        {/* Brand + newsletter */}
        <div className="lg:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-grandis-gradient font-display text-lg font-bold">
              G
            </span>
            <span className="font-display text-lg font-semibold">Grandis Innovo</span>
          </Link>
          <p className="mt-4 text-sm text-white/60">{siteConfig.tagline}</p>

          <form onSubmit={handleSubscribe} className="mt-6">
            <label htmlFor="newsletter-email" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-white/50">
              Subscribe to our newsletter
            </label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full border border-glass-border bg-glass px-4 py-2.5 text-sm placeholder:text-white/40 focus-visible:outline-accent"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                aria-label="Subscribe"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-grandis-gradient"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div role="status" aria-live="polite" className="mt-2 text-xs">
              {status === "success" && <span className="text-emerald-400">Subscribed  thank you!</span>}
              {status === "error" && <span className="text-red-400">Something went wrong. Try again.</span>}
            </div>
          </form>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm text-white/70 hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + social */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">Contact</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>{siteConfig.contact.phone}</li>
            <li>{siteConfig.contact.email}</li>
            <li>{siteConfig.contact.address}</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[
              { href: siteConfig.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: siteConfig.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: siteConfig.social.twitter, Icon: Twitter, label: "X / Twitter" },
              { href: siteConfig.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: siteConfig.social.github, Icon: Github, label: "GitHub" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-border text-white/70 hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="trace-divider" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/50 sm:flex-row sm:px-10 lg:px-20">
        <p>© {new Date().getFullYear()} Grandis Innovo. All rights reserved.</p>
        <p className="font-mono">CAC Registration Number: {siteConfig.cacNumber}</p>
      </div>
    </footer>
  );
}
