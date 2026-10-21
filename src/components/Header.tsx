"use client";

/**
 * Site navigation, rebuilt from lpas.com's NavigationMain (script-Cs4glhUL.js and its stylesheet).
 *  - A fixed bar with nothing behind it: the logo top left on a small frosted chip, which fades out once
 *    the page has scrolled 10px (0.2s); top right, "Book a consultation" and a Menu pill (label + lines).
 *  - Menu opens a full-screen panel that rises from the bottom (top 100vh → 0, 1.5s, power4 in-out). The
 *    menu lines fold into a cross and "Menu" becomes "Close". Then the heading fades in, the page links
 *    rise 10px out of a 5px blur (0.5s, 0.1s apart) and the contact line fades in last. Hovering one
 *    group softens the other.
 *  - Escape or the button closes it, playing the same timeline backwards 1.5× faster. The page doesn't
 *    scroll while it is open.
 * Brand: the panel is Deep Teal (lpas uses near-black); the logo stays whole and is never animated.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import BookButton from "./BookButton";
import { site } from "@/content/site";
import { SocialLinks } from "./SocialLinks";

const POWER4_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const on = () => setAtTop(window.scrollY <= 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));
  const t = (base: number, speed = 1) => (open ? base : base / (1.5 * speed)); // closing plays 1.5× faster

  // Group hover: the other groups soften (lpas data-blurred)
  const groupProps = (name: string) => ({
    onMouseEnter: () => setHovered(name),
    onMouseLeave: () => setHovered(null),
    style: { opacity: hovered && hovered !== name ? 0.45 : 1, transition: "opacity .3s ease" },
  });

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between gap-6 px-4 py-4 md:px-6 md:py-6 xl:px-[max(1.5rem,calc((100vw-1920px)/2+1.5rem))]">
          {/* Logo on a frosted chip; fades out after the first 10px of scroll, back at the top */}
          <Link
            href="/"
            aria-label="MonaCare home"
            className="pointer-events-auto flex items-center gap-3 rounded-[8px] bg-offwhite px-3 py-2 transition-opacity duration-200"
            style={{ opacity: atTop || open ? 1 : 0, pointerEvents: atTop || open ? "auto" : "none" }}
            tabIndex={atTop || open ? 0 : -1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/symbol.svg" alt="" className="h-9 w-auto md:h-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/wordmark.svg" alt="MonaCare" className="h-[19px] w-auto md:h-[21px]" />
          </Link>

          <div className="pointer-events-auto flex items-center gap-2">
            <BookButton className="hidden border border-offwhite py-2.5 text-[15px] sm:inline-flex">{site.cta.label}</BookButton>
            <button
              ref={button}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              // Off-White outline so the pill keeps its shape over Deep Teal sections
              className={`flex h-11 items-center gap-3 rounded-[8px] border border-offwhite pl-4 pr-3 transition-colors duration-300 ${open ? "bg-offwhite text-teal" : "bg-teal text-offwhite"}`}
            >
              <span className="type-label relative block h-5 w-12 overflow-hidden text-left">
                <span className="absolute inset-0 transition-transform duration-300" style={{ transform: open ? "translateY(-100%)" : "none" }}>
                  Menu
                </span>
                <span className="absolute inset-0 transition-transform duration-300" style={{ transform: open ? "none" : "translateY(100%)" }}>
                  Close
                </span>
              </span>
              <span className="relative block h-4 w-5" aria-hidden>
                <span
                  className="absolute left-0 top-[3px] h-0.5 w-5 bg-current transition-transform duration-500"
                  style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }}
                />
                <span
                  className="absolute left-0 top-[11px] h-0.5 w-5 bg-current transition-transform duration-500"
                  style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-teal fixed inset-0 z-[55] overflow-y-auto bg-teal text-offwhite"
            initial={reduce ? { opacity: 0 } : { y: "100vh" }}
            animate={reduce ? { opacity: 1 } : { y: "0vh" }}
            exit={reduce ? { opacity: 0 } : { y: "100vh", transition: { duration: 1, ease: POWER4_IN_OUT, delay: 0.25 } }}
            transition={{ duration: 1.5, ease: POWER4_IN_OUT }}
            data-lenis-prevent
          >
            <div className="mx-auto grid min-h-full max-w-[1920px] gap-y-14 px-5 pb-12 pt-32 md:grid-cols-12 md:gap-x-6 md:px-10 md:pt-40 xl:px-20">
              {/* Main links: the pages, large (programmes are on the Services page, not repeated here) */}
              <nav aria-label="Pages" className="md:col-span-7" {...groupProps("main")}>
                <MenuHeading delay={t(0.9)}>Menu</MenuHeading>
                <motion.span
                  className="mt-4 block h-px origin-right bg-offwhite"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.8, delay: t(0.7), ease: "easeOut" }}
                  aria-hidden
                />
                <ul className="mt-6">
                  {site.nav.map((n, i) => (
                    <motion.li
                      key={n.href}
                      initial={{ y: 10, opacity: 0, filter: "blur(5px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.5, delay: t(1) + i * 0.1 }}
                    >
                      <Link
                        href={n.href}
                        aria-current={isActive(n.href) ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className="type-display block py-1 decoration-gold decoration-2 underline-offset-[0.15em] hover:underline aria-[current=page]:underline"
                      >
                        {n.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="grid content-start gap-y-12 md:col-span-4 md:col-start-9">
                {/* Contact */}
                <motion.div {...groupProps("contact")} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: t(1.6) }}>
                  <p className="type-label">Contact</p>
                  <a href={`mailto:${site.email}`} className="link mt-2 flex min-h-11 items-center text-[1.125rem]">
                    {site.email}
                  </a>
                  <a href={`tel:${site.phoneTel}`} className="link flex min-h-11 items-center text-[1.125rem]">
                    {site.phone}
                  </a>
                  <p className="type-caption mt-1">Open {site.hours}</p>
                  <SocialLinks className="mt-5" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuHeading({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.p className="type-label" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, delay }}>
      {children}
    </motion.p>
  );
}
