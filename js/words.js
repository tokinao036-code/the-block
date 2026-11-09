// Tap-any-word: tokenizer, lemmatizer, IPA → Russian letters, the word sheet, personal dictionary.
import { LEX, FORMS, PHRASES, IRREG } from './data/glossary.js';
import { SLANG, LEVELS } from './data/slang.js';
import { S, save, addXP } from './store.js';
import { esc, attr, icon, openSheet, closeSheet, toast, haptic } from './ui.js';
import { say, speakable } from './tts.js';
import { addCard } from './srs.js';

/* ---------- glossary ---------- */
export const DICT = new Map();
for (const line of LEX.split('\n')) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const [w, pos, ipa, ru] = t.split('|').map(s => s.trim());
  if (w) DICT.set(w.toLowerCase(), { w, pos, ipa, ru });
}
const PHR = PHRASES.map(([p, ru]) => ({ p: p.toLowerCase(), ru, re: new RegExp(`\\b${p.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/ /g, '\\s+')}\\b`, 'i') }));
const SLANG_W = new Map();
for (const s of SLANG) for (const part of s.w.toLowerCase().split(' / ')) SLANG_W.set(part.replace(/\*/g, 'u'), s);

const norm = w => w.toLowerCase().replace(/[’‘]/g, "'");

/** Find the dictionary entry for any surface form: went → go, studies → study, Jay's → jay. */
export function lookup(raw) {
  const w = norm(raw);
  const tries = [w];
  const add = x => { if (x && x.length > 1) tries.push(x); };
  if (FORMS[w]) tries.push(FORMS[w]);
  if (w.endsWith("'s")) add(w.slice(0, -2));
  if (w.endsWith("s'")) add(w.slice(0, -1));
  if (w.endsWith('ies')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('es')) add(w.slice(0, -2));
  if (w.endsWith('s')) add(w.slice(0, -1));
  if (w.endsWith('ied')) add(w.slice(0, -3) + 'y');
  if (w.endsWith('ed')) { add(w.slice(0, -2)); add(w.slice(0, -1)); if (/(.)\1ed$/.test(w)) add(w.slice(0, -3)); }
  if (w.endsWith('ing')) { add(w.slice(0, -3)); add(w.slice(0, -3) + 'e'); if (/(.)\1ing$/.test(w)) add(w.slice(0, -4)); }
  if (w.endsWith('er')) { add(w.slice(0, -2)); add(w.slice(0, -1)); if (/(.)\1er$/.test(w)) add(w.slice(0, -3)); }
  if (w.endsWith('est')) { add(w.slice(0, -3)); add(w.slice(0, -2)); if (/(.)\1est$/.test(w)) add(w.slice(0, -4)); }
  if (w.endsWith('ly')) { add(w.slice(0, -2)); if (w.endsWith('ily')) add(w.slice(0, -3) + 'y'); }
  // stretched texting forms: duuude, lmaooo, sooo
  if (/(.)\1\1/.test(w)) { add(w.replace(/(.)\1{2,}/g, '$1')); add(w.replace(/(.)\1{2,}/g, '$1$1')); }
  for (const t of tries) {
    if (DICT.has(t)) return { key: t, e: DICT.get(t), form: w };
    if (FORMS[t] && DICT.has(FORMS[t])) return { key: FORMS[t], e: DICT.get(FORMS[t]), form: w };
  }
  return null;
}

/* ---------- rendering: every word becomes tappable ---------- */
const WORD_RE = /[A-Za-z]+(?:['’][A-Za-z]+)*(?:-[A-Za-z]+(?:['’][A-Za-z]+)*)*/g;

function tokensHTML(seg) {
  let out = '', last = 0;
  seg.replace(WORD_RE, (m, i) => {
    out += esc(seg.slice(last, i));
    if (m.includes('-') && !DICT.has(norm(m))) out += m.split('-').map(p => `<span class="w">${esc(p)}</span>`).join('-');
    else out += `<span class="w">${esc(m)}</span>`;
    last = i + m.length;
    return m;
  });
  return out + esc(seg.slice(last));
}

/** HTML of an English text with tappable words; **x** → highlighted grammar. */
export function words(text) {
  return String(text).split('**').map((seg, i) => i % 2 ? `<mark>${tokensHTML(seg)}</mark>` : tokensHTML(seg)).join('').replace(/\n/g, '<br>');
}

