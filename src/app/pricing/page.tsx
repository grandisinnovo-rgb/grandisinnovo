import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Starter, Business, and Premium packages — with a flexible 5-month installment plan on every tier.",
};

export default function PricingPage() {
  return (
    <SiteShell>
      <Pricing />
      <FAQ />
    </SiteShell>
  );
}
