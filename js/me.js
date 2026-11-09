// Profile: stats, progress by section, dictionary, flashcards (SM-2), mistakes, settings, app scheme.
import { esc, icon, bullet, toast, plural, haptic } from './ui.js';
import { en, words, ipaRu, sayForm } from './words.js';
import { say } from './tts.js';
import { S, save, addXP, resetAll, today } from './store.js';
import { LESSONS } from './data/lessons.js';
import { SECTIONS, progressOf } from './library.js';
import { dueCards, gradeCard, GRADES, activeMistakes, dueMistakes, reviewMistake } from './srs.js';
import { renderOne } from './exercises.js';
import { aiCfg, aiSave, aiModels, aiReply } from './ai.js';
import { offlineState, downloadAll } from './offline.js';

export function meHTML() {
  const lessons = LESSONS.filter(l => S.done[l.id] && S.done[l.id].at).length;
  const nWords = Object.keys(S.words).length;
  const due = dueCards().length, mis = activeMistakes().length;
  const level = S.xp < 300 ? 'A2' : S.xp < 900 ? 'A2+' : S.xp < 2000 ? 'B1' : 'B1+';
  const week = [...Array(7)].map((_, k) => { const d = new Date(); d.setDate(d.getDate() - 6 + k); const key = today(d); return { n: S.days[key] || 0, l: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][d.getDay()] }; });
  const mx = Math.max(30, ...week.map(w => w.n));
  return `<div class="me">
    <div class="me-card glass-card">
      <div class="me-av">${icon('user')}</div>
      <div><h2>Ты</h2><div class="muted small">Цель: уверенный B1+ · разговорный и деловой</div>
        <div class="lvl-row"><span class="chip">${level}</span>${icon('next', 'tiny')}<span class="chip ghost">B1+</span></div></div>
    </div>
    <div class="stats">
      <div class="stat card"><b>${S.xp}</b><span>XP</span></div>
      <div class="stat card">${icon('flame')}<b>${S.streak}</b><span>${plural(S.streak, 'день', 'дня', 'дней')} подряд</span></div>
      <div class="stat card"><b>${lessons}/${LESSONS.length}</b><span>эпизодов</span></div>
      <div class="stat card"><b>${nWords}</b><span>в словаре</span></div>
    </div>
    <div class="card week"><div class="lbl">Активность за неделю</div><div class="bars7">${week.map(w => `<div><i style="height:${Math.round(w.n / mx * 100)}%"></i><span>${w.l}</span></div>`).join('')}</div></div>
    <div class="me-actions">
      <a class="act card" href="#/me/cards">${icon('cards')}<div><b>Карточки</b><span>${due ? `${due} на сегодня` : 'на сегодня всё'}</span></div>${due ? `<span class="badge">${due}</span>` : ''}</a>
      <a class="act card" href="#/me/dict">${icon('book')}<div><b>Мой словарь</b><span>${nWords} ${plural(nWords, 'слово', 'слова', 'слов')} и фраз</span></div></a>
      <a class="act card" href="#/me/mistakes">${icon('undo')}<div><b>Работа над ошибками</b><span>${mis ? `${mis} ${plural(mis, 'ошибка', 'ошибки', 'ошибок')}` : 'ошибок нет'}</span></div>${dueMistakes().length ? `<span class="badge">${dueMistakes().length}</span>` : ''}</a>
    </div>
    <h3 class="sec-h">Прогресс по разделам</h3>
    <div class="glass-card prog">${SECTIONS.filter(s => progressOf(s.id) != null).map(s => `<a class="prog-row" href="#/lib/${s.id}">${bullet(s.ch, s.color)}<span>${esc(s.title)}</span><div class="bar"><i style="width:${progressOf(s.id)}%;background:${s.color}"></i></div><b>${progressOf(s.id)}%</b></a>`).join('')}</div>
    <div class="list glass-card">
      <a class="li" href="#/me/settings">${icon('gear')}<b>Настройки</b>${icon('next')}</a>
      <a class="li" href="#/me/scheme">${icon('map')}<b>Как устроено приложение</b>${icon('next')}</a>
      <a class="li" href="#/lib/method">${icon('spark')}<b>Метод обучения</b>${icon('next')}</a>
    </div></div>`;
}

