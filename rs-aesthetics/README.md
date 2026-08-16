# RS Aesthetics — Website

The official website for RS Aesthetics, a doctor-led aesthetic medicine clinic in
Rawalpindi run by Dr. Rabia Saif, MBBS. Built with [Astro](https://astro.build) as a
static site — no database, no CMS, no server required. It builds to plain HTML/CSS
with minimal JavaScript and deploys to any standard web host, including shared
cPanel hosting (HostBreak).

## Why Astro

With ~30 treatments across 6 categories, a doctor profile, and a repeated design
system (cards, buttons, nav), Astro gives reusable components and a single source
of truth for content, while still outputting flat static files — no Node server in
production, no framework JavaScript shipped to the browser unless a component
explicitly needs it (the mobile menu, the consultation form, and the before/after
slider each use a little vanilla JS; everything else is static HTML/CSS).

## Running locally

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

This starts a local dev server (usually at `http://localhost:4321`) that live-reloads
as you edit files.

## Building for production

```bash
npm run build
```

This type-checks the project and outputs the finished static site into `dist/`.
Everything inside `dist/` is what gets uploaded to hosting — see
[Deploying to HostBreak](#deploying-to-hostbreak) below.

To preview the production build locally before deploying:

```bash
npm run preview
```

## Editing content

All the information that changes often — contact details, the doctor's profile,
treatments, and FAQs — lives in plain TypeScript files under `src/data/`. You do
**not** need to touch any page or component file to update these.

### Phone, WhatsApp, address, hours, email, Instagram

Edit `src/data/clinic.ts`. The **first** entry in the `phones` array is treated as
the primary number used for the header, footer, and every "Book on WhatsApp"
button site-wide — change it once here and it updates everywhere.

### Doctor profile (bio, credentials, focus areas)

Edit `src/data/doctor.ts`. This single file drives both the homepage "Meet the
Doctor" section and the full `/about` page.

### Treatments and categories

Edit `src/data/treatments.ts`. Each category has a `title`, `description`, and a
list of `treatments` (`name` + `priceRs`).

- To **add a treatment**, add a new object to the relevant category's `treatments`
  array.
- To **add a whole new category**, copy an existing category block and give it a
  unique `slug`.
- Prices are stored in PKR (`priceRs`) but are **not displayed publicly** — the
  site currently shows "Consultation required for pricing" instead. This is
  controlled by the single flag at the top of the file:

  ```ts
  export const SHOW_PRICES = false;
  ```

  Set this to `true` if you ever want the site to display exact prices instead —
  no other file needs to change.

### FAQs

Edit `src/data/faqs.ts`. Add or remove `{ question, answer }` entries — they
appear on both the homepage preview and the full `/faqs` page automatically.

### Photos

Photos live in `src/assets/images/`, organised by type:

```
src/assets/images/clinic/       — clinic interior/exterior photos
src/assets/images/doctor/       — doctor portrait (not yet added)
src/assets/images/treatments/   — treatment photos (not yet added)
src/assets/images/before-after/ — before/after photos (not yet added)
```

To replace a photo, drop a new image file into the right folder using a
descriptive filename (e.g. `rs-aesthetics-doctor-portrait.jpg`), then update the
`import` path for that image in the relevant page (`src/pages/index.astro`,
`src/pages/gallery.astro`, or `src/pages/about.astro`). Astro automatically
resizes and converts images to WebP at build time — you don't need to optimise
images yourself before uploading them.

### Legal pages

`src/pages/privacy-policy.astro`, `terms.astro`, and `cancellation-policy.astro`
currently contain honest placeholder text. Replace the paragraph content in each
file with final legal copy before public launch.

### Before &amp; after photos

Edit `src/data/beforeAfter.ts`. The array starts empty on purpose — the
"Before & after" section (an interactive drag-to-compare slider, with a
treatment filter) is fully built but **renders nothing anywhere on the site**
until you add a real, consented case. To add one:

1. Add the before/after photo pair to `src/assets/images/before-after/`.
2. Import both at the top of `src/data/beforeAfter.ts` and add an entry to
   `beforeAfterCases` (treatment name, session count, timing, the two images).
3. That's it — the section automatically appears on the homepage and the
   Gallery page (which also automatically stops showing its "coming soon" text
   once real cases exist). No other file needs to change.

Never add invented or stock before/after images — only genuine patient results
with documented consent.

### Testimonials

Edit `src/data/testimonials.ts`. Same pattern as before/after: the array starts
empty, the star-rating/quote/testimonial section is fully built but stays
invisible until you add a real review. To add one, add an entry with the
patient's approved quote, their initials or approved name, the treatment
category, a star rating **only if the source actually provided one**, and the
source (e.g. `'Google'`). If you set `clinic.googleReviewsUrl` in
`src/data/clinic.ts` once your Google Business Profile is live, a "Read more
reviews on Google" link appears automatically under the testimonials.

Never invent reviews or star ratings.

## What's still using placeholder content

- **Doctor portrait** — currently an elegant initials placeholder ("DRS") instead
  of a real photo.
- **Logo** — the site currently renders a code-based wordmark/monogram inspired by
  the clinic's existing branding. Swap in final logo files when available
  (see `src/components/Logo.astro`).
- **Google Maps** — the clinic's Business Profile is under review, so the
  homepage and Contact page show a "map coming soon" placeholder instead of an
  embed. Once you have the Maps link, add it to `clinic.mapsUrl` in
  `src/data/clinic.ts` and embed it on the Contact page.
- **Before & after photos** — the comparison-slider section is fully built
  (see "Editing content" above) but stays hidden until real, consented cases
  are added to `src/data/beforeAfter.ts`.
- **Testimonials** — the reviews section is fully built but stays hidden until
  genuine, patient-approved reviews are added to `src/data/testimonials.ts`.
- **Legal pages** — placeholder text (see above).
- **Domain / hosting** — the site is built to deploy to `rsaesthetics.pk` on
  HostBreak, but confirm both have been purchased before going live.
- **Consultation form emails** — the "Book a Consultation" form (see below)
  can only be fully tested after deployment, since it relies on PHP mail
  which local `npm run dev`/`preview` doesn't run.

## How booking works

There are two ways a patient can reach out, both always available:

- **"Book a Consultation"** (the primary button throughout the site) leads to
  `/book`, a short form (name, phone, treatment/concern, preferred day & time,
  optional message). On submit, it emails the enquiry to the clinic and
  immediately shows a "Continue on WhatsApp" button pre-filled with the same
  details, so the patient can also message directly if they want to.
- **"WhatsApp Us"** (secondary, persistent — in the header, the mobile bottom
  bar, and the desktop floating button) opens WhatsApp directly at any time.

Neither path claims to confirm an appointment — both are clearly labelled as
requests that the clinic confirms afterward.

### The form's email handler

The form posts to `public/api/consultation-request.php`, a small,
dependency-free PHP script that emails the enquiry to the clinic. This works
because HostBreak's cPanel hosting runs PHP alongside static files — Astro
just copies this file into `dist/api/` untouched during the build, and the
live server executes it.

**This will not work during local development** (`npm run dev` / `npm run
preview`) — those only serve static files, with no PHP runtime. Submitting the
form locally will show a friendly error pointing to WhatsApp instead — that's
expected, not a bug. Test the actual email delivery after deploying to
HostBreak.

If the clinic's contact email ever changes, update it in **two places**:
`src/data/clinic.ts` (used everywhere else on the site) and the `$to` variable
near the top of `public/api/consultation-request.php` (PHP can't read the
TypeScript data file).

If `mail()` proves unreliable on HostBreak (a common issue with shared hosting
and spam filters), the standard fix is switching to SMTP via a library like
PHPMailer — that's a deliberate future upgrade, not something built in yet.

## Deploying to HostBreak

This assumes no prior experience with web hosting or cPanel.

1. **Build the site.** In this folder, run:

   ```bash
   npm run build
   ```

   This creates a `dist/` folder containing the finished website as plain HTML,
   CSS, JS, and image files.

2. **Zip the contents of `dist/`** (not the folder itself — select everything
   *inside* `dist/` and compress that) into a file such as `rsaesthetics.zip`.

3. **Log into HostBreak** and open **cPanel** from your hosting dashboard.

4. Open **File Manager** (usually under the "Files" section of cPanel).

5. Navigate into the `public_html` folder. This is the folder that serves your
   website at `rsaesthetics.pk`.

6. If there's a default "It works!" page or any placeholder file already in
   `public_html` (e.g. `index.html`), move it into a backup folder rather than
   deleting it, in case anything needs to be checked later.

7. Click **Upload** and upload `rsaesthetics.zip` into `public_html`.

8. Once uploaded, right-click the zip file in File Manager and choose
   **Extract** — extract it directly into `public_html` (not into a subfolder).

9. Confirm that `index.html` ends up directly inside `public_html`
   (i.e. `public_html/index.html`, not `public_html/dist/index.html`). If it's
   nested inside an extra folder, move the files up one level.

10. In cPanel, confirm the domain `rsaesthetics.pk` is pointed at this hosting
    account (this is usually already set up when the domain and hosting are
    purchased together — check under "Domains" in cPanel if unsure).

11. Enable **SSL** for the domain (cPanel usually has an "SSL/TLS Status" or
    "Let's Encrypt" tool — enable it for `rsaesthetics.pk` and `www.rsaesthetics.pk`).

12. Visit `https://rsaesthetics.pk` in a browser and confirm the padlock icon
    shows the connection is secure (HTTPS).

13. **Test everything on the live site:**
    - Every page loads (Home, Treatments, About, Gallery, FAQs, Contact, Book, legal pages)
    - Submit the "Book a Consultation" form with real test details and confirm
      the clinic actually receives the email (check spam folder too — see
      "How booking works" above if it doesn't arrive)
    - The WhatsApp button opens a chat with the correct number and message
    - The phone number link dials correctly on a mobile device
    - The email link opens a mail client
    - Every internal link and nav item works
    - The site looks correct on a real phone, not just a browser resized small
    - The favicon appears correctly in the browser tab
    - Sharing the homepage link on WhatsApp/social media shows the correct title,
      description, and preview

## Analytics (not yet configured)

No Google Analytics or Search Console has been added. When ready:

- Add a Google Analytics measurement ID and the tracking snippet to
  `src/layouts/Layout.astro` (there is no placeholder wired up yet — this should
  be added deliberately, not silently, since it affects patient privacy).
- Verify the domain in [Google Search Console](https://search.google.com/search-console)
  once the site is live, and submit `https://rsaesthetics.pk/sitemap-index.xml`.

## Project structure

```
src/
  assets/images/      — source photos (optimised automatically at build time)
  components/         — reusable UI pieces (buttons, header, footer, cards…)
  data/                — all editable business content (see "Editing content")
  layouts/Layout.astro — shared page shell (head tags, header, footer, SEO)
  pages/               — one file per route (index.astro = homepage, etc.)
  styles/global.css    — design tokens (colours, type, spacing) and base styles
public/
  api/consultation-request.php — email handler for the booking form
  fonts/               — self-hosted variable fonts (Fraunces, Inter)
  favicon.svg, robots.txt, etc.
```
