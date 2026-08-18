import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] relative overflow-hidden pt-32">
      <div className="absolute inset-0 grid-overlay" />
      <div className="container-custom relative text-center">
        <div className="font-display font-extrabold text-[180px] leading-none text-brand-blue/10 dark:text-[#4a6cf7]/10 select-none mb-4">
          404
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4 -mt-8">
          Page Not Found
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-10 max-w-md mx-auto">
          Looks like this page took a wrong turn. Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            Back to Home
          </Link>
          <Link href="/contact" className="btn-secondary inline-flex items-center gap-2">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