/* ---------- dictionary ---------- */
export function dictPage() {
  return {
    title: 'Мой словарь', back: '#/me',
    html: `<div class="search glass">${icon('search')}<input type="search" placeholder="Поиск по словарю…" autocapitalize="off"></div><div class="dict"></div>`,
    wire(root) {
      const box = root.querySelector('.dict');
      const draw = q => {
        const items = Object.entries(S.words).filter(([, w]) => !q || (w.w + ' ' + w.ru).toLowerCase().includes(q)).sort((a, b) => b[1].added - a[1].added);
        if (!items.length) { box.innerHTML = `<div class="empty card">${icon('bookmark')}<p>${q ? 'Ничего не нашлось.' : 'Словарь пуст. Нажимай на любое английское слово и сохраняй его кнопкой «В мой словарь».'}</p></div>`; return; }
        box.innerHTML = items.map(([k, w]) => {
          const c = S.cards[k];
          return `<div class="dict-row card" data-k="${esc(k)}"><div class="dr-main"><b>${esc(w.w)}</b>${w.ipa ? ` <span class="muted small">/${esc(w.ipa)}/ [${esc(ipaRu(w.ipa))}]</span>` : ''}<div>${esc(w.ru)}</div>${w.ex && !w.phrase ? `<div class="muted small dr-ex">${esc(w.ex)}</div>` : ''}</div>
            <div class="dr-side"><button class="icon-btn dr-say">${icon('sound')}</button><span class="muted tiny">${c ? (c.reps ? `повтор ${c.due.slice(5).split('-').reverse().join('.')}` : 'новое') : ''}</span><button class="icon-btn dr-del" aria-label="Удалить">${icon('x')}</button></div></div>`;
        }).join('');
      };
      box.addEventListener('click', e => {
        const row = e.target.closest('.dict-row'); if (!row) return;
        const k = row.dataset.k, w = S.words[k];
        if (e.target.closest('.dr-say')) say(w.phrase ? w.w : sayForm(w.w), { v: 'w', btn: e.target.closest('.dr-say') });
        if (e.target.closest('.dr-del')) { delete S.words[k]; delete S.cards[k]; save(); row.remove(); }
      });
      root.querySelector('input').addEventListener('input', e => draw(e.target.value.trim().toLowerCase()));
      draw('');
    },
  };
}

/* ---------- flashcards ---------- */
export function cardsPage() {
  return {
    title: 'Карточки', back: '#/me',
    html: `<div class="fc-host"></div>`,
    wire(root) {
      const host = root.querySelector('.fc-host');
      let queue = dueCards(), done = 0, mode = 'en';
      const draw = () => {
        if (!queue.length) {
          const total = Object.keys(S.cards).length;
          host.innerHTML = `<div class="empty card">${icon('check')}<h3>${done ? `Готово: ${done} ${plural(done, 'карточка', 'карточки', 'карточек')}` : 'На сегодня карточек нет'}</h3>
            <p>${total ? 'Следующие повторения придут по расписанию (интервальное повторение SM-2).' : 'Сохраняй слова и фразы из уроков — они появятся здесь.'}</p>
            ${total ? '<button class="btn ghost btn-extra">Повторить всё ещё раз</button>' : '<a class="btn primary" href="#/path">К урокам</a>'}</div>`;
          host.querySelector('.btn-extra')?.addEventListener('click', () => { queue = Object.keys(S.cards).filter(k => S.words[k]); draw(); });
          return;
        }
        const k = queue[0], w = S.words[k];
        const front = mode === 'en' ? `<div class="fc-word">${en(w.w, { v: 'w' })}</div>${w.ipa ? `<div class="muted">/${esc(w.ipa)}/</div>` : ''}` : `<div class="fc-word ru-w">${esc(w.ru)}</div><div class="muted small">вспомни по-английски</div>`;
        host.innerHTML = `<div class="fc-top"><span class="muted">${queue.length} осталось</span><div class="seg mini"><button class="${mode === 'en' ? 'on' : ''}" data-m="en">EN → RU</button><button class="${mode === 'ru' ? 'on' : ''}" data-m="ru">RU → EN</button></div></div>
          <div class="flip"><div class="flip-in">
            <div class="face front card">${front}<button class="pill fc-say">${icon('sound')}</button><span class="muted small tap-hint">нажми, чтобы перевернуть</span></div>
            <div class="face back card"><div class="fc-word">${esc(w.w)}</div>${w.ipa ? `<div class="muted">/${esc(w.ipa)}/ [${esc(ipaRu(w.ipa))}]</div>` : ''}<div class="fc-ru">${esc(w.ru)}</div>${w.ex && w.ex !== w.w ? `<div class="fc-ex">${en(w.ex, { v: w.exV || 'f', ru: w.exRu })}${w.exRu ? `<div class="ru">${esc(w.exRu)}</div>` : ''}</div>` : ''}</div>
          </div></div>
          <div class="grades" hidden>${GRADES.map(g => `<button class="grade ${g.cls}" data-q="${g.q}">${esc(g.label)}</button>`).join('')}</div>`;
        const flip = host.querySelector('.flip');
        const speak = () => say(w.w, { v: 'w' });
        if (mode === 'en') speak();
        flip.addEventListener('click', e => {
          if (e.target.closest('.w') || e.target.closest('.fc-say')) return;
          flip.classList.add('on'); host.querySelector('.grades').hidden = false;
          if (mode === 'ru') speak();
        });
        host.querySelector('.fc-say').addEventListener('click', e => { e.stopPropagation(); speak(); });
        host.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => { mode = b.dataset.m; draw(); }));
        host.querySelectorAll('.grade').forEach(b => b.addEventListener('click', () => {
          const q = +b.dataset.q;
          gradeCard(k, q); haptic(); addXP(1);
          queue.shift(); done++;
          if (done >= 5 || !queue.length) document.dispatchEvent(new CustomEvent('daily', { detail: 'cards' }));
          if (q < 3) queue.push(k); // see it again in this session
          draw();
        }));
      };
      draw();
    },
  };
}

