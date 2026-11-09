// Small DOM helpers, icons, bottom sheet, toast.
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
export const attr = s => esc(s).replace(/\n/g, '&#10;');

const P = {
  feed: '<path d="M4 5h16M4 12h16M4 19h10"/>',
  home: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9.5h13V10"/>',
  path: '<circle cx="6" cy="5" r="2.2"/><circle cx="18" cy="12" r="2.2"/><circle cx="6" cy="19" r="2.2"/><path d="M8 5.8c6 1 8 2.5 8 4.4M16 13.8c0 2-3 3.6-8 4.4"/>',
  chat: '<path d="M20 12c0 4.4-3.6 8-8 8-1.4 0-2.7-.3-3.8-.9L4 20l1-3.8C4.4 15 4 13.6 4 12c0-4.4 3.6-8 8-8s8 3.6 8 8Z"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
  user: '<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4"/>',
  play: '<path d="M8 5.5v13l10.5-6.5Z" fill="currentColor" stroke="none"/>',
  pause: '<rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/><rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none"/>',
  sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4Z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  slow: '<path d="M3 16c1.5-5 5-8 9-8 3.5 0 6 2 7 5h1.5a1.5 1.5 0 0 1 0 3H3Z"/><circle cx="8" cy="18.5" r="1.5"/><circle cx="16" cy="18.5" r="1.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  back: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  bookmark: '<path d="M6.5 4h11v16l-5.5-4-5.5 4Z"/>',
  saved: '<path d="M6.5 4h11v16l-5.5-4-5.5 4Z" fill="currentColor"/>',
  heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z"/>',
  heartf: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" fill="currentColor"/>',
  comment: '<path d="M20 11.5c0 4-3.6 7.5-8 7.5-1.2 0-2.4-.2-3.4-.7L4 19.5l1.3-3.6A7 7 0 0 1 4 11.5C4 7.4 7.6 4 12 4s8 3.4 8 7.5Z"/>',
  send: '<path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/>',
  flame: '<path d="M12 21c-3.9 0-6.5-2.6-6.5-6.2 0-3.3 2.3-5.2 3.6-7.6.5 1.7 1.4 2.7 2.4 3.3.2-2.8 1.5-5 3.3-6.5.3 3.4 4.7 5.6 4.7 10.6 0 3.7-3.1 6.4-7.5 6.4Z"/>',
  star: '<path d="m12 4 2.4 5 5.4.6-4 3.7 1.1 5.4L12 16l-4.9 2.7 1.1-5.4-4-3.7 5.4-.6Z"/>',
  lock: '<rect x="5.5" y="10.5" width="13" height="9.5" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  translate: '<path d="M4 6h9M8.5 4v2M11 6c-1 4-3.5 7-7 8.5M6 9.5c1.3 2 3 3.4 5 4.2"/><path d="m13 20 3.5-8.5L20 20M14.3 17h4.4"/>',
  mic: '<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5"/>',
  repeat: '<path d="M17 4.5 19.5 7 17 9.5"/><path d="M4.5 12V10a3 3 0 0 1 3-3h12M7 19.5 4.5 17 7 14.5"/><path d="M19.5 12v2a3 3 0 0 1-3 3h-12"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M18 6l-1.6 1.6M7.6 16.4 6 18M18 18l-1.6-1.6M7.6 7.6 6 6"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>',
  spark: '<path d="M12 3.5 13.8 10l6.7 2-6.7 2L12 20.5 10.2 14l-6.7-2 6.7-2Z"/>',
  book: '<path d="M4.5 5.5c2.5-1 5-1 7.5.5 2.5-1.5 5-1.5 7.5-.5v13c-2.5-1-5-1-7.5.5-2.5-1.5-5-1.5-7.5-.5Z"/><path d="M12 6v13"/>',
  cards: '<rect x="6.5" y="3.5" width="11" height="15" rx="2.5" transform="rotate(8 12 11)"/><rect x="5" y="5" width="11" height="15" rx="2.5"/>',
  bolt: '<path d="M13 3 5.5 13.5H12L11 21l7.5-10.5H12Z"/>',
  video: '<rect x="3.5" y="6" width="12.5" height="12" rx="2.5"/><path d="m16 10.5 4.5-2.5v8L16 13.5"/>',
  external: '<path d="M14 4.5h5.5V10M19.5 4.5 11 13M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
  shuffle: '<path d="M4 7h3.5c4.5 0 4.5 10 9 10H20M4 17h3.5c1.5 0 2.4-1.1 3.1-2.6M13.4 9.6C14.1 8.1 15 7 16.5 7H20M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H4.5c0 3 1.5 4.5 3.7 4.8M16 6h3.5c0 3-1.5 4.5-3.7 4.8M12 13v4M8.5 20h7M9.5 17h5v3h-5Z"/>',
  brief: '<rect x="3.5" y="7" width="17" height="12" rx="2.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3.5 12.5h17"/>',
  music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.5 3.5 5.3 3.5 8.5s-1 6-3.5 8.5c-2.5-2.5-3.5-5.3-3.5-8.5s1-6 3.5-8.5Z"/>',
  more: '<circle cx="5.5" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18.5" cy="12" r="1.3" fill="currentColor"/>',
  hint: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/>',
  undo: '<path d="M9 14 4.5 9.5 9 5"/><path d="M4.5 9.5H15a4.5 4.5 0 0 1 0 9h-3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>',
  map: '<path d="M9 4.5 3.5 6.5v13L9 17.5l6 2 5.5-2v-13L15 6.5Z"/><path d="M9 4.5v13M15 6.5v13"/>',
};
export const icon = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;

