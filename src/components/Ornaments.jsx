import corner from '../assets/images/corner.webp'
import divider from '../assets/images/divider.webp'
import basmala from '../assets/images/basmala.webp'

/** Ornamental divider (uploaded asset, cropped only by CSS aspect-ratio). */
export const Divider = ({ className = '', style, ...rest }) => (
  <img src={divider} width="2172" height="300" alt="" aria-hidden="true" className={`divider ${className}`} style={style} decoding="async" {...rest} />
)

/** Arabic Bismillah artwork — ivory on antique gold. */
export const Basmala = ({ className = '', style }) => (
  <img src={basmala} width="2172" height="480" alt="Bismillah ir-Rahman ir-Rahim" className={`basmala ${className}`} style={style} decoding="async" />
)

/**
 * Botanical corner. `pos`: tl | br | bl. The outer wrapper takes the GSAP parallax,
 * the inner image takes the flip so the two transforms never collide.
 */
export const Corner = ({ pos = 'tl', width, parallax, opacity = 1 }) => (
  <div className={`corner corner-${pos}`} data-parallax={parallax} style={{ '--cw': width, opacity }} aria-hidden="true">
    <img src={corner} width="1024" height="1536" alt="" decoding="async" />
  </div>
)
