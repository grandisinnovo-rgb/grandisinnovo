"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, User } from "lucide-react";
import { buildWhatsAppLink, siteConfig } from "@/lib/site-config";

/**
 * Floating WhatsApp widget.
 * - Collapsed: a round WhatsApp button, fixed bottom-right, on every page.
 * - Expanded: a small chat-preview card (greeting + "Start Chat" button).
 * Both the collapsed bubble AND the "Start Chat" button inside the expanded
 * card are direct links straight to WhatsApp — clicking either one opens
 * WhatsApp immediately, in a new tab, with a prefilled greeting.
 */
export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const chatLink = buildWhatsAppLink();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            role="dialog"
            aria-label="Chat with Grandis Innovo on WhatsApp"
            className="glass-panel w-72 overflow-hidden bg-primary/95 dark:bg-dark/95 sm:w-80"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 bg-[#25D366] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <User className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">Grandis Innovo</p>
                  <p className="flex items-center gap-1 text-xs text-white/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                    Typically replies within a few hours
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close WhatsApp chat preview"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white/90 hover:bg-white/15"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-3 p-4">
              <div className="rounded-2xl rounded-tl-sm bg-white/10 px-3.5 py-2.5 text-sm text-white/90">
                Hi there 👋 Got a project in mind, or a question about our services? Message us directly on
                WhatsApp — we usually reply fast.
              </div>

              <a
                href={chatLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] focus-visible:outline-white"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Start Chat on WhatsApp
              </a>

              <p className="text-center text-[11px] text-white/40">
                Opens WhatsApp with {siteConfig.name} — no account or app switch needed on desktop.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed bubble — clicking it either opens the preview, or if already open, closes it.
          Long-press-free users on mobile can also just tap straight through via the card above. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-glass transition-transform hover:scale-110 focus-visible:outline-white"
      >
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/60" aria-hidden="true" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "chat"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </button>

      {/* Direct fallback link — always present for screen readers / JS-disabled edge cases,
          visually hidden since the bubble above is the primary interactive target. */}
      <a href={chatLink} target="_blank" rel="noopener noreferrer" className="sr-only">
        Message Grandis Innovo directly on WhatsApp
      </a>
    </div>
  );
}
