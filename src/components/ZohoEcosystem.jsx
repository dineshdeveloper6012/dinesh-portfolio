import { useRef, useState } from 'react';
import Split from './Split';
import Skills from './Skills';
import { zohoApps } from '../data/zohoApps';
import useScrollAnimation from '../hooks/useScrollAnimation';

const cats = [...new Set(zohoApps.map(a => a.cat))];

export default function ZohoEcosystem() {
  const ref = useRef();
  const [open, setOpen] = useState(null);
  useScrollAnimation(ref);
  return (
    <section id="expertise" className="sec" ref={ref}>
      <div className="container-xl">
        <Split as="h2" text="One ecosystem, built to work as one system." />
        <p className="copy" data-reveal>From first lead to final invoice, I connect the Zoho apps your business already uses.</p>
        {cats.map(c => (
          <div className="cat" key={c} data-reveal>
            <h3>{c}</h3>
            <div className="apps">
              {zohoApps.filter(a => a.cat === c).map(a => (
                <button key={a.id} className={'app' + (open === a.id ? ' on' : '')} aria-expanded={open === a.id} onClick={() => setOpen(open === a.id ? null : a.id)}>
                  <span className="ic">{a.icon ? <img src={a.icon} alt="" width="56" height="56" loading="lazy" decoding="async" /> : <b>{a.short}</b>}</span>
                  <b>{a.name}</b>
                  <span className="more"><em>{a.desc}</em><span className="tg">{a.skills.map(s => <i key={s}>{s}</i>)}</span></span>
                </button>
              ))}
            </div>
          </div>
        ))}
        <Skills />
      </div>
    </section>
  );
}
