import type { Metadata } from "next";
import { FadeIn, SectionBadge } from "@/components/ui/Motion";
import { REG_NO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Grandis Innovo Digital Services.",
};

const lastUpdated = "August 2026";

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom max-w-3xl mx-auto">
        <FadeIn><SectionBadge className="mb-4">Legal</SectionBadge></FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl text-[var(--text-primary)] mb-3">
            Terms of Service
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: {lastUpdated}</p>
        </FadeIn>

        <FadeIn delay={0.2} className="space-y-10 text-[var(--text-secondary)] leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">1. Who We Are</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) govern your use of the Grandis Innovo
              website and any services you engage us for, and form an agreement between you
              (&quot;Client,&quot; &quot;you&quot;) and <strong>Grandis Innovo Digital Services</strong>
              {" "}(&quot;Grandis Innovo,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), CAC
              Registration No. {REG_NO}, Abuja, Nigeria. By engaging our services or using this
              website, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">2. Our Services</h2>
            <p>
              We provide web development, mobile app development, UI/UX and brand design,
              tech support, and computer hardware sales and recommendations. The specific scope,
              timeline, and deliverables for any project will be agreed with you individually —
              typically following a consultation, quote, or proposal — before work begins. What&apos;s
              actually included in a given engagement is whatever is agreed in writing (email,
              signed proposal, or invoice), not just what&apos;s described generally on this site.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">3. Payment &amp; Installment Plans</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Pricing is agreed before work begins. Figures shown on our Pricing page are starting estimates, not final quotes.</li>
              <li>Where an installment plan is agreed, the payment schedule will be set out in writing at the start of the project.</li>
              <li>An initial deposit is typically required before work commences; the exact amount will be confirmed per project.</li>
              <li>We reserve the right to pause work on a project if agreed payments are more than 14 days overdue, until payment is brought current.</li>
              <li>Prices quoted in US Dollars anywhere on this site are approximate conversions from Naira for reference only — the Naira figure is the binding amount unless otherwise agreed in writing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">4. Revisions &amp; Project Scope</h2>
            <p>
              Each package includes a specified number of revision rounds (see your proposal or
              the Pricing page). Requests that go beyond the agreed scope of a project — new
              features, additional pages, or substantial design changes after approval — may be
              treated as a separate, additional engagement and quoted accordingly.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">5. Intellectual Property &amp; Ownership</h2>
            <p>
              Upon <strong>full and final payment</strong> for a project, ownership of the final
              agreed deliverables (e.g., website code, app build, design files) transfers to you,
              except for any third-party assets, libraries, stock media, or tools used under
              their own separate licenses, which remain subject to those licenses. Until full
              payment is received, all work remains the property of Grandis Innovo. We may
              retain the right to showcase completed work in our own portfolio and marketing
              materials, unless you request otherwise in writing.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">6. Hardware Sales</h2>
            <p>
              Computer hardware sourced or sold through Grandis Innovo is subject to the
              warranty terms of the original manufacturer or supplier, communicated to you at
              the time of purchase. We are not the manufacturer of third-party hardware and our
              liability for defective hardware is limited to facilitating the manufacturer&apos;s
              or supplier&apos;s own warranty process.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">7. Warranties &amp; Limitation of Liability</h2>
            <p>
              We provide our services with reasonable care and skill. However, to the fullest
              extent permitted by Nigerian law, Grandis Innovo is not liable for any indirect,
              incidental, or consequential damages (including loss of profits, data, or
              business) arising from your use of our services or deliverables. Our total
              liability for any claim relating to a project is limited to the amount you paid us
              for that specific project.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">8. Termination</h2>
            <p>
              Either party may terminate an ongoing project engagement with written notice. If
              you terminate before completion, you remain responsible for payment for work
              already completed up to the point of termination. If we terminate, we will refund
              any payment received for work not yet delivered.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">9. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Federal Republic of Nigeria. Any
              disputes will first be addressed through good-faith negotiation between the
              parties before any formal proceedings.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">10. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of our services after
              an update constitutes acceptance of the revised Terms. For active projects, the
              Terms in effect at the time your project began will continue to apply to that
              project.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">11. Contact</h2>
            <p>
              Questions about these Terms can be sent to{" "}
              <a href="mailto:grandisinovo@gmail.com" className="text-brand-blue dark:text-[#4a6cf7] underline">
                grandisinovo@gmail.com
              </a>.
            </p>
          </section>

          <p className="text-xs text-[var(--text-muted)] pt-6 border-t border-[var(--border-color)]">
            This document is a general template intended to cover common situations for a
            digital services business and does not constitute legal advice. We recommend having
            it reviewed by a qualified Nigerian lawyer before relying on it for a real client
            dispute or contract.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
