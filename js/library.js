// "Разделы": grammar, speaking, business, slang, culture, music, watch, method.
import { esc, icon, bullet, openSheet, ytSearch } from './ui.js';
import { en, words } from './words.js';
import { S, save, addXP, markSeen } from './store.js';
import { GRAMMAR, GRAMMAR_GROUPS, grammarIds } from './data/grammar.js';
import { SLANG, LEVELS } from './data/slang.js';
import { SWEAR, SWEAR_CATS, SWEAR_GUIDE } from './data/swear.js';
import { CULTURE, CULTURE_CATS } from './data/culture.js';
import { ERAS, ARTISTS, TRACKS, MUSIC_TIPS } from './data/music.js';
import { BUSINESS, businessById } from './data/business.js';
import { SPEAKING, WATCH, METHOD } from './data/extra.js';
import { lessonById } from './data/lessons.js';
import { img } from './img.js';
import { renderQuiz } from './exercises.js';
import { grammarHTML, wirePlay, sceneHTML, wireScene, chunksHTML, wireChunks, slangCardHTML, cultureHTML, emailHTML, wireEmail, textingHTML, watchHTML, playBtn } from './cards.js';
import { addCard } from './srs.js';

export const SECTIONS = [
  { id: 'grammar', ch: 'G', color: '#6CBE45', title: 'Грамматика', sub: 'Все времена, модальные, условные, пассив, косвенная речь' },
  { id: 'speaking', ch: 'T', color: '#EE352E', title: 'Разговорный', sub: 'Кафе, учёба, вечеринка, зал, знакомство, переписка' },
  { id: 'business', ch: 'B', color: '#2F6BFF', title: 'Деловой', sub: 'Письма, встречи, переговоры, презентации, small talk' },
  { id: 'slang', ch: 'S', color: '#FF6319', title: 'Сленг', sub: 'США и Британия, с пометкой грубости' },
  { id: 'swear', ch: '!', color: '#FF3B30', title: 'Мат', sub: 'Ругательства США и UK: шкала грубости, где можно и где нельзя' },
  { id: 'culture', ch: 'C', color: '#B933AD', title: 'Культура', sub: 'Жизнь в США и на Западе: привычки, юмор, мат' },
  { id: 'music', ch: 'M', color: '#FCCC0A', title: 'Музыка улиц', sub: 'От блюза до дрилла: история, лица, треки' },
  { id: 'watch', ch: 'V', color: '#00A1DE', title: 'Что смотреть', sub: 'Каналы и сериалы + как смотреть с пользой' },
  { id: 'method', ch: 'i', color: '#A7A9AC', title: 'Метод', sub: 'Какие системы обучения тут работают' },
];

export function progressOf(id) {
  const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
  switch (id) {
    case 'grammar': { const ids = grammarIds(); return pct(ids.filter(g => S.tests['grammar:' + g] >= 0.6).length, ids.length); }
    case 'speaking': return pct(SPEAKING.filter(s => S.seen.speaking[s.id]).length, SPEAKING.length);
    case 'business': return pct(BUSINESS.filter(b => S.tests['business:' + b.id] >= 0.6).length, BUSINESS.length);
    case 'slang': return pct(SLANG.filter(x => !x.cat && S.seen.slang[x.id]).length, SLANG.filter(x => !x.cat).length);
    case 'swear': return pct(SWEAR.filter(x => S.seen.slang[x.id]).length, SWEAR.length);
    case 'culture': return pct(CULTURE.filter(c => S.seen.culture[c.id]).length, CULTURE.length);
    case 'music': return pct(Object.keys(S.seen.music).length, ERAS.length + ARTISTS.length);
    default: return null;
  }
}

export function libraryHTML() {
  return `<div class="lib-grid">${SECTIONS.map((s, k) => {
    const p = progressOf(s.id);
    return `<a class="lib-tile glass-card" href="#/lib/${s.id}" style="--c:${s.color};--d:${k * 40}ms">
      ${bullet(s.ch, s.color, 'big')}<div class="lt-t">${esc(s.title)}</div><div class="lt-s">${esc(s.sub)}</div>
      ${p != null ? `<div class="bar"><i style="width:${p}%"></i></div><div class="lt-p">${p}%</div>` : ''}</a>`;
  }).join('')}</div>`;
}

