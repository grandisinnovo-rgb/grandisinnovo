import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/site-shell";
import { Team } from "@/components/sections/team";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the developers, designers, and engineers behind Grandis Innovo.",
};

export default function TeamPage() {
  return (
    <SiteShell>
      <Team />
    </SiteShell>
  );
}
