import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service."),
  message: z.string().min(10, "Please tell us a bit more (at least 10 characters)."),
  // honeypot — bots fill this in, real users never see it
  company_website: z.string().max(0).optional(),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;
