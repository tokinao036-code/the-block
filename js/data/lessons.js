// Week 1 · New York. Each lesson is an "episode": a deck of full-screen steps, like stories.
// Step types: cover, scene, chunks, grammar, meme, quiz, slang, culture, email, texting, watch, chat.
// In scene lines **word** marks the grammar of the lesson (highlighted, not spoken differently).
// Exercise kinds: choice, fill, fix, order, type, listen (see exercises.js).

export const WEEKS = [
  { n: 1, city: 'New York', line: '1', color: '#EE352E', ru: 'Нью-Йорк: переезд, знакомства, первая неделя', grammar: 'Present Simple / Continuous, Past Simple, Present Perfect, будущее, модальные', open: true },
  { n: 2, city: 'Chicago', line: '2', color: '#00933C', ru: 'Чикаго: неделя в офисе, семья Майи, истории из прошлого', grammar: 'Past Continuous, used to, Past Perfect (+ Continuous), пассив', open: true },
  { n: 3, city: 'Atlanta', line: '3', color: '#FF6319', ru: 'Атланта: каникулы у Тая, Кейша, трэп и южное гостеприимство', grammar: 'Perfect Continuous, still/yet/already, must/might/can’t, Future Perfect', open: true },
  { n: 4, city: 'Los Angeles', line: '4', color: '#FCCC0A', ru: 'Лос-Анджелес: Диего, Зои, мечты и переговоры', grammar: 'Условные 0–1–2–3, wish', open: true },
  { n: 5, city: 'Miami', line: '5', color: '#00A1DE', ru: 'Майами: путешествия, сервис, жалобы', grammar: 'Пассивный залог, have something done', open: false },
  { n: 6, city: 'London', line: '6', color: '#2F6BFF', ru: 'Лондон: британский английский', grammar: 'Косвенная речь, вопросы в косвенной речи', open: false },
  { n: 7, city: 'Washington, D.C.', line: '7', color: '#B933AD', ru: 'Вашингтон: переговоры и презентации', grammar: 'Conditional 3, wish, модальные в прошлом', open: false },
  { n: 8, city: 'New York', line: 'B1+', color: '#FFD23F', ru: 'Финал: собеседование и итоговый тест B1+', grammar: 'Всё вместе + итоговый тест', open: false },
];

