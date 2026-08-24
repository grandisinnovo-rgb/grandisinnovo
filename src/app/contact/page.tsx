import type { Metadata } from "next";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { FadeIn, SectionBadge } from "@/components/ui/Motion";
import { buildWhatsAppLink } from "@/lib/data";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get a free consultation and project quote from Grandis Innovo within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <section className="container-custom">
        <div className="text-center mb-20">
          <FadeIn><SectionBadge className="mb-4">Get In Touch</SectionBadge></FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
              Let&apos;s Build Something <span className="text-gradient-blue">Great Together</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
              Tell us about your project and we&apos;ll respond within one business day free
              consultation, no obligation.
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 max-w-5xl mx-auto">
          <FadeIn direction="left" className="space-y-4">
            <div className="card-base p-6 space-y-5">
              <a href="mailto:grandisinovo@gmail.com" className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#283889,#4a6cf7)" }}>
                  <Mail className="w-4 h-4 text-white" />
                </span>
                grandisinovo@gmail.com
              </a>
              <a href="tel:+2349133393983" className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#283889,#4a6cf7)" }}>
                  <Phone className="w-4 h-4 text-white" />
                </span>
                +234 9133393983
              </a>
              <div className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#283889,#4a6cf7)" }}>
                  <MapPin className="w-4 h-4 text-white" />
                </span>
                Abuja, Nigeria
              </div>
            </div>

            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </FadeIn>

          <FadeIn direction="right">
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
