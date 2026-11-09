// Speaking situations (built from lesson scenes), video advice, learning method, app scheme.
export const SPEAKING = [
  { id: 'meet', title: 'Знакомство', en: 'Meeting people', lesson: 'w1l1', img: 'l1_scene' },
  { id: 'cafe', title: 'Кафе', en: 'At the coffee shop', lesson: 'w1l2', img: 'l2_scene' },
  { id: 'study', title: 'Учёба', en: 'On campus', lesson: 'w1l3', img: 'l3_scene' },
  { id: 'gym', title: 'Спортзал', en: 'At the gym', lesson: 'w1l4', img: 'l4_scene' },
  { id: 'party', title: 'Вечеринка', en: 'At a party', lesson: 'w1l6', img: 'l6_scene' },
  { id: 'travel', title: 'Путешествия', en: 'At the airport', lesson: 'w2l1', img: 'w2l1_scene' },
  { id: 'dinner', title: 'Ужин и споры о еде', en: 'Family dinner', lesson: 'w2l2', img: 'w2l2_scene' },
  { id: 'sports', title: 'Уличный спорт', en: 'Pickup game', lesson: 'w2l4', img: 'w2l4_scene' },
  { id: 'stories', title: 'Рассказать историю', en: 'Storytelling', lesson: 'w2l5', img: 'w2l5_scene' },
  { id: 'family-dinner', title: 'В гостях у семьи', en: 'Southern hospitality', lesson: 'w3l1', img: 'w3l1_scene' },
  { id: 'excuses', title: 'Форс-мажор и просьбы', en: 'Asking for an extension', lesson: 'w3l6', img: 'w3l6_scene' },
  { id: 'dreams', title: 'Мечты и «если бы»', en: 'Talking about dreams', lesson: 'w4l3', img: 'w4l3_scene' },
  { id: 'emergency', title: 'Экстренная ситуация', en: 'Earthquake!', lesson: 'w4l5', img: 'w4l5_scene' },
  { id: 'texting', title: 'Переписка с друзьями', en: 'Texting', lesson: 'w1l7', step: 'texting', img: 'l7_cover' },
];

export const WATCH = {
  how: [
    'Смотри то, что понимаешь на 70–80%. Слишком сложно — мозг отключается, слишком легко — нет роста. Это «понятный ввод» Стивена Крашена.',
    'Схема для одного видео: 1) с английскими субтитрами; 2) пауза на непонятном, выписать 3–5 фраз в словарь приложения; 3) одну минуту — повторять вслух за героем (shadowing); 4) через пару дней — без субтитров.',
    'Русские субтитры — только для первого просмотра сериала, потом выключай.',
    'Лучше 15 минут каждый день, чем 3 часа в выходные.',
  ],
  items: [
    { title: "Rachel's English", kind: 'канал', level: 'A2–B2', accent: 'US', why: 'Американское произношение: связки, редукции, интонация. Лучшее для shadowing.', q: "Rachel's English" },
    { title: 'Easy English', kind: 'канал', level: 'A2–B1', accent: 'US / UK', why: 'Уличные интервью с двойными субтитрами — как люди говорят на самом деле.', q: 'Easy English street interviews' },
    { title: 'English with Lucy', kind: 'канал', level: 'A2–B2', accent: 'UK', why: 'Понятные объяснения грамматики и британского произношения.', q: 'English with Lucy' },
    { title: 'BBC Learning English', kind: 'канал', level: 'A2–B2', accent: 'UK', why: '6 Minute English — короткие подкасты с разбором слов.', q: 'BBC Learning English 6 minute English' },
    { title: 'Speak English With Vanessa', kind: 'канал', level: 'A2–B1', accent: 'US', why: 'Разговорные фразы для повседневной жизни, медленно и чётко.', q: 'Speak English With Vanessa' },
    { title: 'Learn English with TV Series', kind: 'канал', level: 'B1', accent: 'US', why: 'Разбор сцен из сериалов и фильмов: сленг, идиомы, шутки.', q: 'Learn English with TV Series' },
    { title: 'Friends', kind: 'сериал', level: 'A2–B1', accent: 'US', why: 'Классика: простая бытовая речь, нью-йоркская жизнь 90-х. Идеальный первый сериал.', q: 'Friends best scenes' },
    { title: 'Brooklyn Nine-Nine', kind: 'сериал', level: 'B1', accent: 'US', why: 'Бруклин, быстрый юмор, современный сленг.', q: 'Brooklyn Nine-Nine best scenes' },
    { title: 'The Office (US)', kind: 'сериал', level: 'B1', accent: 'US', why: 'Офисный small talk и неловкие ситуации на работе — деловой английский с юмором.', q: 'The Office US best scenes' },
    { title: 'Ted Lasso', kind: 'сериал', level: 'B1+', accent: 'US + UK', why: 'Американец в Лондоне: идеально, чтобы слышать разницу US и UK.', q: 'Ted Lasso best scenes' },
    { title: 'Hip-Hop Evolution', kind: 'документальный', level: 'B1+', accent: 'US', why: 'История хип-хопа от первых лиц. Сложная речь, но с субтитрами — супер.', q: 'Hip-Hop Evolution' },
    { title: 'Интервью рэперов', kind: 'YouTube', level: 'B1+', accent: 'US', why: 'Шоу Hot Ones, Breakfast Club — живой разговорный английский и сленг.', q: 'Hot Ones interview rapper' },
  ],
};

