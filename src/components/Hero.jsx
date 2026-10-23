import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { reduced } from '../hooks/useMediaQuery';

const NAME = 'DINESH KUMAR';
const ZOHO = [['Z', '#E42527'], ['O', '#049949'], ['H', '#236DB4'], ['O', '#F9B21D']]; // Zoho brand colours

export default function Hero({ ready }) {
  const ref = useRef();
  const [still] = useState(() => reduced()); // reduced motion: static name + role, no loop

  useEffect(() => {
    if (!ready || still) return;
    const q = gsap.utils.selector(ref.current);
    const chars = q('.tc'), zl = q('.zl'), nameL = q('.name-line'), roleL = q('.role-line'), pill = q('.role-pill'), dev = q('.dev');
    const reset = () => chars.forEach(c => c.classList.remove('on', 'cur'));
    const ctx = gsap.context(() => {
      gsap.from('.hero-in', { y: 30, opacity: 0, filter: 'blur(8px)', duration: 0.9, stagger: 0.12, delay: 0.5, ease: 'power3.out', clearProps: 'filter' });
      // One looping timeline: type the name -> 1s -> role reveals BELOW it -> 2s -> both fade -> repeat
      const tl = gsap.timeline({ repeat: -1, delay: 0.6 });
      tl.call(reset).set(nameL, { autoAlpha: 1, y: 0, filter: 'blur(0px)' }).set(roleL, { autoAlpha: 0, y: 0, filter: 'blur(0px)' });
      chars.forEach((c, i) => tl.call(() => { chars[i - 1]?.classList.remove('cur'); c.classList.add('on', 'cur'); }, null, i ? '+=0.11' : '+=0.15'));
      tl.set(roleL, { autoAlpha: 1, y: 0, filter: 'blur(0px)' }, '+=1')
        .fromTo(pill, { opacity: 0, y: 26, scale: 0.95, filter: 'blur(8px)' }, { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' })
        .fromTo(zl, { yPercent: 90, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out' }, '<0.15')
        .fromTo(zl, { '--g': 0 }, { '--g': 1, duration: 0.45, stagger: 0.15, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '<0.4')
        .fromTo(dev, { opacity: 0, x: -18 }, { opacity: 0.92, x: 0, duration: 0.9, ease: 'power3.out' }, '<0.2')
        .to([nameL, roleL], { autoAlpha: 0, y: -18, filter: 'blur(8px)', duration: 0.6, ease: 'power2.in' }, '+=2');
    }, ref);
    return () => { ctx.revert(); reset(); };
  }, [ready, still]);

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="container-xl">
       
        <h1 className={'stage' + (still ? ' static' : '')} aria-label="Dinesh Kumar, Zoho Developer">
          <span className="st-line name-line" aria-hidden="true">
            {[...NAME].map((c, i) => <span key={i} className={'tc' + (c === ' ' ? ' sp' : '')}>{c === ' ' ? '\u00A0' : c}</span>)}
          </span>
          <span className="st-line role-line" aria-hidden="true">
            <span className="role-pill">
              <span className="zoho">{ZOHO.map(([c, col], i) => <span key={i} className="zl" style={{ '--zc': col }}>{c}</span>)}</span>
              <span className="dev">DEVELOPER</span>
            </span>
          </span>
        </h1>
        <p className="lead hero-in">Building smarter businesses with Zoho, automation and custom applications.</p>
        <p className="tags hero-in">Zoho Developer | Zoho One | Business Automation | Integrations</p>
        <div className="d-flex flex-wrap justify-content-center gap-3 hero-in">
          <a className="btn btn-brand" href="#projects">View My Work</a>
          <a className="btn btn-ghost" href="#contact">Let&rsquo;s Work Together</a>
        </div>
      </div>
    </section>
  );
}
