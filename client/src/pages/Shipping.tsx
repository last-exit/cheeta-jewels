/**
 * SHIPPING & DELIVERY
 */
import LegalPage, { Section, List } from "@/components/LegalPage";

export default function Shipping() {
  return (
    <LegalPage
      eyebrow="Service · 01"
      title="Shipping & Delivery"
      intro="Each piece is hand-finished in the Dubai atelier and travels in the signature leopard-print velvet case. Insured, signed-for, and tracked from departure to your door."
    >
      <Section no="01" title="Worldwide insured shipping">
        <p>
          Every order ships via a fully insured courier service. A signature
          is required on delivery. Tracking is shared by email and, where
          available, by SMS on the day of dispatch.
        </p>
      </Section>

      <Section no="02" title="Lead times">
        <List
          items={[
            {
              lead: "In-stock Atelier Editions:",
              rest: "3–5 business days to dispatch, then 2–4 business days in transit (GCC) or 4–6 business days (international).",
            },
            {
              lead: "Numbered edition 004—100:",
              rest: "Each piece is finished to order. Allow 4–6 weeks for hand-finishing before dispatch.",
            },
            {
              lead: "By-Appointment pieces:",
              rest: "Hand-delivered to the viewing salon or shipped after a confirmed private appointment. Lead time confirmed in your appointment letter.",
            },
            {
              lead: "Custom commissions:",
              rest: "Quoted individually. Typically 8–12 weeks from approved specification.",
            },
          ]}
        />
      </Section>

      <Section no="03" title="Regions & duties">
        <p>
          We ship to 64 countries. For shipments outside the UAE, duties and
          import taxes are calculated and collected at checkout where
          supported. Where we are unable to pre-calculate, the courier will
          invoice you on delivery.
        </p>
        <p>
          We are unable to ship to post office boxes or freight-forwarding
          addresses for first-time orders. Existing clients may opt in to
          forwarding by written request.
        </p>
      </Section>

      <Section no="04" title="Packaging">
        <p>
          Every piece arrives in the house's signature leopard-print velvet
          case with a hand-stamped leather card, certificate of
          authenticity, microfibre cloth, and care guide. Gift wrapping is
          not offered — the case is the wrapping.
        </p>
      </Section>
    </LegalPage>
  );
}
