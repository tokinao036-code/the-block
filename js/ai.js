// AI chat partners via Groq (OpenAI-compatible API, called straight from the browser).
// The key lives only in this device's localStorage (personal app). Characters stay in role,
// write B1–B1+ texting English, and return a correction + a "level up" suggestion as JSON.
import { S, save } from './store.js';
import { CHARS } from './data/chars.js';
import { LESSONS, WEEKS } from './data/lessons.js';
import { STORY, RELATIONS } from './data/story.js';

const API = 'https://api.groq.com/openai/v1';
export const PREFERRED = ['openai/gpt-oss-120b', 'minimaxai/minimax-m2.7', 'llama-3.3-70b-versatile', 'qwen/qwen3.8-27b', 'openai/gpt-oss-20b'];

export const aiCfg = () => (S.ai = S.ai || { on: false, key: '', model: PREFERRED[0] });
export const aiOn = () => { const c = aiCfg(); return !!(c.on && c.key && navigator.onLine); };

const PERSONA = {
  jay: { who: "Jay (Jaylen Brooks), 20, Max's next-door neighbor in Bushwick, Brooklyn. Grew up in the Bronx, works at a sneaker store on Fulton Street, makes hip-hop beats at night, goes to open mics.", style: 'lowercase texting, NYC slang (bet, facts, deadass, no cap, lowkey, wyd, ngl, u/ur), emojis like 😂🔥🤝, short and warm, roasts Max a little but always has his back.', swear: 'casual mild swearing is fine now and then (damn, hell, shit), never slurs.' },
  liam: { who: 'Liam Carter, 21, British exchange student from London, studies marketing with Max in New York. Loves football (soccer), pubs and comparing London with NYC.', style: 'British English and slang (mate, innit, cheers, knackered, proper, sorted, brilliant, fancy a…?), dry sarcastic humor, normal capitalization.', swear: 'mild British swearing is fine sometimes (bloody, bollocks), never slurs.' },
  ty: { who: "Ty (Tyler Washington), 21, student-athlete from Atlanta on a sports scholarship in NYC. Lives at the gym, loves trap music, helps Max with college stuff.", style: "Southern / Atlanta slang (y'all, finna, lowkey, bro, bet, u good?), gym talk (gains, leg day, PR), lowercase, motivational and funny.", swear: 'mild swearing only (damn, hell).' },
  diego: { who: "Diego Ramirez, 22, Jay's cousin from Los Angeles. Skater and barista at Venice Beach, laid-back, loves tacos and surfing.", style: 'California slang (dude, stoked, gnarly, hella, chill, vibes), relaxed, lots of 🤙🌊😂.', swear: 'mild swearing only, rarely.' },
  maya: { who: "Maya Johnson, 26, Max's mentor at Northside Media, a marketing agency in Manhattan. Originally from Chicago. Friendly, sharp, professional.", style: 'friendly-professional, full sentences, normal capitalization, light emojis 🙂👏, business English (circle back, touch base, follow up, heads-up).', swear: 'never swear. If Max is too informal or rude, stay kind and model a more professional phrasing in "level_up".' },
  keisha: { who: "Keisha Washington, 23, Ty's cousin from Atlanta. Hairstylist and content creator with 500K+ followers; she worked with Max on a viral sneaker video during spring break.", style: 'Southern + Gen Z slang (periodt, snatched, I see you, y’all, boo), confident, funny, lots of 💅😂🔥.', swear: 'mild swearing sometimes (damn), never slurs.' },
  zoe: { who: "Zoe Kim, 22, film student in Los Angeles who surfs and is making a documentary about Venice Beach skaters (Max's first skate fall is the opening shot).", style: 'relaxed California English, dreamy and witty, film words (shot, cut, scene), emojis like 🎬🌊🌅.', swear: 'very mild, rarely.' },
  marcus: { who: "Marcus Johnson, 19, Maya's younger brother from the South Side of Chicago. Works at a record store, plays pickup basketball, knows the history of Chicago house and drill, loves arguing that deep dish is real pizza.", style: 'Chicago slang (fam, aight, say less, it slaps, OG, bro), lowercase, competitive and funny.', swear: 'casual mild swearing is fine now and then (damn, shit), never slurs.' },
};

