/**
 * Legal pages: a Deep Teal title band, then numbered sections on the page colour. Drafts carry a notice
 * until the client approves them. A value the client hasn't given yet shows its label with a blank line.
 */
import { wrap } from "../ui";

export function Blank({ value }: { value?: string }) {
  return value ? <>{value}</> : <span className="inline-block min-w-[8rem] border-b border-current align-baseline">&nbsp;</span>;
}

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: React.ReactNode;
  sections: { heading: string; body: React.ReactNode }[];
}) {
  return (
    <>
      <section className="on-teal bg-teal pb-14 pt-32 text-offwhite md:pb-20 md:pt-40">
        <div className={wrap}>
          <p className="type-label">Draft for approval</p>
          <h1 className="type-display mt-5">{title}</h1>
          <div className="mt-8 max-w-[62ch]">{intro}</div>
        </div>
      </section>
      <section className="bg-offwhite py-16 text-teal md:py-24">
        <div className={`${wrap} grid md:grid-cols-12 md:gap-x-6`}>
          <ol className="md:col-span-8 md:col-start-3">
            {sections.map((s, i) => (
              <li key={s.heading} className="border-t border-teal-20 py-8 first:border-t-0 first:pt-0">
                <h2 className="type-h2 flex gap-4">
                  <span className="type-label pt-2">{String(i + 1).padStart(2, "0")}</span>
                  {s.heading}
                </h2>
                <div className="mt-4 max-w-[68ch] space-y-4 text-[1rem] leading-[1.625rem] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                  {s.body}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
