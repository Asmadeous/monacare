"use client";

import { useId, useState, type FormEvent } from "react";
import { CaretDown, Check, EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react";
import { services, site } from "@/content/site";

type State = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[8px] border border-teal-40 bg-white px-4 py-3 text-teal outline-none transition-colors placeholder:text-teal-80 hover:border-teal-80 focus-visible:border-teal";
const label = "font-[family-name:var(--font-head)] text-[15px] font-semibold text-teal";

export default function ConsultationForm({ interest = "", onClose }: { interest?: string; onClose?: () => void }) {
  const [state, setState] = useState<State>("idle");
  // Several booking forms can exist at once (modal + morphing dialogs), so ids must be unique
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;
  const [error, setError] = useState("");
  // When online delivery isn't available: the same request, ready to send on WhatsApp or by email
  const [fallback, setFallback] = useState<{ whatsapp: string; mailto: string } | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    setFallback(null);
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.fallback) {
        const text = [
          "Hello MonaCare, I'd like to book a consultation.",
          `Name: ${data.name}`,
          `Email: ${data.email}`,
          data.phone && `Phone: ${data.phone}`,
          data.organisation && `Organisation: ${data.organisation}`,
          data.interest && `Area of interest: ${data.interest}`,
          data.message,
        ]
          .filter(Boolean)
          .join("\n");
        setFallback({
          whatsapp: `${site.whatsapp}?text=${encodeURIComponent(text)}`,
          mailto: `mailto:${site.email}?subject=${encodeURIComponent("Consultation request")}&body=${encodeURIComponent(text)}`,
        });
      }
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
          <label htmlFor={fid("name")} className={label}>Full name</label>
          <input id={fid("name")} name="name" required autoComplete="name" autoFocus className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor={fid("email")} className={label}>Email</label>
          <input id={fid("email")} name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={fid("phone")} className={label}>
            Phone <span className="font-[family-name:var(--font-body)] font-normal">(optional)</span>
          </label>
          <input id={fid("phone")} name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div className="grid gap-2">
          <label htmlFor={fid("organisation")} className={label}>
            Organisation <span className="font-[family-name:var(--font-body)] font-normal">(optional)</span>
          </label>
          <input id={fid("organisation")} name="organisation" autoComplete="organization" className={field} />
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <label htmlFor={fid("interest")} className={label}>Area of interest</label>
          <div className="relative">
            <select id={fid("interest")} name="interest" defaultValue={interest} required className={`${field} appearance-none pr-10`}>
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
        <label htmlFor={fid("message")} className={label}>
          About your organisation <span className="font-[family-name:var(--font-body)] font-normal">(optional)</span>
        </label>
        <textarea id={fid("message")} name="message" rows={3} className={`${field} resize-y`} />
      </div>
      {/* honeypot */}
      <input type="text" name="company_site" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {state === "error" && (
        <div className="rounded-[8px] border border-teal bg-white px-4 py-3 text-teal" role="alert">
          <p>{error}</p>
          {fallback && (
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={fallback.whatsapp} target="_blank" rel="noopener noreferrer" className="btn gap-2 bg-teal text-offwhite hover:bg-teal-80">
                <WhatsappLogo size={20} aria-hidden /> Send on WhatsApp
              </a>
              <a href={fallback.mailto} className="btn gap-2 border border-teal text-teal hover:bg-teal-10">
                <EnvelopeSimple size={20} aria-hidden /> Send by email
              </a>
            </div>
          )}
        </div>
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
