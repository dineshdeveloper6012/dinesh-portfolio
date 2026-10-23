import { useRef } from 'react';
import Split from './Split';
import { services, why } from '../data/projects';
import useScrollAnimation from '../hooks/useScrollAnimation';

export default function Services() {
  const ref = useRef();
  useScrollAnimation(ref);
  return (
    <section id="services" className="sec" ref={ref}>
      <div className="container-xl">
        <Split as="h2" text="Need a Zoho solution?" />
        <p className="copy" data-reveal>I help businesses automate, integrate and optimize their workflows using the Zoho ecosystem.</p>
        <ul className="svc" data-reveal>{services.map(s => <li key={s}>{s}</li>)}</ul>
        <div className="d-flex flex-wrap align-items-center gap-3 mt-4" data-reveal>
          <a className="btn btn-brand" href="#contact">Start a Project</a>
          <p className="free m-0"><i /> Available for Freelance Projects</p>
        </div>
        <h3 className="why-h" data-reveal>Why work with me</h3>
        <ul className="chips" data-reveal>{why.map(w => <li key={w}>{w}</li>)}</ul>
      </div>
    </section>
  );
}
