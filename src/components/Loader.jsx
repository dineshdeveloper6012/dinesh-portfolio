import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { asset } from '../assets';
import { orbitApps, zohoApps } from '../data/zohoApps';

const MAX_WAIT = 12000; // never block the site longer than this, even on a very slow network

const loadImage = url => new Promise(res => { const i = new Image(); i.onload = i.onerror = res; i.src = url; });

export default function Loader({ onDone }) {
  const root = useRef(), bar = useRef(), num = useRef();
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let dead = false;
    const o = { v: 0 };
    const paint = () => { bar.current.style.transform = `scaleX(${o.v / 100})`; num.current.textContent = Math.round(o.v); };

    // Intro animation (name + role)
    const tl = gsap.timeline()
      .from('.ld-name', { yPercent: 110, duration: 0.6, ease: 'power3.out' })
      .from('.ld-role', { yPercent: 110, duration: 0.5, ease: 'power3.out' }, '+=0.1');
    const intro = new Promise(r => tl.eventCallback('onComplete', r));

    // Everything the first screen needs: fonts, the 3D scene code, the section chunks, logo + orbit icons
    const mobile = window.innerWidth < 768;
    const tasks = [
      document.fonts ? document.fonts.ready : Promise.resolve(),
      import('three'), import('./ThreeScene'),
      import('./About'), import('./ZohoEcosystem'), import('./Projects'), import('./Process'), import('./Services'), import('./Contact'),
      loadImage(asset('logo-dark.webp')),
      ...orbitApps.slice(0, mobile ? 8 : 10).map(a => loadImage(a.icon))
    ];
    let done = 0;
    const settled = tasks.map(t => Promise.resolve(t).catch(() => {}).then(() => {
      done++;
      gsap.to(o, { v: (done / tasks.length) * 100, duration: 0.4, ease: 'power1.out', overwrite: true, onUpdate: paint });
    }));
    const loaded = Promise.race([Promise.all(settled), new Promise(r => setTimeout(r, MAX_WAIT))]);

    Promise.all([loaded, intro]).then(() => {
      if (dead) return;
      gsap.to(o, { v: 100, duration: 0.25, overwrite: true, onUpdate: paint, onComplete: () => {
        if (dead) return;
        onDone(); // hero starts while the curtain lifts
        gsap.to(root.current, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete: () => setGone(true) });
        // quietly cache the remaining icons + photo so they are ready before the visitor scrolls to them
        const warm = () => [...zohoApps.map(a => a.icon).filter(Boolean), asset('profile.webp')].forEach(u => { const i = new Image(); i.src = u; });
        (window.requestIdleCallback || (f => setTimeout(f, 800)))(warm);
      } });
    });
    return () => { dead = true; tl.kill(); gsap.killTweensOf(o); };
  }, []);

  if (gone) return null;
  return (
    <div className="loader" ref={root} role="status" aria-label="Loading portfolio">
      <img className="ld-logo" src={asset('logo-dark.webp')} width="150" height="64" alt="" />
      <div className="ld-line"><span className="ld-name">DINESH KUMAR</span></div>
      <div className="ld-line"><span className="ld-role">Zoho Developer</span></div>
      <div className="ld-bar"><i ref={bar} /></div>
      <small><span ref={num}>0</span>%</small>
    </div>
  );
}