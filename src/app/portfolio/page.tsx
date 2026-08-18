import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionBadge } from "@/components/ui/Motion";
import { portfolioHighlights } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Recent web, mobile, and design work from Grandis Innovo.",
};

export default function PortfolioPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom text-center mb-20">
        <FadeIn><SectionBadge className="mb-4">Recent Work</SectionBadge></FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Projects We&apos;re <span className="text-gradient-blue">Proud Of</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            A snapshot of recent web, mobile, and design work full case studies coming soon.
          </p>
        </FadeIn>
      </section>

      <section className="container-custom mb-20">
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {portfolioHighlights.map((project) => (
            <StaggerItem key={project.title}>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base overflow-hidden h-full block group"
              >
                <div
                  className="h-48 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg,${project.color}20 0%,${project.color}08 100%)` }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: project.color }}>
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2">{project.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)]">{t}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue dark:text-[#4a6cf7]">
                    View Project <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <FadeIn className="text-center">
        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
          Start Your Project <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
