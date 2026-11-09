// SM-2 spaced repetition for saved words + the mistakes log.
import { S, save, today, addDays } from './store.js';

export const GRADES = [
  { q: 1, label: 'Не помню', cls: 'bad' },
  { q: 3, label: 'С трудом', cls: 'mid' },
  { q: 4, label: 'Помню', cls: 'ok' },
  { q: 5, label: 'Легко', cls: 'easy' },
];

export function sm2(c, q) {
  c.ef = c.ef ?? 2.5; c.reps = c.reps ?? 0; c.ivl = c.ivl ?? 0;
  if (q < 3) { c.reps = 0; c.ivl = 1; c.lapses = (c.lapses || 0) + 1; }
  else { c.ivl = c.reps === 0 ? 1 : c.reps === 1 ? 6 : Math.round(c.ivl * c.ef); c.reps++; }
  c.ef = Math.max(1.3, c.ef + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  c.due = addDays(today(), c.ivl);
  c.last = today();
  return c;
}

/** A new card is due today, so the first review can happen right away. */
export function addCard(id) {
  if (S.cards[id]) return;
  S.cards[id] = { ef: 2.5, reps: 0, ivl: 0, due: today(), added: today() };
  save();
}
export function gradeCard(id, q) { if (S.cards[id]) { sm2(S.cards[id], q); save(); } }
export function dueCards() {
  const t = today();
  return Object.entries(S.cards).filter(([id, c]) => S.words[id] && c.due <= t).sort((a, b) => a[1].due.localeCompare(b[1].due)).map(([id]) => id);
}

/* mistakes: a wrong answer comes back until it is right twice on different days */
export function addMistake(ex, src) {
  const m = S.mistakes[ex.id] || (S.mistakes[ex.id] = { ex, src, n: 0 });
  m.ex = ex; m.n++; m.fixed = false; m.ok = 0; m.due = today();
  save();
}
export function reviewMistake(id, ok) {
  const m = S.mistakes[id]; if (!m) return;
  if (ok) { m.ok = (m.ok || 0) + 1; m.due = addDays(today(), m.ok === 1 ? 2 : 6); if (m.ok >= 2) m.fixed = true; }
  else { m.ok = 0; m.n++; m.due = addDays(today(), 1); }
  save();
}
export const activeMistakes = () => Object.entries(S.mistakes).filter(([, m]) => !m.fixed).map(([id]) => id);
export const dueMistakes = () => activeMistakes().filter(id => (S.mistakes[id].due || today()) <= today());