/* ---------- section pages: return {title, html, wire} ---------- */
export function sectionPage(id, sub) {
  const S0 = SECTIONS.find(s => s.id === id);
  switch (id) {
    case 'grammar': return sub ? grammarTopic(sub) : grammarList(S0);
    case 'speaking': return sub ? speakingPage(sub) : speakingList(S0);
    case 'business': return sub ? businessPage(sub) : businessList(S0);
    case 'slang': return slangPage(S0);
    case 'swear': return swearPage(S0);
    case 'culture': return culturePage(S0);
    case 'music': return musicPage(S0);
    case 'watch': return { title: 'Что смотреть', html: `${head(S0)}<div class="card how">${WATCH.how.map(p => `<p>${esc(p)}</p>`).join('')}</div>${watchHTML(WATCH.items)}` };
    case 'method': return methodPage(S0);
  }
  return { title: '', html: '' };
}
const head = s => `<div class="sec-head">${bullet(s.ch, s.color, 'big')}<div><h2>${esc(s.title)}</h2><div class="muted small">${esc(s.sub)}</div></div></div>`;

function grammarList(s) {
  return { title: 'Грамматика', html: `${head(s)}${GRAMMAR_GROUPS.map(g => `<h3 class="sec-h">${esc(g.title)}</h3><div class="list glass-card">${g.ids.map(id => {
    const t = GRAMMAR[id], sc = S.tests['grammar:' + id];
    return `<a class="li" href="#/lib/grammar/${id}"><div><b>${esc(t.title)}</b><div class="muted small">${esc(t.ru)} · ${esc(t.level)}</div></div>${sc != null ? `<span class="chip ${sc >= .6 ? 'ok' : ''}">${Math.round(sc * 100)}%</span>` : ''}${icon('next')}</a>`;
  }).join('')}</div>`).join('')}` };
}
function grammarTopic(id) {
  const g = GRAMMAR[id];
  if (!g) return { title: 'Грамматика', html: '' };
  return {
    title: g.title, back: '#/lib/grammar',
    html: `${grammarHTML(id)}<h3 class="sec-h">Мини-тест</h3><div class="quiz-host"></div>`,
    wire(root) {
      wirePlay(root);
      renderQuiz(root.querySelector('.quiz-host'), g.test, { prefix: 'g:' + id, src: 'grammar:' + id, title: g.title, onDone: (sc, n) => {
        const k = 'grammar:' + id, r = sc / n;
        if (!(S.tests[k] >= r)) S.tests[k] = r;
        addXP(sc * 2); save();
      } });
    },
  };
}

function speakingList(s) {
  return { title: 'Разговорный', html: `${head(s)}<div class="tiles2">${SPEAKING.map(x => `<a class="tile2 card" href="#/lib/speaking/${x.id}"><div class="t2-img" style="background-image:url('${img(x.img)}')"></div><b>${esc(x.title)}</b><span class="muted small">${esc(x.en)}${S.seen.speaking[x.id] ? ' · ✓' : ''}</span></a>`).join('')}</div>` };
}
function speakingPage(id) {
  const sp = SPEAKING.find(x => x.id === id), L = sp && lessonById(sp.lesson);
  if (!L) return { title: '', html: '' };
  markSeen('speaking', id);
  if (sp.step === 'texting') {
    const st = L.steps.find(s => s.t === 'texting');
    return { title: sp.title, back: '#/lib/speaking', html: `<h2 class="step-h">${esc(sp.title)}</h2>${textingHTML(st)}`, wire: r => wirePlay(r) };
  }
  const sc = L.steps.find(s => s.t === 'scene'), ch = L.steps.find(s => s.t === 'chunks');
  return {
    title: sp.title, back: '#/lib/speaking',
    html: `<h2 class="step-h">${esc(sc.title)}</h2>${sceneHTML(sc)}<h3 class="sec-h">Фразы</h3>${chunksHTML(ch.items)}<a class="btn ghost wide" href="#/lesson/${L.id}">Весь эпизод ${L.n} «${esc(L.title)}»</a>`,
    wire(root) {
      wireScene(root, sc);
      wireChunks(root, ch.items, (k, c, on) => { if (on) { S.words[k] = { w: c.en, ru: c.ru, ipa: '', ex: c.en, exRu: c.ru, exV: 'f', phrase: 1, added: Date.now() }; addCard(k); } else { delete S.words[k]; delete S.cards[k]; } save(); });
    },
  };
}

