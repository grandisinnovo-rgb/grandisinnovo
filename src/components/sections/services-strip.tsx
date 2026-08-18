"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Smartphone, Palette, Figma, Cpu, ShoppingCart } from "lucide-react";
import { services, type Service } from "@/lib/site-config";

const iconMap: Record<Service["icon"], React.ElementType> = {
  code: Code2,
  smartphone: Smartphone,
  palette: Palette,
  figma: Figma,
  cpu: Cpu,
  "shopping-cart": ShoppingCart,
};

/**
 * Compact services overview — one evenly-spaced row of icon + title + one-line
 * description per service, all cards locked to equal height/width via CSS
 * Grid. Sits right under the hero as a scannable teaser; the full detailed
 * cards (benefits, offerings, "learn more") live on the dedicated /services
 * page instead of repeating here.
 */
export function ServicesStrip() {
  return (
    <section className="relative -mt-8 px-6 pb-4 sm:px-10 lg:px-20" aria-label="Our services overview">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="glass-panel mx-auto grid max-w-7xl grid-cols-1 divide-y divide-glass-border sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3 xl:grid-cols-6"
      >
        {services.map((service) => {
          const Icon = iconMap[service.icon];
          return (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col gap-3 p-6 transition-colors hover:bg-white/5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-grandis-gradient text-white transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-display text-sm font-semibold leading-tight text-white">
                {service.title}
              </span>
              <span className="text-xs leading-relaxed text-white/55">{service.description}</span>
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
}
