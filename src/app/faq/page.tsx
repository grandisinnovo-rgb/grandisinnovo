import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { FAQ } from "@/components/sections/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about timelines, payment plans, hardware procurement, and more.",
};

export default function FAQPage() {
  return (
    <SiteShell>
      <FAQ />
    </SiteShell>
  );
}
