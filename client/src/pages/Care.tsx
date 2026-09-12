/**
 * CARE GUIDE
 */
import LegalPage, { Section, List } from "@/components/LegalPage";

export default function Care() {
  return (
    <LegalPage
      eyebrow="Service · 03"
      title="Care Guide"
      intro="The pieces are made to outlive trends. A few minutes of care each month will keep them at the finish the atelier signed them off at."
    >
      <Section no="01" title="Daily handling">
        <List
          items={[
            {
              lead: "Use both hands.",
              rest: "Hold the frame at the bridge when putting on or removing. Single-handed removal warps the temple hinge over time.",
            },
            {
              lead: "Keep them in the case.",
              rest: "The leopard-print velvet case is the piece's home. Avoid leaving the frames on hard surfaces, dashboards, or in a bag unprotected.",
            },
            {
              lead: "Avoid the elements.",
              rest: "Saltwater, chlorinated pools, perfume, and sunblock damage the lacquer and mineral lenses. Apply products before putting the frames on.",
            },
          ]}
        />
      </Section>

      <Section no="02" title="Cleaning the frame">
        <p>
          Wipe the 18K brushed gold frame with the supplied microfibre
          cloth only. Do not use household polish, alcohol, or ammonia —
          they will strip the brushed finish. The frame does not need to be
          polished; the matte grain is intentional.
        </p>
      </Section>

      <Section no="03" title="Cleaning the lenses">
        <p>
          Mineral lenses are scratch-resistant, not scratch-proof. Rinse
          with lukewarm water and a drop of mild dish soap, then dry with
          the microfibre cloth. Do not use paper products, shirt fabric, or
          any cleaner containing solvents.
        </p>
      </Section>

      <Section no="04" title="Storage">
        <p>
          Store the case flat, in a dry place, away from direct sunlight.
          Prolonged heat (a parked car, a sunlit shelf) can warp acetate
          temples and stress mineral lens mounts.
        </p>
      </Section>

      <Section no="05" title="Atelier servicing">
        <p>
          We recommend a complimentary inspection every 12 months. We will
          re-align the frame, tighten hinges, deep-clean the lenses, and
          refresh the case lining. Shipping both ways is covered by the
          house for the first three years after purchase.
        </p>
      </Section>
    </LegalPage>
  );
}
