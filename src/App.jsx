import { useEffect, useRef, useState } from 'react'
import Opening from './components/Opening'
import AudioToggle from './components/AudioToggle'
import Home from './pages/Home'

export default function App() {
  const [phase, setPhase] = useState('poster') // poster → playing → site
  const [opened, setOpened] = useState(false)
  const opening = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('locked', phase !== 'site')
    if (phase === 'site') setOpened(true)
    return () => document.body.classList.remove('locked')
  }, [phase])

  // Replay must call video.play() inside the click handler (required by iOS Safari).
  const replay = () => opening.current?.start()

  return (
    <>
      {/* The invitation is mounted from the start, hidden beneath the overlay: no black frame, no jump. */}
      <div className="column" inert={phase !== 'site'} aria-hidden={phase !== 'site'}>
        <Home ready={opened} onReplay={replay} />
      </div>
      <Opening ref={opening} phase={phase} setPhase={setPhase} />
      <AudioToggle visible={phase === 'site'} />
    </>
  )
}
