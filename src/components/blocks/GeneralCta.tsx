/**
 * Closing call to action, after lpas.com's GeneralCta ("Explore our job opportunities" + button): one
 * line of large text and a single action under it, with generous space around (10–12rem).
 */
import { wrap } from "../ui";
import { FadeInUp } from "../ui/appear";

export function GeneralCta({ text, action }: { text: string; action: React.ReactNode }) {
  return (
    <section className="my-24 bg-offwhite md:my-32">
      <div className={`${wrap} border-t border-teal-20 pt-16 md:pt-24`}>
        <FadeInUp as="p" className="type-h1 max-w-[22ch] text-teal">
          {text}
        </FadeInUp>
        <FadeInUp order={1} className="mt-8 md:mt-12">
          {action}
        </FadeInUp>
      </div>
    </section>
  );
}
