import type { ImageMetadata } from 'astro';

export interface BeforeAfterCase {
  treatment: string;
  sessions: string; // e.g. "3 sessions"
  timing: string; // e.g. "4 weeks after final session"
  before: ImageMetadata;
  after: ImageMetadata;
  /** Overrides defaultDisclaimer for this case if set. */
  disclaimer?: string;
}

export const defaultDisclaimer =
  'Shown with patient consent. Individual results vary and are not guaranteed.';

// Add real, consented before/after cases here once photography exists.
// Photos go in src/assets/images/before-after/. Example:
//
//   import acneBefore from '../assets/images/before-after/acne-peel-patient1-before.jpg';
//   import acneAfter from '../assets/images/before-after/acne-peel-patient1-after.jpg';
//
//   export const beforeAfterCases: BeforeAfterCase[] = [
//     {
//       treatment: 'Acne Peel',
//       sessions: '3 sessions',
//       timing: '4 weeks after final session',
//       before: acneBefore,
//       after: acneAfter,
//     },
//   ];
//
// The gallery and homepage automatically show this section once the array
// is non-empty — no other code changes needed.
export const beforeAfterCases: BeforeAfterCase[] = [];
