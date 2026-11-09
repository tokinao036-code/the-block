// Offline pack: downloads every voice clip, photo and font into the media cache in the background,
// resumes after interruptions, shows a small progress pill. After that the app works without internet.
import { audioFiles } from './tts.js';
import { IMG } from './data/images.js';
import { S, save } from './store.js';
import { icon } from './ui.js';

const MEDIA = 'block-media';
const FONTS = 'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=JetBrains+Mono:wght@500;700&family=Onest:wght@400;500;600;700;800&family=Oswald:wght@500;600;700&display=swap';
let running = false, pill = null;
export const offlineState = () => (S.offline = S.offline || { done: 0, total: 0, complete: false });

function drawPill(done, total) {
  if (!pill) { pill = document.createElement('div'); pill.className = 'dl-pill'; document.body.appendChild(pill); }
  const pct = total ? Math.floor(done / total * 100) : 0;
  pill.innerHTML = `${icon('bolt', 'tiny')} Офлайн-пакет: ${pct}%<i style="width:${pct}%"></i>`;
  pill.classList.toggle('hide', pct >= 100);
  document.dispatchEvent(new CustomEvent('offline-progress', { detail: { done, total, pct } }));
}

async function fontUrls() {
  try {
    const css = await (await fetch(FONTS)).text();
    return [FONTS, ...[...css.matchAll(/url\((https:[^)]+\.woff2)\)/g)].map(m => m[1])];
  } catch (e) { return []; }
}

/** Download everything that is not cached yet. Safe to call many times. */
export async function downloadAll({ force = false } = {}) {
  if (running || !('caches' in window) || !navigator.onLine) return;
  const st = offlineState();
  if (st.complete && st.accent === S.settings.accent && !force) return;
  running = true;
  try {
    if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
    const cache = await caches.open(MEDIA);
    // only the chosen accent's narrator voices (the other accent ≈ 55 MB) — characters always keep their own voice
    const other = S.settings.accent === 'gb' ? /^us-/ : /^gb-/;
    const urls = [...audioFiles().filter(f => !other.test(f)).map(f => 'audio/' + f), ...new Set(Object.values(IMG)), ...(await fontUrls())];
    let done = 0;
    st.total = urls.length;
    const queue = urls.slice();
    const worker = async () => {
      while (queue.length) {
        if (!navigator.onLine) return;
        const u = queue.shift();
        const abs = new URL(u, location.href).href;
        try {
          if (!(await cache.match(abs))) {
            const cross = !abs.startsWith(location.origin);
            const res = await fetch(abs, cross && abs.includes('pinimg') ? { mode: 'no-cors' } : {});
            if (res.ok || res.type === 'opaque') await cache.put(abs, res);
          }
        } catch (e) { /* try again next time */ }
        done++;
        if (done % 25 === 0 || done === urls.length) { st.done = done; drawPill(done, urls.length); save(); }
      }
    };
    drawPill(0, urls.length);
    await Promise.all(Array.from({ length: 6 }, worker));
    if (done >= urls.length) { st.complete = true; st.accent = S.settings.accent; st.at = Date.now(); save(); }
  } finally { running = false; }
}

/** Start automatically a few seconds after launch, and again when the connection comes back. */
export function initOffline() {
  setTimeout(() => downloadAll(), 4000);
  window.addEventListener('online', () => downloadAll());
}
