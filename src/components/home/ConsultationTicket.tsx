"use client";

/**
 * The 60-minute consultation as a ticket, after neutomni.com's package cards (Webflow interaction a-6
 * "Service cards"): the card starts low and turned over (rotateY 180deg, back showing), then flips face
 * up and rises into place, ease in-out (smoothing 70). As on neutomni, the section's heading is on
 * screen the whole time, so the card rises into a titled space and there is never an empty screen.
 * Deep Teal card, gold hairline frame and a perforated tear line before the stub (gold as line).
 */
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Check } from "@phosphor-icons/react";
import { site } from "@/content/site";
import { Label, wrap } from "../ui";

export function ConsultationTicket({
  label,
  title,
  intro,
  includes,
  price,
  delivery,
  action,
}: {
  label: string;
  title: string;
  intro: string;
  includes: string[];
  price: string;
  delivery: string;
  action: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Webflow: starts entering, ends exiting with a 30% end offset
  // Progress runs from the section entering to the end of its pin. The pin starts at about 0.59 (170vh
  // section); the card flips up from 0.12, as the section appears, and has landed by 0.45, before the pin.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6 }); // smoothing 70
  const inOut = (v: number) => (v < 0.5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2);
  const k = useTransform(p, (v) => inOut(Math.min(1, Math.max(0, (v - 0.12) / 0.33))));
  const rotateY = useTransform(k, [0, 1], [180, 0]);
  const y = useTransform(k, [0, 1], ["70vh", "0vh"]);

  return (
    <section ref={ref} id="consultation" className={`relative overflow-x-clip bg-offwhite ${reduce ? "py-24 md:py-36" : "h-[170vh]"}`}>
      {/* overflow-x clip: while the ticket turns in 3D its projection can be wider than the screen */}
      <div className={`${wrap} ${reduce ? "" : "sticky top-0 flex h-[100dvh] flex-col justify-center gap-6 pb-6 pt-24 md:gap-8"} [perspective:1600px]`}>
        {/* The heading stays on screen while the card rises into place beneath it */}
        <div className="grid gap-y-3 md:grid-cols-12 md:items-end md:gap-x-6">
          <div className="md:col-span-7">
            <Label>{label}</Label>
            <h2 className="type-h1 mt-4 text-teal">{title}</h2>
          </div>
          <p className="text-teal md:col-span-5 md:pb-1">{intro}</p>
        </div>
        <motion.div className="relative w-full [transform-style:preserve-3d]" style={reduce ? undefined : { rotateY, y }}>
        {/* Back of the card, seen while it is turned over */}
        <div className="absolute inset-0 rounded-[1.25rem] bg-teal [backface-visibility:hidden] [transform:rotateY(180deg)]" aria-hidden>
          <div className="absolute inset-3 rounded-[0.875rem] border border-gold/70 md:inset-4" />
        </div>
        <article className="on-teal relative grid overflow-hidden rounded-[1.25rem] bg-teal text-offwhite shadow-[0_40px_80px_-30px_rgba(4,40,48,0.5)] [backface-visibility:hidden] lg:grid-cols-12">
          {/* Gold hairline frame */}
          <div className="pointer-events-none absolute inset-3 rounded-[0.875rem] border border-gold/70 md:inset-4" aria-hidden />

          <div className="relative px-7 py-8 md:px-12 md:py-10 lg:col-span-8">
            <p className="type-label">What the hour covers</p>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {includes.map((c) => (
                <li key={c} className="flex gap-3 border-t border-offwhite/20 py-4 text-[1rem] leading-[1.625rem]">
                  <Check size={20} className="mt-[3px] shrink-0 text-gold" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-4 flex flex-wrap items-center gap-x-6 border-t border-offwhite/20 pt-4">
              <span className="type-label">Open {site.hours}</span>
              <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="link inline-flex min-h-11 items-center">
                {site.phone}
              </a>
            </p>
          </div>

          {/* Stub, behind a perforated tear line with notches cut from the card edge */}
          <div className="relative flex flex-col justify-between gap-6 border-offwhite/40 px-7 py-8 max-lg:border-t max-lg:border-dashed md:px-12 lg:col-span-4 lg:border-l lg:border-dashed lg:py-10">
            <span className="absolute -top-4 left-0 hidden h-8 w-8 -translate-x-1/2 rounded-full bg-offwhite lg:block" aria-hidden />
            <span className="absolute -bottom-4 left-0 hidden h-8 w-8 -translate-x-1/2 rounded-full bg-offwhite lg:block" aria-hidden />
            <div>
              <p className="type-label">Expert consultation</p>
              <p className="mt-3 font-[family-name:var(--font-head)] text-[4.5rem] font-semibold leading-none tracking-[-0.02em]">60</p>
              <p className="type-label mt-3">Minutes with a specialist</p>
              <p className="mt-5 font-[family-name:var(--font-head)] text-[1.75rem] font-semibold leading-none">{price}</p>
              <p className="type-caption mt-2">{delivery}</p>
            </div>
            <div>{action}</div>
          </div>
        </article>
        </motion.div>
      </div>
    </section>
  );
}
