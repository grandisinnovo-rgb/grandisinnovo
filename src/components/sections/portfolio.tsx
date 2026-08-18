"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExternalLink } from "lucide-react";

type Category = "All" | "Websites" | "Mobile Apps" | "UI/UX" | "Branding" | "Hardware";

const categories: Category[] = ["All", "Websites", "Mobile Apps", "UI/UX", "Branding", "Hardware"];

// Placeholder portfolio entries — replace with real case studies / Cloudinary images
const projects: { title: string; category: Category; blurb: string }[] = [
  { title: "Northbridge Retail — E-commerce Platform", category: "Websites", blurb: "Full storefront rebuild with a 40% faster checkout flow." },
  { title: "Farmly — Cross-Platform App", category: "Mobile Apps", blurb: "iOS + Android app for agribusiness logistics." },
  { title: "Verdant UI Design System", category: "UI/UX", blurb: "Component library and design tokens for a fintech client." },
  { title: "Ashen & Co. Brand Identity", category: "Branding", blurb: "Full identity system: logo, palette, and brand guide." },
  { title: "Corporate Office Fleet Upgrade", category: "Hardware", blurb: "40-unit desktop procurement and rollout for a law firm." },
  { title: "Solace Wellness — Landing Page", category: "Websites", blurb: "Conversion-focused landing page for a health startup." },
];

export function Portfolio() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="portfolio" className="section-padding bg-white dark:bg-primary" aria-labelledby="portfolio-heading">
      <SectionHeading eyebrow="Our Work" title="A snapshot of what we've built." />

      <div role="tablist" aria-label="Portfolio categories" className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === cat
                ? "border-transparent bg-grandis-gradient text-white"
                : "border-glass-border text-primary/70 hover:bg-glass dark:text-white/70"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <motion.article
            key={project.title}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="glass-panel group cursor-pointer overflow-hidden"
          >
            <div className="flex aspect-video items-center justify-center bg-trace-lines bg-grandis-gradient/10">
              <span className="font-mono text-xs text-primary/40 dark:text-white/40">Project preview</span>
            </div>
            <div className="p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                {project.category}
              </span>
              <h3 className="mt-1 font-display text-base font-semibold text-primary dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-primary/60 dark:text-white/60">{project.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary dark:text-white">
                View project <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
