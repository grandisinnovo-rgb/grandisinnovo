import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { getResendClient, EMAIL_FROM } from "@/lib/resend";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  if (!rateLimit(`newsletter:${ip}`, 5, 60_000).success) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    const resend = getResendClient();
    await resend.emails.send({
      from: EMAIL_FROM,
      to: parsed.data.email,
      subject: "You're subscribed — Grandis Innovo",
      text: "Thanks for subscribing to the Grandis Innovo newsletter. We'll keep you posted on web, mobile, design, and tech support insights.",
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
