"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  ArrowRight,
  Loader2,
  Check,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Our Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Why Choose Us", href: "/why-us" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Web Development", href: "/services#web-dev" },
    { label: "Mobile Apps", href: "/services#mobile" },
    { label: "UI/UX Design", href: "/services#design" },
    { label: "Tech Support", href: "/services#support" },
    { label: "PC Sales & Supply", href: "/services#sales" },
  ],
  social: [
    { icon: Twitter, label: "Twitter", href: "https://x.com/GrandisInnovo" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Github, label: "GitHub", href: "https://github.com/grandisinnovo-rgb/grandisinnovo" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
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
    <footer className="relative bg-[var(--bg-secondary)] border-t border-[var(--border-color)] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 grid-overlay opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

      <div className="container-custom relative pt-24 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 text-center">
          {/* Brand Column */}
          <div className="lg:col-span-1 flex flex-col items-center">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative w-9 h-9">
                <Image src="/GI LOG.svg" alt="Grandis Innovo logo" fill sizes="36px" className="object-contain" />
              </div>
              <div className="leading-none">
                <span className="font-display font-extrabold text-lg text-[var(--text-primary)] tracking-tight block">
                  Grandis
                </span>
                <span className="font-display font-semibold text-xs text-brand-blue dark:text-[#4a6cf7] tracking-widest uppercase">
                  Innovo
                </span>
              </div>
            </Link>

            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">
              Empowering startups and small businesses with modern, affordable tech solutions
              that drive real growth.
            </p>

            {/* Contact info */}
            <div className="flex flex-col items-center gap-2.5">
              {[
                { icon: Mail, text: "grandisinovo@gmail.com" },
                { icon: Phone, text: "+234 9133393983" },
                { icon: MapPin, text: "Abuja, Nigeria" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
                  <Icon className="w-3.5 h-3.5 text-brand-blue dark:text-[#4a6cf7] flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-center">
            <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-5 uppercase tracking-wider">
              Company
            </h3>
            <ul className="flex flex-col items-center gap-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-brand-blue dark:hover:text-[#4a6cf7] transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="flex flex-col items-center">
            <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-5 uppercase tracking-wider">
              Services
            </h3>
            <ul className="flex flex-col items-center gap-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-brand-blue dark:hover:text-[#4a6cf7] transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="flex flex-col items-center">
            <h3 className="font-display font-semibold text-sm text-[var(--text-primary)] mb-5 uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
              Get tech insights and company updates delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 mb-2 w-full max-w-xs">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                aria-label="Email address for newsletter"
                className="flex-1 min-w-0 px-3 py-2.5 rounded-xl text-sm bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-brand-blue dark:focus:border-[#4a6cf7] transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label="Subscribe"
                className="px-4 py-2.5 bg-brand-blue text-white rounded-xl text-sm font-medium hover:bg-brand-blue-light transition-colors disabled:opacity-60 flex-shrink-0"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === "success" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            <div className="h-4 mb-2" role="status" aria-live="polite">
              {status === "success" && (
                <p className="text-xs text-emerald-500">Subscribed thank you!</p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-400">Something went wrong. Try again.</p>
              )}
            </div>

            {/* Social links */}
            <div className="flex justify-center gap-2">
              {footerLinks.social.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-muted)] hover:text-brand-blue dark:hover:text-[#4a6cf7] hover:border-brand-blue dark:hover:border-[#4a6cf7] transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Grandis Innovo Digital Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
