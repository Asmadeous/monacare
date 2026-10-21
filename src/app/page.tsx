import BookButton from "@/components/BookButton";
import Partners from "@/components/Partners";
import Testimonials from "@/components/Testimonials";
import { ConsultationTicket } from "@/components/home/ConsultationTicket";
import { HomeHero } from "@/components/home/HomeHero";
import { Statement } from "@/components/home/Statement";
import { WaysIn } from "@/components/home/WaysIn";
import { wrap } from "@/components/ui";
import { FadeInUp } from "@/components/ui/appear";
import { about, consultation, donate, facts, hero, heroVideo, services, site, welcome } from "@/content/site";

export default function Home() {
  return (
    <>
      {/* lpas.com hero: video behind, headline bottom left, programme panels travel in from the right */}
      <HomeHero
        label={hero.label}
        title={hero.title.replace(", ", ",\n")}
        sub={hero.sub}
        video={heroVideo.sources}
        poster={heroVideo.poster}
        programmes={services.items}
        tag={site.proposition}
        actions={<BookButton variant="light">{site.cta.label}</BookButton>}
      />

      {/* lpas.com intro block: values in large type, the proposition beside them */}
      <Statement
        title={about.values.map((v) => `${v.title}.`).join(" ")}
        body={welcome}
        facts={facts}
        link={{ label: "More about us", href: "/about" }}
      />

      {/* neutomni.com process cards: what drives MonaCare (programmes live in the hero and on Services) */}
      <WaysIn
        label="What drives us"
        title={about.title}
        items={[
          { title: "Our purpose", body: about.purpose },
          { title: "Our mission", body: about.mission },
          { title: "Our vision", body: about.vision },
          { title: "Our values", body: about.values.map((v) => v.title).join(", ") + "." },
        ]}
      />

      <Partners />

      <Testimonials />

      {/* neutomni.com ticket card */}
      <ConsultationTicket
        label={consultation.label}
        title={consultation.title}
        intro={consultation.intro}
        includes={consultation.includes}
        price={consultation.price}
        delivery={consultation.delivery}
        action={<BookButton variant="light">{site.cta.label}</BookButton>}
      />

      {/* Donate, set like the statement block */}
      <section id="donate" className="bg-offwhite pb-24 md:pb-32">
        <div className={`${wrap} grid items-end gap-y-8 border-t border-teal-20 pt-16 md:grid-cols-12 md:gap-x-6 md:pt-24`}>
          <div className="md:col-span-8">
            <FadeInUp as="p" className="type-label flex items-center gap-4 text-teal">
              <span className="gold-thread w-10" />
              {donate.label}
            </FadeInUp>
            <FadeInUp order={1} as="h2" className="type-h1 mt-6 text-teal">
              {donate.title}
            </FadeInUp>
            <FadeInUp order={2} as="p" className="mt-5 max-w-[60ch] text-teal">
              {donate.body}
            </FadeInUp>
          </div>
          <FadeInUp order={3} className="md:col-span-3 md:col-start-10 md:justify-self-end">
            <a href={donate.href} className="btn bg-teal text-offwhite hover:bg-teal-80">
              {donate.cta}
            </a>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
