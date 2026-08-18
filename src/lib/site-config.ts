export const siteConfig = {
  name: "Grandis Innovo",
  tagline: "Innovating the Future, Building Your Success.",
  mission:
    "To provide innovative digital and technology solutions that empower businesses and individuals through world-class software development, branding, UI/UX design, and computer hardware services.",
  coreValue: "At Grandis Innovo, our customers always come first.",
  cacNumber: "RC-XXXXXXX", // placeholder — replace with real CAC registration number
  contact: {
    phone: "+234 000 000 0000", // placeholder
    email: "hello@grandisinnovo.com", // placeholder
    whatsappNumber: "2340000000000", // placeholder — digits only, country code, no + or spaces
    address: "Abuja, FCT, Nigeria", // placeholder
  },
  social: {
    linkedin: "https://linkedin.com/company/grandisinnovo",
    facebook: "https://facebook.com/grandisinnovo",
    twitter: "https://x.com/grandisinnovo",
    instagram: "https://instagram.com/grandisinnovo",
    github: "https://github.com/grandisinnovo",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export type Service = {
  slug: string;
  title: string;
  icon: "code" | "smartphone" | "palette" | "figma" | "cpu" | "shopping-cart";
  description: string;
  benefits: string[];
  offerings: string[];
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    icon: "code",
    description:
      "Fast, scalable websites engineered for growth — from first landing page to full e-commerce.",
    benefits: ["SEO-ready from day one", "Built to scale with your business", "Launch in as little as 30 days"],
    offerings: [
      "Corporate websites",
      "Business websites",
      "Portfolio websites",
      "Landing pages",
      "E-commerce websites",
      "Custom web applications",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile Application Development",
    icon: "smartphone",
    description:
      "Native and cross-platform apps that feel fast and familiar on every device your customers use.",
    benefits: ["One codebase, every platform", "Native performance", "App-store-ready delivery"],
    offerings: ["Android applications", "iOS applications", "Cross-platform applications"],
  },
  {
    slug: "branding-identity",
    title: "Branding & Identity Design",
    icon: "palette",
    description: "A visual identity your customers recognize instantly — and trust immediately.",
    benefits: ["Consistent brand system", "Ready-to-use marketing assets", "Strategy behind every asset"],
    offerings: ["Logo design", "Brand identity systems", "Marketing assets", "Brand strategy"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    icon: "figma",
    description: "Interfaces shaped by real user research — designed to convert, not just look good.",
    benefits: ["Grounded in user research", "Tested before you build", "Pixel-perfect handoff"],
    offerings: ["Product design", "User research", "Wireframing", "Interactive prototypes"],
  },
  {
    slug: "hardware-engineering",
    title: "Computer Hardware Engineering & Maintenance",
    icon: "cpu",
    description: "Reliable, on-site and remote hardware support to keep your team running.",
    benefits: ["Certified technicians", "Fast turnaround", "Transparent diagnostics"],
    offerings: ["Laptop repairs", "Desktop maintenance", "Diagnostics", "Software installations", "Hardware upgrades"],
  },
  {
    slug: "computer-procurement",
    title: "Computer Procurement Services",
    icon: "shopping-cart",
    description: "Source the right equipment at the right price — vetted, warrantied, delivered.",
    benefits: ["Vetted suppliers", "Bulk & office procurement", "Warranty support"],
    offerings: [
      "Laptops",
      "Desktop computers",
      "Accessories",
      "Computer peripherals",
      "Computer components and parts",
      "Office technology procurement",
    ],
  },
];

export type TeamMember = {
  name: string;
  position: string;
  roles?: string[];
  bio: string;
  social: { linkedin?: string; facebook?: string; twitter?: string; instagram?: string; github?: string };
};

export const team: TeamMember[] = [
  {
    name: "Ini Tom",
    position: "CEO & Founder",
    roles: ["Full Stack Web Developer", "Software Engineer", "Technical Lead"],
    bio: "Leading Grandis Innovo's vision by building innovative and scalable digital solutions.",
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    name: "Daniel Shaku Jimjel",
    position: "Co-Founder",
    roles: ["Lead Product Designer", "UI/UX Designer"],
    bio: "Creating intuitive and premium digital experiences that users love.",
    social: { linkedin: "#", twitter: "#", instagram: "#" },
  },
  {
    name: "Tope Sunday",
    position: "Computer Hardware Engineer & Technician",
    bio: "Providing reliable hardware maintenance, procurement, and technical support services.",
    social: { linkedin: "#", facebook: "#" },
  },
  {
    name: "Ann Haa Fatema",
    position: "Social Media Manager, Promoter & Marketer",
    bio: "Helping businesses grow through strategic marketing, branding, and digital engagement.",
    social: { linkedin: "#", instagram: "#", facebook: "#" },
  },
];

/**
 * Builds a WhatsApp deep link with a prefilled, context-aware message.
 * This is what "automates" the WhatsApp contact channel without needing
 * the WhatsApp Business API: whatever the visitor already typed or selected
 * (name, service, message) is carried straight into the chat, so they don't
 * have to retype anything and the team gets full context on the first message.
 */
export function buildWhatsAppLink(params?: { name?: string; service?: string; message?: string }) {
  const lines = ["Hi Grandis Innovo,"];

  if (params?.service) lines.push(`I'm interested in: ${params.service}.`);
  if (params?.name) lines.push(`My name is ${params.name}.`);
  if (params?.message) lines.push(params.message);

  if (lines.length === 1) {
    lines.push("I'd like to find out more about your services.");
  }

  const text = encodeURIComponent(lines.join(" "));
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${text}`;
}

export const pricingPlans = [
  {
    name: "Starter",
    audience: "Best for startups",
    price: "₦XXX,000", // placeholder
    installment: "Pay in 2 installments",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Basic SEO setup",
      "1 round of revisions",
      "30-day delivery",
    ],
    highlighted: false,
  },
  {
    name: "Business",
    audience: "Best for SMEs",
    price: "₦XXX,000", // placeholder
    installment: "5-month installment plan available",
    features: [
      "Up to 12 pages",
      "Custom UI/UX design",
      "Advanced SEO + analytics",
      "Content management for easy updates",
      "3 rounds of revisions",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    audience: "Best for enterprise clients",
    price: "Custom quote", // placeholder
    installment: "Flexible installment plans available",
    features: [
      "Unlimited pages",
      "Custom web application features",
      "Dedicated project manager",
      "Full SEO + performance audit",
      "Ongoing maintenance plan",
      "24/7 priority support",
    ],
    highlighted: false,
  },
] as const;
