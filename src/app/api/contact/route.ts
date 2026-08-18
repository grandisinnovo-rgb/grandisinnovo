import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { getResendClient, EMAIL_FROM, EMAIL_TO_TEAM } from "@/lib/resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!rateLimit(`contact:${ip}`, 5, 60_000).success) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data.", issues: parsed.error.flatten() }, { status: 400 });
  }

  // Honeypot triggered — pretend success so bots don't learn to adapt
  if (parsed.data.company_website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, service, message } = parsed.data;

  try {
    const resend = getResendClient();

    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO_TEAM,
      replyTo: email,
      subject: `New contact form submission — ${service}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nService: ${service}\n\nMessage:\n${message}`,
    });

    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "We've received your message — Grandis Innovo",
      text: `Hi ${name},\n\nThanks for reaching out to Grandis Innovo about ${service}. We'll get back to you within one business day.\n\n— The Grandis Innovo Team`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
