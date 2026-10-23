import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Split from './Split';
import Icon from './Icon';
import { projects } from '../data/projects';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { reduced } from '../hooks/useMediaQuery';

const N = projects.length;
const cards = [...projects, ...projects]; // second set makes the loop seamless

/* Controlled infinite carousel: only the track moves; vertical page scrolling is never intercepted. */
export default function Projects() {
  const sec = useRef(), view = useRef(), track = useRef();
  const S = useRef({ x: 0, k: 1, drag: false, vis: true, W: 1, step: 520, sx: 0, ox: 0 });
  useScrollAnimation(sec);

  const render = () => {
    const s = S.current, x = ((s.x % s.W) + s.W) % s.W;
    track.current.style.transform = `translate3d(${-x}px,0,0)`;
  };
  const go = dir => {
    const s = S.current;
    gsap.to(s, { x: s.x + dir * s.step, duration: reduced() ? 0.01 : 0.8, ease: 'power3.inOut', overwrite: 'auto', onUpdate: render });
  };
  const hover = v => gsap.to(S.current, { k: v, duration: 0.5, overwrite: 'auto' }); // pause / smoothly resume auto-slide
  const down = e => { const s = S.current; s.drag = true; s.sx = e.clientX; s.ox = s.x; gsap.killTweensOf(s, 'x'); e.currentTarget.setPointerCapture?.(e.pointerId); };
  const move = e => { const s = S.current; if (!s.drag) return; s.x = s.ox - (e.clientX - s.sx); render(); };
  const up = () => { S.current.drag = false; };

  useEffect(() => {
    const s = S.current, el = track.current, still = reduced();
    const measure = () => { const gap = parseFloat(getComputedStyle(el).columnGap) || 0; s.step = el.children[0].offsetWidth + gap; s.W = s.step * N; render(); };
    const tick = (t, dt) => { if (still || !s.vis || s.drag) return; s.x += s.k * 0.028 * dt; render(); }; // ~28px/s
    measure();
    const ro = new ResizeObserver(measure); ro.observe(view.current);
    const io = new IntersectionObserver(([e]) => { s.vis = e.isIntersecting; }); io.observe(view.current);
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); gsap.killTweensOf(s); ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <section id="projects" className="sec projects" ref={sec}>
      <div className="container-xl">
        <Split as="h2" text="Solutions I&rsquo;ve built." /><p className="copy mb-0" data-reveal>Client details are kept confidential.</p>
      </div>
      <div className="pwrap">
        <button className="car-btn prev" onClick={() => go(-1)} aria-label="Previous project"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg></button>
        <button className="car-btn next" onClick={() => go(1)} aria-label="Next project"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg></button>
      <div className="pview" ref={view} role="region" aria-roledescription="carousel" aria-label="Projects"
        onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
        <div className="ptrack" ref={track}>
          {cards.map((p, i) => (
            <article className="pcard" key={i} aria-hidden={i >= N} style={{ '--h': p.hue }}
              onPointerEnter={e => e.pointerType === 'mouse' && hover(0)} onPointerLeave={e => e.pointerType === 'mouse' && hover(1)}>
              <div className="phead"><span className="pic"><Icon name={p.icon} /></span><h3>{p.title}</h3></div>
              <ul className="tg">{p.tech.map(t => <li key={t}>{t}</li>)}</ul>
              <dl>
                <dt>Business problem</dt><dd>{p.problem}</dd>
                <dt>Solution</dt><dd>{p.solution}</dd>
                <dt>Result</dt><dd>{p.result}</dd>
              </dl>
            </article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
