"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const faqs = [
  {
    q: "How long does website development take?",
    a: "Most standard websites launch within 30 days of project kickoff, depending on scope. Custom web applications may take longer  we'll give you a clear timeline during your consultation.",
  },
  {
    q: "How does the installment payment plan work?",
    a: "We offer a flexible 5-month installment plan for eligible packages. You pay an initial deposit to begin work, then the balance is spread across the remaining months.",
  },
  {
    q: "Do you handle computer hardware procurement for offices?",
    a: "Yes. We source laptops, desktops, peripherals, and components from vetted suppliers, and can manage bulk procurement for office rollouts.",
  },
  {
    q: "Do you offer ongoing maintenance after launch?",
    a: "Yes, all packages can include an ongoing maintenance plan covering updates, monitoring, and technical support after your site or app goes live.",
  },
  {
    q: "Can you handle branding as part of a website project?",
    a: "Absolutely. Many clients bundle branding and identity design with website development so the visual system is consistent from the first sketch to the live site.",
  },
  {
    q: "Do you build both Android and iOS apps?",
    a: "Yes we build native Android and iOS apps as well as cross-platform apps, depending on your budget and target audience.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-white dark:bg-primary" aria-labelledby="faq-heading">
      <SectionHeading eyebrow="FAQ" title="Answers to common questions." align="center" />

      <div className="mx-auto mt-12 max-w-3xl divide-y divide-glass-border">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div key={faq.q}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-primary dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-primary/65 dark:text-white/65">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
