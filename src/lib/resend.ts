import { Resend } from "resend";

let client: Resend | null = null;

export function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export const EMAIL_FROM = "Grandis Innovo <notifications@grandisinnovo.com>"; // must be a verified Resend domain
export const EMAIL_TO_TEAM = process.env.CONTACT_NOTIFY_EMAIL ?? "hello@grandisinovo.com";