export const METHOD = [
  { id: 'srs', title: 'Интервальные повторения', who: 'как в Anki / SuperMemo', text: 'Сохранённые слова возвращаются к тебе ровно тогда, когда ты начинаешь их забывать: через 1 день, 6 дней, потом реже. Алгоритм SM-2.', where: 'Я → Карточки' },
  { id: 'input', title: 'Понятный ввод', who: 'Стивен Крашен', text: 'Язык усваивается, когда ты понимаешь сообщения чуть выше своего уровня. Поэтому каждый урок начинается с живой сцены, а не с правила.', where: 'Сцены уроков, лента, видео' },
  { id: 'chunks', title: 'Учим фразами (чанками)', who: 'лексический подход, Майкл Льюис', text: 'Носители говорят готовыми блоками: «How do you like it so far?», «I’m still getting used to it». Выучишь блок — грамматика внутри встанет сама.', where: 'Шаг «Фразы» в каждом уроке' },
  { id: 'shadow', title: 'Shadowing', who: 'Александр Аргуэльес', text: 'Слушаешь фразу носителя и сразу повторяешь вслух, копируя ритм и интонацию. Ставит произношение и убирает страх говорить.', where: 'Кнопка «Повторять за героем» в сценах' },
  { id: 'recall', title: 'Активное вспоминание', who: 'testing effect', text: 'Вспоминать полезнее, чем перечитывать. Поэтому в каждом уроке — перевод с русского, сборка фраз и исправление ошибок, а не только выбор вариантов.', where: 'Тесты в уроках и в грамматике' },
  { id: 'output', title: 'Говорить и получать обратную связь', who: 'гипотеза вывода, Мэррил Суэйн', text: 'Ты пишешь персонажам своими словами, а они отвечают и мягко поправляют типичные ошибки русскоговорящих (I am agree, he don’t…).', where: 'Чаты' },
  { id: 'errors', title: 'Работа над ошибками', who: 'error log', text: 'Каждая ошибка из тестов попадает в отдельный список и возвращается, пока ты дважды не ответишь правильно.', where: 'Я → Работа над ошибками' },
  { id: 'contrast', title: 'Сравнение с русским', who: 'контрастивный подход', text: 'Для каждой темы — «ловушка для русских»: где русская логика подводит в английском.', where: 'Карточки грамматики' },
  { id: 'emotion', title: 'Эмоции и мемы', who: 'эмоциональная память', text: 'Мемы, сленг, музыка и истории персонажей — то, что вызывает эмоцию, запоминается в разы лучше.', where: 'Мемы в уроках, лента, музыка' },
];
