import type { Metadata } from "next";
import BookButton from "@/components/BookButton";
import { GeneralCta } from "@/components/blocks/GeneralCta";
import { HeaderGeneral } from "@/components/blocks/HeaderGeneral";
import { IntroDouble } from "@/components/blocks/IntroDouble";
import { wrap } from "@/components/ui";
import { FadeInUp, ImageAppear } from "@/components/ui/appear";
import { consultation, facts, hero, images, services, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: services.intro,
};

// Built like lpas.com's market pages: header, two-tab intro, detail blocks, a closing action
export default function ServicesPage() {
  const n = services.items.length;
  return (
    <>
      <HeaderGeneral
        title="Services"
        intro={site.tagline}
        image={images.hero}
        imageAlt={hero.imageAlt}
      />

      <IntroDouble
        tabs={[services.label, "At a glance"]}
        statement={services.title}
        text={services.intro}
        details={
          <dl className="grid gap-y-8 border-t border-teal pt-6 sm:grid-cols-3 sm:gap-x-6">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="type-label mt-2 text-teal">{f.label}</dt>
                <dd className="type-display text-teal">
                  {f.value}
                  {f.suffix}
                </dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Each programme in full: photo with lpas's reveal and parallax, text fading up */}
      <section className="bg-offwhite">
        <ol className={wrap}>
          {services.items.map((s, i) => (
            <li
              key={s.slug}
              id={s.slug}
              className="grid scroll-mt-28 items-center gap-y-8 border-t border-teal-20 py-16 md:grid-cols-12 md:gap-x-6 md:py-24"
            >
              <ImageAppear
                src={s.image}
                alt={s.imageAlt}
                sizes="(min-width: 768px) 50vw, 100vw"
                className={`aspect-[4/3] rounded-tr-[40%_50%] md:col-span-6 ${i % 2 ? "md:order-2 md:col-start-7" : ""}`}
              />
              <div className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : "md:col-start-8"}`}>
                <FadeInUp as="p" className="type-label text-teal">
                  {i + 1} / {n}
                </FadeInUp>
                <FadeInUp order={1} as="h2" className="type-h1 mt-4 text-teal">
                  {s.title}
                </FadeInUp>
                <FadeInUp order={2} as="p" className="mt-6 max-w-[56ch] text-teal">
                  {s.body}
                </FadeInUp>
                <FadeInUp order={3}>
                  <dl className="mt-8 grid gap-x-6 border-t border-teal-20 text-[1rem] leading-[1.625rem] text-teal sm:grid-cols-[10rem_1fr]">
                    {[
                      ["Who it's for", s.audience],
                      ["Format", s.formats.join(", ")],
                      ["Typical length", s.length],
                      ...(s.sessions ? [["Sessions", s.sessions]] : []),
                      ...(s.dates ? [["Dates", s.dates]] : []),
                      ["Price", s.price],
                      ["You come away with", s.outcomes],
                    ].map(([k, v]) => (
                      <div key={k} className="contents">
                        <dt className="type-label border-b border-teal-20 pb-2 pt-3 sm:py-3">{k}</dt>
                        <dd className="border-b border-teal-20 pb-3 sm:pt-3">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </FadeInUp>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <GeneralCta text={consultation.intro} action={<BookButton>{site.cta.label}</BookButton>} />
    </>
  );
}
