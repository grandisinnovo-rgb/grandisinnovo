"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-glass-border bg-primary/80 backdrop-blur-glass shadow-glass dark:bg-dark/80"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-20">
        {/* Logo */}
        <Link href="public/images/GI LOG.svg" className="flex items-center gap-2 focus-visible:outline-white" aria-label="Grandis Innovo home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-grandis-gradient font-display text-lg font-bold text-white">
            <img src="" alt="" />
          </span>
          <span className="font-display text-lg font-semibold text-white">Grandis Innovo</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right cluster: CAC number, theme toggle, CTA, mobile trigger */}
        <div className="flex items-center gap-3">
          <div className="hidden flex-col rounded-lg border border-glass-border bg-glass px-3 py-1.5 leading-tight md:flex">
            <span className="font-mono text-[10px] uppercase tracking-wide text-white/45">
              CAC Registration No.
            </span>
            <span className="font-mono text-xs font-semibold text-white/85">
              {siteConfig.cacNumber}
            </span>
          </div>
          <ThemeToggle />
          <Link href="/contact" className="btn-primary hidden lg:inline-flex">
            Get Started
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-glass-border bg-primary/95 backdrop-blur-glass dark:bg-dark/95 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-3 justify-center">
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <div className="mx-auto mt-4 flex w-fit flex-col items-center rounded-lg border border-glass-border bg-glass px-4 py-2 leading-tight">
                <span className="font-mono text-[10px] uppercase tracking-wide text-white/45">
                  CAC Registration No.
                </span>
                <span className="font-mono text-xs font-semibold text-white/85">
                  {siteConfig.cacNumber}
                </span>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
