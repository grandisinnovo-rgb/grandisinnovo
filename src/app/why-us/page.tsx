import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionBadge } from "@/components/ui/Motion";
import { whyPoints } from "@/lib/data";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description: "Startup-friendly pricing, fast turnaround, full-stack capability, and an ongoing partnership.",
};

export default function WhyUsPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom text-center mb-20">
        <FadeIn><SectionBadge className="mb-4">Why Choose Us</SectionBadge></FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            The Smarter Choice for <span className="text-gradient-blue">Growing Businesses</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            We built Grandis Innovo specifically for the needs of startups and small businesses
            tight budgets, fast timelines, and quality that competes with the big players.
          </p>
        </FadeIn>
      </section>

      <section className="container-custom mb-20">
        <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {whyPoints.map((point) => (
            <StaggerItem key={point.title}>
              <div className="card-base p-6 h-full">
                <div className="w-11 h-11 rounded-xl bg-brand-blue-50 dark:bg-[#283889]/20 flex items-center justify-center mb-4">
                  <point.icon className="w-5 h-5 text-brand-blue dark:text-[#4a6cf7]" />
                </div>
                <h2 className="font-display font-semibold text-[var(--text-primary)] mb-2">{point.title}</h2>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{point.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <FadeIn className="text-center">
        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
          Why We&apos;re Different <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
