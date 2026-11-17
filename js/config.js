/**
 * CENTRAL CONFIGURATION — edit everything here.
 * Fields that were not supplied are left empty and the page adapts (nothing is invented).
 */
window.WEDDING = {
  groom: { name: 'Anjoom Irshad', short: 'Anjoom' },
  bride: { name: 'Rinsha Pulikkal', short: 'Rinsha' },

  date: {
    iso: '2026-12-26',
    // ASSUMPTION: venue local time = India Standard Time. Countdown targets 00:00 on the date.
    utcOffset: '+05:30',
    timezoneLabel: 'IST',
  },

  venue: {
    name: 'Rozia Convention Centre',
    // Paste the VERIFIED Google Maps share link. QR code + "Get Directions" both use it.
    mapsUrl: 'https://qr.link/9GTE1b',
  },

  compliments: 'PT Group & Family',

  share: {
    url: 'https://anjoom-rinsha-nikah.vercel.app/',
    title: 'Anjoom Irshad & Rinsha Pulikkal | Nikah Invitation',
    text: 'With the blessings of Allah, we invite you to celebrate our Nikah on Saturday, 26 December 2026 at Rozia Convention Centre.',
  },

  wishes: {
    // A) real storage: JSON POST endpoint (Formspree, Web3Forms, your API). Reported "delivered" only on a success response.
    endpoint: '',
    // B) WhatsApp: digits with country code, e.g. '91XXXXXXXXXX'. Opens WhatsApp with the blessing pre-filled.
    whatsappNumber: '',
  },

  // Background music. Starts after the opening video; guests can toggle it. Clear the path to disable.
  audio: { src: 'assets/music.mp3' },
}
