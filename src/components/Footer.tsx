import Link from "next/link";
import { donate, services, site } from "@/content/site";
import { wrap } from "./ui";

const linkCls = "decoration-gold underline-offset-[0.3em] hover:underline";

export default function Footer() {
  return (
    <footer className="on-teal bg-teal pt-14 text-offwhite md:pt-16">
      <div className={wrap}>
        <div className="grid gap-14 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-5">
            <Link href="/" aria-label="MonaCare home" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/lockup-reversed.svg" alt="MonaCare" className="h-20 w-auto md:h-24" />
            </Link>
            <p className="mt-6 max-w-sm">{site.tagline}</p>
          </div>
          <nav className="md:col-span-4 md:col-start-6" aria-label="Programmes">
            <p className="font-[family-name:var(--font-head)] font-semibold">Programmes</p>
            <ul className="mt-5 space-y-3">
              {services.items.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services#${s.slug}`} className={linkCls}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="font-[family-name:var(--font-head)] font-semibold">Work with us</p>
            <ul className="mt-5 space-y-3">
              <li><a href={site.cta.href} className={linkCls}>{site.cta.label}</a></li>
              <li><Link href="/#donate" className={linkCls}>{donate.cta}</Link></li>
            </ul>
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