/* ---------- mistakes ---------- */
export function mistakesPage() {
  return {
    title: 'Работа над ошибками', back: '#/me',
    html: `<p class="lead">Сюда попадает каждый неверный ответ. Ошибка уходит из списка, когда ответишь правильно два раза в разные дни.</p><div class="mis-host"></div>`,
    wire(root) {
      const host = root.querySelector('.mis-host');
      let queue = dueMistakes();
      const later = activeMistakes().length - queue.length;
      const draw = () => {
        if (!queue.length) {
          host.innerHTML = `<div class="empty card">${icon('check')}<h3>На сегодня всё</h3><p>${later > 0 ? `Ещё ${later} ${plural(later, 'ошибка вернётся', 'ошибки вернутся', 'ошибок вернутся')} позже.` : 'Активных ошибок нет. Так держать!'}</p></div>`;
          return;
        }
        const id = queue[0], m = S.mistakes[id];
        host.innerHTML = `<div class="muted small">${queue.length} в очереди · ошибался ${m.n} ${plural(m.n, 'раз', 'раза', 'раз')}</div><div class="ex card"></div><button class="btn primary wide btn-next" hidden>Дальше ${icon('next')}</button>`;
        renderOne(host.querySelector('.ex'), m.ex, ok => {
          reviewMistake(id, ok); if (ok) addXP(2);
          host.querySelector('.btn-next').hidden = false;
        });
        host.querySelector('.btn-next').addEventListener('click', () => { queue.shift(); draw(); });
      };
      draw();
    },
  };
}

