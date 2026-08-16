export type ReviewSource = 'Google' | 'WhatsApp' | 'Instagram' | 'In Clinic';

export interface Testimonial {
  quote: string;
  /** Patient initials or first name only, as approved by the patient. */
  attribution: string;
  treatmentCategory: string;
  /** Only set this if the review actually carries a star rating (e.g. Google). */
  rating?: 1 | 2 | 3 | 4 | 5;
  source: ReviewSource;
  /** Link to the specific review, if available. */
  sourceUrl?: string;
}

// Add genuine, patient-approved reviews here as they're collected — never
// invented ones. The homepage automatically shows this section once the
// array is non-empty. See clinic.googleReviewsUrl in clinic.ts for linking
// to the full Google Business Profile once it's set up.
export const testimonials: Testimonial[] = [];
