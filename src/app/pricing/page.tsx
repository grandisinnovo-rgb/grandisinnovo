import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, CalendarClock } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionBadge } from "@/components/ui/Motion";
import { pricingPlans } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Starter, Business, and Premium packages from Grandis Innovo — with flexible installment plans on every tier.",
};

export default function PricingPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom text-center mb-20">
        <FadeIn><SectionBadge className="mb-4">Pricing</SectionBadge></FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
            Packages That <span className="text-gradient-blue">Grow With Your Business</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Transparent pricing with flexible installment plans, so cash flow never blocks your launch.
          </p>
        </FadeIn>
      </section>

      <section className="container-custom mb-20">
        <StaggerContainer className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={`card-base p-8 h-full flex flex-col relative ${
                  plan.highlighted ? "border-brand-blue dark:border-[#4a6cf7] lg:-translate-y-3" : ""
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg,#283889,#4a6cf7)" }}>
                    Most Popular
                  </span>
                )}

                <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">{plan.name}</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">{plan.audience}</p>

                <p className="font-display font-extrabold text-3xl text-[var(--text-primary)] mt-6">{plan.price}</p>

                <p className="flex items-center gap-1.5 text-xs font-medium text-brand-blue dark:text-[#4a6cf7] mt-2">
                  <CalendarClock className="w-3.5 h-3.5" />
                  {plan.installment}
                </p>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <Check className="w-4 h-4 text-brand-blue dark:text-[#4a6cf7] flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/contact?plan=${plan.name.toLowerCase()}`}
                  className={plan.highlighted ? "btn-primary justify-center mt-8" : "btn-secondary justify-center mt-8"}
                >
                  Get Started
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <p className="text-center text-xs text-[var(--text-muted)] mt-8">
          Prices are starting estimates and will be finalized based on project scope. Contact us for an exact quote.
        </p>
      </section>

      <FadeIn className="text-center">
        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
          Request a Free Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </FadeIn>
    </div>
  );
}
