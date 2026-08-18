"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Zap, ArrowRight } from "lucide-react";

const ticker = [
  "🚀  Get your website & full online presence live within days — from ₦400,000 paid in easy installments",
  "⚡  Limited launch slots available — Book your free consultation now",
  "🎉  Grandis Innovo is officially live! Web • Mobile Apps • Design • Tech Support",
  "💳  No heavy upfront cost — Flexible installment plans for every budget",
  "🌐  Professional websites from ₦400,000 — Installment-friendly, results-guaranteed",
];

// Presentational only — HeaderWrapper is the single source of truth for
// whether this should be showing (it owns the sessionStorage check), so
// PromoBar and Navbar's top-offset can never disagree with each other.
export default function PromoBar({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 44, opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-[70] overflow-hidden"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, #1a2460 0%, #283889 25%, #3f1119 60%, #1a2460 100%)",
              backgroundSize: "300% 100%",
              animation: "promoBgShift 8s ease-in-out infinite",
            }}
          />
          {/* Noise grain */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <div className="relative flex items-center h-[44px] z-10">
            {/* Left pill label */}
            <div className="hidden sm:flex items-center gap-1.5 h-full px-4 border-r border-white/15 flex-shrink-0 bg-white/10 backdrop-blur-sm">
              <Zap className="w-3 h-3 fill-amber-300 text-amber-300 flex-shrink-0" />
              <span
                className="text-white font-semibold text-[10px] uppercase tracking-[0.15em] whitespace-nowrap"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Launch Offer
              </span>
            </div>

            {/* Ticker */}
            <div className="flex-1 overflow-hidden">
              <motion.div
                className="flex items-center gap-20 whitespace-nowrap"
                animate={{ x: ["2%", "-50%"] }}
                transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              >
                {[...ticker, ...ticker].map((item, i) => (
                  <span
                    key={i}
                    className="text-white/90 text-xs inline-flex items-center gap-3 flex-shrink-0"
                    style={{ fontFamily: "var(--font-dm)" }}
                  >
                    <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                    {item}
                    {i % ticker.length === 0 && (
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1 text-amber-300 font-bold hover:text-white transition-colors text-[11px] underline underline-offset-2"
                        onClick={(e) => e.stopPropagation()}
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        Claim Now <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* CTA chip — desktop */}
            <Link
              href="/contact"
              className="hidden lg:flex items-center gap-1.5 mx-4 flex-shrink-0 px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 transition-all duration-200 group"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white text-[11px] font-bold whitespace-nowrap" style={{ fontFamily: "var(--font-syne)" }}>
                Get Started
              </span>
              <ArrowRight className="w-3 h-3 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            {/* Dismiss */}
            <button
              onClick={onDismiss}
              aria-label="Dismiss announcement"
              className="w-9 h-full flex-shrink-0 flex items-center justify-center text-white/60 hover:text-white transition-colors hover:bg-white/10"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
