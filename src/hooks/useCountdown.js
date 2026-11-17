import { useEffect, useState } from 'react'
import { eventStart } from '../config/wedding'

const calc = (target) => {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return { done: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  const s = Math.floor(diff / 1000)
  return {
    done: false,
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  }
}

export default function useCountdown() {
  const target = eventStart()
  const [t, setT] = useState(() => calc(target))
  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000)
    return () => clearInterval(id)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return t
}
