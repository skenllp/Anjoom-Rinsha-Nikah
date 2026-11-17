import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { wedding } from '../config/wedding'
import qrFrame from '../assets/images/qr-frame.jpg'

/* Blank QR area measured on the uploaded 1254×1254 frame: inner box x 270–985, y 220–970. */
const QR_BOX = { left: '27.67%', top: '25.12%', size: '44.7%' }

export default function Venue() {
  const { venue } = wedding
  const [svg, setSvg] = useState('')

  useEffect(() => {
    if (!venue.mapsUrl) return
    QRCode.toString(venue.mapsUrl, { type: 'svg', errorCorrectionLevel: 'M', margin: 1, color: { dark: '#2b2d1e', light: '#0000' } })
      .then((s) => setSvg(s.replace('<svg ', '<svg width="100%" height="100%" role="img" aria-label="QR code for the venue location on Google Maps" ')))
      .catch(() => setSvg(''))
  }, [venue.mapsUrl])

  return (
    <section className="sec paper" aria-label="Venue and directions" style={{ gap: 22 }}>
      <h2 data-reveal className="t-label" style={{ fontSize: 'clamp(19px, 5.6vw, 25px)', letterSpacing: '0.16em', color: 'var(--gold)', margin: 0, lineHeight: 1.4, textWrap: 'balance' }}>
        {venue.name}
      </h2>

      <div data-reveal style={{ position: 'relative', width: 'min(100%, 430px)' }}>
        <img src={qrFrame} width="1254" height="1254" alt="Scan for location" style={{ width: '100%', height: 'auto', boxShadow: '0 22px 44px -28px rgba(57,59,41,.6)' }} decoding="async" />
        <div style={{ position: 'absolute', left: QR_BOX.left, top: QR_BOX.top, width: QR_BOX.size, height: QR_BOX.size, display: 'grid', placeItems: 'center' }}>
          {venue.mapsUrl && svg ? (
            <div style={{ width: '100%', height: '100%' }} dangerouslySetInnerHTML={{ __html: svg }} />
          ) : (
            <p style={{ margin: 0, padding: 16, fontStyle: 'italic', fontSize: 18, color: 'var(--gold)', lineHeight: 1.35 }}>
              {venue.mapsUrl ? '' : 'Location QR will appear here once the map link is added.'}
            </p>
          )}
        </div>
      </div>

      <div data-reveal>
        {venue.mapsUrl ? (
          <a className="btn btn-solid" href={venue.mapsUrl} target="_blank" rel="noopener noreferrer">Get Directions</a>
        ) : (
          <span className="btn" aria-disabled="true" role="link">Get Directions</span>
        )}
      </div>
    </section>
  )
}
