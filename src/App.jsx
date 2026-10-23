import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialLinks from './components/SocialLinks';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Everything below the hero, and all of Three.js, is split into separate chunks.
const ThreeScene = lazy(() => import('./components/ThreeScene'));
const About = lazy(() => import('./components/About'));
const ZohoEcosystem = lazy(() => import('./components/ZohoEcosystem'));
const Projects = lazy(() => import('./components/Projects'));
const Services = lazy(() => import('./components/Services'));
const Process = lazy(() => import('./components/Process'));
const Contact = lazy(() => import('./components/Contact'));

export default function App() {
  const [ready, setReady] = useState(false);
  const [scene, setScene] = useState(false);
  const fill = useRef(), pct = useRef();

  useEffect(() => {
    if (!ready) return;
    const idle = window.requestIdleCallback || (f => setTimeout(f, 300));
    const cancel = window.cancelIdleCallback || clearTimeout;
    const id = idle(() => setScene(true)); // Three.js loads only after the page is interactive
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: s => { fill.current.style.transform = `scaleY(${s.progress})`; pct.current.textContent = Math.round(s.progress * 100) + '%'; }
    });
    return () => { cancel(id); st.kill(); };
  }, [ready]);

  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <a className="skip" href="#main">Skip to content</a>
      <Navbar />
      {scene && <Suspense fallback={null}><ThreeScene /></Suspense>}
      <main id="main">
        <Hero ready={ready} />
        <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <About /><ZohoEcosystem /><Projects /><Process /><Services /><Contact />
        </Suspense>
      </main>
      <SocialLinks />
      <div className="progress" role="presentation" aria-hidden="true"><div className="track"><i ref={fill} /></div><span ref={pct}>0%</span></div>
    </>
  );
}
