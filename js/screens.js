// Feed (social home) with stories, and the Path (subway line of episodes).
import { esc, icon, plural, bullet } from './ui.js';
import { en, words } from './words.js';
import { say, stop } from './tts.js';
import { S, save, addXP, streakAlive, today } from './store.js';
import { CHARS } from './data/chars.js';
import { POSTS, STORIES, BLOCK } from './data/feed.js';
import { LESSONS, WEEKS } from './data/lessons.js';
import { img, avatar, logo } from './img.js';
import { memeHTML } from './cards.js';
import { dueCards, dueMistakes } from './srs.js';
import { unreadTotal, met } from './chat.js';

const who = id => id === 'block' ? BLOCK : CHARS[id];
// '2 ч' / '3 д' → minutes, newest first
const age = t => { const m = String(t).match(/(\d+)\s*(ч|д|м)/); return m ? +m[1] * ({ 'м': 1, 'ч': 60, 'д': 1440 })[m[2]] : 0; };
export const nextLesson = () => LESSONS.find(l => !(S.done[l.id] && S.done[l.id].at)) || null;

/* ---------------- FEED ---------------- */
export function feedHTML() {
  const nl = nextLesson();
  const due = dueCards().length, mis = dueMistakes().length, unread = unreadTotal();
  const stories = STORIES.filter(s => met(s.who)).map(s => {
    const seen = S.seen.watch['story:' + s.id];
    return `<button class="story ${seen ? 'seen' : ''}" data-id="${s.id}"><span class="st-ring">${avatar(s.who, 'md')}</span><span class="st-name">${esc(s.title || who(s.who).name)}</span></button>`;
  }).join('');
  const todo = [];
  if (nl) todo.push(`<a class="todo card next-ep" href="#/lesson/${nl.id}" style="--img:url('${img(nl.img)}')">
      <div class="todo-img"></div><div class="todo-txt"><span class="kicker">${S.pos[nl.id] ? 'Продолжить' : 'Следующий эпизод'} · неделя ${nl.week}, ${nl.n}/${LESSONS.filter(x => x.week === nl.week).length}</span><b>${esc(nl.title)}</b><span>${esc(nl.ru)} · ${nl.mins} мин</span></div><span class="go">${icon('play')}</span></a>`);
  else todo.push(`<div class="todo card"><div class="todo-txt"><span class="kicker">Неделя 1 пройдена</span><b>Ты прошёл весь Нью-Йорк!</b><span>Повтори карточки и жди неделю 2 — Чикаго.</span></div></div>`);
  const mini = [];
  if (unread) mini.push(`<a class="mini card" href="#/chats">${icon('chat')}<b>${unread}</b><span>${plural(unread, 'новое сообщение', 'новых сообщения', 'новых сообщений')}</span></a>`);
  if (due) mini.push(`<a class="mini card" href="#/me/cards">${icon('cards')}<b>${due}</b><span>${plural(due, 'карточка', 'карточки', 'карточек')} на сегодня</span></a>`);
  if (mis) mini.push(`<a class="mini card" href="#/me/mistakes">${icon('undo')}<b>${mis}</b><span>${plural(mis, 'ошибка', 'ошибки', 'ошибок')} повторить</span></a>`);

  return `<div class="feed">
    <div class="stories">${stories}</div>
    ${dailyHTML(nl, due)}
    ${todo.join('')}
    ${mini.length ? `<div class="minis">${mini.join('')}</div>` : ''}
    <div class="posts">${POSTS.filter(p => met(p.who)).sort((x, y) => age(x.time) - age(y.time)).map(postHTML).join('')}</div>
    <div class="feed-end muted">${icon('check')} Ты всё посмотрел. Новые посты — с новыми эпизодами.</div></div>`;
}

function postHTML(p) {
  const u = who(p.who);
  const liked = !!S.likes[p.id];
  const tagLbl = { slang: 'Сленг', culture: 'Культура', music: 'Музыка', meme: 'Мем' }[p.tag];
  const voice = p.who === 'block' ? 'f' : u.voice;
  return `<article class="post card" data-id="${p.id}">
    <header class="post-h">${avatar(p.who, 'sm')}<div><b>${esc(u.name)}</b>${p.who !== 'block' ? ` <span class="muted">${esc(u.handle)}</span>` : ' <span class="verified">✓</span>'}<div class="muted small">${esc(p.who === 'block' ? 'official' : u.city)} · ${esc(p.time)}</div></div>${tagLbl ? `<span class="chip tag-${p.tag}">${tagLbl}</span>` : ''}</header>
    ${p.meme ? memeHTML(p.meme) : `<div class="post-img" style="background-image:url('${img(p.img)}')"></div>`}
    <div class="post-act">
      <button class="pa like ${liked ? 'on' : ''}">${icon(liked ? 'heartf' : 'heart')}<span>${p.likes + (liked ? 1 : 0)}</span></button>
      <button class="pa cm">${icon('comment')}<span>${p.comments.filter(c => met(c.who)).length}</span></button>
      <button class="pa sp">${icon('sound')}</button>
      <button class="pa tr">${icon('translate')}</button>
    </div>
    <div class="post-cap"><b>${esc(u.name)}</b> ${en(p.en, { v: voice, ru: p.ru })}<div class="ru" hidden>${esc(p.ru)}</div></div>
    <div class="post-cm">${p.comments.filter(c => met(c.who)).map(c => `<div class="cm-row"><b>${esc(who(c.who).name)}</b> ${en(c.en, { v: c.who === 'block' ? 'f' : who(c.who).voice, ru: c.ru })}<div class="ru" hidden>${esc(c.ru)}</div></div>`).join('')}</div>
  </article>`;
}

