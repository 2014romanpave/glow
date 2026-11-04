// Vercel Node function: article rating (1–5) -> Telegram notification to Olya
const hits = new Map();
const LIMIT = 10, WINDOW = 60 * 60 * 1000;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method' }); }
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};
  if (b.website) return res.status(200).json({ ok: true });
  const slug = typeof b.slug === 'string' ? b.slug.trim().slice(0, 80) : '';
  const value = Number(b.value), lang = b.lang === 'ua' ? 'ua' : 'pl';
  if (!/^[a-z0-9-]{3,80}$/.test(slug) || !Number.isInteger(value) || value < 1 || value > 5) return res.status(400).json({ ok: false, error: 'invalid' });
  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const now = Date.now(), arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (arr.length >= LIMIT) return res.status(429).json({ ok: false, error: 'rate' });
  arr.push(now); hits.set(ip, arr);
  const token = process.env.GLOW_TG_BOT_TOKEN, chat = process.env.GLOW_TG_CHAT_ID;
  if (!token || !chat) return res.status(503).json({ ok: false, error: 'not_configured' });
  const when = new Intl.DateTimeFormat('uk-UA', { timeZone: 'Europe/Warsaw', dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
  const url = `https://glowpoznan.com${lang === 'ua' ? '/ua' : ''}/blog/${slug}`;
  const text = [`⭐ <b>Оцінка статті: ${'★'.repeat(value)}${'☆'.repeat(5 - value)} (${value}/5)</b>`, '', `📝 <a href="${esc(url)}">${esc(slug)}</a>`, `🌐 Мова: ${lang === 'ua' ? 'українська' : 'польська'}`, `🕒 ${esc(when)} (Варшава)`].join('\n');
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true }) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) return res.status(502).json({ ok: false, error: 'telegram' });
    return res.status(200).json({ ok: true });
  } catch { return res.status(502).json({ ok: false, error: 'telegram' }); }
}
