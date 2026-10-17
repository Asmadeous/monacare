/**
 * Statement, after lpas.com's intro block (blockIntroGeneral): a short run of values in large type on
 * the page colour, a small line beside it ("Listen. Plan. Analyze. Shape." on lpas; MonaCare's
 * proposition here), then a paragraph and a link. Every part fades up 30px (lpas fadeInUp).
 */
import Link from "next/link";
import { wrap } from "../ui";
import { FadeInUp } from "../ui/appear";

export function Statement({
  title,
  aside,
  body,
  link,
  facts,
}: {
  title: string;
  aside?: string;
  body: string;
  link: { label: string; href: string };
  facts?: { value: number; suffix: string; label: string }[];
}) {
  return (
    <section className="bg-offwhite py-24 md:py-36">
      <div className={`${wrap} grid gap-y-10 md:grid-cols-12 md:gap-x-6`}>
        <FadeInUp as="h2" className="type-display text-teal md:col-span-10">
          {title}
        </FadeInUp>
        {aside && (
          <FadeInUp order={1} as="p" className="type-caption text-teal md:col-span-3 md:mt-10">
            {aside}
          </FadeInUp>
        )}
        <div className="md:col-span-7 md:col-start-5 md:mt-10">
          <FadeInUp order={2} as="p" className="max-w-[62ch] text-teal">
            {body}
          </FadeInUp>
          {facts && (
            <FadeInUp order={3}>
              <dl className="mt-10 grid gap-y-5 border-t border-teal-20 pt-6 sm:grid-cols-3 sm:gap-x-6">
                {facts.map((f) => (
                  <div key={f.label} className="flex flex-col-reverse">
                    <dt className="type-caption mt-1 text-teal">{f.label}</dt>
                    <dd className="type-h1 text-teal">
                      {f.value}
                      {f.suffix}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeInUp>
          )}
          <FadeInUp order={4} className="mt-10">
            <Link href={link.href} className="group inline-flex min-h-11 items-center gap-3 text-teal">
              <span className="link">{link.label}</span>
              <span className="h-5 w-5 rounded-full border border-teal transition-colors group-hover:bg-teal" aria-hidden />
            </Link>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
