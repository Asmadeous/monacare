"use client";

/**
 * Team listing, after lpas.com's CollectionTeam (script-1mpDX9Gq.js), its member cards and its team
 * slide-out (main-DWS2mxMG.js and stylesheet):
 *  - a light panel with a tagline over a hairline, an intro line, and filter buttons;
 *  - cards 4:5, the photo in greyscale at scale 1.02, turning to colour and settling to 1 on hover (0.3s);
 *    the first card of each row of the pattern has its top left corner cut (2rem), the last its bottom
 *    right; cards fade up 10px, 0.4s, 0.03s apart;
 *  - choosing a person opens their profile in a panel that slides in from the left over a backdrop
 *    blurred 1.5rem and darkened to 70%; Escape or a click outside closes it, sliding back out over 1s
 *    (power3 in-out) before the backdrop fades (0.5s). Previous / next step through the team.
 * Brand: the backdrop darkens with Deep Teal; the panel is Off-White.
 */
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import BookButton from "../BookButton";
import { wrap } from "../ui";
import type { TeamMember } from "@/content/site";

const POWER3_IN_OUT: [number, number, number, number] = [0.645, 0.045, 0.355, 1];

export function CollectionTeam({
  tagline,
  intro,
  members,
  filters,
}: {
  tagline: string;
  intro: string;
  members: (TeamMember & { group: string })[];
  filters: string[];
}) {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = useMemo(() => members.filter((m) => filter === "All" || m.group === filter), [members, filter]);

  return (
    <section className="bg-offwhite pb-24 md:pb-32">
      <div className={wrap}>
        <div className="pb-10 pt-16 md:pb-12 md:pt-20">
          <p className="type-label border-b border-teal pb-4 text-teal">{tagline}</p>
          <h2 className="type-h1 mt-8 max-w-[24ch] text-teal">{intro}</h2>
          {/* Filters only once they can narrow the list: more than three people across more than one group */}
          {members.length > 3 && new Set(members.map((m) => m.group)).size > 1 && (
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3" role="group" aria-label="Filter the team">
            {["All", ...filters].map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`type-label min-h-11 border-b pb-1 transition-colors ${filter === f ? "border-teal text-teal" : "border-transparent text-teal hover:border-teal-20"}`}
              >
                {f}
              </button>
            ))}
          </div>
          )}
        </div>

        {/* One or two people: each gets a full row, so the panel never stands mostly empty. More: lpas's grid */}
        {shown.length <= 2 ? (
          <ul className="space-y-10">
            {shown.map((m, i) => (
              <motion.li
                key={m.name}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="grid items-center gap-y-6 md:grid-cols-12 md:gap-x-6"
              >
                <button type="button" onClick={() => setOpen(members.indexOf(m))} className="group block md:col-span-4" aria-label={`View ${m.name}'s profile`}>
                  <span className="relative block aspect-[4/5] overflow-hidden [clip-path:polygon(2rem_0,100%_0,100%_100%,0_100%,0_2rem)]">
                    <Image
                      src={m.image}
                      alt={m.imageAlt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="scale-[1.02] object-cover object-top transition-transform duration-300 ease-out group-hover:scale-100 group-focus-visible:scale-100"
                    />
                  </span>
                </button>
                <div className="md:col-span-7 md:col-start-6">
                  <p className="type-label text-teal">{m.role}</p>
                  <h3 className="type-display mt-4 text-teal">{m.name}</h3>
                  <p className="type-h2 mt-3 font-normal text-teal">{m.title}</p>
                  <p className="mt-6 max-w-[56ch] text-teal">{m.summary}</p>
                  <button type="button" onClick={() => setOpen(members.indexOf(m))} className="btn mt-8 bg-teal text-offwhite hover:bg-teal-80">
                    View profile
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        ) : (
        <ul className="grid min-h-[30vh] grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((m, i) => {
              const pos = i % 4;
              const corner = pos === 0 ? "left" : pos === 3 ? "right" : null;
              return (
                <motion.li
                  key={m.name}
                  layout
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                >
                  <button type="button" onClick={() => setOpen(members.indexOf(m))} className="group block w-full text-left">
                    <span
                      className="relative block aspect-[4/5] overflow-hidden"
                      style={{
                        clipPath:
                          corner === "left"
                            ? "polygon(2rem 0, 100% 0, 100% 100%, 0 100%, 0 2rem)"
                            : corner === "right"
                              ? "polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)"
                              : undefined,
                      }}
                    >
                      <Image
                        src={m.image}
                        alt={m.imageAlt}
                        fill
                        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                        className="scale-[1.02] object-cover object-top grayscale transition-[transform,filter] duration-300 ease-out group-hover:scale-100 group-hover:grayscale-0 group-focus-visible:scale-100 group-focus-visible:grayscale-0"
                      />
                    </span>
                    <span className="mt-3 block font-[family-name:var(--font-head)] text-[1.125rem] font-semibold leading-6 text-teal">{m.name}</span>
                    <span className="type-caption line-clamp-2 block text-teal">{m.role}</span>
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        )}
      </div>

      <SlideOut members={members} index={open} onIndex={setOpen} />
    </section>
  );
}

function SlideOut({ members, index, onIndex }: { members: TeamMember[]; index: number | null; onIndex: (i: number | null) => void }) {
  const close = useCallback(() => onIndex(null), [onIndex]);
  const panel = useRef<HTMLDivElement>(null);
  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft" && index! > 0) onIndex(index! - 1);
      if (e.key === "ArrowRight" && index! < members.length - 1) onIndex(index! + 1);
    };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
    };
  }, [isOpen, index, members.length, close, onIndex]);

  const m = index !== null ? members[index] : null;
  const first = m?.name.split(" ")[0];

  return (
    <AnimatePresence>
      {m && (
        <motion.div className="fixed inset-0 z-[79]" initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5, delay: 1 } }}>
          <motion.div
            className="absolute inset-0 bg-teal/70 backdrop-blur-[1.5rem]"
            onMouseDown={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            aria-hidden
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={m.name}
            tabIndex={-1}
            className="absolute inset-y-0 left-0 w-full overflow-y-auto bg-offwhite text-teal outline-none md:w-[min(64rem,85vw)]"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: POWER3_IN_OUT }}
            data-lenis-prevent
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-6 bg-offwhite px-6 py-5 md:px-12">
              <div className="flex gap-3">
                <button type="button" aria-label="Previous person" disabled={index === 0} onClick={() => onIndex(index! - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-teal disabled:opacity-40">
                  <ArrowLeft size={18} aria-hidden />
                </button>
                <button type="button" aria-label="Next person" disabled={index === members.length - 1} onClick={() => onIndex(index! + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-teal disabled:opacity-40">
                  <ArrowRight size={18} aria-hidden />
                </button>
              </div>
              <button type="button" onClick={close} className="type-label flex items-center gap-3">
                Close <X size={18} aria-hidden />
              </button>
            </div>
            <div className="grid gap-x-10 gap-y-10 px-6 pb-16 pt-6 md:grid-cols-12 md:px-12">
              <div className="relative aspect-[4/5] md:col-span-5">
                <Image src={m.image} alt={m.imageAlt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover object-top" />
              </div>
              <div className="md:col-span-7">
                <p className="type-label">{m.role}</p>
                <h2 className="type-display mt-5">{m.name}</h2>
                <p className="type-h2 mt-3 font-normal">{m.title}</p>
                <div className="mt-8 space-y-5">
                  {m.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </div>
                {m.roles.length > 0 && (
                  <ul className="mt-10 border-t border-teal-20">
                    {m.roles.map((r) => (
                      <li key={r.org} className="border-b border-teal-20 py-4">
                        <p className="font-[family-name:var(--font-head)] font-semibold">{r.org}</p>
                        <p className="text-[1rem] leading-[1.625rem]">{r.title}</p>
                        {r.detail && <p className="type-caption mt-1">{r.detail}</p>}
                      </li>
                    ))}
                  </ul>
                )}
                <BookButton className="mt-10">{`Book a consultation with ${first}`}</BookButton>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
