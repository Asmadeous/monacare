"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { site } from "@/content/site";
import ConsultationForm from "./ConsultationForm";

/**
 * One booking dialog for the whole site. Any link to `#book` opens it (header, hero, footer, Team, Services);
 * add `data-programme="<programme title>"` to preselect the area of interest. Arriving on a URL with
 * `#book` opens it too, so the booking form can be linked from outside the site.
 */
export default function BookingModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [interest, setInterest] = useState("");
  const [session, setSession] = useState(0); // remounts the form so every opening starts fresh

  const open = (programme = "") => {
    setInterest(programme);
    setSession((n) => n + 1);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href="#book"]');
      if (!link) return;
      e.preventDefault();
      open(link.dataset.programme ?? "");
    };
    // Capture phase: runs before Next <Link> handlers, which then see defaultPrevented and stand down
    document.addEventListener("click", onClick, true);
    if (location.hash === "#book") open();
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="booking-title"
      onClick={(e) => e.target === dialog.current && close()} // click on the backdrop
      className="booking m-0 h-full max-h-none w-full max-w-none bg-white p-0 text-teal backdrop:bg-teal/70 sm:m-auto sm:h-auto sm:max-h-[calc(100dvh-4rem)] sm:w-[min(40rem,calc(100vw-4rem))]"
    >
      <div className="flex items-start justify-between gap-6 border-b border-teal-20 px-6 py-5 sm:px-10 sm:py-7">
        <div>
          <h2 id="booking-title" className="type-h2">Request a consultation</h2>
          <p className="type-caption mt-1">Sixty minutes with a specialist. We reply within one working day.</p>
          <p className="type-caption mt-1">
            Open {site.hours}. Prefer to call?{" "}
            <a href={`tel:${site.phoneTel}`} className="link">
              {site.phone}
            </a>
          </p>
        </div>
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-[8px] text-teal transition-colors hover:bg-teal-10"
        >
          <X size={22} weight="bold" aria-hidden />
        </button>
      </div>
      <div className="px-6 py-8 sm:px-10 sm:py-10">
        <ConsultationForm key={session} interest={interest} onClose={close} />
      </div>
    </dialog>
  );
}
