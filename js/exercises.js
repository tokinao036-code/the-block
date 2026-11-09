// Exercises with instant checking and error feedback. Kinds: choice, fill, fix, order, type, listen.
import { esc, icon, shuffle, haptic } from './ui.js';
import { words, en } from './words.js';
import { say } from './tts.js';
import { matchAny, closest, diff, normalize } from './check.js';
import { addMistake } from './srs.js';

const KIND = { choice: 'Выбери вариант', fill: 'Вставь слово', fix: 'Исправь ошибку', order: 'Собери фразу', type: 'Переведи на английский', listen: 'Послушай и выбери' };

const blank = q => words(q).replace(/_{3,}/g, '<span class="blank">____</span>');

function diffHTML(input, answer) {
  const d = diff(input, answer);
  return `<div class="diff"><div><span class="lbl">Ты:</span> ${d.user.map(x => `<span class="${x.bad ? 'd-bad' : ''}">${esc(x.w)}</span>`).join(' ') || '—'}</div>
    <div><span class="lbl">Верно:</span> ${d.answer.map(x => `<span class="${x.miss ? 'd-miss' : ''}">${esc(x.w)}</span>`).join(' ')}</div></div>`;
}

/** Render one exercise into el. onAnswer(ok) fires once after the first check. */
export function renderOne(el, ex, onAnswer) {
  let answered = false;
  const finish = (ok, fbHTML) => {
    if (answered) return;
    answered = true;
    haptic();
    el.classList.add(ok ? 'is-ok' : 'is-bad');
    const fb = el.querySelector('.ex-fb');
    fb.innerHTML = `<div class="fb-head">${ok ? icon('check') + ' Верно!' : icon('x') + ' Не совсем'}</div>${fbHTML || ''}${ex.why ? `<div class="fb-why">${esc(ex.why)}</div>` : ''}`;
    fb.hidden = false;
    onAnswer && onAnswer(ok);
  };
  const head = `<div class="ex-kind">${KIND[ex.k] || ''}</div>`;
  const fbBox = '<div class="ex-fb" hidden></div>';

  if (ex.k === 'choice' || ex.k === 'listen') {
    const opts = ex.opts.map((o, i) => ({ o, i }));
    el.innerHTML = `${head}
      ${ex.k === 'listen' ? `<button class="big-play" aria-label="Слушать">${icon('sound')}</button><div class="listen-text" hidden>${en(ex.en, { v: ex.v })}</div>` : `<div class="ex-q">${blank(ex.q)}</div>`}
      <div class="opts">${opts.map(({ o, i }) => `<button class="opt" data-i="${i}">${ex.k === 'listen' ? esc(o) : `<span class="no-tap">${esc(o)}</span>`}</button>`).join('')}</div>${fbBox}`;
    if (ex.k === 'listen') {
      const pb = el.querySelector('.big-play');
      pb.addEventListener('click', () => say(ex.en, { v: ex.v, btn: pb }));
      setTimeout(() => el.isConnected && say(ex.en, { v: ex.v, btn: pb }), 350);
    }
    el.querySelectorAll('.opt').forEach(b => b.addEventListener('click', () => {
      if (answered) return;
      const i = +b.dataset.i, ok = i === ex.a;
      b.classList.add(ok ? 'right' : 'wrong');
      el.querySelector(`.opt[data-i="${ex.a}"]`).classList.add('right');
      el.querySelectorAll('.opt').forEach(x => x.disabled = true);
      if (ex.k === 'listen') el.querySelector('.listen-text').hidden = false;
      const full = ex.k === 'choice' && ex.q.includes('___') ? fillIn(ex.q, ex.opts[ex.a]) : '';
      finish(ok, full ? `<div class="fb-full">${en(full)}</div>` : '');
    }));
    return;
  }

  if (ex.k === 'order') {
    const target = ex.a.replace(/[.?!,]$/, '');
    const end = (ex.a.match(/[.?!]$/) || [''])[0];
    const pieces = shuffle(target.split(' ').concat(ex.extra || []));
    el.innerHTML = `${head}<div class="ex-ru">${esc(ex.ru)}</div>
      <div class="order-line" aria-label="Твой ответ"></div>
      <div class="order-bank">${pieces.map((p, i) => `<button class="chip-w" data-i="${i}">${esc(p)}</button>`).join('')}</div>
      <div class="ex-actions"><button class="btn ghost sm btn-undo">${icon('undo')} Сброс</button><button class="btn primary btn-check" disabled>Проверить</button></div>${fbBox}`;
    const line = el.querySelector('.order-line'), bank = el.querySelector('.order-bank'), chk = el.querySelector('.btn-check');
    const upd = () => { chk.disabled = bank.querySelectorAll('.chip-w:not(.used)').length > 0 && line.children.length === 0; };
    bank.addEventListener('click', e => {
      const b = e.target.closest('.chip-w'); if (!b || b.classList.contains('used') || answered) return;
      b.classList.add('used');
      const c = document.createElement('button'); c.className = 'chip-w in'; c.textContent = b.textContent; c.dataset.i = b.dataset.i;
      line.appendChild(c); upd();
      if (!bank.querySelector('.chip-w:not(.used)')) chk.focus();
    });
    line.addEventListener('click', e => {
      const c = e.target.closest('.chip-w'); if (!c || answered) return;
      bank.querySelector(`.chip-w[data-i="${c.dataset.i}"]`).classList.remove('used'); c.remove(); upd();
    });
    el.querySelector('.btn-undo').addEventListener('click', () => { if (answered) return; line.innerHTML = ''; bank.querySelectorAll('.used').forEach(b => b.classList.remove('used')); upd(); });
    chk.addEventListener('click', () => {
      const got = [...line.children].map(c => c.textContent).join(' ');
      const ok = normalize(got) === normalize(target);
      el.querySelector('.ex-actions').hidden = true;
      finish(ok, (ok ? '' : diffHTML(got, target)) + `<div class="fb-full">${en(target + end)}</div>`);
    });
    return;
  }

  // fill / fix / type: text input
  const isFix = ex.k === 'fix', isFill = ex.k === 'fill';
  el.innerHTML = `${head}
    ${isFill ? `<div class="ex-q">${blank(ex.q)}</div>${ex.hint ? `<div class="ex-hint">подсказка: ${esc(ex.hint)}</div>` : ''}` : ''}
    ${isFix ? `<div class="ex-q wrongline">${words(ex.q)}</div>` : ''}
    ${ex.k === 'type' ? `<div class="ex-ru big">${esc(ex.ru)}</div>` : ''}
    <div class="ex-input"><textarea rows="${isFill ? 1 : 2}" autocapitalize="off" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="done" placeholder="${isFill ? 'пропущенное слово…' : 'пиши по-английски…'}">${isFix ? esc(ex.q) : ''}</textarea></div>
    <div class="ex-actions"><button class="btn ghost sm btn-skip">Не знаю</button><button class="btn primary btn-check">Проверить</button></div>${fbBox}`;
  const ta = el.querySelector('textarea');
  const check = skip => {
    const v = skip ? '' : ta.value.trim();
    if (!v && !skip) { ta.focus(); return; }
    const ok = !skip && matchAny(isFill ? v : v, ex.a);
    ta.disabled = true;
    el.querySelector('.ex-actions').hidden = true;
    const best = closest(v, ex.a);
    const full = isFill ? fillIn(ex.q, ex.a[0]) : best;
    finish(ok, (!ok && v && !isFill ? diffHTML(v, best) : '') + (!ok && isFill && v ? `<div class="diff"><div><span class="lbl">Ты:</span> <span class="d-bad">${esc(v)}</span></div><div><span class="lbl">Верно:</span> <span class="d-miss">${esc(ex.a[0])}</span></div></div>` : '') + `<div class="fb-full">${en(full)}</div>`);
  };
  ta.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
  el.querySelector('.btn-check').addEventListener('click', () => check());
  el.querySelector('.btn-skip').addEventListener('click', () => check(true));
}