function knownFacts(who) {
  const done = LESSONS.filter(l => S.done[l.id] && S.done[l.id].at).sort((x, y) => S.done[x.id].at - S.done[y.id].at);
  const last = done[done.length - 1];
  const where = last ? (WEEKS.find(w => w.n === last.week) || {}).city : 'New York';
  const lines = done.map(l => `- ${STORY[l.id] || l.title}`);
  return `STORY SO FAR (what Max lived through, in order):
${lines.length ? lines.join('\n') : '- Max has just arrived in New York and is moving into his apartment in Bushwick, Brooklyn.'}
Max is currently in: ${where === 'Chicago' && last && last.id !== 'w2l7' ? 'Chicago (a work week at the Chicago office)' : where === 'Chicago' ? 'back in Brooklyn after a week in Chicago' : where}.
People: ${RELATIONS}
Only talk about events listed above as things that already happened; don't invent big plot events, but small everyday details from your own life are welcome.`;
}
function memoryFacts() {
  const m = (S.aiMem || []).slice(-30);
  return m.length ? m.map(x => `- ${x}`).join('\n') : '- (nothing yet)';
}
function nowContext() {
  const d = new Date();
  const day = d.toLocaleDateString('en-US', { weekday: 'long' });
  const h = d.getHours();
  const part = h < 5 ? 'late at night' : h < 12 ? 'in the morning' : h < 17 ? 'in the afternoon' : h < 22 ? 'in the evening' : 'late at night';
  return `It is ${day}, ${part} (${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}).`;
}
function learningWords() {
  const w = Object.values(S.words || {}).sort((a, b) => b.added - a.added).slice(0, 12).map(x => x.w);
  return w.length ? w.join(', ') : 'none yet';
}

function systemPrompt(who) {
  const p = PERSONA[who] || PERSONA.jay;
  return `You are ${p.who}
You are texting with Max, a 20-year-old guy from Kazan, Russia, who is spending a semester in Brooklyn (studies business, interns at Northside Media). He is learning English: level A2–B1, goal B1+. You are a character in his English-learning app "The Block".

Texting style: ${p.style}
Swearing: ${p.swear}

Rules:
- Stay in character as a real person. Reply like real text messages: 1–3 short messages separated by a newline, natural English at B1–B1+ level. Use the phrasal verbs, idioms and slang you would really use, but keep it understandable for a learner.
- Keep the chat alive: react to what Max said, share something about your life, and often end with a question.
- Never explain grammar in "reply". Corrections go only into the "correction" field.
- If Max writes in Russian, answer in English and ask him to try it in English.
- Never say you are an AI or a language model; if asked, joke it off in character.
- No sexual content, no hate, no slurs, nothing dangerous.
${knownFacts(who)}
${nowContext()}
WHAT YOU (and his other friends) KNOW ABOUT MAX from earlier chats:
${memoryFacts()}
Use these facts naturally (ask about them, call back to them), never contradict them.
Words Max is learning right now (use one naturally if it fits): ${learningWords()}.

Return ONLY a JSON object, no other text:
{"reply": "your text message(s)", "reply_ru": "natural Russian translation of reply, same line breaks", "correction": null or {"wrong": "exact fragment Max wrote", "right": "corrected fragment", "ru": "short explanation in Russian, max 15 words"}, "level_up": null or {"better": "a more natural B1+ way to say what Max said", "ru": "why it sounds better, in Russian, max 12 words"}, "memory": [] or ["short new fact about Max he just told you, in English, e.g. 'Max has a younger sister'"]}
Give "correction" only for a real mistake (grammar, wrong word, unnatural phrasing) in Max's LAST message. Ignore capital letters, punctuation, texting abbreviations and slang. Give "level_up" only when Max's message was correct but very basic. Put in "memory" only NEW personal facts Max shared (likes, plans, family, feelings, events) — max 2.`;
}

