"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { REG_NO } from "@/lib/data";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/why-us", label: "Why Choose Us" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const PROMO_H = 44; // must match PromoBar height

export default function Navbar({ promoVisible = true }: { promoVisible?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const topOffset = promoVisible ? PROMO_H : 0;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1, top: topOffset }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: topOffset }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-[padding,background,border,box-shadow] duration-300",
          scrolled
            ? "py-3 bg-[var(--nav-bg)] backdrop-blur-xl border-b border-[var(--border-color)] shadow-sm"
            : "py-5 bg-transparent"
        )}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9">
              <Image src="/GI LOG.svg" alt="Grandis Innovo logo" fill className="object-contain" />
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

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium relative group transition-colors duration-200",
                  "font-dm",
                  pathname === link.href
                    ? "text-brand-blue dark:text-[#4a6cf7]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-0.5 bg-brand-blue dark:bg-[#4a6cf7] rounded-full transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex flex-shrink-0 flex-col items-start rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-3 py-1.5 leading-tight whitespace-nowrap">
              <span className="font-dm text-[10px] uppercase tracking-wide text-[var(--text-muted)] whitespace-nowrap">
                Reg No.
              </span>
              <span className="font-display text-xs font-semibold text-[var(--text-primary)] whitespace-nowrap">
                {REG_NO}
              </span>
            </div>
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-brand-blue dark:hover:text-[#4a6cf7] hover:border-brand-blue dark:hover:border-[#4a6cf7] transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <Link
              href="/contact"
              className="hidden lg:flex btn-primary text-sm items-center gap-2"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-primary)]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{ top: topOffset + 65 }}
            className="fixed inset-x-0 z-40 bg-[var(--bg-primary)] border-b border-[var(--border-color)] shadow-xl lg:hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200",
                      pathname === link.href
                        ? "bg-brand-blue-50 dark:bg-[#283889]/20 text-brand-blue dark:text-[#4a6cf7]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 mt-2 border-t border-[var(--border-color)] space-y-3">
                <Link href="/contact" className="btn-primary w-full text-center block text-sm">
                  Get Started
                </Link>
                <div className="flex flex-col items-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-2 leading-tight w-fit mx-auto">
                  <span className="font-dm text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
                    Reg No.
                  </span>
                  <span className="font-display text-xs font-semibold text-[var(--text-primary)]">
                    {REG_NO}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
