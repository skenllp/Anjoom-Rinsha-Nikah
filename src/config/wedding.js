/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL WEDDING CONFIGURATION — edit everything here.
 * ─────────────────────────────────────────────────────────────
 *  Nothing below is invented: fields that were not supplied are
 *  left empty (''), and the site adapts (hides / disables them).
 */
export const wedding = {
  event: 'Nikah',
  invitationLine:
    'With the blessings of Allah and our beloved families, we joyfully invite you to celebrate the Nikah of our beloved couple.',
  closingBlessing: 'May Allah bless this union with love, happiness and barakah.',

  groom: {
    name: 'Anjoom Irshad',
    short: 'Anjoom',
    relation: 'Son of',
    parents: 'Irshad PT & Febitha Irshad',
    grandRelation: 'Grandson of',
    grandparents: 'Aboobacker Haji & Late Sainaba',
  },
  bride: {
    name: 'Rinsha Pulikkal',
    short: 'Rinsha',
    relation: 'Daughter of',
    parents: 'Abdurazakh & Failuzath',
    grandRelation: 'Granddaughter of',
    grandparents: 'Late Kunchimmu Haji & Late Pathummakutty Pilakkal',
  },

  date: {
    weekday: 'Saturday',
    day: '26',
    month: 'December',
    year: '2026',
    iso: '2026-12-26',
    // ASSUMPTION: venue's local time. +05:30 = India Standard Time (IST).
    // Change if the venue is in another timezone. Countdown targets 00:00 on the date.
    utcOffset: '+05:30',
    timezoneLabel: 'IST',
    // Left empty on purpose — no ceremony time was supplied.
    time: '',
  },

  venue: {
    name: 'Rozia Convention Centre',
    // Paste the VERIFIED Google Maps share link here (e.g. https://maps.app.goo.gl/xxxx).
    // The QR code and the "Get Directions" button are both generated from this one value.
    mapsUrl: '',
  },

  compliments: 'PT Group & Family',

  share: {
    title: 'Anjoom Irshad & Rinsha Pulikkal | Nikah Invitation',
    text: 'With the blessings of Allah, we invite you to celebrate our Nikah on Saturday, 26 December 2026 at Rozia Convention Centre.',
    // Leave empty to use the page's own URL. Set to your production URL to be explicit.
    url: '',
  },

  wishes: {
    // Option A (real storage): URL of a form backend that accepts JSON POST
    //   {name, message}. e.g. Formspree "https://formspree.io/f/xxxx", Web3Forms, your own API.
    //   A wish is only reported as "sent" if the server answers with a success status.
    endpoint: '',
    // Option B (no backend): WhatsApp number of the family contact, digits only with country code,
    //   e.g. '919XXXXXXXXX'. Guests are taken to WhatsApp with the message pre-filled.
    whatsappNumber: '',
  },

  // Optional background music. Put a file in /public (e.g. /music.mp3) and set the path.
  // The toggle only appears when this is set.
  audio: { src: '' },
}

export const eventStart = () =>
  new Date(`${wedding.date.iso}T00:00:00${wedding.date.utcOffset}`)
