// iMessage-style messenger with the characters. Scripted branches + free typing matched by keywords,
// friendly corrections of typical Russian-speaker mistakes, translation and voice for every message.
import { esc, icon, toast, openSheet, haptic } from './ui.js';
import { en, words, lookup } from './words.js';
import { say } from './tts.js';
import { S, save, addXP } from './store.js';
import { CHARS } from './data/chars.js';
import { SCENARIOS, SMALLTALK, MISTAKES } from './data/chats.js';
import { announce } from './ping.js';
import { SLANG, LEVELS } from './data/slang.js';
import { lessonById } from './data/lessons.js';
import { avatar } from './img.js';
import { analyze, REACT, COACH, TENSES } from './chatbrain.js';
import { normalize } from './check.js';
import { aiOn, aiReply } from './ai.js';

const ORDER = Object.keys(CHARS);
const isUnlocked = sc => sc.unlock === 'start' || !!(S.done[sc.unlock] && S.done[sc.unlock].at);
const now = () => Date.now();

/** Create states for newly unlocked scenarios; the first messages arrive as unread. */
export function unlockChats(silent) {
  const fresh = [];
  for (const sc of SCENARIOS) {
    if (S.chats[sc.id] || !isUnlocked(sc)) continue;
    if (!met(sc.who)) sc._newContact = true;
    const st = S.chats[sc.id] = { node: sc.start, log: [], done: false, unread: 0, at: now() };
    for (const m of sc.nodes[sc.start].msgs) st.log.push({ from: 'in', en: m.en, ru: m.ru, t: now() });
    st.unread = st.log.length;
    fresh.push(sc);
  }
  if (fresh.length) {
    save();
    document.dispatchEvent(new Event('chats'));
    if (!silent) {
      const sc = fresh[fresh.length - 1], c = CHARS[sc.who];
      const nc = fresh.find(x => x._newContact);
      // the scripted dialog arrives like a real text a moment after the episode is done (no AI, no tokens)
      setTimeout(() => announce(sc.who, sc.nodes[sc.start].msgs[0].en, { newContact: !!nc }), 2500);
    }
  }
}
export const unreadTotal = () => SCENARIOS.reduce((n, sc) => n + ((S.chats[sc.id] && S.chats[sc.id].unread) || 0), 0) + Object.keys(CHARS).reduce((n, w) => n + ((S.chats['free:' + w] || {}).unread || 0), 0);
const scenariosOf = who => SCENARIOS.filter(s => s.who === who);
const activeOf = who => scenariosOf(who).find(s => S.chats[s.id] && !S.chats[s.id].done);
const nextLocked = who => scenariosOf(who).find(s => !isUnlocked(s));
/** You "know" a character once their first scenario has started. */
export const met = who => who === 'block' || scenariosOf(who).some(s => S.chats[s.id]);
export const metList = () => ORDER.filter(met);