export function wireFeed(root) {
  root.querySelectorAll('.post').forEach(post => {
    const p = POSTS.find(x => x.id === post.dataset.id);
    post.querySelector('.like').addEventListener('click', e => {
      const b = e.currentTarget, on = !S.likes[p.id];
      if (on) S.likes[p.id] = 1; else delete S.likes[p.id];
      save();
      b.classList.toggle('on', on); b.innerHTML = `${icon(on ? 'heartf' : 'heart')}<span>${p.likes + (on ? 1 : 0)}</span>`;
      if (on) b.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }], { duration: 300 });
    });
    const tr = () => post.querySelectorAll('.ru').forEach(r => r.hidden = !r.hidden);
    post.querySelector('.tr').addEventListener('click', tr);
    post.querySelector('.cm').addEventListener('click', tr);
    post.querySelector('.sp').addEventListener('click', e => {
      const t = post.querySelector('.post-cap [data-say]');
      say(t.dataset.say, { v: t.dataset.v, btn: e.currentTarget });
    });
    post.querySelector('.post-img, .meme')?.addEventListener('dblclick', () => post.querySelector('.like:not(.on)')?.click());
  });
  root.querySelectorAll('.story').forEach(b => b.addEventListener('click', () => openStory(STORIES.findIndex(s => s.id === b.dataset.id))));
}

/* ---------------- STORIES ---------------- */
function openStory(si, fi = 0) {
  const s = STORIES[si]; if (!s) return closeStory();
  S.seen.watch['story:' + s.id] = 1; save();
  document.querySelector(`.story[data-id="${s.id}"]`)?.classList.add('seen');
  let el = document.querySelector('.story-view');
  if (!el) { el = document.createElement('div'); el.className = 'story-view'; document.body.appendChild(el); }
  const f = s.frames[fi], u = who(s.who);
  const v = s.who === 'block' ? 'f' : u.voice;
  el.innerHTML = `<div class="sv-img" style="background-image:url('${img(f.img)}')"></div><div class="sv-shade"></div>
    <div class="sv-bars">${s.frames.map((_, k) => `<i class="${k < fi ? 'done' : k === fi ? 'cur' : ''}"><b></b></i>`).join('')}</div>
    <div class="sv-head">${avatar(s.who, 'sm')}<b>${esc(s.title || u.name)}</b><button class="icon-btn sv-x">${icon('x')}</button></div>
    <div class="sv-text">${en(f.en, { v, ru: f.ru })}<div class="sv-ru">${esc(f.ru)}</div><button class="pill sv-say">${icon('sound')} Послушать</button></div>
    <button class="sv-prev" aria-label="Назад"></button><button class="sv-next" aria-label="Дальше"></button>`;
  el.classList.add('open');
  const go = d => { clearTimeout(el._t); const nf = fi + d; if (nf < 0) return openStory(si - 1 < 0 ? 0 : si - 1); if (nf >= s.frames.length) return openStory(si + 1); openStory(si, nf); };
  el.querySelector('.sv-x').onclick = closeStory;
  el.querySelector('.sv-prev').onclick = () => go(-1);
  el.querySelector('.sv-next').onclick = () => go(1);
  el.querySelector('.sv-say').onclick = e => { clearTimeout(el._t); say(f.en, { v, btn: e.currentTarget }); };
  clearTimeout(el._t);
  el._t = setTimeout(() => go(1), 6500);
}
function closeStory() { const el = document.querySelector('.story-view'); if (el) { clearTimeout(el._t); stop(); el.remove(); } }

