"use client";

/**
 * Inner-page header, after lpas.com's BlockHeaderGeneral (measured at 1440×900): 80% of the screen tall,
 * split in two. Left, on a light field: a small photo with one cut corner (20px) and a caption at the
 * top, a short intro paragraph lower right, and the page name very large at the bottom left with a
 * circle button that scrolls on. Right: one photo, full height. lpas uses no script here, only its
 * global fade-up and photo reveal. lpas's light grey field is Deep Teal here, the brand's lead colour,
 * with Off-White text (guidelines: approved text pair).
 */
import Image from "next/image";
import { ArrowDown } from "@phosphor-icons/react";
import { FadeInUp, ImageAppear } from "../ui/appear";

export function HeaderGeneral({
  title,
  intro,
  highlight,
  image,
  imageAlt,
  imagePosition = "50% 50%",
}: {
  title: string;
  intro: string;
  highlight?: { image: string; alt: string; caption: string };
  image: string;
  imageAlt: string;
  imagePosition?: string; // where to keep the photo's subject when it is cropped
}) {
  return (
    <section className="on-teal grid bg-teal text-offwhite md:h-[80vh] md:min-h-[40rem] md:grid-cols-2">
      <div className="flex flex-col px-5 pb-10 pt-28 md:px-10 md:pb-12 md:pt-32 xl:pl-[max(5rem,calc((100vw-1920px)/2+5rem))]">
        {highlight && (
        <FadeInUp className="w-[15rem] md:w-[17.5rem]">
          <div className="relative aspect-[190/119] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">
            <Image src={highlight.image} alt={highlight.alt} fill sizes="280px" className="object-cover" />
          </div>
          <p className="type-caption mt-3">{highlight.caption}</p>
        </FadeInUp>
        )}
        <FadeInUp order={1} as="p" className="mt-10 max-w-[24rem] self-end text-[1.125rem] leading-[1.75rem] md:mt-auto">
          {intro}
        </FadeInUp>
        <div className="mt-10 flex items-end justify-between gap-6 md:mt-16">
          <FadeInUp order={2} as="h1" className="font-[family-name:var(--font-head)] text-[3.5rem] font-semibold leading-[1] tracking-[-0.02em] md:text-[5.5rem]">
            {title}
          </FadeInUp>
          <FadeInUp order={3}>
            <button
              type="button"
              aria-label="Scroll to the content"
              onClick={() => window.scrollBy({ top: window.innerHeight * 0.6, behavior: "smooth" })}
              className="grid h-12 w-12 place-items-center rounded-full border border-offwhite transition-colors hover:bg-offwhite hover:text-teal"
            >
              <ArrowDown size={18} aria-hidden />
            </button>
          </FadeInUp>
        </div>
      </div>
      <ImageAppear
        src={image}
        alt={imageAlt}
        priority
        parallax={false}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="aspect-[4/3] md:aspect-auto md:h-full"
        imageStyle={{ objectPosition: imagePosition }}
      />
    </section>
  );
}
