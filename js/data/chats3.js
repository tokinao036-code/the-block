// Weeks 3–4 chat scenarios (Atlanta, Los Angeles). Format as in chats.js.
export const SCEN3 = [
  {
    id: 'ty3', who: 'ty', unlock: 'w3l1', title: 'Первый вечер в Атланте', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'yo u still up? 😂', ru: 'йоу, не спишь?' }, { en: "be honest, what do u think of my fam so far?", ru: 'скажи честно, как тебе моя семья пока?' }],
        replies: [
          { en: "Your mom is amazing. I've been eating nonstop since we got here.", ru: 'Твоя мама потрясающая. Я ем без остановки с тех пор, как мы приехали.', kw: ['amazing', 'mom', 'eating', 'food', 'love', 'great', 'nice', 'been'], go: 'b' },
          { en: 'I eat all day since morning.', ru: '(с ошибкой)', bad: true, better: "I've been eating all day.", fb: 'С since / all day про процесс до сих пор → I’ve been eating.', react: [{ en: 'u been eating all day? facts 😂 she does that', ru: 'ты весь день ешь? факт, она так делает' }] },
          { en: "Honestly, I feel like part of the family already.", ru: 'Честно, я уже чувствую себя частью семьи.', kw: ['family', 'feel', 'part', 'home', 'already'], go: 'b' },
        ] },
      b: { msgs: [{ en: "that's what I'm talking about 🙏 what have u been up to back in NY tho? haven't seen u in the gym in weeks", ru: 'вот это я понимаю. а чем ты занимался в Нью-Йорке? в зале тебя неделями не видно' }], expect: { t: 'perfect', ex: "I've been working on a campaign and studying for midterms." },
        replies: [
          { en: "I've been swamped with work and midterms, to be honest.", ru: 'Честно, я был завален работой и промежуточными экзаменами.', kw: ['been', 'swamped', 'work', 'midterms', 'busy', 'studying', 'working'], go: 'c' },
          { en: "I've been skipping leg day. Don't judge me.", ru: 'Я прогуливал день ног. Не осуждай.', kw: ['skipping', 'leg day', 'judge', 'lazy', 'gym'], go: 'c2' },
        ] },
      c: { msgs: [{ en: "respect. tomorrow we hit my old high school gym. no excuses 💪", ru: 'уважаю. завтра идём в зал моей старой школы. без отговорок' }], end: true },
      c2: { msgs: [{ en: "BRO 😤 tomorrow 7am, my old high school gym. ur legs are mine", ru: 'БРО. завтра в 7 утра, зал моей старой школы. твои ноги мои' }], end: true },
    },
  },
  {
    id: 'keisha1', who: 'keisha', unlock: 'w3l2', title: 'Знакомство с Кейшей', start: 'a',
    nodes: {
      a: { msgs: [{ en: "hey New York 👋 it's Keisha. Ty gave me ur number", ru: 'привет, Нью-Йорк. это Кейша. Тай дал мне твой номер' }, { en: 'so… have u come up with any ideas for my video yet? 👀', ru: 'ну что… ты уже придумал идеи для моего видео?' }], expect: { t: 'perfect', ex: "I've already come up with one idea!" },
        replies: [
          { en: "I've already got one idea: three generations of sneakers in your family.", ru: 'У меня уже есть одна идея: три поколения кроссовок в твоей семье.', kw: ['already', 'idea', 'generations', 'family', 'sneakers', 'got'], go: 'b' },
          { en: "Not yet, but I've been thinking about it all night.", ru: 'Ещё нет, но я думал об этом всю ночь.', kw: ['not yet', 'thinking', 'been', 'night', 'still'], go: 'b2' },
          { en: 'Yes, I have idea yesterday.', ru: '(с ошибкой)', bad: true, better: 'Yes, I had an idea yesterday.', fb: 'С yesterday — Past Simple: I had an idea. И не забудь артикль: an idea.', react: [{ en: 'u HAD an idea yesterday? ok spill ☕', ru: 'у тебя БЫЛА идея вчера? выкладывай' }] },
        ] },
      b: { msgs: [{ en: "wait. that's actually fire 🔥 bring it tomorrow, 10am, my studio", ru: 'подожди. это реально огонь. приноси завтра, в 10, в мою студию' }], end: true },
      b2: { msgs: [{ en: "all night?? ok dedicated 😂 come to my studio tomorrow at 10, we'll brainstorm", ru: 'всю ночь?? ну ты преданный. приходи завтра в 10 в студию, накидаем идей' }], end: true },
    },
  },
  {
    id: 'ty4', who: 'ty', unlock: 'w3l3', title: 'После матча', start: 'a',
    nodes: {
      a: { msgs: [{ en: "WE WON 🏆🏆", ru: 'МЫ ВЫИГРАЛИ' }, { en: 'did u see Darius face after that dunk 😂', ru: 'ты видел лицо Дариуса после того данка' }],
        replies: [
          { en: 'I did! He must have been so embarrassed.', ru: 'Видел! Ему, наверное, было так стыдно.', kw: ['must', 'embarrassed', 'did', 'saw', 'face', 'yes'], go: 'b' },
          { en: 'He mustn’t be happy now.', ru: '(не тот модальный)', bad: true, better: "He can't be happy right now.", fb: 'Логическое «точно нет» — can’t, а не mustn’t (mustn’t = нельзя).', react: [{ en: "he CAN'T be happy 😂 nah he's crying in the parking lot", ru: 'он точно не счастлив, ага. он рыдает на парковке' }] },
        ] },
      b: { msgs: [{ en: "lmaooo he left before the trophy. where u think he went?", ru: 'ахаха, он ушёл ещё до кубка. как думаешь, куда он делся?' }], expect: { t: 'past', ex: 'He might have gone home to cry.' },
        replies: [
          { en: 'He might have gone home to practice his dunks.', ru: 'Может, пошёл домой тренировать данки.', kw: ['might', 'may', 'could', 'gone', 'home', 'practice', 'cry'], go: 'c' },
          { en: "He can't have gone far. His car is still here.", ru: 'Далеко уйти он не мог. Его машина ещё здесь.', kw: ["can't", 'far', 'car', 'still', 'here'], go: 'c' },
        ] },
      c: { msgs: [{ en: 'facts 😂 ok celebration at Waffle House, my treat. u in?', ru: 'факт. празднуем в Waffle House, я угощаю. ты в деле?' }],
        replies: [{ en: "I'm in! You earned it.", ru: 'Я в деле! Ты заслужил.', kw: ['in', 'yes', 'down', 'sure', 'bet', 'earned'], go: 'd' }] },
      d: { msgs: [{ en: 'say less 🧇 pulling up in 10', ru: 'больше ни слова. подъеду через 10' }], end: true },
    },
  },
  {
    id: 'keisha2', who: 'keisha', unlock: 'w3l4', title: 'Сроки по видео', start: 'a',
    nodes: {
      a: { msgs: [{ en: "ok status check 📋", ru: 'так, проверка статуса' }, { en: "what will u be doing tomorrow at 2? I need u on set", ru: 'что ты будешь делать завтра в 2? ты мне нужен на съёмке' }], expect: { t: 'future', ex: "I'll be finishing my essay, but I can come after 3." },
        replies: [
          { en: "I'll be finishing my essay, but I can come by around three.", ru: 'Буду дописывать эссе, но смогу заскочить около трёх.', kw: ["i'll be", 'finishing', 'essay', 'come', 'three', '3', 'but'], go: 'b' },
          { en: "Nothing planned. I'm all yours.", ru: 'Ничего не запланировано. Я весь твой.', kw: ['nothing', 'free', 'all yours', 'yes', 'sure'], go: 'b2' },
        ] },
      b: { msgs: [{ en: "3 works. by then we'll have finished the grandma scene", ru: '3 подходит. к тому времени мы уже закончим сцену с бабушкой' }], next: 'c' },
      b2: { msgs: [{ en: "love that energy 😂 see u at 2. bring snacks for the crew", ru: 'обожаю такой настрой. до встречи в 2. принеси перекус для команды' }], next: 'c' },
      c: { msgs: [{ en: 'quick q tho: do u think the brand will like it?', ru: 'быстрый вопрос: думаешь, бренду понравится?' }],
        replies: [
          { en: "If we nail the story, they'll love it.", ru: 'Если сделаем историю идеально — им понравится.', kw: ['if', 'nail', 'love', 'like', "they'll", 'will'], go: 'd' },
          { en: "Honestly, it's a game-changer. Mark my words.", ru: 'Честно, это меняет правила игры. Попомни мои слова.', kw: ['game-changer', 'mark my words', 'honestly', 'sure', 'yes'], go: 'd' },
        ] },
      d: { msgs: [{ en: 'ok marketing boy, I trust u 🤝', ru: 'ладно, мальчик-маркетолог, доверяю тебе' }], end: true },
    },
  },
  {
    id: 'jay4', who: 'jay', unlock: 'w3l5', title: 'Студия в Атланте', start: 'a',
    nodes: {
      a: { msgs: [{ en: "BRO. u were in a real atlanta studio and didn't send me a voice note??", ru: 'БРО. ты был в настоящей студии Атланты и не прислал мне голосовое??' }, { en: 'what was recorded there?? tell me everything', ru: 'что там записывали?? рассказывай всё' }], expect: { t: 'past', ex: 'Some huge trap songs were recorded there.' },
        replies: [
          { en: 'Some of the biggest trap songs were recorded in that room. I was shaking.', ru: 'В этой комнате записали несколько крупнейших трэп-треков. Меня трясло.', kw: ['were recorded', 'recorded', 'trap', 'songs', 'room', 'was'], go: 'b' },
          { en: 'They recorded there many songs.', ru: '(порядок слов)', bad: true, better: 'They recorded a lot of songs there.', fb: 'Порядок: подлежащее + глагол + дополнение + место. Recorded a lot of songs there.', react: [{ en: 'they recorded a lot of songs there? which ones 👀', ru: 'там записали кучу песен? какие' }] },
        ] },
      b: { msgs: [{ en: 'did u put in a good word for me tho', ru: 'а ты замолвил за меня словечко' }],
        replies: [
          { en: "I did! I told the producer you make beats. He said to send him your stuff.", ru: 'Да! Сказал продюсеру, что ты пишешь биты. Он сказал прислать ему твои работы.', kw: ['did', 'told', 'said', 'producer', 'send', 'beats', 'yes'], go: 'c' },
          { en: "I tried, but nobody let me near the board.", ru: 'Пытался, но меня к пульту никто не подпустил.', kw: ['tried', 'nobody', 'board', 'near', 'no'], go: 'c2' },
        ] },
      c: { msgs: [{ en: "WAIT FOR REAL?? 😭 ur my brother forever", ru: 'ПОДОЖДИ, СЕРЬЁЗНО?? ты мой брат навсегда' }], end: true },
      c2: { msgs: [{ en: "lol fair. next time u bring me with u 🤝", ru: 'лол, справедливо. в следующий раз бери меня с собой' }], end: true },
    },
  },
  {
    id: 'liam4', who: 'liam', unlock: 'w3l6', title: 'Ответил ли профессор', start: 'a',
    nodes: {
      a: { msgs: [{ en: "Morning! Did Miller get back to you about the extension?", ru: 'Доброе утро! Миллер ответил тебе насчёт продления?' }],
        replies: [
          { en: 'He did! I managed to get until Monday.', ru: 'Да! Мне удалось получить срок до понедельника.', kw: ['did', 'managed', 'monday', 'yes', 'got', 'until'], go: 'b' },
          { en: 'Yes, I could get extension to Monday.', ru: '(с ошибками)', bad: true, better: 'Yes, I managed to get an extension until Monday.', fb: 'Разовый успех — managed to / was able to. И «до понедельника» = until Monday, артикль an extension.', react: [{ en: "You managed to get one? Brilliant! Until Monday, yeah?", ru: 'Тебе удалось? Блестяще! До понедельника, да?' }] },
        ] },
      b: { msgs: [{ en: "Brilliant. Were you able to save the rest of the essay?", ru: 'Блестяще. А остальное эссе удалось сохранить?' }], expect: { t: 'past', ex: 'I was able to recover most of it.' },
        replies: [
          { en: "I was able to recover most of it from autosave. Lifesaver.", ru: 'Большую часть удалось восстановить из автосохранения. Спасение.', kw: ['was able', 'recover', 'autosave', 'most', 'saved', 'managed'], go: 'c' },
          { en: "No, I couldn't. I'm rewriting the second half.", ru: 'Нет, не смог. Переписываю вторую половину.', kw: ["couldn't", 'no', 'rewriting', 'again', 'second half'], go: 'c2' },
        ] },
      c: { msgs: [{ en: "Lucky you. Pint on me when you're back. Cheers!", ru: 'Везунчик. Пиво за мой счёт, когда вернёшься. Давай!' }], end: true },
      c2: { msgs: [{ en: "Gutted for you, mate. Pint on me when you're back — you've earned it.", ru: 'Сочувствую, дружище. Пиво за мной, когда вернёшься — ты заслужил.' }], end: true },
    },
  },
  {
    id: 'keisha3', who: 'keisha', unlock: 'w3l7', title: 'В аэропорту', start: 'a',
    nodes: {
      a: { msgs: [{ en: "update: 1.2 MILLION views 😭😭", ru: 'новости: 1,2 МИЛЛИОНА просмотров' }, { en: 'u better not forget us when u become a famous marketing guy', ru: 'смотри не забудь нас, когда станешь знаменитым маркетологом' }],
        replies: [
          { en: "Never. I owe you one for this week.", ru: 'Никогда. Я твой должник за эту неделю.', kw: ['never', 'owe', 'one', 'thanks', 'thank', 'week'], go: 'b' },
          { en: "Are you kidding? You're the famous one!", ru: 'Шутишь? Знаменитая тут ты!', kw: ['kidding', 'famous', 'you'], go: 'b' },
        ] },
      b: { msgs: [{ en: 'aww 🥹 so what have u learned this week, New York?', ru: 'оу. ну и чему ты научился за эту неделю, Нью-Йорк?' }], expect: { t: 'perfect', ex: "I've learned that y'all don't play when it comes to food." },
        replies: [
          { en: "I've learned that Southern moms don't take no for an answer.", ru: 'Я узнал, что южные мамы не принимают отказ.', kw: ["i've learned", 'learned', 'moms', 'food', 'answer', 'southern'], go: 'c' },
          { en: "I've learned to say y'all without sounding weird.", ru: 'Я научился говорить y’all и не звучать странно.', kw: ["y'all", 'yall', 'learned', 'weird', 'say'], go: 'c' },
        ] },
      c: { msgs: [{ en: "periodt 😂 text me when u land. love y'all, safe travels ✈️", ru: 'точка. напиши, как приземлишься. люблю вас, хорошей дороги' }], end: true },
    },
  },
  {
    id: 'diego2', who: 'diego', unlock: 'w4l1', title: 'План на день', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'gm dude 🌞 waves are looking gnarly today', ru: 'доброе утро, чувак. волны сегодня мощные' }, { en: 'if u wake up in the next 20 min, we can catch the morning session 🏄', ru: 'если проснёшься в ближайшие 20 минут, успеем на утреннюю сессию' }],
        replies: [
          { en: "If you make coffee, I'll be ready in 15.", ru: 'Если сделаешь кофе, буду готов через 15.', kw: ['if', 'coffee', 'ready', "i'll", '15', 'minutes'], go: 'b' },
          { en: 'If I will wake up, I will come.', ru: '(с ошибкой)', bad: true, better: "If I wake up, I'll come.", fb: 'В части с if — Present: If I wake up, I’ll come.', react: [{ en: "if u wake up? dude u ARE awake 😂 come on", ru: '«если проснёшься»? чувак, ты УЖЕ проснулся, давай' }] },
          { en: "Unless the water is freezing, I'm in.", ru: 'Если вода не ледяная — я в деле.', kw: ['unless', 'freezing', 'cold', 'water', 'in'], go: 'b2' },
        ] },
      b: { msgs: [{ en: 'deal ☕ coffee and tacos after. win-win', ru: 'договорились. кофе и тако после. выигрыш в любом случае' }], end: true },
      b2: { msgs: [{ en: "lol it's the pacific, it's always freezing. wetsuit's on the chair 🤙", ru: 'лол, это Тихий океан, он всегда ледяной. гидрокостюм на стуле' }], end: true },
    },
  },
  {
    id: 'zoe1', who: 'zoe', unlock: 'w4l2', title: 'Знакомство с Зои', start: 'a',
    nodes: {
      a: { msgs: [{ en: "hey! it's Zoe from the skatepark 🎬", ru: 'привет! это Зои из скейтпарка' }, { en: 'quick question for my doc: what would you say if your friends in Russia saw that fall? 😂', ru: 'быстрый вопрос для фильма: что бы ты сказал, если бы друзья в России увидели то падение?' }], expect: { t: 'cont', ex: "If they saw it, I'd say I was doing research." },
        replies: [
          { en: "If they saw it, I'd tell them I was doing floor research.", ru: 'Если бы они это увидели, я бы сказал, что исследовал пол.', kw: ['if', 'saw', "i'd", 'would', 'tell', 'research'], go: 'b' },
          { en: 'If they will see, I will die.', ru: '(с ошибкой)', bad: true, better: "If they saw it, I'd die.", fb: 'Воображаемая ситуация → Second: If + Past, would. Will в if-части нельзя.', react: [{ en: "if they SAW it you'd die? 😂 dramatic. I love it", ru: 'если бы увидели — ты бы умер? драматично. обожаю' }] },
        ] },
      b: { msgs: [{ en: "ha! that's going in the film. so what brings u to LA anyway?", ru: 'ха! это пойдёт в фильм. а что тебя вообще привело в LA?' }],
        replies: [
          { en: "I'm visiting Diego for a week. I've never been to the West Coast before.", ru: 'Приехал к Диего на неделю. Никогда раньше не был на Западном побережье.', kw: ['visiting', 'diego', 'week', 'never', 'west coast', 'first'], go: 'c' },
          { en: "Honestly? Tacos and Diego, in that order.", ru: 'Честно? Тако и Диего, в таком порядке.', kw: ['tacos', 'diego', 'honestly', 'order'], go: 'c' },
        ] },
      c: { msgs: [{ en: "ok you're officially in my doc. griffith observatory tomorrow at sunset? the view is unreal 🌅", ru: 'всё, ты официально в моём фильме. обсерватория Гриффит завтра на закате? вид нереальный' }],
        replies: [{ en: "I'd love to. See you there!", ru: 'С удовольствием. Увидимся там!', kw: ['love', 'yes', 'sure', 'see', 'there', 'down', 'in'], go: 'd' }] },
      d: { msgs: [{ en: "perfect 🎬 don't be late, the light waits for no one", ru: 'отлично. не опаздывай, свет никого не ждёт' }], end: true },
    },
  },
  {
    id: 'zoe2', who: 'zoe', unlock: 'w4l3', title: 'Мечты', start: 'a',
    nodes: {
      a: { msgs: [{ en: "still thinking about our talk 🌌", ru: 'всё ещё думаю о нашем разговоре' }, { en: 'ok real question: if you could have any job in the world, what would it be?', ru: 'серьёзный вопрос: если бы ты мог работать кем угодно, кем бы?' }], expect: { t: 'cont', ex: "If I could have any job, I'd run my own agency." },
        replies: [
          { en: "If I could choose, I'd run my own creative agency.", ru: 'Если бы мог выбирать, руководил бы своим креативным агентством.', kw: ['if', 'could', "i'd", 'would', 'agency', 'own', 'run'], go: 'b' },
          { en: "I'd be a music producer, if I had any talent.", ru: 'Был бы музыкальным продюсером, если бы у меня был талант.', kw: ['producer', 'music', 'talent', 'if', 'had'], go: 'b' },
          { en: 'If I can, I would be a director.', ru: '(с ошибкой)', bad: true, better: "If I could, I'd be a director.", fb: 'Second conditional: If I could…, I’d… (а не can).', react: [{ en: "if u COULD, you'd be a director? competition 👀 I like it", ru: 'если бы МОГ — стал бы режиссёром? конкурент, нравится' }] },
        ] },
      b: { msgs: [{ en: "love that. what's stopping you?", ru: 'обожаю. что тебе мешает?' }],
        replies: [
          { en: "Nothing, really. If I keep learning, I'll get there.", ru: 'Ничего, по сути. Если продолжу учиться — дойду.', kw: ['nothing', 'keep', 'learning', 'get there', 'if', "i'll"], go: 'c' },
          { en: "Money, time, my English… the usual.", ru: 'Деньги, время, мой английский… как обычно.', kw: ['money', 'time', 'english', 'usual'], go: 'c2' },
        ] },
      c: { msgs: [{ en: "that's the energy 🙌 wish more people thought like that", ru: 'вот это настрой. жаль, что не все так думают' }], end: true },
      c2: { msgs: [{ en: "ur english is literally great tho. if ur english were bad, we wouldn't be having this conversation 😌", ru: 'у тебя же отличный английский. если бы он был плохим, мы бы сейчас так не разговаривали' }], end: true },
    },
  },
  {
    id: 'diego3', who: 'diego', unlock: 'w4l4', title: 'После переговоров', start: 'a',
    nodes: {
      a: { msgs: [{ en: "DUDE. u negotiated like a shark 🦈", ru: 'ЧУВАК. ты торговался как акула' }, { en: 'what if he says no to the 3 year deal tho? 😬', ru: 'а что если он откажется от сделки на 3 года?' }],
        replies: [
          { en: "If he says no, we'll look at other places. There's always another option.", ru: 'Если откажет — посмотрим другие места. Всегда есть вариант.', kw: ['if', 'says no', "we'll", 'other', 'places', 'option'], go: 'b' },
          { en: "He won't say no as long as we put it in writing.", ru: 'Он не откажет, если мы всё зафиксируем письменно.', kw: ['as long as', 'writing', "won't", 'no'], go: 'b' },
        ] },
      b: { msgs: [{ en: "true true. if this café works out, ur getting free coffee for life ☕", ru: 'точно-точно. если кафе получится — у тебя бесплатный кофе пожизненно' }],
        replies: [
          { en: "I'm holding you to that.", ru: 'Ловлю на слове.', kw: ['holding', 'promise', 'deal', 'bet', 'that'], go: 'c' },
          { en: "Deal. I'll fly in for the opening.", ru: 'Договорились. Прилечу на открытие.', kw: ['deal', 'fly', 'opening', "i'll", 'come'], go: 'c' },
        ] },
      c: { msgs: [{ en: "🤙 stoked dude. this is really happening", ru: 'в восторге, чувак. это реально происходит' }], end: true },
    },
  },
  {
    id: 'maya4', who: 'maya', unlock: 'w4l5', title: 'Землетрясение', start: 'a', formal: true,
    nodes: {
      a: { msgs: [{ en: "Max, I just saw there was an earthquake in LA. Are you okay?!", ru: 'Макс, только что увидела, что в LA было землетрясение. Ты в порядке?!' }],
        replies: [
          { en: "I'm fine, thank you! Just a few broken mugs. It was terrifying, though.", ru: 'Я в порядке, спасибо! Только пара разбитых кружек. Но было жутко.', kw: ['fine', 'okay', 'ok', 'thank', 'mugs', 'terrifying', 'scared'], go: 'b' },
          { en: 'lol yeah im fine', ru: '(слишком небрежно)', bad: true, better: "I'm fine, thanks for checking in!", fb: 'Майя волнуется — ответь теплее и полнее: thanks for checking in.', react: [{ en: "Glad you're okay! 🙂 You scared me there.", ru: 'Рада, что ты в порядке! Ты меня напугал.' }] },
        ] },
      b: { msgs: [{ en: "Thank goodness. If anything had happened to you, I would never have forgiven myself for approving the trip 😅", ru: 'Слава богу. Если бы с тобой что-то случилось, я бы не простила себе, что одобрила поездку.' }, { en: 'Will you still be able to join the Monday call?', ru: 'Ты всё ещё сможешь присоединиться к созвону в понедельник?' }],
        replies: [
          { en: "Of course. I'll be back in New York by Sunday night.", ru: 'Конечно. К вечеру воскресенья вернусь в Нью-Йорк.', kw: ['of course', 'back', 'sunday', "i'll", 'yes', 'by'], go: 'c', fb: 'Отлично: чёткий ответ со сроком (by Sunday night).' },
          { en: 'Yes, I will can join.', ru: '(с ошибкой)', bad: true, better: "Yes, I'll be able to join.", fb: 'Will + can нельзя → will be able to.', react: [{ en: 'Great — so you’ll be able to join. Perfect.', ru: 'Отлично — значит, сможешь присоединиться. Идеально.' }] },
        ] },
      c: { msgs: [{ en: 'Perfect. Stay safe, and drink some coffee from a mug that survived 🙂', ru: 'Отлично. Береги себя и выпей кофе из уцелевшей кружки.' }], end: true },
    },
  },
  {
    id: 'marcus4', who: 'marcus', unlock: 'w4l6', title: 'Чикаго против Комптона', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'heard u in compton 👀', ru: 'слышал, ты в Комптоне' }, { en: "don't let them convince u west coast did it better. u wish u had stayed in chicago fr", ru: 'не дай им убедить тебя, что Запад сделал лучше. ты же жалеешь, что не остался в Чикаго' }], expect: { t: 'pastperf', ex: 'I wish you had been here to see it.' },
        replies: [
          { en: "Honestly, I wish you'd been here. You would've loved it.", ru: 'Честно, жаль, что тебя тут не было. Тебе бы понравилось.', kw: ['wish', "you'd been", 'had been', 'loved', 'here'], go: 'b' },
          { en: 'I wish you are here.', ru: '(с ошибкой)', bad: true, better: 'I wish you were here.', fb: 'wish о настоящем → Past: I wish you were here.', react: [{ en: "u wish I WERE there? aight that's lowkey sweet 😂", ru: 'жаль, что меня там нет? ладно, это мило' }] },
        ] },
      b: { msgs: [{ en: 'aight aight. but who did it first, chicago or LA?', ru: 'ладно-ладно. но кто был первым — Чикаго или LA?' }],
        replies: [
          { en: "Different things. Gangsta rap was born here, drill was born in Chicago. Everybody wins.", ru: 'Разные вещи. Гангста-рэп родился здесь, дрилл — в Чикаго. Все в выигрыше.', kw: ['born', 'both', 'different', 'drill', 'gangsta', 'wins'], go: 'c' },
          { en: 'If I had to choose, I’d choose Chicago.', ru: 'Если бы пришлось выбирать — выбрал бы Чикаго.', kw: ['if', 'had to', 'choose', 'chicago', "i'd"], go: 'c2' },
        ] },
      c: { msgs: [{ en: 'diplomatic 😂 ok u can stay', ru: 'дипломатично. ладно, можешь остаться' }], end: true },
      c2: { msgs: [{ en: "THAT's my guy 🙌 screenshotting this for Jay", ru: 'ВОТ мой человек. делаю скрин для Джея' }], end: true },
    },
  },
  {
    id: 'jay5', who: 'jay', unlock: 'w4l7', title: 'Возвращение домой', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'yo the block is ready for u 🏠', ru: 'йоу, район готов к твоему возвращению' }, { en: "if u had to pick one city out of all 4, which one? and don't say LA 😤", ru: 'если бы пришлось выбрать один город из всех четырёх — какой? и не говори LA' }], expect: { t: 'cont', ex: "If I had to pick, I'd pick Brooklyn." },
        replies: [
          { en: "If I had to pick one, I'd pick Brooklyn. That's home.", ru: 'Если бы пришлось выбрать один — выбрал бы Бруклин. Это дом.', kw: ['if', 'had to', 'pick', 'brooklyn', "i'd", 'home', 'new york'], go: 'b' },
          { en: 'If I have to pick, I pick LA.', ru: '(не то время, и обидно 😂)', bad: true, better: "If I had to pick, I'd pick… Brooklyn, obviously.", fb: 'Воображаемая ситуация → If I had to pick, I’d pick. И не зли Джея.', react: [{ en: "LA??? 💔 also it's \"if I HAD to pick, I'D pick\" — u owe me", ru: 'LA??? кстати правильно «if I had to pick, I’d pick» — ты мне должен' }] },
        ] },
      b: { msgs: [{ en: "that's what I wanted to hear 🤝", ru: 'вот что я хотел услышать' }, { en: "real talk tho. ur english is crazy now. remember when u said 'I am agree'?", ru: 'если серьёзно. твой английский сейчас огонь. помнишь, ты говорил «I am agree»?' }],
        replies: [
          { en: "Don't remind me. If it weren't for you guys, I'd still be saying it.", ru: 'Не напоминай. Если бы не вы, я бы до сих пор так говорил.', kw: ["weren't", 'if', 'remind', 'still', 'guys', 'you'], go: 'c' },
          { en: "I've come a long way, huh?", ru: 'Я прошёл большой путь, да?', kw: ['come a long way', 'long way', 'huh', 'progress'], go: 'c' },
        ] },
      c: { msgs: [{ en: "facts. welcome home, bro. next chapter starts now 🔥", ru: 'факт. с возвращением, бро. следующая глава начинается сейчас' }], end: true },
    },
  },
];

