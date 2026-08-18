"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, CalendarClock } from "lucide-react";
import { pricingPlans } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="section-padding bg-white dark:bg-primary" aria-labelledby="pricing-heading">
      <SectionHeading
        eyebrow="Pricing"
        title="Packages that grow with your business."
        description="All packages include our 5-month installment payment plan, so cash flow never blocks your launch."
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className={cn(
              "glass-panel relative flex flex-col p-8",
              plan.highlighted && "border-accent/50 shadow-glow lg:-translate-y-3"
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-grandis-gradient px-4 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}

            <h3 className="font-display text-xl font-semibold text-primary dark:text-white">{plan.name}</h3>
            <p className="mt-1 text-sm text-primary/60 dark:text-white/60">{plan.audience}</p>

            <p className="mt-6 font-display text-3xl font-bold text-primary dark:text-white">{plan.price}</p>

            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-accent">
              <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
              {plan.installment}
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-primary/75 dark:text-white/75">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href={`/contact?intent=quote&plan=${plan.name.toLowerCase()}`}
              className={cn("mt-8 justify-center", plan.highlighted ? "btn-primary" : "btn-secondary")}
            >
              Request a Quote
            </Link>
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-primary/50 dark:text-white/50">
        Prices are placeholders and will be finalized based on project scope. Contact us for an exact quote.
      </p>
    </section>
  );
}
