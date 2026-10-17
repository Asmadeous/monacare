"use client";

import { MotionConfig } from "motion/react";

/** Honour the visitor's reduced-motion setting for every motion component on the site. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
