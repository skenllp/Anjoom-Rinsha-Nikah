# Nikah Invitation — Anjoom Irshad & Rinsha Pulikkal

Plain HTML + CSS + JavaScript. **No build step, no npm.** Just upload the folder.

## Files
```
index.html        page + SEO / Open Graph tags (production URL already set)
css/style.css     all styling
js/config.js      ← edit content & settings here
js/main.js        opening video, countdown, calendar, QR, wishes, animations
assets/           images (supplied artwork), video, self-hosted fonts
vendor/           gsap, ScrollTrigger (local copies, no CDN)
og-image.jpg      1200×630 WhatsApp/social preview
```

## Preview locally
Open `index.html` in a browser, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Add the verified Google Maps link
Open `js/config.js` and paste the share link into `venue.mapsUrl`:
```js
venue: { name: 'Rozia Convention Centre', mapsUrl: 'https://maps.app.goo.gl/XXXXXXXX' }
```
The **Get Directions** button uses it. The venue section shows the Rozia photo (`assets/images/venue.jpg`). Currently set to the link decoded from the printed invitation's QR (https://qr.link/9GTE1b) — a redirect from a QR service. Replace it with a direct Google Maps link if you can.

## Other settings (`js/config.js`)
- `date.time` / `time24` — Nikah time (9:30 AM). `utcOffset` is assumed `+05:30` (IST); `durationHours` only sets the calendar entry length.
- `wishes.endpoint` — a form service URL (Formspree, Web3Forms…) for real storage.
- `wishes.whatsappNumber` — digits with country code to receive blessings via WhatsApp.
- If neither is set, the form says clearly that nothing was sent.
- `audio.src` — background music (`assets/music.mp3`, re-encoded to 128 kbps). Starts on the first tap and plays through the opening video; the ♫ button toggles it. Clear the path to disable.

## Publish on Vercel (https://anjoom-rinsha-nikah.vercel.app/)
- Upload this folder as the project (Vercel → Add New → Project, or `vercel` CLI). Framework preset: **Other**; no build command; output directory is the root.
- Check the preview: share the link in WhatsApp, or use Facebook Sharing Debugger → *Scrape Again*. WhatsApp caches previews; add `?v=2` to force a refresh.
