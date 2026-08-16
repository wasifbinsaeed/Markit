// Central clinic contact/business data.
// Edit this single file to update contact info anywhere on the site.

export const clinic = {
  name: 'RS Aesthetics',
  descriptor: 'Skin · Laser · Aesthetic Medicine',

  address: {
    line1: 'Clinic # A5, Alpha Mall',
    line2: 'Adiala Road (near Askari 7), Rawalpindi',
    full: 'Clinic # A5, Alpha Mall, Adiala Road (near Askari 7), Rawalpindi',
    city: 'Rawalpindi',
    region: 'Punjab',
    country: 'Pakistan',
  },

  // First entry is treated as the primary WhatsApp/call number site-wide.
  phones: [
    { display: '0303-8988073', tel: '+923038988073', whatsapp: '923038988073' },
    { display: '0321-8501274', tel: '+923218501274', whatsapp: '923218501274' },
  ],

  email: 'rabiasaif2209@gmail.com',

  hours: [
    { days: 'Tuesday – Sunday', time: '12:00 PM – 7:00 PM' },
    { days: 'Monday', time: 'Closed' },
  ],

  socials: {
    instagram: 'https://www.instagram.com/aestheticsskinhairs',
  },

  // Pending — Google Business listing is under review.
  mapsUrl: null as string | null,
  googleReviewsUrl: null as string | null,
} as const;

const primaryPhone = clinic.phones[0];

/** Builds a wa.me link with an optional pre-filled message. */
export function whatsappLink(message?: string, phone: string = primaryPhone.whatsapp): string {
  const base = `https://wa.me/${phone}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsAppMessage = "Hi RS Aesthetics, I'd like to book a consultation.";
