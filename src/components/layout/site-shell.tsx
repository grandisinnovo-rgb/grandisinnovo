import { PromoBanner } from "@/components/layout/promo-banner";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/shared/scroll-progress";
import { WhatsAppWidget } from "@/components/shared/whatsapp-widget";

/**
 * Shared shell for every page: promo banner, sticky header, footer,
 * scroll progress bar, and the floating WhatsApp button. Keeps every
 * route consistent without repeating this wiring on each page.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <PromoBanner />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <WhatsAppWidget />
    </>
  );
}
