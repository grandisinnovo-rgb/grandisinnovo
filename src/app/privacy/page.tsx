import type { Metadata } from "next";
import { FadeIn, SectionBadge } from "@/components/ui/Motion";
import { REG_NO } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Grandis Innovo Digital Services.",
};

const lastUpdated = "August 2026";

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom max-w-3xl mx-auto">
        <FadeIn><SectionBadge className="mb-4">Legal</SectionBadge></FadeIn>
        <FadeIn delay={0.1}>
          <h1 className="font-display font-extrabold text-4xl text-[var(--text-primary)] mb-3">
            Privacy Policy
          </h1>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: {lastUpdated}</p>
        </FadeIn>

        <FadeIn delay={0.2} className="space-y-10 text-[var(--text-secondary)] leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">1. Who We Are</h2>
            <p>
              This Privacy Policy explains how <strong>Grandis Innovo Digital Services</strong>{" "}
              (&quot;Grandis Innovo,&quot; &quot;we,&quot; &quot;us,&quot; &quot;our&quot;), CAC
              Registration No. {REG_NO}, Abuja, Nigeria, collects, uses, and protects your
              personal data when you visit this website or engage our services. We process
              personal data in accordance with the Nigeria Data Protection Act, 2023 (NDPA) and
              the regulations of the Nigeria Data Protection Commission (NDPC).
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">2. What We Collect</h2>
            <p>We collect personal data only when you choose to provide it to us, specifically:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Contact form</strong> — name, email, phone (optional), service of interest, and your message, when you submit our contact form.</li>
              <li><strong>Newsletter signup</strong> — your email address, when you subscribe via the footer.</li>
              <li><strong>WhatsApp</strong> — whatever you choose to share when you message us directly via WhatsApp.</li>
              <li><strong>Direct contact</strong> — anything you share by emailing or calling us directly.</li>
            </ul>
            <p className="mt-3">
              We do not currently use analytics or advertising cookies on this site. Your
              light/dark theme preference is stored locally in your browser and is never sent to
              us or any third party.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">3. How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to your enquiry and discuss your project.</li>
              <li>To send you the newsletter, if you subscribed to it.</li>
              <li>To deliver services you&apos;ve engaged us for, and communicate about that project.</li>
              <li>To meet legal or regulatory obligations, where applicable.</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal data, and we do not use it for purposes beyond what&apos;s
              described here without asking you first.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">4. Third Parties We Use</h2>
            <p>To operate this site and respond to you, we rely on the following processors:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Formspree</strong> — processes contact form submissions and delivers them to us by email.</li>
              <li><strong>Resend</strong> — sends newsletter confirmation emails.</li>
              <li><strong>WhatsApp (Meta)</strong> — if you message us via WhatsApp, that conversation is subject to WhatsApp&apos;s own privacy policy in addition to this one.</li>
              <li><strong>Vercel</strong> — hosts this website.</li>
            </ul>
            <p className="mt-3">
              Each of these providers processes data according to their own privacy policies,
              which we encourage you to review if you have specific concerns about how they
              handle data in transit.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">5. Data Retention</h2>
            <p>
              We keep contact form and enquiry data for as long as reasonably necessary to
              respond to you and, where a project results, for the duration of that business
              relationship plus a reasonable period afterward for record-keeping. Newsletter
              subscriber emails are kept until you unsubscribe.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">6. Your Rights</h2>
            <p>Under the NDPA, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Know what personal data we hold about you and why.</li>
              <li>Request a copy of your data.</li>
              <li>Request correction of inaccurate data.</li>
              <li>Request deletion of your data, where we&apos;re not required to keep it for a legal reason.</li>
              <li>Withdraw consent (e.g., unsubscribe from the newsletter) at any time.</li>
              <li>Object to certain uses of your data.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us using the details below. You also have
              the right to lodge a complaint with the Nigeria Data Protection Commission (NDPC)
              if you believe your data has been mishandled.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">7. Security</h2>
            <p>
              We take reasonable technical and organizational measures to protect the data you
              share with us. No method of transmission or storage is completely secure, and we
              cannot guarantee absolute security, but we work to minimize risk in how we handle
              your data.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">8. Children&apos;s Privacy</h2>
            <p>
              Our services are intended for businesses and individuals capable of entering into
              a service agreement. We do not knowingly collect personal data from children.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or legal requirements. The &quot;Last updated&quot; date at the top of
              this page reflects the most recent revision.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)] mb-3">10. Contact</h2>
            <p>
              For any questions about this Privacy Policy, or to exercise your data rights,
              contact us at{" "}
              <a href="mailto:grandisinovo@gmail.com" className="text-brand-blue dark:text-[#4a6cf7] underline">
                grandisinovo@gmail.com
              </a>.
            </p>
          </section>

          <p className="text-xs text-[var(--text-muted)] pt-6 border-t border-[var(--border-color)]">
            This document is a general template intended to reflect common NDPA obligations for
            a small digital services business and does not constitute legal advice. As you begin
            processing real client data, we recommend having a qualified Nigerian data protection
            professional or lawyer review this policy for your specific circumstances.
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
