import Link from "next/link";
import { FrondField } from "./Ornaments";
import { services } from "@/content/site";

export const wrap = "mx-auto max-w-[1440px] px-5 md:px-10 xl:px-20";

/** Hairline between consecutive Off-White sections, so each break reads as deliberate. */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={wrap} aria-hidden>
      <div className={`h-px bg-teal-20 ${className}`} />
    </div>
  );
}

export function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`type-label flex items-center gap-4 ${light ? "text-offwhite" : "text-teal"}`}>
      <span className="gold-thread w-10" />
      {children}
    </p>
  );
}

/** Inner-page opener: Deep Teal, frond field cropped at the edge, like the guidelines' section openers. */
export function PageHeader({
  label,
  title,
  lede,
  back,
}: {
  label: string;
  title: string;
  lede?: string;
  back?: { label: string; href: string };
}) {
  return (
    <section className="on-teal relative overflow-hidden bg-teal pt-36 text-offwhite md:pt-48">
      <FrondField className="pointer-events-none absolute -right-28 top-0 h-full w-[30rem] text-offwhite opacity-[0.14] md:right-0 md:w-[40rem]" />
      <div className={`${wrap} relative pb-20 md:pb-28`}>
        {back && (
          <p className="type-caption mb-10">
            <Link href={back.href} className="link">
              {back.label}
            </Link>
          </p>
        )}
        <Label light>{label}</Label>
        <h1 className="type-display mt-7 max-w-[18ch]">{title}</h1>
        {lede && <p className="mt-7 max-w-[52ch] text-[1.25rem] leading-8">{lede}</p>}
      </div>
    </section>
  );
}

/** Numbered programme index. Programmes are numbered, never colour-coded. */
export function ServiceIndex() {
  const items = services.items;
  return (
    <ol className="border-t border-teal">
      {items.map((s) => {
        const n = services.items.findIndex((x) => x.slug === s.slug) + 1;
        return (
          <li key={s.slug} className="border-b border-teal-20">
            <Link
              href={`/services#${s.slug}`}
              className="group grid gap-x-6 gap-y-3 py-9 md:grid-cols-12 md:py-11"
            >
              <span className="type-h2 text-teal md:col-span-1">{String(n).padStart(2, "0")}</span>
              <span className="type-h2 text-teal decoration-gold decoration-2 underline-offset-[0.25em] group-hover:underline md:col-span-5 md:pr-8">
                {s.title}
              </span>
              <span className="max-w-[56ch] text-teal md:col-span-5">{s.short}</span>
              <span className="type-caption hidden self-center justify-self-end text-teal underline underline-offset-[0.3em] md:col-span-1 md:block">
                Read
              </span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
