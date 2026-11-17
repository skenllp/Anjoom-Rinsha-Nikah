import { wedding } from '../config/wedding'
import { Divider } from './Ornaments'

function Panel({ heading, person }) {
  return (
    <article className="panel" data-reveal>
      <p className="t-label" style={{ fontSize: 12, letterSpacing: '0.32em', color: 'var(--gold)', margin: 0 }}>{heading}</p>
      <h3 className="t-script" style={{ fontSize: 'clamp(44px, 12.5vw, 54px)', color: 'var(--gold)', margin: '14px 0 4px' }}>{person.name}</h3>
      <Divider style={{ width: '62%', margin: '0 auto 14px' }} />
      <p className="rel" style={{ margin: 0 }}>{person.relation}</p>
      <p className="who" style={{ margin: '2px 0 16px' }}>{person.parents}</p>
      <p className="rel" style={{ margin: 0 }}>{person.grandRelation}</p>
      <p className="who" style={{ margin: '2px 0 0' }}>{person.grandparents}</p>
    </article>
  )
}

export default function Family() {
  return (
    <section className="sec paper" aria-label="Families" style={{ gap: 34 }}>
      <Panel heading="Groom’s Family" person={wedding.groom} />
      <Panel heading="Bride’s Family" person={wedding.bride} />
    </section>
  )
}
