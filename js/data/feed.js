import { POSTS2, STORIES2 } from './feed2.js';
// Social feed: posts by the characters and by "The Block" (official account with slang, culture, music).
// Every English word is tappable; ru is shown on "Перевод".
export const BLOCK = { name: 'The Block', handle: '@theblock', img: 'logo', voice: 'f', color: '#FFD23F' };

export const POSTS = [
  { id: 'p1', who: 'jay', img: 'f_jay_studio', time: '2 ч', likes: 312, tag: 'post',
    en: "late night in the studio again. new beat dropping friday 🔥 who's tryna hear it?", ru: 'снова ночь в студии. новый бит выходит в пятницу. кто хочет послушать?',
    comments: [{ who: 'diego', en: "cuz this one's gonna slap 🔥", ru: 'братан, этот будет качать (slap = очень круто звучит)' }, { who: 'ty', en: 'u always say that bro 😂', ru: 'ты всегда так говоришь, бро' }] },
  { id: 'p2', who: 'block', img: 'f_slang_bet', time: '3 ч', likes: 1204, tag: 'slang',
    en: 'Word of the day: BET 🤝 It means "okay, deal, for sure." — See you at 8? — Bet.', ru: 'Слово дня: BET. Значит «окей, договорились, точно». — Увидимся в 8? — Договорились.',
    comments: [{ who: 'liam', en: "In London we'd just say \"sorted\" 😅", ru: 'В Лондоне мы бы просто сказали «sorted» (решено)' }] },
  { id: 'p3', who: 'diego', img: 'f_diego_venice', time: '5 ч', likes: 845, tag: 'post',
    en: 'venice beach at 6am hits different 🌅🛹', ru: 'Венис-бич в 6 утра — это совсем другое ощущение (hits different = ощущается по-особенному)',
    comments: [{ who: 'jay', en: 'jealous fr', ru: 'реально завидую' }, { who: 'maya', en: 'Okay, I need a vacation.', ru: 'Так, мне нужен отпуск.' }] },
  { id: 'p4', who: 'block', img: 'meme', meme: { tpl: 'drake', img: 'm_drake', no: 'Answering "How are you?" with your whole life story', yes: '"Good, you?"' }, time: '6 ч', likes: 2890, tag: 'meme',
    en: 'Rule #1 of American small talk 😅', ru: 'Правило №1 американского small talk',
    comments: [{ who: 'liam', en: 'In the UK we just say "Not bad" and suffer quietly.', ru: 'В Британии мы просто говорим «неплохо» и тихо страдаем.' }] },
  { id: 'p5', who: 'maya', img: 'f_maya_office', time: '8 ч', likes: 233, tag: 'post',
    en: 'Monday mood: three meetings, two coffees, one inbox at 99+ ☕️ #worklife', ru: 'Настроение понедельника: три встречи, два кофе, 99+ писем во входящих.',
    comments: [{ who: 'liam', en: 'Sending strength 💪', ru: 'Посылаю силы' }] },
  { id: 'p6', who: 'block', img: 'f_culture_tip', time: '10 ч', likes: 1567, tag: 'culture',
    en: 'Did you know? In the US, 18–20% is a normal tip in a restaurant. Leaving no tip means the service was terrible.', ru: 'Знаешь ли ты? В США 18–20% — нормальные чаевые в ресторане. Не оставить чаевые = сказать, что обслуживание было ужасным.',
    comments: [{ who: 'ty', en: "facts. tip your servers y'all", ru: 'факт. оставляйте чаевые официантам, народ' }] },
  { id: 'p7', who: 'ty', img: 'f_ty_gym', time: '12 ч', likes: 678, tag: 'post',
    en: "new PR today 💪 leg day is the best day, don't @ me", ru: 'сегодня новый личный рекорд. день ног — лучший день, не спорьте (don’t @ me)',
    comments: [{ who: 'diego', en: 'beast mode dude', ru: 'режим зверя, чувак' }, { who: 'jay', en: 'my legs hurt just looking at this', ru: 'у меня ноги болят, просто глядя на это' }] },
  { id: 'p8', who: 'liam', img: 'f_liam_pizza', time: '1 д', likes: 421, tag: 'post',
    en: "NYC pizza vs London pizza. I'm not saying a word. 🍕", ru: 'Нью-йоркская пицца против лондонской. Я ничего не скажу.',
    comments: [{ who: 'jay', en: "u don't have to bro. we know 😂", ru: 'и не надо, бро. мы и так знаем' }] },
  { id: 'p9', who: 'block', img: 'f_music_herc', time: '1 д', likes: 3120, tag: 'music',
    en: 'On August 11, 1973, DJ Kool Herc threw a back-to-school party in the Bronx. Hip-hop was born. 🎧', ru: '11 августа 1973 года DJ Kool Herc устроил вечеринку перед учебным годом в Бронксе. Так родился хип-хоп.',
    comments: [{ who: 'jay', en: 'the bronx stand up 🙌', ru: 'Бронкс, поднимайся! (знак уважения району)' }] },
  { id: 'p10', who: 'diego', img: 'f_diego_tacos', time: '2 д', likes: 954, tag: 'post',
    en: 'found the best taco truck in east LA. not telling anyone where 🌮🤫', ru: 'нашёл лучший фургон с тако в Восточном Лос-Анджелесе. никому не скажу где',
    comments: [{ who: 'ty', en: 'bro gatekeeping tacos is crazy 😂', ru: 'бро, скрывать тако — это уже слишком (gatekeeping = не делиться)' }] },
  { id: 'p11', who: 'jay', img: 'f_jay_bodega', time: '2 д', likes: 1402, tag: 'post',
    en: 'bodega cat on duty 🐈 respect', ru: 'кот бодеги на посту. уважение',
    comments: [{ who: 'liam', en: 'This cat has a better job than me.', ru: 'У этого кота работа лучше, чем у меня.' }] },
  { id: 'p12', who: 'block', img: 'f_london', time: '3 д', likes: 987, tag: 'slang',
    en: 'British slang: KNACKERED = very tired. "I\'m absolutely knackered after that shift."', ru: 'Британский сленг: KNACKERED = очень уставший. «Я абсолютно без сил после этой смены».',
    comments: [{ who: 'liam', en: 'Can confirm. Every day.', ru: 'Подтверждаю. Каждый день.' }] },
  { id: 'p13', who: 'maya', img: 'f_maya_chicago', time: '3 д', likes: 512, tag: 'post',
    en: "Home for the weekend. Chicago, you'll always be my favorite city ❤️", ru: 'Дома на выходных. Чикаго, ты всегда будешь моим любимым городом.',
    comments: [{ who: 'jay', en: 'NYC is better tho 👀', ru: 'но Нью-Йорк же лучше' }, { who: 'diego', en: 'LA has entered the chat', ru: 'Лос-Анджелес вступает в разговор (мем)' }] },
];

