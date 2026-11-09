// App shell: router, tab bar, ambient background, onboarding.
import { $, esc, icon, closeSheet, sheetOpen, toast } from './ui.js';
import { S, save, today } from './store.js';
import { bindWords } from './words.js';
import { loadAudioIndex, stop, say } from './tts.js';
import { img, logo } from './img.js';
import { feedHTML, wireFeed, pathHTML, topBar } from './screens.js';
import { chatListHTML, conversationHTML, mountConversation, unmountConversation, unlockChats, unreadTotal } from './chat.js';
import { libraryHTML, sectionPage, SECTIONS } from './library.js';
import { bullet } from './ui.js';
import { meHTML, dictPage, cardsPage, mistakesPage, settingsPage, schemePage } from './me.js';
import { openLesson, closeLesson, lessonOpen } from './lesson.js';
import { dueCards } from './srs.js';
import { initOffline } from './offline.js';

const TABS = [
  { id: 'feed', icon: 'home', label: 'Лента', bg: 'bg_feed' },
  { id: 'path', icon: 'path', label: 'Путь', bg: 'bg_path' },
  { id: 'chats', icon: 'chat', label: 'Чаты', bg: 'bg_chats' },
  { id: 'lib', icon: 'grid', label: 'Разделы', bg: 'bg_lib' },
  { id: 'me', icon: 'user', label: 'Я', bg: 'bg_me' },
];

const view = $('#view');
if (matchMedia('(pointer: coarse)').matches) document.body.classList.add('lite');
if (/[?&]shot\b/.test(location.search)) document.body.classList.add('shot');

/* ---------- theme: auto / light / dark ---------- */
const mqLight = matchMedia('(prefers-color-scheme: light)');
export function applyTheme() {
  const t = S.settings.theme || 'auto';
  const r = t === 'auto' ? (mqLight.matches ? 'light' : 'dark') : t;
  document.documentElement.dataset.theme = r;
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.content = r === 'light' ? '#EFEEE8' : '#0B0B0C';
  return r;
}
applyTheme();
mqLight.addEventListener && mqLight.addEventListener('change', applyTheme);

/* ---------- tab bar ---------- */
function drawTabs(active) {
  const unread = unreadTotal(), due = dueCards().length;
  $('#tabs').innerHTML = TABS.map(t => `<a href="#/${t.id === 'feed' ? '' : t.id}" class="tab ${t.id === active ? 'on' : ''}" aria-label="${t.label}">
    <span class="tab-ic">${icon(t.icon)}${t.id === 'chats' && unread ? `<i class="badge">${unread}</i>` : ''}${t.id === 'me' && due ? '<i class="badge dot"></i>' : ''}</span><span class="tab-l">${t.label}</span></a>`).join('');
}

/* ---------- ambient background (crossfade) ---------- */
let bgKey = '';
function setBg(key) {
  if (key === bgKey) return;
  bgKey = key;
  const url = img(key);
  const bg = $('#bg');
  const layer = document.createElement('div');
  layer.className = 'bg-layer';
  if (url) layer.style.backgroundImage = `url('${url}')`;
  bg.appendChild(layer);
  requestAnimationFrame(() => layer.classList.add('in'));
  [...bg.children].slice(0, -1).forEach(o => { o.classList.remove('in'); setTimeout(() => o.remove(), 900); });
}