export const LESSONS = [
  /* ------------------------------------------------------------------ 1 */
  {
    id: 'w1l1', week: 1, n: 1, title: "What's good, Brooklyn?", ru: 'Знакомство с соседом', img: 'l1_cover', bg: 'bg_brooklyn',
    topic: 'Знакомство', grammar: 'present-simple', mins: 15,
    goals: ['Знакомиться и рассказывать о себе', 'Present Simple: I work / he works / do you…?', 'Сленг Нью-Йорка: yo, bet, facts'],
    steps: [
      { t: 'cover' },
      {
        t: 'scene', title: 'На крыльце дома', where: 'Bushwick, Brooklyn · 6:40 PM', img: 'l1_scene',
        intro: 'Макс из Казани только что переехал в Бруклин на семестр. На крыльце (stoop) сидит сосед.',
        lines: [
          { s: 'jay', en: "Yo, what's up? You just moved in?", ru: 'Йоу, как дела? Ты только что въехал?' },
          { s: 'max', en: "Hey! Yeah, I moved in yesterday. I'm Max.", ru: 'Привет! Да, вчера въехал. Я Макс.' },
          { s: 'jay', en: 'Jay. Nice to meet you, man. Where are you from?', ru: 'Джей. Рад знакомству, чувак. Ты откуда?' },
          { s: 'max', en: "I'm from Kazan, in Russia. I **study** business here this semester.", ru: 'Я из Казани, это в России. Учусь здесь на бизнесе в этом семестре.' },
          { s: 'jay', en: "Russia? That's far, bro. How do you like New York so far?", ru: 'Россия? Далеко, бро. Как тебе Нью-Йорк пока что?' },
          { s: 'max', en: "It's crazy! Everything **is** so big and loud.", ru: 'Он безумный! Всё такое большое и шумное.' },
          { s: 'jay', en: 'Ha, facts. So what **do** you **do**? You work or just study?', ru: 'Ха, факт. А чем занимаешься? Работаешь или только учишься?' },
          { s: 'max', en: 'I **study** at a college here, and I **have** an internship in Manhattan.', ru: 'Учусь в колледже и прохожу стажировку на Манхэттене.' },
          { s: 'jay', en: 'Okay, busy man. I **work** at a sneaker store on Fulton Street. And I **make** beats.', ru: 'Окей, занятой человек. Я работаю в магазине кроссовок на Фултон-стрит. И пишу биты.' },
          { s: 'max', en: 'Beats? Like, music?', ru: 'Биты? Типа, музыку?' },
          { s: 'jay', en: 'Yeah, hip-hop. I **make** beats every night. My mom **hates** it. She **says** it\'s too loud.', ru: 'Ага, хип-хоп. Каждую ночь пишу биты. Мама это ненавидит. Говорит, слишком громко.' },
          { s: 'max', en: '**Do** you **play** your music anywhere?', ru: 'Ты где-нибудь играешь свою музыку?' },
          { s: 'jay', en: "Sometimes, at open mics. Yo, if you need anything, just knock. I **live** right here.", ru: 'Иногда на открытых микрофонах. Слушай, если что-то нужно — просто стучи. Я живу прямо тут.' },
          { s: 'max', en: 'Thanks, man. See you around!', ru: 'Спасибо, чувак. Ещё увидимся!' },
          { s: 'jay', en: 'Bet. See you.', ru: 'Договорились. Давай.' },
        ],
      },
      {
        t: 'chunks', title: 'Фразы, которые реально говорят',
        items: [
          { en: "What's up?", ru: 'Как дела? / Что нового? (не «что наверху»!)', note: 'Ответ: «Not much, you?» — «Да ничего, а ты?»' },
          { en: 'Nice to meet you.', ru: 'Рад(а) познакомиться.' },
          { en: 'Where are you from?', ru: 'Ты откуда?', note: 'Предлог from в конце — норма.' },
          { en: 'How do you like it so far?', ru: 'Как тебе пока что?' },
          { en: 'So what do you do?', ru: 'А чем ты занимаешься? (= кем работаешь)' },
          { en: 'I just moved in.', ru: 'Я только что въехал.' },
          { en: 'If you need anything, just knock.', ru: 'Если что-то понадобится — просто постучи.' },
          { en: 'See you around!', ru: 'Ещё увидимся!' },
        ],
      },
      { t: 'grammar', topic: 'present-simple', note: 'В диалоге: I study, I work, I make beats every night, my mom hates it, she says, do you play…? Всё это — привычки и факты о жизни.' },
      { t: 'meme', tpl: 'drake', img: 'm_drake', no: 'Me: "I am agree with you."', yes: 'Me: "I agree with you."', ru: 'Agree — это глагол, «am» не нужен. Самая частая ошибка русскоговорящих: «I am agree», «I am like it».' },
      {
        t: 'quiz', title: 'Проверь себя',
        items: [
          { k: 'choice', q: 'Jay ___ at a sneaker store.', opts: ['work', 'works', 'is work'], a: 1, why: 'He / she / it → глагол + -s: he works.' },
          { k: 'choice', q: '___ you like New York?', opts: ['Do', 'Does', 'Are'], a: 0, why: 'Вопрос в Present Simple: Do + I/you/we/they + глагол.' },
          { k: 'fix', q: "He don't like loud music.", a: ["He doesn't like loud music."], why: 'С he/she/it — doesn\'t, а не don\'t.' },
          { k: 'fix', q: 'I am agree with you.', a: ['I agree with you.'], why: 'Agree — глагол. «Am» не нужен: I agree.' },
          { k: 'order', ru: 'Ты откуда?', a: 'Where are you from?' },
          { k: 'fill', q: 'My mom ___ my music.', hint: 'hate', a: ['hates'], why: 'My mom = she → hates.' },
          { k: 'type', ru: 'Я учусь в колледже, а он работает в магазине.', a: ['I study at a college and he works at a store', 'I study at college and he works at a store', 'I study at a college and he works in a store', 'I study at college and he works in a store', 'I study at a college but he works at a store', 'I study in college and he works at a store', 'I study at a college and he works at a shop', 'I study at college and he works in a shop'], why: 'I study (без -s), he works (с -s).' },
          { k: 'listen', en: "She doesn't live here.", v: 'f', opts: ['Она здесь не живёт.', 'Она здесь жила.', 'Она здесь живёт.'], a: 0, why: "doesn't live — не живёт (сейчас, вообще)." },
        ],
      },
      { t: 'slang', ids: ['yo', 'whats-up', 'bet', 'facts', 'bro'] },
      { t: 'culture', id: 'how-are-you' },
      {
        t: 'watch', items: [
          { title: 'Уличные интервью в Нью-Йорке', ch: 'Easy English', why: 'Живая речь прохожих с двойными субтитрами. Смотри 1 видео по 5 минут, второй раз — без русских субтитров.', q: 'Easy English New York street interview' },
          { title: 'Как американцы говорят «What’s up»', ch: "Rachel's English", why: 'Лучший канал по американскому произношению: связки, редукции, «wassup».', q: "Rachel's English how to say what's up" },
        ],
      },
      { t: 'chat', who: 'jay', scenario: 'jay1', text: 'Джей прислал тебе сообщение. Ответь ему — можно выбрать вариант или написать своими словами.' },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    id: 'w1l2', week: 1, n: 2, title: 'Coffee run', ru: 'В кофейне', img: 'l2_cover', bg: 'bg_williamsburg',
    topic: 'Кафе', grammar: 'present-continuous', mins: 15,
    goals: ['Заказывать кофе и еду как местный', 'Present Continuous и «глаголы состояния»', 'Чаевые в США: сколько и почему'],
    steps: [
      { t: 'cover' },
      {
        t: 'scene', title: 'Кофейня в Уильямсбурге', where: 'Williamsburg, Brooklyn · 8:15 AM', img: 'l2_scene',
        intro: 'Утро перед парами. Макс и британец Лиам, с которым он учится на маркетинге, заходят за кофе.',
        lines: [
          { s: 'barista', en: 'Hi! What can I get started for you?', ru: 'Привет! Что вам приготовить?' },
          { s: 'max', en: 'Hi, can I get a large iced latte, please?', ru: 'Привет, можно большой латте со льдом?' },
          { s: 'barista', en: 'Sure. What kind of milk? We have whole, oat and almond.', ru: 'Конечно. Какое молоко? Есть обычное, овсяное и миндальное.' },
          { s: 'max', en: 'Oat milk, please.', ru: 'Овсяное, пожалуйста.' },
          { s: 'barista', en: 'For here or to go?', ru: 'Здесь или с собой?' },
          { s: 'max', en: 'To go, please.', ru: 'С собой, пожалуйста.' },
          { s: 'barista', en: 'Got it. Can I get a name for the order?', ru: 'Поняла. Как вас записать?' },
          { s: 'max', en: 'Max.', ru: 'Макс.' },
          { s: 'liam', en: "And I'll have a flat white. Cheers.", ru: 'А мне флэт уайт. Спасибо.' },
          { s: 'barista', en: "That's twelve fifty. You can tap right here.", ru: 'С вас двенадцать пятьдесят. Можно приложить карту вот здесь.' },
          { s: 'max', en: "Liam, why **is** the screen **asking** me for a tip?", ru: 'Лиам, почему экран просит у меня чаевые?' },
          { s: 'liam', en: "Mate, it's America. Everyone **is asking** for tips now. Just press twenty percent.", ru: 'Дружище, это Америка. Сейчас все просят чаевые. Просто нажми двадцать процентов.' },
          { s: 'max', en: 'Twenty? For a coffee? I **know** it\'s normal here, but still.', ru: 'Двадцать? За кофе? Я знаю, что тут это норма, но всё равно.' },
          { s: 'liam', en: "I know, I know. I**'m** still **getting** used to it too.", ru: 'Знаю, знаю. Я и сам ещё привыкаю.' },
          { s: 'barista', en: 'Large iced oat latte for… Mike?', ru: 'Большой латте со льдом на овсяном для… Майка?' },
          { s: 'max', en: "It's Max, but… thanks!", ru: 'Вообще-то Макс, но… спасибо!' },
        ],
      },
      {
        t: 'chunks', title: 'Как заказывать',
        items: [
          { en: 'Can I get a large iced latte?', ru: 'Можно мне большой латте со льдом?', note: '«Can I get…» звучит естественнее, чем «I want…». «Give me…» — грубо.' },
          { en: "I'll have a flat white.", ru: 'Мне флэт уайт.', note: 'Решение прямо сейчас → will.' },
          { en: 'For here or to go?', ru: 'Здесь или с собой?' },
          { en: 'To go, please.', ru: 'С собой, пожалуйста.' },
          { en: 'What kind of milk?', ru: 'Какое молоко?' },
          { en: 'Can I get a name for the order?', ru: 'На чьё имя заказ?' },
          { en: 'You can tap right here.', ru: 'Можно приложить карту здесь.' },
          { en: "I'm still getting used to it.", ru: 'Я всё ещё к этому привыкаю.' },
        ],
      },
      { t: 'grammar', topic: 'present-continuous', note: 'В диалоге: why is the screen asking…, everyone is asking for tips now, I’m still getting used to it — то, что происходит сейчас или «в последнее время». Но: I know — без -ing, это глагол состояния.' },
      { t: 'meme', tpl: 'top', img: 'm_pigeon', top: 'Me at a self-service coffee machine:', bottom: 'Is this… asking me for a tip?', ru: 'Шутка про tipflation — в США экраны просят чаевые даже там, где тебя никто не обслуживал.' },
      {
        t: 'quiz', title: 'Simple или Continuous?',
        items: [
          { k: 'choice', q: 'Look! The barista ___ my name wrong again.', opts: ['writes', 'is writing', 'write'], a: 1, why: 'Look! — действие прямо сейчас → is writing.' },
          { k: 'choice', q: 'I ___ oat milk. Regular milk is too heavy for me.', opts: ['prefer', 'am preferring', 'prefers'], a: 0, why: 'Prefer — глагол состояния (предпочтения), в Continuous не ставится.' },
          { k: 'fix', q: 'I am knowing the answer.', a: ['I know the answer.'], why: 'Know — глагол состояния: I know, а не I am knowing.' },
          { k: 'fill', q: 'Liam ___ to get used to American prices.', hint: 'try, сейчас', a: ['is trying', "'s trying"], why: 'Процесс сейчас → is trying.' },
          { k: 'choice', q: 'Liam usually ___ tea, but today he ___ coffee.', opts: ['drinks / is drinking', 'is drinking / drinks', 'drink / drinking'], a: 0, why: 'Usually → Simple; today (временно) → Continuous.' },
          { k: 'order', ru: 'Здесь или с собой?', a: 'For here or to go?' },
          { k: 'type', ru: 'Можно мне большой кофе с собой?', a: ['Can I get a large coffee to go', 'Can I get a large coffee to go please', 'Can I have a large coffee to go', 'Could I get a large coffee to go', 'Could I have a large coffee to go', 'Can I get a big coffee to go', 'Can I have a large coffee to go please', 'Could I get a large coffee to go please'], why: 'Can I get… + to go. «Big» понятно, но для размеров напитков говорят large.' },
          { k: 'listen', en: "I'm still getting used to it.", v: 'm', opts: ['Я всё ещё к этому привыкаю.', 'Я уже привык к этому.', 'Я не хочу к этому привыкать.'], a: 0, why: 'Getting used to — процесс привыкания (ещё идёт).' },
        ],
      },
      { t: 'slang', ids: ['cheers', 'mate', 'no-worries', 'my-bad'] },
      { t: 'culture', id: 'tipping' },
      {
        t: 'watch', items: [
          { title: 'Как заказывать в Starbucks по-английски', ch: 'Speak English With Vanessa', why: 'Реальные фразы кассира и ответы. Повторяй за ней вслух (shadowing).', q: 'Speak English With Vanessa ordering coffee' },
          { title: 'Tipping in America explained', ch: 'любой канал', why: 'Разберись, кому и сколько оставлять — пригодится в первый же день.', q: 'tipping in America explained for foreigners' },
        ],
      },
      { t: 'chat', who: 'liam', scenario: 'liam2', text: 'Лиам пишет тебе после кофейни. Поболтай с ним — он говорит по-британски.' },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    id: 'w1l3', week: 1, n: 3, title: 'First class', ru: 'Учёба в колледже', img: 'l3_cover', bg: 'bg_campus',
    topic: 'Учёба', grammar: 'past-simple', mins: 15,
    goals: ['Рассказать, как прошёл день', 'Past Simple: правильные и неправильные глаголы', 'Как устроен американский колледж'],
    steps: [
      { t: 'cover' },
      {
        t: 'scene', title: 'После первой лекции', where: 'Campus quad · 12:30 PM', img: 'l3_scene',
        intro: 'Первая лекция по маркетингу позади. Макс встречает Тая — студента-спортсмена из Атланты.',
        lines: [
          { s: 'ty', en: 'Yo, Max! How **was** your first class?', ru: 'Йоу, Макс! Как прошла первая пара?' },
          { s: 'max', en: "It **was** okay. The professor **talked** really fast. I **didn't understand** everything.", ru: 'Нормально. Профессор говорил очень быстро. Я понял не всё.' },
          { s: 'ty', en: 'Bro, nobody understands Professor Miller. **Did** you **take** notes?', ru: 'Бро, Миллера никто не понимает. Ты записывал?' },
          { s: 'max', en: 'I **tried**! I **wrote** down maybe half. Then I **recorded** the rest on my phone.', ru: 'Пытался! Записал где-то половину. Остальное записал на телефон.' },
          { s: 'ty', en: 'Smart. **Did** you **get** the syllabus?', ru: 'Умно. Ты получил силлабус?' },
          { s: 'max', en: 'The what?', ru: 'Чего?' },
          { s: 'ty', en: 'The syllabus. The plan for the whole semester: deadlines, exams, grades. He **sent** it last night.', ru: 'Силлабус. План на весь семестр: дедлайны, экзамены, оценки. Он прислал его вчера вечером.' },
          { s: 'max', en: "Oh no. I **didn't check** my email. When's the first deadline?", ru: 'О нет. Я не проверил почту. Когда первый дедлайн?' },
          { s: 'ty', en: 'Next Friday. A two-page essay.', ru: 'В следующую пятницу. Эссе на две страницы.' },
          { s: 'max', en: "Two pages? That's not bad.", ru: 'Две страницы? Неплохо.' },
          { s: 'ty', en: 'In English, bro. With citations.', ru: 'На английском, бро. Со ссылками на источники.' },
          { s: 'max', en: "…Okay, that's bad.", ru: '…Окей, это плохо.' },
          { s: 'ty', en: "Lowkey, it's fine. Let's hit the library after practice. I got you.", ru: 'Да ладно, нормально всё. Пойдём в библиотеку после тренировки. Я помогу.' },
          { s: 'max', en: 'Deal. Thanks, Ty!', ru: 'Договорились. Спасибо, Тай!' },
        ],
      },
      {
        t: 'chunks', title: 'Студенческие фразы',
        items: [
          { en: 'How was your first class?', ru: 'Как прошла первая пара?' },
          { en: 'I took notes.', ru: 'Я записывал (конспектировал).', note: 'take notes — делать записи, а не «make notes».' },
          { en: 'I wrote down maybe half.', ru: 'Я записал где-то половину.' },
          { en: "When's the first deadline?", ru: 'Когда первый дедлайн?' },
          { en: 'a two-page essay', ru: 'эссе на две страницы', note: 'two-page без -s: это прилагательное.' },
          { en: "Let's hit the library.", ru: 'Погнали в библиотеку.', note: 'hit = пойти куда-то (разг.)' },
          { en: 'I got you.', ru: 'Я тебя прикрою / помогу.' },
          { en: 'Deal.', ru: 'Договорились.' },
        ],
      },
      { t: 'grammar', topic: 'past-simple', note: 'В диалоге: was, talked, tried, recorded (правильные, -ed) и wrote, sent (неправильные). В вопросах и отрицаниях — did / didn’t + обычная форма: Did you take…? I didn’t check.' },
      { t: 'meme', tpl: 'top', img: 'm_pikachu', top: "Me: didn't check my email for a week.\nProfessor: the essay was due yesterday.", bottom: 'Me:', ru: 'Surprised Pikachu — когда удивляешься последствиям, которые сам же и устроил. Was due — «нужно было сдать».' },
      {
        t: 'quiz', title: 'Past Simple',
        items: [
          { k: 'choice', q: 'The professor ___ really fast yesterday.', opts: ['talk', 'talked', 'talks'], a: 1, why: 'Yesterday → прошедшее: talked.' },
          { k: 'fill', q: 'He ___ the syllabus last night.', hint: 'send', a: ['sent'], why: 'Send — неправильный: send → sent → sent.' },
          { k: 'fix', q: 'I didn\'t understood the question.', a: ["I didn't understand the question."], why: 'После didn\'t — первая форма: didn\'t understand.' },
          { k: 'fix', q: 'Did you went to the library?', a: ['Did you go to the library?'], why: 'Did уже показывает прошлое → go, не went.' },
          { k: 'choice', q: 'I ___ down maybe half of the lecture.', opts: ['writed', 'wrote', 'written'], a: 1, why: 'Write → wrote → written. «Writed» не существует.' },
          { k: 'order', ru: 'Ты делал записи?', a: 'Did you take notes?' },
          { k: 'type', ru: 'Я не проверил почту вчера.', a: ["I didn't check my email yesterday", 'I did not check my email yesterday', "I didn't check my mail yesterday", "Yesterday I didn't check my email", "I didn't check email yesterday", "I didn't check my e-mail yesterday", "I didn't check my inbox yesterday"], why: "didn't + check (без -ed)." },
          { k: 'listen', en: 'He sent it last night.', v: 'm', opts: ['Он прислал это вчера вечером.', 'Он пришлёт это вечером.', 'Он отправляет это каждый вечер.'], a: 0, why: 'Sent — прошедшее от send; last night — вчера вечером.' },
        ],
      },
      { t: 'slang', ids: ['lowkey', 'highkey', 'i-got-you', 'deal'] },
      { t: 'culture', id: 'college' },
      {
        t: 'watch', items: [
          { title: 'A day in the life of a US college student', ch: 'YouTube vlog', why: 'Влоги студентов — идеальный «понятный ввод»: простая речь и знакомые темы. Ставь английские субтитры.', q: 'day in the life college student vlog' },
          { title: '6 Minute English', ch: 'BBC Learning English', why: 'Короткие подкасты с разбором слов. Британский английский, хорошо для аудирования.', q: 'BBC Learning English 6 Minute English' },
        ],
      },
      { t: 'chat', who: 'ty', scenario: 'ty1', text: 'Тай пишет насчёт эссе. Поговори с ним о прошедшем дне — тренируем Past Simple.' },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    id: 'w1l4', week: 1, n: 4, title: 'Leg day', ru: 'В спортзале', img: 'l4_cover', bg: 'bg_gym',
    topic: 'Спортзал', grammar: 'present-perfect', mins: 15,
    goals: ['Говорить об опыте: have you ever…?', 'Present Perfect vs Past Simple', 'Сленг качалки: gains, spot me, beast mode'],
    steps: [
      { t: 'cover' },
      {
        t: 'scene', title: 'Тренировка с Таем', where: 'Campus gym · 7:00 AM', img: 'l4_scene',
        intro: 'Тай уговорил Макса прийти на «день ног». Макс пока не знает, во что ввязался.',
        lines: [
          { s: 'ty', en: '**Have** you ever **done** a real leg day?', ru: 'Ты когда-нибудь делал настоящий день ног?' },
          { s: 'max', en: "Leg day? I**'ve** never **done** one. I usually just run.", ru: 'День ног? Ни разу. Я обычно просто бегаю.' },
          { s: 'ty', en: "Bro. Today you're gonna feel it. **Have** you **eaten** yet?", ru: 'Бро. Сегодня ты это почувствуешь. Ты уже ел?' },
          { s: 'max', en: "Yeah, I**'ve** already **had** breakfast. I **had** oatmeal at six.", ru: 'Да, уже позавтракал. Съел овсянку в шесть.' },
          { s: 'ty', en: "Bet. Let's warm up. Then squats, three sets of ten.", ru: 'Отлично. Разминаемся. Потом приседания, три подхода по десять.' },
          { s: 'max', en: 'How long **have** you **been** a member here?', ru: 'Давно ты ходишь в этот зал?' },
          { s: 'ty', en: "I**'ve been** a member since freshman year. I**'ve** never **missed** a Monday.", ru: 'С первого курса. Ни одного понедельника не пропустил.' },
          { s: 'max', en: 'Never? Not even once?', ru: 'Никогда? Ни разу?' },
          { s: 'ty', en: 'Okay, once. I **got** sick last winter.', ru: 'Ладно, один раз. Заболел прошлой зимой.' },
          { s: 'max', en: 'Can you spot me? This bar is heavy.', ru: 'Подстрахуешь? Штанга тяжёлая.' },
          { s: 'ty', en: "I got you. Come on, two more! Beast mode!", ru: 'Держу. Давай, ещё два! Режим зверя!' },
          { s: 'max', en: "…Ty, I can't feel my legs.", ru: '…Тай, я не чувствую ног.' },
          { s: 'ty', en: "That's the point! No pain, no gain.", ru: 'В этом и смысл! Без боли нет результата.' },
          { s: 'max', en: "I**'ve** just **realized** something. I hate leg day.", ru: 'Я только что кое-что понял. Я ненавижу день ног.' },
          { s: 'ty', en: "Ha! Everybody says that. You'll be back.", ru: 'Ха! Все так говорят. Ты вернёшься.' },
        ],
      },
      {
        t: 'chunks', title: 'В зале',
        items: [
          { en: 'Have you ever done…?', ru: 'Ты когда-нибудь делал…?' },
          { en: "I've never done one.", ru: 'Я ни разу такого не делал.' },
          { en: 'Have you eaten yet?', ru: 'Ты уже ел?', note: 'yet — в вопросах и отрицаниях, в конце.' },
          { en: 'three sets of ten', ru: 'три подхода по десять' },
          { en: 'Can you spot me?', ru: 'Подстрахуешь меня?' },
          { en: 'Let’s warm up.', ru: 'Давай разомнёмся.' },
          { en: 'No pain, no gain.', ru: 'Без боли нет результата.' },
          { en: "You'll be back.", ru: 'Ты ещё вернёшься.' },
        ],
      },
      { t: 'grammar', topic: 'present-perfect', note: 'Have you ever done…? I’ve never missed… — опыт и результат без точного времени. Но «I had oatmeal at six», «I got sick last winter» — есть точное время → Past Simple.' },
      { t: 'meme', tpl: 'drake', img: 'm_drake', no: 'I am a member here since 2023.', yes: "I've been a member here since 2023.", ru: 'Русское «я хожу сюда с 2023» по-английски — Present Perfect: I’ve been… since… Настоящее время с since — ошибка.' },
      {
        t: 'quiz', title: 'Perfect или Past?',
        items: [
          { k: 'choice', q: '___ you ever ___ sushi?', opts: ['Did / try', 'Have / tried', 'Have / try'], a: 1, why: 'Ever (когда-либо в жизни) → Present Perfect: Have you ever tried…?' },
          { k: 'choice', q: 'I ___ sushi last Saturday.', opts: ['have tried', 'tried', 'try'], a: 1, why: 'Last Saturday — точное прошлое время → Past Simple.' },
          { k: 'fix', q: 'I know him since 2022.', a: ["I've known him since 2022.", 'I have known him since 2022.'], why: 'Since + до сих пор → Present Perfect: I’ve known.' },
          { k: 'fill', q: 'Ty has never ___ a Monday.', hint: 'miss', a: ['missed'], why: 'Has + третья форма: missed.' },
          { k: 'choice', q: 'Have you finished your essay ___?', opts: ['already', 'yet', 'ago'], a: 1, why: 'В вопросе в конце — yet.' },
          { k: 'fix', q: 'I have seen him yesterday.', a: ['I saw him yesterday.'], why: 'Yesterday → только Past Simple: I saw.' },
          { k: 'type', ru: 'Я никогда не был в Атланте.', a: ["I've never been to Atlanta", 'I have never been to Atlanta', "I've never been in Atlanta", 'I have never been in Atlanta'], why: 'Опыт в жизни → I’ve never been to…' },
          { k: 'listen', en: "I've just realized something.", v: 'm', opts: ['Я только что кое-что понял.', 'Я давно это понял.', 'Я скоро это пойму.'], a: 0, why: 'Just + Present Perfect = «только что».' },
        ],
      },
      { t: 'slang', ids: ['gains', 'beast-mode', 'spot-me', 'bruh'] },
      { t: 'culture', id: 'gym' },
      {
        t: 'watch', items: [
          { title: 'Present Perfect vs Past Simple', ch: 'mmmEnglish / English with Lucy', why: 'Посмотри объяснение на английском — ты уже знаешь правило, теперь закрепи на слух.', q: 'present perfect vs past simple English with Lucy' },
          { title: 'Gym vlogs', ch: 'любой gym vlog', why: 'Короткие влоги из зала — тот же сленг, что в уроке. Ищи слова spot, sets, reps, PR.', q: 'gym vlog leg day' },
        ],
      },
      { t: 'chat', who: 'ty', scenario: 'ty2', text: 'Тай спрашивает, как твои ноги. Отвечай, используя Present Perfect.' },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    id: 'w1l5', week: 1, n: 5, title: 'Day one at Northside', ru: 'Первый день на стажировке', img: 'l5_cover', bg: 'bg_manhattan',
    topic: 'Работа', grammar: 'future-forms', mins: 18,
    goals: ['Представиться на работе и написать первое письмо', 'Будущее: will / going to / Present Continuous', 'Офисный жаргон: circle back, EOD, heads-up'],
    steps: [
      { t: 'cover' },
      {
        t: 'scene', title: 'Знакомство с наставницей', where: 'Northside Media, Manhattan · 9:30 AM', img: 'l5_scene',
        intro: 'Первый день стажировки в маркетинговом агентстве. Наставница Майя встречает Макса.',
        lines: [
          { s: 'maya', en: "Hi, you must be Max! I'm Maya. I**'ll be** your mentor this semester. Welcome to Northside.", ru: 'Привет, ты, должно быть, Макс! Я Майя, буду твоей наставницей в этом семестре. Добро пожаловать в Northside.' },
          { s: 'max', en: 'Hi Maya, nice to meet you. Thanks for having me.', ru: 'Привет, Майя, приятно познакомиться. Спасибо, что взяли меня.' },
          { s: 'maya', en: "Of course! So here's the plan. At ten you**'re meeting** the team. After that, I**'m going to show** you our tools.", ru: 'Конечно! Итак, план такой. В десять у тебя встреча с командой. Потом я покажу тебе наши инструменты.' },
          { s: 'max', en: 'Sounds great. What **am** I **going to work** on?', ru: 'Звучит отлично. Над чем я буду работать?' },
          { s: 'maya', en: "We**'re launching** a campaign for a sneaker brand next month. You**'ll help** with social media research.", ru: 'В следующем месяце мы запускаем кампанию для бренда кроссовок. Ты поможешь с исследованием соцсетей.' },
          { s: 'max', en: 'Perfect. I think I**\'ll learn** a lot here.', ru: 'Отлично. Думаю, я многому здесь научусь.' },
          { s: 'maya', en: "I'm sure you will. Oh, and could you send a short email to the team after lunch? Just introduce yourself.", ru: 'Уверена. Да, и не мог бы ты после обеда отправить команде короткое письмо? Просто представься.' },
          { s: 'max', en: 'Sure. Should it be formal?', ru: 'Конечно. Оно должно быть официальным?' },
          { s: 'maya', en: 'Friendly but professional. "Hi team" is fine. No "Dear Sir or Madam", please. We\'re not a bank.', ru: 'Дружелюбным, но профессиональным. «Hi team» — нормально. Никаких «Уважаемые господа», пожалуйста. Мы не банк.' },
          { s: 'max', en: 'Got it. I**\'ll send** it by two.', ru: 'Понял. Отправлю до двух.' },
          { s: 'maya', en: "Perfect. Let's grab a coffee before the meeting. It**'s going to be** a long day.", ru: 'Отлично. Давай возьмём кофе перед встречей. День будет длинным.' },
        ],
      },
      {
        t: 'chunks', title: 'Первый день в офисе',
        items: [
          { en: 'Thanks for having me.', ru: 'Спасибо, что пригласили / взяли меня.' },
          { en: "Here's the plan.", ru: 'План такой.' },
          { en: 'Sounds great.', ru: 'Звучит отлично.' },
          { en: 'What am I going to work on?', ru: 'Над чем я буду работать?' },
          { en: 'Could you send me…?', ru: 'Не мог бы ты прислать мне…?', note: 'Вместо «Send me…» — так вежливее.' },
          { en: "I'll send it by two.", ru: 'Отправлю до двух.', note: 'by = не позже чем.' },
          { en: "I'm looking forward to working with you.", ru: 'С нетерпением жду совместной работы.' },
          { en: 'Feel free to reach out.', ru: 'Обращайтесь, если что.' },
        ],
      },
      { t: 'grammar', topic: 'future-forms', note: 'В диалоге три будущих: I’ll be your mentor / I’ll send it (решение, обещание) · I’m going to show you (план) · You’re meeting the team at ten / We’re launching… next month (договорённость, есть время в календаре).' },
      {
        t: 'email', title: 'Письмо Макса команде', from: 'Max Ivanov', to: 'team@northside.media', subject: 'Hello from the new intern!',
        body: [
          'Hi team,',
          "My name is Max, and I'm the new marketing intern. I'm from Kazan, Russia, and I'm studying business here in New York this semester.",
          "I'll be helping Maya with social media research for the sneaker campaign. I'm really looking forward to working with all of you!",
          'Feel free to reach out if you ever need a hand.',
          'Best,',
          'Max',
        ],
        notes: [
          { en: 'Hi team,', ru: 'Обычное начало письма команде в США. «Dear colleagues» звучит слишком торжественно.' },
          { en: "I'll be helping", ru: 'Future Continuous — мягко и вежливо о том, что будет происходить.' },
          { en: 'looking forward to working', ru: 'После look forward to — глагол с -ing! Не «to work».' },
          { en: 'Best,', ru: 'Стандартная подпись. Ещё: Best regards, Thanks, Cheers (UK).' },
        ],
      },
      { t: 'meme', tpl: 'top', img: 'm_fine', top: 'Me on day one when my manager says\n"Let\'s circle back on this EOD"', bottom: '', ru: 'This is fine — делаешь вид, что всё понятно. Circle back = вернуться к вопросу позже, EOD = end of day, до конца дня.' },
      {
        t: 'quiz', title: 'Будущее время',
        items: [
          { k: 'choice', q: '— The phone is ringing. — I ___ get it!', opts: ["'ll", "'m going to", "'m getting"], a: 0, why: 'Решение в момент речи → will.' },
          { k: 'choice', q: "Look at those clouds. It ___ rain.", opts: ['will', "'s going to", 'rains'], a: 1, why: 'Есть признак прямо сейчас (тучи) → going to.' },
          { k: 'choice', q: "I ___ the team at ten tomorrow. It's in my calendar.", opts: ['meet', "'m meeting", 'will meeting'], a: 1, why: 'Договорённость со временем → Present Continuous.' },
          { k: 'fix', q: 'I will to send the report tomorrow.', a: ['I will send the report tomorrow.', "I'll send the report tomorrow."], why: 'После will — глагол без to.' },
          { k: 'fix', q: "I'm looking forward to work with you.", a: ["I'm looking forward to working with you.", 'I am looking forward to working with you.'], why: 'Look forward to + -ing.' },
          { k: 'fill', q: 'Next month we ___ a new campaign.', hint: 'launch, договорённость', a: ['are launching', "'re launching"], why: 'План-договорённость → are launching.' },
          { k: 'type', ru: 'Я отправлю это до пяти.', a: ["I'll send it by five", 'I will send it by five', "I'll send it before five", 'I will send it before five', "I'll send this by five", "I'll send it by 5", 'I will send this by five'], why: 'Обещание → will; «до пяти» = by five.' },
          { k: 'order', ru: 'Не мог бы ты прислать мне файл?', a: 'Could you send me the file?' },
        ],
      },
      { t: 'slang', ids: ['circle-back', 'eod', 'heads-up', 'touch-base'] },
      { t: 'culture', id: 'first-names' },
      {
        t: 'watch', items: [
          { title: 'The Office (US)', ch: 'сериал', why: 'Офисный юмор и small talk. Смотри сцены на YouTube по 3–5 минут с английскими субтитрами.', q: 'The Office best scenes' },
          { title: 'Business English: emails', ch: 'Business English Pod / Linguamarina', why: 'Готовые фразы для писем: начало, просьба, напоминание, подпись.', q: 'business English email phrases' },
        ],
      },
      { t: 'chat', who: 'maya', scenario: 'maya1', text: 'Майя написала про созвон. Тут нужен деловой тон — посмотрим, как ты справишься.' },
    ],
  },

  /* ------------------------------------------------------------------ 6 */
  {
    id: 'w1l6', week: 1, n: 6, title: 'Rooftop party', ru: 'Вечеринка на крыше', img: 'l6_cover', bg: 'bg_rooftop',
    topic: 'Вечеринка', grammar: 'modals-obligation', mins: 15,
    goals: ['Вести себя на американской вечеринке', 'Модальные: should, have to, don’t have to, can, might', 'Сленг: lit, vibe, BYOB, dude'],
    steps: [
      { t: 'cover' },
      {
        t: 'scene', title: 'Вечеринка у Джея', where: 'Rooftop, Bushwick · 10:20 PM', img: 'l6_scene',
        intro: 'Джей зовёт всех на крышу. Там же его кузен Диего, который прилетел из Лос-Анджелеса.',
        lines: [
          { s: 'jay', en: 'Yo, you made it! Come in, come in.', ru: 'Йоу, ты пришёл! Заходи, заходи.' },
          { s: 'max', en: '**Should** I take my shoes off?', ru: 'Мне снять обувь?' },
          { s: 'jay', en: "Nah, you **don't have to**. Relax, it's a party.", ru: 'Не, не надо. Расслабься, это вечеринка.' },
          { s: 'max', en: 'Okay. I brought some snacks. Was I supposed to bring drinks?', ru: 'Окей. Я принёс закуски. Я должен был принести напитки?' },
          { s: 'jay', en: "It's BYOB, but don't worry, we have enough. Yo, this is my cousin Diego. He's from LA.", ru: 'Вообще-то каждый со своим, но не парься, у нас хватает. Знакомься, мой кузен Диего. Он из Лос-Анджелеса.' },
          { s: 'diego', en: "What's up, dude! Jay told me about you. The Russian guy, right?", ru: 'Здорово, чувак! Джей про тебя рассказывал. Тот самый русский, да?' },
          { s: 'max', en: "That's me. Is this your first time in New York?", ru: 'Это я. Ты впервые в Нью-Йорке?' },
          { s: 'diego', en: "Nah, I come every summer. But I **can't** get used to the subway. It's so loud!", ru: 'Не, каждое лето приезжаю. Но к метро привыкнуть не могу. Оно такое громкое!' },
          { s: 'max', en: "Ha, same. So what **should** I do? I don't know anyone here.", ru: 'Ха, аналогично. Так что мне делать? Я тут никого не знаю.' },
          { s: 'diego', en: 'Easy. You **can** just grab a soda and say hi. People here are super chill.', ru: 'Легко. Можешь просто взять газировку и поздороваться. Народ тут очень расслабленный.' },
          { s: 'jay', en: 'But you **might have to** dance. House rules.', ru: 'Но, возможно, придётся потанцевать. Правила дома.' },
          { s: 'max', en: "I **can't** dance, man.", ru: 'Я не умею танцевать, чувак.' },
          { s: 'diego', en: "Dude, nobody here **can** dance. That's the vibe.", ru: 'Чувак, тут никто не умеет танцевать. В этом и вайб.' },
          { s: 'jay', en: "Facts. Let's go, the music is lit!", ru: 'Факт. Погнали, музыка огонь!' },
        ],
      },
      {
        t: 'chunks', title: 'На вечеринке',
        items: [
          { en: 'You made it!', ru: 'Ты пришёл! (рад, что смог)' },
          { en: 'Should I take my shoes off?', ru: 'Мне снять обувь?', note: 'В США обычно не снимают — но лучше спросить.' },
          { en: "You don't have to.", ru: 'Не обязательно / не надо.' },
          { en: 'Was I supposed to bring…?', ru: 'Я должен был принести…?' },
          { en: "Don't worry, we have enough.", ru: 'Не парься, у нас хватает.' },
          { en: 'Grab a drink and say hi.', ru: 'Возьми напиток и поздоровайся.' },
          { en: "That's the vibe.", ru: 'В этом и вся атмосфера.' },
          { en: 'Same.', ru: 'Аналогично / у меня так же.' },
        ],
      },
      { t: 'grammar', topic: 'modals-obligation', note: 'Should I…? — совет. You don’t have to — не обязательно (а не «нельзя»!). You might have to — возможно, придётся. Can / can’t — умею / могу.' },
      { t: 'meme', tpl: 'top', img: 'm_buttons', top: '1:30 AM at a party:', bottom: 'Say goodbye to 30 people  vs  Irish goodbye', ru: 'Irish goodbye — уйти с вечеринки, ни с кем не попрощавшись. В США это нормально, если вечеринка большая.' },
      {
        t: 'quiz', title: 'Модальные глаголы',
        items: [
          { k: 'choice', q: "You ___ bring anything. We have enough food.", opts: ["mustn't", "don't have to", "can't"], a: 1, why: 'Don’t have to = не обязательно. Mustn’t = запрещено.' },
          { k: 'choice', q: 'You ___ drink alcohol in the US if you are under 21.', opts: ["mustn't", "don't have to", 'should'], a: 0, why: 'Запрет закона → mustn’t (или can’t).' },
          { k: 'choice', q: "It's cold outside. You ___ take a jacket.", opts: ['should', 'must to', 'have'], a: 0, why: 'Совет → should.' },
          { k: 'fix', q: 'You must to try the tacos.', a: ['You must try the tacos.'], why: 'После must, can, should — без to.' },
          { k: 'fix', q: 'He cans dance really well.', a: ['He can dance really well.'], why: 'Модальные глаголы не меняются: he can.' },
          { k: 'fill', q: 'I ___ dance, but I can sing.', hint: 'не умею', a: ["can't", 'cannot', 'can not'], why: 'Не умею → can’t.' },
          { k: 'type', ru: 'Мне снять обувь?', a: ['Should I take my shoes off', 'Should I take off my shoes', 'Do I have to take my shoes off', 'Do I need to take my shoes off', 'Do I have to take off my shoes', 'Shall I take my shoes off', 'Should I take off my shoes'], why: 'Спрашиваем совет → Should I…?' },
          { k: 'listen', en: 'You might have to dance.', v: 'm', opts: ['Возможно, тебе придётся потанцевать.', 'Ты не должен танцевать.', 'Ты умеешь танцевать.'], a: 0, why: 'Might have to — возможно, придётся.' },
        ],
      },
      { t: 'slang', ids: ['lit', 'vibe', 'byob', 'dude', 'damn'] },
      { t: 'culture', id: 'party' },
      {
        t: 'watch', items: [
          { title: 'Brooklyn Nine-Nine', ch: 'сериал', why: 'Нью-Йорк, быстрый разговорный английский, много шуток. Начни со сцен на YouTube.', q: 'Brooklyn Nine-Nine funniest scenes' },
          { title: 'American party culture', ch: 'Easy English / street interviews', why: 'Как американцы описывают вечеринки — живые ответы.', q: 'American house party culture explained' },
        ],
      },
      { t: 'chat', who: 'diego', scenario: 'diego1', text: 'Диего пишет после вечеринки. Калифорнийский сленг на подходе.' },
    ],
  },

  /* ------------------------------------------------------------------ 7 */
  {
    id: 'w1l7', week: 1, n: 7, title: 'Where hip-hop was born', ru: 'Бронкс: родина хип-хопа', img: 'l7_cover', bg: 'bg_bronx',
    topic: 'Повторение + переписка', grammar: 'mixed', mins: 20, boss: true,
    goals: ['Повторить все времена недели', 'Переписка: wyd, ngl, omw, hmu', 'История: как в 1973 году родился хип-хоп'],
    steps: [
      { t: 'cover' },
      {
        t: 'scene', title: '1520 Sedgwick Avenue', where: 'The Bronx · Saturday, 2:00 PM', img: 'l7_scene',
        intro: 'Джей везёт Макса в Бронкс, к обычному жилому дому, с которого всё началось.',
        lines: [
          { s: 'jay', en: 'So this is it. 1520 Sedgwick Avenue.', ru: 'Ну вот. Седжвик-авеню, 1520.' },
          { s: 'max', en: 'It **looks** like a normal building.', ru: 'Выглядит как обычный дом.' },
          { s: 'jay', en: 'Yeah, but this is where it all **started**. In 1973, DJ Kool Herc **threw** a party here, in the rec room.', ru: 'Ага, но всё началось именно здесь. В 1973-м диджей Кул Херк устроил здесь вечеринку, в комнате отдыха.' },
          { s: 'max', en: "A party? That's it?", ru: 'Вечеринку? И всё?' },
          { s: 'jay', en: 'Not just a party. He **played** the same drum break again and again on two turntables. People **went** crazy.', ru: 'Не просто вечеринку. Он снова и снова крутил один и тот же барабанный брейк на двух вертушках. Люди сходили с ума.' },
          { s: 'max', en: 'Wait, so hip-hop **was born** at a house party?', ru: 'Подожди, то есть хип-хоп родился на домашней вечеринке?' },
          { s: 'jay', en: "Facts. It was his sister's back-to-school party. Now hip-hop **is** everywhere.", ru: 'Факт. Это была вечеринка его сестры перед учебным годом. А теперь хип-хоп везде.' },
          { s: 'max', en: "That's crazy. I**'ve listened** to rap for years, but I **didn't know** that.", ru: 'С ума сойти. Я слушаю рэп много лет, но этого не знал.' },
          { s: 'jay', en: "See? You**'re learning**. Next Saturday I**'m taking** you to a real open mic.", ru: 'Видишь? Учишься. В следующую субботу веду тебя на настоящий открытый микрофон.' },
          { s: 'max', en: "Only if I **don't have to** rap.", ru: 'Только если мне не придётся читать рэп.' },
          { s: 'jay', en: "We**'ll** see about that.", ru: 'Посмотрим.' },
        ],
      },
      {
        t: 'texting', title: 'Как пишут в чатах',
        intro: 'Американцы в переписке сокращают всё. Без этого ты не поймёшь половину сообщений от друзей.',
        items: [
          { en: 'wyd', full: 'what (are) you doing?', ru: 'что делаешь?' },
          { en: 'hmu', full: 'hit me up', ru: 'напиши / набери мне' },
          { en: 'omw', full: 'on my way', ru: 'уже еду / иду' },
          { en: 'ngl', full: 'not gonna lie', ru: 'честно говоря' },
          { en: 'tbh', full: 'to be honest', ru: 'если честно' },
          { en: 'idk', full: "I don't know", ru: 'не знаю' },
          { en: 'fr', full: 'for real', ru: 'реально, серьёзно' },
          { en: 'rn', full: 'right now', ru: 'прямо сейчас' },
          { en: 'lmk', full: 'let me know', ru: 'дай знать' },
          { en: 'brb', full: 'be right back', ru: 'сейчас вернусь' },
          { en: 'lol / lmao', full: 'laughing out loud / laughing my ass off', ru: 'смешно / ору', note: 'lol уже почти ничего не значит — просто смягчает фразу. lmao — сильнее, слово ass внутри, но в переписке с друзьями норм.' },
          { en: 'u / ur / gonna / wanna', full: 'you / your / going to / want to', ru: 'ты / твой / собираюсь / хочу' },
        ],
        chat: [
          { s: 'jay', en: 'wyd rn' },
          { s: 'max', en: 'nothing much, just studying. wbu?' },
          { s: 'jay', en: 'bout to hit the studio. ngl this beat is crazy' },
          { s: 'max', en: 'fr? send it' },
          { s: 'jay', en: 'omw home, will send in 10. hmu later' },
        ],
      },
      { t: 'grammar', topic: 'mixed-review' },
      { t: 'meme', tpl: 'top', img: 'm_brain', top: 'Texting in English, level 1 → 4:\n"I am going to come." → "I will come."\n→ "Coming." → "omw"', bottom: '', ru: 'Expanding brain — чем короче, тем «умнее». В переписке omw (on my way) — самый естественный вариант.' },
      {
        t: 'quiz', title: 'Финальный тест недели', boss: true,
        items: [
          { k: 'choice', q: 'Jay ___ beats every night.', opts: ['make', 'makes', 'is make'], a: 1, why: 'Привычка, he → makes.' },
          { k: 'choice', q: "Shh! I ___ to the professor. Call you later.", opts: ['talk', "'m talking", 'talked'], a: 1, why: 'Прямо сейчас → Present Continuous.' },
          { k: 'fill', q: 'In 1973, DJ Kool Herc ___ a party in the Bronx.', hint: 'throw', a: ['threw'], why: 'Throw → threw → thrown. 1973 — точное прошлое.' },
          { k: 'choice', q: "I ___ to rap for years, but I didn't know that.", opts: ['listen', "'ve listened", 'listened'], a: 1, why: 'For years, до сих пор → Present Perfect.' },
          { k: 'choice', q: "Next Saturday I ___ you to an open mic. It's planned.", opts: ["'m taking", 'take', 'took'], a: 0, why: 'Договорённость → Present Continuous.' },
          { k: 'fix', q: "You don't must bring anything.", a: ["You don't have to bring anything.", 'You do not have to bring anything.', "You don't need to bring anything."], why: '«Не обязательно» → don’t have to. «Don’t must» не существует.' },
          { k: 'fix', q: 'Did you saw the building?', a: ['Did you see the building?'], why: 'После did → see.' },
          { k: 'order', ru: 'Я никогда не был в Бронксе.', a: "I've never been to the Bronx." },
          { k: 'type', ru: 'Что делаешь? (как в чате, 3 буквы)', a: ['wyd'], why: 'wyd = what (are) you doing?' },
          { k: 'type', ru: 'Я поеду туда в субботу. (план, going to)', a: ["I'm going to go there on Saturday", 'I am going to go there on Saturday', "I'm going to go there Saturday", "I'm going there on Saturday", 'I am going there on Saturday', "I'm going to go there on saturday"], why: 'План → be going to + глагол.' },
        ],
      },
      { t: 'culture', id: 'hiphop-born' },
      {
        t: 'watch', items: [
          { title: 'Hip-Hop Evolution', ch: 'Netflix, документальный', why: 'История хип-хопа от первых лиц: Kool Herc, Grandmaster Flash. Сложно, но с субтитрами — лучший «понятный ввод» по теме.', q: 'Hip-Hop Evolution trailer' },
          { title: 'The Get Down', ch: 'Netflix, сериал', why: 'Бронкс 1977 года, рождение диджеинга и брейка. Художественно, но атмосферно.', q: 'The Get Down trailer' },
        ],
      },
      { t: 'chat', who: 'jay', scenario: 'jay2', text: 'Джей зовёт на open mic. Финальный чат недели — используй всё, что выучил.' },
    ],
  },
];

import { LEVELUP, STREET } from './levelup.js';
import { W2, W2_LEVELUP, W2_STREET } from './week2.js';
import { W3, W3_LEVELUP, W3_STREET } from './week3.js';
import { W4, W4_LEVELUP, W4_STREET } from './week4.js';
import { MORE, MORE_LEVELUP, MORE_STREET } from './more.js';
LESSONS.push(...W2, ...W3, ...W4);
// +5 episodes per city go right before each week's final episode; numbers follow the order.
{
  const all = [...LESSONS, ...MORE];
  LESSONS.length = 0;
  for (const w of [...new Set(all.map(l => l.week))]) {
    const ls = all.filter(l => l.week === w);
    const ordered = [...ls.filter(l => !l.boss && !MORE.includes(l)), ...ls.filter(l => MORE.includes(l)), ...ls.filter(l => l.boss)];
    ordered.forEach((l, i) => { l.n = i + 1; LESSONS.push(l); });
  }
}
Object.assign(LEVELUP, W2_LEVELUP, W3_LEVELUP, W4_LEVELUP, MORE_LEVELUP);
Object.assign(STREET, W2_STREET, W3_STREET, W4_STREET, MORE_STREET);
// Every episode gets "Прокачка до B1+" after the phrases and "Улица: мат и юмор" after the slang.
for (const L of LESSONS) {
  if (L._x) continue; L._x = 1;
  const at = (t, step) => { const i = L.steps.findIndex(s => s.t === t); L.steps.splice(i >= 0 ? i + 1 : L.steps.length - 2, 0, step); };
  if (LEVELUP[L.id]) at(L.steps.some(s => s.t === 'chunks') ? 'chunks' : 'texting', { t: 'levelup', items: LEVELUP[L.id] });
  if (STREET[L.id]) at(L.steps.some(s => s.t === 'slang') ? 'slang' : 'culture', { t: 'street', ...STREET[L.id] });
}

export const lessonById = id => LESSONS.find(l => l.id === id);
