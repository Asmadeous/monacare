/**
 * Two photos and a quote, after lpas.com's BlockMediaDoubleQuote (no script; global photo reveal and
 * fade-up): a large photo on the left with a caption under it, a small photo at the top right, and the
 * quote at the bottom right, level with the foot of the large photo.
 */
import { wrap } from "../ui";
import { FadeInUp, ImageAppear } from "../ui/appear";

export function MediaDoubleQuote({
  big,
  small,
  quote,
  cite,
}: {
  big: { src: string; alt: string; caption?: string };
  small: { src: string; alt: string; caption?: string };
  quote: string;
  cite?: string;
}) {
  return (
    <section className="my-24 bg-offwhite md:my-32">
      <div className={`${wrap} grid gap-y-10 md:grid-cols-12 md:gap-x-6`}>
        <figure className="md:col-span-6 md:row-span-2">
          <ImageAppear src={big.src} alt={big.alt} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/5] rounded-tr-[40%_50%]" />
          {big.caption && <figcaption className="type-caption mt-3 text-teal">{big.caption}</figcaption>}
        </figure>
        <figure className="md:col-span-4 md:col-start-9">
          <ImageAppear src={small.src} alt={small.alt} order={1} sizes="(min-width: 768px) 30vw, 60vw" className="aspect-[4/3]" />
          {small.caption && <figcaption className="type-caption mt-3 text-teal">{small.caption}</figcaption>}
        </figure>
        <FadeInUp as="div" className="self-end md:col-span-4 md:col-start-9">
          <blockquote className="type-h2 font-normal text-teal">
            <span className="gold-thread mb-6" aria-hidden />
            {quote}
          </blockquote>
          {cite && <p className="type-label mt-6 text-teal">{cite}</p>}
        </FadeInUp>
      </div>
    </section>
  );
}
