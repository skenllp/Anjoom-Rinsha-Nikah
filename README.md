# Nikah Invitation — Anjoom Irshad & Rinsha Pulikkal

React + Vite + Tailwind + GSAP. Mobile-first. Uses the supplied artwork and opening video as-is.

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview
```

## 1 · Add the verified Google Maps link (QR + Get Directions)
1. Open Google Maps → find **Rozia Convention Centre** → confirm it is the right place → **Share → Copy link**.
2. Open `src/config/wedding.js` and paste it:
   ```js
   venue: { name: 'Rozia Convention Centre', mapsUrl: 'https://maps.app.goo.gl/XXXXXXXX' }
   ```
3. The scannable QR (drawn into the blank box of the supplied frame) and the **Get Directions** button both come from that one value. Until it is set, the QR box shows a note and the button is disabled — nothing is invented.
4. Scan the QR with a phone before publishing.

## 2 · Everything else you may want to edit (`src/config/wedding.js`)
| Field | Purpose |
|---|---|
| `date.utcOffset` / `timezoneLabel` | **Assumed `+05:30` (IST).** Countdown targets 12:00 am on 26 Dec 2026 in this zone. Change if the venue is elsewhere. |
| `date.time` | Left empty — no ceremony time was supplied. |
| `wishes.endpoint` | URL of a form backend (Formspree, Web3Forms, your own API) → real storage. A wish is reported "delivered" only if the server answers OK. |
| `wishes.whatsappNumber` | Digits with country code (e.g. `91XXXXXXXXXX`) → guests are sent to WhatsApp with the blessing pre-filled. |
| `audio.src` | e.g. `/music.mp3` (file in `/public`). The music toggle only appears when set. |
| `share.url` | Optional explicit production URL for the WhatsApp share text. |

If neither `endpoint` nor `whatsappNumber` is set, the form says plainly that nothing was sent.

## 3 · Publish
1. Create `.env` (copy `.env.example`) and set your final URL, **no trailing slash**:
   ```
   VITE_SITE_URL=https://your-domain.com
   ```
   This fills the canonical URL and the absolute Open Graph / Twitter image URLs in `index.html` at build time.
2. Deploy `dist/`:
   - **Netlify**: drag the `dist` folder to app.netlify.com/drop, or connect the repo (`netlify.toml` included). Add `VITE_SITE_URL` under Site settings → Environment variables.
   - **Vercel**: import the repo (`vercel.json` included), add `VITE_SITE_URL`.
   - **GitHub Pages / sub-folder**: set `base: './'` in `vite.config.js` and use a hash-less static host path; `VITE_SITE_URL` must include the sub-path.
3. Rebuild after changing `VITE_SITE_URL` or the config.

## 4 · WhatsApp link preview
- `public/og-image.jpg` is 1200×630 (≈175 KB) and referenced by an absolute URL.
- After deploying, test with Facebook's Sharing Debugger (developers.facebook.com/tools/debug) → **Scrape Again**; WhatsApp uses the same Open Graph data. WhatsApp caches previews, so re-sharing a *new* link variant (e.g. `?v=2`) forces a refresh.

## Structure
```
public/            og-image.jpg, favicon.svg
src/assets/images  parchment, ivory-floral, qr-frame (JPG) · arch, basmala, divider, corner (lossless WebP, transparency kept)
src/assets/video   opening.mp4 (original stream, only re-muxed with faststart)
src/config         wedding.js  ← all content & settings
src/components     Opening, Hero, Invitation, Family, SaveTheDate, Venue, Wishes, Closing, Ornaments, AudioToggle
src/pages          Home.jsx (GSAP scroll reveals + parallax)
src/lib            calendar.js (.ics + Google Calendar), share.js (WhatsApp)
```

## Notes
- Fonts are self-hosted via `@fontsource` (Pinyon Script, Cormorant Garamond, Cinzel) — no render-blocking third-party font requests.
- Opening: tap → video plays with sound (falls back to muted, then to skipping straight to the site if playback fails). The site is already rendered under the overlay, so there is no black frame. Skip and Replay controls included.
- Animations are disabled for visitors with *reduce motion* enabled.
- On desktop the invitation is shown as a centred phone-width card so the artwork is never stretched.