function timeStr(t) { const d = new Date(t); return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`; }

/* ---------------- chat list ---------------- */
export function chatListHTML() {
  const lastOf = who => { const logs = [...scenariosOf(who).filter(s => S.chats[s.id]).flatMap(s => S.chats[s.id].log), ...((S.chats['free:' + who] || {}).log || [])].filter(m => m.en).sort((a, b) => (a.t || 0) - (b.t || 0)); return logs[logs.length - 1]; };
  const known = metList().sort((x, y) => ((lastOf(y) || {}).t || 0) - ((lastOf(x) || {}).t || 0));
  const rows = known.map((who, k) => {
    const c = CHARS[who], last = lastOf(who);
    const unread = scenariosOf(who).reduce((n, s) => n + ((S.chats[s.id] && S.chats[s.id].unread) || 0), 0) + ((S.chats['free:' + who] || {}).unread || 0);
    return `<a class="chat-row ${unread ? 'unread' : ''}" href="#/chat/${who}" style="--d:${k * 45}ms">
      ${unread ? '<span class="dot"></span>' : '<span class="dot off"></span>'}
      ${avatar(who, 'md')}
      <div class="cr-main"><div class="cr-top"><b>${esc(c.name)}</b><span class="cr-time">${last ? timeStr(last.t) : ''} ${icon('next')}</span></div>
      <div class="cr-last">${last ? esc(last.from === 'out' ? 'Ты: ' + last.en : last.en) : ''}</div></div></a>`;
  }).join('');
  const unknown = ORDER.filter(w => !met(w));
  const nextSc = SCENARIOS.filter(s => !met(s.who) && !isUnlocked(s)).map(s => ({ s, L: lessonById(s.unlock) })).filter(x => x.L).sort((x, y) => (x.L.week * 100 + x.L.n) - (y.L.week * 100 + y.L.n))[0];
  return `<div class="chats">
    <div class="chats-search glass">${icon('search')} <span>Поиск</span></div>
    <div class="chat-rows glass-card">${rows || '<div class="sys big">Пока никто не написал.</div>'}</div>
    ${unknown.length ? `<div class="card locked-contacts"><div class="lc-avs">${unknown.map(() => '<span class="av av-q">?</span>').join('')}</div><div><b>Ещё ${unknown.length} ${unknown.length === 1 ? 'контакт' : unknown.length < 5 ? 'контакта' : 'контактов'}</b><div class="muted small">Новые люди появятся в чатах, когда ты познакомишься с ними по сюжету${nextSc ? ` — следующий после эпизода ${nextSc.L.n} «${esc(nextSc.L.title)}»` : ''}.</div></div></div>` : ''}
    <div class="card chat-howto">${icon('hint')} <div><b>Как переписываться</b><br>Выбирай готовый ответ или пиши своими словами. Персонажи замечают сленг, мат, вежливость, время глагола и фразы из уроков — и реагируют по-своему. Лампочка покажет, как ответить правильно и как не надо.</div></div>
  </div>`;
}

/* ---------------- conversation ---------------- */
let convo = null; // { who, root }

export function conversationHTML(who) {
  const c = CHARS[who];
  return `<div class="imsg-screen">
    <div class="imsg-head glass-bar">
      <a class="icon-btn" href="#/chats" aria-label="Назад">${icon('back')}</a>
      <button class="imsg-who">${avatar(who, 'sm')}<span>${esc(c.name)} ${icon('next', 'tiny')}</span></button>
      <span class="imsg-sub">${esc(c.city)}</span>${aiOn() ? '<span class="ai-badge">AI</span>' : ''}
    </div>
    <div class="imsg-scroll"><div class="imsg"></div></div>
    <div class="imsg-foot glass-bar">
      <div class="replies"></div>
      <div class="imsg-input"><button class="icon-btn btn-hint" aria-label="Подсказка">${icon('hint')}</button>
        <textarea rows="1" placeholder="iMessage" autocapitalize="sentences" autocorrect="off" spellcheck="false" enterkeyhint="send"></textarea>
        <button class="send" aria-label="Отправить" disabled>${icon('send')}</button></div>
    </div></div>`;
}

export function mountConversation(root, who) {
  convo = { who, root, busy: false };
  const list = root.querySelector('.imsg');
  const ta = root.querySelector('textarea'), send = root.querySelector('.send');
  // mark read
  scenariosOf(who).forEach(s => { if (S.chats[s.id]) S.chats[s.id].unread = 0; });
  if (S.chats['free:' + who]) S.chats['free:' + who].unread = 0;
  save(); document.dispatchEvent(new Event('chats'));

  // history
  let html = '';
  for (const s of scenariosOf(who)) {
    const st = S.chats[s.id]; if (!st) continue;
    html += `<div class="day">${esc(s.title)} · ${timeStr(st.at)}</div>` + st.log.map(m => msgHTML(m, who)).join('');
    if (st.done) html += `<div class="sys">Диалог завершён ${icon('check', 'tiny')}</div>`;
  }
  const extra = S.chats['free:' + who];
  if (extra) html += extra.log.map(m => msgHTML(m, who)).join('');
  if (!html) {
    const lock = nextLocked(who), L = lock && lessonById(lock.unlock);
    html = `<div class="sys big">${esc(CHARS[who].name)} пока не писал(а).${L ? `<br>Пройди эпизод ${L.n} «${esc(L.title)}» — и придёт сообщение.` : ''}</div>`;
  }
  list.innerHTML = html;
  wireMsgs(list);
  drawReplies();
  scrollEnd(false);

  root.querySelector('.imsg-who').addEventListener('click', () => profileSheet(who));
  ta.addEventListener('input', () => { send.disabled = !ta.value.trim(); ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 110) + 'px'; });
  ta.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(ta.value); } });
  send.addEventListener('click', () => submit(ta.value));
  root.querySelector('.btn-hint').addEventListener('click', hint);
}
export function unmountConversation() { convo = null; }

function msgHTML(m, who) {
  if (m.from === 'sys') return `<div class="sys">${m.html || esc(m.text)}</div>`;
  if (m.from === 'fix') return `<div class="fix">${icon('hint', 'tiny')} <span>${m.fix ? `Лучше: <b>${esc(m.fix)}</b> — ` : ''}${esc(m.ru)}</span></div>`;
  if (m.from === 'fb') return `<div class="fix coach">${icon('brief', 'tiny')} <span>${esc(m.ru)}</span></div>`;
  if (m.from === 'card') return `<div class="msg in"><div class="b card-b">${m.html}</div></div>`;
  const out = m.from === 'out';
  const v = out ? 'me' : CHARS[who].voice;
  return `<div class="msg ${out ? 'out' : 'in'}"><div class="b">${en(m.en, { v, ru: m.ru || '' })}${m.ru ? `<div class="ru" hidden>${esc(m.ru)}</div>` : ''}</div>
    ${!out ? `<div class="m-act"><button class="m-tr" ${m.ru ? '' : 'hidden'}>Перевод</button><button class="m-say">${icon('sound', 'tiny')}</button></div>` : ''}</div>`;
}
function wireMsgs(list) {
  list.querySelectorAll('.msg').forEach(m => {
    if (m._w) return; m._w = 1;
    const tr = m.querySelector('.m-tr'), sb = m.querySelector('.m-say');
    tr && tr.addEventListener('click', () => { const r = m.querySelector('.ru'); r.hidden = !r.hidden; tr.textContent = r.hidden ? 'Перевод' : 'Скрыть'; });
    sb && sb.addEventListener('click', () => { const t = m.querySelector('[data-say]'); say(t.dataset.say, { v: t.dataset.v, btn: sb }); });
  });
}
function scrollEnd(smooth = true) {
  const sc = convo && convo.root.querySelector('.imsg-scroll');
  if (sc) requestAnimationFrame(() => sc.scrollTo({ top: sc.scrollHeight, behavior: smooth ? 'smooth' : 'auto' }));
}
function append(m) {
  if (!convo) return;
  const list = convo.root.querySelector('.imsg');
  const sysBig = list.querySelector('.sys.big'); if (sysBig) sysBig.remove();
  list.insertAdjacentHTML('beforeend', msgHTML(m, convo.who));
  wireMsgs(list);
  const last = list.lastElementChild;
  last.animate([{ opacity: 0, transform: 'translateY(10px) scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
  scrollEnd();
}

function currentReplies(sc, st) {
  const node = sc.nodes[st.node];
  if (!node || node.end) return [];
  return typeof node.replies === 'string' ? sc.sets[node.replies] : node.replies || [];
}

function drawReplies() {
  if (!convo) return;
  const box = convo.root.querySelector('.replies');
  const sc = activeOf(convo.who);
  const st = sc && S.chats[sc.id];
  const reps = sc && !convo.busy ? currentReplies(sc, st) : [];
  box.innerHTML = reps.map((r, i) => `<button class="reply" data-i="${i}"><span class="no-tap">${esc(r.en)}</span></button>`).join('');
  box.querySelectorAll('.reply').forEach(b => b.addEventListener('click', () => {
    const r = reps[+b.dataset.i];
    choose(sc, r, r.en, true);
  }));
}

function hint() {
  if (!convo) return;
  const sc = activeOf(convo.who);
  const st = sc && S.chats[sc.id];
  const reps = sc ? currentReplies(sc, st) : [];
  if (!reps.length) return toast('Сейчас можно просто поболтать: hi, how are you?, what does … mean?');
  const good = reps.filter(r => !r.bad), bad = reps.filter(r => r.bad);
  const node = sc.nodes[st.node];
  openSheet(`<h3 class="sheet-h">${icon('hint')} Как ответить</h3>
    ${node.expect ? `<div class="card hint-exp">${icon('book', 'tiny')} Здесь хорошо подойдёт <b>${esc(TENSES[node.expect.t].ru)}</b>: ${en(node.expect.ex, { v: 'me' })}</div>` : ''}
    <div class="lbl ok">${icon('check', 'tiny')} Так можно</div>
    ${good.map(r => `<div class="card hint-r">${en(r.en, { v: 'me', ru: r.ru })}<div class="ru">${esc(r.ru)}</div><div class="kw">Ключевые слова: ${(r.kw || []).slice(0, 6).map(k => `<span class="chip">${esc(k)}</span>`).join(' ')}</div></div>`).join('')}
    ${bad.length ? `<div class="lbl no">${icon('x', 'tiny')} Так не надо</div>${bad.map(r => `<div class="card hint-r bad"><s>${esc(r.en)}</s>${r.better ? `<div class="good-v">${icon('check', 'tiny')} ${esc(r.better)}</div>` : ''}<div class="ru">${esc(r.fb || '')}</div></div>`).join('')}` : ''}
    <p class="muted small">Пиши своими словами — если в ответе будут ключевые слова, ${esc(CHARS[convo.who].name)} поймёт. Сленг, мат и вежливость тоже замечаются.</p>`);
}

/* matching */
const has = (text, kw) => {
  const k = kw.toLowerCase();
  if (/^[a-z']+$/.test(k)) return new RegExp(`(^|[^a-z'])${k.replace(/'/g, "'")}([^a-z']|$)`).test(text);
  return text.includes(k);
};
function match(text, reps) {
  const t = ' ' + text.toLowerCase().replace(/[’‘]/g, "'") + ' ';
  let best = null, score = 0;
  for (const r of reps) { if (r.bad || !r.kw) continue; const s = r.kw.reduce((n, k) => n + (has(t, k) ? (k.length > 4 ? 2 : 1) : 0), 0); if (s > score) { score = s; best = r; } }
  return best;
}
function checkMistakes(text) {
  for (const m of MISTAKES) { const r = text.match(m.re); if (r) return { fix: m.fix(r), ru: m.ru }; }
  return null;
}

function logTo(sc, m) {
  const st = sc ? S.chats[sc.id] : (S.chats['free:' + convo.who] ||= { log: [] });
  st.log.push({ ...m, t: now() });
  if (st.log.length > 200) st.log.splice(0, st.log.length - 200);
  save();
}

async function incoming(sc, msgs) {
  const who = convo.who;
  for (const m of msgs) {
    if (!convo || convo.who !== who) { if (sc) msgs.slice(msgs.indexOf(m)).forEach(x => S.chats[sc.id].log.push({ from: 'in', en: x.en, ru: x.ru, t: now() })); save(); return; }
    const typing = document.createElement('div');
    typing.className = 'msg in typing'; typing.innerHTML = '<div class="b"><i></i><i></i><i></i></div>';
    convo.root.querySelector('.imsg').appendChild(typing); scrollEnd();
    await new Promise(r => setTimeout(r, 650 + Math.min(1600, m.en.length * 28)));
    typing.remove();
    const msg = { from: 'in', en: m.en, ru: m.ru };
    logTo(sc, msg); append(msg);
    if (m.html) { const c = { from: 'card', html: m.html }; append(c); }
    haptic();
  }
}

async function submit(text) {
  text = text.trim();
  if (!text || !convo || convo.busy) return;
  const ta = convo.root.querySelector('textarea');
  ta.value = ''; ta.style.height = 'auto'; convo.root.querySelector('.send').disabled = true;
  const sc = activeOf(convo.who);
  if (sc) {
    const st = S.chats[sc.id];
    const r = match(text, currentReplies(sc, st));
    return choose(sc, r, text, false);
  }
  return smallTalk(text);
}

async function say2(sc, m) { if (m) await incoming(sc, [m]); }
const fill = (m, w) => m && { en: m.en.replace('{w}', w), ru: (m.ru || '').replace('{w}', w) };
function note(sc, ru) { const f = { from: 'fb', ru }; logTo(sc, f); append(f); }

/** Reactions to what you typed (scenarios and free talk). Returns false when the message can't go on (e.g. it is in Russian). */
async function reactTo(sc, who, text, { formal, expect, matched } = {}) {
  const a = analyze(text, { formal, expect: matched ? expect : null });
  if (a.cyr) {
    await say2(sc, REACT.cyrillic[who]);
    const s = { from: 'sys', text: 'Пиши по-английски — даже с ошибками. Нажми на лампочку, там подсказки.' }; logTo(sc, s); append(s);
    return false;
  }
  const fx = checkMistakes(text);
  if (fx) { const f = { from: 'fix', ...fx }; logTo(sc, f); append(f); }
  if (a.swear) {
    await say2(sc, (a.swear.lvl > 1 ? REACT.swear2 : REACT.swear1)[who]);
    if (formal) note(sc, COACH.swearFormal); else if (a.swear.lvl > 1) note(sc, COACH.swear2);
  } else if (a.slang) {
    if (formal) note(sc, COACH.slangFormal.replace('{w}', a.slang.w));
    else if (Math.random() < 0.75) await say2(sc, fill(REACT.slang[who], a.slang.w));
  }
  a.notes.forEach(n => note(sc, n));
  if (a.phrase) { const s = { from: 'sys', html: `${icon('spark', 'tiny')} Фраза из урока: «${esc(a.phrase.en)}» · +3 XP` }; logTo(sc, s); append(s); addXP(3); }
  if (a.tenseMiss) { const f = { from: 'fix', fix: a.tenseMiss.ex, ru: `здесь хорошо подойдёт ${TENSES[a.tenseMiss.t].ru}.` }; logTo(sc, f); append(f); }
  return a;
}

async function choose(sc, r, text, picked) {
  if (convo.busy) return;
  convo.busy = true; drawReplies();
  const st = S.chats[sc.id];
  const node = sc.nodes[st.node];
  const out = { from: 'out', en: text };
  logTo(sc, out); append(out);
  document.dispatchEvent(new CustomEvent('daily', { detail: 'chat' }));
  let a = {};
  if (!picked) {
    a = await reactTo(sc, sc.who, text, { formal: sc.formal, expect: node.expect, matched: !!r });
    if (a === false) { if (convo) convo.busy = false; drawReplies(); return; }
  }
  if (r && r.bad) {
    // a wrong way to answer: the character reacts, the coach explains, you try again
    await incoming(sc, r.react || SMALLTALK.replies[sc.who].unknown.slice(0, 1));
    const f = { from: 'fix', fix: r.better || '', ru: r.fb || '' }; logTo(sc, f); append(f);
    if (convo) convo.busy = false; drawReplies();
    return;
  }
  if (r && r.fb) note(sc, r.fb);
  if (!r && aiOn()) {
    const node2 = sc.nodes[st.node];
    const hint = (node2.msgs || []).map(m => m.en).join(' ');
    const ok = await aiTurn(sc, sc.who, text, `you just asked Max: "${hint}". The story options are: ${currentReplies(sc, st).filter(x => !x.bad).map(x => x.en).join(' / ')}`);
    if (ok) {
      const s = { from: 'sys', text: 'Можно болтать дальше или вернуться к сюжету — варианты ниже.' }; logTo(sc, s); append(s);
      if (convo) convo.busy = false; drawReplies();
      return;
    }
  }
  if (!r) {
    if (a.question) {
      await incoming(sc, [SMALLTALK.replies[sc.who].how[0]]);
      const s = { from: 'sys', text: 'Ответ на твой вопрос получен. Теперь ответь на вопрос персонажа — варианты ниже.' }; logTo(sc, s); append(s);
    } else {
      const u = SMALLTALK.replies[sc.who].unknown;
      await incoming(sc, [u[Math.floor(Math.random() * u.length)]]);
      const reps = currentReplies(sc, st).filter(x => !x.bad);
      const words = new Set(normalize(text).split(' '));
      const near = reps.map(x => ({ x, n: normalize(x.en).split(' ').filter(w => words.has(w) && w.length > 2).length })).sort((p, q) => q.n - p.n)[0];
      const s = { from: 'sys', html: near && near.n ? `Может, ты хотел сказать: «${esc(near.x.en)}»? Или нажми на лампочку.` : 'Не понял(а). Выбери вариант ниже или нажми на лампочку — там ключевые слова.' };
      logTo(sc, s); append(s);
    }
    if (convo) convo.busy = false; drawReplies();
    return;
  }
  if (r.set) st.vars = { ...(st.vars || {}), ...r.set };
  addXP(picked ? 2 : 5);
  let next = r.go;
  while (next) {
    st.node = next; save();
    const n = sc.nodes[next];
    await incoming(sc, (n.msgs || []).map(m => ({ ...m, en: m.en.replace(/\{(\w+)\}/g, (_, k) => (st.vars || {})[k] || '') })));
    if (n.end) {
      st.done = true; save();
      addXP(20);
      const nx = nextLocked(sc.who), L = nx && lessonById(nx.unlock);
      const s = { from: 'sys', text: `Диалог завершён · +20 XP${L ? `. ${CHARS[sc.who].name} напишет снова после эпизода ${L.n}.` : ''}` };
      logTo(sc, s); append(s);
      break;
    }
    next = n.next || null;
  }
  if (convo) { convo.busy = false; drawReplies(); }
}

/** One AI turn: typing… → the character's messages (+ translation) → correction / B1+ upgrade. */
async function aiTurn(sc, who, text, scenarioHint) {
  const list = convo && convo.root.querySelector('.imsg');
  const typing = document.createElement('div');
  typing.className = 'msg in typing'; typing.innerHTML = '<div class="b"><i></i><i></i><i></i></div>';
  list && list.appendChild(typing); scrollEnd();
  let res;
  try { res = await aiReply(who, text, { scenarioHint }); }
  catch (e) {
    typing.remove();
    const s = { from: 'sys', text: `Нейросеть не ответила (${String(e.message || e).slice(0, 80)}). Проверь ключ в Настройках.` }; logTo(sc, s); append(s);
    return false;
  }
  typing.remove();
  const parts = res.reply.split(/\n+/).map(x => x.trim()).filter(Boolean).slice(0, 4);
  const ru = String(res.reply_ru || '').split(/\n+/).map(x => x.trim()).filter(Boolean);
  const msgs = parts.map((en, i) => ({ en, ru: parts.length === ru.length ? ru[i] : (i === parts.length - 1 ? ru.join(' ') : '') }));
  for (const [i, m] of msgs.entries()) {
    if (i) await new Promise(r => setTimeout(r, 500 + Math.min(1200, m.en.length * 20)));
    const msg = { from: 'in', en: m.en, ru: m.ru, ai: 1 }; logTo(sc, msg); append(msg); haptic();
  }
  const c = res.correction;
  if (c && c.right && !checkMistakes(text)) { const f = { from: 'fix', fix: c.right, ru: `${c.wrong ? `«${c.wrong}» → ` : ''}${c.ru || ''}` }; logTo(sc, f); append(f); }
  const lu = res.level_up;
  if (lu && lu.better) { const s = { from: 'sys', html: `${icon('spark', 'tiny')} <b>B1+:</b> ${esc(lu.better)}${lu.ru ? ` — ${esc(lu.ru)}` : ''}` }; logTo(sc, s); append(s); }
  addXP(4);
  return true;
}

async function smallTalk(text) {
  const who = convo.who;
  convo.busy = true;
  const out = { from: 'out', en: text };
  logTo(null, out); append(out);
  document.dispatchEvent(new CustomEvent('daily', { detail: 'chat' }));
  const a = await reactTo(null, who, text, { formal: who === 'maya' });
  if (a === false) { if (convo) convo.busy = false; return; }
  if (aiOn() && await aiTurn(null, who, text)) { if (convo) convo.busy = false; return; }
  const t = text.toLowerCase();
  const R = SMALLTALK.replies[who];
  let reply = null;
  for (const it of SMALLTALK.intents) {
    if (it.re) {
      const m = text.match(it.re);
      if (m) { reply = meaningReply((m[2] || m[4] || '').trim()); break; }
    } else if (it.kw.some(k => has(' ' + t + ' ', k))) { reply = R[it.id][0]; break; }
  }
  if (!reply) reply = R.unknown[0];
  await incoming(null, [reply]);
  addXP(1);
  if (convo) convo.busy = false;
}

function meaningReply(w) {
  const k = w.toLowerCase().replace(/["“”]/g, '');
  const s = SLANG.find(x => x.w.toLowerCase().split(' / ').includes(k) || x.id === k);
  if (s) return { en: `"${s.w}" — like this: ${s.ex.en}`, ru: `«${s.w}» — ${s.ru}`, html: `<div class="mini-slang"><b>${esc(s.w)}</b> <span class="lv" style="--lv:${LEVELS[s.lvl].color}">${LEVELS[s.lvl].label}</span><div>${esc(s.ru)}</div><small>Можно: ${esc(s.ok)}</small></div>` };
  const hit = lookup(k.split(' ')[0]);
  if (hit && !k.includes(' ')) return { en: `${hit.e.w}? It means… hmm, check this 👇`, ru: `${hit.e.w} — ${hit.e.ru}`, html: `<div class="mini-slang"><b>${esc(hit.e.w)}</b> /${esc(hit.e.ipa)}/<div>${esc(hit.e.ru)}</div></div>` };
  return SMALLTALK.meaning.notFound;
}

function profileSheet(who) {
  const c = CHARS[who];
  openSheet(`<div class="prof">${avatar(who, 'xl')}<h3>${esc(c.full)}</h3><div class="muted">${esc(c.handle)} · ${c.age} · ${esc(c.city)}</div>
    <p>${esc(c.bio)}</p><div class="tags">${c.tags.map(t => `<span class="chip">${esc(t)}</span>`).join('')}</div>
    <button class="btn ghost wide prof-voice">${icon('sound')} Послушать голос</button></div>`);
  const b = document.querySelector('.prof-voice');
  b && b.addEventListener('click', () => say(SMALLTALK.replies[who].how[0].en, { v: c.voice, btn: b }));
}

export { words };
