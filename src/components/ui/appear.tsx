"use client";

/**
 * Entrance effects taken from lpas.com's stylesheet and script (main-DN-9Dm9S.css, main-DWS2mxMG.js):
 *  - FadeInUp: [data-fadeinanimation=fadeInUp] — opacity 0 and 30px down, to rest over 0.6s ease-out.
 *    Elements entering together are staggered 100ms apart.
 *  - ImageAppear: [data-imageanimate] — the frame opens from clip-path inset(40% 0 0 0) at opacity 0.2
 *    while the photo settles from scale 1.5, over 1.2s cubic-bezier(.14,.83,.4,1). Photos entering
 *    together are staggered 150ms apart. The photo then drifts with lpas's image parallax (up to 15%).
 */
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useIntroDone } from "@/hooks/use-intro-done";
import { cn } from "@/lib/utils";

export const LPAS_EASE = "cubic-bezier(.14,.83,.4,1)";

/**
 * True the first time the element is on screen (lpas: IntersectionObserver, threshold 0), and not before
 * the loading screen has opened, so nothing plays unseen behind it.
 */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setSeen] = useState(false);
  const introDone = useIntroDone();
  const seen = inView && introDone;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

export function FadeInUp({
  children,
  className,
  order = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  order?: number; // position among elements entering together: delayed by 100ms each
  as?: "div" | "p" | "h1" | "h2" | "h3" | "li" | "span";
}) {
  const [ref, seen] = useSeen<HTMLElement>();
  const reduce = useReducedMotion();
  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={className}
      style={
        reduce
          ? undefined
          : {
              opacity: seen ? 1 : 0,
              transform: seen ? "translateY(0)" : "translateY(30px)",
              transition: `opacity .6s ease-out ${order * 0.1}s, transform .6s ease-out ${order * 0.1}s`,
            }
      }
    >
      {children}
    </Tag>
  );
}

export function ImageAppear({
  src,
  alt,
  sizes,
  className,
  imageClassName,
  priority,
  order = 0,
  parallax = true,
  imageStyle,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string; // the frame: aspect ratio, brand frame shape
  imageClassName?: string;
  priority?: boolean;
  order?: number; // delayed by 150ms each
  parallax?: boolean;
  imageStyle?: React.CSSProperties;
}) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // lpas image parallax: translateY 0 → 15% as the module passes (multiplier 150, range -0.1…0)
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const delay = `${order * 0.15}s`;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={
        reduce
          ? undefined
          : {
              clipPath: seen ? "inset(0% 0px 0px 0px)" : "inset(40% 0px 0px 0px)",
              opacity: seen ? 1 : 0.2,
              transition: `clip-path 1.2s ${LPAS_EASE} ${delay}, opacity 1.2s ${LPAS_EASE} ${delay}`,
            }
      }
    >
      <motion.div className="absolute inset-x-0 -top-[15%] bottom-0" style={reduce || !parallax ? { top: 0 } : { y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
          style={{
            ...imageStyle,
            ...(reduce ? {} : { scale: seen ? 1 : 1.5, transition: `scale 1.2s ${LPAS_EASE} ${delay}` }),
          }}
        />
      </motion.div>
    </div>
  );
}
