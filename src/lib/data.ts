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
export const WHATSAPP_NUMBER = "+234 9133393983";

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
  { slug: "mobile-app-development", anchorGroup: "mobile", icon: Smartphone, title: "Mobile App Development", desc: "Native and cross platform mobile apps that deliver seamless experiences on iOS and Android.", color: "#3f1119", features: ["React Native", "Flutter", "iOS & Android"] },
  { slug: "ui-ux-design", anchorGroup: "design", icon: Palette, title: "Web & UI/UX Design", desc: "Stunning, conversion focused designs crafted to make your brand stand out and convert visitors.", color: "#283889", features: ["Figma Design", "Prototyping", "Brand Systems"] },
  { slug: "tech-support", anchorGroup: "support", icon: Wrench, title: "Tech Support", desc: "Reliable technical support and proactive computer maintenance to keep your business running.", color: "#3f1119", features: ["Remote Support", "On-Site Visits", "Preventive Care"] },
  { slug: "pc-recommendations", anchorGroup: "sales", icon: Monitor, title: "PC Recommendations", desc: "Expert, unbiased advice on the right hardware for your team's needs and budget.", color: "#283889", features: ["Custom Builds", "Budget Planning", "Spec Analysis"] },
  { slug: "laptop-desktop-sales", anchorGroup: "sales", icon: ShoppingBag, title: "Laptop & Desktop Sales", desc: "Quality laptops and desktops sourced and supplied at competitive prices with warranty support.", color: "#3f1119", features: ["Brand Variety", "Warranty Backed", "Fast Delivery"] },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  social: { linkedin?: string; twitter?: string; github?: string; instagram?: string; facebook?: string };
};

export const team: TeamMember[] = [
  {
    name: "Ini Tom",
    role: "CEO & Founder | Web Developer Data Scientist",
    bio: "Leading Grandis Innovo's vision by building innovative and scalable digital solutions.",
    photo: "/team/ini-tom.png",
    social: { linkedin: "https://www.linkedin.com/in/ini-toma1/", github: "https://github.com/initom332/initom332" },
  },
  {
    name: "Daniel Shaku Jimjel",
    role: "Co-Founder | Lead Product Designer",
    bio: "Creating intuitive and premium digital experiences that users love.",
    photo: "/team/daniel-shaku-jimjel.png",
    social: { linkedin: "https://www.linkedin.com/in/jimjel-daniel-ishaku-35a65b236/"},
  },
  {
    name: "Tope Sunday",
    role: "Computer Hardware Engineer & Technician",
    bio: "Providing reliable hardware maintenance, procurement, and technical support services.",
    photo: "/team/tope-sunday.png",
    social: { linkedin: "#"},
  },
  {
    name: "Ann Haa Fatema",
    role: "Social Media Manager, Promoter & Marketer",
    bio: "Helping businesses grow through strategic marketing, branding, and digital engagement.",
    photo: "/team/ann-haa-fatema.png",
    social: { linkedin: "https://www.linkedin.com/in/ann-haa-5802b735b/"},
  },
];

export const whyPoints = [
  { icon: Shield, title: "Startup-Friendly Pricing", desc: "Flexible packages designed to grow with your business no enterprise level budgets needed." },
  { icon: Zap, title: "Fast Turnaround", desc: "We move at startup speed with clear timelines and milestone based delivery. No endless waiting." },
  { icon: Globe, title: "Full-Stack Capability", desc: "From design to deployment we handle everything so you can focus on growing your business." },
  { icon: Clock, title: "Ongoing Partnership", desc: "We don't just build and leave. We stay as your long term tech partner for updates and growth." },
];

export const portfolioHighlights = [
  { title: "MediCore Clinical Dashboard", category: "Dashboard", description: "A responsive healthcare analytics dashboard built to monitor patient records, clinical performance, and operational metrics through interactive data visualization.", tech: ["Figma", "React", "Tailwind"], color: "#283889", Icon: Palette, image: "/portfolio/pro4.png", link: "https://astounding-stroopwafel-6cdb42.netlify.app/" },
  { title: "VendorOps Inventory", category: "Dashboard", description: "A modern inventory and vendor management dashboard designed to streamline stock monitoring, supplier operations, and business performance reporting through an intuitive interface.", tech: ["Figma", "React", "Tailwind"], color: "#283889", Icon: Palette, image: "/portfolio/pro5.png", link: "https://creative-manatee-4c0e4e.netlify.app/" },
  { title: "CareConnect(Healthcare UX Case Study)", category: "Web Development", description: "A user centered healthcare platform designed to simplify patient care, appointment management, and provider communication through intuitive UX research and modern interface design.", tech: ["Next.js", "Node.js", "Stripe"], color: "#283889", Icon: Globe, image: "/portfolio/pro1.png", link: "https://exquisite-dieffenbachia-fc08cc.netlify.app/" },
  { title: "SparkleClean (Cleaning Service Website)", category: "UI/UX Design", description: "A premium service website created for a modern cleaning company, featuring professional branding, service showcases, online booking, and a conversion-focused customer experience.", tech: ["React Native", "Firebase", "Paystack"], color: "#3f1119", Icon: Smartphone, image: "/portfolio/pro2.png", link: "https://eclectic-salmiakki-48dc65.netlify.app/" },
  { title: "ATELIER (Interior Design Website)", category: "Web Development", description: "A luxury interior design portfolio website that highlights architectural creativity, premium aesthetics, project showcases, and seamless client engagement.", tech: ["Figma", "React", "Tailwind"], color: "#283889", Icon: Palette, image: "/portfolio/pro3.png", link: "https://tubular-sherbet-a3fd5f.netlify.app/" },
];
