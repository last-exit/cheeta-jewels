# Cheeta Jewels — Design Directions

## 1. Desert Monolith
**Very Brief Intro:** A gallery-like jewelry house where monumental type meets deep desert shadow and mineral-green brilliance. It feels exacting, rare, and physically sculpted.

**Probability:** 0.06

## 2. Velvet Menagerie
**Very Brief Intro:** A nocturnal, editorial salon built around black lacquer, plum velvet, and animalistic silhouettes. The mood is intimate and expressive rather than architectural.

**Probability:** 0.03

## 3. Lucid Archive
**Very Brief Intro:** A high-key archival atelier using paper-white surfaces, surgical product photography, and library indexing. It positions every object as a collectible artifact.

**Probability:** 0.08

---

# Chosen Direction: Desert Monolith

> **Reference contract:** The supplied Muzo-inspired comp is the structural ground truth for the hero: a bone-white expanse, understated brand corner, a distant edition marker, massive central typography, a single floating object, and a quiet navigation rail. Gentle Monster is the experiential reference: the campaign must feel fashion-led, atmospheric, object-obsessed, and commercially luxurious rather than like a creative studio portfolio. Cheeta Jewels will not reproduce either brand’s proprietary imagery, naming, or exact UI; it will translate these shared qualities into a distinct Dubai jewelry-and-eyewear house.

## Design Movement
**Brutalist luxury editorialism**, taking cues from contemporary gemstone houses, immersive fashion campaigns, museum exhibition design, and the sun-bleached materiality of Dubai.

## Core Principles
1. **Monument over ornament:** The page hierarchy is built through enormous typography, confident negative space, and a single object treated as sculpture.
2. **Archival precision:** Microcopy behaves as a cataloguing system—edition markers, material facts, and technical coordinates earn trust through restraint.
3. **Material contrast:** Bone paper, warm black ink, and one sharp mineral-green accent evoke rough stone becoming a polished jewel.
4. **Campaign presence:** Singular object imagery, controlled surrealism, and cinematic shadow make the fashion proposition tangible.

## Color Philosophy
The gallery-white ground keeps the experience tactile and serene rather than sterile. Inky black carries the typography and weight of the house. **Cheeta Emerald** is held in reserve for key details, product glints, and directional actions, so it reads as a rare material rather than a decorative color.

## Layout Paradigm
An **asymmetric exhibition floor plan**: oversized type forms an architectural wall behind a floating product composition, while a fixed right rail acts as the navigation spine. Content later opens into long vertical editorial acts rather than conventional grid modules.

## Signature Elements
- Cropped, extra-wide display letterforms as an environmental graphic layer.
- A narrow vertical navigation rail with numbered archival labels.
- Fine crosshair rules and technical data blocks framing jewelry as collected evidence.

## Interaction Philosophy
Every interaction should feel like handling a special object in a private gallery. Links draw a measured line beneath themselves, images reveal with quiet vertical movement, and the hero object responds to cursor proximity with an almost imperceptible parallax shift.

## Animation
Use a 700–1000 ms cubic-bezier(0.22, 1, 0.36, 1) for editorial entrances and 180–240 ms for controls. On page arrival, headline layers rise slightly from below while the product settles in from a small scale offset. The hero object has a continuous low-amplitude drift only when reduced motion is not requested. Scroll reveals use opacity plus translateY only, with restrained stagger timing. All motion is disabled or substantially reduced under `prefers-reduced-motion`.

## Typography System
**Headline:** `Anton`—a dense, condensed display sans used at all-caps, very large scales and tight tracking. **Body / technical:** `Space Mono` for cataloging and navigation, paired with `DM Sans` for the few readable editorial passages. Headlines do the visual work; body copy is always small, controlled, and calm.

## Brand Essence
**Cheeta Jewels is Dubai's collectible jewelry and eyewear house for people who wear identity as an artifact.**

Personality: **precise, untamed, assured**.

## Brand Voice
Headlines are declarative and cinematic; CTAs are quiet, ownership-oriented, and never promotional. Microcopy sounds like a curator’s note—not a checkout flow.

Example lines:
- “Nothing here is made to blend in.”
- “A frame cut for the light after midnight.”

## Wordmark & Logo
The wordmark is a custom-feeling, tightly tracked `CHEETA` block, counterweighted by a circular **twin-strike mark**: two offset bars within a ring, referencing the brand's double-barrel eyewear and cut-gem facets. The mark appears independently at large scale in the rail and browser icon.

