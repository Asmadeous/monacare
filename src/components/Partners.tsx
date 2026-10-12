import { Bank, Buildings, Compass, HandHeart, House, UsersThree } from "@phosphor-icons/react/ssr";
import { serve } from "@/content/site";
import { Rule, wrap } from "./ui";

const icons = {
  bank: Bank,
  house: House,
  compass: Compass,
  community: UsersThree,
  buildings: Buildings,
  hands: HandHeart,
} as const;

/** Who we serve: line icons, always paired with a text label (brand guidelines p.23). */
export default function Partners() {
  return (
    <section id="partners" className="bg-offwhite pb-24 md:pb-32">
      <Rule className="mb-16 md:mb-24" />
      <div className={wrap}>
        <h2 className="type-h1 max-w-3xl text-teal">{serve.title}</h2>
        <p className="mt-6 max-w-[60ch] text-teal">{serve.body}</p>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
          {serve.items.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li key={s.label} className="flex min-h-[11rem] flex-col justify-between gap-10 bg-white p-8 md:min-h-[13rem] md:p-10">
                <Icon size={44} weight="light" className="text-teal" aria-hidden />
                <span className="font-[family-name:var(--font-head)] text-[1.375rem] font-semibold leading-8 text-teal lg:text-[1.5rem]">
                  {s.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
