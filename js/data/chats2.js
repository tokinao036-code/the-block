// Week 2 chat scenarios (B1–B1+). Same format as chats.js: msgs, replies {kw, go, fb, bad, better, react}, expect.
export const SCEN2 = [
  {
    id: 'maya2', who: 'maya', unlock: 'w2l1', title: 'Первый вечер в Чикаго', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'Hey Max! Did you make it to the hotel okay?', ru: 'Привет, Макс! Нормально добрался до отеля?' }, { en: 'Sorry again about the L — I forgot how packed it gets at rush hour 😅', ru: 'Ещё раз прости за L — я забыла, как там битком в час пик.' }],
        replies: [
          { en: "No worries at all! I was actually enjoying the view when we passed the river.", ru: 'Вообще не страшно! Я как раз наслаждался видом, когда мы проезжали реку.', kw: ['no worries', 'fine', 'okay', 'ok', 'enjoying', 'view', 'river', 'great', 'loved', 'made it'], go: 'b' },
          { en: 'I was arrived at 9.', ru: '(с ошибкой)', bad: true, better: 'I arrived at nine.', fb: 'Arrive — не пассив: I arrived. «I was arrived» по-английски не говорят.', react: [{ en: 'You arrived at 9? Glad you made it! 🙂', ru: 'Ты приехал в 9? Рада, что добрался!' }] },
          { en: 'Honestly, I was so jet-lagged that I fell asleep on the train.', ru: 'Честно, у меня был такой джетлаг, что я уснул в поезде.', kw: ['jet', 'tired', 'asleep', 'slept', 'fell asleep', 'exhausted', 'beat'], go: 'b2' },
        ] },
      b: { msgs: [{ en: "Isn't it gorgeous? The architecture boat tour is even better. What were you doing when I texted earlier? You didn't reply.", ru: 'Красиво, правда? А экскурсия на лодке по архитектуре ещё лучше. Что ты делал, когда я писала раньше? Ты не ответил.' }], expect: { t: 'pastcont', ex: 'I was unpacking when you texted, sorry!' }, replies: 'busy' },
      b2: { msgs: [{ en: "Ha, the red-eye gets everyone. Get some rest! By the way, what were you doing when I texted earlier? You didn't reply.", ru: 'Ха, ночной рейс никого не щадит. Отдохни! Кстати, что ты делал, когда я писала раньше? Ты не ответил.' }], expect: { t: 'pastcont', ex: 'I was unpacking when you texted, sorry!' }, replies: 'busy' },
      c: { msgs: [{ en: "Totally fine! Tomorrow we're meeting the client at 10, so let's grab breakfast at 8:30. Sound good?", ru: 'Всё нормально! Завтра встреча с клиентом в 10, так что давай позавтракаем в 8:30. Подходит?' }],
        replies: [
          { en: "Sounds great. I'll be in the lobby at 8:30.", ru: 'Отлично. Буду в лобби в 8:30.', kw: ['sounds', 'great', 'good', 'will', "i'll", 'lobby', 'see you', 'perfect', 'works'], go: 'd' },
          { en: 'Could we make it 8:45? I still need to go over the slides.', ru: 'Можем в 8:45? Мне ещё нужно пройтись по слайдам.', kw: ['could', '8:45', 'later', 'slides', 'go over', 'still need'], go: 'd2', fb: 'Отлично: вежливая альтернатива + причина. go over — просмотреть, пройтись по.' },
        ] },
      d: { msgs: [{ en: 'Perfect. Good night, and welcome to the Windy City! 🌬️', ru: 'Отлично. Спокойной ночи и добро пожаловать в Город ветров!' }], end: true },
      d2: { msgs: [{ en: "8:45 works. Love that you're prepping — see you then!", ru: '8:45 подходит. Мне нравится, что ты готовишься — до встречи!' }], end: true },
    },
    sets: {
      busy: [
        { en: 'Sorry! I was unpacking when you texted, and I left my phone on the bed.', ru: 'Прости! Я разбирал вещи, когда ты писала, и оставил телефон на кровати.', kw: ['was', 'unpacking', 'showering', 'sleeping', 'eating', 'walking', 'when', 'sorry', 'phone', 'charging'], go: 'c' },
        { en: 'I unpacked when you texted.', ru: '(не то время)', bad: true, better: 'I was unpacking when you texted.', fb: 'Процесс в момент сообщения → Past Continuous: I was unpacking when you texted.', react: [{ en: 'Oh, you were unpacking? Got it 🙂', ru: 'А, ты разбирал вещи? Поняла.' }] },
      ],
    },
  },
  {
    id: 'marcus1', who: 'marcus', unlock: 'w2l2', title: 'Знакомство с Маркусом', start: 'a',
    nodes: {
      a: { msgs: [{ en: "yo it's Marcus, Maya's brother. she gave me ur number", ru: 'йоу, это Маркус, брат Майи. она дала мне твой номер' }, { en: "be honest. u still think deep dish is a casserole? 😤", ru: 'честно. ты всё ещё думаешь, что deep dish — это запеканка?' }],
        replies: [
          { en: "Okay, I'll admit it — you've won me over. I used to think that, but not anymore.", ru: 'Ладно, признаю — ты меня переубедил. Раньше я так думал, но больше нет.', kw: ['won me over', 'admit', 'used to', 'not anymore', 'changed', 'love', 'best', 'good', 'no'], go: 'b', set: { side: 'deep dish' } },
          { en: 'I use to think so, but now no.', ru: '(с ошибкой)', bad: true, better: "I used to think so, but not anymore.", fb: 'used to (с -d) в утверждении; «но больше нет» = but not anymore.', react: [{ en: 'u USED to think so? 👀 so u changed ur mind?', ru: 'ты РАНЬШЕ так думал? значит, передумал?' }] },
          { en: "Real talk? Still a casserole. A delicious casserole, but still.", ru: 'Честно? Всё ещё запеканка. Вкусная, но запеканка.', kw: ['still', 'casserole', 'yes', 'yeah', 'real talk', 'sorry'], go: 'b2', set: { side: 'NY slice' } },
        ] },
      b: { msgs: [{ en: "LET'S GO 🙌 another one converted", ru: 'ДААА. ещё один обращённый' }, { en: 'aight so what did u use to do back home on weekends?', ru: 'ладно, а чем ты раньше занимался дома по выходным?' }], expect: { t: 'usedto', ex: 'I used to play football with my friends every Saturday.' }, replies: 'home' },
      b2: { msgs: [{ en: "a delicious casserole 😂 ok I'll take it", ru: 'вкусная запеканка, ладно, принимается' }, { en: 'so what did u use to do back home on weekends?', ru: 'а чем ты раньше занимался дома по выходным?' }], expect: { t: 'usedto', ex: 'I used to play football with my friends every Saturday.' }, replies: 'home' },
      c: { msgs: [{ en: "bet. come to the park saturday, we'll see if u can hoop 🏀", ru: 'договорились. приходи в парк в субботу, посмотрим, умеешь ли ты играть' }], end: true },
    },
    sets: {
      home: [
        { en: 'I used to play football with my friends, and we would grab shawarma after.', ru: 'Раньше я играл в футбол с друзьями, а потом мы брали шаурму.', kw: ['used to', 'would', 'play', 'played', 'football', 'soccer', 'friends', 'gym', 'walk', 'go'], go: 'c' },
        { en: 'I would live near the river.', ru: '(не та форма)', bad: true, better: 'I used to live near the river.', fb: 'Would — только для повторяющихся действий. Для состояния (live, have, be) — used to.', react: [{ en: 'u would live? 😂 u mean u used to live there?', ru: '«would live»? в смысле, ты там раньше жил?' }] },
      ],
    },
  },
  {
    id: 'maya3', who: 'maya', unlock: 'w2l3', title: 'Письмо клиенту', start: 'a', formal: true,
    nodes: {
      a: { msgs: [{ en: 'Hi Max, I read your draft to Jessica. Nice work overall!', ru: 'Привет, Макс, прочитала твой черновик Джессике. В целом отлично!' }, { en: 'One question: why did the projector fail? She asked me, and I want our story to be consistent.', ru: 'Один вопрос: почему отказал проектор? Она спросила меня, и я хочу, чтобы мы говорили одно и то же.' }], expect: { t: 'pastperf', ex: 'Someone had changed the settings during lunch.' },
        replies: [
          { en: 'Someone had changed the display settings during lunch, so it wouldn’t connect.', ru: 'Кто-то поменял настройки экрана в обед, поэтому он не подключался.', kw: ['had changed', 'someone', 'settings', 'lunch', 'changed', 'had'], go: 'b', fb: 'Past Perfect точно показывает: настройки поменяли ДО встречи.' },
          { en: 'Idk, it just broke lol', ru: '(слишком небрежно)', bad: true, better: "I'm not entirely sure, but it looks like someone had changed the settings.", fb: 'С клиентом и наставницей — без idk / lol. И лучше дать объяснение.', react: [{ en: "Ha, fair 🙂 but let's give her a clearer answer than \"it just broke.\"", ru: 'Ха, понятно, но давай дадим ей ответ поточнее, чем «оно просто сломалось».' }] },
          { en: "I'm not entirely sure, but I'll check with IT and get back to you.", ru: 'Не совсем уверен, но уточню у IT и вернусь к тебе.', kw: ['not sure', 'check', 'it', 'get back', 'find out', 'ask'], go: 'b2', fb: 'Хорошо: честно + план действий.' },
        ] },
      b: { msgs: [{ en: "Perfect, that's clear. Could you add one line offering a follow-up call? Then send it.", ru: 'Отлично, понятно. Можешь добавить строчку с предложением созвона? И отправляй.' }], replies: 'send' },
      b2: { msgs: [{ en: "Great, thanks. Meanwhile, could you add one line offering a follow-up call? Then send it.", ru: 'Отлично, спасибо. А пока добавь строчку с предложением созвона? И отправляй.' }], replies: 'send' },
      c: { msgs: [{ en: "Great. Honestly, you handled today really well. I'm glad you're on the team.", ru: 'Отлично. Честно, ты сегодня очень хорошо справился. Рада, что ты в команде.' }], end: true },
    },
    sets: {
      send: [
        { en: "Sure — I've added the line and sent it. I'll keep you posted if she replies.", ru: 'Конечно — добавил строчку и отправил. Буду держать в курсе, если она ответит.', kw: ['sent', 'added', "i've", 'done', 'keep you posted', 'will', 'sure'], go: 'c' },
        { en: 'Ok I send.', ru: '(с ошибкой и сухо)', bad: true, better: "Sure, I'll send it now.", fb: 'Про ближайшее будущее — I’ll send it now. «I send» звучит как ошибка.', react: [{ en: 'You mean you’ll send it now? 🙂 Thanks!', ru: 'В смысле, отправишь сейчас? Спасибо!' }] },
      ],
    },
  },
  {
    id: 'marcus2', who: 'marcus', unlock: 'w2l4', title: 'После игры', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'yo how u feeling after today 😂', ru: 'йоу, как самочувствие после сегодня' }, { en: 'tell me the truth, what was going thru ur head when that guy crossed u over?', ru: 'скажи честно, о чём ты думал, когда тот парень обвёл тебя кроссовером?' }], expect: { t: 'pastcont', ex: 'I was thinking about how I had never played before!' },
        replies: [
          { en: "Honestly, I was trying not to fall! I'd never played pickup before.", ru: 'Честно, я пытался не упасть! Я никогда раньше не играл в уличный.', kw: ['trying', 'was', 'fall', 'never', 'before', "i'd", 'had never', 'thinking'], go: 'b' },
          { en: 'I was think about my life 😂', ru: '(с ошибкой)', bad: true, better: 'I was thinking about my life 😂', fb: 'Past Continuous: was + -ing → was thinking.', react: [{ en: 'u WERE thinking about ur life? same 😂', ru: 'ты думал о жизни? аналогично' }] },
          { en: "I wasn't thinking at all. I was cooked.", ru: 'Я вообще не думал. Мне был конец.', kw: ['cooked', "wasn't", 'nothing', 'not thinking', 'done', 'dead'], go: 'b' },
        ] },
      b: { msgs: [{ en: "lmao facts. but u hit that last shot tho 🔥", ru: 'ахах, факт. но последний бросок ты забил' }, { en: 'run it back next saturday?', ru: 'реванш в следующую субботу?' }],
        replies: [
          { en: "Run it back! But I'm flying home on Friday, so we'll have to do it next time.", ru: 'Реванш! Но я улетаю домой в пятницу, так что в следующий раз.', kw: ['run it back', 'flying', 'friday', 'next time', 'home', 'leaving', 'but'], go: 'c' },
          { en: "I'm down. I need to get my revenge.", ru: 'Я в деле. Мне нужно отыграться.', kw: ["i'm down", 'down', 'yes', 'revenge', 'sure', 'bet'], go: 'c2' },
        ] },
      c: { msgs: [{ en: "damn ok. next time ur in Chicago, no excuses 🤝", ru: 'блин, ладно. в следующий раз, когда будешь в Чикаго, без отговорок' }], end: true },
      c2: { msgs: [{ en: "say less. but Maya says ur flying out friday 👀 so next trip. no excuses", ru: 'больше ни слова. но Майя говорит, ты улетаешь в пятницу, так что в следующий приезд. без отговорок' }], end: true },
    },
  },
  {
    id: 'liam3', who: 'liam', unlock: 'w2l5', title: 'Продолжение истории', start: 'a',
    nodes: {
      a: { msgs: [{ en: "Right, I need the full story. How long had you been walking before you found the pizza place?", ru: 'Так, мне нужна вся история. Сколько вы шли, прежде чем нашли пиццерию?' }], expect: { t: 'pastperf', ex: 'We had been walking for about an hour.' },
        replies: [
          { en: "We'd been walking for about an hour, and my ears were frozen.", ru: 'Мы шли около часа, и у меня замёрзли уши.', kw: ['been walking', 'had been', "we'd", 'hour', 'walking', 'for'], go: 'b' },
          { en: 'We walked since one hour.', ru: '(с ошибкой)', bad: true, better: "We'd been walking for an hour.", fb: '«Целый час» — for an hour (since — с момента). Сколько длилось до момента в прошлом → had been walking.', react: [{ en: "Since one hour? 😄 You mean you'd been walking for an hour?", ru: '«С одного часа»? В смысле, вы шли целый час?' }] },
        ] },
      b: { msgs: [{ en: 'Brutal. And the pizza guy just let you in?', ru: 'Жесть. И пиццерщик просто вас впустил?' }],
        replies: [
          { en: "He saw we were freezing and said we could charge our phones. Then he gave us free slices!", ru: 'Он увидел, что мы замерзаем, и разрешил зарядить телефоны. А потом дал бесплатные куски!', kw: ['saw', 'freezing', 'charge', 'free', 'gave', 'slices', 'said', 'let'], go: 'c' },
          { en: 'Long story short, he saved our lives.', ru: 'Короче, он спас нам жизнь.', kw: ['long story short', 'saved', 'helped', 'nice', 'kind'], go: 'c' },
        ] },
      c: { msgs: [{ en: "Mate, that's the best story I've heard all week. 10/10, would get lost with you.", ru: 'Дружище, это лучшая история за неделю. 10 из 10, потерялся бы с тобой.' }, { en: 'Pub when you get back? You owe me the director’s cut.', ru: 'Паб, когда вернёшься? Ты мне должен расширенную версию.' }],
        replies: [{ en: "Deal. First round's on me.", ru: 'Договорились. Первая порция за мной.', kw: ['deal', 'yes', 'sure', 'on me', 'round', 'bet', 'ok', 'okay'], go: 'd' }] },
      d: { msgs: [{ en: 'Cheers, mate. Laters! 👋', ru: 'Давай, дружище. До встречи!' }], end: true },
    },
  },
  {
    id: 'marcus3', who: 'marcus', unlock: 'w2l6', title: 'Пластинка', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'did u listen to the record yet or nah 👀', ru: 'ты уже послушал пластинку или нет' }],
        replies: [
          { en: "I did! It slaps. I had no idea house started in Chicago.", ru: 'Послушал! Качает. Я понятия не имел, что хаус начался в Чикаго.', kw: ['did', 'slaps', 'listened', 'yes', 'no idea', 'love', 'great', 'dope'], go: 'b' },
          { en: "Not yet, I've been swamped with work.", ru: 'Ещё нет, завален работой.', kw: ['not yet', "haven't", 'swamped', 'busy', 'work'], go: 'b2' },
        ] },
      b: { msgs: [{ en: "told u. quick quiz: who was it made by? 😂", ru: 'я же говорил. быстрый тест: кем он был создан?' }], expect: { t: 'past', ex: 'It was made by Black and Latino kids on the South Side.' }, replies: 'quiz' },
      b2: { msgs: [{ en: 'swamped 😂 ok mr. corporate. but quick quiz: who was house made by?', ru: 'завален, ну ладно, мистер корпорация. но быстрый тест: кем был создан хаус?' }], expect: { t: 'past', ex: 'It was made by Black and Latino kids on the South Side.' }, replies: 'quiz' },
      c: { msgs: [{ en: 'A+ 🎓 tell Jay he still owes Chicago an apology', ru: 'пятёрка. передай Джею, что он всё ещё должен Чикаго извинение' }], end: true },
    },
    sets: {
      quiz: [
        { en: 'It was made by Black and Latino kids on the South Side, and Frankie Knuckles was the DJ.', ru: 'Его создали чёрные и латиноамериканские ребята с Саут-Сайда, а диджеем был Фрэнки Наклз.', kw: ['was made', 'made by', 'frankie', 'knuckles', 'south side', 'warehouse', 'kids', 'black'], go: 'c' },
        { en: 'It made by Frankie Knuckles.', ru: '(с ошибкой)', bad: true, better: 'It was made by Frankie Knuckles and the Warehouse crowd.', fb: 'Пассив: was made by. Без was получается «оно сделало Фрэнки».', react: [{ en: 'it MADE frankie? 😂 u mean it WAS made by him', ru: 'оно СДЕЛАЛО Фрэнки? ты имеешь в виду, БЫЛО сделано им' }] },
      ],
    },
  },
  {
    id: 'jay3', who: 'jay', unlock: 'w2l7', title: 'Неделя в Чикаго', start: 'a',
    nodes: {
      a: { msgs: [{ en: "aight I need the real story. what happened at the meeting?", ru: 'ладно, мне нужна настоящая история. что было на встрече?' }], expect: { t: 'pastperf', ex: 'Someone had changed the projector settings, so we used my laptop.' },
        replies: [
          { en: "Someone had messed with the projector, so I pulled the slides up on my laptop. In the end, they signed.", ru: 'Кто-то испортил проектор, так что я открыл слайды на ноутбуке. В итоге они подписали.', kw: ['had', 'messed', 'projector', 'laptop', 'in the end', 'signed', 'eventually'], go: 'b' },
          { en: 'Eventually they will sign, I hope.', ru: '(ложный друг)', bad: true, better: "Hopefully they'll sign soon.", fb: 'Eventually = «в итоге», а не «возможно». Для надежды: hopefully / maybe.', react: [{ en: "eventually? like… in the end? or u mean hopefully? 😂", ru: '«eventually»? типа «в итоге»? или ты имел в виду «надеюсь»?' }] },
        ] },
      b: { msgs: [{ en: 'respect 🔥 and marcus? he still talking about drill?', ru: 'уважение. а Маркус? всё ещё говорит про дрилл?' }],
        replies: [
          { en: "He said drill had been started in Chicago before Brooklyn got into it. Sorry, he's not wrong 😂", ru: 'Он сказал, что дрилл начали в Чикаго до того, как Бруклин им занялся. Прости, он прав.', kw: ['said', 'had been', 'started', 'chicago', 'not wrong', 'right', 'before'], go: 'c' },
          { en: 'He told that Chicago is better.', ru: '(с ошибкой)', bad: true, better: 'He said that Chicago is better.', fb: 'Tell — кому-то (told me), say — что-то (said that…). «He told that» — ошибка.', react: [{ en: 'he told u that? 😤 ok what else did he say', ru: 'он тебе так сказал? ладно, что ещё он сказал' }] },
        ] },
      c: { msgs: [{ en: "…aight he's not wrong. don't tell him I said that 😂", ru: '…ладно, он прав. не говори ему, что я это сказал' }, { en: 'welcome back to the block, Max. for real 🤝', ru: 'с возвращением на район, Макс. реально' }], end: true },
    },
  },
];