## Signature Brand Color
**Cheeta Emerald — #136F54.**

## Style Decisions

Cheeta Emerald is a rare mineral signal, reserved for product glints, selected catalogue codes, directional actions, and one deliberate editorial intervention per major page. It is not used as decorative fill.

The opening screen is a private cinematic arrival: a muted full-bleed gallery space, one distant precious object under a restrained gold aura, a barely perceptible cheetah fragment, and the official CJ monogram presented as an independent house stamp before any collection interaction.

Collection controls speak about identity and private ownership, never configuration. Faces, expressions, and private holds replace variant, selected-object, and checkout language.

The Masquerade is a wholly original room of controlled dread: a sealed oxblood-velvet salon, black reflective floor, mirrors that withhold rather than reveal, isolated eyewear under a cold spotlight, and only partial human presences at the edge of perception. It should feel private, ritualistic, and disturbing without recreating a recognisable film scene.

The Masquerade audience is now intentional and still: a small semicircle of masked figures forms a silent court in the background, all attention fixed on the Barrel. The figures are legible enough to create discomfort, but remain unlit and secondary to the object.

The Masquerade follows one theatrical axis: its title, spotlight, Barrel, silent court, and room switcher all center on the same vertical line. Navigation remains peripheral so it does not fracture the room’s ritual focus.

The Smoke Room is spatial rather than object-only: a wide, after-hours private club seen from its threshold, with the Barrel held table-side inside a field of smoked glass, olive velvet, aged brass, reflective black stone, and distant human presence. The room itself carries the mood; the eyewear is discovered inside it.

Product pages treat the named object as the primary sculpture. Any broader house context is secondary and must never compete as an alternate product narrative.

The twin-strike mark operates as an archival seal, recurring independently at major transitions, dossier areas, and house-signature moments.

## House & Philosophy Extension

The new **House** page is an origin dossier rather than a conventional About page. It opens with the declaration “Dubai-born. Icon-led.” and places the founder’s story inside an evidence-file sequence: the refusal to blend in, the first influence, and the creation of a house for wearable identity. A dedicated large-format founder-image panel is intentionally reserved for supplied photography and treated as an archival portrait—not a profile card.

The **Philosophy** page turns “Diamonds in the Rough” into a slow, cinematic narrative. Each section moves from pressure to identity to presence, concluding with the line “Icon Livin’.” Copy is grounded in the supplied material: self-worth, self-expression, adversity, and the right to stand apart. It must not feel motivational or corporate; it should read like a house manifesto.

The product dossier receives a motion language that feels physical rather than animated for its own sake. The page gains eased scrolling, a quiet reading-progress indicator, image parallax tied to scroll position, and refined hover states that surface archival information in response to proximity. Motion remains under the user’s control and respects reduced-motion preferences.

All public-facing copy must be finished curator’s language. Draft markers, source notes, markup, and temporary-production phrasing are never visible. Until a verified Eisa Saidi portrait is supplied, the House uses a complete Dubai-origin plate rather than an invented founder likeness.

## Vintage Revival Rebuild

The opening must no longer present a static eyewear object as the hero. It becomes a full-bleed, muted cinematic entry where motion, shadow, and a distant gold object create a sense of arrival. The persistent UI turns into a bright luxury HUD: **CHEETA JEWELS** at left, **The Exclusive Rooms** at right, and hairline black controls. A transparent white-bordered entry control leads to the private collection.

The public collection is a bright, Bone White character-customisation gallery. One central campaign portrait acts as the character; selecting a frame or lens does not read as an e-commerce variant picker, but as setting an artifact into an identity. Thin red lines and selected markers are the only Velvet Red interventions in the public gallery. The purchase action is intentionally direct and confined to the Standard Collection.

The Exclusive Rooms are a distinct, dark spatial mode entered through a cinematic curtain transition. Room One is a 1910s smoky table study in sepia, and Room Two is a rich velvet-red masquerade salon. The rooms are prepared as layered 2.5D environments that can be replaced with real `.glb` models later. Every interaction presents a private-viewing request, never a direct acquisition path.

The revised philosophy uses bright Bone White, Ink Black, and one hairline Velvet Red divider. Its typographic contrast shifts from the industrial archive voice into dramatic serif-scale statements paired with a compact grotesk narrative column.

**Revised signature color logic:** Bone White `#FBFBF9` owns 80–90% of the public site; Ink Black `#0B0B0C` carries type and structure; Velvet Red `#6B151E` appears only as a thin active marker, subtle hover state, separator, or the dedicated Masquerade room.

