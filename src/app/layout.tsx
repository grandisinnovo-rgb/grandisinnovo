import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import BackToTop from "@/components/BackToTop";

const siteUrl = "https://grandisinnovo.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Grandis Innovo — Modern Tech Solutions",
    template: "%s | Grandis Innovo",
  },
  description:
    "Grandis Innovo delivers cutting-edge web development, mobile apps, UI/UX design, and tech support for startups and growing businesses. Affordable. Reliable. Innovative.",
  keywords: ["web development", "mobile app development", "UI/UX design", "tech support", "Nigeria tech company", "Abuja"],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Grandis Innovo",
    title: "Grandis Innovo — Modern Tech Solutions",
    description:
      "Cutting-edge web development, mobile apps, UI/UX design, and tech support for startups and growing businesses.",
    images: [{ url: "/og-cover.jpg", width: 1200, height: 630, alt: "Grandis Innovo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grandis Innovo — Modern Tech Solutions",
    description: "Cutting-edge web development, mobile apps, UI/UX design, and tech support.",
    images: ["/og-cover.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <CustomCursor />
          <HeaderWrapper />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