function fillIn(q, a) {
  const n = (q.match(/_{3,}/g) || []).length;
  let parts = [a];
  if (n > 1) { parts = a.includes('/') ? a.split('/').map(x => x.trim()) : [a.split(' ')[0], a.split(' ').slice(1).join(' ')]; }
  let k = 0;
  return q.replace(/_{3,}/g, () => parts[k++] ?? '').replace(/\s+/g, ' ').trim();
}

/**
 * A quiz deck: one exercise at a time with progress, then a result card.
 * opts: { prefix, src, onDone(score, total), title, compact }
 */
export function renderQuiz(el, items, { prefix, src, onDone, title = 'Тест', againBtn = true } = {}) {
  let i = 0, score = 0;
  const results = [];
  const draw = () => {
    if (i >= items.length) return result();
    el.innerHTML = `<div class="quiz">
      <div class="quiz-top"><span>${esc(title)}</span><span class="quiz-n">${i + 1} / ${items.length}</span></div>
      <div class="quiz-dots">${items.map((_, k) => `<i class="${k < i ? (results[k] ? 'ok' : 'bad') : k === i ? 'cur' : ''}"></i>`).join('')}</div>
      <div class="ex card"></div>
      <button class="btn primary wide btn-next" hidden>${i + 1 < items.length ? 'Дальше' : 'Результат'} ${icon('next')}</button></div>`;
    const ex = { ...items[i], id: `${prefix}:${i}` };
    renderOne(el.querySelector('.ex'), ex, ok => {
      results[i] = ok;
      if (ok) score++; else addMistake(ex, src);
      const nb = el.querySelector('.btn-next');
      nb.hidden = false;
      nb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    el.querySelector('.btn-next').addEventListener('click', () => { i++; draw(); el.scrollIntoView({ block: 'start' }); });
  };
  const result = () => {
    const pct = Math.round(score / items.length * 100);
    const msg = pct === 100 ? 'Идеально! Ни одной ошибки.' : pct >= 75 ? 'Отлично! Ошибки ушли в «Работу над ошибками».' : pct >= 50 ? 'Неплохо. Ошибки вернутся в повторении — так и запоминается.' : 'Тема пока сложная — это нормально. Перечитай правило и пройди ещё раз.';
    el.innerHTML = `<div class="quiz-result card">
      <div class="ring" style="--p:${pct}"><span>${score}/${items.length}</span></div>
      <div class="qr-msg">${msg}</div>
      ${againBtn ? `<button class="btn ghost btn-again">${icon('repeat')} Пройти ещё раз</button>` : ''}</div>`;
    const ag = el.querySelector('.btn-again');
    ag && ag.addEventListener('click', () => { i = 0; score = 0; results.length = 0; draw(); });
    onDone && onDone(score, items.length);
  };
  draw();
}
