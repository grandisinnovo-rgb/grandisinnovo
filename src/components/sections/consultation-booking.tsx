"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CalendarCheck, CheckCircle2, AlertCircle } from "lucide-react";

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number.").optional().or(z.literal("")),
  preferredDate: z.string().min(1, "Please choose a date."),
  preferredTime: z.string().min(1, "Please choose a time."),
  notes: z.string().optional().or(z.literal("")),
});

type BookingValues = z.infer<typeof bookingSchema>;

type Status = "idle" | "submitting" | "success" | "error";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

// Earliest bookable date is tomorrow — keeps the team from getting same-day requests they can't act on.
function minBookingDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

export function ConsultationBooking() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingValues>({ resolver: zodResolver(bookingSchema) });

  const onSubmit = async (values: BookingValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-glass-border bg-glass px-4 py-3 text-sm text-primary placeholder:text-primary/40 backdrop-blur-glass focus-visible:outline-accent dark:text-white dark:placeholder:text-white/40";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="glass-panel space-y-5 p-8">
      <div className="flex items-center gap-2">
        <CalendarCheck className="h-5 w-5 text-accent" aria-hidden="true" />
        <h3 className="font-display text-lg font-semibold text-primary dark:text-white">
          Book a Free Consultation
        </h3>
      </div>
      <p className="text-sm text-primary/60 dark:text-white/60">
        Pick a date and time that works for you — we'll confirm by email.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-name" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
            Full name
          </label>
          <input id="booking-name" className={inputClasses} {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="booking-email" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
            Email address
          </label>
          <input id="booking-email" type="email" className={inputClasses} {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="booking-date" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
            Preferred date
          </label>
          <input
            id="booking-date"
            type="date"
            min={minBookingDate()}
            className={inputClasses}
            {...register("preferredDate")}
            aria-invalid={!!errors.preferredDate}
          />
          {errors.preferredDate && <p className="mt-1.5 text-xs text-red-400">{errors.preferredDate.message}</p>}
        </div>
        <div>
          <label htmlFor="booking-time" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
            Preferred time
          </label>
          <select id="booking-time" className={inputClasses} {...register("preferredTime")} aria-invalid={!!errors.preferredTime}>
            <option value="">Select a time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
          {errors.preferredTime && <p className="mt-1.5 text-xs text-red-400">{errors.preferredTime.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="booking-phone" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
          Phone <span className="text-primary/40 dark:text-white/40">(optional)</span>
        </label>
        <input id="booking-phone" className={inputClasses} {...register("phone")} />
      </div>

      <div>
        <label htmlFor="booking-notes" className="mb-1.5 block text-sm font-medium text-primary dark:text-white">
          What would you like to discuss? <span className="text-primary/40 dark:text-white/40">(optional)</span>
        </label>
        <textarea id="booking-notes" rows={3} className={inputClasses} {...register("notes")} />
      </div>

      <button type="submit" disabled={status === "submitting"} className="btn-primary w-full sm:w-auto">
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Booking...
          </>
        ) : (
          <>
            <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Request This Slot
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Request received — we'll confirm by email shortly.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" aria-hidden="true" /> Something went wrong. Please try again.
          </p>
        )}
      </div>
    </form>
  );
}
