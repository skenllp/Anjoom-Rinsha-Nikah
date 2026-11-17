import { wedding } from '../config/wedding'
import arch from '../assets/images/arch.webp'
import { Basmala, Corner, Divider } from './Ornaments'

export default function Hero() {
  const { groom, bride, date } = wedding
  return (
    <section className="sec gold-bg on-gold" style={{ padding: 'max(env(safe-area-inset-top), 18px) 0 max(env(safe-area-inset-bottom), 18px)' }} aria-label="Invitation">
      <Corner pos="tl" width="62cqw" parallax="-0.06" />
      <Corner pos="br" width="52cqw" parallax="0.05" />

      <div className="arch">
        <img className="arch-frame" src={arch} width="941" height="1672" alt="" aria-hidden="true" />
        <div className="arch-body">
          <Basmala className="hl" style={{ width: '44cqw', margin: '0 0 1.5cqw' }} />
          <Divider className="hl" style={{ width: '40cqw', margin: '0 0 1cqw' }} />
          <p className="hl t-label" style={{ fontSize: '3.3cqw', letterSpacing: '0.34em', margin: '0 0 3cqw' }}>The Nikah of</p>
          <h1 className="hl t-script" style={{ fontSize: '12.4cqw', margin: 0 }}>{groom.name}</h1>
          <p className="hl" style={{ fontSize: '8cqw', fontStyle: 'italic', lineHeight: 1, margin: '1.5cqw 0' }} aria-hidden="true">&amp;</p>
          <h2 className="hl t-script" style={{ fontSize: '12.4cqw', margin: 0 }}>{bride.name}</h2>
          <Divider className="hl" style={{ width: '46cqw', margin: '5cqw 0 3cqw' }} />
          <p className="hl t-label" style={{ fontSize: '3.5cqw', letterSpacing: '0.3em', lineHeight: 1.9, margin: 0 }}>
            {date.weekday}<span aria-hidden="true"> · </span><br />
            {date.day} {date.month} {date.year}
          </p>
        </div>
      </div>
    </section>
  )
}
