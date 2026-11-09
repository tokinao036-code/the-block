// Incoming messages. Characters never text on their own via the AI (that burned tokens):
// a scripted dialog arrives when you finish an episode (see unlockChats in chat.js).
// This module only "delivers" it like a real message: chime, banner, or a system notification.
import { S } from './store.js';
import { CHARS } from './data/chars.js';
import { avatar } from './img.js';
import { esc, toast, haptic } from './ui.js';

function chime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [880, 1320].forEach((f, i) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = f; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.09); g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + i * 0.09 + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.09 + 0.25); o.start(ctx.currentTime + i * 0.09); o.stop(ctx.currentTime + i * 0.09 + 0.3); });
  } catch (e) {}
}

/** Show a new message from `who`: system notification when the app is hidden, otherwise banner + chime. */
export async function announce(who, text, { newContact = false } = {}) {
  const c = CHARS[who];
  if (!c) return;
  const title = (newContact ? 'Новый контакт: ' : '') + c.name;
  if (document.hidden && 'Notification' in window && Notification.permission === 'granted' && S.settings.notify) {
    try {
      const reg = await navigator.serviceWorker?.getRegistration();
      const opts = { body: text, icon: 'icons/icon-192.png', tag: 'chat-' + who, data: { url: `#/chat/${who}` } };
      reg ? reg.showNotification(title, opts) : new Notification(title, opts);
    } catch (e) {}
    return;
  }
  if (location.hash.startsWith(`#/chat/${who}`)) return;
  chime(); haptic();
  toast(`<div class="toast-msg">${avatar(who)}<div><b>${esc(title)}</b><div>${esc(text)}</div></div></div>`, { ms: 6000, tap: () => { location.hash = `#/chat/${who}`; } });
}
