"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowRight, CheckCircle, Star, Sparkles, TrendingUp, Users, Award,
  ChevronRight, ExternalLink,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, SectionBadge } from "@/components/ui/Motion";
import { AIWorkflowMarquee } from "@/components/AIWorkflowMarquee";
import { services, whyPoints, portfolioHighlights } from "@/lib/data";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const TYPEWRITER_WORDS = ["Websites", "Mobile Apps", "Startups", "Brands", "Ideas"];
// Longest word in the rotation — used to reserve a fixed width for the typed
// word so shorter/longer words never change the h1's line-wrap as they type.
const TYPEWRITER_LONGEST_WORD = TYPEWRITER_WORDS.reduce((a, b) => (b.length > a.length ? b : a));

const stats = [
  { value: "17+", label: "Projects Delivered", icon: TrendingUp },
  { value: "8", label: "Happy Clients",       icon: Users },
  { value: "4+",  label: "Years Experience",    icon: Award },
  { value: "98%", label: "Client Satisfaction", icon: Star },
];

const testimonials = [
  { quote: "Grandis Innovo transformed our online presence completely. The website they built drove a 3x increase in leads within the first month. Genuinely impressive work.", author: "King Akinmarin",     role: "CEO, LINDS",       avatar: "AA" },
  { quote: "Fast, professional, and surprisingly affordable. They understood exactly what our startup needed and delivered beyond expectations. We'll keep coming back.",         author: " Tom Bassey ", role: "Founder, Sparkling Cleaners",          avatar: "TB" },
  { quote: "Their tech support team is a lifesaver. When our office systems crashed before a big pitch, they had everything up in 2 hours. Absolute legends.",                  author: "Burnan Miri",      role: "Operations Manager, Mart", avatar: "BM" },
];

/* ─── Typewriter hook ────────────────────────────────────────────────────── */
function useTypewriter(words: string[], speed = 90, pause = 1800, deleteSpeed = 55) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blinking, setBlinking] = useState(true);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, deleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIdx, words, speed, pause, deleteSpeed]);

  return text;
}

/* ─── Magnetic Button wrapper ────────────────────────────────────────────── */
function MagneticWrap({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      {children}
    </motion.div>
  );
}

