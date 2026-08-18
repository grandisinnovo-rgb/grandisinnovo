"use client";

import { useState } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { services } from "@/lib/data";

type Status = "idle" | "submitting" | "success" | "error";

// Formspree endpoint. Defaults to the real Grandis Innovo form so this works
// out of the box; still overridable via NEXT_PUBLIC_FORMSPREE_ENDPOINT if you
// ever need to point at a different form (e.g. a staging environment).
const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/f/xppaddwk";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "", _gotcha: "" });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      console.error(
        "Contact form is not configured: NEXT_PUBLIC_FORMSPREE_ENDPOINT is missing. " +
        "Add it to .env.local — see .env.example."
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: "", message: "", _gotcha: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-xl text-sm bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-brand-blue dark:focus:border-[#4a6cf7] transition-colors";

  return (
    <form onSubmit={onSubmit} className="card-base p-8 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Full name</label>
          <input id="name" name="name" required value={form.name} onChange={update("name")} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Email address</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={update("email")} className={inputClasses} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
            Phone <span className="text-[var(--text-muted)]">(optional)</span>
          </label>
          <input id="phone" name="phone" value={form.phone} onChange={update("phone")} className={inputClasses} />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Service you need</label>
          <select id="service" name="service" required value={form.service} onChange={update("service")} className={inputClasses}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Tell us about your project</label>
        <textarea id="message" name="message" rows={5} required value={form.message} onChange={update("message")} className={inputClasses} />
      </div>

      {/* Honeypot — Formspree specifically recognizes a field named "_gotcha" and
          silently discards the submission if it's filled in, without erroring the
          client. Hidden from real users; bots that auto-fill every field catch
          themselves here. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" value={form._gotcha} onChange={update("_gotcha")} aria-hidden="true" />

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60">
        {status === "submitting" ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-4 h-4" /> Send Message</>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-emerald-500">
            <CheckCircle2 className="w-4 h-4" /> Message sent we&apos;ll reply within one business day.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
