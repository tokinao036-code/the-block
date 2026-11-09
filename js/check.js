// Answer checking: normalisation (contractions, punctuation, case) and a word-level diff for feedback.
const CONTR = [
  [/\bwon't\b/g, 'will not'], [/\bcan't\b/g, 'can not'], [/\bcannot\b/g, 'can not'], [/\bain't\b/g, 'is not'],
  [/\bshan't\b/g, 'shall not'], [/n't\b/g, ' not'], [/\bi'm\b/g, 'i am'], [/'re\b/g, ' are'], [/'ve\b/g, ' have'],
  [/'ll\b/g, ' will'], [/'d\b/g, ' would'], [/\b(he|she|it|that|what|there|where|who|here|how|let)'s\b/g, (m, a) => a === 'let' ? 'let us' : `${a} is`],
  [/\bgonna\b/g, 'going to'], [/\bwanna\b/g, 'want to'],
];
export function normalize(s) {
  let t = String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[“”]/g, '"');
  for (const [re, rep] of CONTR) t = t.replace(re, rep);
  return t.replace(/[^a-z0-9' ]+/g, ' ').replace(/'/g, '').replace(/\s+/g, ' ').trim();
}
export const same = (a, b) => normalize(a) === normalize(b);

export function matchAny(input, answers) {
  const n = normalize(input);
  return answers.some(a => normalize(a) === n);
}

/** Closest accepted answer by word overlap. */
export function closest(input, answers) {
  const u = normalize(input).split(' ');
  let best = answers[0], score = -1;
  for (const a of answers) {
    const w = normalize(a).split(' ');
    const s = lcs(u, w).length * 2 - Math.abs(w.length - u.length);
    if (s > score) { score = s; best = a; }
  }
  return best;
}

function lcs(a, b) {
  const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) d[i][j] = a[i] === b[j] ? d[i + 1][j + 1] + 1 : Math.max(d[i + 1][j], d[i][j + 1]);
  const out = []; let i = 0, j = 0;
  while (i < m && j < n) { if (a[i] === b[j]) { out.push([i, j]); i++; j++; } else if (d[i + 1][j] >= d[i][j + 1]) i++; else j++; }
  return out;
}

/** Diff of user words vs answer words → { user: [{w, bad}], answer: [{w, miss}] } (normalised words). */
export function diff(input, answer) {
  const u = normalize(input).split(' ').filter(Boolean), a = normalize(answer).split(' ').filter(Boolean);
  const pairs = lcs(u, a);
  const ui = new Set(pairs.map(p => p[0])), ai = new Set(pairs.map(p => p[1]));
  return { user: u.map((w, i) => ({ w, bad: !ui.has(i) })), answer: a.map((w, i) => ({ w, miss: !ai.has(i) })) };
}
