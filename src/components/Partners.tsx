import { Bank, Buildings, Compass, HandHeart, House, UsersThree } from "@phosphor-icons/react/ssr";
import { serve } from "@/content/site";
import { wrap } from "./ui";
import { FadeInUp } from "./ui/appear";

const icons = {
  bank: Bank,
  house: House,
  compass: Compass,
  community: UsersThree,
  buildings: Buildings,
  hands: HandHeart,
} as const;

/**
 * Who we serve, set like lpas.com's "Latest updates" list: a heading, then plain full-width rows divided
 * by hairlines, each ending in a circle (the line icon sits in it, always paired with its text label,
 * guidelines p.23). Rows fade up 30px one after another (lpas fadeInUp, 100ms apart).
 */
export default function Partners() {
  return (
    <section id="partners" className="bg-offwhite py-24 md:py-32">
      <div className={`${wrap} grid gap-y-10 md:grid-cols-12 md:gap-x-6`}>
        <div className="md:col-span-4">
          <FadeInUp as="h2" className="type-h1 text-teal">
            {serve.title}
          </FadeInUp>
          <FadeInUp order={1} as="p" className="mt-6 max-w-[44ch] text-[1rem] leading-[1.625rem] text-teal">
            {serve.body}
          </FadeInUp>
        </div>
        <ul className="border-t border-teal-20 md:col-span-7 md:col-start-6">
          {serve.items.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <FadeInUp as="li" order={i} key={s.label} className="flex items-center justify-between gap-6 border-b border-teal-20 py-5">
                <span className="font-[family-name:var(--font-head)] text-[1.25rem] font-semibold leading-7 text-teal">{s.label}</span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-teal text-teal" aria-hidden>
                  <Icon size={22} weight="light" />
                </span>
              </FadeInUp>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
