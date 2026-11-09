// Messenger scenarios. A node: msgs (incoming, each {en, ru}), replies [{en, ru, kw, go, fb}], end.
// Typed answers are matched by keywords (kw): the reply with the most hits wins.
// fb = coach note shown under your message (business tone, etc.).
import { SCEN2 } from './chats2.js';
import { SCEN3, SMALLTALK3 } from './chats3.js';
import { SCEN4 } from './chats4.js';
export const SCENARIOS = [
  {
    id: 'jay0', who: 'jay', unlock: 'start', title: 'Новый сосед', start: 'a',
    nodes: {
      a: { msgs: [{ en: "yo, heard somebody's moving into 3B. that you?", ru: 'йоу, слышал, кто-то въезжает в 3B. это ты?' }, { en: 'the landlord gave me ur number in case u get locked out lol', ru: 'хозяин дал мне твой номер, на случай если ты захлопнешь дверь, лол' }],
        replies: [
          { en: "Yeah, that's me! I'm moving in tomorrow. Thanks for reaching out.", ru: 'Да, это я! Въезжаю завтра. Спасибо, что написал.', kw: ['yes', 'yeah', "that's me", 'me', 'moving', 'tomorrow', 'thanks', 'reaching out'], go: 'b' },
          { en: 'Yes, I am move tomorrow.', ru: '(с ошибкой)', bad: true, better: "Yeah, I'm moving in tomorrow.", fb: 'Перед глаголом am не ставим. Про планы — Present Continuous: I’m moving in tomorrow.', react: [{ en: 'u… am move? 😂 u mean ur moving in?', ru: 'ты… «am move»? в смысле, въезжаешь?' }] },
          { en: 'Who gave you my number?!', ru: 'Кто дал тебе мой номер?!', kw: ['who', 'number', 'gave'], go: 'b2' },
        ] },
      b2: { msgs: [{ en: 'chill 😂 the landlord, mr. Russo. I live right next door', ru: 'спокойно, хозяин, мистер Руссо. я живу прямо по соседству' }], next: 'b' },
      b: { msgs: [{ en: "bet. heads up: the buzzer's busted, so just hit me up when u get here and I'll let u in", ru: 'ок. предупреждаю: домофон сломан, так что напиши, когда приедешь, и я тебя впущу' }],
        replies: [
          { en: "That'd be great, I appreciate it. I'll text you when I get there.", ru: 'Было бы здорово, ценю. Напишу, когда доберусь.', kw: ['great', 'appreciate', 'text', 'thanks', 'thank', 'will', "i'll", 'when', 'ok', 'okay', 'sure'], go: 'c' },
          { en: 'What does "busted" mean?', ru: 'Что значит «busted»?', kw: ['busted', 'mean', 'what'], go: 'bust' },
        ] },
      bust: { msgs: [{ en: 'busted = broken, not working. "my phone is busted" 📱💀', ru: 'busted = сломан, не работает. «у меня телефон сдох»' }],
        replies: [{ en: "Got it. I'll text you when I get there, then.", ru: 'Понял. Тогда напишу, когда доберусь.', kw: ['got it', 'ok', 'okay', 'text', 'will', "i'll", 'thanks'], go: 'c' }] },
      c: { msgs: [{ en: "bet 🤝 welcome to the block", ru: 'договорились. добро пожаловать на район' }], end: true },
    },
  },
  {
    id: 'liam1', who: 'liam', unlock: 'w1l1', title: 'Знакомство в группе', start: 'a',
    nodes: {
      a: { msgs: [{ en: "Hiya! It's Liam from Intro to Marketing 👋", ru: 'Привет! Это Лиам с «Введения в маркетинг».' }, { en: "Got your number from the group chat. Hope that's alright?", ru: 'Взял твой номер из общего чата. Надеюсь, это нормально?' }],
        replies: [
          { en: 'Hey Liam! Of course, no problem.', ru: 'Привет, Лиам! Конечно, без проблем.', kw: ['hey', 'hi', 'hello', 'of course', 'sure', 'no problem', 'yes', 'yeah', 'alright', 'okay', 'ok', 'fine'], go: 'b' },
          { en: 'Who is this?', ru: 'Кто это?', kw: ['who'], go: 'a2' },
          { en: 'Who are you? Why you write me?', ru: '(грубо и с ошибкой)', bad: true, better: "Sorry, who's this?", fb: 'Звучит грубо и с ошибкой. Вежливо: «Sorry, who’s this?» Вопрос: Why are you writing to me?', react: [{ en: "Blimey, bit harsh! 😅 It's Liam, from class.", ru: 'Ничего себе, резковато! Это Лиам, с пар.' }] },
        ] },
      a2: { msgs: [{ en: 'Haha, fair. Liam! British guy, sits at the back, always late? 😅', ru: 'Ха-ха, справедливо. Лиам! Британец, сидит сзади, вечно опаздывает?' }],
        replies: [{ en: 'Oh right! Hey Liam!', ru: 'А, точно! Привет, Лиам!', kw: ['oh', 'right', 'hey', 'hi', 'remember', 'yes', 'yeah', 'ok'], go: 'b' }] },
      b: { msgs: [{ en: 'Brilliant. So, are you settling in okay? New York can be a bit much at first.', ru: 'Отлично. Ну что, обживаешься? Нью-Йорк поначалу может быть «слишком».' }],
        replies: [
          { en: "Yeah, I'm settling in. It's crazy, but I love it.", ru: 'Да, обживаюсь. Тут безумно, но мне нравится.', kw: ['love', 'like', 'good', 'great', 'fine', 'okay', 'ok', 'settling', 'crazy', 'cool', 'yes', 'yeah'], go: 'c' },
          { en: 'Not really. Everything is so expensive!', ru: 'Не очень. Всё такое дорогое!', kw: ['expensive', 'money', 'price', 'not really', 'hard', 'difficult', 'bad', 'tired', 'no'], go: 'c2' },
        ] },
      c: { msgs: [{ en: "Same here, mate. Fancy a coffee before class tomorrow? There's a decent place in Williamsburg.", ru: 'У меня так же, дружище. Хочешь кофе завтра перед парой? В Уильямсбурге есть неплохое место.' }], replies: 'coffee' },
      c2: { msgs: [{ en: 'Tell me about it. I paid nine dollars for a sandwich yesterday. Mental. 😂', ru: 'И не говори. Вчера отдал девять долларов за сэндвич. Безумие.' }, { en: 'Fancy a coffee before class tomorrow? My treat.', ru: 'Хочешь кофе завтра перед парой? Я угощаю.' }], replies: 'coffee' },
      d: { msgs: [{ en: "Let's say 8:15? I'll send you the address.", ru: 'Скажем, в 8:15? Скину адрес.' }, { en: 'Cheers! See you tomorrow 👍', ru: 'Спасибо! До завтра.' }], end: true },
      d2: { msgs: [{ en: 'No worries! Another day then. Cheers, mate 👍', ru: 'Без проблем! Тогда в другой раз. Давай, дружище.' }], end: true },
    },
    sets: {
      coffee: [
        { en: 'Sure! What time?', ru: 'Конечно! Во сколько?', kw: ['sure', 'yes', 'yeah', 'ok', 'okay', 'what time', 'when', 'down', 'sounds good', 'deal', 'great', 'love to'], go: 'd' },
        { en: "Sorry, I can't tomorrow.", ru: 'Извини, завтра не могу.', kw: ["can't", 'cannot', 'busy', 'sorry', 'no', 'not'], go: 'd2' },
      ],
    },
  },
  {
    id: 'jay1', who: 'jay', unlock: 'w1l1', title: 'Сосед', start: 'a',
    nodes: {
      a: { msgs: [{ en: "yo it's Jay from next door 👋", ru: 'йоу, это Джей, сосед' }, { en: 'u good? need anything for the apartment?', ru: 'ты как? нужно что-нибудь для квартиры?' }],
        replies: [
          { en: "Hey Jay! What's the wifi password? 😅", ru: 'Привет, Джей! Какой пароль от вайфая?', kw: ['wifi', 'wi-fi', 'internet', 'password'], go: 'wifi' },
          { en: 'Where can I buy groceries around here?', ru: 'Где тут можно купить продукты?', kw: ['buy', 'groceries', 'food', 'store', 'shop', 'supermarket', 'where', 'eat'], go: 'food' },
          { en: "I'm good, thanks!", ru: 'Всё хорошо, спасибо!', kw: ['good', 'fine', 'ok', 'okay', 'thanks', 'thank', 'nothing', 'no', 'great'], go: 'good' },
        ] },
      wifi: { msgs: [{ en: 'lmaooo u for real? 😂', ru: 'ахаха, ты серьёзно?' }, { en: "nah I'm playing. it's BrooklynVibes, all one word", ru: 'да шучу. пароль BrooklynVibes, одним словом' }, { en: "don't tell the landlord", ru: 'только хозяину не говори' }],
        replies: [{ en: 'Haha, thanks, man!', ru: 'Ха-ха, спасибо, чувак!', kw: ['thanks', 'thank', 'ty', 'cool', 'haha', 'lol', 'ok', 'okay', 'won\'t'], go: 'plans' }] },
      food: { msgs: [{ en: "there's a bodega on the corner. open 24/7", ru: 'на углу есть бодега. открыта круглосуточно' }, { en: 'ask for a chopped cheese. trust me 🙏', ru: 'попроси чопд чиз. поверь мне' }],
        replies: [
          { en: "What's a chopped cheese?", ru: 'Что такое «чопд чиз»?', kw: ['what', 'chopped', 'cheese', 'mean', '?'], go: 'cheese' },
          { en: "Okay, I'll try it!", ru: 'Окей, попробую!', kw: ['ok', 'okay', 'try', 'will', 'cool', 'thanks', 'bet', 'sure'], go: 'plans' },
        ] },
      cheese: { msgs: [{ en: "bro. it's a sandwich. beef, cheese, onions. it's a NYC thing", ru: 'бро. это сэндвич. говядина, сыр, лук. чисто нью-йоркская тема' }, { en: 'and the bodega cat is free 🐈', ru: 'а кот в бодеге — бесплатно' }],
        replies: [{ en: "Haha, okay, I'll try it.", ru: 'Ха-ха, ладно, попробую.', kw: ['ok', 'okay', 'try', 'haha', 'lol', 'cool', 'bet', 'will'], go: 'plans' }] },
      good: { msgs: [{ en: 'bet bet', ru: 'ок, ок' }], next: 'plans' },
      plans: { expect: { t: 'present', ex: 'I usually hit the gym on Saturdays.' }, msgs: [{ en: 'yo what do u usually do on weekends?', ru: 'слушай, а что ты обычно делаешь по выходным?' }],
        replies: [
          { en: 'I am usually go to the gym.', ru: '(с ошибкой)', bad: true, better: 'I usually go to the gym.', fb: 'В Present Simple нет am перед глаголом: I usually go…', react: [{ en: 'u am go? 😂 u mean u usually go?', ru: '«am go»? в смысле, обычно ходишь?' }] },
          { en: 'I usually hit the gym and catch up on shows I missed.', ru: 'Обычно хожу в зал и досматриваю сериалы, которые пропустил.', kw: ['usually', 'gym', 'movies', 'watch', 'play', 'sleep', 'read', 'go', 'meet', 'chill', 'study', 'walk', 'listen'], go: 'wk' },
          { en: "I don't know yet. I'm new here.", ru: 'Пока не знаю. Я тут новенький.', kw: ['know', 'idk', 'new', 'nothing', 'not sure'], go: 'wk2' },
        ] },
      wk: { msgs: [{ en: 'nice nice. I usually make beats all weekend lol', ru: 'неплохо. я обычно все выходные пишу биты, лол' }, { en: "this saturday I'm doing a little rooftop thing. u should come thru", ru: 'в эту субботу устраиваю небольшую тусу на крыше. приходи' }], replies: 'party' },
      wk2: { msgs: [{ en: "no worries, I'll show u around", ru: 'не парься, я тебе всё покажу' }, { en: "this saturday I'm doing a little rooftop thing. u should come thru", ru: 'в эту субботу устраиваю небольшую тусу на крыше. приходи' }], replies: 'party' },
      end1: { msgs: [{ en: 'around 10. bring snacks or whatever 🔥', ru: 'часов в 10. принеси закуски или что-нибудь' }, { en: 'hmu if u need anything', ru: 'пиши, если что-то понадобится' }], end: true },
      end2: { msgs: [{ en: 'bet. no pressure. hmu', ru: 'договорились. без давления. пиши' }], end: true },
    },
    sets: {
      party: [
        { en: "I'm down! What time?", ru: 'Я в деле! Во сколько?', kw: ['down', 'yes', 'sure', 'ok', 'okay', 'come', 'time', 'when', 'bet', 'cool', 'deal', 'sounds', 'yeah'], go: 'end1' },
        { en: "Maybe. I'll let you know.", ru: 'Может быть. Дам знать.', kw: ['maybe', 'let you know', 'not sure', 'see', 'busy', "can't", 'later'], go: 'end2' },
      ],
    },
  },
  {
    id: 'liam2', who: 'liam', unlock: 'w1l2', title: 'После кофейни', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'Mate, I still can’t believe you nearly paid twenty percent for an iced latte 😂', ru: 'Дружище, до сих пор не верю, что ты чуть не отдал двадцать процентов за латте со льдом.' }, { en: "How's the bank account doing?", ru: 'Как там твой банковский счёт?' }],
        replies: [
          { en: "Don't laugh! I'm still getting used to it.", ru: 'Не смейся! Я ещё привыкаю.', kw: ['laugh', 'still', 'getting used', 'used to', 'haha', 'lol', 'funny'], go: 'b' },
          { en: "It's fine. Everything is expensive here.", ru: 'Нормально. Тут всё дорогое.', kw: ['fine', 'expensive', 'money', 'broke', 'okay', 'ok', 'poor', 'skint', 'bad'], go: 'b2' },
        ] },
      b: { msgs: [{ en: "Fair enough. Took me a month too. In London we don't really tip for coffee, innit.", ru: 'Справедливо. Мне тоже понадобился месяц. В Лондоне за кофе особо не дают чаевых, ага.' }], replies: 'next' },
      b2: { msgs: [{ en: "Tell me about it. I'm proper skint this week 😅", ru: 'И не говори. Я на этой неделе вообще на мели.' }, { en: "In London we don't really tip for coffee, innit.", ru: 'В Лондоне за кофе особо не дают чаевых, ага.' }], replies: 'next' },
      innit: { msgs: [{ en: "Haha. It's short for \"isn't it\". Like, \"Cold today, innit?\" Very London.", ru: 'Ха-ха. Это сокращение от «isn’t it». Типа: «Холодно сегодня, да?» Очень по-лондонски.' }],
        replies: [{ en: 'Got it! So what are you doing this weekend?', ru: 'Понял! А что ты делаешь на выходных?', kw: ['got it', 'ok', 'okay', 'cool', 'weekend', 'doing', 'plans'], go: 'wkd' }] },
      wkd: { expect: { t: 'cont', ex: "I'm working on Saturday, but I'm free on Sunday." }, msgs: [{ en: "Watching the football at a pub. Proper football, not the American one 😤", ru: 'Смотрю футбол в пабе. Настоящий футбол, не американский.' }, { en: 'Are you working this weekend, or are you free?', ru: 'Ты работаешь в эти выходные или свободен?' }],
        replies: [
          { en: "I'm working on Saturday, but I'm free on Sunday.", ru: 'В субботу работаю, а в воскресенье свободен.', kw: ['working', 'work', 'sunday', 'saturday', 'busy', 'but'], go: 'fin' },
          { en: 'I will working on Saturday.', ru: '(с ошибкой)', bad: true, better: "I'm working on Saturday.", fb: 'Либо will work, либо (лучше для планов) I’m working. «Will working» не бывает.', react: [{ en: "Will working? 😄 You mean you're working Saturday?", ru: '«Will working»? В смысле, ты работаешь в субботу?' }] },
          { en: "I'm free! Can I come?", ru: 'Я свободен! Можно с тобой?', kw: ['free', 'come', 'join', 'yes', 'sure', 'nothing', 'can i'], go: 'fin' },
        ] },
      fin: { msgs: [{ en: "Sorted. There's a match on Sunday too. Come along! Soda for you though, you're not 21 yet 😂", ru: 'Решено. В воскресенье тоже есть матч. Приходи! Но тебе газировка — тебе ещё нет 21.' }, { en: "Right, I'm knackered. Laters! 👋", ru: 'Всё, я без сил. Пока!' }], end: true },
    },
    sets: {
      next: [
        { en: 'What does "innit" mean?', ru: 'Что значит «innit»?', kw: ['innit', 'mean', 'meaning', 'what does'], go: 'innit' },
        { en: 'What are you doing this weekend?', ru: 'Что делаешь на выходных?', kw: ['weekend', 'doing', 'plans', 'saturday', 'sunday', 'what are you'], go: 'wkd' },
      ],
    },
  },
  {
    id: 'ty1', who: 'ty', unlock: 'w1l3', title: 'Эссе', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'yo max 📚', ru: 'йоу, макс' }, { en: 'did u start the essay yet?', ru: 'ты уже начал эссе?' }],
        replies: [
          { en: 'Yeah, I started it last night.', ru: 'Да, начал вчера вечером.', kw: ['yes', 'yeah', 'started', 'yep', 'did', 'last night'], go: 'b' },
          { en: 'Yes, I did started it yesterday.', ru: '(с ошибкой)', bad: true, better: 'Yes, I started it yesterday.', fb: 'Did + started — двойное прошедшее. Либо I started, либо (для акцента) I did start.', react: [{ en: 'did started? 😂 bro u mean u started it', ru: '«did started»? бро, ты имеешь в виду, что начал' }] },
          { en: "No, I didn't have time.", ru: 'Нет, у меня не было времени.', kw: ['no', "didn't", 'not', 'time', 'nah', "haven't", 'did not'], go: 'b2' },
        ] },
      b: { msgs: [{ en: 'look at u go 🔥 how many words did u write?', ru: 'ну ты даёшь! сколько слов написал?' }],
        replies: [
          { en: 'I wrote about 300 words.', ru: 'Написал около 300 слов.', kw: ['wrote', 'words', 'about', 'half', 'page', '100', '200', '300', '400', '500'], go: 'c' },
          { en: 'Not many, haha.', ru: 'Немного, ха-ха.', kw: ['not many', 'few', 'little', 'haha', 'lol', 'not much'], go: 'c' },
        ] },
      b2: { expect: { t: 'past', ex: 'I binge-watched a show and slept in.' }, msgs: [{ en: 'bruh 😂 what did u do all weekend then?', ru: 'бро, а что ты тогда делал все выходные?' }],
        replies: [
          { en: 'I binge-watched a show and slept in.', ru: 'Запоем смотрел сериал и отсыпался.', kw: ['watched', 'slept', 'netflix', 'played', 'did', 'saw', 'met', 'walked', 'sleep', 'movie'], go: 'c2' },
          { en: 'I went to Manhattan with Jay.', ru: 'Ездил на Манхэттен с Джеем.', kw: ['went', 'manhattan', 'jay', 'visited', 'city'], go: 'c2' },
        ] },
      c: { msgs: [{ en: 'solid. I wrote like 100 lol. practice ran long', ru: 'нормально. я написал где-то 100, лол. тренировка затянулась' }, { en: 'ok we gotta lock in. library tomorrow after practice?', ru: 'короче, надо собраться. библиотека завтра после тренировки?' }], replies: 'lib' },
      c2: { msgs: [{ en: 'sounds like a good weekend ngl 😂', ru: 'звучит как хорошие выходные, честно' }, { en: 'ok we gotta lock in. library tomorrow after practice?', ru: 'короче, надо собраться. библиотека завтра после тренировки?' }], replies: 'lib' },
      lock: { msgs: [{ en: 'lock in = focus 100%. no phone, no tiktok. just work 💪', ru: 'lock in = сосредоточиться на 100%. без телефона, без тиктока. только работа' }],
        replies: [{ en: "Okay, let's lock in!", ru: 'Окей, собираемся!', kw: ['ok', 'okay', 'lock', "let's", 'bet', 'sure', 'yes'], go: 'd' }] },
      d: { msgs: [{ en: "bet. 6pm, second floor. bring snacks, the librarian is chill lol", ru: 'договорились. в 18:00, второй этаж. бери перекус, библиотекарша нормальная' }], end: true },
    },
    sets: {
      lib: [
        { en: 'Bet, see you there!', ru: 'Договорились, увидимся там!', kw: ['bet', 'yes', 'ok', 'okay', 'sure', 'see', 'deal', 'down', 'cool', 'yeah'], go: 'd' },
        { en: 'What does "lock in" mean?', ru: 'Что значит «lock in»?', kw: ['lock in', 'mean', 'what'], go: 'lock' },
      ],
    },
  },
  {
    id: 'ty2', who: 'ty', unlock: 'w1l4', title: 'После дня ног', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'how r the legs bro 😂😂', ru: 'как ноги, бро' }],
        replies: [
          { en: "I can't walk! I've never felt this bad.", ru: 'Я не могу ходить! Мне никогда не было так плохо.', kw: ["can't", 'walk', 'never', 'bad', 'pain', 'hurt', 'dead', 'terrible', 'die', 'cannot'], go: 'b' },
          { en: "They're okay. I've felt worse.", ru: 'Нормально. Бывало и хуже.', kw: ['okay', 'ok', 'fine', 'good', 'worse', 'alright'], go: 'b2' },
        ] },
      b: { expect: { t: 'perfect', ex: "Yes, I've already stretched." }, msgs: [{ en: "LMAO that's DOMS. it means ur muscles r growing 💪", ru: 'ахаха, это крепатура. значит, мышцы растут' }, { en: 'have u stretched today?', ru: 'ты сегодня растягивался?' }], replies: 'stretch' },
      b2: { msgs: [{ en: 'liar 😂 nobody feels okay after my leg day', ru: 'врёшь. после моего дня ног никто не чувствует себя нормально' }, { en: 'have u stretched today?', ru: 'ты сегодня растягивался?' }], replies: 'stretch' },
      c: { msgs: [{ en: 'good. u learn fast', ru: 'красава. быстро учишься' }], replies: 'thanks' },
      c2: { msgs: [{ en: '10 min of stretching and a long walk. trust me', ru: '10 минут растяжки и долгая прогулка. поверь' }], replies: 'thanks' },
      e: { msgs: [{ en: 'haha. same time next week?? 😈', ru: 'ха-ха. в то же время на следующей неделе?' }],
        replies: [
          { en: 'Never again!', ru: 'Больше никогда!', kw: ['never', 'no', 'nah', 'again'], go: 'f1' },
          { en: "Okay, I'm in.", ru: 'Ладно, я в деле.', kw: ['ok', 'okay', 'in', 'yes', 'sure', 'bet', 'down', 'yeah'], go: 'f2' },
        ] },
      f1: { msgs: [{ en: "u said never but u'll be back 😂 everyone comes back", ru: 'ты сказал «никогда», но ты вернёшься. все возвращаются' }], end: true },
      f2: { msgs: [{ en: "that's my guy 💪 see u monday", ru: 'вот это мой человек. до понедельника' }], end: true },
    },
    sets: {
      stretch: [
        { en: "Yes, I've already stretched.", ru: 'Да, я уже растянулся.', kw: ['yes', 'yeah', 'already', 'stretched', 'did', 'have'], go: 'c' },
        { en: 'Yes, I have stretched yesterday.', ru: '(с ошибкой)', bad: true, better: 'Yes, I stretched yesterday. / Yes, I’ve already stretched.', fb: 'С yesterday — только Past Simple. Present Perfect — без точного времени: I’ve already stretched.', react: [{ en: 'today or yesterday bro? 😂', ru: 'сегодня или вчера, бро?' }] },
        { en: 'Not yet. What should I do?', ru: 'Ещё нет. Что мне делать?', kw: ['not yet', 'no', "haven't", 'what', 'should', 'how'], go: 'c2' },
      ],
      thanks: [{ en: 'Thanks, coach! 😂', ru: 'Спасибо, тренер!', kw: ['thanks', 'thank', 'coach', 'ok', 'okay', 'bet', 'cool', 'will'], go: 'e' }],
    },
  },
  {
    id: 'maya1', who: 'maya', unlock: 'w1l5', title: 'Созвон в 3', start: 'a', formal: true,
    nodes: {
      a: { msgs: [{ en: 'Hi Max! Got your intro email. Great job, the team loved it 👏', ru: 'Привет, Макс! Получила твоё письмо-знакомство. Отлично, команде понравилось.' }, { en: "Quick question: are you free for a call at 3 pm today? I'd like to go over the research plan.", ru: 'Короткий вопрос: ты свободен для созвона сегодня в 15:00? Хочу обсудить план исследования.' }],
        replies: [
          { en: 'Hi Maya, thank you! Yes, 3 pm works for me.', ru: 'Привет, Майя, спасибо! Да, 15:00 мне подходит.', kw: ['works', 'yes', 'free', 'sure', 'sounds good', '3', 'three', 'ok', 'okay', 'of course', 'thank'], go: 'b', fb: 'Отлично: вежливо и по делу. «works for me» — естественная деловая фраза.' },
          { en: 'yeah sure lol', ru: 'ага, конечно, лол', kw: ['lol', 'yeah sure', 'ya', 'yep', 'k'], go: 'b_inf', fb: 'Слишком неформально для наставницы на работе. Лучше: «Sure, 3 pm works for me.»' },
          { en: 'Give me the plan first.', ru: '(слишком резко)', bad: true, better: 'Sure! Could you send me the plan beforehand?', fb: 'Повелительное наклонение звучит как приказ начальнику. Нужно could / would you mind.', react: [{ en: 'Oh… sure 🙂 Just a tip: "Could you send me the plan?" sounds a bit friendlier.', ru: 'О… конечно. Совет: «Could you send me the plan?» звучит дружелюбнее.' }] },
          { en: 'Sorry, I have a class at 3. Could we do 4 instead?', ru: 'Извини, у меня пара в 3. Можем в 4?', kw: ['class', 'busy', "can't", 'cannot', 'instead', '4', 'four', 'later', 'another time', 'could we'], go: 'b2', fb: 'Хорошо: извинение + альтернатива. «Could we do 4 instead?» — идеальная формула.' },
        ] },
      b: { msgs: [{ en: "Perfect, I'll send you a calendar invite.", ru: 'Отлично, отправлю приглашение в календарь.' }, { en: 'Before the call, could you prepare a list of three competitors?', ru: 'До созвона не мог бы ты подготовить список из трёх конкурентов?' }], replies: 'prep' },
      b_inf: { msgs: [{ en: "Haha, perfect 🙂 Small tip: with clients, let's keep it a bit more formal. With me it's fine!", ru: 'Ха-ха, отлично. Маленький совет: с клиентами давай чуть официальнее. Со мной — нормально!' }, { en: 'Could you prepare a list of three competitors before the call?', ru: 'Не мог бы ты подготовить список из трёх конкурентов до созвона?' }], replies: 'prep' },
      b2: { msgs: [{ en: 'Of course! 4 pm it is. Thanks for letting me know.', ru: 'Конечно! Тогда в 16:00. Спасибо, что предупредил.' }, { en: 'Could you prepare a list of three competitors before the call?', ru: 'Не мог бы ты подготовить список из трёх конкурентов до созвона?' }], replies: 'prep' },
      c: { msgs: [{ en: 'Thank you! Talk soon.', ru: 'Спасибо! До связи.' }], end: true },
      c2: { msgs: [{ en: 'Good question! Pick brands that sell to Gen Z. Think Nike, Vans or New Balance.', ru: 'Хороший вопрос! Выбери бренды, которые продают поколению Z. Например, Nike, Vans или New Balance.' }, { en: 'Talk soon!', ru: 'До связи!' }], end: true },
    },
    sets: {
      prep: [
        { en: "Sure, I'll have it ready by 3.", ru: 'Конечно, подготовлю к трём.', kw: ['sure', 'ready', 'will', "i'll", 'by', 'of course', 'no problem', 'yes', 'ok', 'okay'], go: 'c', fb: 'I’ll + by 3 — обещание со сроком. Звучит надёжно.' },
        { en: 'Which competitors should I choose?', ru: 'Каких конкурентов мне выбрать?', kw: ['which', 'what', 'should', 'choose', 'who', 'pick'], go: 'c2', fb: 'Уточняющий вопрос — это нормально и профессионально.' },
      ],
    },
  },
  {
    id: 'diego1', who: 'diego', unlock: 'w1l6', title: 'После вечеринки', start: 'a',
    nodes: {
      a: { msgs: [{ en: 'duuude that party was lit 🔥🔥', ru: 'чуваааак, вечеринка была огонь' }, { en: 'did u get home ok?', ru: 'нормально добрался домой?' }],
        replies: [
          { en: 'Yeah, I got home at 2. It was so much fun!', ru: 'Да, дома был в 2. Было очень весело!', kw: ['yes', 'yeah', 'got home', 'home', 'fun', 'great', 'ok', 'okay', 'fine'], go: 'b' },
          { en: 'Barely 😂 I took the wrong train.', ru: 'Еле-еле. Сел не на тот поезд.', kw: ['barely', 'wrong', 'lost', 'train', 'subway', 'no', 'not'], go: 'b2' },
        ] },
      b: { msgs: [{ en: 'stoked u had fun bro. u danced too, I saw it 👀', ru: 'рад, что тебе было весело, бро. ты ещё и танцевал, я видел' }], replies: 'next' },
      b2: { msgs: [{ en: 'lmaooo classic NYC subway move 😂 the subway is gnarly, I told u', ru: 'ахаха, классика нью-йоркского метро. метро — жесть, я же говорил' }], replies: 'next' },
      word: { msgs: [{ en: 'haha stoked = super happy, excited. gnarly = intense, crazy. very california 🌴', ru: 'ха-ха, stoked = очень рад, в восторге. gnarly = жёсткий, безумный. очень по-калифорнийски' }],
        replies: [{ en: 'Got it, dude! When are you going back to LA?', ru: 'Понял, чувак! Когда ты возвращаешься в Лос-Анджелес?', kw: ['got it', 'ok', 'okay', 'when', 'back', 'cool', 'thanks'], go: 'c' }] },
      c: { msgs: [{ en: "flying back on sunday 😢", ru: 'улетаю в воскресенье' }, { en: "yo u should come visit LA next summer. I'll teach u how to skate", ru: 'слушай, приезжай в Лос-Анджелес следующим летом. научу тебя кататься на скейте' }],
        replies: [
          { en: "That would be awesome! I'd love to.", ru: 'Было бы круто! С удовольствием.', kw: ['awesome', 'love', 'yes', 'sure', 'would', 'cool', 'great', 'down', 'definitely', 'yeah'], go: 'd' },
          { en: 'I will can come next summer!', ru: '(с ошибкой)', bad: true, better: "I'll be able to come next summer!", fb: 'Will + can нельзя. Будущее от can — will be able to.', react: [{ en: 'will can? 😂 dude u mean u can come?', ru: '«will can»? чувак, ты имеешь в виду, что сможешь приехать?' }] },
          { en: "I can't skate, I'll fall!", ru: 'Я не умею кататься, я упаду!', kw: ["can't", 'fall', 'scared', 'afraid', 'skate', 'no', 'cannot'], go: 'd2' },
        ] },
      d: { msgs: [{ en: "let's goooo 🛹 it's a plan", ru: 'погнали! решено' }, { en: 'ok gotta pack. see u around dude 🤙', ru: 'всё, надо собирать вещи. ещё увидимся, чувак' }], end: true },
      d2: { msgs: [{ en: "everybody falls dude. that's how u learn 😂", ru: 'все падают, чувак. так и учатся' }, { en: "u can do it. it's a plan 🤙", ru: 'у тебя получится. решено' }], end: true },
    },
    sets: {
      next: [
        { en: 'When are you going back to LA?', ru: 'Когда ты возвращаешься в Лос-Анджелес?', kw: ['when', 'back', 'la', 'leave', 'going back', 'flight', 'fly'], go: 'c' },
        { en: 'What do "stoked" and "gnarly" mean?', ru: 'Что значат «stoked» и «gnarly»?', kw: ['stoked', 'gnarly', 'mean', 'what does', 'what do'], go: 'word' },
      ],
    },
  },
  {
    id: 'jay2', who: 'jay', unlock: 'w1l7', title: 'Open mic', start: 'a',
    nodes: {
      a: { expect: { t: 'future', ex: "I'm in! But I'm not going to rap." }, msgs: [{ en: 'yo 🎤', ru: 'йоу' }, { en: 'open mic next saturday. u in or u scared? 😂', ru: 'открытый микрофон в следующую субботу. ты в деле или боишься?' }],
        replies: [
          { en: "I'm in! But I'm not going to rap.", ru: 'Я в деле! Но читать рэп не буду.', kw: ['in', 'yes', 'down', 'sure', "i'm in", 'not going', "won't", 'bet'], go: 'b' },
          { en: "What's an open mic?", ru: 'Что такое open mic?', kw: ['what', 'open mic', 'mean'], go: 'om' },
          { en: 'I will to come!', ru: '(с ошибкой)', bad: true, better: "I'll come!", fb: 'После will — глагол без to: I’ll come.', react: [{ en: 'will to? 😂 ok I take that as a yes', ru: '«will to»? ладно, считаю, что это «да»' }] },
          { en: "I'm a bit scared, ngl.", ru: 'Честно, мне немного страшно.', kw: ['scared', 'afraid', 'nervous', 'ngl', 'scary'], go: 'sc' },
        ] },
      om: { msgs: [{ en: 'anyone can go on stage and perform. rap, poetry, comedy, whatever', ru: 'любой может выйти на сцену и выступить. рэп, стихи, стендап, что угодно' }, { en: "it's chill, nobody judges. u in?", ru: 'всё спокойно, никто не осуждает. ты в деле?' }],
        replies: [{ en: "Okay, I'm in!", ru: 'Окей, я в деле!', kw: ['ok', 'okay', 'in', 'yes', 'sure', 'bet', 'down'], go: 'b' }] },
      sc: { msgs: [{ en: 'ngl I was scared my first time too', ru: 'честно, я в первый раз тоже боялся' }, { en: "u don't have to perform. just come and vibe", ru: 'выступать не обязательно. просто приходи, лови атмосферу' }],
        replies: [{ en: "Okay, I'll come!", ru: 'Окей, приду!', kw: ['ok', 'okay', 'come', 'will', 'yes', 'sure', 'bet'], go: 'b' }] },
      b: { msgs: [{ en: "that's what I'm talking about 🔥", ru: 'вот это я понимаю' }, { en: 'what kind of music do u listen to btw?', ru: 'кстати, какую музыку ты слушаешь?' }],
        replies: [
          { en: 'I listen to a lot of rap. Have you heard any Russian rap?', ru: 'Много рэпа. Ты слышал русский рэп?', kw: ['rap', 'hip-hop', 'hip hop', 'russian'], go: 'c' },
          { en: "Mostly pop, but I'm getting into hip-hop.", ru: 'В основном поп, но начинаю втягиваться в хип-хоп.', kw: ['pop', 'rock', 'getting into', 'mostly', 'everything', 'all', 'jazz', 'electronic'], go: 'c2' },
        ] },
      c: { msgs: [{ en: 'never heard any tbh 👀 send me something', ru: 'если честно, ни разу. скинь что-нибудь' }, { en: "I'll play it in the studio", ru: 'включу в студии' }], replies: 'bye' },
      c2: { msgs: [{ en: 'respect. start with Biggie, then Kendrick. trust me', ru: 'уважаю. начни с Бигги, потом Кендрик. поверь' }], replies: 'bye' },
      d: { msgs: [{ en: "bet 🤝 I'm putting u on the list", ru: 'договорились. вношу тебя в список' }, { en: 'and yo, ur english is getting crazy good fr', ru: 'и слушай, твой английский реально становится очень крутым' }], end: true },
    },
    sets: {
      bye: [{ en: 'Bet. See you on Saturday!', ru: 'Договорились. Увидимся в субботу!', kw: ['bet', 'see you', 'saturday', 'ok', 'okay', 'cool', 'thanks', 'will', 'sure'], go: 'd' }],
    },
  },
];

