import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn, SectionBadge } from "@/components/ui/Motion";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about timelines, payment plans, hardware, and mobile app development at Grandis Innovo.",
};

export default function FAQPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom text-center mb-20">
        <FadeIn><SectionBadge className="mb-4">FAQ</SectionBadge></FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Answers to <span className="text-gradient-blue">Common Questions</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Reach out and we&apos;ll get back to you within one business day.
          </p>
        </FadeIn>
      </section>

      <section className="container-custom mb-20">
        <FAQAccordion />
      </section>

      <FadeIn className="text-center">
        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
          Still Have Questions? <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
