// Episode player: a lesson is a deck of full-screen steps with story-style progress bars.
import { esc, icon, toast, haptic, bullet } from './ui.js';
import { en } from './words.js';
import { stop } from './tts.js';
import { S, save, addXP } from './store.js';
import { lessonById, LESSONS, WEEKS } from './data/lessons.js';
import { speaker, CHARS } from './data/chars.js';
import { img, avatar } from './img.js';
import { addCard } from './srs.js';
import { renderQuiz } from './exercises.js';
import { levelupHTML, streetHTML, sceneHTML, wireScene, chunksHTML, wireChunks, grammarHTML, wirePlay, memeHTML, slangListHTML, cultureHTML, emailHTML, wireEmail, textingHTML, watchHTML } from './cards.js';
import { unlockChats } from './chat.js';

const STEP_NAME = { levelup: 'Прокачка B1+', street: 'Мат и юмор', cover: 'Эпизод', scene: 'Сцена', chunks: 'Фразы', grammar: 'Грамматика', meme: 'Мем', quiz: 'Тест', slang: 'Сленг', culture: 'Культура', email: 'Письмо', texting: 'Переписка', watch: 'Смотреть', chat: 'Чат' };

let el = null;

export function openLesson(id, at) {
  const L = lessonById(id);
  if (!L) return;
  closeLesson(true);
  let i = at != null ? at : Math.min(S.pos[id] || 0, L.steps.length - 1);
  if (S.done[id] && at == null) i = 0;
  el = document.createElement('div');
  el.className = 'episode';
  el.innerHTML = `<div class="ep-bg" style="background-image:url('${img(L.bg) || img(L.img)}')"></div>
    <div class="ep-top glass-bar">
      <div class="ep-bars">${L.steps.map(() => '<i><b></b></i>').join('')}</div>
      <div class="ep-head"><button class="icon-btn ep-close" aria-label="Закрыть">${icon('x')}</button>
        <div class="ep-title"><span class="ep-step"></span><span class="ep-name">${esc(L.title)}</span></div>
        <span class="ep-n">${L.n}/${LESSONS.filter(x => x.week === L.week).length}</span></div>
    </div>
    <div class="ep-scroll"><div class="ep-body"></div></div>
    <div class="ep-foot glass-bar"><button class="btn ghost ep-prev" aria-label="Назад">${icon('back')}</button><button class="btn primary ep-next"></button></div>`;
  document.body.appendChild(el);
  document.body.classList.add('in-episode');
  requestAnimationFrame(() => el.classList.add('open'));
  el.querySelector('.ep-close').addEventListener('click', () => { closeLesson(); if (location.hash.startsWith('#/lesson')) location.hash = '#/path'; });
  el.querySelector('.ep-prev').addEventListener('click', () => go(i - 1));
  el.querySelector('.ep-next').addEventListener('click', () => next());

  // swipe between steps (not while typing or dragging chips)
  const sc = el.querySelector('.ep-scroll');
  let x0 = null, y0 = 0;
  sc.addEventListener('touchstart', e => { if (e.target.closest('textarea,input,.order-bank,.order-line,.scene-ctl')) return; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  sc.addEventListener('touchend', e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 90 && Math.abs(dx) > Math.abs(dy) * 2) { if (dx < 0) next(true); else go(i - 1); }
  }, { passive: true });

  let quizDone = false, dir = 0;
  function next(fromSwipe) {
    const st = L.steps[i];
    if (st.t === 'quiz' && !quizDone && fromSwipe) return toast('Сначала пройди тест — или нажми «Пропустить»');
    if (i >= L.steps.length - 1) return finish();
    go(i + 1);
  }
  function go(k) {
    if (k < 0 || k >= L.steps.length) return;
    stop();
    dir = k > i ? 1 : -1; i = k; S.pos[id] = i; save();
    quizDone = false;
    draw();
    sc.scrollTop = 0;
  }
  function draw() {
    const st = L.steps[i];
    el.querySelectorAll('.ep-bars i').forEach((b, k) => { b.className = k < i ? 'done' : k === i ? 'cur' : ''; });
    el.querySelector('.ep-step').textContent = STEP_NAME[st.t] || '';
    el.querySelector('.ep-prev').style.visibility = i ? 'visible' : 'hidden';
    const nb = el.querySelector('.ep-next');
    nb.innerHTML = st.t === 'cover' ? `Начать ${icon('next')}` : st.t === 'quiz' ? 'Пропустить' : st.t === 'chat' ? `Открыть чат ${icon('chat')}` : `Дальше ${icon('next')}`;
    nb.classList.toggle('ghost', st.t === 'quiz');
    const body = el.querySelector('.ep-body');
    body.className = `ep-body step-${st.t}`;
    el.classList.toggle('on-cover', st.t === 'cover');
    body.innerHTML = renderStep(L, st);
    if (st.t !== 'cover') body.insertAdjacentHTML('afterbegin', `<span class="step-num">/${String(i).padStart(2, '0')} — ${STEP_NAME[st.t] || ''}</span>`);
    wireStep(body, L, st, nb);
    body.animate([{ opacity: 0, transform: dir ? `translateX(${dir * 46}px)` : 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.32,.72,0,1)' });
    if (st.t === 'chat') complete(L);
  }

  function wireStep(body, L, st, nb) {
    wirePlay(body);
    if (st.t === 'scene') wireScene(body, st);
    if (st.t === 'chunks') wireChunks(body, st.items, (k, c, on) => {
      if (on) { S.words[k] = { w: c.en, ru: c.ru, ipa: '', ex: c.en, exRu: c.ru, exV: 'f', phrase: 1, added: Date.now() }; addCard(k); addXP(2); haptic(); toast(`${icon('saved')} Фраза в словаре`); }
      else { delete S.words[k]; delete S.cards[k]; }
      save();
    });
    if (st.t === 'email') wireEmail(body, st);
    if (st.t === 'cover') body.querySelector('.cover-start')?.addEventListener('click', () => next());
    if (st.t === 'quiz') {
      renderQuiz(body.querySelector('.quiz-host'), st.items, {
        prefix: L.id, src: L.id, title: st.title || 'Тест',
        onDone: (score, total) => {
          quizDone = true;
          const prev = S.done[L.id] || {};
          S.done[L.id] = { ...prev, score: Math.max(score, prev.score || 0), total };
          addXP(score * 3); save();
          nb.classList.remove('ghost'); nb.innerHTML = `Дальше ${icon('next')}`;
        },
      });
    }
    if (st.t === 'chat') body.querySelector('.go-chat')?.addEventListener('click', () => finish());
  }

  function finish() {
    const st = L.steps[L.steps.length - 1];
    complete(L);
    closeLesson();
    location.hash = st.t === 'chat' ? `#/chat/${st.who}` : '#/path';
  }
  draw();
}

function complete(L) {
  const first = !S.done[L.id] || !S.done[L.id].at;
  S.done[L.id] = { ...(S.done[L.id] || {}), at: Date.now() };
  S.pos[L.id] = 0;
  save();
  document.dispatchEvent(new CustomEvent('daily', { detail: 'ep' }));
  if (first) { addXP(40); toast(`${icon('trophy')} Эпизод пройден! +40 XP`); }
  unlockChats();
}

export function closeLesson(instant) {
  if (!el) return;
  stop();
  const e = el; el = null;
  document.body.classList.remove('in-episode');
  if (instant) return e.remove();
  e.classList.remove('open');
  setTimeout(() => e.remove(), 300);
}
export const lessonOpen = () => !!el;

function renderStep(L, st) {
  switch (st.t) {
    case 'cover': {
      const W = WEEKS.find(w => w.n === L.week);
      const cast = [...new Set(L.steps.filter(s => s.t === 'scene').flatMap(s => s.lines.map(l => l.s)))].filter(s => s !== 'max');
      const ch = L.steps.find(s => s.t === 'chunks' || s.t === 'levelup');
      const lu = L.steps.find(s => s.t === 'levelup');
      const ticker = [...(lu ? lu.items.map(x => x.b1) : []), ...(ch && ch.items ? ch.items.map(x => x.en || x.b1) : [])].slice(0, 8);
      const words = L.title.split(' ');
      return `<div class="poster">
        <div class="poster-photo" style="background-image:url('${img(L.img)}')"></div><div class="poster-shade"></div>
        <div class="poster-meta"><span>EP.${String(L.n).padStart(2, '0')} / ${esc(W.city)}</span><span>${L.mins} MIN${L.week > 1 ? ' / B1+' : ''}</span></div>
        <div class="ticket"><small>LINE</small><b>${esc(W.line)}</b><small>WEEK ${L.week}</small><i></i></div>
        <div class="poster-body">
          <div class="poster-num">/${String(L.n).padStart(2, '0')} — ${esc(L.topic.toUpperCase())}${L.boss ? '<span class="boss-tag">ФИНАЛ</span>' : ''}</div>
          <h1 class="poster-title">${words.map((w, i) => `<span style="animation-delay:${80 + i * 70}ms">${esc(w)}</span>`).join('')}</h1>
          <div class="poster-ru">${esc(L.ru)}</div>
          ${cast.length ? `<div class="poster-cast"><span class="avs">${cast.map(c => avatar(c)).join('')}</span>с ${cast.map(c => esc(speaker(c).name)).join(', ')}</div>` : ''}
        </div>
        ${ticker.length ? `<div class="marquee"><div>${[...ticker, ...ticker].map(t => esc(t)).join('  ✦  ')}</div></div>` : ''}
      </div>`;
    }
    case 'scene': return `<h2 class="step-h">${esc(st.title)}</h2>${sceneHTML(st)}`;
    case 'chunks': return `<h2 class="step-h">${esc(st.title || 'Фразы')}</h2><p class="step-sub">Учим блоками — так говорят носители. Сохрани нужные в словарь ${icon('bookmark')}</p>${chunksHTML(st.items)}`;
    case 'levelup': return `<h2 class="step-h">Прокачка до B1+</h2><p class="step-sub">Ты это уже знаешь на A2. Вот как скажет человек уровня B1+ — с фразовыми глаголами и идиомами.</p>${levelupHTML(st.items)}`;
    case 'street': return `<h2 class="step-h">Улица: мат и юмор</h2>${streetHTML(st)}`;
    case 'grammar': return grammarHTML(st.topic, st.note);
    case 'meme': return `<h2 class="step-h">Мем урока</h2>${memeHTML(st)}<div class="card meme-ru">${icon('info')} ${esc(st.ru)}</div>`;
    case 'quiz': return `<div class="quiz-host"></div>`;
    case 'slang': return `<h2 class="step-h">Сленг эпизода</h2><p class="step-sub">У каждого слова — пометка, насколько оно грубое, и где его можно говорить.</p>${slangListHTML(st.ids)}`;
    case 'culture': return cultureHTML(st.id);
    case 'email': return `<h2 class="step-h">${esc(st.title)}</h2>${emailHTML(st)}`;
    case 'texting': return `<h2 class="step-h">${esc(st.title)}</h2>${textingHTML(st)}`;
    case 'watch': return `<h2 class="step-h">Смотреть по теме</h2><p class="step-sub">Совет: сначала с английскими субтитрами, потом без. 1 минуту — повторяй вслух за героями.</p>${watchHTML(st.items)}`;
    case 'chat': {
      const c = CHARS[st.who];
      return `<div class="chat-invite">
        <div class="notif glass"><div class="notif-app">${icon('chat')} Сообщения · сейчас</div>
          <div class="notif-row">${avatar(st.who, 'lg')}<div><b>${esc(c.name)}</b><div class="notif-txt">${esc(firstMsg(st.scenario))}</div></div></div></div>
        <p class="step-sub center">${esc(st.text)}</p>
        <button class="btn primary wide go-chat">Ответить ${esc(c.name)} ${icon('next')}</button></div>`;
    }
  }
  return '';
}

import { SCENARIOS } from './data/chats.js';
function firstMsg(id) { const s = SCENARIOS.find(x => x.id === id); return s ? s.nodes[s.start].msgs[0].en : ''; }
