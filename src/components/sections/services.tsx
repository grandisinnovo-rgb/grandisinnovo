"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Smartphone, Palette, Figma, Cpu, ShoppingCart, ArrowRight, Check } from "lucide-react";
import { services, type Service } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap: Record<Service["icon"], React.ElementType> = {
  code: Code2,
  smartphone: Smartphone,
  palette: Palette,
  figma: Figma,
  cpu: Cpu,
  "shopping-cart": ShoppingCart,
};

export function Services() {
  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden bg-primary dark:bg-dark"
      aria-labelledby="services-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-grandis-radial opacity-60" aria-hidden="true" />

      <div className="relative">
        <SectionHeading
          eyebrow="What We Do"
          title="Six services. One trusted team."
          description="From your first landing page to the laptop your team works on — we cover the full stack of what a growing business needs."
          light
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="glass-panel group flex flex-col p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-grandis-gradient text-white transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                <h3 className="font-display text-lg font-semibold text-white">{service.title}</h3>
                <p className="mt-2 text-sm text-white/65">{service.description}</p>

                <ul className="mt-5 space-y-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-white/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-transform group-hover:translate-x-1 dark:text-white"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
