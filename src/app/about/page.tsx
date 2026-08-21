import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, HeartHandshake, Users } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionBadge } from "@/components/ui/Motion";

export const metadata: Metadata = {
  title: "About Us",
  description: "Grandis Innovo is the all in one tech partner for startups and small businesses.",
};

const values = [
  { icon: Target, title: "Our Mission", desc: "To give startups and small businesses access to the same quality of web, mobile, and design work that larger companies pay enterprise prices for  without the enterprise price tag." },
  { icon: HeartHandshake, title: "Our Promise", desc: "No jargon, no disappearing after launch. We stay on as your long-term tech partner, not a one-off vendor." },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50 -z-10" />
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn><SectionBadge className="mb-4">About Grandis Innovo</SectionBadge></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-6">
              Your All In One <span className="text-gradient-blue">Tech Partner</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              We built Grandis Innovo specifically for the needs of startups and small businesses
              in Nigeria and beyond tight budgets, fast timelines, and quality that competes
              with the big players.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="card-base p-7 h-full">
                <v.icon className="w-8 h-8 text-brand-blue dark:text-[#4a6cf7] mb-4" />
                <h2 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">{v.title}</h2>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/team" className="btn-secondary inline-flex items-center gap-2">
            <Users className="w-4 h-4" /> Meet the Team
          </Link>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Work With Us <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
