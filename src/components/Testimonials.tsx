"use client";

import { useEffect, useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { testimonials } from "@/content/site";

const INTERVAL_MS = 4000;

// Two reviews at a time (one on phones), moving on by one every 4 seconds and looping. One row, so the
// section stays the same height however many reviews are added. Pauses while hovered or focused.
export default function Testimonials() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const count = testimonials.items.length;

  const move = (dir: 1 | -1) => {
    const el = track.current;
    if (!el || el.children.length < 2) return;
    const cards = el.children as HTMLCollectionOf<HTMLElement>;
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const perView = Math.max(1, Math.round(el.clientWidth / step));
    const last = Math.max(0, cards.length - perView);
    const current = Math.round(el.scrollLeft / step);
    // Loop: past the last pair goes back to the first, before the first goes to the last
    const next = current + dir > last ? 0 : current + dir < 0 ? last : current + dir;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: next * step, behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    const el = section.current;
    if (!el || count < 2) return;
    const pause = () => (paused.current = true);
    const resume = () => (paused.current = false);
    const onFocusOut = (e: FocusEvent) => !el.contains(e.relatedTarget as Node | null) && resume();
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", onFocusOut);
    const id = window.setInterval(() => {
      if (!paused.current && document.visibilityState === "visible") move(1);
    }, INTERVAL_MS);
    return () => {
      window.clearInterval(id);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [count]);

  const arrow =
    "grid h-12 w-12 place-items-center rounded-[8px] border border-offwhite/40 transition-colors hover:border-offwhite hover:bg-offwhite hover:text-teal";

  return (
    <section
      ref={section}
      id="reviews"
      className="on-teal bg-teal py-24 text-offwhite md:py-32"
      aria-roledescription="carousel"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 xl:px-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="gold-thread" />
            <h2 className="type-h1 mt-6">{testimonials.title}</h2>
          </div>
          {count > 2 && (
            <div className="flex gap-3">
              <button type="button" onClick={() => move(-1)} className={arrow} aria-label="Previous review" aria-controls="review-track">
                <CaretLeft size={20} weight="bold" aria-hidden />
              </button>
              <button type="button" onClick={() => move(1)} className={arrow} aria-label="Next review" aria-controls="review-track">
                <CaretRight size={20} weight="bold" aria-hidden />
              </button>
            </div>
          )}
        </div>

        <ul
          id="review-track"
          ref={track}
          tabIndex={0}
          aria-live="off"
          aria-label="Reviews"
          className="mt-14 grid snap-x snap-mandatory auto-cols-[100%] grid-flow-col gap-6 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] sm:auto-cols-[calc((100%-1.5rem)/2)] md:mt-16 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.items.map((t, i) => (
            <li key={`${t.name}-${i}`} className="snap-start border-t border-offwhite/25 pr-4 pt-8" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
              <figure className="flex h-full flex-col">
                <blockquote className="type-h2 font-normal">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-auto pt-8">
                  <span className="block font-[family-name:var(--font-head)] font-semibold">{t.name}</span>
                  <span className="type-caption block">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
