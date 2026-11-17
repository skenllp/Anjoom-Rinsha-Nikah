import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import Invitation from '../components/Invitation'
import Family from '../components/Family'
import SaveTheDate from '../components/SaveTheDate'
import Venue from '../components/Venue'
import Wishes from '../components/Wishes'
import Closing from '../components/Closing'

gsap.registerPlugin(ScrollTrigger)
const MOTION_OK = '(prefers-reduced-motion: no-preference)'

export default function Home({ ready, onReplay }) {
  const root = useRef(null)

  // Scroll reveals + subtle floral parallax. Skipped entirely for reduced-motion users
  // (content is visible by default; GSAP only hides things when it is allowed to animate).
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.set('.hl', { opacity: 0, y: 16 })
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, { opacity: 0, y: 20, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      })
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        const k = parseFloat(el.dataset.parallax) || 0
        gsap.to(el, { yPercent: k * 100, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: 0.6 } })
      })
    }, root)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => { window.removeEventListener('load', refresh); mm.revert() }
  }, [])

  // The hero text reveals once the opening has handed over to the website.
  useEffect(() => {
    if (!ready) return
    const mm = gsap.matchMedia()
    mm.add(MOTION_OK, () => {
      gsap.to('.hl', { opacity: 1, y: 0, duration: 1.3, stagger: 0.2, ease: 'power3.out', delay: 0.25 })
    }, root)
    return () => mm.revert()
  }, [ready])

  return (
    <main ref={root}>
      <Hero />
      <Invitation />
      <Family />
      <SaveTheDate />
      <Venue />
      <Wishes />
      <Closing onReplay={onReplay} />
    </main>
  )
}
