import { wedding } from '../config/wedding'

const pad = (n) => String(n).padStart(2, '0')
const ymd = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`

function dayRange() {
  const [y, m, d] = wedding.date.iso.split('-').map(Number)
  const start = new Date(Date.UTC(y, m - 1, d))
  const end = new Date(Date.UTC(y, m - 1, d + 1))
  return { start: ymd(start), end: ymd(end) }
}

const title = () => `Nikah of ${wedding.groom.name} & ${wedding.bride.name}`
const details = () => `${wedding.share.text}\n\nWith best compliments from ${wedding.compliments}.`

/** All-day event: no ceremony time has been supplied, so none is implied. */
export function downloadICS() {
  const { start, end } = dayRange()
  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Nikah Invitation//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:nikah-${start}@invitation`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${esc(title())}`,
    `LOCATION:${esc(wedding.venue.name)}`,
    `DESCRIPTION:${esc(details() + (wedding.venue.mapsUrl ? `\n\nDirections: ${wedding.venue.mapsUrl}` : ''))}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'anjoom-rinsha-nikah.ics'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

export function googleCalendarUrl() {
  const { start, end } = dayRange()
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: title(),
    dates: `${start}/${end}`,
    details: details(),
    location: wedding.venue.name,
  })
  return `https://calendar.google.com/calendar/render?${p.toString()}`
}
