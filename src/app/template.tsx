"use client";

/**
 * Page transition (lpas.com uses swup for this): on every page change a Deep Teal panel covers the
 * screen and lifts away upward, and the new page fades in beneath it. Skipped for reduced motion.
 */
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

// Set after the first page has mounted. The first load has the loading screen instead of the curtain.
let navigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [curtain] = useState(() => navigated);
  useEffect(() => {
    // After a page change, move focus to the new page's content so screen readers start there
    if (navigated) document.getElementById("main")?.focus({ preventScroll: true });
    navigated = true;
  }, []);
  return (
    <>
      {curtain && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[75] origin-top bg-teal"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        />
      )}
      <motion.div initial={curtain && !reduce ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}>
        {children}
      </motion.div>
    </>
  );
}
