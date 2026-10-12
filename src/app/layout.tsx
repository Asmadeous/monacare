import type { Metadata, Viewport } from "next";
import "@fontsource-variable/nunito-sans/wght.css";
import "@fontsource-variable/jost/wght.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import Intro from "@/components/Intro";
import { introBootScript } from "@/components/introBoot";

export const metadata: Metadata = {
  metadataBase: new URL("https://monacare.co.uk"),
  title: {
    default: "MonaCare | Excellence in care, expertise in compliance",
    template: "%s | MonaCare",
  },
  description:
    "MonaCare guides care organisations through Ofsted and CQC compliance while embedding trauma-informed approaches and cultural competence into care delivery.",
  openGraph: {
    title: "MonaCare | Excellence in care, expertise in compliance",
    description:
      "Ofsted and CQC consultancy, trauma-informed practice and cultural competence training for social care.",
    url: "https://monacare.co.uk",
    siteName: "MonaCare",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf5df",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // data-intro is set before first paint by the boot script, so React must not flag it as a mismatch
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      <body>
        <a
          href="#main"
          className="btn sr-only bg-teal text-offwhite focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <BookingModal />
        <Intro />
      </body>
    </html>
  );
}
