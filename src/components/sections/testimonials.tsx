"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

// Placeholder testimonials — replace with real client reviews
const testimonials = [
  {
    name: "Chidinma Okafor",
    business: "Founder, Solace Wellness",
    review:
      "Grandis Innovo delivered our site ahead of schedule and the installment plan made it easy to budget. Our bookings doubled in the first month.",
    rating: 5,
  },
  {
    name: "Ibrahim Musa",
    business: "Operations Lead, Northbridge Retail",
    review:
      "Their hardware team handled our entire office rollout while the dev team rebuilt our storefront. One vendor, zero headaches.",
    rating: 5,
  },
  {
    name: "Grace Adebayo",
    business: "CEO, Ashen & Co.",
    review:
      "The brand identity work was thoughtful and strategic, not just pretty. Every asset felt intentional.",
    rating: 4,
  },
];

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="section-padding relative overflow-hidden bg-primary dark:bg-dark" aria-labelledby="testimonials-heading">
      <div className="pointer-events-none absolute inset-0 bg-grandis-radial opacity-50" aria-hidden="true" />

      <div className="relative">
        <SectionHeading eyebrow="Client Voices" title="What clients say about working with us." light align="center" />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t) => (
                <div key={t.name} className="min-w-0 flex-[0_0_100%] px-2">
                  <div className="glass-panel p-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-grandis-gradient text-white">
                      <User className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mt-4 flex justify-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "text-white/20"}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-lg text-white/85">&ldquo;{t.review}&rdquo;</p>
                    <p className="mt-5 font-display text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-white/50">{t.business}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-border text-white transition-colors hover:bg-white/10"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  role="tab"
                  aria-selected={selected === i}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-2 rounded-full transition-all ${selected === i ? "w-6 bg-accent" : "w-2 bg-white/25"}`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-border text-white transition-colors hover:bg-white/10"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
