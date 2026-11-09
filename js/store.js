// Local progress (localStorage). One object S, saved after every change.
const KEY = 'theblock.v1';

function defaults() {
  return {
    v: 1, xp: 0, streak: 0, lastDay: null, days: {},
    done: {},        // lessonId -> { score, total, at }
    pos: {},         // lessonId -> last step index
    words: {},       // lemma -> { w, ru, ipa, ex, exRu, exV, added }
    cards: {},       // lemma -> SM-2 state
    mistakes: {},    // exId -> { ex, n, due, ... }
    seen: { grammar: {}, slang: {}, culture: {}, music: {}, business: {}, speaking: {}, watch: {} },
    tests: {},       // "grammar:id" -> best score 0..1
    chats: {},       // scenarioId -> { node, log: [], done, unread }
    likes: {},
    settings: { accent: 'us', rate: 1, ru: false },
    onboard: false,
  };
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw && raw.v === 1) {
      const d = defaults();
      return { ...d, ...raw, seen: { ...d.seen, ...(raw.seen || {}) }, settings: { ...d.settings, ...(raw.settings || {}) } };
    }
  } catch (e) { /* private mode or broken JSON: start fresh */ }
  return defaults();
}

export const S = load();
let timer = 0;
export function save() {
  clearTimeout(timer);
  timer = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }, 60);
}
export function resetAll() { try { localStorage.removeItem(KEY); } catch (e) {} location.reload(); }

const pad = n => String(n).padStart(2, '0');
export const today = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export function addDays(day, n) { const d = new Date(day + 'T12:00:00'); d.setDate(d.getDate() + n); return today(d); }

/** XP + streak: any activity today keeps the streak alive. */
export function addXP(n) {
  const t = today();
  if (S.lastDay !== t) {
    S.streak = S.lastDay === addDays(t, -1) ? S.streak + 1 : 1;
    S.lastDay = t;
  }
  S.days[t] = (S.days[t] || 0) + n;
  S.xp += n;
  save();
  document.dispatchEvent(new CustomEvent('xp', { detail: n }));
}
export const streakAlive = () => S.lastDay === today() || S.lastDay === addDays(today(), -1);
export function markSeen(kind, id) { if (!S.seen[kind][id]) { S.seen[kind][id] = 1; save(); return true; } return false; }