## Vintage Revival Refinement Decisions

Velvet Red supersedes Cheeta Emerald as the interface accent. Emerald remains only in authentic gemstone imagery and the twin-strike mark; it is not used in display typography or broad graphic fill. Anton is the architectural voice across the gallery, House, collection, and rooms, while Bodoni Moda is intentionally reserved for the Philosophy manuscript. Each principal route now carries a large independent twin-strike seal as a recurring house stamp.

## Typography & Philosophy Refinement

The system now removes all monospace typography. **Bodoni Moda** becomes the expressive house display face, used for campaign statements and every principal headline. **DM Sans** becomes the sole supporting face, used in light to medium weights with calm tracking and standard punctuation. It is never treated as a faux technical typeface.

The Philosophy page must read as a short human essay, not an automated brand framework. It will avoid em dashes, numbered thinking, formulaic kicker lines, and repeated hairline separators. The page should move in three quiet acts: the pressure that reveals character, the choice to wear identity with intention, and the final permission to live distinctly. Visual pacing will come from white space, image scale, and typography rather than decorative lines.

## Humanizing Update

The Cheeta world should feel collected rather than pristine. The public gallery stays Bone White, but it gains a fixed low-opacity film grain and deliberate shifts in placement so the composition feels hand-set rather than perfectly mapped. The rooms become materially specific: scuffed wood, a cut-glass tumbler, ashtray, folded notes, fingerprints on lenses, and hard pools of light. This is atmosphere, not clutter for its own sake.

Copy moves into a blunt founder-led voice. Short sentences. No em dashes. No generic experience language. “Inspect artifact” becomes “Look closer.” “Spatial study” becomes “Room 01. Dubai.” The old technical labels disappear, as does any explanatory debug copy. The user’s typography decision remains binding: **no monospace**. A restrained DM Sans system will provide the directness normally associated with typewriter copy without introducing a monospace font.

Motion should vary in rhythm. A delayed cursor responds to user movement, room lighting shifts on the object hover, and one or two elements move slightly against the grid rather than every element fading into a perfect place. Controls retain sharp corners and the private club tone.

## Masquerade Correction

The Masquerade is not a second smoky study. It is a sealed crimson salon with a completely different emotional temperature: midnight black, oxblood velvet, lacquered floor reflections, tall candlelight, a mirrored threshold, and a black masked silhouette held at the far edge of the room. The eyewear sits alone under a cold pinpoint spotlight. The room should feel ceremonial and slightly unnerving, but never like a movie replica or haunted-house set.

Formatting corrections will preserve the existing architecture but remove the few signals that make the system feel inconsistent: House display color returns to Ink Black with a restrained Velvet Red marker, and Philosophy removes the generic motivational line in favor of a specific Cheeta statement. Anton remains for Home, House, rooms, and collection; Bodoni remains exclusive to Philosophy.

## Cheetah Presence

The cheetah is never introduced as a mascot and is never shown in full. It is a house presence felt in the periphery. On the homepage, a spotted flank or tail appears behind the gallery colonnade, then slips out of view. In the Standard Collection, one ear and a glinting eye appear briefly at the far edge of the model canvas. In the House, a shadowed spotted shoulder sits beyond the atelier window. In Philosophy, the presence becomes a pale coat pattern beneath the manuscript margin. In the Exclusive Rooms, a half-seen eye or mask-like spotted fragment lives behind velvet or in a mirror edge.

The refined presence is physical rather than symbolic: a low, wide crop of a real cheetah flank crosses only the bottom or side edge of selected pages. The tawny coat and rosettes should feel close enough to touch, but the animal must never be fully revealed, centered, or presented as a floating graphic.

## Architecture-Only Miami Empire Refinement

The cheetah image has been removed. Miami-empire character now comes through only in page architecture: controlled framed space, oversized ownership typography, private-house scale, strong vertical axes, and compositional tension between a central object and peripheral navigational controls. The existing palette, imagery, and film remain untouched.

The official CJ monogram now operates as an archival house seal within a faceted containment frame. In rooms, all controls behave as sharp ritual labels rather than consumer toggles. The allocation section remains available for private acquisition, but is framed as house evidence around the named Barrel rather than a conventional retail catalogue.

Every fragment is `aria-hidden`, has no CTA, never blocks copy or controls, and does not animate under reduced-motion preferences. Motion is limited to an occasional six-to-eight-second drift or a slight movement triggered after the visitor scrolls past a section. The effect should reward repeat visits, not announce itself.
