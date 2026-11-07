import { after, before, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import handler, { credentials, format, resetHits, resolveRoute, validate } from './waitlist.js';

const ENV_KEYS = ['GLOW_TG_BOT_TOKEN', 'GLOW_TG_CHAT_ID', 'GLOW_VIKA_TG_BOT_TOKEN', 'GLOW_VIKA_TG_CHAT_ID'];
const saved = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
const OLA = { token: 'test-ola-token', chat: 'test-ola-chat' };
const VIKA = { token: 'test-vika-token', chat: 'test-vika-chat' };

let calls;
let fetchImpl;

function installFetch(impl) {
  fetchImpl = impl;
  globalThis.fetch = async (url, opts) => impl(url, opts);
}

before(() => {
  process.env.GLOW_TG_BOT_TOKEN = OLA.token;
  process.env.GLOW_TG_CHAT_ID = OLA.chat;
  process.env.GLOW_VIKA_TG_BOT_TOKEN = VIKA.token;
  process.env.GLOW_VIKA_TG_CHAT_ID = VIKA.chat;
});

after(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
});

beforeEach(() => {
  resetHits();
  calls = [];
  installFetch(async (url, opts) => {
    calls.push({ url: String(url), body: JSON.parse(opts.body) });
    return { ok: true, json: async () => ({ ok: true }) };
  });
});

let seq = 0;
function res() {
  const out = { statusCode: 0, headers: {}, body: null };
  out.setHeader = (k, v) => { out.headers[k] = v; };
  out.status = (c) => { out.statusCode = c; return out; };
  out.json = (b) => { out.body = b; return out; };
  return out;
}
function req(method, body, ip) {
  seq += 1;
  return { method, body, headers: { 'x-forwarded-for': ip || `203.0.113.${seq}` }, socket: {} };
}
const person = { name: 'Anna Kowalska', phone: '+48 600 100 200', instagram: '@anna.glow', comment: 'proszę o termin', consent: true, lang: 'pl', page: '/kursy' };

function sent() {
  assert.equal(calls.length, 1);
  return calls[0];
}

test('legacy Ola submission without course fields uses the Ola bot and the original title', async () => {
  const out = res();
  await handler(req('POST', { ...person, level: 'working' }), out);
  assert.equal(out.statusCode, 200);
  assert.deepEqual(out.body, { ok: true });
  const hit = sent();
  assert.equal(hit.url, `https://api.telegram.org/bot${OLA.token}/sendMessage`);
  assert.equal(hit.body.chat_id, OLA.chat);
  assert.match(hit.body.text, /курс каре \/ боб-каре/);
  assert.match(hit.body.text, /Працюючий перукар/);
  assert.doesNotMatch(hit.body.text, /Вікторія|PRO MAKEUP/);
});