function businessList(s) {
  return { title: 'Деловой', html: `${head(s)}<div class="tiles2">${BUSINESS.map(b => `<a class="tile2 card" href="#/lib/business/${b.id}"><div class="t2-img" style="background-image:url('${img(b.img)}')"></div><b>${esc(b.title)}</b><span class="muted small">${esc(b.en)}${S.tests['business:' + b.id] != null ? ` · ${Math.round(S.tests['business:' + b.id] * 100)}%` : ''}</span></a>`).join('')}</div>` };
}
function businessPage(id) {
  const b = businessById(id); if (!b) return { title: '', html: '' };
  const m = b.model;
  let model = '';
  if (m.type === 'email') model = emailHTML({ from: 'Max', subject: m.subject, body: m.body });
  else if (m.type === 'dialogue') model = sceneHTML({ lines: m.lines });
  else model = `<div class="card speech">${m.lines.map((l, i) => `<div class="ex-row" data-line="${i}"><div>${en(l, { v: 'm' })}</div>${playBtn()}</div>`).join('')}</div>`;
  return {
    title: b.title, back: '#/lib/business',
    html: `<div class="biz-hero" style="background-image:url('${img(b.img)}')"><h2>${esc(b.title)}</h2><span>${esc(b.en)}</span></div>
      <p class="lead">${esc(b.intro)}</p>
      <h3 class="sec-h">10 фраз</h3>${chunksHTML(b.phrases)}
      <h3 class="sec-h">Пример</h3>${model}
      <h3 class="sec-h">Не говори так</h3><div class="card">${b.dont.map(d => `<div class="dont"><div class="bad">${icon('x')} ${words(d.bad)}</div><div class="good">${icon('check')} ${en(d.good, { v: 'f' })}</div><div class="muted small">${esc(d.why)}</div></div>`).join('')}</div>
      <h3 class="sec-h">Проверь себя</h3><div class="quiz-host"></div>`,
    wire(root) {
      wirePlay(root);
      if (m.type === 'email') wireEmail(root, { body: m.body });
      if (m.type === 'dialogue') wireScene(root, { lines: m.lines });
      wireChunks(root, b.phrases, (k, c, on) => { if (on) { S.words[k] = { w: c.en, ru: c.ru, ipa: '', ex: c.en, exRu: c.ru, exV: 'f', phrase: 1, added: Date.now() }; addCard(k); } else { delete S.words[k]; delete S.cards[k]; } save(); });
      renderQuiz(root.querySelector('.quiz-host'), b.test, { prefix: 'b:' + id, src: 'business:' + id, title: b.title, onDone: (sc, n) => { const k = 'business:' + id; if (!(S.tests[k] >= sc / n)) S.tests[k] = sc / n; addXP(sc * 2); save(); } });
    },
  };
}

function slangPage(s) {
  const f = { reg: 'all', lvl: 'all', q: '' };
  return {
    title: 'Сленг',
    html: `${head(s)}
      <div class="card warn">${icon('info')}<div>Здесь есть ругательства — это нужно, чтобы понимать фильмы, музыку и людей. Пометки: <span class="lvl-dot" style="--lv:${LEVELS[0].color}"></span>нейтрально · <span class="lvl-dot" style="--lv:${LEVELS[1].color}"></span>грубо · <span class="lvl-dot" style="--lv:${LEVELS[2].color}"></span>очень грубо.</div></div>
      <div class="seg" data-k="reg"><button class="on" data-v="all">Все</button><button data-v="us">США</button><button data-v="uk">Британия</button></div>
      <div class="seg" data-k="lvl"><button class="on" data-v="all">Любые</button><button data-v="0">нейтр.</button><button data-v="1">грубо</button><button data-v="2">очень грубо</button></div>
      <div class="search glass">${icon('search')}<input type="search" placeholder="Найти слово…" autocapitalize="off"></div>
      <div class="slang-list"></div>`,
    wire(root) {
      const list = root.querySelector('.slang-list');
      const draw = () => {
        const items = SLANG.filter(x => !x.cat && (f.reg === 'all' || x.reg === f.reg || x.reg === 'both') && (f.lvl === 'all' || String(x.lvl) === f.lvl) && (!f.q || (x.w + ' ' + x.ru).toLowerCase().includes(f.q)));
        list.innerHTML = items.map(slangCardHTML).join('') || '<p class="muted center">Ничего не нашлось</p>';
        wirePlay(list);
        items.forEach(x => S.seen.slang[x.id] = 1); save();
      };
      root.querySelectorAll('.seg').forEach(seg => seg.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
        f[seg.dataset.k] = b.dataset.v; draw();
      }));
      root.querySelector('input').addEventListener('input', e => { f.q = e.target.value.trim().toLowerCase(); draw(); });
      draw();
    },
  };
}