/* subway-style bullet */
export const bullet = (ch, color, cls = '') => {
  const n = parseInt(color.slice(1), 16), lum = ((n >> 16) * 299 + ((n >> 8) & 255) * 587 + (n & 255) * 114) / 1000;
  return `<span class="bullet ${cls}" style="--c:${color};--fg:${lum > 165 ? '#111' : '#fff'}">${esc(ch)}</span>`;
};

/* ---------- bottom sheet ---------- */
let sheetEl = null;
export function openSheet(html, { cls = '', onClose } = {}) {
  closeSheet(true);
  const wrap = document.createElement('div');
  wrap.className = 'sheet-wrap';
  wrap.innerHTML = `<div class="sheet-bg"></div><div class="sheet glass ${cls}" role="dialog"><div class="sheet-grip"></div><div class="sheet-body">${html}</div></div>`;
  document.body.appendChild(wrap);
  sheetEl = wrap;
  wrap._onClose = onClose;
  requestAnimationFrame(() => wrap.classList.add('open'));
  wrap.querySelector('.sheet-bg').addEventListener('click', () => closeSheet());
  // drag down to close
  const sh = wrap.querySelector('.sheet');
  let y0 = null, dy = 0;
  sh.addEventListener('touchstart', e => { if (sh.querySelector('.sheet-body').scrollTop > 0) return; y0 = e.touches[0].clientY; dy = 0; }, { passive: true });
  sh.addEventListener('touchmove', e => { if (y0 == null) return; dy = Math.max(0, e.touches[0].clientY - y0); sh.style.transform = `translateY(${dy}px)`; }, { passive: true });
  sh.addEventListener('touchend', () => { if (y0 == null) return; sh.style.transform = ''; if (dy > 90) closeSheet(); y0 = null; });
  return wrap.querySelector('.sheet-body');
}
export function closeSheet(instant) {
  const w = sheetEl; if (!w) return;
  sheetEl = null;
  w._onClose && w._onClose();
  if (instant) return w.remove();
  w.classList.remove('open');
  setTimeout(() => w.remove(), 320);
}
export const sheetOpen = () => !!sheetEl;

/* ---------- toast ---------- */
let toastT = 0;
export function toast(html, { ms = 2600, tap } = {}) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.innerHTML = `<div class="toast-in glass">${html}</div>`;
  t.onclick = () => { t.classList.remove('show'); tap && tap(); };
  t.classList.add('show');
  clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('show'), ms);
}

export const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
export const plural = (n, one, few, many) => { const a = Math.abs(n) % 100, b = a % 10; return a > 10 && a < 20 ? many : b > 1 && b < 5 ? few : b === 1 ? one : many; };
export const ytSearch = q => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
export const haptic = () => { try { navigator.vibrate && navigator.vibrate(8); } catch (e) {} };