/* ---------- settings ---------- */
export function settingsPage() {
  const s = S.settings;
  return {
    title: 'Настройки', back: '#/me',
    html: `<div class="list glass-card">
      <div class="li col"><b>Акцент озвучки</b><span class="muted small">Слова, примеры и твои реплики. Персонажи всегда говорят своими голосами (Лиам — британец).</span>
        <div class="seg" data-k="accent"><button data-v="us" class="${s.accent === 'us' ? 'on' : ''}">🇺🇸 Американский</button><button data-v="gb" class="${s.accent === 'gb' ? 'on' : ''}">🇬🇧 Британский</button></div>
        <button class="pill test-voice">${icon('sound')} Послушать</button></div>
      <div class="li col"><b>Тема</b>
        <div class="seg" data-k="theme">${[['auto', 'как в системе'], ['light', 'светлая'], ['dark', 'тёмная']].map(([v, l]) => `<button data-v="${v}" class="${(s.theme || 'auto') === v ? 'on' : ''}">${l}</button>`).join('')}</div></div>
      <div class="li col"><b>Скорость речи</b>
        <div class="seg" data-k="rate">${[0.75, 0.9, 1].map(r => `<button data-v="${r}" class="${s.rate === r ? 'on' : ''}">${r === 1 ? 'обычная' : r === 0.9 ? 'чуть медленнее' : 'медленно'}</button>`).join('')}</div></div>
      <div class="li col"><b>Русский перевод в диалогах</b>
        <div class="seg" data-k="ru"><button data-v="0" class="${!s.ru ? 'on' : ''}">скрыт (лучше для мозга)</button><button data-v="1" class="${s.ru ? 'on' : ''}">показан</button></div></div>
    </div>
    <h3 class="sec-h">Офлайн</h3>
    <div class="list glass-card"><div class="li col"><b>Офлайн-пакет</b><span class="muted small off-st">${offlineState().complete ? 'Скачано всё: приложение работает без интернета (кроме нейросети).' : `Скачано ${offlineState().done || 0} из ${offlineState().total || '…'} файлов (озвучка, фото, шрифты).`}</span>
      <button class="btn ghost sm off-btn">${icon('bolt')} Докачать сейчас</button></div></div>
    <h3 class="sec-h">Нейросеть в чатах</h3>
    <div class="list glass-card ai-set">
      <div class="li col"><b>Свободная переписка с персонажами</b><span class="muted small">Через Groq. Ключ хранится только на этом устройстве. Без ключа работают обычные сценарии.</span>
        <div class="seg" data-ai="on"><button data-v="1" class="${aiCfg().on ? 'on' : ''}">включена</button><button data-v="0" class="${!aiCfg().on ? 'on' : ''}">выключена</button></div></div>
      <div class="li col"><b>Ключ Groq API</b><span class="muted small">console.groq.com → API Keys → Create. Начинается с gsk_.</span>
        <input class="ai-key" type="password" autocomplete="off" spellcheck="false" placeholder="gsk_…" value="${esc(aiCfg().key || '')}">
        <button class="btn ghost sm ai-check">${icon('check')} Проверить ключ и загрузить модели</button><div class="ai-msg muted small"></div></div>
      <div class="li col"><b>Сообщения от персонажей</b><span class="muted small">После каждого пройденного эпизода кто-то из героев пишет тебе готовый диалог по теме урока — без нейросети, токены не тратятся. Нейросеть отвечает, только когда пишешь ты сам.</span>
        <div class="seg" data-k="notify"><button data-v="1" class="${s.notify ? 'on' : ''}">уведомления вкл.</button><button data-v="0" class="${!s.notify ? 'on' : ''}">только в приложении</button></div></div>
      <div class="li col"><b>Модель</b><select class="ai-model"><option value="${esc(aiCfg().model)}">${esc(aiCfg().model)}</option></select>
        <span class="muted small">По умолчанию openai/gpt-oss-120b — самая сильная из рабочих моделей Groq.</span></div>
    </div>
    <div class="card muted small">Голоса: Microsoft Neural (Ava, Andrew, Sonia, Ryan, Brian, Emma и др.), записаны заранее через edge-tts. Если для фразы нет записи — говорит голос твоего устройства.</div>
    <button class="btn danger wide btn-reset">${icon('x')} Сбросить весь прогресс</button>`,
    wire(root) {
      root.querySelectorAll('.seg').forEach(seg => seg.addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
        const k = seg.dataset.k;
        s[k] = k === 'rate' ? +b.dataset.v : (k === 'ru' || k === 'notify') ? b.dataset.v === '1' : b.dataset.v;
        if (k === 'notify' && s.notify && 'Notification' in window && Notification.permission === 'default') Notification.requestPermission();
        save();
        document.dispatchEvent(new Event('settings'));
      }));
      root.querySelector('.test-voice').addEventListener('click', e => say("Hey! How's it going? I'm really glad you're here.", { v: 'f', btn: e.currentTarget }));
      const offSt = root.querySelector('.off-st');
      root.querySelector('.off-btn').addEventListener('click', () => { offSt.textContent = 'Проверяю и докачиваю…'; downloadAll({ force: true }); });
      document.addEventListener('offline-progress', e => { if (offSt.isConnected) offSt.textContent = e.detail.pct >= 100 ? 'Скачано всё: приложение работает без интернета (кроме нейросети).' : `Скачивается: ${e.detail.pct}% (${e.detail.done} из ${e.detail.total})`; });
      const box = root.querySelector('.ai-set'), msg = box.querySelector('.ai-msg'), sel = box.querySelector('.ai-model'), key = box.querySelector('.ai-key');
      box.querySelector('[data-ai="on"]').addEventListener('click', e => {
        const b = e.target.closest('button'); if (!b) return;
        box.querySelectorAll('[data-ai="on"] button').forEach(x => x.classList.toggle('on', x === b));
        aiSave({ on: b.dataset.v === '1' });
      });
      key.addEventListener('change', () => aiSave({ key: key.value.trim() }));
      sel.addEventListener('change', () => aiSave({ model: sel.value }));
      box.querySelector('.ai-check').addEventListener('click', async () => {
        aiSave({ key: key.value.trim() });
        msg.textContent = 'Проверяю…';
        try {
          const ids = await aiModels(key.value.trim());
          const cur = ids.includes(aiCfg().model) ? aiCfg().model : ids[0];
          sel.innerHTML = ids.map(id => `<option value="${esc(id)}" ${id === cur ? 'selected' : ''}>${esc(id)}</option>`).join('');
          aiSave({ model: cur, on: true });
          box.querySelectorAll('[data-ai="on"] button').forEach(x => x.classList.toggle('on', x.dataset.v === '1'));
          msg.textContent = 'Пробный ответ от Джея…';
          const r = await aiReply('jay', 'yo jay, just testing if u can hear me');
          msg.innerHTML = `${icon('check', 'tiny')} Работает. Джей: «${esc(r.reply.split('\n')[0])}»`;
        } catch (err) { msg.textContent = 'Ошибка: ' + (err.message || err); }
      });
      root.querySelector('.btn-reset').addEventListener('click', () => { if (confirm('Удалить весь прогресс, словарь и чаты?')) resetAll(); });
    },
  };
}

