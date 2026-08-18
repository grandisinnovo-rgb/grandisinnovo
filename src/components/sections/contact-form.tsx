"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send, CheckCircle2, AlertCircle, MessageCircle } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validations";
import { services, buildWhatsAppLink } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [lastSubmitted, setLastSubmitted] = useState<ContactFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { service: defaultService ?? "" },
  });

  // Live-watch the fields the person has already typed so the WhatsApp
  // button below always reflects the current form state — no retyping.
  const liveValues = watch();
  const liveWhatsAppLink = buildWhatsAppLink({
    name: liveValues.name,
    service: liveValues.service,
    message: liveValues.message,
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setLastSubmitted(values);
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-glass-border bg-glass px-4 py-3 text-sm text-primary placeholder:text-primary/40 backdrop-blur-glass focus-visible:outline-accent dark:text-white dark:placeholder:text-white/40";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass-panel space-y-5 p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
            Full name
          </label>
          <input id="name" className={inputClasses} {...register("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
            Email address
          </label>
          <input id="email" type="email" className={inputClasses} {...register("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
            Phone <span className="text-primary/40 dark:text-white/40">(optional)</span>
          </label>
          <input id="phone" className={inputClasses} {...register("phone")} />
        </div>

        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
            Service you're interested in
          </label>
          <select id="service" className={inputClasses} {...register("service")} aria-invalid={!!errors.service}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {errors.service && <p className="mt-1.5 text-xs text-red-400">{errors.service.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
          Tell us about your project
        </label>
        <textarea id="message" rows={5} className={inputClasses} {...register("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot — hidden from real users, catches simple bots */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company_website")} aria-hidden="true" />

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" /> Send Message
            </>
          )}
        </button>

        {/* Live WhatsApp shortcut — carries whatever's already typed above, so nothing needs retyping */}
        <a
          href={liveWhatsAppLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary w-full justify-center border-[#25D366]/40 text-[#25D366] sm:w-auto"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Or message us on WhatsApp
        </a>
      </div>

      <div role="status" aria-live="polite">
        {status === "success" && lastSubmitted && (
          <div className="flex flex-col gap-3 rounded-lg border border-emerald-400/30 bg-emerald-400/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-emerald-400">
              <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              Message sent we'll reply by email within one business day.
            </p>
            <a
              href={buildWhatsAppLink({
                name: lastSubmitted.name,
                service: lastSubmitted.service,
                message: lastSubmitted.message,
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[#25D366] underline underline-offset-2"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> Get a faster reply on WhatsApp
            </a>
          </div>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" aria-hidden="true" /> Something went wrong. Please try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}
