// Doctor profile — central source for the About page and homepage feature.

export const doctor = {
  name: 'Dr. Rabia Saif',
  postNominal: 'MBBS',
  title: 'Founder, RS Aesthetics',
  registration: 'PMDC Reg. No. 58134P',

  qualifications: [
    'MBBS',
    'Master in Medical Aesthetics — London Aesthetics UK',
  ],

  certificationsNote:
    'Certified in dermal fillers, Botox, non-surgical thread lifts, and related aesthetic procedures through London Aesthetics UK.',

  yearsExperience: 5,
  languages: ['English', 'Urdu'],
  memberships: [] as string[],

  bio: [
    'Dr Rabia Saif is an MBBS-qualified physician and the founder of RS Aesthetics in Rawalpindi. Registered with the Pakistan Medical & Dental Council, she holds a Master in Medical Aesthetics from London Aesthetics UK and has spent five years practising exclusively in aesthetic medicine.',
    "Her approach is diagnostic before it is cosmetic. Every patient starts with an assessment rather than a price list, and she will say plainly when a concern needs a course of treatment, a change in routine, or no treatment at all. Injectable and thread work is planned conservatively — the aim is that nobody can tell you've had anything done.",
    'Dr Rabia performs all injectable, thread and regenerative treatments personally. Every product used is sealed, in date, and opened in front of the patient.',
  ],

  focusAreas: [
    {
      title: 'Acne & acne scarring',
      description: 'Active acne, post-acne marks, resurfacing programmes.',
    },
    {
      title: 'Pigmentation & uneven tone',
      description: 'Melasma, sun damage, dullness — peels and brightening protocols.',
    },
    {
      title: 'Hair loss & thinning',
      description: 'PRP/GFC, medical assessment of the underlying cause.',
    },
    {
      title: 'Laser hair reduction',
      description: 'Face and body, full course planning.',
    },
    {
      title: 'Skin health & maintenance',
      description: 'Hydrafacials, medical facials, prescription skincare.',
    },
    {
      title: 'Injectable treatments',
      description: 'Anti-wrinkle and volume correction, conservative dosing.',
    },
  ],

  trustLine: 'All injectable treatments are performed by Dr Rabia personally.',
} as const;
