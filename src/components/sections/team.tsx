"use client";

import { motion } from "framer-motion";
import { Linkedin, Facebook, Twitter, Instagram, Github, User } from "lucide-react";
import { team } from "@/lib/site-config";
import { SectionHeading } from "@/components/ui/section-heading";

const socialIconMap = {
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
} as const;

export function Team() {
  return (
    <section id="team" className="section-padding bg-white dark:bg-primary" aria-labelledby="team-heading">
      <SectionHeading
        eyebrow="Meet The Team"
        title="The people behind Grandis Innovo."
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <motion.article
            key={member.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-panel group overflow-hidden text-center"
          >
            {/* Professional image placeholder — swap with real photo via Cloudinary */}
            <div className="flex aspect-square w-full items-center justify-center bg-grandis-gradient/20">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-grandis-gradient text-white">
                <User className="h-9 w-9" aria-hidden="true" />
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-display text-base font-semibold text-primary dark:text-white">
                {member.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {member.position}
              </p>
              {member.roles && (
                <p className="mt-1 text-xs text-primary/50 dark:text-white/50">{member.roles.join(" · ")}</p>
              )}
              <p className="mt-3 text-sm text-primary/65 dark:text-white/65">{member.bio}</p>

              <div className="mt-4 flex justify-center gap-3">
                {Object.entries(member.social).map(([key, href]) => {
                  const Icon = socialIconMap[key as keyof typeof socialIconMap];
                  if (!Icon || !href) return null;
                  return (
                    <a
                      key={key}
                      href={href}
                      aria-label={`${member.name} on ${key}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-glass-border text-primary/60 transition-colors hover:bg-secondary hover:text-white dark:text-white/60"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
