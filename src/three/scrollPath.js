/* Scroll-driven connecting line for the portfolio (rendered by ThreeScene's renderer, so one WebGL context).
   - Everything lives in PAGE space; root.position.y = scrollY scrolls it with the content.
   - A single vertical line runs from top-centre to the pointer. Line end and pointer share one value, so they never separate.
   - Each section owns a simple shape whose stroke is revealed with drawRange as the pointer approaches the section centre,
     then lerps to a second colour and glows. All objects are created once; per-frame work is only numeric updates. */

const ACCENT = '#7aaaf2';
const SECTIONS = [ // id, shape, completed colour (brighter Zoho palette tints for contrast on navy), anchor within section
  ['home', 'user', '#F9B21D', 0.55], ['about', 'card', '#1ec974', 0.5], ['expertise', 'code', '#ff5d5f', 0.5],
  ['projects', 'case', '#F9B21D', 0.5], ['process', 'gear', '#1ec974', 0.5], ['services', 'bolt', '#ff5d5f', 0.5], ['contact', 'mail', '#F9B21D', 0.4]
];
const circle = (cx, cy, r, a0 = 0, a1 = Math.PI * 2, n = 40) => Array.from({ length: n + 1 }, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
const gear = () => { const p = []; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; [[.62, -.28], [.9, -.17], [.9, .17], [.62, .28]].forEach(([r, d]) => p.push([r * Math.cos(a + d), r * Math.sin(a + d)])); } p.push(p[0]); return p; };
const SHAPES = {
  user: [[...circle(0, -0.55, 0.62, Math.PI, 0, 30), [-0.62, -0.55]], circle(0, 0.42, 0.3)],
  card: [rect(-.9, -.6, .9, .6), circle(-.45, .1, .2), [[0, .25], [.6, .25]], [[0, -.05], [.6, -.05]], [[-.7, -.38], [.6, -.38]]],
  code: [[[-.35, .5], [-.85, 0], [-.35, -.5]], [[.35, .5], [.85, 0], [.35, -.5]], [[.14, .62], [-.14, -.62]]],
  case: [rect(-.9, -.5, .9, .45), [[-.3, .45], [-.3, .75], [.3, .75], [.3, .45]], [[-.9, -.05], [.9, -.05]]],
  gear: [gear(), circle(0, 0, .28)],
  bolt: [[[.15, .9], [-.5, -.05], [-.05, -.05], [-.2, -.9], [.5, .1], [.05, .1], [.15, .9]]],
  mail: [rect(-.9, -.55, .9, .55), [[-.9, .55], [0, -.1], [.9, .55]]]
};

