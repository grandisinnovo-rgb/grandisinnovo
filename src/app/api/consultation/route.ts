import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { getResendClient, EMAIL_FROM, EMAIL_TO_TEAM } from "@/lib/resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const consultationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).optional().or(z.literal("")),
  preferredDate: z.string().min(1, "Please choose a date."),
  preferredTime: z.string().min(1, "Please choose a time."),
  notes: z.string().optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const { success } = rateLimit(`consultation:${ip}`, 3, 60_000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = consultationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid booking data.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const { name, email, phone, preferredDate, preferredTime, notes } = parsed.data;

  try {
    const supabase = getSupabaseServerClient();
    const { error: dbError } = await supabase.from("consultation_bookings").insert({
      name,
      email,
      phone: phone || null,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      notes: notes || null,
    });
    if (dbError) throw dbError;

    const resend = getResendClient();
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO_TEAM,
      replyTo: email,
      subject: `New consultation request — ${preferredDate} at ${preferredTime}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nPreferred: ${preferredDate} at ${preferredTime}\nNotes: ${notes || "N/A"}`,
    });

    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Consultation request received — Grandis Innovo",
      text: `Hi ${name},\n\nWe've received your request for a free consultation on ${preferredDate} at ${preferredTime}. Our team will confirm shortly.\n\n— The Grandis Innovo Team`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Consultation booking error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
