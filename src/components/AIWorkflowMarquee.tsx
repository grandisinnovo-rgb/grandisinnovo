"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const items = [
  "🤖  Built with AI-Assisted Development — powered by Claude, ChatGPT, CoPilot e.t.c",
  "⚡  Faster builds, smarter workflows — without cutting corners on quality",
  "🧠  From idea to launch, accelerated by modern AI tools",
  "🚀  AI-Assisted. Human-Directed. Startup-Friendly Pricing.",
  "💡  We build with Claude & ChatGPT, so you get speed and quality",
];

/**
 * A quiet credibility strip, not a promo — same infinite-scroll ticker
 * mechanism as PromoBar, but permanent (no dismiss), no CTA, and sits inline
 * on the homepage rather than fixed above the header. Backs up claims made
 * elsewhere on the site (fast turnaround, startup-friendly pricing) with the
 * actual reason those are possible, instead of asserting a standalone
 * "AI company" identity.
 */
export function AIWorkflowMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--border-color)]">
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #1a2460 0%, #283889 25%, #3f1119 60%, #1a2460 100%)",
          backgroundSize: "300% 100%",
          animation: "promoBgShift 10s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative flex items-center h-12 z-10">
        <div className="hidden sm:flex items-center gap-1.5 h-full px-4 border-r border-white/15 flex-shrink-0 bg-white/10 backdrop-blur-sm">
          <Bot className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
          <span
            className="text-white font-semibold text-[10px] uppercase tracking-[0.15em] whitespace-nowrap"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            How We Build
          </span>
        </div>

        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex items-center gap-16 whitespace-nowrap"
            animate={{ x: ["2%", "-50%"] }}
            transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          >
            {[...items, ...items].map((item, i) => (
              <span
                key={i}
                className="text-white/90 text-xs inline-flex items-center gap-3 flex-shrink-0"
                style={{ fontFamily: "var(--font-dm)" }}
              >
                <span className="w-1 h-1 rounded-full bg-amber-400 flex-shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
