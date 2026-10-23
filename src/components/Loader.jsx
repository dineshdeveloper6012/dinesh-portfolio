import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onDone }) {
  const root = useRef(), bar = useRef(), num = useRef();
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let dead = false;
    const o = { v: 0 };
    const tl = gsap.timeline();
    tl.from('.ld-name', { yPercent: 110, duration: 0.6, ease: 'power3.out' })
      .from('.ld-role', { yPercent: 110, duration: 0.5, ease: 'power3.out' }, '+=0.1')
      .to(o, { v: 100, duration: 0.9, ease: 'power1.inOut', onUpdate: () => {
        bar.current.style.transform = `scaleX(${o.v / 100})`; num.current.textContent = Math.round(o.v);
      } }, 0.2);
    const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([fonts, new Promise(r => tl.eventCallback('onComplete', r))]).then(() => {
      if (dead) return;
      onDone(); // hero starts animating while the curtain lifts
      gsap.to(root.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete: () => setGone(true) });
    });
    return () => { dead = true; tl.kill(); };
  }, []);
  if (gone) return null;
  return (
    <div className="loader" ref={root} role="status" aria-label="Loading portfolio">
      <img className="ld-logo" src={`${import.meta.env.BASE_URL}logo-dark.webp`} width="150" height="64" alt="" />
      <div className="ld-line"><span className="ld-name">DINESH KUMAR</span></div>
      <div className="ld-line"><span className="ld-role">Zoho Developer</span></div>
      <div className="ld-bar"><i ref={bar} /></div>
      <small><span ref={num}>0</span>%</small>
    </div>
  );
}
