import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, HeartHandshake, Linkedin, Twitter, Github, Instagram, Facebook } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionBadge } from "@/components/ui/Motion";
import { team } from "@/lib/data";

const socialIconMap = { linkedin: Linkedin, twitter: Twitter, github: Github, instagram: Instagram, facebook: Facebook } as const;

export const metadata: Metadata = {
  title: "About Us",
  description: "Grandis Innovo is the all-in-one tech partner for startups and small businesses.",
};

const values = [
  { icon: Target, title: "Our Mission", desc: "To give startups and small businesses access to the same quality of web, mobile, and design work that larger companies pay enterprise prices for — without the enterprise price tag." },
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

        <StaggerContainer className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
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

        <div className="text-center max-w-2xl mx-auto mb-20">
          <FadeIn><SectionBadge className="mb-4">The Team</SectionBadge></FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-[var(--text-primary)]">
              Meet the People <span className="text-gradient-blue">Behind Grandis Innovo</span>
            </h2>
          </FadeIn>
        </div>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <div className="card-base overflow-hidden h-full text-center">
                <div className="relative aspect-square">
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-[var(--text-primary)] mb-1">{member.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue dark:text-[#4a6cf7] mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-2">
                    {Object.entries(member.social).map(([key, href]) => {
                      const Icon = socialIconMap[key as keyof typeof socialIconMap];
                      if (!Icon || !href) return null;
                      return (
                        <Link
                          key={key}
                          href={href}
                          aria-label={`${member.name} on ${key}`}
                          className="w-7 h-7 rounded-full border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-brand-blue dark:hover:text-[#4a6cf7] hover:border-brand-blue dark:hover:border-[#4a6cf7] transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <FadeIn className="text-center">
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
            Work With Us <ArrowRight className="w-4 h-4" />
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
