# Milan Bakers — Website

A fast, mobile-first marketing site for a bakery, built with [Astro](https://astro.build).
No backend, no database — all content lives in a few JSON files and the site is
deployed as static HTML to GitHub Pages.

## Running it locally

You need [Node.js](https://nodejs.org) 20+ installed.

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:4321`).

Other useful commands:

```bash
npm run build     # production build -> dist/
npm run preview   # serve the production build locally
npx astro check   # type-check the project
```

## Editing content

Everything you'll want to change day-to-day lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `src/data/site.json` | Bakery name, tagline, phone, WhatsApp number, email, address, opening hours, Google Maps embed URL, social links, and the Web3Forms key |
| `src/data/slides.json` | The images/headlines in the homepage hero slider |
| `src/data/products.json` | Every product card and the dropdown on the order form |

### Adding or editing a product

Open `src/data/products.json` and add/edit an entry:

```json
{
  "id": "unique-id-no-spaces",
  "name": "Product Name",
  "description": "One short sentence about it.",
  "price": 200,
  "unit": "per kg",
  "category": "Cakes",
  "image": "/images/products/your-image.svg",
  "available": true
}
```

- `category` controls which filter button the product shows under on the Menu
  section. Re-using an existing category (e.g. `"Breads"`, `"Cakes"`,
  `"Pastries"`, `"Cookies"`, `"Beverages"`) groups it with similar items; a new
  category name automatically adds a new filter button.
- Set `"available": false` to keep a product visible but show it as
  **"Currently unavailable"** and disable ordering — handy for seasonal items.
- Only products with `"available": true` show up in the order form's dropdown.

### Editing the hero slider

Open `src/data/slides.json`. Each slide is:

```json
{
  "id": "slide-4",
  "image": "/images/slides/your-image.jpg",
  "heading": "Headline",
  "subheading": "A short supporting sentence.",
  "buttonText": "Optional button label",
  "buttonLink": "#products"
}
```

Leave out `buttonText`/`buttonLink` (or set them to an empty string) if you
don't want a button on that slide. The slider autoplays, pauses on
hover/focus, and supports swipe on mobile automatically — no extra setup.

### Editing bakery details (phone, address, hours, maps, socials)

Open `src/data/site.json`:

- `phoneDisplay` / `phoneDial` — how the number is shown vs. what's dialled
  from the "tap to call" link. Keep `phoneDial` in `+91XXXXXXXXXX` format.
- `whatsappNumber` — **international format without the `+` or spaces**, e.g.
  `919876543210`. Used for both the order form's WhatsApp button and the
  floating WhatsApp button.
- `address` / `hours` — shown in the Contact section and used to build the
  `Bakery` structured data (JSON-LD) for SEO.
- `mapsEmbedUrl` — go to [Google Maps](https://maps.google.com), search your
  location, click **Share → Embed a map**, and copy the `src="..."` URL from
  the provided `<iframe>` into this field.
- `social` — links shown in the footer and in the JSON-LD `sameAs` field.

## Replacing the placeholder images

All images live under `public/images/`:

```
public/images/
├── slides/        hero slider images
├── products/       product card images
├── about.svg       the "About" section photo
└── og-image.png    social-share preview image
```

The project ships with simple generated placeholder graphics (no stock
photos were hot-linked) so the repo doesn't depend on any third-party image
host. To replace them with real photography:

1. Export/compress your photos (JPEG or WebP, ideally under ~200KB each —
   tools like [Squoosh](https://squoosh.app) work well).
2. Drop them into the matching folder, keeping similar aspect ratios:
   - Slides: 16:9 (e.g. 1600×900)
   - Product cards: 4:3 (e.g. 900×675)
   - About image: ~9:7 (e.g. 900×700)
3. Update the `image` path for that item in `slides.json` / `products.json`
   (or just overwrite the existing file with the same name).
4. For the social-share image, replace `public/images/og-image.png` with a
   1200×630 JPEG/PNG.

`scripts/generate-placeholders.mjs` is the script that generated the current
placeholder SVGs — it's not used at build time and can be deleted once you've
swapped in real photos.

## Turning on real order submissions (Web3Forms)

The order form works in **demo mode** until you add a key — submissions show
a "Demo mode — order not sent" message instead of emailing anyone.

1. Create a free account at [web3forms.com](https://web3forms.com) and
   create a form to get an **Access Key**.
2. Open `src/data/site.json` and paste it into `web3formsAccessKey`.
3. Commit and push — the next deploy will have live order emails.

Submissions email the bakery with a subject like
`New order: 2 × Chocolate Truffle Cake — Priya Sharma` and list every field.
The honeypot field (`company`) is hidden from real visitors via CSS; if a bot
fills it in, the submission is silently dropped.

## WhatsApp ordering

Independent of Web3Forms, every order form submission also offers an
**"Order on WhatsApp"** button that opens a prefilled WhatsApp chat to
`site.json`'s `whatsappNumber`. Update that number any time the bakery's
WhatsApp line changes — no code changes needed.

## How deploys work

Every push to `main` triggers `.github/workflows/deploy.yml`, which:

1. Checks out the repo.
2. Uses the official [`withastro/action`](https://github.com/withastro/action)
   to install dependencies and run `astro build`.
3. Publishes the `dist/` output to GitHub Pages via
   `actions/deploy-pages`.

No manual build-and-upload step is ever needed — just push to `main`.
Check the **Actions** tab of the repo to watch a deploy or see why one
failed.

### If you rename the repo or move to your own GitHub account

`astro.config.mjs` hard-codes the GitHub Pages URL:

```js
export default defineConfig({
  site: "https://<username>.github.io",
  base: "/<repo-name>/",
});
```

Update both values to match your GitHub username and repository name,
otherwise internal links/images will 404 on Pages.

## Moving to a custom domain or another host

This is a fully static site (`dist/` after `npm run build`), so it can move
anywhere that serves static files — Netlify, Vercel, Cloudflare Pages, a
cPanel host, etc.

**Custom domain on GitHub Pages:**

1. In the repo, go to **Settings → Pages → Custom domain** and enter your
   domain (e.g. `www.milanbakers.in`).
2. At your domain registrar, add a `CNAME` record pointing
   `www` → `<username>.github.io` (or `A` records to GitHub's IPs for an
   apex domain — see [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
3. Once the domain is verified, set `base: "/"` and `site:
   "https://www.milanbakers.in"` in `astro.config.mjs`, commit, and
   push.

**Moving to another host (Netlify/Vercel/own server):**

1. Set `base: "/"` in `astro.config.mjs` (most hosts serve from the domain
   root, not a sub-path) and update `site` to the new domain.
2. Run `npm run build` and upload the contents of `dist/` — or connect the
   Git repo directly to Netlify/Vercel/Cloudflare Pages with build command
   `npm run build` and publish directory `dist`.
3. You can delete `.github/workflows/deploy.yml` if you're no longer using
   GitHub Pages.

## Tech stack

- [Astro](https://astro.build) (static output, TypeScript)
- Plain CSS with design tokens (`src/styles/global.css`) — no UI framework
- Google Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) (headings) and [Nunito Sans](https://fonts.google.com/specimen/Nunito+Sans) (body)
- Minimal vanilla TypeScript, only for the hero slider, product filters, and
  order form
