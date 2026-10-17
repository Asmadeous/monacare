"use client";

/**
 * The four ways in, rebuilt from neutomni.com's process cards (Webflow interaction a-64 "Process cards").
 * Four equal cards stand side by side; each fills with a cover from the bottom, height 0 → 100%, linked
 * to scroll. All covers start together and finish at 30%, 45%, 60% and 75% of the section's progress
 * (progress runs from the section entering the screen, offset 15%, to it leaving; smoothing 30).
 * Before the cover arrives each card shows its words in Deep Teal inside a Deep Teal outline, so it is
 * never blank; the cover turns it Deep Teal with Off-White words from the bottom up. Phones: same idea,
 * each card fills as it scrolls past.
 */
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { wrap } from "../ui";
import { FadeInUp } from "../ui/appear";

type Item = { title: string; body: string; href?: string };

const ends = [0.22, 0.3, 0.38, 0.46]; // neutomni: 30/45/60/75%, brought forward for a shorter section

function Figure({ index }: { index: number }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.25 };
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 overflow-visible lg:h-28 lg:w-28" aria-hidden>
      {index === 0 && <circle cx="60" cy="60" r="44" {...common} />}
      {index === 1 && <path d="M8 92 C 30 18, 90 18, 112 92" {...common} />}
      {index === 2 && <path d="M4 70 C 18 30, 38 30, 42 70 C 46 30, 76 30, 80 70 C 84 30, 104 30, 116 70" {...common} />}
      {index === 3 && (
        <g {...common}>
          <circle cx="60" cy="60" r="44" />
          <circle cx="60" cy="60" r="2" fill="currentColor" />
        </g>
      )}
    </svg>
  );
}

export function WaysIn({ label, title, items }: { label: string; title: string; items: Item[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  // Webflow "starts entering" with a 15% start offset: 0 as the section top passes 85% down the screen
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4 }); // smoothing 30

  return (
    <section ref={ref} className="relative bg-offwhite md:h-[220vh]">
      <div className="md:sticky md:top-0 md:flex md:h-[100dvh] md:flex-col">
        <div className={`${wrap} w-full pt-24 md:pt-32`}>
          <FadeInUp as="p" className="type-label flex items-center gap-4 text-teal">
            <span className="gold-thread w-10" />
            {label}
          </FadeInUp>
          <FadeInUp order={1} as="h2" className="type-h1 mt-5 max-w-[22ch] text-teal">
            {title}
          </FadeInUp>
        </div>
        <div className={`${wrap} mt-10 grid w-full flex-1 gap-[3px] pb-20 md:mt-8 md:grid-cols-4 md:pb-6`}>
          {items.map((item, i) => (
            <div key={item.title} className="min-h-[24rem] md:min-h-0">
              <Card item={item} index={i} progress={p} reduce={!!reduce} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CardContent({ item, index, link }: { item: Item; index: number; link: boolean }) {
  return (
    <div className="flex h-full flex-col justify-between p-5 lg:p-6">
      <p className="type-label">{String(index + 1).padStart(2, "0")}</p>
      <div className="flex flex-1 items-center justify-center border-b border-dashed border-current/40 py-6">
        <Figure index={index} />
      </div>
      <div className="pt-6">
        <h3 className="font-[family-name:var(--font-head)] text-[1.375rem] font-semibold leading-8">
          {link && item.href ? (
            <Link href={item.href} className="after:absolute after:inset-0">
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h3>
        <p className="mt-3 text-[1rem] leading-[1.625rem]">{item.body}</p>
      </div>
    </div>
  );
}

/**
 * One card: its words in Deep Teal on a Deep Teal outline, and the same words in Off-White inside the
 * cover, so as the cover rises the card turns teal from the bottom up and is never blank.
 */
function Card({ item, index, progress, reduce }: { item: Item; index: number; progress: MotionValue<number>; reduce: boolean }) {
  // The cover's height 0 → 100% (neutomni), drawn as a clip from the bottom so its words line up exactly
  const clipPath = useTransform(progress, [0, ends[index]], ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  return (
    <div className="relative h-full overflow-hidden border border-teal text-teal">
      <CardContent item={item} index={index} link />
      <motion.div
        className="on-teal pointer-events-none absolute inset-0 bg-teal text-offwhite"
        style={{ clipPath: reduce ? "none" : clipPath }}
        aria-hidden
      >
        <CardContent item={item} index={index} link={false} />
      </motion.div>
    </div>
  );
}
