"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Loading screen shown on every initial page load: the logo and a loading bar that tracks real progress
 * (above-the-fold images, web fonts, then the window load event).
 *
 * While it loads, the logo is revealed piece by piece in place: the symbol first, then the wordmark one
 * letter at a time, each wiping upward. Only the master artwork is used, whole and unaltered at rest; the
 * reveal is a clip, so nothing is moved, distorted, retyped or given effects (guidelines p.15).
 *
 * When loading finishes, the screen opens like neutomni.com's loader: it is two Deep Teal sheets meeting
 * at the loading bar's line (60% / 40%), and they pull apart, the top up and the bottom down, over 1.5 s
 * with an accelerating ease (cubic-bezier(.55,.055,.675,.19)), uncovering the page already in place.
 */
const MIN_MS = 1900; // long enough for the logo reveal to finish on fast loads
const OPEN_DELAY = 150;
const OPEN_MS = 1500;
const OPEN_EASE = "cubic-bezier(0.55, 0.055, 0.675, 0.19)";
const SEAM = 60; // % from the top where the two sheets meet: the loading bar's line

// Pieces of the stacked lockup, as % of the artwork (measured from lockup-reversed.svg):
// the symbol above, then each letter of the wordmark. Together they cover the whole artwork.
const WORD_TOP = 75;
const pieces = [
  { t: 0, r: 100, b: WORD_TOP, l: 0 }, // symbol
  ...[0, 16.25, 28.55, 41.4, 53.75, 68, 77.5, 85.5, 100]
    .slice(0, -1)
    .map((l, i, a) => ({ t: WORD_TOP, b: 100, l, r: [...a.slice(1), 100][i] })), // M o n a C a r e
];

const clip = (p: { t: number; r: number; b: number; l: number }, open: boolean) =>
  `inset(${open ? p.t : p.b}% ${100 - p.r}% ${100 - p.b}% ${p.l}%)`;

function Logo({ hidden }: { hidden?: boolean }) {
  return (
    <span className="intro-logo relative block aspect-[2069/1681] h-24 md:h-32" aria-hidden={hidden || undefined}>
      {pieces.map((p, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src="/brand/lockup-reversed.svg"
          alt={i === 0 && !hidden ? "MonaCare" : ""}
          data-piece={i}
          className="absolute inset-0 h-full w-full"
          style={{ clipPath: clip(p, false) }}
        />
      ))}
    </span>
  );
}

/** Logo above the seam, bar on the seam. Laid out against the full screen so both sheets line up exactly. */
function Content({ progress, opening, hidden }: { progress: number; opening: boolean; hidden?: boolean }) {
  return (
    <>
      <div className="absolute inset-x-0 flex justify-center" style={{ bottom: `calc(${100 - SEAM}% + 2.5rem)` }}>
        <Logo hidden={hidden} />
      </div>
      <span
        className={`intro-bar absolute left-1/2 block h-0.5 w-48 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-offwhite/20 transition-opacity delay-150 duration-100 md:w-56 ${opening ? "opacity-0" : ""}`}
        style={{ top: `${SEAM}%` }}
        aria-hidden
      >
        <span
          className="block h-full w-full origin-left bg-gold transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </span>
    </>
  );
}

export default function Intro() {
  const [progress, setProgress] = useState(0);
  const [opening, setOpening] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // The logo reveal: symbol, then the letters one after another
  useEffect(() => {
    const el = root.current;
    if (!el || document.documentElement.dataset.intro !== "show") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const anims: Animation[] = [];
    el.querySelectorAll<HTMLImageElement>("[data-piece]").forEach((img) => {
      const i = Number(img.dataset.piece);
      const p = pieces[i];
      img.style.clipPath = clip(p, true);
      if (reduce) return;
      anims.push(
        img.animate([{ clipPath: clip(p, false) }, { clipPath: clip(p, true) }], {
          duration: i === 0 ? 1000 : 700,
          delay: i === 0 ? 100 : 450 + (i - 1) * 80,
          easing: "cubic-bezier(0.14, 0.83, 0.4, 1)",
          fill: "backwards", // hidden until its turn
        }),
      );
    });
    return () => anims.forEach((a) => a.cancel());
  }, []);

  // Real loading progress, then the opening
  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "show") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const started = performance.now();
    // Lazy images below the fold never load behind the screen, so only eager ones are counted
    const imgs = Array.from(document.images).filter((img) => img.loading !== "lazy" && !img.closest(".intro"));
    const total = imgs.length + 2; // + fonts + window load
    let done = 0;
    let finished = false;
    let timer = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(1);
      timer = window.setTimeout(
        () => {
          // "opening": the page underneath starts its entrance while the sheets pull apart
          html.dataset.intro = "opening";
          setOpening(true);
          timer = window.setTimeout(() => (html.dataset.intro = "seen"), reduce ? 0 : OPEN_DELAY + OPEN_MS);
        },
        Math.max(300, (reduce ? 400 : MIN_MS) - (performance.now() - started)),
      );
    };

    const tick = () => {
      done += 1;
      if (!finished) setProgress(Math.min(done / total, 0.95));
    };

    imgs.forEach((img) => {
      if (img.complete) tick();
      else {
        img.addEventListener("load", tick, { once: true });
        img.addEventListener("error", tick, { once: true });
      }
    });
    document.fonts.ready.then(tick);

    const onLoad = () => finish();
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      imgs.forEach((img) => {
        img.removeEventListener("load", tick);
        img.removeEventListener("error", tick);
      });
    };
  }, []);

  const sheet = `absolute inset-x-0 overflow-hidden bg-teal motion-safe:transition-[height] motion-safe:duration-[1500ms] motion-safe:delay-150`;

  return (
    <div
      ref={root}
      role="progressbar"
      aria-label="Loading MonaCare"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className={`intro on-teal fixed inset-0 z-[70] ${opening ? "pointer-events-none" : ""}`}
    >
      {/* Top sheet: everything above the bar's line; pulls up */}
      <div className={`${sheet} top-0`} style={{ height: opening ? "0%" : `${SEAM}%`, transitionTimingFunction: OPEN_EASE }}>
        <div className="absolute inset-x-0 top-0 h-[100dvh]">
          <Content progress={progress} opening={opening} />
        </div>
      </div>
      {/* Bottom sheet: everything below the line; pulls down */}
      <div className={`${sheet} bottom-0`} style={{ height: opening ? "0%" : `${100 - SEAM}%`, transitionTimingFunction: OPEN_EASE }}>
        <div className="absolute inset-x-0 bottom-0 h-[100dvh]">
          <Content progress={progress} opening={opening} hidden />
        </div>
      </div>
    </div>
  );
}
