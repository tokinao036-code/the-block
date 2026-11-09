// Shared content blocks used by lessons and by the library: scene, chunks, grammar, meme, slang, culture, email, texting, watch.
import { esc, icon, ytSearch } from './ui.js';
import { en, words } from './words.js';
import { say, sequence, stop } from './tts.js';
import { S, save, addXP, today } from './store.js';
import { diff } from './check.js';
import { GRAMMAR } from './data/grammar.js';
import { slangById, LEVELS } from './data/slang.js';
import { cultureById } from './data/culture.js';
import { speaker, CHARS } from './data/chars.js';
import { img, avatar } from './img.js';
import { DIM } from './data/images.js';
const ar = (k, min = 0.75) => { const d = DIM[k]; return d ? `aspect-ratio:${Math.max(d[0] / d[1], min).toFixed(3)};` : ''; };

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
export const micBtn = () => SR ? `<button class="icon-btn mic-btn" aria-label="Произнести">${icon('mic')}</button>` : '';
/** Speak-and-check: the browser's speech recognition hears you, then words are compared with the phrase. */
export function wireMic(root) {
  if (!SR) return;
  root.querySelectorAll('.mic-btn').forEach(b => {
    if (b._w) return; b._w = 1;
    b.addEventListener('click', e => {
      e.stopPropagation();
      const host = b.closest('[data-line]') || b.parentElement;
      const t = host.querySelector('[data-say]'); if (!t) return;
      const target = t.dataset.say.replace(/\*\*/g, '');
      let out = host.querySelector('.mic-out');
      if (!out) { out = document.createElement('div'); out.className = 'mic-out'; host.appendChild(out); }
      const rec = new SR();
      rec.lang = S.settings.accent === 'gb' ? 'en-GB' : 'en-US';
      rec.interimResults = false; rec.maxAlternatives = 3;
      b.classList.add('rec'); out.innerHTML = `<span class="muted">${icon('mic', 'tiny')} Говори…</span>`;
      rec.onresult = ev => {
        const alts = [...ev.results[0]].map(r => r.transcript);
        const best = alts.map(a => ({ a, d: diff(a, target) })).map(x => ({ ...x, sc: x.d.answer.filter(w => !w.miss).length / Math.max(1, x.d.answer.length) })).sort((p, q) => q.sc - p.sc)[0];
        const pct = Math.round(best.sc * 100);
        out.innerHTML = `<div class="mic-score ${pct >= 85 ? 'ok' : pct >= 60 ? 'mid' : 'bad'}"><b>${pct}%</b> ${pct >= 85 ? 'Отлично звучит!' : pct >= 60 ? 'Почти! Проверь выделенные слова.' : 'Попробуй ещё раз — медленнее.'}</div>
          <div class="mic-words">${best.d.answer.map(w => `<span class="${w.miss ? 'd-miss' : 'hit'}">${esc(w.w)}</span>`).join(' ')}</div><div class="muted small">Услышал: «${esc(best.a)}»</div>`;
        S.speak = S.speak || {}; const k = today(); S.speak[k] = (S.speak[k] || 0) + 1; save();
        if (pct >= 60) addXP(2);
        document.dispatchEvent(new CustomEvent('daily', { detail: 'speak' }));
      };
      rec.onerror = ev => { out.innerHTML = `<span class="muted">${ev.error === 'not-allowed' ? 'Разреши доступ к микрофону в браузере.' : 'Не расслышал. Попробуй ещё раз.'}</span>`; };
      rec.onend = () => b.classList.remove('rec');
      try { rec.start(); } catch (err) { b.classList.remove('rec'); }
    });
  });
}

export const playBtn = (cls = '') => `<button class="icon-btn play-btn ${cls}" aria-label="Озвучить">${icon('play')}</button>`;

/** Wire every .play-btn inside root: it plays the nearest [data-say]. */
export function wirePlay(root) {
  wireMic(root);
  root.querySelectorAll('.play-btn').forEach(b => {
    if (b._w) return; b._w = 1;
    b.addEventListener('click', e => {
      e.stopPropagation();
      const host = b.closest('[data-line]') || b.parentElement;
      const t = host.querySelector('[data-say]');
      if (t) say(t.dataset.say, { v: t.dataset.v, btn: b });
    });
  });
}

