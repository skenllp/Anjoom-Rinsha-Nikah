import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { wedding } from '../config/wedding'
import arch from '../assets/images/arch.webp'
import openingVideo from '../assets/video/opening.mp4'
import { Corner } from './Ornaments'

/**
 * Full-screen cinematic opening.
 *  poster  → tap → video (9:16, contained, never cropped) → crossfade into the website.
 * The website is already rendered underneath, so there is never a black frame.
 */
export default function Opening({ phase, setPhase, ref }) {
  const videoRef = useRef(null)
  const [showVideo, setShowVideo] = useState(false)
  const timers = useRef([])

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }

  const finish = () => {
    clearTimers()
    const v = videoRef.current
    if (v) { try { v.pause() } catch { /* noop */ } }
    setPhase('site')
    // keep the last frame visible until the overlay has faded away, then reset for replay
    timers.current.push(setTimeout(() => setShowVideo(false), 1300))
  }

  const start = () => {
    const v = videoRef.current
    if (!v) return finish()
    clearTimers()
    setShowVideo(false)
    setPhase('playing')
    try { v.currentTime = 0 } catch { /* noop */ }
    v.muted = false // user just tapped, so sound is allowed; falls back to muted below
    const attempt = v.play()
    if (attempt && attempt.catch) {
      attempt.catch(() => {
        v.muted = true
        const second = v.play()
        if (second && second.catch) second.catch(finish)
      })
    }
    // Graceful fallbacks: never leave a guest stuck on the poster.
    timers.current.push(setTimeout(() => { if (!v.currentTime || v.paused) finish() }, 6000))
    timers.current.push(setTimeout(finish, ((v.duration || 8) + 3) * 1000))
  }

  useImperativeHandle(ref, () => ({ start }))
  useEffect(() => clearTimers, [])

  const playing = phase === 'playing'

  return (
    <div className={`overlay ${phase === 'site' ? 'hide' : ''} ${playing ? 'is-playing' : ''}`} role="dialog" aria-label="Invitation opening" aria-hidden={phase === 'site'}>
      {/* Poster */}
      <div className="poster">
        <Corner pos="tl" width="min(60vw, 330px)" opacity={0.95} />
        <Corner pos="br" width="min(54vw, 300px)" opacity={0.95} />
        <div className="arch" style={{ width: 'min(88vw, calc(84svh * 0.5628), 440px)' }}>
          <img className="arch-frame" src={arch} width="941" height="1672" alt="" aria-hidden="true" />
          <div className="arch-body poster-copy on-gold" style={{ inset: '24% 11% 9%' }}>
            <p className="t-label" style={{ fontSize: '3.4cqw', letterSpacing: '0.34em', margin: 0 }}>The Nikah of</p>
            <p className="t-script" style={{ fontSize: '17cqw', margin: '5cqw 0 0' }}>{wedding.groom.short}</p>
            <p style={{ fontSize: '8cqw', margin: '1cqw 0', fontStyle: 'italic', lineHeight: 1 }}>&amp;</p>
            <p className="t-script" style={{ fontSize: '17cqw', margin: 0 }}>{wedding.bride.short}</p>
            <button type="button" className="btn btn-ivory tap-btn" style={{ marginTop: '12cqw', fontSize: '2.9cqw', padding: '3.6cqw 6.5cqw', minHeight: 44 }} onClick={start}>
              Tap to Open Invitation
            </button>
          </div>
        </div>
      </div>

      {/* Cinematic video (720×1280 / 9:16) */}
      <div className={`stage ${showVideo ? 'on' : ''}`}>
        <video
          ref={videoRef}
          src={openingVideo}
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate nofullscreen"
          onPlaying={() => setShowVideo(true)}
          onEnded={finish}
          onError={finish}
          aria-hidden="true"
        />
      </div>

      <button type="button" className="skip" onClick={finish} aria-label="Skip opening video">SKIP</button>
    </div>
  )
}