POSTS.push(
  { id: 'p14', who: 'marcus', img: 'f_marcus_court', time: '4 ч', likes: 388, tag: 'post',
    en: "got next on court 3. pull up if u think u can hang 🏀", ru: 'мы следующие на третьей площадке. подтягивайся, если думаешь, что потянешь',
    comments: [{ who: 'ty', en: "say less. I'm on a flight next month 😤", ru: 'больше ни слова. я прилечу в следующем месяце' }, { who: 'maya', en: 'Please go easy on my coworker.', ru: 'Пожалуйста, полегче с моим коллегой.' }] },
  { id: 'p15', who: 'marcus', img: 'f_marcus_vinyl', time: '1 д', likes: 276, tag: 'music',
    en: 'crate digging at the shop today. found an OG Frankie Knuckles pressing 🔥', ru: 'копался в пластинках в магазине. нашёл оригинальный тираж Frankie Knuckles',
    comments: [{ who: 'jay', en: 'ok that one slaps, I give u that', ru: 'ладно, это качает, признаю' }] },
  { id: 'p16', who: 'block', img: 'c_deepdish', time: '1 д', likes: 2210, tag: 'culture',
    en: 'The great debate: Chicago deep dish vs New York slice. Pick a side. 🍕', ru: 'Великий спор: чикагская deep dish против нью-йоркского куска. Выбирай сторону.',
    comments: [{ who: 'marcus', en: 'deep dish, and it’s not even close', ru: 'deep dish, и даже не сравнивай' }, { who: 'jay', en: "that's a casserole bro", ru: 'это запеканка, бро' }] },
);

export const STORIES = [
  { id: 's_jay', who: 'jay', frames: [
    { img: 'f_jay_studio', en: 'cooking up something crazy rn 🔥', ru: 'готовлю что-то безумное прямо сейчас' },
    { img: 'f_jay_bodega', en: 'breakfast of champions: chopped cheese', ru: 'завтрак чемпионов: чопд чиз' },
  ] },
  { id: 's_diego', who: 'diego', frames: [
    { img: 'f_diego_venice', en: 'golden hour, dude 🌅', ru: 'золотой час, чувак' },
    { img: 'f_diego_tacos', en: 'tacos > everything', ru: 'тако лучше всего' },
  ] },
  { id: 's_ty', who: 'ty', frames: [
    { img: 'f_ty_gym', en: '5am club 💪', ru: 'клуб тех, кто встаёт в пять' },
  ] },
  { id: 's_liam', who: 'liam', frames: [
    { img: 'f_london', en: 'Miss you, London. Not the weather though.', ru: 'Скучаю по тебе, Лондон. Но не по погоде.' },
    { img: 'f_liam_pizza', en: 'Research. For science.', ru: 'Исследование. Ради науки.' },
  ] },
  { id: 's_marcus', who: 'marcus', frames: [
    { img: 'f_marcus_court', en: 'court 3, every saturday. no excuses', ru: 'третья площадка, каждую субботу. без отговорок' },
    { img: 'f_marcus_vinyl', en: 'this one is older than me 😂', ru: 'эта пластинка старше меня' },
  ] },
  { id: 's_maya', who: 'maya', frames: [
    { img: 'f_maya_office', en: 'Pro tip: "Let\'s circle back" = "Let\'s talk about it later."', ru: 'Совет: «Let’s circle back» = «Давай обсудим позже».' },
  ] },
  { id: 's_slang', who: 'block', title: 'Сленг', frames: [
    { img: 'f_slang_bet', en: 'BET = okay, deal', ru: 'договорились' },
    { img: 'f_slang_2', en: 'NO CAP = no lie, for real', ru: 'без шуток, честно' },
    { img: 'f_slang_3', en: 'LOWKEY = a little, secretly', ru: 'немного, втайне' },
  ] },
];

POSTS.push(...POSTS2);
STORIES.splice(STORIES.length - 1, 0, ...STORIES2);
