// Voices: Microsoft neural voices pre-recorded with edge-tts (tools/gen_audio.py) → audio/<voice>/<fnv32>.mp3.
// Narrator voices follow the US/UK setting; characters keep their own voice. Missing clip → Web Speech API.
import { S } from './store.js';

export const VOICES = {
  'us-f': 'en-US-AvaNeural', 'us-m': 'en-US-AndrewNeural',
  'gb-f': 'en-GB-SoniaNeural', 'gb-m': 'en-GB-RyanNeural',
  jay: 'en-US-BrianNeural', diego: 'en-US-RogerNeural', ty: 'en-US-ChristopherNeural',
  liam: 'en-GB-ThomasNeural', maya: 'en-US-EmmaNeural', marcus: 'en-US-SteffanNeural', keisha: 'en-US-AriaNeural', zoe: 'en-US-MichelleNeural',
  'x-f': 'en-US-JennyNeural', 'x-m': 'en-US-GuyNeural', 'x-m2': 'en-US-EricNeural',
};

let known = new Set();
export async function loadAudioIndex() {
  try { known = new Set(await (await fetch('audio/index.json', { cache: 'no-cache' })).json()); } catch (e) { known = new Set(); }
}
export const audioFiles = () => [...known];

export function fnv(text) {
  let h = 0x811c9dc5;
  for (const b of new TextEncoder().encode(text)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}
/** The exact text that is sent to the voice (same function is used by tools/dev.html). */
export function speakable(t) {
  return String(t)
    .replace(/\*\*/g, '')
    .replace(/[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{FE0F}\u{200D}]/gu, '')
    .replace(/[“”]/g, '"').replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ').trim();
}
/** voice key → folder. f/m/me = narrator in the chosen accent. */
export function voiceKey(v = 'f', accent = S.settings.accent) {
  if (v === 'f' || v === 'w') return `${accent}-f`;
  if (v === 'm' || v === 'me') return `${accent}-m`;
  return VOICES[v] ? v : `${accent}-f`;
}
export const fileFor = (text, v) => `${voiceKey(v)}/${fnv(speakable(text))}.mp3`;

const audio = new Audio();
audio.preload = 'auto';
let token = 0, activeBtn = null;

function mark(btn) {
  if (activeBtn) activeBtn.classList.remove('playing');
  activeBtn = btn || null;
  if (activeBtn) activeBtn.classList.add('playing');
}
export function stop() {
  token++;
  audio.pause();
  try { speechSynthesis.cancel(); } catch (e) {}
  mark(null);
}

function playFile(src, rate, my) {
  return new Promise(res => {
    let done = false;
    const fin = ok => { if (done) return; done = true; clearInterval(watch); audio.onended = audio.onerror = null; res(ok); };
    audio.src = src;
    audio.playbackRate = rate;
    audio.onended = () => fin(true);
    audio.onerror = () => fin(false);
    audio.play().catch(() => fin(false));
    const watch = setInterval(() => { if (my !== token) fin(true); }, 200);
  });
}

function systemVoice(lang, v) {
  const all = speechSynthesis.getVoices().filter(x => x.lang.replace('_', '-').startsWith(lang));
  const male = ['m', 'me', 'jay', 'ty', 'diego', 'liam', 'marcus', 'x-m', 'x-m2'].includes(v);
  const pref = male ? ['Guy', 'Andrew', 'Brian', 'Ryan', 'Daniel', 'Aaron', 'Alex', 'Fred', 'Thomas'] : ['Ava', 'Jenny', 'Aria', 'Sonia', 'Samantha', 'Serena', 'Kate', 'Zira'];
  return all.find(x => /natural|neural|premium|enhanced/i.test(x.name) && pref.some(p => x.name.includes(p)))
    || all.find(x => pref.some(p => x.name.includes(p))) || all[0] || null;
}
function speakSystem(text, rate, v) {
  return new Promise(res => {
    if (!('speechSynthesis' in window)) return res();
    const vk = voiceKey(v);
    const lang = vk.startsWith('gb') || vk === 'liam' ? 'en-GB' : 'en-US';
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang; u.rate = rate;
    u.voice = systemVoice(lang, v);
    u.onend = u.onerror = () => res();
    speechSynthesis.speak(u);
    setTimeout(res, 2500 + text.length * 120); // some browsers never fire onend
  });
}

async function one(text, v, rate, my) {
  const clean = speakable(text);
  if (!clean) return;
  const f = `${voiceKey(v)}/${fnv(clean)}.mp3`;
  if (known.has(f)) {
    const ok = await playFile('audio/' + f, rate, my);
    if (ok || my !== token) return;
  }
  if (my === token) await speakSystem(clean, rate, v);
}

/** Speak one line. */
export async function say(text, { v = 'f', rate = S.settings.rate, btn, accent } = {}) {
  stop();
  const my = token;
  const prev = S.settings.accent;
  if (accent) S.settings.accent = accent;
  mark(btn);
  try { await one(text, v, rate, my); } finally { if (accent) S.settings.accent = prev; }
  if (my === token) mark(null);
}

/** Speak lines one after another; onLine(i) highlights the current one. gap = pause after each line (shadowing). */
export async function sequence(lines, { rate = S.settings.rate, btn, onLine, gap = 300 } = {}) {
  stop();
  const my = token;
  mark(btn);
  for (let i = 0; i < lines.length; i++) {
    if (my !== token) return false;
    onLine && onLine(i);
    await one(lines[i].text, lines[i].v, rate, my);
    if (my !== token) return false;
    const g = typeof gap === 'function' ? gap(lines[i]) : gap;
    await new Promise(r => setTimeout(r, g));
  }
  if (my === token) { mark(null); onLine && onLine(-1); }
  return my === token;
}
