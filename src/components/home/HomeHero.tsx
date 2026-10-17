"use client";

/**
 * Home hero, rebuilt from lpas.com's HomeHero module (script-DoQXF3qS.js) and stylesheet.
 *
 * Desktop (min-width 768px, fine pointer):
 *  - The hero pins for three screen-widths of scrolling.
 *  - A row of programme panels starts with the first panel 26% in from the right edge (200px of a 771px
 *    panel at 1440×900, measured on lpas.com) and travels left, linearly with scroll, until the last
 *    programme sits flush with the right edge.
 *  - Each panel is 6/7 of the screen height wide (max 80vw), photo above a colour block 31.7% of the
 *    screen tall (lpas: 615px photo over a 285px block at 900px). As it comes in, its
 *    photo row grows from half the panel to all but the block, and the photo settles from scale 1.3; the
 *    first panel also brightens from 0.5. Once it is 20% in, its title, count and subtitle fade up 10px.
 *  - Near the end (progress > 0.9) the hero's own content fades out over 0.3s.
 * Phones and touch: no pin. Panels stack; each photo slides in from the right (xPercent 120) and settles
 * from scale 1.2, then the text fades up.
 * Brand: the headline sits on a Deep Teal panel, never on the footage; panel text sits on its colour block.
 *
 * Opening sequence (from the client's hero spec, adapted to the brand guide, which takes precedence):
 * the headline enters letter by letter, each letter moving in 18px from the left and fading up, 30ms
 * apart, 500ms each, 200ms after the loading screen opens; the line under it fades in at 800ms, the
 * buttons at 1200ms and the tag (bottom right) at 1400ms, each over 1000ms. The footage plays raw, with
 * no dimming. Unlike the spec, every piece of text sits on a solid Deep Teal panel anchored to the bottom
 * edge (guidelines: text on imagery, no tints over people), in the brand's fonts and colours.
 */
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Pause, Play, Plus } from "@phosphor-icons/react";
import { useIntroDone } from "@/hooks/use-intro-done";
import { cn } from "@/lib/utils";

type Programme = { slug: string; title: string; short: string; image: string; imageAlt: string };

// The block under each panel's photo is Deep Teal for every programme: programmes are numbered, never
// colour-coded (guidelines), so lpas's different colour per sector is not carried over
const blocks = ["bg-teal text-offwhite"];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** null until known in the browser, so the hero (and its video) is built once, not rebuilt on desktop */
function useDesktop() {
  const [desk, setDesk] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const on = () => setDesk(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return desk;
}

function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900, rem: 16 });
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight, rem: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16 });
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return vp;
}