export function createScrollPath(THREE, { mobile, reduce }) {
  const scene = new THREE.Scene(), root = new THREE.Group(); scene.add(root);
  const camera = new THREE.OrthographicCamera(-1, 1, 0, -1, 0.1, 10); camera.position.z = 5;
  const owned = [], clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), ease = t => t * t * (3 - 2 * t);
  const own = o => (owned.push(o), o);
  const tex = (draw, w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); return own(new THREE.CanvasTexture(c)); };
  const glowTex = tex((g, w, h) => { const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.25, 'rgba(255,255,255,.5)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, w, h); }, 64, 64);
  const beamTex = tex((g, w, h) => { const l = g.createLinearGradient(0, 0, w, 0); l.addColorStop(0, 'rgba(255,255,255,0)'); l.addColorStop(.5, 'rgba(255,255,255,1)'); l.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = l; g.fillRect(0, 0, w, h); }, 64, 4);

  // main line: bright core + soft additive glow, scaled to the pointer height each frame
  const quad = (w, mat) => { const m = new THREE.Mesh(own(new THREE.PlaneGeometry(1, 1)), own(mat)); m.scale.x = w; m.renderOrder = 1; root.add(m); return m; };
  const core = quad(2, new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: .9, depthWrite: false }));
  const beam = quad(mobile ? 12 : 18, new THREE.MeshBasicMaterial({ map: beamTex, color: ACCENT, transparent: true, opacity: .32, blending: THREE.AdditiveBlending, depthWrite: false }));
  const spr = (size, color, op) => { const s = new THREE.Sprite(own(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false }))); s.scale.set(size, size, 1); s.renderOrder = 3; root.add(s); return s; };
  const ptGlow = spr(mobile ? 34 : 52, ACCENT, .85), ptCore = spr(mobile ? 9 : 12, '#ffffff', 1);

  // stroke ribbon for a shape (unit space, scaled by R); drawRange reveals it progressively
  const ribbon = (polys, hw, step) => {
    const pos = [], idx = [];
    polys.forEach(poly => {
      const pts = [];
      for (let i = 0; i < poly.length - 1; i++) { const [ax, ay] = poly[i], [bx, by] = poly[i + 1], n = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / step)); for (let k = 0; k < n; k++) pts.push([ax + (bx - ax) * k / n, ay + (by - ay) * k / n]); }
      pts.push(poly[poly.length - 1]);
      const base = pos.length / 3;
      pts.forEach((p, i) => { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)]; let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l; pos.push(p[0] - ty * hw, p[1] + tx * hw, 0, p[0] + ty * hw, p[1] - tx * hw, 0); });
      for (let i = 0; i < pts.length - 1; i++) { const a = base + i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
    });
    const g = own(new THREE.BufferGeometry()); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx);
    return { g, count: idx.length };
  };
  const c0 = new THREE.Color(ACCENT), tmp = new THREE.Color();
  const shapes = SECTIONS.map(([id, key, done, at]) => {
    const { g, count } = ribbon(SHAPES[key], mobile ? .035 : .02, mobile ? .06 : .035);
    g.setDrawRange(0, 0);
    const mat = own(new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: .7, side: THREE.DoubleSide, depthWrite: false }));
    const mesh = new THREE.Mesh(g, mat); mesh.renderOrder = 2;
    const halo = spr(1, done, 0); halo.renderOrder = 0;
    root.add(mesh);
    return { id, at, mesh, mat, halo, count, done: new THREE.Color(done), cy: 0, R: 80, ok: false };
  });

  let w = 1, h = 1, H = 1, head = 0, T = 0;
  const targetHead = sy => {
    const maxS = Math.max(1, H - h), e = clamp(sy / (h * .6)), endB = clamp((sy - (maxS - h * .5)) / (h * .5));
    const frac = (.08 + .42 * e) * (1 - endB) + .92 * endB; // starts near the top, settles mid-screen, drops to the end
    return Math.min(sy + h * frac, H - 6);
  };
  const api = {
    scene, camera,
    resize(nw, nh) { w = nw; h = nh; camera.left = -w / 2; camera.right = w / 2; camera.top = 0; camera.bottom = -h; camera.updateProjectionMatrix(); api.measure(); },
    measure() { // page-space section anchors; called on resize, ScrollTrigger refresh and layout changes
      H = document.documentElement.scrollHeight;
      const R = clamp(w * .09, mobile ? 40 : 56, 112);
      shapes.forEach(s => {
        const el = document.getElementById(s.id); s.ok = !!el; if (!el) return;
        const r = el.getBoundingClientRect(); s.cy = r.top + window.scrollY + r.height * s.at; s.R = R;
        s.mesh.scale.set(R, R, 1); s.mesh.position.set(0, -s.cy, 0); s.halo.position.set(0, -s.cy, 0); s.halo.scale.set(R * 3, R * 3, 1);
      });
    },
    update(dt, sy) {
      T += dt; const tgt = targetHead(sy);
      head = head === 0 ? tgt : head + (tgt - head) * (reduce ? 1 : Math.min(1, dt * 9));
      root.position.y = sy;
      core.scale.y = beam.scale.y = Math.max(head, 1); core.position.y = beam.position.y = -head / 2;
      ptGlow.position.y = ptCore.position.y = -head;
      const vis = clamp(sy / 70); // 0 at the top of the page -> line appears only once scrolling begins
      core.visible = beam.visible = ptGlow.visible = ptCore.visible = vis > 0.001;
      core.material.opacity = .9 * vis; beam.material.opacity = .32 * vis; ptGlow.material.opacity = .85 * vis; ptCore.material.opacity = vis;
      const pulse = reduce ? 1 : 1 + Math.sin(T * 2.4) * .08; ptGlow.scale.set((mobile ? 34 : 52) * pulse, (mobile ? 34 : 52) * pulse, 1);
      const mid = sy + h / 2;
      shapes.forEach(s => {
        const near = vis > 0.001 && s.ok && Math.abs(s.cy - mid) < h * 1.1; s.mesh.visible = s.halo.visible = near; if (!near) return;
        const p = clamp((head - (s.cy - s.R * 2.2)) / (s.R * 2.2)), t = ease(clamp((head - s.cy) / (s.R * 1.2)));
        const fade = 1 - .85 * clamp((head - (s.cy + s.R * 2.4)) / (s.R * 3)); // ghosts out after the pointer moves on
        s.mesh.geometry.setDrawRange(0, Math.floor(p * s.count / 6) * 6);
        s.mat.color.copy(tmp.copy(c0).lerp(s.done, t)); s.mat.opacity = (.6 + .35 * t) * fade * vis;
        s.halo.material.opacity = (mobile ? .16 : .3) * t * fade * vis;
      });
    },
    dispose() { owned.forEach(o => o.dispose()); }
  };
  return api;
}
