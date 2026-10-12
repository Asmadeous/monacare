"use client";

import { useEffect, useState } from "react";

// Loading screen shown on every initial page load: the logo and a loading bar that tracks real progress
// (above-the-fold images, web fonts, then the window load event). It fades out as soon as the page is ready.
const MIN_MS = 600; // avoids a flash on very fast loads
const FADE_MS = 700;

export default function Intro() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "show") return;

    const started = performance.now();
    // Lazy images below the fold never load behind the screen, so only eager ones are counted
    const imgs = Array.from(document.images).filter((img) => img.loading !== "lazy");
    const total = imgs.length + 2; // + fonts + window load
    let done = 0;
    let finished = false;
    let timer = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(1);
      timer = window.setTimeout(() => {
        setLeaving(true);
        timer = window.setTimeout(() => (root.dataset.intro = "seen"), FADE_MS);
      }, Math.max(250, MIN_MS - (performance.now() - started)));
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

  return (
    <div
      role="progressbar"
      aria-label="Loading MonaCare"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className={`intro on-teal fixed inset-0 z-[70] flex flex-col items-center justify-center bg-teal px-5 transition-opacity duration-700 ease-[var(--ease-calm)] ${
        leaving ? "pointer-events-none opacity-0" : ""
      }`}
    >
      {/* Reversed lockup: for Deep Teal backgrounds. Shown whole, no effects. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/lockup-reversed.svg" alt="MonaCare" className="h-24 w-auto md:h-32" />

      <span className="mt-10 block h-0.5 w-48 overflow-hidden bg-offwhite/20 md:w-56" aria-hidden>
        <span
          className="block h-full w-full origin-left bg-gold transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `scaleX(${progress})` }}
        />
      </span>
    </div>
  );
}