/* ─── Tilt Card ──────────────────────────────────────────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const sRotX = useSpring(rotX, { stiffness: 160, damping: 22 });
  const sRotY = useSpring(rotY, { stiffness: 160, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-ny * 8);
    rotY.set(nx * 8);
  };
  const onLeave = () => { rotX.set(0); rotY.set(0); };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d", perspective: 800 }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function HomeClient() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const typedWord = useTypewriter(TYPEWRITER_WORDS);

  return (
    <div className="overflow-hidden">

      {/* ═══════════════════════════════════════════ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden">

        {/* Background orbs */}
        <div className="absolute inset-0 bg-[var(--bg-primary)]">
          <div className="absolute inset-0 grid-overlay" />
          <motion.div
            style={{ y: heroY, background: "radial-gradient(circle, #283889 0%, transparent 65%)" }}
            className="absolute top-[-5%] right-[-5%] w-[640px] h-[640px] rounded-full opacity-[0.13] dark:opacity-[0.08] pointer-events-none"
          />
          <motion.div
            style={{ y: heroY, background: "radial-gradient(circle, #3f1119 0%, transparent 65%)" }}
            className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.09] dark:opacity-[0.06] pointer-events-none"
          />
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { pos:"top-1/4 right-[12%]", size:"w-14 h-14", cls:"border-2 border-brand-blue/20 rounded-xl", anim:{ y:[0,-18,0], rotate:[0,6,0] }, dur:6 },
            { pos:"top-[38%] right-[28%]",size:"w-7 h-7",  cls:"bg-brand-red/10 rounded-full",               anim:{ y:[0,14,0], rotate:[0,-8,0]}, dur:5, delay:1 },
            { pos:"bottom-1/3 left-[8%]", size:"w-11 h-11",cls:"border-2 border-brand-blue/15 rotate-45",    anim:{ y:[0,-12,0] },                dur:4, delay:0.5 },
            { pos:"top-[58%] right-[6%]", size:"w-5 h-5",  cls:"bg-brand-blue/15 rounded-full",               anim:{ y:[0,22,0], x:[0,6,0]},       dur:7, delay:2 },
            { pos:"top-[18%] left-[18%]", size:"w-2 h-2",  cls:"bg-brand-blue rounded-full",                  anim:{ scale:[1,1.3,1], opacity:[0.4,0.8,0.4] }, dur:3 },
            { pos:"bottom-[28%] right-[22%]",size:"w-3 h-3",cls:"bg-brand-red rounded-full",                  anim:{ scale:[1,1.4,1], opacity:[0.2,0.6,0.2] }, dur:4, delay:1.5 },
          ].map(({ pos, size, cls, anim, dur, delay }, i) => (
            <motion.div
              key={i}
              animate={anim}
              transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: delay ?? 0 }}
              className={`absolute ${pos} ${size} ${cls}`}
            />
          ))}
        </div>

        {/* Hero content — CENTERED */}
        <motion.div style={{ opacity: heroOpacity }} className="container-custom relative z-10 flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, ease:[0.22,1,0.36,1] }} className="mb-8">
            <SectionBadge>
              <Sparkles className="w-3 h-3" />
              Affordable Tech, Exceptional Results
            </SectionBadge>
          </motion.div>

          {/* H1 — reduced size + typewriter. min-h reserves space for exactly 2 lines at
              each breakpoint so font loading / sizing never shifts anything below it. */}
          <motion.h1
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.7, delay:0.1, ease:[0.22,1,0.36,1] }}
            className="font-display font-extrabold text-4xl md:text-5xl lg:text-[3.6rem] text-[var(--text-primary)] leading-[1.08] mb-6 max-w-4xl min-h-[4.86rem] md:min-h-[6.48rem] lg:min-h-[7.776rem]"
          >
            We Build{" "}
            <span className="relative inline-block">
              <span className="text-gradient-blue">Digital Products</span>
              <motion.span
                initial={{ scaleX:0 }}
                animate={{ scaleX:1 }}
                transition={{ duration:0.8, delay:0.65, ease:[0.22,1,0.36,1] }}
                style={{ transformOrigin:"left" }}
                className="absolute bottom-0.5 left-0 right-0 h-[3px] bg-brand-blue/25 dark:bg-[#4a6cf7]/25 rounded-full"
              />
            </span>
            <br />
            That{" "}
            <span className="text-brand-red dark:text-[#c45a6a]">Grow</span>{" "}
            Your{" "}
            {/* Typewriter word — an invisible "ghost" span sized to the longest word
                in the rotation reserves a fixed-width box. The actual typed text and
                caret are absolutely positioned inside that box, so as the word types
                and deletes, its changing width never resizes the box itself — nothing
                around it moves. */}
            <span className="relative inline-block whitespace-nowrap align-baseline">
              <span aria-hidden="true" className="invisible">
                {TYPEWRITER_LONGEST_WORD}
              </span>
              <span className="absolute inset-y-0 left-0 inline-flex items-baseline whitespace-nowrap">
                <span className="text-gradient-blue">{typedWord}</span>
                <motion.span
                  animate={{ opacity:[1,0,1] }}
                  transition={{ duration:0.85, repeat:Infinity, ease:"linear" }}
                  className="inline-block w-[3px] h-[0.9em] bg-brand-blue dark:bg-[#4a6cf7] ml-[2px] align-middle rounded-sm"
                />
              </span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.3, ease:[0.22,1,0.36,1] }}
            className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-10"
          >
            Grandis Innovo is your all in one tech partner. From stunning websites and mobile
            apps to design, support, and hardware we help startups and SMBs move faster and
            look better doing it.
          </motion.p>

          {/* CTAs with magnetic effect */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.6, delay:0.4, ease:[0.22,1,0.36,1] }}
            className="flex flex-col sm:flex-row gap-4 mb-14 justify-center"
          >
            <MagneticWrap>
              <Link href="/contact" className="btn-primary flex items-center gap-2 justify-center text-base">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticWrap>
            <MagneticWrap>
              <Link href="/portfolio" className="btn-secondary flex items-center gap-2 justify-center text-base">
                View Our Work <ChevronRight className="w-4 h-4" />
              </Link>
            </MagneticWrap>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.6, delay:0.6 }}
            className="flex items-center gap-4 flex-wrap justify-center"
          >
            <div className="flex -space-x-2">
              {["AO","CA","FY","MK"].map((initials, i) => (
                <div
                  key={initials}
                  className="w-9 h-9 rounded-full border-2 border-[var(--bg-primary)] flex items-center justify-center text-xs font-semibold text-white"
                  style={{ background: i%2===0 ? "linear-gradient(135deg,#283889,#4a6cf7)" : "linear-gradient(135deg,#3f1119,#8b2535)", zIndex: 4-i }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 mb-0.5 justify-center">
                {Array(5).fill(0).map((_,i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Trusted by <strong className="text-[var(--text-primary)]">30+</strong> businesses across Nigeria
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y:[0,8,0] }}
            transition={{ duration:1.5, repeat:Infinity }}
            className="w-5 h-8 border-2 border-[var(--border-color)] rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-brand-blue rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      <AIWorkflowMarquee />

      {/* ═══════════════════════════════════════════ STATS ══ */}
      <section className="py-16 bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="container-custom relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i*0.1} direction="up">
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-blue-50 dark:bg-[#283889]/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-5 h-5 text-brand-blue dark:text-[#4a6cf7]" />
                  </div>
                  <div className="font-display font-extrabold text-4xl text-[var(--text-primary)] mb-1">{stat.value}</div>
                  <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ SERVICES ══ */}
      <section className="section-padding bg-[var(--bg-primary)] relative">
        <div className="container-custom">
          <div className="text-center mb-20">
            <FadeIn><SectionBadge className="mb-4">Our Services</SectionBadge></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] mb-4">
                Everything Your Business <span className="text-gradient-blue">Needs to Thrive</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
                One partner, complete solutions. We cover all your tech needs so you can focus on what matters most growing your business.
              </p>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <TiltCard className="h-full">
                  <div className="card-base p-6 h-full group cursor-pointer">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ background:`${service.color}15` }}
                    >
                      <service.icon className="w-6 h-6" style={{ color:service.color }} />
                    </div>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2.5 group-hover:text-brand-blue dark:group-hover:text-[#4a6cf7] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5">{service.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {service.features.map((f) => (
                        <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                          {f}
                        </span>
                      ))}
                    </div>
                    <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue dark:text-[#4a6cf7] group-hover:gap-2.5 transition-all">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn className="text-center mt-12">
            <MagneticWrap>
              <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
                Explore All Services <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticWrap>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════ WHY US ══ */}
      <section className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 dark:opacity-10"
          style={{ background:"linear-gradient(135deg,#283889,transparent)" }} />
        <div className="container-custom relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn><SectionBadge className="mb-5">Why Choose Us</SectionBadge></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)] leading-tight mb-6">
                  The Smarter Choice for <span className="text-gradient-blue">Growing Businesses</span>
                </h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  We built Grandis Innovo specifically for the needs of startups and small businesses in Nigeria and beyond. Tight budgets, fast timelines, and quality that competes with the big players.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <MagneticWrap>
                  <Link href="/why-us" className="btn-primary inline-flex items-center gap-2">
                    Why We're Different <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticWrap>
              </FadeIn>
            </div>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {whyPoints.map((point) => (
                <StaggerItem key={point.title}>
                  <TiltCard>
                    <div className="card-base p-5 group h-full">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue-50 dark:bg-[#283889]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <point.icon className="w-5 h-5 text-brand-blue dark:text-[#4a6cf7]" />
                      </div>
                      <h3 className="font-display font-semibold text-[var(--text-primary)] mb-2 text-sm">{point.title}</h3>
                      <p className="text-[var(--text-muted)] text-xs leading-relaxed">{point.desc}</p>
                    </div>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════ PORTFOLIO ══ */}
      <section className="section-padding bg-[var(--bg-primary)] relative">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div>
              <FadeIn><SectionBadge className="mb-4">Recent Work</SectionBadge></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)]">
                  Projects We're <span className="text-gradient-blue">Proud Of</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2} direction="left">
              <MagneticWrap>
                <Link href="/portfolio" className="btn-secondary inline-flex items-center gap-2 whitespace-nowrap">
                  View All Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticWrap>
            </FadeIn>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioHighlights.map((project) => (
              <StaggerItem key={project.title}>
                <TiltCard className="h-full">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-base overflow-hidden group cursor-pointer h-full block"
                  >
                    <div
                      className="h-48 relative overflow-hidden"
                      style={{ background:`linear-gradient(135deg,${project.color}20 0%,${project.color}08 100%)` }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-white" style={{ background:project.color }}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:text-brand-blue dark:group-hover:text-[#4a6cf7] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((t) => (
                          <span key={t} className="text-xs px-2 py-1 rounded bg-[var(--bg-secondary)] text-[var(--text-secondary)]">{t}</span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue dark:text-[#4a6cf7]">
                        View Project <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ════════════════════════════ TESTIMONIALS ══ */}
      <section className="section-padding bg-[var(--bg-secondary)] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="container-custom relative">
          <div className="text-center mb-20">
            <FadeIn><SectionBadge className="mb-4"><Star className="w-3 h-3" /> Testimonials</SectionBadge></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl text-[var(--text-primary)]">What Our Clients Say</h2>
            </FadeIn>
          </div>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.author}>
                <TiltCard className="h-full">
                  <div className="card-base p-7 h-full flex flex-col group">
                    <div className="flex gap-1 mb-5">
                      {Array(5).fill(0).map((_,i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1 mb-6 italic">"{t.quote}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background:"linear-gradient(135deg,#283889,#4a6cf7)" }}>
                        {t.avatar}
                      </div>
                      <div>
                        <div className="font-display font-semibold text-sm text-[var(--text-primary)]">{t.author}</div>
                        <div className="text-xs text-[var(--text-muted)]">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ CTA ══ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0" style={{ background:"linear-gradient(135deg,#283889 0%,#1e2a6b 40%,#3f1119 100%)" }} />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ scale:[1,1.1,1], opacity:[0.2,0.3,0.2] }} transition={{ duration:5, repeat:Infinity }}
            className="absolute top-10 left-10 w-48 h-48 rounded-full border border-white/10" />
          <motion.div animate={{ scale:[1,1.15,1], opacity:[0.1,0.2,0.1] }} transition={{ duration:6, repeat:Infinity, delay:1 }}
            className="absolute bottom-5 right-20 w-64 h-64 rounded-full border border-white/10" />
        </div>
        <div className="container-custom relative text-center text-white">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Let&apos;s build something amazing together
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display font-extrabold text-4xl md:text-6xl mb-6 leading-tight">
              Ready to Bring Your<br />Vision to Life?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              Get a free consultation and project quote within 24 hours. No fluff, no commitment just honest advice from people who care about your success.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticWrap>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-blue font-display font-bold rounded-xl hover:bg-brand-blue-50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg text-base">
                  Get Free Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticWrap>
              <MagneticWrap>
                <Link href="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-display font-bold rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5 text-base">
                  Explore Services
                </Link>
              </MagneticWrap>
            </div>
          </FadeIn>
          <FadeIn delay={0.4} className="mt-14">
            <div className="flex flex-wrap justify-center gap-8 text-white/60 text-sm">
              {[{ icon:CheckCircle, text:"No hidden fees" },{ icon:CheckCircle, text:"Free consultation" },{ icon:CheckCircle, text:"Response in 24hrs" },{ icon:CheckCircle, text:"Flexible payment" }].map(({ icon:Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-green-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
