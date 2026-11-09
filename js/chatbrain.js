// Rule-based "brain" for the chats (no neural network): looks at the words you typed and the context
// of the scenario, and returns reactions of the character + coach notes.
import { SLANG } from './data/slang.js';
import { LESSONS } from './data/lessons.js';
import { S } from './store.js';
import { normalize } from './check.js';

const SWEAR = [
  [/\b(f+u+c+k+\w*|motherf\w*|mf)\b/i, 2, 'f-word'], [/\b(shit\w*|bullshit)\b/i, 2, 'shit'], [/\bbitch\w*\b/i, 2, 'bitch'], [/\b(asshole|dumbass|dick)\b/i, 2, 'оскорбление'],
  [/\bwanker\b/i, 2, 'wanker'], [/\b(damn|dammit|goddamn)\b/i, 1, 'damn'], [/\bhell\b/i, 1, 'hell'], [/\bcrap\b/i, 1, 'crap'], [/\bass\b/i, 1, 'ass'],
  [/\b(bloody|bollocks|piss\w*)\b/i, 1, 'британский мат'],
];
const PAST = /\b(was|were|did|didn't|went|saw|got|had|made|took|came|wrote|ate|slept|bought|met|told|thought|knew|felt|left|lost|ran|sat|said|forgot|heard|found|played|watched|started|finished|tried|stayed|walked|worked|studied|visited|called|talked|danced|stretched|missed|cooked|visited|moved|arrived|stopped|realized)\b/i;
const PERFECT = /\b(have|has|i've|you've|we've|they've|he's|she's|haven't|hasn't)\s+(\w+\s+)?(been|done|gone|had|seen|eaten|made|got|gotten|tried|stretched|finished|started|written|met|heard|never|already|just|lived|known|worked|played|watched|felt)\b/i;
const FUTURE = /\b(will|'ll|won't|going to|gonna)\b|\b(i'm|i am|we're)\s+\w+ing\s+(tomorrow|tonight|next|on|at)\b/i;
const CONT = /\b(am|is|are|was|were|'m|'re|'s)\s+\w+ing\b/i;
export const TENSES = {
  present: { re: /\b(usually|often|always|sometimes|every|on weekends|on saturdays)\b|\bi (go|hit|watch|play|work|study|sleep|chill|read|listen|meet|make|catch)\b/i, ru: 'Present Simple (I usually go…)' },
  past: { re: PAST, ru: 'Past Simple (went, watched, did…)' },
  perfect: { re: PERFECT, ru: 'Present Perfect (have done, have been…)' },
  future: { re: FUTURE, ru: 'будущее (will / going to)' },
  cont: { re: CONT, ru: 'Continuous (be + -ing)' },
  pastcont: { re: /\b(was|were)\s+\w+ing\b/i, ru: 'Past Continuous (was / were + -ing)' },
  usedto: { re: /\bused to\b/i, ru: 'used to + глагол' },
  pastperf: { re: /\bhad\s+(\w+\s+)?(\w+ed|been|gone|done|seen|left|eaten|got|taken|forgotten|lost|already|never|just)\b/i, ru: 'Past Perfect (had + V3)' },
};

const slangWords = SLANG.flatMap(s => s.w.toLowerCase().replace(/\*/g, '').split(' / ').map(w => ({ w: w.trim(), s }))).filter(x => x.w.length > 1 && x.s.lvl === 0 && !['deal', 'mate', 'cheers', 'proper', 'fancy', 'chill', 'man', 'bro', 'dude', 'yo', "what's up"].includes(x.w));

/** Phrases (chunks) of lessons you have finished — used to praise you when you use them. */
function learnedPhrases() {
  const out = [];
  for (const L of LESSONS) {
    if (!(S.done[L.id] && S.done[L.id].at)) continue;
    for (const st of L.steps) if (st.t === 'chunks') for (const c of st.items) {
      const n = normalize(c.en.replace(/…|\.\.\./g, ''));
      if (n.split(' ').length >= 2) out.push({ n, en: c.en });
    }
  }
  return out;
}

export function analyze(text, { formal = false, expect = null } = {}) {
  const t = text.toLowerCase().replace(/[’‘]/g, "'");
  const res = { cyr: /[а-яё]/i.test(text) && !/[a-z]{3,}/i.test(text), notes: [], swear: null, slang: null, phrase: null, question: false, tenseMiss: null, short: false };
  for (const [re, lvl, w] of SWEAR) { if (re.test(t)) { res.swear = { lvl, w }; break; } }
  const sl = slangWords.find(x => new RegExp(`(^|[^a-z'])${x.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z']|$)`).test(t));
  if (sl) res.slang = sl;
  const nt = ' ' + normalize(text) + ' ';
  const ph = learnedPhrases().find(p => nt.includes(' ' + p.n + ' '));
  if (ph) res.phrase = ph;
  res.question = /\?\s*$/.test(text) || /\b(and you|wbu|how about you|what about you|and u|hbu)\b/.test(t);
  res.short = t.split(/\s+/).filter(Boolean).length <= 1;
  if (expect && TENSES[expect.t] && !TENSES[expect.t].re.test(t) && !res.short) res.tenseMiss = { t: expect.t, ex: expect.ex };
  if (formal) {
    if (/^(send|give|tell|do|make|call|write)\b/.test(t.trim()) && !/\bplease\b/.test(t)) res.notes.push('Звучит как приказ. Начни с Could you… / Would you mind… или добавь please.');
    if (/\b(u|ur|lol|lmao|bro|dude|gonna|wanna|ya|yep|nah)\b/.test(t)) res.notes.push('Для наставницы это слишком неформально: без u / lol / bro / gonna. Пиши полными словами.');
    if (/\bi want\b/.test(t)) res.notes.push('«I want…» на работе звучит резко. Лучше: I’d like… / Could I…?');
  }
  return res;
}

/** Character reactions. {w} is replaced with the word. */
export const REACT = {
  cyrillic: {
    jay: { en: "bro I don't speak russian 😂 english pls", ru: 'бро, я не говорю по-русски. по-английски, плиз' },
    liam: { en: "Mate, my Russian is limited to \"privet\" 😅 English, please!", ru: 'Дружище, мой русский — это только «привет». По-английски, пожалуйста!' },
    ty: { en: 'huh? 😂 english bro', ru: 'а? по-английски, бро' },
    diego: { en: "dude I can't read that 😂", ru: 'чувак, я не могу это прочитать' },
    maya: { en: 'Could you write that in English? 🙂', ru: 'Можешь написать это по-английски?' },
    marcus: { en: 'nah fam, english 😂', ru: 'не, брат, по-английски' },
  },
  slang: {
    jay: { en: 'ayy "{w}" 🔥 u sound like a real new yorker', ru: 'эй, «{w}» — звучишь как настоящий ньюйоркец' },
    liam: { en: '"{w}"? Look at you with the slang, mate 😄', ru: '«{w}»? Смотрите-ка, он со сленгом' },
    ty: { en: '"{w}" 😂 u learning fast bro', ru: '«{w}» — быстро учишься, бро' },
    diego: { en: 'dude "{w}" 😂 love it', ru: 'чувак, «{w}» — обожаю' },
    marcus: { en: '"{w}" 😂 ok I see u', ru: '«{w}» — ладно, вижу тебя' },
  },
  swear1: {
    jay: { en: 'lmao easy 😂', ru: 'ахах, полегче' }, liam: { en: 'Ha! Language! 😄', ru: 'Ха! Выражения!' },
    ty: { en: '😂😂', ru: '' }, diego: { en: 'haha dude', ru: 'ха-ха, чувак' },
    maya: { en: "Let's keep it professional, please 🙂", ru: 'Давай держаться профессионально, пожалуйста' }, marcus: { en: 'lol', ru: '' },
  },
  swear2: {
    jay: { en: "yo chill 😳 that's a strong word", ru: 'эй, спокойнее, это сильное слово' }, liam: { en: 'Whoa, mate. Bit much 😬', ru: 'Ого, дружище. Перебор' },
    ty: { en: 'bro 😳 relax', ru: 'бро, расслабься' }, diego: { en: 'dude, too much 😬', ru: 'чувак, слишком' },
    maya: { en: "Max, that's not okay at work.", ru: 'Макс, на работе так нельзя.' }, marcus: { en: 'damn ok 😂 u mad?', ru: 'ну ок, ты злишься?' },
  },
};
export const COACH = {
  swear2: 'Это очень грубое слово. С близкими друзьями иногда можно, с малознакомыми и на работе — нельзя.',
  swearFormal: 'На работе даже мягкие ругательства (damn, crap) лучше не использовать.',
  slangFormal: 'С наставницей лучше без сленга: «{w}» звучит слишком неформально.',
  short: 'Ответ из одного слова звучит сухо. Попробуй полное предложение.',
};
