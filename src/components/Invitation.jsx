import { wedding } from '../config/wedding'
import { Divider } from './Ornaments'

export default function Invitation() {
  return (
    <section className="sec paper from-gold" aria-label="Invitation message">
      <div data-reveal style={{ width: '100%' }}><Divider /></div>
      <p data-reveal style={{ fontSize: 'clamp(25px, 7vw, 31px)', lineHeight: 1.5, fontWeight: 500, maxWidth: '17em', margin: '34px 0', textWrap: 'balance', color: 'var(--olive)' }}>
        {wedding.invitationLine}
      </p>
      <div data-reveal style={{ width: '100%' }}><Divider style={{ transform: 'scaleY(-1)' }} /></div>
    </section>
  )
}
