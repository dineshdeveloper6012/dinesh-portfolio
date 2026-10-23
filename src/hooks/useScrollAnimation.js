import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { reduced } from './useMediaQuery';

/* Scoped GSAP: [data-split] word/char reveal, [data-reveal] blur-to-sharp, [data-parallax] depth, [data-count] counters */
export default function useScrollAnimation(ref, enabled = true) {
  useEffect(() => {
    if (!enabled || !ref.current || reduced()) return;
    const small = window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(ref.current);
      q('[data-split]').forEach(el => {
        const c = el.dataset.split === 'c';
        gsap.from(el.querySelectorAll(c ? '.sc' : '.si'), {
          yPercent: 115, opacity: 0, filter: 'blur(10px)', stagger: c ? 0.035 : 0.07, duration: 0.9,
          ease: 'power3.out', clearProps: 'filter', scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      });
      q('[data-reveal]').forEach(el => gsap.from(el, {
        y: 40, opacity: 0, filter: 'blur(6px)', duration: 0.9, ease: 'power3.out', clearProps: 'filter',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true }
      }));
      q('[data-parallax]').forEach(el => gsap.to(el, {
        yPercent: parseFloat(el.dataset.parallax) * (small ? 0.4 : 1), ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
      }));
      q('[data-count]').forEach(el => {
        const end = +el.dataset.count, suf = el.dataset.suffix || '', o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.6, ease: 'power2.out', onUpdate: () => (el.textContent = Math.round(o.v) + suf),
          scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });
    }, ref);
    const r = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => { cancelAnimationFrame(r); ctx.revert(); };
  }, [enabled]);
}