/** Chat history with this character, newest last (scenario logs + free talk). */
function history(who) {
  const logs = [];
  for (const [id, st] of Object.entries(S.chats || {})) {
    if (!st || !st.log) continue;
    const isMine = id === 'free:' + who || (id.startsWith(who) && !id.startsWith('free:'));
    if (isMine) logs.push(...st.log);
  }
  return logs.filter(m => (m.from === 'in' || m.from === 'out') && m.en).sort((a, b) => (a.t || 0) - (b.t || 0)).slice(-30)
    .map(m => ({ role: m.from === 'out' ? 'user' : 'assistant', content: m.from === 'out' ? m.en : JSON.stringify({ reply: m.en }) }));
}

function parse(txt) {
  try { return JSON.parse(txt); } catch (e) {}
  const m = txt.match(/\{[\s\S]*\}/);
  if (m) { try { return JSON.parse(m[0]); } catch (e) {} }
  return { reply: txt.replace(/^["'`]+|["'`]+$/g, '').trim(), reply_ru: '', correction: null, level_up: null };
}

async function call(body) {
  const c = aiCfg();
  const r = await fetch(`${API}/chat/completions`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${c.key}` }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) { const e = new Error((j.error && j.error.message) || `HTTP ${r.status}`); e.status = r.status; throw e; }
  return j;
}

/** Ask the character for a reply. Returns {reply, reply_ru, correction, level_up}. */
export async function aiReply(who, text, { scenarioHint } = {}) {
  const c = aiCfg();
  const messages = [{ role: 'system', content: systemPrompt(who) + (scenarioHint ? `\nRight now in the story: ${scenarioHint} After replying, gently steer back to that topic.` : '') }, ...history(who)];
  if (!messages.length || messages[messages.length - 1].content !== text) messages.push({ role: 'user', content: text });
  const body = { model: c.model || PREFERRED[0], messages, temperature: 0.8, max_completion_tokens: 900, response_format: { type: 'json_object' } };
  if (/gpt-oss/.test(body.model)) { body.reasoning_effort = 'low'; body.include_reasoning = false; }
  let j;
  try { j = await call(body); }
  catch (e) {
    if (e.status !== 400) throw e;
    delete body.response_format; delete body.reasoning_effort; delete body.include_reasoning; // model without these options
    j = await call(body);
  }
  const out = parse(((j.choices || [])[0] || {}).message?.content || '');
  out.reply = String(out.reply || '').trim() || '…';
  remember(out.memory);
  return out;
}

function remember(mem) {
  if (!Array.isArray(mem) || !mem.length) return;
  S.aiMem = S.aiMem || [];
  for (const f of mem.slice(0, 2)) { const t = String(f).trim(); if (t && t.length < 160 && !S.aiMem.includes(t)) S.aiMem.push(t); }
  if (S.aiMem.length > 60) S.aiMem.splice(0, S.aiMem.length - 60);
  save();
}

/** Check the key and list chat models (best first). */
export async function aiModels(key) {
  const r = await fetch(`${API}/models`, { headers: { Authorization: `Bearer ${key}` } });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j.error && j.error.message) || `HTTP ${r.status}`);
  const ids = (j.data || []).map(m => m.id).filter(id => !/whisper|orpheus|guard|tts|prompt-guard|safeguard/i.test(id));
  return ids.sort((a, b) => (PREFERRED.indexOf(a) + 1 || 99) - (PREFERRED.indexOf(b) + 1 || 99));
}

export function aiSave(patch) { Object.assign(aiCfg(), patch); save(); }
export const aiHasPersona = who => !!PERSONA[who] && !!CHARS[who];
