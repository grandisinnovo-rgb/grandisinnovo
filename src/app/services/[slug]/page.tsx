import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Code2, Smartphone, Palette, Figma, Cpu, ShoppingCart, ArrowRight, Check, MessageCircle } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { services, type Service, buildWhatsAppLink } from "@/lib/site-config";

const iconMap: Record<Service["icon"], React.ElementType> = {
  code: Code2,
  smartphone: Smartphone,
  palette: Palette,
  figma: Figma,
  cpu: Cpu,
  "shopping-cart": ShoppingCart,
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = iconMap[service.icon];
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <SiteShell>
      <section className="section-padding relative overflow-hidden bg-primary dark:bg-dark">
        <div className="pointer-events-none absolute inset-0 bg-grandis-radial opacity-60" aria-hidden="true" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-grandis-gradient text-white">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </div>
          <span className="eyebrow">Service</span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">{service.title}</h1>
          <p className="mt-5 text-lg text-white/70">{service.description}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="glass-panel p-6">
              <h2 className="font-display text-base font-semibold text-white">Why it works</h2>
              <ul className="mt-4 space-y-2.5">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-sm text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-panel p-6">
              <h2 className="font-display text-base font-semibold text-white">What's included</h2>
              <ul className="mt-4 space-y-2.5">
                {service.offerings.map((offering) => (
                  <li key={offering} className="flex items-start gap-2 text-sm text-white/75">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-secondary" aria-hidden="true" />
                    {offering}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/contact?intent=quote&service=${service.slug}`} className="btn-primary">
              Request a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={buildWhatsAppLink({ service: service.title })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary border-[#25D366]/40 text-[#25D366]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat About This Service
            </a>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-primary">
        <h2 className="font-display text-xl font-semibold text-primary dark:text-white">Other services</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((s) => {
            const OtherIcon = iconMap[s.icon];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="glass-panel flex items-center gap-3 p-5 transition-transform hover:-translate-y-1"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-grandis-gradient text-white">
                  <OtherIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-medium text-primary dark:text-white">{s.title}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}
