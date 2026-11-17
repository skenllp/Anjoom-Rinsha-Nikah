import { wedding } from '../config/wedding'

export const pageUrl = () => wedding.share.url || window.location.href.split('#')[0]

export function whatsappShareUrl() {
  const text = `${wedding.share.title}\n\n${wedding.share.text}\n\n${pageUrl()}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}
