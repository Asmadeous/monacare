"use client";

import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

/**
 * Site-wide smooth scrolling with Lenis (lenis.dev). Lenis scrolls the real window, so `position: sticky`
 * and Motion's useScroll keep working. It honours prefers-reduced-motion by default.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.085, anchors: { offset: -96 }, stopInertiaOnNavigate: true, autoRaf: true }}>
      <PauseWhenLocked />
      {children}
    </ReactLenis>
  );
}

/** Stop smoothing while the page is locked: loading screen, booking dialogs, open programme cards. */
function PauseWhenLocked() {
  const lenis = useLenis();
  useEffect(() => {
    if (!lenis) return;
    const html = document.documentElement;
    const body = document.body;
    let last: boolean | null = null;
    const check = () => {
      const locked =
        html.dataset.intro === "show" ||
        html.dataset.intro === "opening" ||
        body.style.overflow === "hidden" ||
        body.classList.contains("overflow-hidden") ||
        !!document.querySelector("dialog[open]");
      if (locked === last) return; // only act on a change (stop/start toggle classes on <html>)
      last = locked;
      if (locked) lenis.stop();
      else lenis.start();
    };
    check();
    // Watch only the page root and dialogs' `open` attribute: animations change styles constantly deeper down
    const mo = new MutationObserver(check);
    mo.observe(html, { attributes: true, attributeFilter: ["data-intro"] });
    mo.observe(body, { attributes: true, attributeFilter: ["class", "style"] });
    mo.observe(body, { subtree: true, attributes: true, attributeFilter: ["open"] });
    return () => mo.disconnect();
  }, [lenis]);
  return null;
}
