import { wedding } from '../config/wedding'
import useCountdown from '../hooks/useCountdown'
import { downloadICS, googleCalendarUrl } from '../lib/calendar'
import { Divider } from './Ornaments'

const pad = (n) => String(n).padStart(2, '0')

export default function SaveTheDate() {
  const { date } = wedding
  const t = useCountdown()
  const cells = [['Days', t.days], ['Hours', pad(t.hours)], ['Minutes', pad(t.minutes)], ['Seconds', pad(t.seconds)]]

  return (
    <section className="sec paper" aria-label="Save the date">
      <p data-reveal className="t-label" style={{ fontSize: 13, letterSpacing: '0.4em', color: 'var(--gold)', margin: 0 }}>Save the Date</p>

      <div data-reveal style={{ margin: '22px 0 4px' }}>
        <p className="t-label" style={{ fontSize: 'clamp(16px, 4.6vw, 20px)', letterSpacing: '0.46em', color: 'var(--olive)', margin: 0, paddingLeft: '0.46em' }}>{date.weekday}</p>
        <p style={{ fontSize: 'clamp(118px, 38vw, 168px)', lineHeight: 0.95, fontWeight: 500, color: 'var(--gold)', margin: '4px 0 0' }}>{date.day}</p>
        <p className="t-label" style={{ fontSize: 'clamp(15px, 4.4vw, 19px)', letterSpacing: '0.38em', color: 'var(--olive)', margin: 0, paddingLeft: '0.38em' }}>{date.month} {date.year}</p>
      </div>

      <Divider data-reveal style={{ margin: '26px auto 18px' }} />

      <div data-reveal style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {t.done ? (
          <p style={{ fontSize: 26, fontStyle: 'italic', color: 'var(--gold)' }}>The day has arrived — Alhamdulillah.</p>
        ) : (
          <div className="cd" role="timer" aria-label="Countdown to 26 December 2026">
            {cells.map(([label, v]) => (<div key={label}><b>{v}</b><span>{label}</span></div>))}
          </div>
        )}
        <p style={{ fontSize: 16, fontStyle: 'italic', color: 'var(--olive)', opacity: 0.85, maxWidth: '22em', margin: '16px 0 0', lineHeight: 1.4 }}>
          Counting down to the start of {date.day} {date.month} {date.year} (12:00 am {date.timezoneLabel}). The ceremony time is not yet announced.
        </p>
      </div>

      <div data-reveal style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 30 }}>
        <button type="button" className="btn btn-solid" onClick={downloadICS}>Add to Calendar</button>
        <a className="btn" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">Google Calendar</a>
      </div>
    </section>
  )
}
