/**
 * CONTACT & CONCIERGE
 */
import LegalPage, { Section, List } from "@/components/LegalPage";

export default function Contact() {
  return (
    <LegalPage
      eyebrow="Concierge"
      title="Contact"
      intro="One inbox, one number, one concierge. We answer in English, Arabic, and French."
    >
      <Section no="01" title="Concierge inbox">
        <p>
          For appointments, commissions, authentication checks, press
          enquiries, and anything that does not fit a normal retail
          question:
        </p>
        <p className="text-lg">
          <a
            href="mailto:concierge@cheetahjewelz.com"
            className="text-[#6B1A2C] underline-offset-4 hover:underline font-serif"
          >
            concierge@cheetahjewelz.com
          </a>
        </p>
        <p>
          We respond within 1 business day. For time-sensitive viewing
          requests, mark the subject{" "}
          <em className="not-italic font-medium text-[#1A1410]">URGENT</em>
          {" "}
          and we will pick it up faster.
        </p>
      </Section>

      <Section no="02" title="Dubai atelier">
        <List
          items={[
            {
              lead: "Address:",
              rest: "Cheetah Jewelz Atelier, Al Quoz Creative Zone, Dubai, United Arab Emirates.",
            },
            {
              lead: "Hours:",
              rest: "Saturday — Thursday, 10:00 — 18:00 GST. Closed Friday.",
            },
            {
              lead: "By appointment only:",
              rest: "Walk-ins are not accepted. Use the concierge inbox to arrange a viewing.",
            },
          ]}
        />
      </Section>

      <Section no="03" title="Press & partnerships">
        <p>
          Editorial and press:{" "}
          <a
            href="mailto:press@cheetahjewelz.com"
            className="text-[#6B1A2C] underline-offset-4 hover:underline"
          >
            press@cheetahjewelz.com
          </a>
          . Stockist and partnership enquiries:{" "}
          <a
            href="mailto:partnerships@cheetahjewelz.com"
            className="text-[#6B1A2C] underline-offset-4 hover:underline"
          >
            partnerships@cheetahjewelz.com
          </a>
          . We answer press within 2 business days.
        </p>
      </Section>
    </LegalPage>
  );
}
