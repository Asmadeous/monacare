import type { Metadata } from "next";
import { Blank, LegalPage } from "@/components/blocks/LegalPage";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Safeguarding", description: `${site.name}'s safeguarding statement.` };

export default function SafeguardingPage() {
  return (
    <LegalPage
      title="Safeguarding"
      intro={
        <p>
          {site.legalName}, trading as {site.name}, believes everyone has the right to be safe from harm, abuse and
          neglect. Safeguarding is part of everything we do.
        </p>
      }
      sections={[
        {
          heading: "Our commitment",
          body: (
            <ul>
              <li>We put the welfare of children, young people and adults at risk first.</li>
              <li>We follow the law and statutory guidance, including Working Together to Safeguard Children and the Care Act 2014.</li>
              <li>We make sure everyone who works with us understands their responsibilities and knows how to raise a concern.</li>
              <li>We work openly with local authorities, regulators and other agencies.</li>
            </ul>
          ),
        },
        {
          heading: "Who this covers",
          body: <p>This statement applies to everyone who works with or for {site.name}, including associates, trainers and volunteers, in person and online.</p>,
        },
        {
          heading: "Safe practice",
          body: (
            <ul>
              <li>Safer recruitment, including enhanced DBS checks where the role requires them.</li>
              <li>Regular safeguarding training, kept up to date.</li>
              <li>Clear rules on confidentiality, professional boundaries and online sessions.</li>
              <li>We review this statement and our policy at least once a year.</li>
            </ul>
          ),
        },
        {
          heading: "Our safeguarding lead",
          body: (
            <ul>
              <li>Designated safeguarding lead: <Blank /></li>
              <li>Contact: <Blank /></li>
            </ul>
          ),
        },
        {
          heading: "Raising a concern",
          body: (
            <>
              <p>If someone is in immediate danger, call 999.</p>
              <p>
                For any other concern about a child, young person or adult at risk, contact our safeguarding lead, or{" "}
                {site.email}, {site.phone}. You can also contact:
              </p>
              <ul>
                <li>the local authority children’s or adult social care team where the person lives;</li>
                <li>the NSPCC helpline, 0808 800 5000;</li>
                <li>Childline, for children and young people, 0800 1111.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "Our full policy",
          body: <p>Our full safeguarding policy is available on request. Last reviewed: <Blank /></p>,
        },
      ]}
    />
  );
}
