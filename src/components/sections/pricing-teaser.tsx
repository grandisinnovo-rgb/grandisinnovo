import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export function PricingTeaser() {
  return (
    <section className="section-padding relative overflow-hidden bg-primary dark:bg-dark" aria-labelledby="pricing-teaser-heading">
      <div className="pointer-events-none absolute inset-0 bg-grandis-radial opacity-50" aria-hidden="true" />
      <div className="glass-panel relative mx-auto max-w-4xl p-10 text-center sm:p-14">
        <span className="eyebrow">Ready When You Are</span>
        <h2 id="pricing-teaser-heading" className="text-3xl font-bold text-white sm:text-4xl">
          Packages built for startups, SMEs, and enterprise clients.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-white/70">
          Every package includes our flexible 5-month installment plan — see full pricing and what's
          included at each tier.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/pricing" className="btn-primary">
            View Pricing
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/contact?intent=consultation#consultation" className="btn-secondary text-white">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Book a Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
