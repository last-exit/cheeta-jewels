/**
 * RETURNS & EXCHANGE
 */
import LegalPage, { Section, List } from "@/components/LegalPage";

export default function Returns() {
  return (
    <LegalPage
      eyebrow="Service · 02"
      title="Returns & Exchange"
      intro="Numbered pieces are made to be kept. The policy below is designed to be fair to you and honest about the limits of a small-edition house."
    >
      <Section no="01" title="Atelier Editions (direct purchase)">
        <p>
          Unworn Atelier Editions in their original case may be returned for
          refund or exchange within <strong>14 days</strong> of receipt. The
          piece must be in the same condition in which it left the atelier,
          with all packaging, the certificate, and the leather card intact.
        </p>
      </Section>

      <Section no="02" title="By-Appointment pieces & private sales">
        <p>
          Pieces acquired through a private viewing or appointment are
          eligible for exchange only, within 30 days, against another piece
          in the current catalogue. Refunds are not available on
          appointment-only acquisitions.
        </p>
      </Section>

      <Section no="03" title="Custom commissions">
        <p>
          Bespoke commissions are non-returnable and non-refundable. We
          work from approved specifications and physical samples before
          finishing begins; we will not start work until both are signed
          off.
        </p>
      </Section>

      <Section no="04" title="How to start a return">
        <List
          items={[
            {
              lead: "Email",
              rest: "concierge@cheetahjewelz.com with your order number and the reason for the return.",
            },
            {
              lead: "Approval",
              rest: "We respond within 1 business day with a returns reference and a courier collection window.",
            },
            {
              lead: "Inspection",
              rest: "Returned pieces are inspected in the atelier within 48 hours of receipt.",
            },
            {
              lead: "Refund",
              rest: "Refunds are issued to the original payment method within 5 business days of approval.",
            },
          ]}
        />
      </Section>

      <Section no="05" title="Faults & warranty">
        <p>
          Every numbered piece carries a lifetime workshop warranty against
          manufacturing defect. If a piece fails in normal use, we will
          repair or replace it at no cost. Accidental damage (crushed
          frames, scratched lenses) is repaired at cost in the Dubai
          atelier.
        </p>
      </Section>
    </LegalPage>
  );
}