function swearPage(s) {
  const f = { cat: 'all', lvl: 'all' };
  const extra = SLANG.filter(x => !x.cat && x.tag === 'ругательство');
  return {
    title: 'Мат',
    html: `${head(s)}
      <div class="swear-hero"><div class="kicker">explicit content</div><h2>Мат по-английски</h2><p>Чтобы понимать фильмы, рэп и улицу — и не ляпнуть лишнего самому.</p>
        <div class="scale">${LEVELS.map(l => `<span style="--lv:${l.color}">${l.label}</span>`).join('')}<span class="taboo">табу</span></div></div>
      <div class="card guide">${SWEAR_GUIDE.map(t => `<p>${esc(t)}</p>`).join('')}</div>
      <div class="chips-row">${SWEAR_CATS.map(c => `<button class="chip-btn ${c.id === 'all' ? 'on' : ''}" data-c="${c.id}">${esc(c.label)}</button>`).join('')}</div>
      <div class="seg" data-k="lvl"><button class="on" data-v="all">Любые</button><button data-v="0">замены</button><button data-v="1">грубо</button><button data-v="2">очень грубо</button></div>
      <div class="swear-list"></div>
      <div class="card warn">${icon('info')}<div>Расовые, национальные и гомофобные оскорбления (slurs) здесь намеренно не приводятся: их нельзя использовать никогда, даже «в шутку» и даже если они звучат в песнях. Подробнее — в Культуре, карточка «Слова, которые нельзя никогда».</div></div>`,
    wire(root) {
      const list = root.querySelector('.swear-list');
      const draw = () => {
        const pool = f.cat === 'all' ? [...SWEAR, ...extra] : SWEAR.filter(x => x.cat === f.cat);
        const items = pool.filter(x => f.lvl === 'all' || String(x.lvl) === f.lvl).sort((a, b) => a.lvl - b.lvl);
        list.innerHTML = items.map(slangCardHTML).join('') || '<p class="muted center">Ничего не нашлось</p>';
        wirePlay(list);
        items.forEach(x => S.seen.slang[x.id] = 1); save();
      };
      root.querySelector('.chips-row').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; f.cat = b.dataset.c; root.querySelectorAll('.chip-btn').forEach(x => x.classList.toggle('on', x === b)); draw(); });
      root.querySelector('.seg').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; f.lvl = b.dataset.v; root.querySelectorAll('.seg button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
      draw();
    },
  };
}

function culturePage(s) {
  let cat = 'all';
  return {
    title: 'Культура',
    html: `${head(s)}<div class="chips-row">${CULTURE_CATS.map(c => `<button class="chip-btn ${c.id === 'all' ? 'on' : ''}" data-c="${c.id}">${esc(c.label)}</button>`).join('')}</div><div class="cult-grid"></div>`,
    wire(root) {
      const grid = root.querySelector('.cult-grid');
      const draw = () => {
        grid.innerHTML = CULTURE.filter(c => cat === 'all' || c.cat === cat).map(c => `<button class="cult-tile card ${S.seen.culture[c.id] ? 'seen' : ''}" data-id="${c.id}"><div class="ct-img" style="background-image:url('${img(c.img)}')"></div><b>${esc(c.title)}</b><span class="muted small">${esc(c.lead)}</span></button>`).join('');
      };
      root.querySelector('.chips-row').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        cat = b.dataset.c; root.querySelectorAll('.chip-btn').forEach(x => x.classList.toggle('on', x === b)); draw();
      });
      grid.addEventListener('click', e => {
        const t = e.target.closest('.cult-tile'); if (!t) return;
        const body = openSheet(cultureHTML(t.dataset.id), { cls: 'tall' });
        wirePlay(body);
        if (markSeen('culture', t.dataset.id)) addXP(3);
        t.classList.add('seen');
      });
      draw();
    },
  };
}

