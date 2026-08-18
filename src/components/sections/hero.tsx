"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Compass, FileText } from "lucide-react";

const stats = [
  { label: "Avg. launch time", value: "30 days" },
  { label: "Services under one roof", value: "6" },
  { label: "Payment flexibility", value: "5-month plan" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.45, ease: "easeOut" },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary dark:bg-dark" aria-label="Introduction">
      {/* Signature background: ambient gradient glow + animated circuit-trace grid */}
      <div className="pointer-events-none absolute inset-0 bg-grandis-radial" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-trace-lines opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-secondary/20 blur-[120px] animate-float" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[120px] animate-float" aria-hidden="true" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pb-24 pt-20 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-20 lg:pb-32 lg:pt-28">
        {/* Copy column */}
        <div className="relative flex flex-col justify-center">
          <motion.span variants={fadeUp} initial="hidden" animate="visible" custom={0} className="eyebrow">
            Grandis Innovo Digital &amp; Technology Solutions
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="min-h-[4.95rem] text-4xl font-bold leading-[1.1] text-white sm:min-h-[6.6rem] sm:text-5xl lg:min-h-[8.25rem] lg:text-6xl"
          >
            Building Digital Experiences That <span className="text-gradient">Drive Growth.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="mt-6 max-w-xl text-lg text-white/70"
          >
            At Grandis Innovo, we create world-class digital and technology solutions that help
            businesses grow and succeed.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-2 font-display text-lg font-semibold text-accent"
          >
            Your Success is Our Priority.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-10 flex flex-wrap gap-3"
          >
            <Link href="/contact?intent=start-project" className="btn-primary">
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact?intent=consultation#consultation" className="btn-secondary text-white">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Book a Consultation
            </Link>
            <Link href="/services" className="btn-secondary text-white">
              <Compass className="h-4 w-4" aria-hidden="true" />
              View Our Services
            </Link>
            <Link href="/contact?intent=quote" className="btn-secondary text-white">
              <FileText className="h-4 w-4" aria-hidden="true" />
              Request a Quote
            </Link>
          </motion.div>

          {/* Stat strip */}
          <motion.dl
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-glass-border pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-wide text-white/50">{stat.label}</dt>
                <dd className="mt-1 font-display text-xl font-semibold text-white">{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Visual column: floating glass panel standing in for premium illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative hidden items-center justify-center lg:flex"
        >
          <div className="glass-panel h-[26rem] w-full max-w-md animate-float p-8">
            <div className="trace-divider mb-6" />
            <div className="space-y-4">
              <div className="h-3 w-3/4 rounded-full bg-white/15" />
              <div className="h-3 w-1/2 rounded-full bg-white/10" />
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="glass-panel h-24 bg-secondary/10" />
                <div className="glass-panel h-24 bg-accent/10" />
              </div>
              <div className="glass-panel mt-4 h-28 bg-white/5" />
            </div>
            <p className="mt-6 font-mono text-xs text-white/40">
              // web · mobile · brand · UI/UX · hardware
            </p>
          </div>
        </motion.div>
      </div>

      <div className="trace-divider" />
    </section>
  );
}
