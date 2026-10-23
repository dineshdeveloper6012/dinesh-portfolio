import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Split from './Split';
import { steps } from '../data/projects';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { reduced } from '../hooks/useMediaQuery';

export default function Process() {
  const ref = useRef();
  useScrollAnimation(ref);
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from('.line-fill', { scaleY: 0, transformOrigin: 'top', ease: 'none',
        scrollTrigger: { trigger: '.steps', start: 'top 70%', end: 'bottom 60%', scrub: true } });
      gsap.utils.toArray('.step').forEach(s => gsap.from(s, { opacity: 0.15, x: -30, ease: 'none',
        scrollTrigger: { trigger: s, start: 'top 80%', end: 'top 55%', scrub: true } }));
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section id="process" className="sec" ref={ref}>
      <div className="container-xl">
        <Split as="h2" text="How I work." />
        <ol className="steps">
          <span className="line"><i className="line-fill" /></span>
          {steps.map(([t, d], i) => (
            <li className="step" key={t}><span className="n">0{i + 1}</span><div><h3>{t}</h3><p>{d}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
