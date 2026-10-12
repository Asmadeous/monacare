import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeader, Rule, wrap } from "@/components/ui";
import { about, culture, images, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: about.lede,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader label={about.label} title={about.title} lede={about.lede} />

      {/* ─── Story ─────────────────────────────────────── */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className={`${wrap} grid items-center gap-y-12 md:grid-cols-12 md:gap-x-6`}>
          <div className="relative aspect-[5/4] overflow-hidden rounded-tr-[40%_50%] md:col-span-6">
            <Image src={images.about} alt={about.imageAlt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <p className="type-h2 font-normal text-teal">{about.purpose}</p>
            <p className="mt-8 max-w-[60ch] text-teal">{about.body}</p>
          </div>
        </div>
      </section>

      {/* ─── Mission and vision ────────────────────────── */}
      <section className="bg-offwhite pb-24 md:pb-24">
        <div className={`${wrap} grid gap-y-14 md:grid-cols-2 md:gap-x-16`}>
          <div className="border-t border-teal pt-8">
            <h2 className="type-label text-teal">Our mission</h2>
            <p className="type-h2 mt-6 font-normal text-teal">{about.mission}</p>
          </div>
          <div className="border-t border-teal pt-8">
            <h2 className="type-label text-teal">Our vision</h2>
            <p className="type-h2 mt-6 font-normal text-teal">{about.vision}</p>
          </div>
        </div>
        <div className={`${wrap} mt-16`}>
          <div className="on-teal flex flex-col justify-between gap-6 bg-teal px-8 py-10 text-offwhite md:flex-row md:items-center md:px-12">
            <p className="type-label">Our proposition</p>
            <p className="type-h1">{site.proposition}</p>
          </div>
        </div>
      </section>

      {/* ─── Values ────────────────────────────────────── */}
      <section className="bg-offwhite pb-24 md:pb-24">
        <Rule className="mb-16 md:mb-24" />
        <div className={wrap}>
          <h2 className="type-h1 text-teal">What we value</h2>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 lg:gap-6 xl:grid-cols-5">
            {about.values.map((v) => (
              <li key={v.title} className="flex flex-col bg-white p-8">
                <h3 className="type-h2 text-teal">{v.title}</h3>
                <span className="gold-thread mt-5 w-10" />
                <p className="mt-5 text-teal">{v.body}</p>
                <p className="type-label mt-auto pt-10 text-teal">In practice</p>
                <p className="type-caption mt-2 text-teal">{v.practice}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Culture: text on imagery, on a solid teal panel anchored to an edge ─── */}
      <section className="bg-offwhite pb-16 md:pb-20">
        <Rule className="mb-16 md:mb-24" />
        <div className={wrap}>
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-[16/7]">
            <Image src={images.culture} alt={culture.imageAlt} fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover object-[50%_30%]" />
          </div>
          <div className="on-teal relative bg-teal p-8 text-offwhite md:-mt-36 md:w-[min(36rem,52%)] md:p-12">
            <h2 className="type-h1">{culture.title}</h2>
            <p className="mt-6 max-w-[52ch]">{culture.body}</p>
            <p className="mt-8">
              <Link href="/services#cultural-competence" className="link">
                Cultural competence training
              </Link>
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
