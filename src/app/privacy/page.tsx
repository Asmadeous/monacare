import type { Metadata } from "next";
import { Blank, LegalPage } from "@/components/blocks/LegalPage";
import { company, site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy policy", description: `How ${site.name} collects and uses personal information.` };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={
        <p>
          This policy explains how {site.legalName}, trading as {site.name}, collects, uses and protects your personal
          information when you use this website or book a consultation.
        </p>
      }
      sections={[
        {
          heading: "Who we are",
          body: (
            <>
              <p>
                {site.legalName} (trading as {site.name}) is the controller of your personal information under the UK
                General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
              </p>
              <ul>
                <li>Company number: <Blank value={company.number} /></li>
                <li>Registered office: <Blank value={company.registeredOffice} /></li>
                <li>ICO registration number: <Blank value={company.icoNumber} /></li>
                <li>Privacy contact: <Blank value={company.privacyContact} />, <Blank value={company.privacyEmail} /></li>
              </ul>
            </>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <>
              <p>When you book a consultation or contact us, we collect what you give us, such as:</p>
              <ul>
                <li>your name, email address and phone number;</li>
                <li>your organisation and role, if you share them;</li>
                <li>the programme you’re interested in and anything you tell us in your message.</li>
              </ul>
              <p>Please don’t send us sensitive details about the people you care for through the website.</p>
            </>
          ),
        },
        {
          heading: "How we use it and why",
          body: (
            <ul>
              <li>To reply to you and arrange your consultation: taking steps at your request before a contract.</li>
              <li>To deliver programmes and issue certificates: performing our contract with you.</li>
              <li>To keep records we’re required to keep, such as accounts: legal obligation.</li>
              <li>To run and improve our service: our legitimate interests, balanced against your rights.</li>
            </ul>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <>
              <p>We don’t sell your information. We share it only with providers who help us run the service, under contract:</p>
              <ul>
                <li>Vercel, which hosts this website;</li>
                <li>our email provider, which delivers your messages to us;</li>
                <li>image delivery services that serve the photos on this site.</li>
              </ul>
              <p>Some providers may process data outside the UK; where they do, appropriate safeguards are in place.</p>
            </>
          ),
        },
        {
          heading: "Cookies",
          body: <p>This website does not use advertising or tracking cookies. Only what’s needed for the site to work is stored.</p>,
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep enquiries for <Blank /> and client records for <Blank />, then delete them securely, unless the law
              requires us to keep them longer.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <>
              <p>
                You can ask to see, correct or delete your information, to restrict or object to how we use it, or to
                receive a copy to take elsewhere. Contact {company.privacyContact} at <Blank value={company.privacyEmail} />{" "}
                or {site.email}. We’ll reply within one month.
              </p>
              <p>
                If you’re unhappy with how we handle your information, you can complain to the Information
                Commissioner’s Office at ico.org.uk or on 0303 123 1113.
              </p>
            </>
          ),
        },
        {
          heading: "Changes",
          body: <p>We’ll post any changes to this policy on this page. Last updated: <Blank /></p>,
        },
      ]}
    />
  );
}