export function HomeHero({
  label,
  title,
  sub,
  actions,
  video,
  poster,
  programmes,
  tag,
}: {
  label: string;
  title: string; // "\n" starts a new line
  sub: string;
  tag?: string;
  actions?: React.ReactNode;
  video: { src: string; media?: string }[];
  poster: string;
  programmes: Programme[];
}) {
  const desk = useDesktop();
  const reduce = useReducedMotion();
  const pinned = !!desk && !reduce;
  const vp = useViewport();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const introDone = useIntroDone();

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduce) v.pause();
    else v.play().catch(() => setPlaying(false));
  }, [reduce]);

  const n = programmes.length;
  const cardW = Math.min((6 / 7) * vp.h, 0.8 * vp.w);
  // Space the first programme panel takes at the right edge while pinned, so the tag sits clear of it
  const peek = pinned ? 0.26 * cardW : 0;
  const explore = () =>
    window.scrollBy({ top: pinned ? cardW : Math.round(window.innerHeight * 0.9), behavior: "smooth" });

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const main = (hidden: boolean) => (
    <div className="absolute inset-0 transition-opacity duration-300 ease-out" style={{ opacity: hidden ? 0 : 1 }}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {video.map((s) => (
          <source key={s.src} src={s.src} type="video/mp4" media={s.media} />
        ))}
      </video>
      {/* Headline at the bottom left, on a solid Deep Teal panel anchored to the bottom edge */}
      <div className="on-teal absolute bottom-0 left-0 z-10 bg-teal px-5 pb-8 pt-7 text-offwhite md:max-w-[46rem] md:px-12 md:pb-12 md:pt-10 xl:max-w-[calc(46rem+max(0px,(100vw-1920px)/2))] xl:pl-[max(5rem,calc((100vw-1920px)/2+5rem))]">
        <FadeIn show={introDone || !!reduce} delay={200} duration={500}>
          <p className="type-label flex items-center gap-4">
            <span className="gold-thread w-10" />
            {label}
          </p>
        </FadeIn>
        <AnimatedHeading text={title} show={introDone || !!reduce} className="type-display mt-5 max-md:text-[2.25rem] max-md:leading-[2.6rem]" />
        <FadeIn show={introDone || !!reduce} delay={800} duration={1000}>
          <p className="mt-5 max-w-[46ch] max-md:text-[1rem] max-md:leading-6">{sub}</p>
        </FadeIn>
        <FadeIn show={introDone || !!reduce} delay={1200} duration={1000} className="mt-7 flex flex-wrap items-center gap-4">
          <Fragment key="actions">{actions}</Fragment>
          <button key="explore" type="button" onClick={explore} className="btn border border-offwhite text-offwhite transition-colors hover:bg-offwhite hover:text-teal">
            Explore
          </button>
        </FadeIn>
        {/* Phones: the tag sits at the foot of the panel */}
        {tag && (
          <FadeIn show={introDone || !!reduce} delay={1400} duration={1000} className="md:hidden">
            <p className="mt-6 border-t border-offwhite/30 pt-4 text-[1.125rem] leading-7">{tag}</p>
          </FadeIn>
        )}
      </div>
      {/* Tag at the bottom right, on its own Deep Teal panel, clear of the first programme panel */}
      {tag && (
        <div className="absolute bottom-0 z-10 hidden md:block" style={{ right: peek ? peek + 24 : 0 }}>
          <FadeIn show={introDone || !!reduce} delay={1400} duration={1000}>
            <p className="on-teal bg-teal px-6 py-3 text-[1.25rem] leading-8 text-offwhite lg:text-[1.5rem]">{tag}</p>
          </FadeIn>
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute right-4 top-20 z-30 grid h-11 w-11 place-items-center rounded-[8px] bg-teal text-offwhite transition-colors hover:bg-teal-80 md:right-6 md:top-24"
      >
        {playing ? <Pause size={18} weight="fill" aria-hidden /> : <Play size={18} weight="fill" aria-hidden />}
      </button>
    </div>
  );

  // Before the layout is known: the hero's space on Deep Teal with the video's poster (under the loading screen)
  if (desk === null) {
    return (
      <section className="relative h-[100dvh] min-h-[36rem] overflow-hidden bg-teal">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
      </section>
    );
  }

  if (!pinned) {
    return (
      <>
        <section className="relative h-[100dvh] min-h-[36rem] overflow-hidden bg-teal">{main(false)}</section>
        <section aria-label="Our programmes" className="bg-offwhite">
          {programmes.map((pr, i) => (
            <StackedPanel key={pr.slug} programme={pr} index={i} count={n} reduce={!!reduce} />
          ))}
        </section>
      </>
    );
  }

  return <PinnedHero programmes={programmes} vp={vp} cardW={cardW} main={main} />;
}

/** The pinned desktop version: owns its section, so scroll progress is measured against it. */
function PinnedHero({
  programmes,
  vp,
  cardW,
  main,
}: {
  programmes: Programme[];
  vp: { w: number; h: number; rem: number };
  cardW: number;
  main: (hidden: boolean) => React.ReactNode;
}) {
  const section = useRef<HTMLElement>(null);
  const n = programmes.length;
  const rowStart = vp.w - 0.26 * cardW;
  const travel = rowStart + n * cardW - vp.w; // until the last panel is flush with the right edge
  const { scrollYProgress: p } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(p, (v) => -travel * v);
  const [mainHidden, setMainHidden] = useState(false);
  useMotionValueEvent(p, "change", (v) => setMainHidden(v > 0.9));

  return (
    <section ref={section} className="relative bg-teal" style={{ height: `calc(100vh + ${3 * vp.w}px)` }}>
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {main(mainHidden)}
        <motion.ul className="absolute top-0 z-20 flex h-full" style={{ left: rowStart, x }} aria-label="Our programmes">
          {programmes.map((pr, i) => (
            <PinnedPanel
              key={pr.slug}
              programme={pr}
              index={i}
              count={n}
              x={x}
              left={rowStart + i * cardW}
              width={cardW}
              vp={vp}
            />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function PanelText({ programme, index, count, shown }: { programme: Programme; index: number; count: number; shown: boolean }) {
  const rise = (d: number) => ({
    opacity: shown ? 1 : 0,
    transform: shown ? "translateY(0)" : "translateY(10px)",
    filter: shown ? "blur(0px)" : "blur(10px)",
    transition: `opacity .5s ease-out ${d}s, transform .5s ease-out ${d}s, filter .5s ease-out ${d}s`,
  });
  return (
    <>
      <span
        className="col-start-2 row-start-1 grid h-14 w-14 place-items-center self-start justify-self-end rounded-full border border-current transition-opacity duration-500"
        style={{ opacity: shown ? 1 : 0, transitionDelay: shown ? "1s" : "0s" }}
        aria-hidden
      >
        <Plus size={20} />
      </span>
      <div className="col-span-2 row-start-2 grid items-end gap-x-6 md:grid-cols-[1fr_auto]">
        <div>
          <h2 className="font-[family-name:var(--font-head)] text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.01em] md:text-[clamp(1.75rem,4.6vh,3.25rem)]" style={rise(0)}>
            {programme.title}
          </h2>
          <p className="type-label pb-6 pt-3 md:pb-[clamp(1.25rem,4vh,3rem)]" style={rise(0.5)}>
            {index + 1} / {count}
          </p>
        </div>
        <p className="max-w-[20ch] pb-6 text-[1rem] leading-[1.5rem] max-md:hidden md:pb-[clamp(1.25rem,4vh,3rem)]" style={rise(0.5)}>
          {programme.short}
        </p>
      </div>
    </>
  );
}

function PinnedPanel({
  programme,
  index,
  count,
  x,
  left,
  width,
  vp,
}: {
  programme: Programme;
  index: number;
  count: number;
  x: MotionValue<number>;
  left: number;
  width: number;
  vp: { w: number; h: number; rem: number };
}) {
  // lpas: per-panel scrub from "10% 90%" (10% of the panel at 90% of the screen) to "250% right"
  const x0 = 0.9 * vp.w - 0.1 * width;
  const x1 = vp.w - 2.5 * width;
  const t = useTransform(x, (dx) => clamp01((x0 - (left + dx)) / (x0 - x1)));
  const blockPx = Math.max(0.317 * vp.h, 260); // never too short for the title and line on low screens
  const imageRow = useTransform(t, (k) => {
    const g = clamp01(k / 0.5); // the row change takes the first half; the photo scale the whole
    return `${vp.h * 0.5 + (vp.h - blockPx - vp.h * 0.5) * g}px`;
  });
  const gridTemplateRows = useTransform(imageRow, (r) => `${r} 1fr`);
  const imgScale = useTransform(t, [0, 1], [1.3, 1]);
  const brightness = useTransform(t, [0, 0.3], index === 0 ? ["brightness(0.5)", "brightness(1)"] : ["none", "none"]);
  const [shown, setShown] = useState(false);
  useMotionValueEvent(t, "change", (k) => setShown(k > 0.2));

  return (
    <motion.li className="relative grid h-full shrink-0 overflow-hidden border-l border-offwhite" style={{ width, gridTemplateRows, filter: brightness }}>
      <Link href={`/services#${programme.slug}`} className="absolute inset-0 z-10" aria-label={programme.title} />
      <div className="relative overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
          {/* Eager: the panels arrive by scrolling sideways, too fast for lazy loading to keep up */}
          <Image src={programme.image} alt={programme.imageAlt} fill sizes="(min-aspect-ratio: 1/1) 86vh, 80vw" loading="eager" className="object-cover" />
        </motion.div>
      </div>
      <div className={cn("grid grid-cols-[1fr_auto] grid-rows-[1fr_auto] px-[clamp(1.5rem,3.4vw,3rem)] pt-[clamp(1.25rem,4vh,4rem)]", blocks[index % blocks.length])}>
        <PanelText programme={programme} index={index} count={count} shown={shown} />
      </div>
    </motion.li>
  );
}

function StackedPanel({ programme, index, count, reduce }: { programme: Programme; index: number; count: number; reduce: boolean }) {
  // lpas phones: plays once 15% of the panel reaches 80% down the screen
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { rootMargin: "0px 0px -20% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const on = shown || reduce;
  return (
    <div ref={ref} className="relative">
      <Link href={`/services#${programme.slug}`} className="absolute inset-0 z-10" aria-label={programme.title} />
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0" style={{ transform: on ? "translateX(0)" : "translateX(120%)", transition: "transform 1s cubic-bezier(.25,.46,.45,.94) .15s" }}>
          <Image
            src={programme.image}
            alt={programme.imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ scale: on ? 1 : 1.2, transition: "scale 1s cubic-bezier(.25,.46,.45,.94) .15s" }}
          />
        </div>
      </div>
      <div className={cn("grid grid-cols-[1fr_auto] grid-rows-[auto_auto] px-5 pt-6", blocks[index % blocks.length])}>
        <PanelText programme={programme} index={index} count={count} shown={on} />
      </div>
    </div>
  );
}

/** Fades in once `show` is true, after `delay` ms, over `duration` ms (spec: FadeIn). */
function FadeIn({
  show,
  delay,
  duration,
  className,
  children,
}: {
  show: boolean;
  delay: number;
  duration: number;
  className?: string;
  children: React.ReactNode;
}) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!show) return;
    const id = window.setTimeout(() => setOn(true), delay);
    return () => window.clearTimeout(id);
  }, [show, delay]);
  return (
    <div className={cn("transition-opacity", className)} style={{ opacity: on ? 1 : 0, transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  );
}

/**
 * Headline entering letter by letter (spec: AnimatedHeading). Lines split on "\n"; every letter starts
 * 18px to the left at opacity 0 and moves into place over 500ms, 30ms after the one before (each line
 * continuing from the end of the previous), beginning 200ms after `show`. Words never break mid-word.
 * Screen readers get the plain heading.
 */
function AnimatedHeading({ text, show, className }: { text: string; show: boolean; className?: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!show) return;
    const id = window.setTimeout(() => setOn(true), 200);
    return () => window.clearTimeout(id);
  }, [show]);
  const CHAR_DELAY = 30;
  const lines = text.split("\n");
  let offset = 0;
  return (
    <h1 className={className} aria-label={text.replace(/\n/g, " ")}>
      {lines.map((line, li) => {
        const start = offset;
        offset += line.length;
        let ci = 0;
        return (
          <span key={li} className="block" aria-hidden>
            {line.split(" ").map((word, wi, words) => {
              const letters = [...word].map((ch) => {
                const delay = (start + ci++) * CHAR_DELAY;
                return (
                  <span
                    key={ci}
                    className="inline-block"
                    style={{
                      opacity: on ? 1 : 0,
                      transform: on ? "translateX(0)" : "translateX(-18px)",
                      transition: `opacity 500ms ease, transform 500ms ease`,
                      transitionDelay: `${delay}ms`,
                    }}
                  >
                    {ch}
                  </span>
                );
              });
              if (wi < words.length - 1) ci++; // the space counts toward the stagger, as in the spec
              return (
                <span key={wi} className="inline-block whitespace-nowrap">
                  {letters}
                  {wi < words.length - 1 ? "\u00a0" : ""}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