/** English line element: knows its voice and translation, so the word sheet can play the sentence. */
export function en(text, { v = 'f', ru = '', tag = 'span', cls = '' } = {}) {
  return `<${tag} class="en ${cls}" data-say="${attr(text)}" data-v="${v}"${ru ? ` data-ru="${attr(ru)}"` : ''}>${words(text)}</${tag}>`;
}

/* ---------- IPA → Russian letters (American pronunciation) ---------- */
const ACUTE = '\u0301';
const VOW = [['eɪ', 'эй'], ['aɪ', 'ай'], ['ɔɪ', 'ой'], ['oʊ', 'оу'], ['əʊ', 'оу'], ['aʊ', 'ау'], ['ɪə', 'иэ'], ['eə', 'эа'], ['ʊə', 'уэ'],
  ['ɝː', 'Ёр'], ['ɝ', 'Ёр'], ['ɚ', 'эр'], ['iː', 'и'], ['uː', 'у'], ['ɑː', 'а'], ['ɔː', 'о'], ['ɜː', 'Ё'],
  ['i', 'и'], ['ɪ', 'и'], ['ɛ', 'Е'], ['e', 'Е'], ['æ', 'э'], ['ɑ', 'а'], ['ɒ', 'о'], ['ɔ', 'о'], ['ʌ', 'а'], ['ʊ', 'у'], ['u', 'у'], ['ə', 'э'], ['ɜ', 'Ё'], ['o', 'о'], ['a', 'а']];
const CON = [['tʃ', 'ч'], ['dʒ', 'дж'], ['p', 'п'], ['b', 'б'], ['t', 'т'], ['d', 'д'], ['k', 'к'], ['ɡ', 'г'], ['g', 'г'], ['f', 'ф'], ['v', 'в'], ['θ', 'с'], ['ð', 'з'],
  ['s', 'с'], ['z', 'з'], ['ʃ', 'ш'], ['ʒ', 'ж'], ['h', 'х'], ['m', 'м'], ['n', 'н'], ['ŋ', 'н'], ['l', 'л'], ['ɫ', 'л'], ['r', 'р'], ['ɹ', 'р'], ['w', 'у'], ['x', 'х'], ['ɾ', 'т']];

function ipaWord(word) {
  const toks = []; let i = 0, stress = false;
  const w = word.replace(/'/g, 'ˈ');
  while (i < w.length) {
    const ch = w[i];
    if (ch === 'ˈ') { stress = true; i++; continue; }
    if ('ˌ.()‿ʔ̩ː '.includes(ch)) { i++; continue; }
    if (ch === 'j') { toks.push(['j', 'j', 'й', false]); i++; continue; }
    const v = VOW.find(([p]) => w.startsWith(p, i));
    if (v) { toks.push(['v', v[0], v[1], stress]); stress = false; i += v[0].length; continue; }
    const c = CON.find(([p]) => w.startsWith(p, i));
    if (c) { toks.push(['c', c[0], c[1], false]); i += c[0].length; continue; }
    i++; // unknown symbol: skip
  }
  const nv = toks.filter(t => t[0] === 'v').length;
  let out = '';
  toks.forEach((t, k) => {
    let [kind, ipa, ru, st] = t;
    const prev = toks[k - 1], nxt = toks[k + 1];
    if (kind === 'j') {
      if (nxt && nxt[0] === 'v' && /^(u|ʊ)/.test(nxt[1])) { nxt[2] = (prev && prev[0] === 'c' ? 'ью' : 'ю') + nxt[2].slice(1); return; }
      out += 'й'; return;
    }
    if (kind === 'c' && ipa === 'w') { out += nxt && /^(ʊ|u|ɝ|ɜ)/.test(nxt[1]) ? 'в' : 'у'; return; }
    if (kind === 'c' && ipa === 'ŋ') { out += nxt && /^(k|ɡ|g)/.test(nxt[1]) ? 'н' : 'нг'; return; }
    if (kind === 'c' && (ipa === 'r' || ipa === 'ɹ') && prev && prev[0] === 'v' && /р$/.test(prev[2])) return; // ɚ + r
    if (kind === 'v') {
      const afterC = prev && (prev[0] === 'c' || prev[0] === 'j');
      if (ru[0] === 'Е') ru = (afterC ? 'е' : 'э') + ru.slice(1);
      if (ru[0] === 'Ё') ru = (afterC ? 'ё' : 'э') + ru.slice(1);
      if (st && nv > 1 && ru[0] !== 'ё') { const m = ru.search(/[аеиоуыэюя]/); ru = ru.slice(0, m + 1) + ACUTE + ru.slice(m + 1); }
    }
    out += ru;
  });
  return out;
}
export const ipaRu = ipa => ipa ? ipa.replace(/^\/|\/$/g, '').split(/(\s+)/).map(p => /\s/.test(p) ? p : ipaWord(p)).join('').normalize('NFC') : '';

/* ---------- POS labels ---------- */
const POS = { n: 'сущ.', v: 'глаг.', adj: 'прил.', adv: 'нареч.', prep: 'предлог', pron: 'местоим.', conj: 'союз', det: 'артикль / опред.', excl: 'междом.', phr: 'фраза', contr: 'сокращение', name: 'имя', num: 'числ.', abbr: 'сокращение', slang: 'сленг', modal: 'модальный глаг.', aux: 'вспом. глаг.', place: 'место', brand: 'бренд' };

/* ---------- online fallback for words outside the glossary ---------- */
const CACHE_KEY = 'theblock.webdict';
let webCache = {};
try { webCache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}'); } catch (e) {}
async function webLookup(w) {
  if (webCache[w]) return webCache[w];
  const r = { ipa: '', ru: '' };
  try {
    const d = await (await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(w)}`)).json();
    if (Array.isArray(d)) r.ipa = (d[0].phonetics || []).map(p => p.text).find(Boolean) || d[0].phonetic || '';
  } catch (e) {}
  try {
    const t = await (await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(w)}&langpair=en|ru`)).json();
    r.ru = (t.responseData && t.responseData.translatedText) || '';
  } catch (e) {}
  r.ipa = r.ipa.replace(/^\/|\/$/g, '');
  if (r.ru || r.ipa) { webCache[w] = r; try { localStorage.setItem(CACHE_KEY, JSON.stringify(webCache)); } catch (e) {} }
  return r;
}