SCENARIOS.push(...SCEN2, ...SCEN3, ...SCEN4);

// When a character has no active scenario: small talk by intent.
export const SMALLTALK = {
  intents: [
    { id: 'meaning', re: /what (does|do|is|'s) ["“']?([a-z' -]+?)["”']? (mean|stand for)|what is ["“']?([a-z' -]+?)["”']?\??$/i },
    { id: 'greet', kw: ['hi', 'hello', 'hey', 'yo', 'sup', "what's up", 'whats up', 'wassup', 'hiya'] },
    { id: 'how', kw: ['how are you', 'how r u', "how's it going", 'how is it going', 'you good', 'u good', 'how are u'] },
    { id: 'doing', kw: ['wyd', 'what are you doing', 'what r u doing', 'what you doing', 'what are u doing'] },
    { id: 'thanks', kw: ['thanks', 'thank you', 'thx', 'ty'] },
    { id: 'laugh', kw: ['lol', 'haha', 'lmao', '😂', 'hahaha'] },
    { id: 'bye', kw: ['bye', 'see you', 'see ya', 'later', 'gtg', 'good night', 'cya'] },
  ],
  replies: {
    jay: {
      greet: [{ en: "yo what's good", ru: 'йоу, как оно' }],
      how: [{ en: "I'm chillin. working on a new beat rn", ru: 'отдыхаю. пишу новый бит прямо сейчас' }],
      doing: [{ en: 'at the store till 6, then studio 🎧', ru: 'в магазине до 6, потом студия' }],
      thanks: [{ en: 'anytime bro', ru: 'обращайся, бро' }],
      laugh: [{ en: '😂😂', ru: '' }],
      bye: [{ en: 'bet, later 🤙', ru: 'давай, до связи' }],
      unknown: [{ en: "lol I don't get it bro 😂", ru: 'лол, не понял, бро' }, { en: 'say that again?', ru: 'повтори?' }],
    },
    liam: {
      greet: [{ en: 'Alright, mate?', ru: 'Здорово, как ты? (британское приветствие)' }],
      how: [{ en: "Not bad, mate. Bit knackered, but surviving.", ru: 'Неплохо. Немного устал, но живой.' }],
      doing: [{ en: "Just having a cuppa and pretending to study.", ru: 'Пью чай и делаю вид, что учусь.' }],
      thanks: [{ en: 'No worries!', ru: 'Не за что!' }],
      laugh: [{ en: 'Haha 😂', ru: '' }],
      bye: [{ en: 'Cheers, mate. Laters!', ru: 'Давай, дружище. Пока!' }],
      unknown: [{ en: "Sorry, mate, you've lost me 😅", ru: 'Прости, дружище, я потерял нить' }, { en: 'Come again?', ru: 'Ещё раз?' }],
    },
    ty: {
      greet: [{ en: 'yooo', ru: 'йооо' }],
      how: [{ en: 'blessed. just finished practice 💪', ru: 'всё отлично. только что закончил тренировку' }],
      doing: [{ en: 'eating like my 3rd dinner lol', ru: 'ем примерно третий ужин, лол' }],
      thanks: [{ en: 'u got it', ru: 'не за что' }],
      laugh: [{ en: '😂', ru: '' }],
      bye: [{ en: 'later bro', ru: 'давай, бро' }],
      unknown: [{ en: 'bro what 😂', ru: 'бро, что?' }, { en: 'huh?', ru: 'а?' }],
    },
    diego: {
      greet: [{ en: "what's up dude 🤙", ru: 'здорово, чувак' }],
      how: [{ en: 'stoked. waves were good today 🌊', ru: 'в восторге. сегодня были хорошие волны' }],
      doing: [{ en: 'skating to work rn lol', ru: 'еду на работу на скейте, лол' }],
      thanks: [{ en: 'no problem dude', ru: 'без проблем, чувак' }],
      laugh: [{ en: 'hahaha', ru: '' }],
      bye: [{ en: 'later dude 🤙', ru: 'пока, чувак' }],
      unknown: [{ en: "dude I'm lost 😂", ru: 'чувак, я не понял' }, { en: 'what? haha', ru: 'что? ха-ха' }],
    },
    marcus: {
      greet: [{ en: "what's good, Max", ru: 'как оно, Макс' }],
      how: [{ en: "chillin. just got off work at the shop. u?", ru: 'отдыхаю. только что закончил смену в магазине. а ты?' }],
      doing: [{ en: 'shooting hoops at the park', ru: 'кидаю мяч в кольцо в парке' }],
      thanks: [{ en: 'no doubt', ru: 'без вопросов' }],
      laugh: [{ en: '😂', ru: '' }],
      bye: [{ en: 'aight, later', ru: 'ладно, давай' }],
      unknown: [{ en: 'u lost me fam 😂', ru: 'я тебя потерял, брат' }, { en: 'come again?', ru: 'ещё раз?' }],
    },
    maya: {
      greet: [{ en: 'Hi Max! How can I help?', ru: 'Привет, Макс! Чем помочь?' }],
      how: [{ en: "I'm doing well, thanks! Busy week, but good.", ru: 'Всё хорошо, спасибо! Неделя загруженная, но хорошая.' }],
      doing: [{ en: 'Back-to-back meetings until 5 😅', ru: 'Встречи одна за другой до пяти.' }],
      thanks: [{ en: "You're welcome!", ru: 'Пожалуйста!' }],
      laugh: [{ en: '😄', ru: '' }],
      bye: [{ en: 'Have a great evening!', ru: 'Хорошего вечера!' }],
      unknown: [{ en: "Sorry, I didn't quite get that. Could you rephrase it?", ru: 'Прости, не совсем поняла. Можешь перефразировать?' }],
    },
  },
  meaning: {
    found: { en: 'It means: ', ru: '' },
    notFound: { en: "Hmm, not sure about that one. Check the slang section!", ru: 'Хм, не уверен насчёт этого. Посмотри раздел сленга!' },
  },
};

// Typical mistakes of Russian speakers: a friend-style correction under your message.
export const MISTAKES = [
  { re: /\b(i|we|you|they) (am|are) (agree|like|love|know|want|think|live|work|study|need)\b/i, fix: m => `${m[1]} ${m[3]}`, ru: 'Перед глаголом am/are не нужен.' },
  { re: /\b(he|she|it|jay|ty|liam|diego|maya) don'?t\b/i, fix: m => `${m[1]} doesn't`, ru: 'С he / she / it — doesn’t.' },
  { re: /\bdid(?:n'?t| not)? (?:\w+ )?(went|saw|came|wrote|took|got|made|had|ate|bought|was|did|watched|played|started)\b/i, fix: m => ({ went: 'go', saw: 'see', came: 'come', wrote: 'write', took: 'take', got: 'get', made: 'make', had: 'have', ate: 'eat', bought: 'buy', was: 'be', did: 'do', watched: 'watch', played: 'play', started: 'start' })[m[1].toLowerCase()], ru: 'После did — обычная форма глагола.' },
  { re: /\bi have (\d+) years\b/i, fix: m => `I'm ${m[1]} years old`, ru: 'Возраст — через be: I’m 20.' },
  { re: /\b(i|we) (live|work|study|am|are) here (for|since)\b/i, fix: m => `${m[1]}'ve ${m[2] === 'am' || m[2] === 'are' ? 'been' : m[2] === 'study' ? 'studied' : m[2] + 'd'} here ${m[3]}`, ru: 'Длится до сих пор → Present Perfect.' },
  { re: /\bwill (going|to \w+)\b/i, fix: () => 'will + глагол без to', ru: 'После will — глагол без to и без -ing.' },
  { re: /\blook(?:ing)? forward to (meet|see|work|hear|talk)\b/i, fix: m => `looking forward to ${m[1]}ing`.replace('meeting', 'meeting'), ru: 'Look forward to + -ing.' },
  { re: /\b(must|should|can|could|might) to\b/i, fix: m => m[1], ru: 'После модальных глаголов to не нужен.' },
  { re: /\bif (i|you|we|he|she|it) will\b/i, fix: m => `if ${m[1]} + Present`, ru: 'В части с if — настоящее время, не will.' },
  { re: /\bmore better\b/i, fix: () => 'better', ru: 'Better уже значит «лучше».' },
  { re: /\bdepends? of\b/i, fix: () => 'depends on', ru: 'Depend on, а не of.' },
  { re: /\bexplain me\b/i, fix: () => 'explain to me', ru: 'Explain something to someone.' },
  { re: /\bpeople is\b/i, fix: () => 'people are', ru: 'People — множественное число.' },
  { re: /\bhow (it|this) is called\b/i, fix: () => 'What is it called?', ru: 'По-английски «как называется» = what is it called.' },
  { re: /\bon the (photo|picture)\b/i, fix: m => `in the ${m[1]}`, ru: 'На фото = in the photo.' },
  { re: /\bi am from russia\b.*\bi am live\b/i, fix: () => 'I live', ru: 'I live, без am.' },
  { re: /\bsay me\b|\bsaid me\b/i, fix: () => 'tell me / told me', ru: 'Say something, tell someone.' },
];

Object.assign(SMALLTALK.replies, SMALLTALK3);