/* ---------- scheme ---------- */
export function schemePage() {
  const node = (ic, t, s, c = '') => `<div class="sch-node glass-card ${c}"><span class="sch-ic">${icon(ic)}</span><div><b>${esc(t)}</b><span>${esc(s)}</span></div></div>`;
  return {
    title: 'Схема приложения', back: '#/me',
    html: `<p class="lead">Как всё связано: эпизоды — центр, всё остальное их подпитывает и закрепляет.</p>
      <div class="scheme">
        <div class="sch-row">${node('feed', 'Лента', 'посты персонажей, сторис, мемы')}${node('path', 'Путь', 'линия метро: 12 эпизодов в каждом городе', 'hot')}</div>
        <div class="sch-arrow">${icon('next')}</div>
        <div class="sch-ep glass-card"><div class="lbl">Эпизод (15–20 минут)</div>
          <div class="sch-steps">${['Сцена', 'Фразы', 'Грамматика', 'Мем', 'Тест', 'Сленг', 'Культура', 'Видео', 'Чат'].map((x, i) => `<span class="chip">${i + 1}. ${x}</span>`).join('')}</div></div>
        <div class="sch-split"><div>${icon('next')}</div><div>${icon('next')}</div><div>${icon('next')}</div></div>
        <div class="sch-row three">${node('chat', 'Чаты', 'персонаж пишет тебе после эпизода')}${node('book', 'Словарь', 'любое слово → сохранить')}${node('undo', 'Ошибки', 'каждый неверный ответ')}</div>
        <div class="sch-arrow">${icon('next')}</div>
        <div class="sch-row">${node('cards', 'Карточки', 'интервальное повторение SM-2')}${node('trophy', 'Прогресс', 'XP, серия дней, % по разделам')}</div>
        <div class="sch-lib glass-card"><div class="lbl">Разделы — справочник в любой момент</div><div class="sch-steps">${SECTIONS.map(s => `${bullet(s.ch, s.color)}<span>${esc(s.title)}</span>`).join('')}</div></div>
        <div class="card"><div class="lbl">Одно касание везде</div><p>${icon('info', 'tiny')} Любое английское слово в приложении нажимается: перевод, транскрипция (IPA + русскими буквами), озвучка US/UK, пример из текста и сохранение в словарь.</p></div>
      </div>`,
  };
}
