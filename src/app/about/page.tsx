import type { Metadata } from "next";
import Link from "next/link";
import { GeneralCta } from "@/components/blocks/GeneralCta";
import { HeaderGeneral } from "@/components/blocks/HeaderGeneral";
import { IntroDouble } from "@/components/blocks/IntroDouble";
import { MediaDoubleQuote } from "@/components/blocks/MediaDoubleQuote";
import { wrap } from "@/components/ui";
import { FadeInUp } from "@/components/ui/appear";
import { about, culture, images, site, team } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: about.lede,
};

// Built like lpas.com's About page: header, two-tab intro, photos with a quote, a list, a closing action
export default function AboutPage() {
  return (
    <>
      <HeaderGeneral
        title="About"
        intro={about.purpose}
        image={images.about}
        imageAlt={about.imageAlt}
        imagePosition="60% 50%"
      />

      <IntroDouble
        tabs={["About us", "Mission and vision"]}
        statement={about.lede}
        text={about.body}
        details={
          <div className="grid gap-y-12 pb-2 md:grid-cols-2 md:gap-x-16">
            <div className="border-t border-teal pt-6">
              <h2 className="type-label text-teal">Our mission</h2>
              <p className="type-h2 mt-5 font-normal text-teal">{about.mission}</p>
            </div>
            <div className="border-t border-teal pt-6">
              <h2 className="type-label text-teal">Our vision</h2>
              <p className="type-h2 mt-5 font-normal text-teal">{about.vision}</p>
            </div>
          </div>
        }
      />

      <MediaDoubleQuote
        big={{ src: images.culture, alt: culture.imageAlt, caption: culture.title }}
        small={{ src: images.children, alt: "A carer and a young person sharing a moment at a desk by the window" }}
        quote={culture.body}
        cite={site.proposition}
      />

      {/* Values: plain rows, like lpas.com's lists */}
      <section className="my-24 bg-offwhite md:my-32">
        <div className={wrap}>
          <FadeInUp as="p" className="type-label border-b border-teal-20 pb-4 text-teal">
            What we value
          </FadeInUp>
          <ul>
            {about.values.map((v, i) => (
              <FadeInUp as="li" order={i} key={v.title} className="grid gap-y-3 border-b border-teal-20 py-7 text-teal md:grid-cols-12 md:gap-x-6">
                <h3 className="type-h2 md:col-span-3">{v.title}</h3>
                <p className="md:col-span-4">{v.body}</p>
                <p className="text-[1rem] leading-[1.625rem] md:col-span-4 md:col-start-9">
                  <span className="type-label mb-2 block">In practice</span>
                  {v.practice}
                </p>
              </FadeInUp>
            ))}
          </ul>
        </div>
      </section>

      <GeneralCta
        text={team.title}
        action={
          <Link href="/team" className="btn bg-teal text-offwhite hover:bg-teal-80">
            Meet the team
          </Link>
        }
      />
    </>
  );
}
