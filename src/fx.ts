const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const root = document.documentElement;

export function startFx() {
  // load fly-in
  requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('in')));
  setTimeout(() => root.classList.add('settled'), 1600);

  // scroll reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.rv, .reveal-img').forEach((el) => io.observe(el));

  // photo swap with clip-path reveal
  const feat = document.querySelector<HTMLImageElement>('[data-feature]');
  let current = feat?.getAttribute('src') ?? '';
  let busy = false;
  const swap = (src: string, btn: Element) => {
    if (!feat || src === current || busy) return;
    document.querySelectorAll('.thumb.is-active').forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    current = src;
    const box = feat.parentElement!;
    const img = new Image();
    img.src = src; img.alt = feat.alt; img.className = 'absolute inset-0 h-full w-full object-cover incoming';
    if (reduce) { feat.src = src; return; }
    busy = true;
    const go = () => { box.appendChild(img); requestAnimationFrame(() => requestAnimationFrame(() => img.classList.add('go'))); setTimeout(() => { feat.src = src; img.remove(); busy = false; }, 950); };
    img.decode ? img.decode().then(go, go) : go();
  };
  let hoverT = 0;
  document.querySelectorAll<HTMLElement>('[data-swap]').forEach((b) => {
    b.addEventListener('click', () => swap(b.dataset.swap!, b));
    if (fine) b.addEventListener('mouseenter', () => { clearTimeout(hoverT); hoverT = window.setTimeout(() => swap(b.dataset.swap!, b), 140); });
  });

  if (reduce) return;

  // magnetic / parallax grid on desktop
  const area = document.querySelector<HTMLElement>('[data-magnet-area]');
  if (area && fine) {
    const thumbs = [...area.querySelectorAll<HTMLElement>('.thumb')];
    let raf = 0;
    area.parentElement!.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = area.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        thumbs.forEach((t) => { const d = Number(t.dataset.depth || 0.5); t.style.setProperty('--mx', `${(-nx * 28 * d).toFixed(1)}px`); t.style.setProperty('--my', `${(-ny * 22 * d).toFixed(1)}px`); });
      });
    });
  }

  // scroll parallax for giant words
  const par = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (par.length) {
    let ticking = false;
    const upd = () => { const y = scrollY; par.forEach((el) => { const f = Number(el.dataset.parallax); const base = el.classList.contains('-translate-x-1/2') ? 'translateX(-50%) ' : ''; el.style.transform = `${base}translate3d(0, ${(y * f).toFixed(1)}px, 0)`; }); ticking = false; };
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
    upd();
  }

  // draggable carousels with inertia (mouse; touch uses native scrolling)
  document.querySelectorAll<HTMLElement>('[data-drag]').forEach((el) => {
    let down = false, x0 = 0, s0 = 0, lastX = 0, lastT = 0, v = 0, moved = 0, raf = 0;
    el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; x0 = lastX = e.clientX; s0 = el.scrollLeft; lastT = performance.now(); v = 0; cancelAnimationFrame(raf); el.classList.add('grabbing'); });
    addEventListener('pointermove', (e) => { if (!down) return; const now = performance.now(); v = (e.clientX - lastX) / Math.max(1, now - lastT); lastX = e.clientX; lastT = now; moved += Math.abs(e.movementX); el.scrollLeft = s0 - (e.clientX - x0); });
    addEventListener('pointerup', () => { if (!down) return; down = false; el.classList.remove('grabbing'); let vel = v * 16; const step = () => { el.scrollLeft -= vel; vel *= 0.94; if (Math.abs(vel) > 0.4) raf = requestAnimationFrame(step); }; step(); });
    el.addEventListener('click', (e) => { if (moved > 6) { e.stopPropagation(); e.preventDefault(); } }, true);
  });

  // custom cursor
  const cur = document.querySelector<HTMLElement>('.cursor');
  if (cur && fine) {
    const dot = cur.firstElementChild as HTMLElement;
    let tx = -100, ty = -100, cx = -100, cy = -100;
    addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      const t = (e.target as Element).closest?.('[data-cursor]') as HTMLElement | null;
      cur.classList.toggle('lbl', !!t); if (t) dot.textContent = t.dataset.cursor || '';
      cur.classList.toggle('dark', !!(e.target as Element).closest?.('.bg-black'));
    });
    const loop = () => { cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2; cur.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; requestAnimationFrame(loop); };
    loop();
  }
}
