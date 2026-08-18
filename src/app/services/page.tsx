import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionBadge } from "@/components/ui/Motion";
import { services, type Service } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description: "Web development, mobile apps, UI/UX design, tech support, and PC sales — all from one team.",
};

// Groups services under the anchor ids Footer.tsx and elsewhere already link to
// (/services#web-dev, #mobile, #design, #support, #sales) so those links land
// on the right section instead of just scrolling to the top of the page.
const groups: { id: Service["anchorGroup"]; label: string }[] = [
  { id: "web-dev", label: "Web Development" },
  { id: "mobile", label: "Mobile App Development" },
  { id: "design", label: "Web & UI/UX Design" },
  { id: "support", label: "Tech Support" },
  { id: "sales", label: "PC Sales & Supply" },
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom text-center mb-20">
        <FadeIn><SectionBadge className="mb-4">Our Services</SectionBadge></FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Everything Your Business <span className="text-gradient-blue">Needs to Thrive</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            One partner, complete solutions from your first landing page to the laptops your
            team works on.
          </p>
        </FadeIn>
      </section>

      {groups.map((group) => {
        const groupServices = services.filter((s) => s.anchorGroup === group.id);
        return (
          <section key={group.id} id={group.id} className="container-custom mb-20 scroll-mt-32">
            <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-6">{group.label}</h2>
            <StaggerContainer className="grid sm:grid-cols-2 gap-6">
              {groupServices.map((service) => (
                <StaggerItem key={service.slug} className={groupServices.length === 1 ? "sm:col-span-2" : undefined}>
                  <div className="card-base p-6 h-full">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{ background: `${service.color}15` }}
                    >
                      <service.icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2.5">{service.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">{service.desc}</p>
                    <ul className="space-y-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                          <Check className="w-3.5 h-3.5 text-brand-blue dark:text-[#4a6cf7] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        );
      })}

      <FadeIn className="text-center">
        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
          Get a Free Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