/* ---------- scene (dialogue) ---------- */
export function sceneHTML(sc, { showRu = S.settings.ru } = {}) {
  const lines = sc.lines.map((l, i) => {
    const sp = speaker(l.s), me = sp.you;
    return `<div class="line ${me ? 'me' : ''}" data-line="${i}">
      ${me ? '' : `<div class="line-av">${avatar(l.s)}</div>`}
      <div class="line-body">
        <div class="line-name">${esc(sp.name)}${me ? ' (ты)' : ''}</div>
        <div class="bubble">${en(l.en, { v: sp.voice, ru: l.ru })}<div class="ru" ${showRu ? '' : 'hidden'}>${esc(l.ru)}</div></div>
      </div>${playBtn('line-play')}</div>`;
  }).join('');
  return `<div class="scene">
    ${sc.img ? `<div class="scene-img" style="background-image:url('${img(sc.img)}')"><div class="scene-where">${esc(sc.where || '')}</div></div>` : ''}
    ${sc.intro ? `<p class="scene-intro">${esc(sc.intro)}</p>` : ''}
    <div class="scene-ctl">
      <button class="pill btn-all">${icon('play')} Весь диалог</button>
      <button class="pill btn-shadow">${icon('mic')} Повторять за героем</button>
      <button class="pill btn-ru ${showRu ? 'on' : ''}">${icon('translate')} RU</button>
    </div>
    <div class="shadow-tip" hidden>${icon('mic')} После каждой реплики — пауза. Повтори её вслух, копируя интонацию.</div>
    <div class="lines">${lines}</div>
    <p class="tap-tip">${icon('info')} Нажми на любое слово — перевод, транскрипция и озвучка.</p></div>`;
}
export function wireScene(root, sc) {
  wirePlay(root);
  const lines = [...root.querySelectorAll('.line')];
  const hl = i => { lines.forEach((l, k) => l.classList.toggle('now', k === i)); if (i >= 0) lines[i].scrollIntoView({ behavior: 'smooth', block: 'center' }); };
  const seq = () => sc.lines.map(l => ({ text: l.en, v: speaker(l.s).voice }));
  const all = root.querySelector('.btn-all'), sh = root.querySelector('.btn-shadow');
  all.addEventListener('click', () => { if (all.classList.contains('playing')) return stop(); sequence(seq(), { btn: all, onLine: hl }); });
  sh.addEventListener('click', () => {
    if (sh.classList.contains('playing')) return stop();
    root.querySelector('.shadow-tip').hidden = false;
    sequence(seq(), { btn: sh, onLine: hl, gap: l => 900 + l.text.length * 75 });
  });
  const ruB = root.querySelector('.btn-ru');
  ruB.addEventListener('click', () => {
    const on = !ruB.classList.contains('on');
    ruB.classList.toggle('on', on);
    root.querySelectorAll('.line .ru').forEach(r => r.hidden = !on);
    S.settings.ru = on; save();
  });
}

/* ---------- chunks (phrases) ---------- */
export function chunksHTML(items) {
  return `<div class="chunks">${items.map((c, i) => `<div class="chunk card" data-line="${i}">
    <div class="chunk-main">${en(c.en, { v: 'f', ru: c.ru, cls: 'chunk-en' })}<div class="chunk-ru">${esc(c.ru)}</div>${c.note ? `<div class="chunk-note">${esc(c.note)}</div>` : ''}</div>
    <div class="chunk-act">${playBtn()}${micBtn()}<button class="icon-btn btn-keep ${S.words['phr:' + c.en] ? 'on' : ''}" data-i="${i}" aria-label="В словарь">${icon(S.words['phr:' + c.en] ? 'saved' : 'bookmark')}</button></div></div>`).join('')}</div>`;
}
export function wireChunks(root, items, onKeep) {
  wirePlay(root);
  root.querySelectorAll('.btn-keep').forEach(b => b.addEventListener('click', () => {
    const c = items[+b.dataset.i], k = 'phr:' + c.en;
    const on = !S.words[k];
    onKeep(k, c, on);
    b.classList.toggle('on', on);
    b.innerHTML = icon(on ? 'saved' : 'bookmark');
  }));
}

