import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, wrap } from "@/components/ui";
import { services, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: services.intro,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader label={services.label} title={services.title} lede={services.intro} />

      {/* ─── Five programmes, one layout. Numbered, never colour-coded. ─── */}
      <section className="bg-offwhite pb-16 pt-24 md:pb-20 md:pt-32">
        <div className={wrap}>
          <ol className="border-t border-teal">
            {services.items.map((s, i) => (
              <li
                key={s.slug}
                id={s.slug}
                className="grid items-center gap-x-6 gap-y-8 border-b border-teal-20 py-12 md:grid-cols-12 md:py-16"
              >
                <div className="md:col-span-6 lg:col-span-6">
                  <p className="type-label text-teal">Programme {String(i + 1).padStart(2, "0")}</p>
                  <h2 className="type-h1 mt-4 text-teal">{s.title}</h2>
                  <p className="mt-6 max-w-[56ch] text-teal">{s.body}</p>
                  <p className="mt-8">
                    <a href={site.cta.href} data-programme={s.title} className="link text-teal">
                      Ask about this programme
                    </a>
                  </p>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden max-md:row-start-1 md:col-span-5 md:col-start-8">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    priority={i === 0}
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
