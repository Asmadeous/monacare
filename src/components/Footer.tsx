import Link from "next/link";
import { site } from "@/content/site";
import { SocialLinks } from "./SocialLinks";
import { wrap } from "./ui";

const legal = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Safeguarding", href: "/safeguarding" },
];

/** Logo, contact and legal links. Pages and programmes live in the menu, so the footer doesn't repeat them. */
export default function Footer() {
  return (
    <footer className="on-teal bg-teal pt-14 text-offwhite md:pt-16">
      <div className={wrap}>
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-x-6">
          <div className="md:col-span-5">
            <Link href="/" aria-label="MonaCare home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/lockup-reversed.svg" alt="MonaCare" className="h-20 w-auto md:h-24" />
            </Link>
            <p className="mt-6 max-w-sm">{site.tagline}</p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
            <p className="type-label">Contact</p>
            <a href={`mailto:${site.email}`} className="link mt-1 flex min-h-11 items-center text-[1.125rem]">
              {site.email}
            </a>
            <a href={`tel:${site.phoneTel}`} className="link flex min-h-11 items-center text-[1.125rem]">
              {site.phone}
            </a>
            <p className="type-caption mt-1">Open {site.hours}</p>
            <SocialLinks className="mt-5" />
          </div>
        </div>
        <div className="type-caption mt-12 grid gap-4 border-t border-offwhite/25 py-6 md:mt-14 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-7">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>
          <nav aria-label="Legal" className="md:col-span-5 md:justify-self-end">
            <ul className="flex flex-wrap gap-x-6">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link inline-flex min-h-11 items-center">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
