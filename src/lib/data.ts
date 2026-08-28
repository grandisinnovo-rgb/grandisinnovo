import type { LucideIcon } from "lucide-react";
import {
  Code2, Smartphone, Palette, Wrench, Monitor, ShoppingBag,
  Shield, Zap, Globe, Clock,
} from "lucide-react";

// CAC (Corporate Affairs Commission) registration number — displayed in the header.
export const REG_NO = "RC 9403351";

// WhatsApp number in international format, digits only (no +, spaces, or dashes) —
// required by the wa.me link format. Matches the phone number shown elsewhere on
// the site (+234 900 000 0000); update both together if the real number changes.
export const WHATSAPP_NUMBER = "2349133393983";

/** Builds a wa.me deep link that opens WhatsApp with a prefilled greeting. */
export function buildWhatsAppLink(message = "Hi Grandis Innovo, I'd like to find out more about your services.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Service = {
  slug: string;
  anchorGroup: "web-dev" | "mobile" | "design" | "support" | "sales";
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  features: string[];
};

// anchorGroup matches the hash links used in Footer.tsx and elsewhere
// (/services#web-dev, #mobile, #design, #support, #sales) so nav/footer
// links actually land on the right section instead of just the page top.
export const services: Service[] = [
  { slug: "web-development", anchorGroup: "web-dev", icon: Code2, title: "Web Development", desc: "Custom, high performance websites and web apps built with modern frameworks and best practices.", color: "#283889", features: ["React / Next.js", "Full-Stack", "SEO Optimized"] },
  { slug: "mobile-app-development", anchorGroup: "mobile", icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform mobile apps that deliver seamless experiences on iOS and Android.", color: "#3f1119", features: ["React Native", "Flutter", "iOS & Android"] },
  { slug: "ui-ux-design", anchorGroup: "design", icon: Palette, title: "Web & UI/UX Design", desc: "Stunning, conversion-focused designs crafted to make your brand stand out and convert visitors.", color: "#283889", features: ["Figma Design", "Prototyping", "Brand Systems"] },
  { slug: "tech-support", anchorGroup: "support", icon: Wrench, title: "Tech Support", desc: "Reliable technical support and proactive computer maintenance to keep your business running.", color: "#3f1119", features: ["Remote Support", "On-Site Visits", "Preventive Care"] },
  { slug: "pc-recommendations", anchorGroup: "sales", icon: Monitor, title: "PC Recommendations", desc: "Expert, unbiased advice on the right hardware for your team's needs and budget.", color: "#283889", features: ["Custom Builds", "Budget Planning", "Spec Analysis"] },
  { slug: "laptop-desktop-sales", anchorGroup: "sales", icon: ShoppingBag, title: "Laptop & Desktop Sales", desc: "Quality laptops and desktops sourced and supplied at competitive prices with warranty support.", color: "#3f1119", features: ["Brand Variety", "Warranty Backed", "Fast Delivery"] },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  photoHover?: string; // optional — if set, crossfades to this image on hover/focus instead of the blur reveal
  social: { linkedin?: string; twitter?: string; github?: string; instagram?: string; facebook?: string };
};

export const team: TeamMember[] = [
  {
    name: "Ini Tom",
    role: "CEO & Founder | Web Developer",
    bio: "Leading Grandis Innovo's vision by building innovative and scalable digital solutions.",
    photo: "/team/ini-tom.png",
    photoHover: "/team/ini-tom-hover.png",
    social: { linkedin: "https://www.linkedin.com/in/ini-toma1/", github: "https://github.com/initom332" },
  },
    {
    name: "Ann Haa Fatema",
    role: "Social Media Manager, Promoter & Marketer",
    bio: "Helping businesses grow through strategic marketing, branding, and digital engagement.",
    photo: "/team/ann-haa-fatema.jpeg",
    photoHover: "/team/ann-haa-fatema-hover.png",
    social: { linkedin: "https://www.linkedin.com/in/ann-haa-5802b735b/", },
  },
  {
    name: "Daniel Shaku Jimjel",
    role: "Co-Founder | Lead Product Designer",
    bio: "Creating intuitive and premium digital experiences that users love.",
    photo: "/team/daniel-shaku-jimjel.png",
    photoHover: "/team/daniel-shaku-jimjel-hover.png",
    social: { linkedin: "https://www.linkedin.com/in/jimjel-daniel-ishaku-35a65b236/", },
  },

];

export const whyPoints = [
  { icon: Shield, title: "Startup Friendly Pricing", desc: "Flexible packages designed to grow with your business no enterprise level budgets needed." },
  { icon: Zap, title: "Fast Turnaround", desc: "We move at startup speed with clear timelines and milestone based delivery. No endless waiting." },
  { icon: Globe, title: "Full-Stack Capability", desc: "From design to deployment we handle everything so you can focus on growing your business." },
  { icon: Clock, title: "Ongoing Partnership", desc: "We don't just build and leave. We stay as your long term tech partner for updates and growth." },
];

export const portfolioHighlights = [
  { title: "VendorOps Dashboard", category: "Dashboard Development", description: "An inventory dashboard for monitoring stock, identifying shortages, and managing restocking workflows.", tech: ["React Native", "Firebase", "Paystack"], color: "#3f1119", Icon: Smartphone, image: "/portfolio/VEN.png", link: "https://creative-manatee-4c0e4e.netlify.app" },
  { title: "MediCore Dashboard", category: "UI/UX Design", description: "A clinical dashboard for monitoring healthcare data, laboratory results, and operational activity.", tech: ["Figma", "React", "Tailwind"], color: "#283889", Icon: Palette, image: "/portfolio/MED.png", link: "https://astounding-stroopwafel-6cdb42.netlify.app" },
  { title: "ATELIER Website", category: "Web Development", description: "A full-stack refined interior design portfolio showcasing services, projects, design philosophy, and client inquiries.", tech: ["Next.js", "Node.js", "Stripe"], color: "#283889", Icon: Globe, image: "/portfolio/at.png", link: "https://tubular-sherbet-a3fd5f.netlify.app" },
  { title: "SparkleClean", category: "UI/UX Design", description: "A data rich modern cleaning service website built around service discovery, online booking, and customer trust.", tech: ["Figma", "React", "Tailwind"], color: "#283889", Icon: Palette, image: "/portfolio/SPA.png", link: "https://eclectic-salmiakki-48dc65.netlify.app" },
  { title: "CareConnect", category: "Full Stack Development", description: "A telehealth platform simplifying doctor discovery, transparent pricing, and appointment booking.", tech: ["Figma", "React", "Tailwind"], color: "#283889", Icon: Palette, image: "/portfolio/CC.png", link: "https://exquisite-dieffenbachia-fc08cc.netlify.app" },
];

// Update this when the rate moves meaningfully — approximate mid-market rate,
// checked August 2026 (~₦1,350 / $1). USD figures shown on the site are
// rounded estimates for reference only, not exact invoicing amounts.
export const USD_TO_NGN_RATE = 1350;

export function formatPrice(ngn: number | null): string {
  if (ngn === null) return "Custom Quote";
  const usd = Math.round(ngn / USD_TO_NGN_RATE / 10) * 10; // round to nearest $10
  return `₦${ngn.toLocaleString()} (~$${usd.toLocaleString()})`;
}

export type PricingPlan = {
  name: string;
  audience: string;
  priceNGN: number | null;
  installment: string;
  features: string[];
  highlighted: boolean;
};

// NGN prices are placeholders — replace with real figures before launch.
// USD equivalents are derived automatically via formatPrice() / USD_TO_NGN_RATE
// above, so you only ever need to update the Naira figure in one place.
export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    audience: "Best for startups",
    priceNGN: 400000,
    installment: "Pay in 2 installments",
    features: [
      "Up to 5 pages",
      "Mobile-responsive design",
      "Basic SEO setup",
      "1 round of revisions",
      "Launch in ~2 weeks",
    ],
    highlighted: false,
  },
  {
    name: "Business",
    audience: "Best for SMEs",
    priceNGN: 850000,
    installment: "Flexible installment plan available",
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
    priceNGN: null,
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
];

export type FAQItem = { q: string; a: string };

export const faqs: FAQItem[] = [
  {
    q: "How long does website development take?",
    a: "Most standard websites launch within 2–4 weeks of project kickoff, depending on scope. Custom web applications may take longer — we'll give you a clear timeline during your consultation.",
  },
  {
    q: "Do you offer installment payment plans?",
    a: "Yes. Most packages can be split into installments — we'll agree on a schedule with you before work begins so cash flow never blocks your launch.",
  },
  {
    q: "Do you handle computer hardware sales and recommendations?",
    a: "Yes. We advise on the right hardware for your needs and budget, and source laptops and desktops from vetted suppliers with warranty support.",
  },
  {
    q: "Do you offer ongoing maintenance after launch?",
    a: "Yes — all packages can include an ongoing maintenance plan covering updates, monitoring, and technical support after your site or app goes live.",
  },
  {
    q: "Can you handle branding as part of a website project?",
    a: "Absolutely. Many clients bundle UI/UX and brand identity work with website development so the visual system is consistent from the first sketch to the live site.",
  },
  {
    q: "Do you build both Android and iOS apps?",
    a: "Yes — we build native and cross-platform mobile apps, depending on your budget and target audience.",
  },
];
