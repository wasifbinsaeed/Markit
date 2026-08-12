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
explicitly needs it (only the mobile menu and WhatsApp button use a little JS here).

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
- **Before & after photos** — no real estate on the live site yet; the Gallery
  page shows a "coming soon" panel. Do not add fabricated results — only real,
  consented patient photos.
- **Testimonials** — intentionally left out of the live site until genuine
  reviews are available.
- **Legal pages** — placeholder text (see above).
- **Domain / hosting** — the site is built to deploy to `rsaesthetics.pk` on
  HostBreak, but confirm both have been purchased before going live.

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
    - Every page loads (Home, Treatments, About, Gallery, FAQs, Contact, legal pages)
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
  fonts/               — self-hosted variable fonts (Fraunces, Inter)
  favicon.svg, robots.txt, etc.
```
