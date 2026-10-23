import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { orbitApps, STAGE_IDS } from '../data/zohoApps';
import { createScrollPath } from '../three/scrollPath';

/* Real Zoho app icons orbit the centred Zoho logo. Scroll picks the focused app; after the hero the whole system drifts aside. */
export default function ThreeScene() {
  const canvasRef = useRef(), capRef = useRef();
  useEffect(() => {
    let disposed = false, cleanup = () => {};
    import('three').then(THREE => {
      if (disposed) return;
      const canvas = canvasRef.current, cap = capRef.current;
      const mobile = window.innerWidth < 768, reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !mobile, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1 : 1.5));
      const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
      camera.position.z = 10;
      renderer.autoClear = false; // two passes: connecting line (behind) then the Zoho orbit
      const path = createScrollPath(THREE, { mobile, reduce });
      const group = new THREE.Group(); scene.add(group);
      const loader = new THREE.TextureLoader(), disposables = [];
      const fit = (s, f) => s.scale.set(s.userData.w * f, s.userData.w * f * (s.userData.ar || 1), 1);
      const mk = (url, w) => {
        const m = new THREE.SpriteMaterial({ transparent: true, depthWrite: false });
        const s = new THREE.Sprite(m); s.userData.w = w; s.visible = false; disposables.push(m);
        loader.load(url, t => {
          if (disposed) return t.dispose();
          t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; m.map = t; m.needsUpdate = true;
          s.userData.ar = t.image.height / t.image.width; s.visible = true; disposables.push(t);
        });
        return s;
      };
      const core = mk('/logo-dark.webp', mobile ? 3.6 : 3); group.add(core); // always at the group's origin = centred
      const apps = orbitApps.slice(0, mobile ? 8 : 10);
      const iw = mobile ? 1.5 : 1.2;
      const nodes = apps.map((a, i) => {
        const s = mk(a.icon, iw); group.add(s);
        return { s, id: a.id, name: a.name, k: 0, ang: (i / apps.length) * Math.PI * 2, r: 3.3 + (i % 3) * 0.5, y: ((i % 4) - 1.5) * 0.3 };
      });
      let lines = null, lpos = null, lm = null;
      if (!mobile) {
        lpos = new Float32Array(nodes.length * 6);
        const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.BufferAttribute(lpos, 3));
        lm = new THREE.LineBasicMaterial({ color: 0x6fa3f0, transparent: true, opacity: 0.18 });
        lines = new THREE.LineSegments(lg, lm); lines.frustumCulled = false; group.add(lines); disposables.push(lg, lm);
      }
      const N = mobile ? 40 : 120, pp = new Float32Array(N * 3);
      for (let i = 0; i < N * 3; i++) pp[i] = (Math.random() - 0.5) * 20;
      const pg = new THREE.BufferGeometry(); pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
      const pm = new THREE.PointsMaterial({ color: 0x6fa3f0, size: 0.05, transparent: true, opacity: 0.55 });
      const pts = new THREE.Points(pg, pm); scene.add(pts); disposables.push(pg, pm);

      let sy = window.scrollY, stage = 0, prog = 0, mx = 0, my = 0, ek = 0, base = 1, heroY = 1.4, wide = true;
      const st = ScrollTrigger.create({
        start: 0, end: 'max',
        onUpdate: s => {
          prog = s.progress; sy = s.scroll();
          const n = Math.min(STAGE_IDS.length - 1, Math.round(prog * (STAGE_IDS.length - 1) * 1.15));
          if (n !== stage) { stage = n; const a = nodes.find(x => x.id === STAGE_IDS[n]); cap.textContent = a ? a.name : ''; }
        }
      });
      const size = () => {
        const w = window.innerWidth, h = window.innerHeight;
        renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
        wide = w > 992; path.resize(w, h);
        const vw = 2 * Math.tan(THREE.MathUtils.degToRad(25)) * 10 * camera.aspect; // visible width at z=0
        base = Math.min(wide ? 0.95 : 1, (vw / 2 - 0.5) / 4.4);
        heroY = wide ? 1.35 : 1.9;
      };
      const move = e => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
      size(); window.addEventListener('resize', size);
      const onRefresh = () => path.measure(); ScrollTrigger.addEventListener('refresh', onRefresh);
      let mq = 0; const ro = new ResizeObserver(() => { cancelAnimationFrame(mq); mq = requestAnimationFrame(onRefresh); }); ro.observe(document.body); // lazy sections / images change page height
      if (!mobile && !reduce) window.addEventListener('pointermove', move, { passive: true });

      const clock = new THREE.Clock(), rate = reduce ? 40 : 1;
      let cs = 1.4, fade = 1;
      const tick = () => {
        raf = requestAnimationFrame(tick);
        const dt = Math.min(clock.getDelta(), 0.05), active = STAGE_IDS[stage];
        ek += (Math.min(window.scrollY / (window.innerHeight * 0.9), 1) - ek) * Math.min(1, dt * 4 * rate);
        fade = 1 - ek * (wide ? 0.4 : 0.72); // fade the orbit itself (not the canvas) so the line stays crisp
        group.position.x = wide ? 4.1 * ek : 0;
        group.position.y = heroY + ((wide ? 0 : 1.2) - heroY) * ek;
        group.scale.setScalar(base * (wide ? 1 - 0.12 * ek : 1));
        nodes.forEach((n, i) => {
          n.k += ((n.id === active ? 1 : 0) - n.k) * Math.min(1, dt * 3.5 * rate);
          if (!reduce) n.ang += dt * 0.16 * (1 - n.k * 0.85);
          const x = Math.cos(n.ang) * n.r, y = Math.sin(n.ang) * n.r * 0.42 + n.y, z = Math.sin(n.ang) * n.r * 0.5;
          n.s.position.set(x * (1 - n.k), y + (0.2 - y) * n.k, z + (2.8 - z) * n.k);
          fit(n.s, 1 + n.k * 1.1);
          n.s.material.opacity = (active ? 0.3 + 0.7 * n.k : 1) * fade;
          if (lpos) lpos.set([0, 0, 0, n.s.position.x, n.s.position.y, n.s.position.z], i * 6);
        });
        if (lines) lines.geometry.attributes.position.needsUpdate = true;
        cs += ((active ? 0.8 : 1) - cs) * Math.min(1, dt * 3 * rate); fit(core, cs);
        core.material.opacity = (active ? 0.4 : 1) * fade; if (lm) lm.opacity = 0.18 * fade; pm.opacity = 0.55 * fade;
        group.rotation.y += ((mx * 0.4) - group.rotation.y) * 0.05; group.rotation.x += ((my * 0.25) - group.rotation.x) * 0.05;
        pts.rotation.y = prog * 2.2; pts.position.y = prog * 3;
                cap.style.opacity = String(Math.min(ek * 2, 1));
        path.update(dt, sy);
        renderer.clear(); renderer.render(path.scene, path.camera); renderer.clearDepth(); renderer.render(scene, camera);
      };
      let raf = requestAnimationFrame(tick);
      cleanup = () => {
        cancelAnimationFrame(raf); cancelAnimationFrame(mq); st.kill(); ro.disconnect(); ScrollTrigger.removeEventListener('refresh', onRefresh); path.dispose();
        window.removeEventListener('resize', size); window.removeEventListener('pointermove', move);
        disposables.forEach(d => d.dispose()); renderer.dispose(); renderer.forceContextLoss();
      };
    });
    return () => { disposed = true; cleanup(); };
  }, []);
  return <><canvas ref={canvasRef} className="scene" aria-hidden="true" /><div ref={capRef} className="scene-cap" aria-hidden="true" /></>;
}
