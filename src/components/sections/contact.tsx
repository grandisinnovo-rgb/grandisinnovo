import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig, buildWhatsAppLink } from "@/lib/site-config";

export function Contact({ defaultService }: { defaultService?: string }) {
  return (
    <section id="contact" className="section-padding bg-white dark:bg-primary" aria-labelledby="contact-heading">
      <SectionHeading
        eyebrow="Get In Touch"
        title="Let's build something great together."
        description="Tell us about your project and we'll respond within one business day."
      />

      <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="glass-panel space-y-5 p-6">
            <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-3 text-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grandis-gradient text-white">
                <Phone className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-primary/80 dark:text-white/80">{siteConfig.contact.phone}</span>
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grandis-gradient text-white">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-primary/80 dark:text-white/80">{siteConfig.contact.email}</span>
            </a>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grandis-gradient text-white">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-primary/80 dark:text-white/80">{siteConfig.contact.address}</span>
            </div>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center bg-[#25D366] shadow-none hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>

          {/* Google Maps embed */}
          <div className="glass-panel overflow-hidden">
            <iframe
              title="Grandis Innovo location"
              className="h-64 w-full grayscale invert-[0.9] contrast-[0.9]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Abuja,Nigeria&output=embed"
            />
          </div>
        </div>

        <ContactForm defaultService={defaultService} />
      </div>
    </section>
  );
}
