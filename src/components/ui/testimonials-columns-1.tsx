"use client";
import React from "react";

// Adapted from 21st.dev "testimonials-columns-1" (the scrolling columns), restyled in the site's own
// language: flat Deep Teal cards with an Off-White hairline and the brand's arc corner (top right), a
// gold thread over each quote, the quote in the headline face, and the name and role under a hairline.
// No drop shadows or pill shapes: nothing else on the site uses them.

export type Testimonial = {
  text: string;
  name: string;
  role: string;
  image?: string;
};

const initials = (name: string) =>
  name
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      {/* Scrolls by CSS (see .reviews-column in globals.css) so it can pause on hover, focus or the button */}
      <div className="reviews-column flex flex-col gap-6 pb-6" style={{ animationDuration: `${props.duration || 10}s` }}>
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <figure
                  className="relative w-full rounded-tr-[2rem] border border-offwhite/30 p-7 md:p-8"
                  key={i}
                  aria-hidden={index === 1 ? true : undefined} // the second copy only exists to make the loop seamless
                >
                  <span className="gold-thread w-10" aria-hidden />
                  <blockquote className="mt-6 font-[family-name:var(--font-head)] text-[1.125rem] font-normal leading-7 md:text-[1.25rem] md:leading-8">
                    &ldquo;{text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3 border-t border-offwhite/20 pt-5">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img width={40} height={40} src={image} alt={name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <span
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-offwhite font-[family-name:var(--font-head)] text-sm font-semibold text-teal"
                        aria-hidden
                      >
                        {initials(name)}
                      </span>
                    )}
                    <span className="flex flex-col">
                      <span className="font-[family-name:var(--font-head)] font-semibold leading-5">{name}</span>
                      <span className="type-caption leading-5">{role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </React.Fragment>
          )),
        ]}
      </div>
    </div>
  );
};
