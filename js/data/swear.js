// Swearing: what you hear in films, rap and on the street. Same format as slang.js
// (lvl 0 нейтрально/замена, 1 грубо, 2 очень грубо) plus a category for the Мат tab.
export const SWEAR_CATS = [
  { id: 'all', label: 'Всё' },
  { id: 'soft', label: 'Мягкие замены' },
  { id: 'curse', label: 'Ругательства' },
  { id: 'insult', label: 'Оскорбления' },
  { id: 'uk', label: 'Британский' },
  { id: 'react', label: 'Как реагировать' },
];

export const SWEAR = [
  /* мягкие замены — можно почти везде */
  { id: 'darn', cat: 'soft', w: 'darn / dang', reg: 'us', lvl: 0, tag: 'ругательство', ru: 'блин, чёрт (замена damn)', ex: { en: 'Darn, I left my keys at home.', ru: 'Блин, я оставил ключи дома.' }, ok: 'везде, даже при детях и на работе', no: '—' },
  { id: 'heck', cat: 'soft', w: 'heck / what the heck', reg: 'both', lvl: 0, tag: 'ругательство', ru: 'чёрт / какого чёрта (замена hell)', ex: { en: 'What the heck is going on?', ru: 'Что, чёрт возьми, происходит?' }, ok: 'везде', no: '—' },
  { id: 'frick', cat: 'soft', w: 'frick / fricking', reg: 'us', lvl: 0, tag: 'ругательство', ru: 'мягкая замена f-word (звучит смешно)', ex: { en: "This traffic is fricking insane.", ru: 'Эти пробки — просто дичь.' }, ok: 'с друзьями, коллегами', no: 'в письмах' },
  { id: 'effing', cat: 'soft', w: 'effing / the F-word', reg: 'both', lvl: 0, tag: 'ругательство', ru: 'когда f-word называют, но не произносят', ex: { en: "He dropped the F-word in front of my mom.", ru: 'Он ляпнул матом при моей маме.' }, ok: 'везде, чтобы говорить О мате', no: '—' },
  { id: 'oh-my-gosh', cat: 'soft', w: 'oh my gosh / OMG', reg: 'both', lvl: 0, tag: 'ругательство', ru: 'о боже (gosh — мягче, чем god)', ex: { en: 'Oh my gosh, you got the internship?!', ru: 'О боже, тебя взяли на стажировку?!' }, ok: 'везде', no: 'Oh my God некоторые верующие считают неуважительным' },
  { id: 'holy-cow', cat: 'soft', w: 'holy cow / holy moly', reg: 'us', lvl: 0, tag: 'ругательство', ru: 'ничего себе! (детская замена holy shit)', ex: { en: 'Holy cow, look at that line!', ru: 'Ничего себе, посмотри на эту очередь!' }, ok: 'везде, звучит мило', no: '—' },
  { id: 'bs', cat: 'soft', w: 'BS', reg: 'us', lvl: 0, tag: 'ругательство', ru: 'чушь (сокращение от bullshit, мягче)', ex: { en: "That excuse is total BS.", ru: 'Эта отмазка — полная чушь.' }, ok: 'с друзьями, коллегами-ровесниками', no: 'с начальником, в письмах' },
  { id: 'son-of-a-gun', cat: 'soft', w: 'son of a gun', reg: 'us', lvl: 0, tag: 'ругательство', ru: '«ах ты ж!» / «ну даёт!» — мягкая замена son of a bitch', ex: { en: 'You son of a gun, you actually did it!', ru: 'Ну ты даёшь, у тебя реально получилось!' }, ok: 'с друзьями, по-доброму', no: '—' },

  /* ругательства — эмоции, не про людей */
  { id: 'goddamn', cat: 'curse', w: 'goddamn / goddammit', reg: 'us', lvl: 1, tag: 'ругательство', ru: 'чёрт побери (для верующих — богохульство)', ex: { en: 'Goddammit, the train is late again.', ru: 'Чёрт побери, поезд опять опаздывает.' }, ok: 'с друзьями', no: 'при религиозных людях, на работе' },
  { id: 'screwed', cat: 'curse', w: "we're screwed", reg: 'us', lvl: 1, tag: 'ругательство', ru: 'нам конец, мы влипли', ex: { en: "The essay is due tomorrow and I haven't started. I'm screwed.", ru: 'Эссе сдавать завтра, а я не начал. Мне конец.' }, ok: 'с друзьями, однокурсниками', no: 'с преподавателем' },
  { id: 'damn-it', cat: 'curse', w: 'damn it', reg: 'both', lvl: 1, tag: 'ругательство', ru: 'чёрт возьми! (досада)', ex: { en: 'Damn it, I missed the bus.', ru: 'Чёрт, я опоздал на автобус.' }, ok: 'с друзьями, про себя', no: 'на собеседовании, при детях' },
  { id: 'half-assed', cat: 'curse', w: 'half-assed', reg: 'us', lvl: 1, tag: 'ругательство', ru: 'сделанный спустя рукава, «на отвали»', ex: { en: "Don't do a half-assed job on this.", ru: 'Не делай это спустя рукава.' }, ok: 'с друзьями', no: 'в офисе — скажи half-hearted' },
  { id: 'shitty', cat: 'curse', w: 'shitty', reg: 'both', lvl: 2, tag: 'ругательство', ru: 'дерьмовый, хреновый', ex: { en: "It's been a shitty week.", ru: 'Это была дерьмовая неделя.' }, ok: 'с близкими друзьями', no: 'на работе, с незнакомыми' },
  { id: 'piece-of-shit', cat: 'curse', w: 'piece of shit', reg: 'both', lvl: 2, tag: 'ругательство', ru: 'кусок дерьма (о вещи — «развалюха», о человеке — оскорбление)', ex: { en: 'My phone is a piece of shit — it died again.', ru: 'Мой телефон — полное дерьмо, опять сел.' }, ok: 'о вещах с друзьями', no: 'о людях — серьёзное оскорбление' },
  { id: 'fucking', cat: 'curse', w: 'f*cking (усилитель)', reg: 'both', lvl: 2, tag: 'ругательство', ru: 'долбаный / охренительно — усиливает что угодно', ex: { en: "That concert was f*cking amazing.", ru: 'Этот концерт был охренительный.' }, ok: 'с близкими друзьями, на концерте', no: 'на работе, в универе, при незнакомых' },
  { id: 'fuck-yeah', cat: 'curse', w: 'f*ck yeah', reg: 'us', lvl: 2, tag: 'ругательство', ru: 'чёрт возьми, да! (радость)', ex: { en: '— We won! — F*ck yeah!', ru: '— Мы выиграли! — Да, чёрт возьми!' }, ok: 'с друзьями, на матче', no: 'везде, где нужно приличие; мягче — hell yeah' },
  { id: 'fuck-up', cat: 'curse', w: 'f*ck up / f*cked up', reg: 'both', lvl: 2, tag: 'ругательство', ru: 'облажаться / жесть, неправильно; мягче — mess up', ex: { en: "I f*cked up the presentation.", ru: 'Я завалил презентацию.' }, ok: 'с близкими друзьями', no: 'на работе — говори I messed up' },

  /* оскорбления — понимать, но не бросаться */
  { id: 'jerk', cat: 'insult', w: 'jerk', reg: 'us', lvl: 1, tag: 'оскорбление', ru: 'придурок, козёл (мягко)', ex: { en: "Don't be a jerk.", ru: 'Не будь козлом.' }, ok: 'в шутку с друзьями', no: 'незнакомым людям' },
  { id: 'idiot', cat: 'insult', w: 'idiot / moron', reg: 'both', lvl: 1, tag: 'оскорбление', ru: 'идиот / дебил', ex: { en: "I'm such an idiot, I forgot the tickets.", ru: 'Я такой идиот, забыл билеты.' }, ok: 'о себе в шутку', no: 'о других — обидно' },
  { id: 'loser', cat: 'insult', w: 'loser', reg: 'us', lvl: 1, tag: 'оскорбление', ru: 'неудачник, лох', ex: { en: 'Only losers skip leg day.', ru: 'Только лохи пропускают день ног.' }, ok: 'в шутку с друзьями', no: 'всерьёз — это жестоко' },
  { id: 'smartass', cat: 'insult', w: 'smartass / wiseass', reg: 'us', lvl: 1, tag: 'оскорбление', ru: 'умник (с сарказмом)', ex: { en: 'Okay, smartass, you do it then.', ru: 'Ладно, умник, тогда сам делай.' }, ok: 'с друзьями', no: 'с начальником' },
  { id: 'jackass', cat: 'insult', w: 'jackass', reg: 'us', lvl: 1, tag: 'оскорбление', ru: 'осёл, придурок', ex: { en: 'Some jackass parked in front of my car.', ru: 'Какой-то придурок припарковался перед моей машиной.' }, ok: 'о чужих, за спиной', no: 'в лицо — может быть драка' },
  { id: 'dumbass', cat: 'insult', w: 'dumbass', reg: 'us', lvl: 2, tag: 'оскорбление', ru: 'тупица (грубо)', ex: { en: 'Stop it, dumbass.', ru: 'Хватит, тупица.' }, ok: 'только с очень близкими друзьями в шутку', no: 'всем остальным' },
  { id: 'asshole', cat: 'insult', w: 'asshole', reg: 'us', lvl: 2, tag: 'оскорбление', ru: 'мудак, урод (очень грубо)', ex: { en: 'He was a total asshole to the waiter.', ru: 'Он вёл себя с официантом как полный урод.' }, ok: 'понимать в фильмах; о ком-то за спиной', no: 'в лицо человеку' },
  { id: 'dick', cat: 'insult', w: 'dick / dickhead', reg: 'both', lvl: 2, tag: 'оскорбление', ru: 'козёл, мудак (очень грубо)', ex: { en: "Don't be a dick, man.", ru: 'Не будь козлом, чувак.' }, ok: 'понимать; между близкими друзьями', no: 'незнакомым, на работе' },
  { id: 'screw-you', cat: 'insult', w: 'screw you / f*ck you', reg: 'both', lvl: 2, tag: 'оскорбление', ru: 'пошёл ты (screw — грубо, f*ck — очень грубо)', ex: { en: "Screw you, I'm not paying for that!", ru: 'Да пошёл ты, я за это не плачу!' }, ok: 'понимать в фильмах', no: 'никому в реальной жизни — конфликт' },
  { id: 'fuck-off', cat: 'insult', w: 'f*ck off', reg: 'both', lvl: 2, tag: 'оскорбление', ru: 'отвали на хрен (у британцев друзья иногда говорят в шутку)', ex: { en: '— You lost again? — Oh, f*ck off.', ru: '— Опять проиграл? — Да отвали ты.' }, ok: 'только между близкими друзьями в шутку', no: 'всем остальным' },
  { id: 'motherfucker', cat: 'insult', w: 'motherf*cker', reg: 'us', lvl: 2, tag: 'оскорбление', ru: 'ублюдок; в рэпе иногда «чувак» — но тебе так говорить нельзя', ex: { en: "He's one bad motherf*cker. (в фильмах — «крутой мужик»)", ru: 'Он реально жёсткий мужик.' }, ok: 'понимать в рэпе и фильмах', no: 'использовать самому' },
  { id: 'kiss-my-ass', cat: 'insult', w: 'kiss my ass / bite me', reg: 'us', lvl: 1, tag: 'оскорбление', ru: 'да пошёл ты / отвали (bite me — мягче, шутливо)', ex: { en: '— You suck at this game. — Bite me.', ru: '— Ты отстойно играешь. — Отстань.' }, ok: 'bite me — с друзьями в шутку', no: 'kiss my ass — грубо, не начальнику' },

  /* британский мат */
  { id: 'bloody-hell', cat: 'uk', w: 'bloody hell', reg: 'uk', lvl: 1, tag: 'ругательство', ru: 'чёрт возьми! (UK)', ex: { en: 'Bloody hell, it’s freezing!', ru: 'Чёрт возьми, ну и холодина!' }, ok: 'с друзьями', no: 'на собеседовании' },
  { id: 'bugger', cat: 'uk', w: 'bugger / bugger off', reg: 'uk', lvl: 1, tag: 'ругательство', ru: 'блин! / отвали (UK, грубовато, но часто по-дружески)', ex: { en: "Bugger, I've missed the last train.", ru: 'Блин, я опоздал на последний поезд.' }, ok: 'с друзьями в UK', no: 'в США — не поймут; на работе' },
  { id: 'sod-it', cat: 'uk', w: 'sod it', reg: 'uk', lvl: 1, tag: 'ругательство', ru: 'да ну его! (UK)', ex: { en: "Sod it, let's order pizza.", ru: 'Да ну его, давай закажем пиццу.' }, ok: 'с друзьями', no: 'на работе' },
  { id: 'arse', cat: 'uk', w: 'arse / arsehole', reg: 'uk', lvl: 2, tag: 'оскорбление', ru: 'задница / мудак (британский вариант ass / asshole)', ex: { en: "Don't be an arse about it.", ru: 'Не будь придурком.' }, ok: 'arse — с друзьями', no: 'arsehole — в лицо людям' },
  { id: 'git', cat: 'uk', w: 'git / prat', reg: 'uk', lvl: 1, tag: 'оскорбление', ru: 'придурок, болван (UK, мягко и даже смешно)', ex: { en: 'You daft git, you locked us out!', ru: 'Ты балбес, ты нас запер снаружи!' }, ok: 'с друзьями в шутку', no: 'незнакомым' },
  { id: 'tosser', cat: 'uk', w: 'tosser / knobhead', reg: 'uk', lvl: 2, tag: 'оскорбление', ru: 'придурок, урод (UK, грубо)', ex: { en: 'Some tosser stole my bike.', ru: 'Какой-то урод украл мой велик.' }, ok: 'понимать в британских фильмах', no: 'в лицо людям' },
  { id: 'cock-up', cat: 'uk', w: 'cock-up', reg: 'uk', lvl: 1, tag: 'ругательство', ru: 'облом, косяк, провал (UK; не про то, что ты подумал)', ex: { en: 'The booking was a total cock-up.', ru: 'С бронированием вышел полный косяк.' }, ok: 'с друзьями и даже коллегами в UK', no: 'в США — звучит странно' },
  { id: 'piss-off-uk', cat: 'uk', w: 'piss off / pissed (UK)', reg: 'uk', lvl: 1, tag: 'ругательство', ru: 'piss off — отвали; pissed в UK — пьяный (в США — злой!)', ex: { en: 'He was absolutely pissed at the party.', ru: 'На вечеринке он был в стельку пьян. (UK)' }, ok: 'с друзьями', no: 'путать US и UK значения' },

  /* как реагировать */
  { id: 'watch-it', cat: 'react', w: 'watch it / watch your mouth', reg: 'us', lvl: 0, tag: 'реакция', ru: 'полегче / следи за языком', ex: { en: 'Hey, watch your mouth. There are kids here.', ru: 'Эй, следи за языком. Тут дети.' }, ok: 'когда при тебе ругаются не к месту', no: '—' },
  { id: 'chill-out', cat: 'react', w: 'whoa, chill / take it easy', reg: 'both', lvl: 0, tag: 'реакция', ru: 'спокойно, остынь', ex: { en: "Whoa, chill. It's just a game.", ru: 'Эй, спокойно. Это просто игра.' }, ok: 'когда кто-то заводится', no: '—' },
  { id: 'not-cool', cat: 'react', w: "that's not cool", reg: 'us', lvl: 0, tag: 'реакция', ru: 'так не пойдёт / это некрасиво', ex: { en: "Calling him that is not cool, man.", ru: 'Называть его так — некрасиво, чувак.' }, ok: 'вежливо поставить границу', no: '—' },
  { id: 'excuse-language', cat: 'react', w: 'excuse my French', reg: 'both', lvl: 0, tag: 'реакция', ru: 'простите за мой французский (извинение после мата)', ex: { en: "That was a shitty movie — excuse my French.", ru: 'Это был дерьмовый фильм — простите за мой французский.' }, ok: 'с иронией после ругательства', no: '—' },
  { id: 'back-off', cat: 'react', w: 'back off / leave me alone', reg: 'both', lvl: 0, tag: 'реакция', ru: 'отойди / оставь меня в покое (без мата, но твёрдо)', ex: { en: 'Back off, man. I said no.', ru: 'Отойди, чувак. Я сказал нет.' }, ok: 'если к тебе пристают на улице', no: '—' },
];

export const SWEAR_GUIDE = [
  'Шкала грубости в английском: замены (darn, heck, freaking) → мягкие (damn, hell, crap) → грубые (ass, screw, piss) → очень грубые (shit, f-word, оскорбления) → табу (расовые и гомофобные слова — никогда).',
  'Главное правило: ругайся «на ситуацию», а не «на человека». «This is f*cking hard» среди друзей — норм. «You f*cking idiot» — это уже нападение.',
  'Иностранцу с акцентом мат прощают хуже, чем носителю: звучит неуместно. Слушай, как говорят твои друзья, и не будь «громче» них.',
  'Британцы ругаются чаще и легче (bloody, bugger, sod), но их оскорбления (twat, tosser) бывают жёстче, чем кажется.',
];
