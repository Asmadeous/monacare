import Link from "next/link";
import { site } from "@/content/site";
import { wrap } from "./ui";

/** Logo, line and contact. Pages and programmes live in the menu, so the footer doesn't repeat them. */
export default function Footer() {
  return (
    <footer className="on-teal bg-teal pt-14 text-offwhite md:pt-16">
      <div className={wrap}>
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-x-6">
          <div className="md:col-span-6">
            <Link href="/" aria-label="MonaCare home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/lockup-reversed.svg" alt="MonaCare" className="h-20 w-auto md:h-24" />
            </Link>
            <p className="mt-6 max-w-sm">{site.tagline}</p>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
            <p className="type-label">Contact</p>
            <a href={`mailto:${site.email}`} className="link mt-1 inline-flex min-h-11 items-center text-[1.125rem]">
              {site.email}
            </a>
          </div>
        </div>
        <div className="type-caption mt-12 flex flex-col justify-between gap-3 border-t border-offwhite/25 py-6 md:mt-14 md:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>{site.proposition}</p>
        </div>
      </div>
    </footer>
  );
}