export const SMALLTALK3 = {
  keisha: {
    greet: [{ en: "heyyy what's up New York 💅", ru: 'приве-ет, как дела, Нью-Йорк' }],
    how: [{ en: "blessed and busy! editing all day lol", ru: 'всё отлично и много дел! монтирую весь день, лол' }],
    doing: [{ en: 'shooting content, as always 📸', ru: 'снимаю контент, как всегда' }],
    thanks: [{ en: 'anytime boo', ru: 'обращайся, дорогой' }],
    laugh: [{ en: '😂😂', ru: '' }],
    bye: [{ en: 'talk soon! 💕', ru: 'на связи!' }],
    unknown: [{ en: "wait what 😂 say that again", ru: 'подожди, что? повтори' }],
  },
  zoe: {
    greet: [{ en: 'hey! 🌞', ru: 'привет!' }],
    how: [{ en: "good! editing my doc and drinking way too much coffee", ru: 'хорошо! монтирую фильм и пью слишком много кофе' }],
    doing: [{ en: 'at the beach looking for the perfect shot 🎬', ru: 'на пляже, ищу идеальный кадр' }],
    thanks: [{ en: 'of course!', ru: 'конечно!' }],
    laugh: [{ en: 'hahaha', ru: '' }],
    bye: [{ en: 'later! 🌊', ru: 'пока!' }],
    unknown: [{ en: "hmm I didn't quite get that 😅", ru: 'хм, не совсем поняла' }],
  },
};
