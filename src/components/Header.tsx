"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

export default function Header() {
  const pathname = usePathname();
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close the mobile menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div ref={sentinel} className="absolute inset-x-0 top-0 h-8" aria-hidden />
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-offwhite transition-[box-shadow,padding] duration-500 ease-[var(--ease-calm)] ${
          scrolled ? "py-3 shadow-[0_1px_0_var(--color-teal-20)]" : "py-5 md:py-7"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 md:px-10 xl:px-20">
          {/* Horizontal lockup, top left by default, min 120 px wide on screen */}
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="MonaCare home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/symbol.svg" alt="" className="h-10 w-auto md:h-11" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/wordmark.svg" alt="MonaCare" className="h-[21px] w-auto md:h-6" />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {site.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={isActive(n.href) ? "page" : undefined}
                className="font-[family-name:var(--font-head)] text-[15px] font-semibold text-teal decoration-gold decoration-2 underline-offset-[10px] hover:underline aria-[current=page]:underline"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.cta.href} className="btn hidden bg-teal py-3 text-[15px] text-offwhite hover:bg-teal-80 sm:inline-flex">
              {site.cta.label}
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid h-11 w-11 place-items-center rounded-[8px] text-teal lg:hidden"
            >
              <span className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span className={`absolute h-0.5 w-6 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu"
        className={`fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-offwhite px-5 pb-10 pt-28 transition-opacity duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          <span className="gold-thread mb-6" />
          {site.nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className="type-h1 border-b border-teal-20 py-4 text-teal decoration-gold decoration-2 underline-offset-8 aria-[current=page]:underline"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a href={site.cta.href} onClick={() => setOpen(false)} className="btn mt-10 w-full bg-teal text-offwhite">
          {site.cta.label}
        </a>
      </div>
    </>
  );
}
