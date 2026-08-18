import { siteConfig } from "@/lib/site-config";

/**
 * Organization + LocalBusiness structured data, injected on the homepage.
 * Helps Google understand Grandis Innovo as an entity (knowledge panel eligibility)
 * and as a local business for map/local search results.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.mission,
    url: "https://grandisinnovo.com",
    logo: "https://grandisinnovo.com/images/logo.png",
    slogan: siteConfig.tagline,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.facebook,
      siteConfig.social.twitter,
      siteConfig.social.instagram,
      siteConfig.social.github,
    ],
    makesOffer: [
      "Website Development",
      "Mobile Application Development",
      "Branding & Identity Design",
      "UI/UX Design",
      "Computer Hardware Engineering & Maintenance",
      "Computer Procurement Services",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
