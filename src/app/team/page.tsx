import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, Twitter, Github, Instagram, Facebook } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionBadge } from "@/components/ui/Motion";
import { team } from "@/lib/data";

const socialIconMap = { linkedin: Linkedin, twitter: Twitter, github: Github, instagram: Instagram, facebook: Facebook } as const;

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people behind Grandis Innovo.",
};

export default function TeamPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom text-center mb-20">
        <FadeIn><SectionBadge className="mb-4">The Team</SectionBadge></FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Meet the People <span className="text-gradient-blue">Behind Grandis Innovo</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            A small, focused team of developers, designers, and engineers who care about getting
            it right.
          </p>
        </FadeIn>
      </section>

      <section className="container-custom mb-20">
        <StaggerContainer className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {team.map((member) => (
            <StaggerItem
              key={member.name}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <div className="card-base overflow-hidden h-full text-center group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover blur-md scale-105 transition-all duration-500 ease-out group-hover:blur-none group-hover:scale-100 group-focus-within:blur-none group-focus-within:scale-100"
                  />
                  <div className="absolute inset-0 bg-[var(--bg-secondary)]/40 transition-opacity duration-500 group-hover:opacity-0 group-focus-within:opacity-0" />
                </div>
                <div className="p-5">
                  <h2 className="font-display font-bold text-[var(--text-primary)] mb-1">{member.name}</h2>
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
      </section>

      <FadeIn className="text-center">
        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
          Work With Us <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
