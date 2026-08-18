import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Grandis Innovo — Modern Tech Solutions for Startups",
  description:
    "Affordable web development, mobile apps, UI/UX design, and tech support for startups and small businesses.",
};

export default function HomePage() {
  return <HomeClient />;
}