/* ---------- the word sheet ---------- */
function slangFor(key, form, ctx) {
  const s = SLANG_W.get(key) || SLANG_W.get(form);
  if (s) return s;
  return SLANG.find(x => x.w.includes(' ') && x.w.toLowerCase().split(' / ').some(p => p.split(' ').includes(form) && ctx.toLowerCase().includes(p)));
}

export function openWord(el) {
  const raw = el.textContent;
  const host = el.closest('[data-say]');
  const ctx = host ? host.dataset.say : '';
  const ctxV = host ? host.dataset.v : 'f';
  const ctxRu = host ? host.dataset.ru || '' : '';
  const hit = lookup(raw);
  const key = hit ? hit.key : norm(raw);
  const e = hit ? hit.e : null;
  const forms = IRREG[key];
  const phrase = ctx ? PHR.find(p => p.re.test(ctx) && p.p.split(/\s+/).some(x => x === norm(raw) || x === key)) : null;
  const sl = slangFor(key, norm(raw), ctx);
  const saved = !!S.words[key];
  const ipa = e ? e.ipa : '';
  const head = e ? e.w : raw;
  const display = norm(raw) !== key && e ? `${esc(raw)} <span class="ws-lemma">→ ${esc(e.w)}</span>` : esc(head);

  const body = openSheet(`
    <div class="ws">
      <div class="ws-top">
        <div class="ws-word">${display}</div>
        ${e && e.pos ? `<span class="chip">${POS[e.pos] || esc(e.pos)}</span>` : ''}
      </div>
      <div class="ws-ipa" ${ipa ? '' : 'hidden'}><span class="ipa">/${esc(ipa)}/</span><span class="ru-tr">[${esc(ipaRu(ipa))}]</span></div>
      <div class="ws-play">
        <button class="pill btn-say" data-acc="us">${icon('sound')} US</button>
        <button class="pill btn-say" data-acc="gb">${icon('sound')} UK</button>
        <button class="pill btn-say" data-slow="1">${icon('slow')} медленно</button>
      </div>
      <div class="ws-ru">${e ? esc(e.ru) : '<span class="muted">ищу перевод…</span>'}</div>
      ${forms ? `<div class="ws-forms">${icon('repeat')} ${esc(e.w)} — ${esc(forms[0])} — ${esc(forms[1])}</div>` : ''}
      ${phrase ? `<div class="ws-phrase"><b>${esc(phrase.p)}</b> — ${esc(phrase.ru)}</div>` : ''}
      ${sl ? `<div class="ws-slang" style="--lv:${LEVELS[sl.lvl].color}"><span class="lv">${LEVELS[sl.lvl].label}</span> ${esc(sl.ru)}<br><small>Можно: ${esc(sl.ok)} · Нельзя: ${esc(sl.no)}</small></div>` : ''}
      ${ctx ? `<div class="ws-ex"><button class="icon-btn btn-ctx" aria-label="Озвучить пример">${icon('play')}</button><div><div class="ws-ex-en">${highlight(ctx, raw)}</div>${ctxRu ? `<div class="ws-ex-ru">${esc(ctxRu)}</div>` : ''}</div></div>` : ''}
      <button class="btn ${saved ? 'ghost' : 'primary'} wide btn-save">${saved ? icon('saved') + ' В словаре' : icon('plus') + ' В мой словарь'}</button>
    </div>`, { cls: 'word-sheet' });

  const wordText = sayForm(raw, e);
  body.querySelectorAll('.btn-say').forEach(b => b.addEventListener('click', () => {
    say(wordText, { v: 'w', btn: b, accent: b.dataset.acc, rate: b.dataset.slow ? 0.6 : S.settings.rate });
  }));
  const ctxBtn = body.querySelector('.btn-ctx');
  ctxBtn && ctxBtn.addEventListener('click', () => say(ctx, { v: ctxV, btn: ctxBtn }));
  say(wordText, { v: 'w' });

  let data = e ? { w: e.w, ru: e.ru, ipa: e.ipa, pos: e.pos } : null;
  if (!e) {
    webLookup(norm(raw)).then(r => {
      if (!document.body.contains(body)) return;
      data = { w: raw, ru: r.ru || '—', ipa: r.ipa, pos: '' };
      body.querySelector('.ws-ru').innerHTML = r.ru ? `${esc(r.ru)} <small class="muted">(онлайн-перевод)</small>` : '<span class="muted">Нет перевода офлайн</span>';
      if (r.ipa) { const box = body.querySelector('.ws-ipa'); box.hidden = false; box.innerHTML = `<span class="ipa">/${esc(r.ipa)}/</span><span class="ru-tr">[${esc(ipaRu(r.ipa))}]</span>`; }
    });
  }
  body.querySelector('.btn-save').addEventListener('click', ev => {
    const b = ev.currentTarget;
    if (S.words[key]) {
      delete S.words[key]; delete S.cards[key]; save();
      b.className = 'btn primary wide btn-save'; b.innerHTML = icon('plus') + ' В мой словарь';
      return;
    }
    if (!data) data = { w: raw, ru: '', ipa: '' };
    S.words[key] = { ...data, ex: ctx ? speakable(ctx) : '', exRu: ctxRu, exV: ctxV, added: Date.now() };
    addCard(key);
    addXP(2);
    haptic();
    b.className = 'btn ghost wide btn-save'; b.innerHTML = icon('saved') + ' В словаре';
    toast(`${icon('saved')} «${esc(data.w)}» — в словаре. Повторим в карточках`);
  });
}

function highlight(ctx, raw) {
  const t = esc(speakable(ctx));
  const r = esc(raw).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return t.replace(new RegExp(`\\b(${r})\\b`, 'i'), '<b>$1</b>');
}

/** Global: tap on any .w opens the sheet. */
export function bindWords(root = document) {
  root.addEventListener('click', ev => {
    const w = ev.target.closest('.w');
    if (!w || w.closest('.no-tap')) return;
    ev.stopPropagation();
    openWord(w);
  });
}

/** All tokens of a text (for tools/dev.html). */
export function tokens(text) { return (speakable(text).match(WORD_RE) || []); }
export { closeSheet };

/** The exact form a single word is voiced in (lowercase unless it is a name / "I"). Used by tools/dev.html too. */
export function sayForm(raw, e = lookup(raw) && lookup(raw).e) {
  const t = String(raw).replace(/[’‘]/g, "'");
  if (e && (e.pos === 'name' || e.pos === 'place' || e.pos === 'brand') && norm(t) === e.w.toLowerCase()) return e.w;
  if (/^(I|I'm|I'll|I've|I'd|OK)$/.test(t)) return t;
  if (/^[A-Z]{2,}$/.test(t)) return t; // GOAT, BYOB, NYC
  return t.toLowerCase();
}