test('each Viktoria course routes only to her bot with teacher and course title', async () => {
  const expect = {
    own: 'Makijaż na użytek własny',
    pro: 'PRO MAKEUP od podstaw',
    up: 'Podwyższenie kwalifikacji',
    ws: 'Warsztat na modelce',
  };
  for (const [course, title] of Object.entries(expect)) {
    calls = [];
    const out = res();
    await handler(req('POST', { ...person, teacher: 'vika', course, level: 'experienced', lang: 'pl' }), out);
    assert.equal(out.statusCode, 200, course);
    const hit = sent();
    assert.equal(hit.url, `https://api.telegram.org/bot${VIKA.token}/sendMessage`);
    assert.equal(hit.body.chat_id, VIKA.chat);
    assert.match(hit.body.text, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    assert.match(hit.body.text, /Викладачка:.*Вікторія/);
    assert.doesNotMatch(hit.body.text, /Досвід|каре \/ боб-каре/);
    assert.equal(hit.url.includes(OLA.token), false);
  }
});

test('Ukrainian Viktoria signup uses the Ukrainian course name', async () => {
  const out = res();
  await handler(req('POST', { ...person, teacher: 'vika', course: 'own', lang: 'ua', page: '/ua/kursy' }), out);
  assert.match(sent().body.text, /Макіяж для себе/);
  assert.match(sent().body.text, /українська/);
});

test('a course id alone, without a teacher field, still routes to Viktoria', async () => {
  const out = res();
  await handler(req('POST', { ...person, course: 'ws' }), out);
  assert.equal(sent().body.chat_id, VIKA.chat);
  assert.match(sent().body.text, /Warsztat na modelce/);
});

test('client token and chat id are ignored', async () => {
  const out = res();
  await handler(req('POST', {
    ...person, teacher: 'vika', course: 'pro',
    token: 'client-token', chat_id: 'client-chat',
    GLOW_VIKA_TG_BOT_TOKEN: 'client-vika-token', GLOW_TG_BOT_TOKEN: 'client-ola-token',
  }), out);
  const hit = sent();
  assert.equal(hit.url, `https://api.telegram.org/bot${VIKA.token}/sendMessage`);
  assert.equal(hit.body.chat_id, VIKA.chat);
  assert.equal(JSON.stringify(hit).includes('client-'), false);
});

test('unknown course, unknown teacher, and crossed routes are rejected and send nothing', async () => {
  for (const body of [
    { ...person, course: 'hair' },
    { ...person, course: 'own', teacher: 'ola' },
    { ...person, teacher: 'vika' },
    { ...person, teacher: 'someone', course: 'own' },
    { ...person, course: '<b>x</b>' },
  ]) {
    calls = [];
    const out = res();
    await handler(req('POST', body), out);
    assert.equal(out.statusCode, 400);
    assert.equal(out.body.ok, false);
    assert.equal(calls.length, 0);
  }
});

test('missing consent, bad phone, and invalid Ola level are rejected', async () => {
  for (const body of [
    { ...person, consent: false },
    { ...person, phone: '12' },
    { ...person, level: 'master' },
    { ...person, consent: 'no' },
  ]) {
    calls = [];
    const out = res();
    await handler(req('POST', body), out);
    assert.equal(out.statusCode, 400);
    assert.equal(out.body.error, 'invalid');
    assert.equal(calls.length, 0);
  }
  const noConsent = validate({ ...person, consent: false });
  assert.ok(noConsent.errors.includes('consent'));
});

test('hairdresser level is not required for makeup and an invalid level is dropped', async () => {
  const out = res();
  await handler(req('POST', { ...person, course: 'up', level: 'not-a-level' }), out);
  assert.equal(out.statusCode, 200);
  assert.doesNotMatch(sent().body.text, /Досвід|not-a-level/);
});

test('honeypot, GET, and OPTIONS never send', async () => {
  for (const [method, body] of [['POST', { ...person, website: 'http://spam' }], ['GET', person], ['OPTIONS', person]]) {
    calls = [];
    const out = res();
    await handler(req(method, body), out);
    assert.equal(calls.length, 0);
    if (method === 'POST') assert.deepEqual(out.body, { ok: true });
    else assert.equal(out.statusCode, 405);
  }
});

test('rate limit stops the sixth post and does not send it', async () => {
  const ip = '198.51.100.20';
  for (let i = 0; i < 5; i++) {
    const out = res();
    await handler(req('POST', person, ip), out);
    assert.equal(out.statusCode, 200);
  }
  calls = [];
  const blocked = res();
  await handler(req('POST', person, ip), blocked);
  assert.equal(blocked.statusCode, 429);
  assert.equal(calls.length, 0);
});

test('a missing Viktoria secret fails closed and does not use the Ola bot', async () => {
  delete process.env.GLOW_VIKA_TG_BOT_TOKEN;
  try {
    const out = res();
    await handler(req('POST', { ...person, course: 'pro' }), out);
    assert.equal(out.statusCode, 503);
    assert.equal(out.body.error, 'not_configured');
    assert.equal(calls.length, 0);
  } finally {
    process.env.GLOW_VIKA_TG_BOT_TOKEN = VIKA.token;
  }
});

test('telegram failure is reported as failure', async () => {
  installFetch(async () => ({ ok: false, json: async () => ({ ok: false }) }));
  const out = res();
  await handler(req('POST', person), out);
  assert.equal(out.statusCode, 502);
  assert.equal(out.body.ok, false);
});

test('resolveRoute and credentials stay on the server whitelist', () => {
  assert.deepEqual(resolveRoute({}), { teacher: 'ola', course: '' });
  assert.deepEqual(resolveRoute({ course: 'pro' }), { teacher: 'vika', course: 'pro' });
  assert.equal(resolveRoute({ course: 'nope' }).error, 'course');
  assert.equal(credentials('vika').token, VIKA.token);
  assert.equal(credentials('ola').chat, OLA.chat);
  const text = format({ name: 'A', phone: '+48111', instagram: '', level: '', comment: '', lang: 'pl', page: '', teacher: 'ola', course: '' }, new Date('2026-11-07T10:00:00Z'));
  assert.match(text, /каре \/ боб-каре/);
});
