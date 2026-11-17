import { useState } from 'react'
import { wedding } from '../config/wedding'
import { Divider } from './Ornaments'

export default function Wishes() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null) // {type: 'sending'|'ok'|'error'|'info', text}

  async function submit(e) {
    e.preventDefault()
    const n = name.trim(), m = message.trim()
    if (!n || !m) return setStatus({ type: 'error', text: 'Please add your name and a few words of blessing.' })
    const { endpoint, whatsappNumber } = wedding.wishes

    if (endpoint) {
      setStatus({ type: 'sending', text: 'Sending…' })
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ name: n, message: m, event: 'Nikah invitation' }),
        })
        if (!res.ok) throw new Error(String(res.status))
        setName(''); setMessage('')
        return setStatus({ type: 'ok', text: 'JazakAllah khair — your blessing has been delivered.' })
      } catch {
        return setStatus({ type: 'error', text: 'We could not deliver your blessing just now. Please try again in a moment.' })
      }
    }

    if (whatsappNumber) {
      const text = `Assalamu alaikum 🤍\n${m}\n\n— ${n}\n(Blessings for the Nikah of ${wedding.groom.name} & ${wedding.bride.name})`
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
      const w = window.open(url, '_blank', 'noopener')
      if (!w) window.location.href = url
      return setStatus({ type: 'info', text: 'WhatsApp is opening with your blessing ready. Please press Send there — it is only delivered once you do.' })
    }

    setStatus({ type: 'info', text: 'Blessings cannot be submitted from this page yet, so nothing has been sent. Please share your wishes with the family directly.' })
  }

  const color = status?.type === 'error' ? '#8a3b2a' : 'var(--olive)'

  return (
    <section className="sec paper" aria-label="Blessings and wishes">
      <h2 data-reveal style={{ fontSize: 'clamp(34px, 10vw, 44px)', fontWeight: 500, fontStyle: 'italic', color: 'var(--gold)', margin: 0 }}>Leave Your Blessings</h2>
      <Divider data-reveal style={{ width: '60%', margin: '10px auto 26px' }} />

      <form data-reveal onSubmit={submit} noValidate style={{ width: '100%', maxWidth: 400, display: 'grid', gap: 20 }}>
        <div className="field">
          <label htmlFor="g-name">Your name</label>
          <input id="g-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} />
        </div>
        <div className="field">
          <label htmlFor="g-msg">Your blessing</label>
          <textarea id="g-msg" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={600} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <button type="submit" className="btn btn-solid" disabled={status?.type === 'sending'}>Send Wishes</button>
        </div>
        <p role="status" aria-live="polite" style={{ minHeight: '3em', margin: 0, fontSize: 17, fontStyle: 'italic', lineHeight: 1.4, color }}>{status?.text}</p>
      </form>
    </section>
  )
}
