"use client";

import { motion } from "framer-motion";
import {
  HeartHandshake,
  Lightbulb,
  Rocket,
  Wallet,
  LifeBuoy,
  Sparkles,
  BadgeDollarSign,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const reasons = [
  { icon: HeartHandshake, title: "Customer First Approach", copy: "Every decision starts with what's best for you, not what's easiest for us." },
  { icon: Lightbulb, title: "Innovative Technology Solutions", copy: "We build with modern, future proof tools not outdated templates." },
  { icon: Rocket, title: "Fast Delivery", copy: "Most website projects launch within 30 days of kickoff." },
  { icon: Wallet, title: "Flexible Payment Options", copy: "Spread costs over a 5 month installment plan no surprises." },
  { icon: LifeBuoy, title: "Reliable Technical Support", copy: "Real humans, fast response times, before and after launch." },
  { icon: Sparkles, title: "World-Class Designs", copy: "Premium, distinctive interfaces never a generic template feel." },
  { icon: BadgeDollarSign, title: "Affordable Pricing", copy: "Enterprise grade quality at pricing built for growing businesses." },
  { icon: Users, title: "Professional Team", copy: "Experienced developers, designers, and hardware engineers in one place." },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-white dark:bg-primary" aria-labelledby="why-us-heading">
      <SectionHeading
        eyebrow="Why Grandis Innovo"
        title="Built around your success, not just your project."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            className="glass-panel group p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-grandis-gradient text-white">
              <reason.icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="font-display text-base font-semibold text-primary dark:text-white">
              {reason.title}
            </h3>
            <p className="mt-2 text-sm text-primary/65 dark:text-white/65">{reason.copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
