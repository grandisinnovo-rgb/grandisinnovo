"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Zap } from "lucide-react";

/**
 * Sticky promo banner — sits above the header.
 * Dismissible (session-only) so it doesn't permanently eat header space for returning visitors.
 */
export function PromoBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="relative z-[60] overflow-hidden bg-grandis-gradient"
        >
          <div className="relative flex flex-col items-center justify-center gap-2 px-4 py-2.5 text-center text-white sm:flex-row sm:gap-4 sm:py-2">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Zap className="h-4 w-4 shrink-0 animate-pulse" aria-hidden="true" />
              <span>
                Get your website running within <strong>30 days</strong> —{" "}
                <span className="hidden sm:inline">flexible </span>5-month installment plan available.
              </span>
            </p>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href="/contact?intent=start-project"
                className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary transition-transform hover:scale-105"
              >
                Start Your Project
              </a>
              <a
                href="/contact?intent=consultation#consultation"
                className="rounded-full border border-white/60 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/10"
              >
                Book a Free Consultation
              </a>
            </div>

            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Dismiss promotional banner"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/80 transition-colors hover:bg-white/10 hover:text-white sm:static sm:translate-y-0"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
