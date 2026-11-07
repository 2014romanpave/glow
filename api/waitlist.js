// Vercel Node function: course waitlist -> Telegram.
// Route is chosen only from a server-side course whitelist and server env.
// Client-supplied tokens, chat ids, or course titles are never used.
const hits = new Map(); // ip -> [timestamps]
const LIMIT = 5, WINDOW = 10 * 60 * 1000;
const LEVELS = { beginner: 'Початківець', working: 'Працюючий перукар', experienced: 'Досвідчений майстер' };
export const VIKA_COURSES = {
  own: { pl: 'Makijaż na użytek własny', ua: 'Макіяж для себе' },
  pro: { pl: 'PRO MAKEUP od podstaw', ua: 'PRO MAKEUP з нуля' },
  up: { pl: 'Podwyższenie kwalifikacji', ua: 'Підвищення кваліфікації' },
  ws: { pl: 'Warsztat na modelce', ua: 'Майстер-клас на моделі' },
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

export function resetHits() { hits.clear(); }

/** Whitelist the course. Unknown course or teacher is an error, never a fallback route. */
export function resolveRoute(b) {
  const course = clip(b?.course, 40);
  const teacher = clip(b?.teacher, 20);
  if (teacher && teacher !== 'ola' && teacher !== 'vika') return { error: 'teacher' };
  if (course && !VIKA_COURSES[course]) return { error: 'course' };
  if (teacher === 'ola' && course) return { error: 'course' };
  if (teacher === 'vika' && !VIKA_COURSES[course]) return { error: 'course' };
  if (VIKA_COURSES[course]) return { teacher: 'vika', course };
  return { teacher: 'ola', course: '' };
}

export function credentials(teacher, env = process.env) {
  if (teacher === 'vika') return { token: env.GLOW_VIKA_TG_BOT_TOKEN || '', chat: env.GLOW_VIKA_TG_CHAT_ID || '' };
  return { token: env.GLOW_TG_BOT_TOKEN || '', chat: env.GLOW_TG_CHAT_ID || '' };
}

export function validate(b) {
  const route = resolveRoute(b);
  const vika = route.teacher === 'vika';
  const d = {
    name: clip(b.name, 80), phone: clip(b.phone, 32), instagram: clip(b.instagram, 60).replace(/^@/, ''),
    level: vika ? '' : clip(b.level, 20), comment: clip(b.comment, 1000), lang: b.lang === 'ua' ? 'ua' : 'pl', page: clip(b.page, 100),
    consent: b.consent === true || b.consent === 'on' || b.consent === 'true',
    teacher: route.teacher || '', course: route.course || '',
  };
  const errors = [];
  if (route.error) errors.push(route.error);
  if (d.name.length < 2) errors.push('name');
  if (!/^\+?[\d\s()-]{7,20}$/.test(d.phone) || d.phone.replace(/\D/g, '').length < 7) errors.push('phone');
  if (d.instagram && !/^[A-Za-z0-9._]{1,30}$/.test(d.instagram)) errors.push('instagram');
  if (!vika && d.level && !LEVELS[d.level]) errors.push('level');
  if (!d.consent) errors.push('consent');
  return { d, errors };
}

export function format(d, now = new Date()) {
  const when = new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Warsaw', dateStyle: 'medium', timeStyle: 'short' }).format(now);
  const tel = d.phone.replace(/[^\d+]/g, '');
  const who = [`👤 <b>Імʼя:</b> ${esc(d.name)}`, `📞 <b>Телефон:</b> <a href="tel:${esc(tel)}">${esc(d.phone)}</a>`];
  if (d.instagram) who.push(`📸 <b>Instagram:</b> <a href="https://instagram.com/${esc(d.instagram)}">@${esc(d.instagram)}</a>`);
  const tail = ['', `🌐 Мова сайту: ${d.lang === 'ua' ? 'українська' : 'польська'}${d.page ? ` · ${esc(d.page)}` : ''}`, `🕒 ${esc(when)} (Варшава)`];
  if (d.teacher === 'vika') {
    const course = VIKA_COURSES[d.course];
    const name = course[d.lang] || course.pl;
    const L = [`🎓 <b>Нова заявка — ${esc(name)}</b>`, '', `👩‍🏫 <b>Викладачка:</b> Вікторія`, `📚 <b>Курс:</b> ${esc(name)}`, ...who];
    if (d.comment) L.push(`💬 <b>Коментар:</b> ${esc(d.comment)}`);
    L.push(...tail);
    return L.join('\n');
  }
  const L = ['🎓 <b>Нова заявка в лист очікування — курс каре / боб-каре</b>', '', ...who];
  if (d.level) L.push(`✂️ <b>Досвід:</b> ${LEVELS[d.level]}`);
  if (d.comment) L.push(`💬 <b>Коментар:</b> ${esc(d.comment)}`);
  L.push(...tail);
  return L.join('\n');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};
  if (b.website) return res.status(200).json({ ok: true }); // honeypot: pretend success, send nothing
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const now = Date.now(), arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (arr.length >= LIMIT) return res.status(429).json({ ok: false, error: 'rate' });
  const { d, errors } = validate(b);
  if (errors.length) return res.status(400).json({ ok: false, error: 'invalid', fields: errors });
  arr.push(now); hits.set(ip, arr);
  const { token, chat } = credentials(d.teacher);
  if (!token || !chat) return res.status(503).json({ ok: false, error: 'not_configured' });
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat, text: format(d), parse_mode: 'HTML', disable_web_page_preview: true }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) return res.status(502).json({ ok: false, error: 'telegram' });
    return res.status(200).json({ ok: true });
  } catch { return res.status(502).json({ ok: false, error: 'telegram' }); }
}
