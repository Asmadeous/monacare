"use client";

import { useState, type FormEvent } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";
import { services } from "@/content/site";

type State = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[8px] border border-teal-40 bg-white px-4 py-3 text-teal outline-none transition-colors placeholder:text-teal-80 hover:border-teal-80 focus-visible:border-teal";
const label = "font-[family-name:var(--font-head)] text-[15px] font-semibold text-teal";

export default function ConsultationForm({ interest = "", onClose }: { interest?: string; onClose?: () => void }) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "We couldn't send your request. Please try again.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't send your request. Please try again.");
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="flex min-h-[22rem] flex-col items-start justify-center" role="status">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-teal text-offwhite">
          <Check size={22} weight="bold" />
        </span>
        <p className="type-h2 mt-8 text-teal">Request sent</p>
        <p className="mt-3 max-w-sm text-teal">
          Thank you. We&rsquo;ll be in touch within one working day to arrange your consultation.
        </p>
        {onClose && (
          <button type="button" onClick={onClose} className="btn mt-10 bg-teal text-offwhite hover:bg-teal-80">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="name" className={label}>Full name</label>
          <input id="name" name="name" required autoComplete="name" autoFocus className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor="organisation" className={label}>
            Organisation <span className="font-[family-name:var(--font-body)] font-normal">(optional)</span>
          </label>
          <input id="organisation" name="organisation" autoComplete="organization" className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor="interest" className={label}>Area of interest</label>
          <div className="relative">
            <select id="interest" name="interest" defaultValue={interest} required className={`${field} appearance-none pr-10`}>
              <option value="" disabled>Choose a programme</option>
              {services.items.map((s) => (
                <option key={s.slug}>{s.title}</option>
              ))}
            </select>
            <CaretDown size={16} weight="bold" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-teal" aria-hidden />
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className={label}>
          About your organisation <span className="font-[family-name:var(--font-body)] font-normal">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={3} className={`${field} resize-y`} />
      </div>
      {/* honeypot */}
      <input type="text" name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {state === "error" && (
        <p className="rounded-[8px] border border-teal bg-white px-4 py-3 text-teal" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pt-2">
        <p className="type-caption max-w-xs text-teal">We&rsquo;ll only use your details to arrange your consultation.</p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="btn bg-teal text-offwhite hover:bg-teal-80 disabled:cursor-wait disabled:bg-teal-80"
        >
          {state === "sending" ? "Sending request" : "Send request"}
        </button>
      </div>
    </form>
  );
}
