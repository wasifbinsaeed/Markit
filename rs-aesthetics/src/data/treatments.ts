// Treatment menu — organised exactly as the clinic's own printed menu.
//
// Pricing policy: prices are kept here (in PKR) so they exist in one place
// and can be switched on later, but SHOW_PRICES controls whether any page
// renders them. Currently off — the site shows "Consultation required for
// pricing" instead.

export const SHOW_PRICES = false;

export interface Treatment {
  name: string;
  priceRs: number;
}

export interface TreatmentCategory {
  slug: string;
  title: string;
  description: string;
  treatments: Treatment[];
}

export const treatmentCategories: TreatmentCategory[] = [
  {
    slug: 'hydrafacials-signature',
    title: 'Hydrafacials & Signature',
    description:
      'Deep-cleansing, hydration-focused facials, tailored to what your skin needs on the day.',
    treatments: [
      { name: 'Basic Hydra with LED Therapy', priceRs: 8000 },
      { name: 'Oxygeno Hydra Facial with LED', priceRs: 15000 },
      { name: 'Signature Hydra with Serum', priceRs: 20000 },
      { name: 'Hydra Facial with Pro Peel', priceRs: 10000 },
    ],
  },
  {
    slug: 'prp-meso-microneedling',
    title: 'PRP, Meso & Microneedling',
    description:
      'Regenerative treatments that use your own platelets and targeted microneedling to support skin and hair.',
    treatments: [
      { name: 'PRP with Microneedling — Face', priceRs: 8000 },
      { name: 'PRP with Microneedling — Hair', priceRs: 10000 },
      { name: 'Meso Therapy with PRP', priceRs: 10000 },
      { name: 'PICO with Meso — Face', priceRs: 8000 },
    ],
  },
  {
    slug: 'laser-hair-removal-electrolysis',
    title: 'Laser Hair Removal & Electrolysis',
    description:
      'Long-term hair reduction for face and body, planned as a full course rather than a single session.',
    treatments: [
      { name: 'Full Body', priceRs: 15000 },
      { name: 'Full Face', priceRs: 5000 },
      { name: 'Face with Neck', priceRs: 6000 },
      { name: 'Full Legs', priceRs: 7000 },
      { name: 'Half Legs', priceRs: 3500 },
      { name: 'Full Arms (incl. Under Arms)', priceRs: 7000 },
      { name: 'Arms (without Under Arms)', priceRs: 5000 },
      { name: 'Electrolysis — Chin', priceRs: 5000 },
    ],
  },
  {
    slug: 'peels-skin-brightening',
    title: 'Peels & Skin Brightening',
    description:
      'Targeted chemical peels for acne, pigmentation, and overall skin brightness.',
    treatments: [
      { name: 'Carbon Peel with Mini Hydra', priceRs: 10000 },
      { name: 'Q-Switch with Mini Hydra', priceRs: 10000 },
      { name: 'Green Sea Peel — Full Face', priceRs: 15000 },
      { name: 'Acne Peel — Full Face', priceRs: 10000 },
      { name: 'Carbon Peel — Hands', priceRs: 5000 },
      { name: 'Carbon Peel — Feet', priceRs: 5000 },
    ],
  },
  {
    slug: 'anti-wrinkle-injections',
    title: 'Anti-Wrinkle Injections',
    description:
      'Conservative, natural-looking wrinkle relaxing treatments, performed personally by Dr. Rabia.',
    treatments: [
      { name: 'Frown Lines', priceRs: 8000 },
      { name: 'Forehead Lines', priceRs: 6000 },
      { name: "Crow's Feet (both sides)", priceRs: 8000 },
      { name: 'Upper Face (3 areas)', priceRs: 17000 },
      { name: 'Masseter (jaw slimming)', priceRs: 18000 },
      { name: 'Full Face', priceRs: 27000 },
    ],
  },
  {
    slug: 'boosters-regenerative',
    title: 'Boosters & Regenerative',
    description:
      'Advanced skin boosters and regenerative therapies for long-term skin quality.',
    treatments: [
      { name: 'Skin Boosters — PDRN', priceRs: 45000 },
      { name: 'Exosome Therapy — American', priceRs: 60000 },
      { name: 'Exosome Therapy — Korean', priceRs: 45000 },
      { name: 'Thread Lift — per pair', priceRs: 12000 },
    ],
  },
];

export const treatmentsDisclaimer =
  'Every treatment begins with an in-person consultation to confirm it is right for you. Individual results vary and are not guaranteed.';
