import type { Metadata } from "next";
import { Blank, LegalPage } from "@/components/blocks/LegalPage";
import { company, consultation, site } from "@/content/site";

export const metadata: Metadata = { title: "Terms", description: `Terms for using the ${site.name} website and booking with us.` };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      intro={
        <p>
          These terms apply when you use this website or book a consultation or programme with {site.legalName}, trading
          as {site.name}.
        </p>
      }
      sections={[
        {
          heading: "About us",
          body: (
            <ul>
              <li>{site.legalName}, trading as {site.name}</li>
              <li>Company number: <Blank value={company.number} /></li>
              <li>Registered office: <Blank value={company.registeredOffice} /></li>
              <li>Contact: {site.email}, {site.phone}, {site.hours}</li>
            </ul>
          ),
        },
        {
          heading: "Using this website",
          body: (
            <p>
              The content on this site is general information, not professional advice for your situation. We work to keep
              it accurate but can’t guarantee it is complete or up to date. Don’t misuse the site or try to access it
              without permission.
            </p>
          ),
        },
        {
          heading: "Consultations",
          body: (
            <>
              <p>
                A consultation is 60 minutes with a specialist, {consultation.delivery.toLowerCase()}, and costs{" "}
                {consultation.price}.
              </p>
              <ul>
                <li>Payment: <Blank /></li>
                <li>Cancelling or rescheduling: <Blank /></li>
                <li>Refunds: <Blank /></li>
              </ul>
            </>
          ),
        },
        {
          heading: "Programmes",
          body: (
            <>
              <p>Prices for programmes are given on request and confirmed in writing before you book.</p>
              <ul>
                <li>Booking and payment: <Blank /></li>
                <li>Cancellations and transfers: <Blank /></li>
                <li>Certificates and CPD: <Blank /></li>
              </ul>
            </>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              Nothing in these terms affects your statutory rights, including your right to cancel a service contract made
              at a distance within 14 days, as set out in the Consumer Contracts Regulations 2013.
            </p>
          ),
        },
        {
          heading: "Our responsibility",
          body: (
            <p>
              We’re responsible for loss you suffer that is a foreseeable result of our breaking these terms or failing to
              use reasonable care. We don’t exclude liability where it would be unlawful to do so.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: <p>Course materials and the content of this site belong to {site.legalName} or its licensors. Please don’t copy or share them without permission.</p>,
        },
        {
          heading: "Law",
          body: <p>These terms are governed by the law of England and Wales, and the courts of England and Wales have jurisdiction. Last updated: <Blank /></p>,
        },
      ]}
    />
  );
}
