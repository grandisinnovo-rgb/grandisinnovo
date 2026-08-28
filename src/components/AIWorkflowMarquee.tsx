"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const items = [
  "Built with AI-Assisted Development — powered by Claude, ChatGPT & Copilot",
  "Faster builds, smarter workflows — without cutting corners on quality",
  "From idea to launch, accelerated by modern AI tools",
  "AI-Assisted. Human-Directed. Startup-Friendly Pricing.",
  "We build with AI, so you get speed and quality",
];

/**
 * A quiet credibility strip, not a promo — same infinite-scroll ticker
 * mechanism as PromoBar, but permanent (no dismiss), no CTA, and sits inline
 * on the homepage rather than fixed above the header. Backs up claims made
 * elsewhere on the site (fast turnaround, startup-friendly pricing) with the
 * actual reason those are possible, instead of asserting a standalone
 * "AI company" identity.
 *
 * Deliberately styled as a light frosted-glass panel rather than the dark
 * gradient used elsewhere (PromoBar, Hero) — it's meant to visually break up
 * the page rhythm and stand out as its own moment, not blend into either the
 * light or dark theme.
 */
export function AIWorkflowMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/40">
      {/* Soft brand-tinted glow behind the glass, visible through the blur */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(40,56,137,0.35) 0%, rgba(74,108,247,0.35) 35%, rgba(63,17,25,0.3) 70%, rgba(40,56,137,0.35) 100%)",
          backgroundSize: "300% 100%",
          animation: "promoBgShift 12s ease-in-out infinite",
        }}
      />
      {/* Frosted glass layer */}
      <div className="absolute inset-0 bg-white/60 dark:bg-white/[0.07] backdrop-blur-xl" />

      <div className="relative flex items-center h-20 sm:h-24 z-10">
        <div className="hidden sm:flex items-center gap-2 h-full px-6 border-r border-[var(--border-color)] flex-shrink-0 bg-white/40 dark:bg-white/5 backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-brand-blue dark:text-[#4a6cf7] flex-shrink-0" />
          <span
            className="font-display font-extrabold text-sm uppercase tracking-[0.15em] text-[var(--text-primary)] whitespace-nowrap"
          >
            How We Build
          </span>
        </div>

        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex items-center gap-20 whitespace-nowrap"
            animate={{ x: ["2%", "-50%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            {[...items, ...items].map((item, i) => (
              <span
                key={i}
                className="font-display font-bold text-lg sm:text-xl inline-flex items-center gap-4 flex-shrink-0 text-[var(--text-primary)]"
              >
                <span className="w-2 h-2 rounded-full bg-brand-blue dark:bg-[#4a6cf7] flex-shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