/* ---------- grammar card ---------- */
export function grammarHTML(id, note) {
  const g = GRAMMAR[id];
  if (!g) return '';
  return `<div class="gram">
    <div class="gram-head">${bulletG()}<div><div class="gram-title">${esc(g.title)}</div><div class="gram-ru">${esc(g.ru)} · ${esc(g.level)}</div></div></div>
    ${note ? `<div class="gram-note card">${icon('spark')} ${esc(note)}</div>` : ''}
    <div class="card gram-rule"><div class="lbl">Коротко</div><p>${esc(g.rule)}</p>
      <ul class="when">${g.when.map(w => `<li>${esc(w)}</li>`).join('')}</ul></div>
    <div class="card table-wrap"><table class="gtable"><thead><tr>${g.table.head.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
      <tbody>${g.table.rows.map(r => `<tr>${r.map((c, k) => `<td>${k === 0 && g.table.head[0] === '' ? `<b>${esc(c)}</b>` : /[a-z]/i.test(c) && !/[а-я]/i.test(c) ? `<span class="en-cell">${words(c)}</span>` : esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    ${g.irregular ? `<div class="card"><div class="lbl">Неправильные глаголы недели</div><div class="irr">${g.irregular.map(r => `<div class="irr-row" data-line>${en(r.join(' – '), { v: 'f' })}${playBtn()}</div>`).join('')}</div></div>` : ''}
    <div class="card"><div class="lbl">5 примеров</div>${g.examples.map((x, i) => `<div class="ex-row" data-line="${i}"><div>${en(x.en, { v: 'f', ru: x.ru })}<div class="ru">${esc(x.ru)}</div></div>${playBtn()}</div>`).join('')}</div>
    <div class="card trap"><div class="lbl">${icon('bolt')} Ловушка для русских</div><p>${esc(g.trap)}</p></div>
    ${g.markers ? `<div class="markers"><span class="lbl">Слова-маркеры:</span> ${words(g.markers)}</div>` : ''}
  </div>`;
}
const bulletG = () => `<span class="bullet big" style="--c:#6CBE45">G</span>`;

/* ---------- meme ---------- */
export function memeHTML(m) {
  const url = img(m.img);
  if (m.tpl === 'drake') {
    return `<div class="meme meme-drake"><div class="meme-img" style="${ar(m.img, 0)}background-image:url('${url}')">
      <div class="drake-txt t1">${en(m.no, { v: 'f' })}</div><div class="drake-txt t2">${en(m.yes, { v: 'f' })}</div></div></div>`;
  }
  return `<div class="meme meme-top">${m.top ? `<div class="meme-cap">${en(m.top, { v: 'f' })}</div>` : ''}
    <div class="meme-img" style="${ar(m.img)}background-image:url('${url}')">${m.bottom ? `<div class="meme-bottom">${en(m.bottom, { v: 'f' })}</div>` : ''}</div></div>`;
}

/* ---------- slang ---------- */
export function slangCardHTML(s) {
  const L = LEVELS[s.lvl];
  return `<div class="slang card" data-line style="--lv:${L.color}">
    <div class="slang-top"><span class="slang-w">${words(s.w)}</span><span class="flag ${s.reg}">${s.reg === 'uk' ? 'UK' : s.reg === 'us' ? 'US' : 'US · UK'}</span><span class="lv">${L.label}</span></div>
    <div class="slang-ru">${esc(s.ru)}</div>
    <div class="slang-ex">${en(s.ex.en, { v: s.reg === 'uk' ? 'liam' : 'jay', ru: s.ex.ru })}<div class="ru">${esc(s.ex.ru)}</div>${playBtn()}</div>
    <div class="slang-where"><div><b class="ok">${icon('check')} Можно:</b> ${esc(s.ok)}</div><div><b class="no">${icon('x')} Нельзя:</b> ${esc(s.no)}</div></div></div>`;
}
export const slangListHTML = ids => ids.map(slangById).filter(Boolean).map(slangCardHTML).join('');

/* ---------- culture ---------- */
export function cultureHTML(id) {
  const c = typeof id === 'string' ? cultureById(id) : id;
  if (!c) return '';
  return `<div class="culture">
    <div class="cult-img" style="background-image:url('${img(c.img)}')"><span class="chip glassy">${{ habits: 'Привычки', youth: 'Молодёжь', study: 'Учёба', work: 'Работа', humor: 'Юмор', swearing: 'Мат', uk: 'Британия' }[c.cat]}</span></div>
    <h2 class="cult-title">${esc(c.title)}</h2><p class="cult-lead">${esc(c.lead)}</p>
    ${c.text.map(p => `<p>${esc(p)}</p>`).join('')}
    <div class="card"><div class="lbl">Как это сказать</div>${c.phrases.map((x, i) => `<div class="ex-row" data-line="${i}"><div>${en(x.en, { v: 'f', ru: x.ru })}<div class="ru">${esc(x.ru)}</div></div>${playBtn()}</div>`).join('')}</div></div>`;
}

/* ---------- email ---------- */
export function emailHTML(m) {
  return `<div class="mail card">
    <div class="mail-row"><span>От:</span> ${esc(m.from || 'Max')}</div>
    ${m.to ? `<div class="mail-row"><span>Кому:</span> ${esc(m.to)}</div>` : ''}
    <div class="mail-row subj"><span>Тема:</span> ${en(m.subject, { v: 'm' })}</div>
    <div class="mail-body">${m.body.map(p => `<p data-line>${en(p, { v: 'm' })}</p>`).join('')}</div>
    <button class="pill btn-mail">${icon('play')} Прочитать письмо</button></div>
    ${m.notes ? `<div class="card"><div class="lbl">Разбор</div>${m.notes.map(n => `<div class="note-row"><b>${words(n.en)}</b><div>${esc(n.ru)}</div></div>`).join('')}</div>` : ''}`;
}
export function wireEmail(root, m) {
  const b = root.querySelector('.btn-mail');
  b && b.addEventListener('click', () => { if (b.classList.contains('playing')) return stop(); sequence(m.body.map(t => ({ text: t, v: 'm' })), { btn: b }); });
}

/* ---------- texting ---------- */
export function textingHTML(st) {
  return `<p class="scene-intro">${esc(st.intro)}</p>
    <div class="abbr-grid">${st.items.map(x => `<div class="abbr card" data-line>
      <div class="abbr-en">${words(x.en)}</div><div class="abbr-full">${en(x.full, { v: 'f' })}</div><div class="abbr-ru">${esc(x.ru)}</div>${x.note ? `<div class="chunk-note">${esc(x.note)}</div>` : ''}</div>`).join('')}</div>
    <div class="lbl" style="margin:18px 4px 8px">Как это выглядит в чате</div>
    <div class="imsg mini">${st.chat.map(m => `<div class="msg ${m.s === 'max' ? 'out' : 'in'}"><div class="b">${en(m.en, { v: speaker(m.s).voice })}</div></div>`).join('')}</div>`;
}

/* ---------- watch ---------- */
export function watchHTML(items) {
  return `<div class="watch-list">${items.map(w => `<a class="watch card" href="${ytSearch(w.q)}" target="_blank" rel="noopener">
    <div class="watch-ic">${icon('video')}</div><div><div class="watch-t">${esc(w.title)}</div><div class="watch-ch">${esc(w.ch || w.kind || '')}${w.level ? ' · ' + esc(w.level) : ''}${w.accent ? ' · ' + esc(w.accent) : ''}</div><div class="watch-why">${esc(w.why)}</div></div>${icon('external', 'ext')}</a>`).join('')}</div>`;
}

export const charName = id => (CHARS[id] || speaker(id)).name;

/* ---------- level up (A2 → B1+) ---------- */
export function levelupHTML(items) {
  return `<div class="lvlup">${items.map((x, i) => `<div class="lu card" data-line="${i}">
    <div class="lu-a2"><span class="lu-tag">A2</span><s>${esc(x.a2)}</s></div>
    <div class="lu-b1"><span class="lu-tag b1">B1+</span><div>${en(x.b1, { v: 'f', ru: x.ru })}<div class="ru">${esc(x.ru)}</div></div>${playBtn()}${micBtn()}</div>
    <div class="chunk-note">${esc(x.note)}</div></div>`).join('')}</div>`;
}

/* ---------- street: swearing + humor ---------- */
export function streetHTML(st) {
  const j = st.joke;
  return `<div class="card warn">${icon('info')}<div>Это нужно, чтобы понимать фильмы, музыку и людей на улице. Смотри на пометку: можно ли так говорить и с кем.</div></div>
    ${slangListHTML(st.ids)}
    ${j ? `<div class="joke card" data-line><div class="lbl">${icon('spark')} Шутка дня</div><div class="joke-en">${en(j.en, { v: 'm', ru: j.ru })}</div>${playBtn()}<div class="ru">${esc(j.ru)}</div><div class="joke-why"><b>Почему смешно:</b> ${esc(j.why)}</div></div>` : ''}`;
}
