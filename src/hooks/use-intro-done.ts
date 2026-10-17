"use client";

import { useEffect, useState } from "react";

/** True once the loading screen (components/Intro.tsx) has gone, so entrance animations play in view. */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const check = () => setDone(root.dataset.intro !== "show");
    check();
    const mo = new MutationObserver(check);
    mo.observe(root, { attributes: true, attributeFilter: ["data-intro"] });
    return () => mo.disconnect();
  }, []);
  return done;
}