/* ---------- router ---------- */
function route() {
  const h = location.hash.replace(/^#\/?/, '');
  const [a, b, c] = h.split('/');
  stop();
  if (sheetOpen()) closeSheet(true);
  if (a !== 'chat') unmountConversation();
  if (a === 'lesson') {
    if (!view.dataset.tab) render('path');
    openLesson(b);
    return;
  }
  if (lessonOpen()) closeLesson(true);
  document.body.classList.toggle('full', a === 'chat');
  if (a === 'chat') return renderChat(b);
  if (!a || a === 'feed') return render('feed');
  if (a === 'path') return render('path');
  if (a === 'chats') return render('chats');
  if (a === 'lib') {
    if (b && c) return renderPage('lib', sectionPage(b, c), `#/lib/${b}`);
    return renderLib(b || lastSection());
  }
  if (a === 'me') {
    const pages = { dict: dictPage, cards: cardsPage, mistakes: mistakesPage, settings: settingsPage, scheme: schemePage };
    return b && pages[b] ? renderPage('me', pages[b](), '#/me') : render('me');
  }
  render('feed');
}

const TAB_ORDER = { feed: 0, path: 1, chats: 2, lib: 3, me: 4 };
const IOS = 'cubic-bezier(.32,.72,0,1)';
/** iPhone-like transitions: tabs slide by direction, sub-pages push in from the right and pop back from the left. */
function shell(tab, inner, depth = 0, dirHint = 0) {
  const prevTab = view.dataset.tab, prevDepth = +(view.dataset.depth || 0);
  view.dataset.tab = tab;
  view.dataset.depth = depth;
  view.innerHTML = inner;
  view.scrollTop = 0; window.scrollTo(0, 0);
  drawTabs(tab);
  setBg(TABS.find(t => t.id === tab).bg);
  wireTop();
  if (document.body.classList.contains('shot')) return;
  const content = view.querySelector('.content');
  const title = view.querySelector('.topbar h1');
  if (!content) return;
  let from;
  if (prevTab && prevTab !== tab) from = `translateX(${(TAB_ORDER[tab] > TAB_ORDER[prevTab] ? 1 : -1) * 32}px)`;
  else if (depth > prevDepth) from = 'translateX(42%)';
  else if (depth < prevDepth) from = 'translateX(-22%)';
  else if (dirHint) from = `translateX(${dirHint * 36}px)`;
  else from = 'translateY(10px)';
  content.animate([{ opacity: 0, transform: from }, { opacity: 1, transform: 'none' }], { duration: depth !== prevDepth ? 420 : 340, easing: IOS });
  if (title && depth !== prevDepth) title.animate([{ opacity: 0, transform: depth > prevDepth ? 'translateX(30px)' : 'translateX(-30px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: IOS });
  const tb = $('#tabs .tab.on .tab-ic');
  if (tb && prevTab !== tab) tb.animate([{ transform: 'scale(1)' }, { transform: 'scale(.8)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
}

/* ---------- Разделы: every section is its own tab ---------- */
const lastSection = () => { try { return localStorage.getItem('theblock.sec') || 'grammar'; } catch (e) { return 'grammar'; } };
function renderLib(id) {
  if (!SECTIONS.find(s => s.id === id)) id = 'grammar';
  const prev = view.dataset.tab === 'lib' && view.dataset.sec;
  try { localStorage.setItem('theblock.sec', id); } catch (e) {}
  const idx = SECTIONS.findIndex(s => s.id === id), pidx = prev ? SECTIONS.findIndex(s => s.id === prev) : idx;
  const page = sectionPage(id);
  const strip = `<div class="sec-tabs glass-bar"><div class="st-scroll">${SECTIONS.map(s => `<a class="sec-tab ${s.id === id ? 'on' : ''}" href="#/lib/${s.id}" data-id="${s.id}">${bullet(s.ch, s.color, 'sm')}<span>${esc(s.title)}</span></a>`).join('')}<i class="st-ind"></i></div></div>`;
  shell('lib', `${topBar('Разделы')}${strip}<div class="content sec-content">${page.html}</div>`, 0, Math.sign(idx - pidx));
  view.dataset.sec = id;
  page.wire && page.wire(view);
  const sc = view.querySelector('.st-scroll'), on = sc.querySelector('.sec-tab.on'), ind = sc.querySelector('.st-ind');
  const prevOn = prev && sc.querySelector(`[data-id="${prev}"]`);
  const place = el => { ind.style.width = el.offsetWidth + 'px'; ind.style.transform = `translateX(${el.offsetLeft}px)`; };
  if (prevOn && prevOn !== on) { ind.style.transition = 'none'; place(prevOn); ind.offsetWidth; ind.style.transition = ''; }
  requestAnimationFrame(() => { place(on); on.scrollIntoView({ inline: 'center', block: 'nearest', behavior: prev ? 'smooth' : 'auto' }); });
  // swipe between sections
  const ct = view.querySelector('.sec-content');
  let x0 = null, y0 = 0;
  ct.addEventListener('touchstart', e => { if (e.target.closest('input,textarea,.artists,.chips-row,.seg,.order-bank')) return; x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
  ct.addEventListener('touchend', e => {
    if (x0 == null) return;
    const dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2) { const n = SECTIONS[idx + (dx < 0 ? 1 : -1)]; if (n) location.hash = `#/lib/${n.id}`; }
  }, { passive: true });
}

function render(tab) {
  const titles = { feed: 'home', path: 'Путь', chats: 'Сообщения', lib: 'Разделы', me: 'Профиль' };
  const body = { feed: feedHTML, path: pathHTML, chats: chatListHTML, lib: libraryHTML, me: meHTML }[tab]();
  shell(tab, `${topBar(titles[tab])}<div class="content">${body}</div>`);
  if (tab === 'feed') wireFeed(view);
  if (tab === 'path') {
    const cur = view.querySelector('.station.cur');
    if (cur && !sessionStorage.getItem('pathScrolled')) { cur.scrollIntoView({ block: 'center' }); sessionStorage.setItem('pathScrolled', '1'); }
  }
}

function renderPage(tab, page, back) {
  shell(tab, `<div class="topbar glass-bar sub"><a class="icon-btn" href="${page.back || back}" aria-label="Назад">${icon('back')}</a><h1>${esc(page.title)}</h1><span></span></div><div class="content page">${page.html}</div>`, 1);
  page.wire && page.wire(view);
}

function renderChat(who) {
  view.dataset.tab = 'chats';
  view.dataset.depth = 1;
  view.innerHTML = conversationHTML(who);
  drawTabs('chats');
  setBg('bg_chats');
  mountConversation(view, who);
  if (!document.body.classList.contains('shot')) view.querySelector('.imsg-screen').animate([{ transform: 'translateX(40%)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 420, easing: IOS });
}

function wireTop() {
  const th = view.querySelector('.theme-toggle');
  th && th.addEventListener('click', () => {
    const cur = document.documentElement.dataset.theme;
    S.settings.theme = cur === 'dark' ? 'light' : 'dark'; save();
    applyTheme();
    th.innerHTML = icon(S.settings.theme === 'dark' ? 'moon' : 'sun');
    document.body.animate([{ opacity: .6 }, { opacity: 1 }], { duration: 300 });
  });
  const acc = view.querySelector('.acc-toggle');
  acc && acc.addEventListener('click', () => {
    S.settings.accent = S.settings.accent === 'us' ? 'gb' : 'us'; save();
    acc.textContent = S.settings.accent === 'us' ? 'US' : 'UK';
    toast(S.settings.accent === 'us' ? '🇺🇸 Американский акцент' : '🇬🇧 Британский акцент', { ms: 1400 });
    say(S.settings.accent === 'us' ? 'American accent.' : 'British accent.', { v: 'f' });
  });
}

/* ---------- onboarding ---------- */
function onboarding() {
  const el = document.createElement('div');
  el.className = 'onb';
  const slides = [
    `<div class="onb-logo">${logo()}</div><h1>the block<i>.</i></h1><p class="big">Английский с района — разговорный, деловой и уличный.</p><p>Ты — Макс из Казани. Переезжаешь в Нью-Йорк на семестр: учёба, стажировка, новые друзья. Каждый эпизод — один день твоей жизни там.</p>`,
    `<h2>Как это работает</h2>
     <div class="onb-row">${icon('path')}<div><b>Путь</b> — эпизоды как станции метро. Сцена, фразы, грамматика, мем, тест, сленг, культура.</div></div>
     <div class="onb-row">${icon('chat')}<div><b>Чаты</b> — сначала тебе напишет сосед Джей. Остальные появятся, когда ты познакомишься с ними по сюжету. После каждого эпизода кто-то из них пишет тебе, а ты отвечаешь своими словами.</div></div>
     <div class="onb-row">${icon('info')}<div><b>Любое слово нажимается</b>: перевод, транскрипция, озвучка, пример.</div></div>
     <div class="onb-row">${icon('cards')}<div><b>Словарь и карточки</b> — сохранённые слова возвращаются по интервалам.</div></div>`,
    `<h2>Какой акцент тебе ближе?</h2><p>Можно поменять в любой момент кнопкой US/UK наверху.</p>
     <div class="onb-acc"><button data-a="us" class="${S.settings.accent === 'us' ? 'on' : ''}"><b>US</b><span>американский</span></button><button data-a="gb" class="${S.settings.accent === 'gb' ? 'on' : ''}"><b>UK</b><span>британский</span></button></div>`,
  ];
  let i = 0;
  const draw = () => {
    el.innerHTML = `<div class="onb-bg" style="background-image:url('${img('bg_feed')}')"></div><div class="onb-card glass">${slides[i]}
      <div class="onb-dots">${slides.map((_, k) => `<i class="${k === i ? 'on' : ''}"></i>`).join('')}</div>
      <button class="btn primary wide onb-next">${i < slides.length - 1 ? 'Дальше' : 'Поехали'} ${icon('next')}</button></div>`;
    el.querySelectorAll('.onb-acc button').forEach(b => b.addEventListener('click', () => {
      S.settings.accent = b.dataset.a; save();
      el.querySelectorAll('.onb-acc button').forEach(x => x.classList.toggle('on', x === b));
      say(b.dataset.a === 'us' ? "Hey, what's up? Welcome to New York!" : "Hiya! Welcome to London, mate.", { v: 'f' });
    }));
    el.querySelector('.onb-next').addEventListener('click', () => {
      if (++i < slides.length) return draw();
      S.onboard = true; save();
      el.classList.add('out'); setTimeout(() => el.remove(), 400);
      route();
    });
  };
  draw();
  document.body.appendChild(el);
}

/* ---------- start ---------- */
bindWords(document);
document.addEventListener('chats', () => drawTabs(view.dataset.tab));
document.addEventListener('xp', () => { const s = view.querySelector('.streak b'); if (s) { s.textContent = S.streak; s.parentElement.classList.add('on'); } });
document.addEventListener('settings', () => applyTheme());
document.addEventListener('daily', e => {
  const t = today(); S.daily = S.daily || {}; const d = S.daily[t] = S.daily[t] || {};
  if (e.detail === 'speak') { if ((S.speak || {})[t] >= 3) d.speak = 1; } else d[e.detail] = 1;
  save();
});
window.addEventListener('hashchange', route);
document.addEventListener('keydown', e => { if (e.key === 'Escape') { if (sheetOpen()) closeSheet(); else if (lessonOpen()) { closeLesson(); location.hash = '#/path'; } } });

loadAudioIndex().then(() => {
  unlockChats(true);
  route();
  initOffline();
  if (!S.onboard && !document.body.classList.contains('shot')) onboarding();
});

if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
