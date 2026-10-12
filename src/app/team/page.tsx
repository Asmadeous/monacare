import type { Metadata } from "next";
import Image from "next/image";
import { Label, PageHeader, wrap } from "@/components/ui";
import { site, team } from "@/content/site";

export const metadata: Metadata = {
  title: "Team",
  description: team.lede,
};

export default function TeamPage() {
  const [lead, ...others] = team.members;

  return (
    <>
      <PageHeader label={team.label} title={team.title} lede={team.lede} />

      {/* ─── Lead ──────────────────────────────────────── */}
      <section id="founder" className="bg-offwhite pb-16 pt-24 md:pb-20 md:pt-32">
        <div className={`${wrap} grid gap-y-12 md:grid-cols-12 md:gap-x-6`}>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden md:sticky md:top-32">
              <Image src={lead.image} alt={lead.imageAlt} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover object-top" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7 md:pt-6">
            <Label>{lead.role}</Label>
            <h2 className="type-display mt-7 text-teal">{lead.name}</h2>
            <p className="type-h2 mt-3 font-normal text-teal">{lead.title}</p>
            <div className="mt-10 max-w-[60ch] space-y-6 text-teal">
              {lead.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            {lead.roles.length > 0 && (
              <dl className="mt-12 border-t border-teal">
                {lead.roles.map((r) => (
                  <div key={r.org} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-teal-20 py-5">
                    <dt className="font-[family-name:var(--font-head)] text-[1.25rem] font-semibold text-teal">{r.title}</dt>
                    <dd className="text-teal">{r.org}</dd>
                  </div>
                ))}
              </dl>
            )}
            <a href={site.cta.href} className="btn mt-12 bg-teal text-offwhite hover:bg-teal-80">
              Book a consultation with {lead.name.split(" ")[0]}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Everyone else: renders once more people are added to team.members ─── */}
      {others.length > 0 && (
        <section className="bg-offwhite pb-16 md:pb-20">
          <div className={wrap}>
            <div className="h-px bg-teal-20" />
            <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
              {others.map((m) => (
                <li key={m.name}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={m.image} alt={m.imageAlt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover object-top" />
                  </div>
                  <h3 className="type-h2 mt-6 text-teal">{m.name}</h3>
                  <p className="type-caption mt-1 text-teal">{m.role}</p>
                  <p className="mt-4 max-w-[48ch] text-teal">{m.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
