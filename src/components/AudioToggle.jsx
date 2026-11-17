import { useRef, useState } from 'react'
import { wedding } from '../config/wedding'

/** Only renders when `wedding.audio.src` is set — no audio file was supplied. */
export default function AudioToggle({ visible }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  if (!wedding.audio.src || !visible) return null
  const toggle = () => {
    const a = ref.current
    if (!a) return
    if (a.paused) a.play().then(() => setOn(true)).catch(() => setOn(false))
    else { a.pause(); setOn(false) }
  }
  return (
    <>
      <audio ref={ref} src={wedding.audio.src} loop preload="none" />
      <button type="button" onClick={toggle} aria-pressed={on} aria-label={on ? 'Mute music' : 'Play music'}
        style={{ position: 'fixed', right: 16, bottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)', zIndex: 40, width: 44, height: 44, borderRadius: 999, border: '1px solid var(--gold)', background: 'rgba(248,245,236,.92)', color: 'var(--gold)', cursor: 'pointer', fontSize: 18 }}>
        {on ? '♪' : '♫'}
      </button>
    </>
  )
}