function musicPage(s) {
  return {
    title: 'Музыка улиц',
    html: `<div class="music-hero" style="background-image:url('${img('mu_herc')}')"><div><span class="kicker">American street music</span><h2>От блюза до дрилла</h2><p>Как музыка чернокожей Америки стала главным языком молодёжи мира.</p></div></div>
      <h3 class="sec-h">Хронология</h3>
      <div class="timeline">${ERAS.map((e, i) => `<button class="era" data-i="${i}" style="--d:${i * 40}ms"><span class="era-y">${esc(e.year)}</span><div class="era-card glass-card ${S.seen.music['era' + i] ? 'seen' : ''}"><div class="era-img" style="background-image:url('${img(e.img)}')"></div><div><b>${esc(e.title)}</b><div class="muted small">${esc(e.place)}</div></div></div></button>`).join('')}</div>
      <h3 class="sec-h">Лица</h3>
      <div class="artists">${ARTISTS.map(a => `<button class="artist" data-id="${a.id}"><span class="art-img" style="background-image:url('${img(a.img)}')"></span><b>${esc(a.name)}</b><span class="muted small">${esc(a.city)}</span></button>`).join('')}</div>
      <h3 class="sec-h">10 культовых треков</h3>
      <div class="tracks glass-card">${TRACKS.map((t, i) => `<a class="track-row" href="${ytSearch(t.artist + ' ' + t.title)}" target="_blank" rel="noopener"><span class="tr-n">${i + 1}</span><span class="tr-img" style="background-image:url('${img(t.img)}')"></span><div class="tr-main"><b>${esc(t.title)}</b><div class="muted small">${esc(t.artist)} · ${t.year}</div><div class="small">${esc(t.why)}</div><div class="tr-en">${t.en.map(x => `<span class="chip">${words(x.en)} — ${esc(x.ru)}</span>`).join(' ')}</div></div>${icon('external', 'ext')}</a>`).join('')}</div>
      <div class="card tips"><div class="lbl">${icon('hint')} Как учить английский по рэпу</div>${MUSIC_TIPS.map(t => `<p>${esc(t)}</p>`).join('')}</div>`,
    wire(root) {
      root.querySelectorAll('.era').forEach(b => b.addEventListener('click', () => {
        const e = ERAS[+b.dataset.i];
        const body = openSheet(`<div class="cult-img" style="background-image:url('${img(e.img)}')"><span class="chip glassy">${esc(e.year)}</span></div><h2 class="cult-title">${esc(e.title)}</h2><div class="muted">${esc(e.place)}</div><p>${esc(e.text)}</p>
          <div class="card"><div class="lbl">Слова эпохи</div>${e.words.map((w, i) => `<div class="ex-row" data-line="${i}"><div>${en(w.en, { v: 'f', ru: w.ru })}<div class="ru">${esc(w.ru)}</div></div>${playBtn()}</div>`).join('')}</div>`, { cls: 'tall' });
        wirePlay(body);
        if (markSeen('music', 'era' + b.dataset.i)) addXP(2);
        b.querySelector('.era-card').classList.add('seen');
      }));
      root.querySelectorAll('.artist').forEach(b => b.addEventListener('click', () => {
        const a = ARTISTS.find(x => x.id === b.dataset.id);
        openSheet(`<div class="prof"><span class="av xl" style="background-image:url('${img(a.img)}')"></span><h3>${esc(a.name)}</h3><div class="muted">${esc(a.city)} · ${esc(a.years)}</div><p>${esc(a.text)}</p>
          <a class="btn ghost wide" href="${ytSearch(a.name + ' interview')}" target="_blank" rel="noopener">${icon('video')} Интервью на YouTube</a></div>`);
        if (markSeen('music', a.id)) addXP(2);
      }));
    },
  };
}

function methodPage(s) {
  return {
    title: 'Метод',
    html: `${head(s)}<p class="lead">В приложении собраны методы, которые работают по данным исследований и опыту полиглотов. Вот что и где.</p>
      ${METHOD.map((m, i) => `<div class="method card" style="--d:${i * 40}ms"><div class="m-n">${i + 1}</div><div><b>${esc(m.title)}</b><div class="muted small">${esc(m.who)}</div><p>${esc(m.text)}</p><span class="chip">${icon('map', 'tiny')} ${esc(m.where)}</span></div></div>`).join('')}
      <a class="btn ghost wide" href="#/me/scheme">${icon('map')} Схема приложения</a>`,
  };
}
