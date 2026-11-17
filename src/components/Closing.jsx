import { wedding } from '../config/wedding'
import { whatsappShareUrl } from '../lib/share'
import { Corner, Divider } from './Ornaments'

export default function Closing({ onReplay }) {
  const { date } = wedding
  return (
    <section className="sec gold-bg on-gold from-paper" aria-label="Closing" style={{ paddingBottom: 150 }}>
      <Corner pos="bl" width="50cqw" parallax="0.05" />
      <Corner pos="br" width="50cqw" parallax="-0.05" />

      <p data-reveal style={{ fontSize: 'clamp(25px, 7vw, 30px)', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.45, maxWidth: '15em', margin: 0, textWrap: 'balance' }}>
        {wedding.closingBlessing}
      </p>
      <Divider data-reveal style={{ width: '60%', margin: '26px auto 14px' }} />
      <p data-reveal className="t-script" style={{ fontSize: 'clamp(54px, 16vw, 72px)', margin: 0 }}>{wedding.groom.short} &amp; {wedding.bride.short}</p>
      <p data-reveal className="t-label" style={{ fontSize: 14, letterSpacing: '0.32em', margin: '10px 0 34px' }}>{date.day} {date.month} {date.year}</p>

      <p data-reveal style={{ fontSize: 18, fontStyle: 'italic', margin: 0 }}>With Best Compliments From</p>
      <p data-reveal className="t-label" style={{ fontSize: 'clamp(17px, 5vw, 21px)', letterSpacing: '0.2em', margin: '6px 0 0' }}>{wedding.compliments.replace(/ and /i, ' & ').toUpperCase()}</p>

      <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 34, position: 'relative', zIndex: 3 }}>
        <a className="btn btn-ivory" href={whatsappShareUrl()} target="_blank" rel="noopener noreferrer">Share on WhatsApp</a>
        <button type="button" className="btn btn-ivory" onClick={onReplay}>Replay Invitation</button>
      </div>
    </section>
  )
}