/* ---------------- PATH (subway line) ---------------- */
export function pathHTML() {
  const nl = nextLesson();
  const open = WEEKS.filter(w => w.open);
  const line = w => {
    const ls = LESSONS.filter(l => l.week === w.n);
    const done = ls.filter(l => S.done[l.id] && S.done[l.id].at).length;
    const st = ls.map((l, k) => {
      const d = S.done[l.id] && S.done[l.id].at, cur = nl && nl.id === l.id;
      const sc = S.done[l.id] && S.done[l.id].total ? `${S.done[l.id].score}/${S.done[l.id].total}` : '';
      return `<a class="station ${d ? 'done' : ''} ${cur ? 'cur' : ''} ${l.boss ? 'boss' : ''}" href="#/lesson/${l.id}" style="--d:${k * 60}ms">
        <span class="stop">${d ? icon('check') : l.n}</span>
        <div class="st-card glass-card">
          <div class="st-img" style="background-image:url('${img(l.img)}')"></div>
          <div class="st-txt"><div class="st-sign">${esc(l.title)}</div><div class="st-ru">${esc(l.ru)}</div>
          <div class="st-meta"><span class="chip">${esc(gName(l.grammar))}</span>${sc ? `<span class="chip ok">${sc}</span>` : ''}${cur ? '<span class="chip here">Ты здесь</span>' : ''}${l.boss ? '<span class="chip boss">финал</span>' : ''}</div></div>
        </div></a>`;
    }).join('');
    return `<div class="line-head glass-card" id="week${w.n}">${bullet(w.line, w.color, 'big')}
        <div><div class="kicker">Неделя ${w.n} · линия ${esc(w.line)}${w.n > 1 ? ' · B1–B1+' : ''}</div><h2>${esc(w.city)}</h2><div class="muted small">${esc(w.ru)}</div></div>
        <div class="lh-prog"><b>${done}</b>/${ls.length}</div></div>
      <div class="track" style="--c:${w.color}">${st}</div>`;
  };
  const future = WEEKS.filter(w => !w.open).map(w => `<div class="wk-locked glass-card">${bullet(w.line, w.color)}<div><b>Неделя ${w.n} · ${esc(w.city)}</b><div class="muted small">${esc(w.ru)}</div><div class="small">${icon('book', 'tiny')} ${esc(w.grammar)}</div></div>${icon('lock')}</div>`).join('');
  return `<div class="path">${open.map(line).join('<div class="transfer"><span>пересадка</span></div>')}
    <h3 class="sec-h">Маршрут курса до B1+</h3>
    <p class="muted small pad">Каждая неделя — новый город и новая грамматика. Следующие откроются после твоего отзыва.</p>
    <div class="future">${future}</div></div>`;
}
import { GRAMMAR } from './data/grammar.js';
const gName = id => { const g = GRAMMAR[id]; if (id === 'mixed' || !g) return 'Повторение'; const t = g.title.split(':')[0]; return t.length > 20 ? g.ru : t; };

/* ---------------- top bar ---------------- */
export function topBar(title) {
  return `<div class="topbar glass-bar"><div class="tb-l">${title === 'home' ? `<span class="logo-wrap">${logo()}</span><span class="wordmark">the block<i>.</i></span>` : `<h1>${esc(title)}</h1>`}</div>
    <div class="tb-r"><button class="theme-toggle" aria-label="Тема">${icon(document.documentElement.dataset.theme === 'light' ? 'sun' : 'moon')}</button><button class="acc-toggle" aria-label="Акцент">${S.settings.accent === 'us' ? 'US' : 'UK'}</button>
    <a class="streak ${streakAlive() ? 'on' : ''}" href="#/me">${icon('flame')}<b>${S.streak}</b></a></div></div>`;
}

/* ---------------- daily plan: 15 minutes a day ---------------- */
export function dailyHTML(nl, due) {
  const d = (S.daily || {})[today()] || {};
  const items = [
    { k: 'ep', ic: 'play', t: nl ? `Эпизод «${nl.title}»` : 'Повтори любой эпизод', s: '≈ 15 минут', href: nl ? `#/lesson/${nl.id}` : '#/path' },
    { k: 'cards', ic: 'cards', t: 'Карточки', s: due ? `${due} на сегодня` : 'повтори 5 слов', href: '#/me/cards' },
    { k: 'chat', ic: 'chat', t: 'Напиши персонажу', s: 'своими словами', href: '#/chats' },
    { k: 'speak', ic: 'mic', t: 'Произнеси 3 фразы', s: 'микрофон у фраз', href: nl ? `#/lesson/${nl.id}` : '#/lib/speaking' },
  ];
  const n = items.filter(x => d[x.k]).length;
  return `<div class="daily card"><div class="daily-top"><div class="ring mini-ring" style="--p:${n * 25}"><span>${n}/4</span></div>
    <div><div class="kicker">План на сегодня</div><b>${n === 4 ? 'День закрыт — ты красавчик!' : '15 минут — и день засчитан'}</b></div></div>
    <div class="daily-list">${items.map(x => `<a class="daily-i ${d[x.k] ? 'done' : ''}" href="${x.href}"><span class="di-ic">${icon(d[x.k] ? 'check' : x.ic)}</span><div><b>${esc(x.t)}</b><span>${esc(x.s)}</span></div></a>`).join('')}</div></div>`;
}
