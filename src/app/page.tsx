import Image from "next/image";
import Link from "next/link";
import { Check } from "@phosphor-icons/react/ssr";
import { FrondField } from "@/components/Ornaments";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import { Label, Rule, ServiceIndex, wrap } from "@/components/ui";
import { about, consultation, donate, hero, images, services, site, welcome } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* ─── Hero: lead with light ─────────────────────── */}
      <section className="bg-offwhite pt-32 md:pt-44">
        <div className={`${wrap} grid items-center gap-y-14 md:grid-cols-12 md:gap-x-6`}>
          <div className="md:col-span-7 lg:col-span-6">
            <div className="rise" style={{ "--d": "60ms" } as React.CSSProperties}>
              <Label>{hero.label}</Label>
            </div>
            <h1 className="type-display rise mt-7 max-w-[13ch] text-teal" style={{ "--d": "140ms" } as React.CSSProperties}>
              {hero.title}
            </h1>
            <p className="rise mt-7 max-w-[42ch] text-teal" style={{ "--d": "240ms" } as React.CSSProperties}>
              {hero.sub}
            </p>
            <div className="rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-5" style={{ "--d": "340ms" } as React.CSSProperties}>
              <a href={site.cta.href} className="btn bg-teal text-offwhite hover:bg-teal-80">
                {site.cta.label}
              </a>
              <Link href={hero.secondary.href} className="link text-teal">
                {hero.secondary.label}
              </Link>
            </div>
          </div>

          {/* Circle frame: the circle that holds the symbol, for hero moments */}
          <div className="md:col-span-5 lg:col-start-8">
            <div
              className="settle relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-full"
              style={{ "--d": "200ms" } as React.CSSProperties}
            >
              <Image src={images.hero} alt={hero.imageAlt} fill priority sizes="(min-width: 768px) 40vw, 90vw" className="object-cover object-[55%_50%]" />
            </div>
          </div>
        </div>

        {/* Four ways in, set like the contents page of a printed guide */}
        <div className={`${wrap} mt-20 md:mt-28`}>
          <ul className="grid border-t border-teal sm:grid-cols-2 lg:grid-cols-4">
            {hero.index.map((c, i) => (
              <li
                key={c.title}
                className={`border-b border-teal-20 py-8 sm:pr-8 lg:border-b-0 lg:py-10 ${i > 0 ? "lg:border-l lg:border-teal-20 lg:pl-8" : ""} ${i % 2 ? "sm:border-l sm:border-teal-20 sm:pl-8" : ""}`}
              >
                <h2 className="font-[family-name:var(--font-head)] text-[1.375rem] font-semibold leading-8">
                  <Link href={c.href} className="link text-teal decoration-teal-40 hover:decoration-teal">
                    {c.title}
                  </Link>
                </h2>
                <p className="mt-3 text-[1rem] leading-[1.625rem] text-teal">{c.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-20 md:h-28" />
      </section>

      {/* ─── Welcome: lead with teal, frond field cropped at the edge ─── */}
      <section className="on-teal relative overflow-hidden bg-teal text-offwhite">
        <FrondField className="pointer-events-none absolute -right-24 top-0 h-full w-[34rem] text-offwhite opacity-[0.14] md:-right-10 md:w-[44rem]" />
        <div className={`${wrap} relative py-24 md:py-32`}>
          <span className="gold-thread" />
          <p className="type-h1 mt-8 max-w-[26ch] font-normal">{welcome}</p>
        </div>
      </section>

      {/* ─── About ─────────────────────────────────────── */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className={`${wrap} grid items-center gap-y-12 md:grid-cols-12 md:gap-x-6`}>
          {/* Arc corner: one rounded corner, top right only, radius half the frame height */}
          <div className="relative aspect-[5/4] overflow-hidden rounded-tr-[40%_50%] md:col-span-6">
            <Image src={images.about} alt={about.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <h2 className="type-h1 text-teal">{about.title}</h2>
            <p className="type-h2 mt-8 font-normal text-teal">{about.lede}</p>
            <p className="mt-10">
              <Link href="/about" className="link text-teal">
                More about MonaCare
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ─── Programmes ────────────────────────────────── */}
      <section className="bg-offwhite pb-24 md:pb-24">
        <Rule className="mb-16 md:mb-24" />
        <div className={wrap}>
          <h2 className="type-h1 max-w-3xl text-teal">{services.title}</h2>
          <p className="mt-6 max-w-[60ch] text-teal">{services.intro}</p>
          <div className="mt-14 md:mt-20">
            <ServiceIndex />
          </div>
        </div>
      </section>

      <Partners />

      <Testimonials />

      {/* ─── Consultation: the form itself opens in the booking modal ─── */}
      <section id="consultation" className="bg-offwhite py-24 md:py-32">
        <div className={`${wrap} grid items-start gap-y-12 lg:grid-cols-12 lg:gap-x-6`}>
          <div className="lg:col-span-6">
            <Label>{consultation.label}</Label>
            <h2 className="type-h1 mt-6 max-w-[16ch] text-teal">{consultation.title}</h2>
            <p className="mt-6 max-w-[48ch] text-teal">{consultation.intro}</p>
            <a href={site.cta.href} className="btn mt-10 bg-teal text-offwhite hover:bg-teal-80">
              {site.cta.label}
            </a>
          </div>
          <ul className="border-t border-teal lg:col-span-5 lg:col-start-8">
            {consultation.includes.map((c) => (
              <li key={c} className="flex gap-4 border-b border-teal-20 py-5 text-teal">
                <Check size={22} weight="regular" className="mt-[3px] shrink-0" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Donate ────────────────────────────────────── */}
      <section id="donate" className="bg-offwhite pb-16 md:pb-20">
        <Rule className="mb-16 md:mb-24" />
        <div className={`${wrap} grid items-end gap-y-10 md:grid-cols-12 md:gap-x-6`}>
          <div className="md:col-span-8">
            <span className="gold-thread" />
            <h2 className="type-h1 mt-6 text-teal">{donate.title}</h2>
            <p className="mt-5 max-w-[60ch] text-teal">{donate.body}</p>
          </div>
          <div className="md:col-span-3 md:col-start-10 md:justify-self-end">
            <a href={donate.href} className="btn bg-teal text-offwhite hover:bg-teal-80">
              {donate.cta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
