"use client";

import { useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
import { Label } from "@/components/ui";
import { FadeInUp } from "@/components/ui/appear";
import { TestimonialsColumn, type Testimonial } from "@/components/ui/testimonials-columns-1";
import { testimonials } from "@/content/site";

const items: Testimonial[] = testimonials.items.map((t) => ({ text: t.quote, name: t.name, role: t.role }));

// Two columns. With enough reviews each column gets its own half; with only a few, both show all of
// them in a different order so the columns stay full and never line up side by side.
const rotate = (list: Testimonial[], by: number) => list.map((_, i) => list[(i + by) % list.length]);
const columns: Testimonial[][] =
  items.length >= 9 ? [0, 1].map((c) => items.filter((_, i) => i % 2 === c)) : [rotate(items, 0), rotate(items, 2).reverse()];

export default function Testimonials() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="reviews" className="on-teal relative overflow-clip bg-teal py-24 text-offwhite md:py-32">
      <div className="mx-auto grid max-w-[1920px] gap-y-12 px-5 md:grid-cols-12 md:gap-x-6 md:px-10 xl:px-20">
        {/* Like every other section: label with the gold thread, heading and intro on the left */}
        <div className="md:col-span-4 md:self-center">
          <FadeInUp>
            <Label light>{testimonials.label}</Label>
          </FadeInUp>
          <FadeInUp order={1} as="h2" className="type-h1 mt-6">
            {testimonials.title}
          </FadeInUp>
          <FadeInUp order={2} as="p" className="mt-5 max-w-[36ch]">
            {testimonials.intro}
          </FadeInUp>
          <FadeInUp order={3} className="mt-8">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="type-label flex min-h-11 items-center gap-2 rounded-[8px] border border-offwhite px-4 transition-colors hover:bg-offwhite hover:text-teal motion-reduce:hidden"
            >
              {paused ? <Play size={14} weight="fill" aria-hidden /> : <Pause size={14} weight="fill" aria-hidden />}
              {paused ? "Play reviews" : "Pause reviews"}
            </button>
          </FadeInUp>
        </div>

        {/* The reviews scroll on the right, fading out at the top and bottom edges */}
        <div
          className="reviews grid max-h-[min(680px,78vh)] gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] md:col-span-8 md:grid-cols-2 xl:col-span-7 xl:col-start-6"
          data-paused={paused}
          aria-label="Reviews"
        >
          <TestimonialsColumn testimonials={columns[0]} duration={26} />
          {/* With fewer than 9 reviews, the second column repeats the first, so screen readers skip it */}
          <div className="hidden md:block" aria-hidden={items.length < 9 || undefined}>
            <TestimonialsColumn testimonials={columns[1]} duration={32} />
          </div>
        </div>
      </div>
    </section>
  );
}
