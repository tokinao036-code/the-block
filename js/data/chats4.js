// Chat scenarios for the +5 episodes per city (more.js). Format as in chats.js.
const R = (en, ru, kw, go) => ({ en, ru, kw, go });
const BAD = (en, better, fb, reactEn, reactRu, ru = '(с ошибкой)') => ({ en, ru, bad: true, better, fb, react: [{ en: reactEn, ru: reactRu }] });
const M = (en, ru) => ({ en, ru });

export const SCEN4 = [
  /* ---------- New York ---------- */
  { id: 'liam5', who: 'liam', unlock: 'w1l8', title: 'После опоздания', start: 'a', nodes: {
    a: { msgs: [M('mate, the professor just looked at me like I\'d murdered someone 😅', 'дружище, профессор посмотрел на меня, будто я кого-то убил'), M('what did u tell him?', 'что ты ему сказал?')], expect: { t: 'past', ex: 'I told him the train was being held.' },
      replies: [
        R("I told him the train was being held between stations. He didn't buy it.", 'Сказал, что поезд задержали между станциями. Он не поверил.', ['told', 'train', 'held', 'stuck', 'buy', 'said'], 'b'),
        R('I said I missed my stop. Honesty is the best policy, right?', 'Сказал, что проехал остановку. Честность — лучшая политика, да?', ['missed', 'stop', 'honest', 'said', 'truth'], 'b2'),
        BAD('I say him the train is late.', 'I told him the train was late.', 'say → told him (сказать кому-то — tell). И прошлое: told, was.', 'u TOLD him the train was late? classic excuse 😂', 'ты СКАЗАЛ, что поезд опоздал? классическая отмазка'),
      ] },
    b: { msgs: [M("he never buys it. next time we're leaving 20 min early, deal?", 'он никогда не верит. в следующий раз выходим на 20 минут раньше, договорились?')], next: 'c' },
    b2: { msgs: [M('brutal honesty, love it 😂 next time we leave 20 min early, deal?', 'жестокая честность, обожаю. в следующий раз выходим на 20 минут раньше?')], next: 'c' },
    c: { msgs: [M("I'll be knocking on your door at 7:45 sharp", 'буду стучать в твою дверь ровно в 7:45')],
      replies: [R("Deal. I'll be ready. Probably.", 'Договорились. Буду готов. Наверное.', ['deal', 'ready', 'okay', 'sure', 'fine', 'bet'], 'd')] },
    d: { msgs: [M('"probably" 🙄 see u at 7:45', '«наверное»… до встречи в 7:45')], end: true },
  } },
  { id: 'jay6', who: 'jay', unlock: 'w1l9', title: 'Чопд чиз', start: 'a', nodes: {
    a: { msgs: [M('sooo?? 🥪', 'нуу??'), M('how was ur first chopped cheese? be honest', 'как тебе первый чопд чиз? честно')],
      replies: [
        R('Honestly? That hit the spot. I get why you go there every night.', 'Честно? То, что надо. Понимаю, почему ты ходишь туда каждый вечер.', ['hit the spot', 'good', 'amazing', 'love', 'tasty', 'fire', 'get why'], 'b'),
        R("It was good, but I'm going to dream about that cat.", 'Было вкусно, но мне будет сниться тот кот.', ['cat', 'good', 'dream', 'but'], 'b2'),
        BAD('It very tasty!', "It was really good!", 'Нужен глагол: It was… И лучше really good / so good — tasty звучит по-учебному.', 'it WAS really good right?? 😤 told u', 'реально вкусно, да?? говорил же'),
      ] },
    b: { msgs: [M('see?? trust the process 🙏', 'видишь?? доверяй процессу'), M('what does Rafi usually say when u pay with a card lol', 'а что Рафи обычно говорит, когда платишь картой, лол')], expect: { t: 'present', ex: 'He says cards over ten dollars.' },
      replies: [R('He says "cards over ten dollars." So I bought a drink too.', 'Говорит «картой — от десяти долларов». Так что я купил ещё напиток.', ['says', 'cards', 'ten', 'bought', 'drink', 'cash'], 'c')] },
    b2: { msgs: [M('LMAO that cat runs the block. he doesn\'t even pay rent 😂', 'АХАХ этот кот правит районом. он даже аренду не платит')], next: 'c' },
    c: { msgs: [M("next time it's on me. ur officially a Bushwick guy now", 'в следующий раз я угощаю. теперь ты официально парень из Бушвика')], end: true },
  } },
  { id: 'maya5', who: 'maya', unlock: 'w1l10', title: 'Больничный', start: 'a', nodes: {
    a: { msgs: [M('Hi Max, I heard you\'re not feeling well. Are you okay?', 'Привет, Макс, слышала, тебе нездоровится. Ты в порядке?'), M('What did the doctor say?', 'Что сказал врач?')], expect: { t: 'past', ex: 'She said I should stay home tomorrow.' },
      replies: [
        R('I went to urgent care. They said I should stay home if the fever doesn\'t go down.', 'Сходил в клинику. Сказали остаться дома, если температура не спадёт.', ['should', 'stay', 'home', 'fever', 'said', 'urgent care', 'doctor'], 'b'),
        R("I'm coming down with something. I'm sorry, I might have to miss the presentation.", 'Я заболеваю. Извини, возможно, придётся пропустить презентацию.', ['coming down', 'sorry', 'miss', 'presentation', 'might', 'sick'], 'b'),
        BAD('I must to stay home.', 'I have to stay home.', 'После must — без to: I must stay. А про совет врача естественнее I have to / I should.', "you have to stay home, yes. no heroics please", 'да, тебе надо остаться дома. без геройства, пожалуйста'),
      ] },
    b: { msgs: [M("Please don't worry about the presentation. You don't have to come in tomorrow.", 'Пожалуйста, не переживай о презентации. Завтра приходить не обязательно.'), M('Can you send me your slides?', 'Можешь прислать слайды?')],
      replies: [
        R("Of course. I'll send them tonight. Thanks for understanding.", 'Конечно. Пришлю сегодня вечером. Спасибо за понимание.', ['send', 'tonight', "i'll", 'thanks', 'understanding', 'sure', 'course'], 'c'),
        BAD('Yes, I send it now.', "Sure, I'll send them now.", 'Решение прямо сейчас → I’ll send. И slides — они, them.', "great, send them whenever you can 🙂", 'отлично, пришли, когда сможешь'),
      ] },
    c: { msgs: [M('Perfect. Rest up and drink lots of water. Feel better! 🍵', 'Отлично. Отдыхай и пей много воды. Выздоравливай!')], end: true },
  } },
  { id: 'ty6', who: 'ty', unlock: 'w1l11', title: 'Сосед по комнате', start: 'a', nodes: {
    a: { msgs: [M('bro I need advice 😩', 'бро, нужен совет'), M('my roommate plays loud music at 2am every night. what do I say without starting beef?', 'сосед каждую ночь в 2 врубает музыку. что сказать, чтобы не начать конфликт?')],
      replies: [
        R('Try something like "Would you mind turning it down after midnight?"', 'Попробуй что-то вроде «Не мог бы ты делать потише после полуночи?»', ['would you mind', 'turning', 'down', 'midnight', 'could you'], 'b'),
        R('Be honest but chill: "Hey, is it okay if we keep it quiet after 12? I have class early."', 'Честно, но спокойно: «Слушай, ничего, если после 12 будем потише? У меня рано пары».', ['is it okay if', 'quiet', 'class', 'early', 'honest'], 'b'),
        BAD('Say him: would you mind to stop?', 'Tell him: "Would you mind stopping?"', 'tell him (не say him), и would you mind + -ing: stopping.', 'would u mind STOPPING 😂 ok that sounds better', 'не мог бы ты ПРЕКРАТИТЬ… ок, так лучше'),
      ] },
    b: { msgs: [M("that's actually smooth. u learned that at the laundromat? 😂", 'вообще-то гладко. научился в прачечной?')],
      replies: [R('Laundromat taught me everything. Unwritten rules, bro.', 'Прачечная научила меня всему. Негласные правила, бро.', ['laundromat', 'rules', 'taught', 'yes', 'learned'], 'c')] },
    c: { msgs: [M("aight I'm gonna try it tonight. if he says no I'm moving into ur place 😤", 'ладно, попробую сегодня. если откажет — переезжаю к тебе')], end: true },
  } },
  { id: 'diego4', who: 'diego', unlock: 'w1l12', title: 'Перед отлётом', start: 'a', nodes: {
    a: { msgs: [M('boarding in 20 🛫', 'посадка через 20'), M('dude that weekend was SICK. what are u doing next weekend tho?', 'чувак, выходные были ОГОНЬ. а что делаешь в следующие выходные?')], expect: { t: 'future', ex: "I'm meeting Jay's friends on Saturday." },
      replies: [
        R("I'm going to study for midterms. Not as fun, I know.", 'Собираюсь готовиться к промежуточным экзаменам. Не так весело, знаю.', ['going to', 'study', 'midterms', 'exam'], 'b'),
        R("I'm meeting Jay at another open mic on Saturday. You should fly back!", 'В субботу встречаюсь с Джеем на очередном открытом микрофоне. Прилетай обратно!', ["i'm meeting", 'saturday', 'open mic', 'fly back', 'should'], 'b2'),
        BAD('I will meet Jay Saturday, it is plan.', "I'm meeting Jay on Saturday. It's the plan.", 'Договорённость → Present Continuous: I’m meeting. И предлог on Saturday.', "ur meeting Jay on saturday? lucky 😩", 'встречаешься с Джеем в субботу? везёт'),
      ] },
    b: { msgs: [M("boo 👎 ok but when ur done, ur coming to LA. no excuses", 'фу. ладно, но как закончишь — приезжаешь в LA. без отговорок')], next: 'c' },
    b2: { msgs: [M("don't tempt me 😂 nah, but ur coming to LA soon. no excuses", 'не соблазняй. не, но ты скоро приедешь в LA. без отговорок')], next: 'c' },
    c: { msgs: [M('promise?', 'обещаешь?')], replies: [R("I promise. I'll be there before you know it.", 'Обещаю. Буду у тебя быстрее, чем ты думаешь.', ['promise', "i'll", 'there', 'yes', 'sure', 'bet'], 'd')] },
    d: { msgs: [M('holding u to that 🤙 see u in the sun', 'ловлю на слове. увидимся на солнце')], end: true },
  } },

  /* ---------- Chicago ---------- */
  { id: 'marcus5', who: 'marcus', unlock: 'w2l8', title: 'Сумка в Денвере', start: 'a', nodes: {
    a: { msgs: [M('yo I gotta know', 'йоу, мне надо знать'), M('when ur bag came back, what had happened to it? 😂', 'когда твою сумку вернули, что с ней успело случиться?')], expect: { t: 'pastperf', ex: 'Someone had put a Denver sticker on it.' },
      replies: [
        R('Someone had put a "Welcome to Denver" sticker on it. It had a better trip than me.', 'Кто-то наклеил на неё стикер «Добро пожаловать в Денвер». У неё поездка была лучше моей.', ['had', 'sticker', 'denver', 'trip', 'better', 'put'], 'b'),
        R("Nothing, but it smelled like an airport. It had been sitting there for two days.", 'Ничего, но пахла аэропортом. Она пролежала там два дня.', ['had been', 'sitting', 'days', 'smelled', 'nothing'], 'b'),
        BAD('Somebody has opened it before.', 'Somebody had opened it before.', 'Раньше другого момента в прошлом → had opened.', 'somebody HAD opened it?? bro that\'s wild', 'кто-то её ОТКРЫВАЛ?? бро, это дико'),
      ] },
    b: { msgs: [M('LMAO 💀 lesson learned?', 'АХАХ. урок усвоен?')],
      replies: [R("Lesson learned: carry-on only. And always be firm with airlines.", 'Урок: только ручная кладь. И всегда стоять на своём с авиакомпаниями.', ['carry-on', 'firm', 'lesson', 'learned', 'always'], 'c')] },
    c: { msgs: [M("that's the Chicago way. nobody pushes us around 💪", 'вот это по-чикагски. нами никто не помыкает')], end: true },
  } },
  { id: 'maya6', who: 'maya', unlock: 'w2l9', title: 'Ещё один вопрос', start: 'a', nodes: {
    a: { msgs: [M('Round two 💼', 'Второй раунд'), M('"Tell me about a time when you had to work with a difficult person."', '«Расскажите о случае, когда пришлось работать с трудным человеком».')], expect: { t: 'pastcont', ex: 'I was working on a group project when one member stopped answering.' },
      replies: [
        R('I was working on a group project when one teammate stopped answering. I called him, we split the tasks, and we finished on time.', 'Я делал групповой проект, когда один участник перестал отвечать. Я позвонил, мы разделили задачи и закончили вовремя.', ['was working', 'when', 'stopped', 'called', 'finished', 'on time', 'project'], 'b'),
        BAD("I never work with difficult people.", 'Once I was working with someone who never answered messages, so I…', 'Ответ «никогда» на поведенческий вопрос — провал. Нужна история: was working… when…', 'nice try 😄 everyone has one. tell me a story', 'хорошая попытка. у всех есть такая история. расскажи'),
        R("Last semester a classmate kept missing deadlines. I'd been doing his part for weeks, so I finally talked to him.", 'В прошлом семестре одногруппник постоянно срывал сроки. Я неделями делал его часть, так что в итоге поговорил с ним.', ["i'd been", 'kept', 'deadlines', 'talked', 'finally', 'weeks'], 'b'),
      ] },
    b: { msgs: [M('Strong. And the result?', 'Сильно. А результат?')],
      replies: [R('As a result, we got an A, and what I learned was to talk to people early.', 'В итоге мы получили «отлично», а вывод — говорить с людьми сразу.', ['as a result', 'learned', 'got', 'early', 'result'], 'c')] },
    c: { msgs: [M("That's a hire. Seriously, you're ready for the real one 🔥", 'Это «берём». Серьёзно, ты готов к настоящему интервью')], end: true },
  } },
  { id: 'marcus6', who: 'marcus', unlock: 'w2l10', title: 'После блюза', start: 'a', nodes: {
    a: { msgs: [M('so did the blues get u? 🎸', 'ну что, блюз тебя зацепил?'), M('what kind of music did u use to listen to back home?', 'а какую музыку ты слушал раньше дома?')], expect: { t: 'usedto', ex: 'I used to listen to Russian rock.' },
      replies: [
        R('I used to listen to Russian rock and some old hip-hop. Blues never used to be my thing.', 'Раньше слушал русский рок и немного старого хип-хопа. Блюз никогда не был моим.', ['used to', 'listen', 'rock', 'hip-hop', 'never'], 'b'),
        BAD('I was used to listen rap.', 'I used to listen to rap.', '«Раньше слушал» — used to listen to. Be used to = привык.', 'u USED TO listen to rap? ok which ones 👀', 'ты РАНЬШЕ слушал рэп? ну и кого'),
        R('My dad would play old vinyl every Sunday. That\'s how I got into music.', 'Папа каждое воскресенье ставил старые пластинки. Так я и полюбил музыку.', ['would', 'dad', 'vinyl', 'sunday', 'got into'], 'b'),
      ] },
    b: { msgs: [M("respect. so now u see where it all comes from. muddy waters → everything", 'уважаю. теперь ты видишь, откуда всё. Мадди Уотерс → всё остальное')],
      replies: [R("Yeah, it's grown on me. That guitar gave me chills.", 'Да, он мне всё больше нравится. От той гитары у меня мурашки.', ['grown on', 'chills', 'goosebumps', 'yeah', 'love'], 'c')] },
    c: { msgs: [M('my grandpa would be proud 🙏 next friday, same spot', 'дед бы гордился. в следующую пятницу, там же')], end: true },
  } },
  { id: 'liam6', who: 'liam', unlock: 'w2l11', title: 'Новый фанат «Кабс»', start: 'a', nodes: {
    a: { msgs: [M('right, I\'ve ordered a Cubs hat. Don\'t tell anyone in London 🧢', 'так, я заказал кепку «Кабс». Только никому в Лондоне не говори'), M('remind me, when was Wrigley built again?', 'напомни, когда построили Ригли?')], expect: { t: 'past', ex: 'It was built in 1914.' },
      replies: [
        R('It was built in 1914. And the ivy was planted in the thirties.', 'Его построили в 1914-м. А плющ посадили в тридцатых.', ['was built', '1914', 'ivy', 'planted'], 'b'),
        BAD('It built in 1914.', 'It was built in 1914.', 'Стадион не «построил сам» → пассив: was built.', "it WAS built, mate 😏 ok 1914, got it", 'его ПОСТРОИЛИ, дружище. ладно, 1914, понял'),
      ] },
    b: { msgs: [M('cheers. still think cricket is better though 🏏', 'спасибо. но крикет всё равно лучше')],
      replies: [
        R("That came out of left field. You literally cried during the seventh-inning stretch.", 'Это как гром среди ясного неба. Ты буквально плакал на перерыве седьмого иннинга.', ['out of left field', 'cried', 'stretch', 'literally'], 'c'),
        R("Say that again in Chicago and you won't be allowed back.", 'Скажи это ещё раз в Чикаго — и тебя больше не пустят.', ['allowed', 'chicago', 'say', 'again'], 'c'),
      ] },
    c: { msgs: [M("fair 😂 fine. go Cubs. but I'm taking it back once I'm home", 'справедливо. ладно, вперёд «Кабс». но дома я свои слова заберу')], end: true },
  } },
  { id: 'jay7', who: 'jay', unlock: 'w2l12', title: 'Застрял в снегу', start: 'a', nodes: {
    a: { msgs: [M('yo Maya said ur stuck in Chicago?? ❄️', 'йоу, Майя сказала, ты застрял в Чикаго??'), M('how long had u been waiting when they finally picked up?', 'сколько ты прождал, пока они наконец ответили?')], expect: { t: 'pastperf', ex: "I'd been waiting on hold for an hour." },
      replies: [
        R("I'd been waiting on hold for almost an hour. But they rebooked me for free.", 'Я висел на линии почти час. Но меня перебронировали бесплатно.', ["i'd been", 'had been', 'waiting', 'hold', 'hour', 'rebooked', 'free'], 'b'),
        BAD('I am waiting one hour.', "I'd been waiting for an hour.", 'Длилось до момента в прошлом → I’d been waiting for an hour.', "an HOUR?? 😩 that's crazy bro", 'ЧАС?? это безумие, бро'),
      ] },
    b: { msgs: [M("at least u got out lol. Bushwick is waiting for u. the stoop misses u", 'хотя бы выбрался, лол. Бушвик тебя ждёт. крыльцо скучает')],
      replies: [R("I'll be back tonight. Save me a spot on the stoop.", 'Вернусь сегодня вечером. Займи мне место на крыльце.', ["i'll", 'back', 'tonight', 'save', 'spot', 'stoop'], 'c')] },
    c: { msgs: [M('bet 🏠 chopped cheese on me when u land', 'договорились. чопд чиз за мной, как приземлишься')], end: true },
  } },

  /* ---------- Atlanta ---------- */
  { id: 'ty7', who: 'ty', unlock: 'w3l8', title: 'Свежая стрижка', start: 'a', nodes: {
    a: { msgs: [M('send a pic 📸', 'кинь фотку'), M("Dre said he's never seen a line that crooked 😂 how long have u been doing ur own hair??", 'Дре сказал, никогда не видел такой кривой линии. сколько ты сам себя стрижёшь??')], expect: { t: 'perfect', ex: "I've been cutting it myself since September." },
      replies: [
        R("I've been cutting it myself since September. Never again, I promise.", 'Сам стригусь с сентября. Больше никогда, обещаю.', ["i've been", 'cutting', 'since', 'september', 'never again'], 'b'),
        BAD('I cut it myself since three months.', "I've been cutting it myself for three months.", 'Длится до сих пор → I’ve been cutting. И for three months (не since).', "THREE MONTHS 💀 bro", 'ТРИ МЕСЯЦА. бро'),
      ] },
    b: { msgs: [M('ok but the fresh cut is clean. i see u 👀', 'ладно, но свежая стрижка чёткая. вижу тебя')],
      replies: [R("Thanks, man. Dre is a legend. Where have you been hiding him?", 'Спасибо, чувак. Дре — легенда. Где ты его прятал?', ['thanks', 'legend', 'hiding', 'where'], 'c')] },
    c: { msgs: [M("he's been my guy since I was 6. now he's urs too 🤝", 'он мой мастер с тех пор, как мне было 6. теперь и твой')], end: true },
  } },
  { id: 'keisha4', who: 'keisha', unlock: 'w3l9', title: 'Вирусное видео', start: 'a', nodes: {
    a: { msgs: [M('OMG 😱', 'БОЖЕ'), M('the I-85 video has 400k views. why do u think it blew up?', 'у видео с I-85 400 тысяч просмотров. как думаешь, почему оно взорвалось?')], expect: { t: 'present', ex: 'It must be because it was real.' },
      replies: [
        R("It must be because it's so real. Everyone's been stranded on the highway at least once.", 'Наверное, потому что всё настоящее. Каждый хоть раз застревал на трассе.', ['must', 'real', 'stranded', 'everyone', 'because'], 'b'),
        R('It might be my face when the smoke came out. Pure panic.', 'Может, из-за моего лица, когда пошёл дым. Чистая паника.', ['might', 'face', 'smoke', 'panic'], 'b'),
        BAD('It must to be the smoke.', 'It must be the smoke.', 'После must — без to.', "it MUST be the smoke 😂 u looked terrified", 'это ТОЧНО дым. ты выглядел в ужасе'),
      ] },
    b: { msgs: [M("lol facts. the brand saw it too. they want u in the next one 👀", 'лол, факт. бренд тоже видел. хотят тебя в следующем')],
      replies: [R("For real? I'm in. As long as the car works this time.", 'Серьёзно? Я в деле. Только чтобы машина в этот раз работала.', ['in', 'real', 'as long as', 'car', 'yes', 'down'], 'c')] },
    c: { msgs: [M('no promises 😂 new radiator tho', 'ничего не обещаю. но радиатор новый')], end: true },
  } },
  { id: 'ty8', who: 'ty', unlock: 'w3l10', title: 'После службы', start: 'a', nodes: {
    a: { msgs: [M("mama hasn't stopped talking about u 😂", 'мама не перестаёт о тебе говорить'), M('have u ever been to anything like that before?', 'ты бывал когда-нибудь на чём-то подобном?')], expect: { t: 'perfect', ex: "I've never been to anything like that." },
      replies: [
        R("Never. I've only seen gospel choirs in movies. Movies don't do it justice.", 'Никогда. Видел госпел только в кино. Кино этого не передаёт.', ['never', "i've", 'seen', 'movies', 'justice', 'choir'], 'b'),
        BAD('I never was in church like this.', "I've never been to a church like this.", 'Опыт за жизнь → I’ve never been to…', "u've never been?? glad mama took u then 🙏", 'никогда не был?? тогда хорошо, что мама тебя взяла'),
      ] },
    b: { msgs: [M('and the potluck? u went back for thirds 👀', 'а потлак? ты три раза ходил за добавкой')],
      replies: [R("So far that's been the best mac and cheese of my life. Tell your mom thank you.", 'Пока что это лучший мак-энд-чиз в моей жизни. Передай маме спасибо.', ['so far', 'best', 'mac', 'thank', 'mom', 'been'], 'c')] },
    c: { msgs: [M("she said u can come back anytime. that's basically adoption 😂", 'она сказала, что ты можешь приходить когда угодно. это по сути усыновление')], end: true },
  } },
  { id: 'maya7', who: 'maya', unlock: 'w3l11', title: 'Как прошёл питч', start: 'a', nodes: {
    a: { msgs: [M('Keisha told me about the pitch! How did it go?', 'Кейша рассказала про питч! Как прошло?'), M('What will you have done by next Friday?', 'Что ты успеешь сделать к следующей пятнице?')], expect: { t: 'future', ex: "By next Friday, we'll have sent them the full breakdown." },
      replies: [
        R("By next Friday, we'll have sent them a full budget breakdown.", 'К следующей пятнице мы отправим им полную разбивку бюджета.', ["we'll have", 'will have', 'sent', 'breakdown', 'budget', 'by'], 'b'),
        BAD('By Friday we send them budget.', "By Friday we'll have sent them the budget.", 'by + срок → Future Perfect: will have sent.', 'you\'ll HAVE SENT it, yes 🙂 good', 'ты УЖЕ ОТПРАВИШЬ к тому времени, да. хорошо'),
      ] },
    b: { msgs: [M('Great. One tip: follow up within 24 hours. A short thank-you email works wonders.', 'Отлично. Один совет: напомни о себе в течение суток. Короткое письмо с благодарностью творит чудеса.')],
      replies: [R("Good call. I'll send a thank-you email tonight and loop Keisha in.", 'Хорошая мысль. Отправлю письмо сегодня и поставлю Кейшу в копию.', ['good call', 'send', 'email', 'tonight', 'loop', 'thank'], 'c')] },
    c: { msgs: [M("Look at you. Practically a marketing manager 💼", 'Посмотри на себя. Практически маркетинг-менеджер')], end: true },
  } },
  { id: 'jay8', who: 'jay', unlock: 'w3l12', title: 'Фото у дома Кинга', start: 'a', nodes: {
    a: { msgs: [M('saw ur pic at the King house 🙏', 'видел твоё фото у дома Кинга'), M('that hits different. what did u learn?', 'это цепляет. что узнал?')], expect: { t: 'past', ex: 'I learned that many laws were changed because people marched.' },
      replies: [
        R("That a lot of laws were changed because regular people marched. Ty's grandpa was there in 1963.", 'Что многие законы изменили, потому что обычные люди выходили на марши. Дед Тая был там в 1963-м.', ['were changed', 'laws', 'marched', 'grandpa', '1963', 'people'], 'b'),
        BAD('King was born there and he has given a speech in 1963.', 'King was born there, and he gave his famous speech in 1963.', 'С годом (in 1963) — Past Simple: gave.', 'yeah he gave it in DC, \'63 💯', 'да, он произнёс её в Вашингтоне, в 63-м'),
      ] },
    b: { msgs: [M("respect. my grandma used to tell me about that stuff. this city's history is real", 'уважение. бабушка рассказывала мне об этом. история этого города настоящая')],
      replies: [R("It's steeped in history. I didn't expect to feel it that much.", 'Он пропитан историей. Не ожидал, что так прочувствую.', ['steeped', 'history', "didn't expect", 'feel'], 'c')] },
    c: { msgs: [M("that's why u travel bro. come home soon tho 🏠", 'вот зачем путешествовать, бро. но возвращайся скорее')], end: true },
  } },

  /* ---------- Los Angeles ---------- */
  { id: 'diego5', who: 'diego', unlock: 'w4l8', title: 'Гуакамоле', start: 'a', nodes: {
    a: { msgs: [M('zoe said u got SIX avocados 🥑', 'Зои сказала, ты взял ШЕСТЬ авокадо'), M('if u make guac tonight, what will u put in it?', 'если сделаешь гуак сегодня, что туда положишь?')], expect: { t: 'future', ex: "If I make guac, I'll put lime and onion in it." },
      replies: [
        R("If I make guac, I'll add lime, onion, and a little cilantro. Unless you hate cilantro.", 'Если сделаю, добавлю лайм, лук и немного кинзы. Если только ты не ненавидишь кинзу.', ['if', "i'll", 'lime', 'onion', 'cilantro', 'unless'], 'b'),
        BAD('If I will make guac, I put tomatoes.', "If I make guac, I'll put tomatoes in it.", 'If + Present, результат — will: If I make…, I’ll put…', 'tomatoes are allowed. barely 😤', 'помидоры можно. едва'),
      ] },
    b: { msgs: [M('cilantro is life. and the pickles? zoe tried them??', 'кинза — это жизнь. а огурцы? Зои попробовала??')],
      replies: [R('She tried one and asked for three more. Cultural exchange, bro.', 'Попробовала один и попросила ещё три. Культурный обмен, бро.', ['tried', 'more', 'cultural', 'exchange', 'loved', 'liked'], 'c')] },
    c: { msgs: [M("ok if there's guac left when I get there, I'll be shocked. pulling up at 7", 'если к моему приезду останется гуак — я буду в шоке. подъеду в 7')], end: true },
  } },
  { id: 'zoe3', who: 'zoe', unlock: 'w4l9', title: 'Со съёмочной площадки', start: 'a', nodes: {
    a: { msgs: [M('ok background actor 🎬', 'так, актёр массовки'), M("if u could play any role in a real movie, what would it be?", 'если бы ты мог сыграть любую роль в настоящем фильме, какую?')], expect: { t: 'present', ex: "If I could, I'd play a villain." },
      replies: [
        R("If I could choose, I'd play a Russian villain. It's the only role Hollywood offers us anyway.", 'Если бы мог выбрать, сыграл бы русского злодея. Голливуд всё равно других нам не предлагает.', ['if', 'could', "i'd", 'villain', 'play', 'would'], 'b'),
        R("I'd be the guy who explains everything in a heist movie.", 'Я бы был тем, кто всё объясняет в фильме про ограбление.', ["i'd", 'would', 'heist', 'explains', 'guy'], 'b'),
        BAD('If I can, I will be a hero.', "If I could, I'd be a hero.", 'Воображение → If I could…, I’d…', "u'd be a hero? 😂 cute. too nice for a villain", 'был бы героем? мило. для злодея ты слишком добрый'),
      ] },
    b: { msgs: [M('LOL. the director said u were a natural. if u stayed in LA, u could actually get more gigs', 'АХАХ. режиссёр сказал, что ты прирождённый. если бы остался в LA, мог бы реально получать больше съёмок')],
      replies: [R("If I stayed, my mom would lose it. But I'd be lying if I said I wasn't tempted.", 'Если бы я остался, мама бы с ума сошла. Но совру, если скажу, что не соблазнён.', ['if', 'stayed', 'would', 'lose it', 'tempted', "i'd"], 'c')] },
    c: { msgs: [M("tempted is a start 😏 wardrobe's calling, gotta run", '«соблазнён» — уже начало. костюмерная зовёт, бегу')], end: true },
  } },
  { id: 'diego6', who: 'diego', unlock: 'w4l10', title: 'Утро в пустыне', start: 'a', nodes: {
    a: { msgs: [M('morning sand man 🏜️', 'доброе утро, песочный человек'), M('u slept outside the tent?? what did u see last night?', 'ты спал вне палатки?? что видел ночью?')],
      replies: [
        R("The Milky Way. The whole thing. I've never seen so many stars in my life.", 'Млечный Путь. Целиком. Никогда в жизни не видел столько звёзд.', ['milky way', 'stars', 'never', 'seen', 'whole'], 'b'),
        BAD('I see many stars and one snake.', 'I saw a lot of stars and one snake.', 'Прошлое → saw. И a lot of stars — естественнее, чем many.', 'A SNAKE?? 😳 did u back off slowly like I said', 'ЗМЕЮ?? ты медленно отошёл, как я говорил?'),
      ] },
    b: { msgs: [M('told u 🌌 ok packing up. anything we need before we drive back?', 'говорил же. собираемся. что-то нужно перед обратной дорогой?')],
      replies: [
        R("Let's fill up the tank in case there's no gas station for a while.", 'Давай заправим бак на случай, если долго не будет заправки.', ['in case', 'fill up', 'gas', 'tank', 'station'], 'c'),
        R("As long as we have coffee, I'm good.", 'Пока у нас есть кофе — я в порядке.', ['as long as', 'coffee', 'good'], 'c'),
      ] },
    c: { msgs: [M("smart. ur getting the hang of road trips 🤙", 'умно. ты начинаешь въезжать в роуд-трипы')], end: true },
  } },
  { id: 'zoe4', who: 'zoe', unlock: 'w4l11', title: 'Когда дым рассеялся', start: 'a', nodes: {
    a: { msgs: [M('the smoke is gone 🙏 sky is blue again', 'дым ушёл. небо снова голубое'), M("honestly thanks for today. what would u have done if u were me?", 'честно, спасибо за сегодня. а что бы ты сделал на моём месте?')], expect: { t: 'past', ex: "I would have shot the beach scenes earlier." },
      replies: [
        R("Honestly? I would have done the same. You couldn't have known the wind would change.", 'Честно? Я бы сделал так же. Ты не могла знать, что ветер поменяется.', ['would have', "couldn't have", 'known', 'same', 'wind'], 'b'),
        R('I would have panicked. You handled it way better than me.', 'Я бы запаниковал. Ты справилась намного лучше меня.', ['would have', 'panicked', 'handled', 'better'], 'b'),
        BAD('If I was you, I would shoot it before.', 'If I had been you, I would have shot it earlier.', 'Про прошлое → Third conditional: would have shot. И earlier, а не before.', "u WOULD HAVE shot it earlier? yeah… should've 😩", 'снял бы РАНЬШЕ? ага… надо было'),
      ] },
    b: { msgs: [M("russian optimism really works lol. ok new plan: we reshoot saturday", 'русский оптимизм реально работает, лол. новый план: переснимаем в субботу')],
      replies: [R("Saturday works. Unless there's an earthquake, I'll be there.", 'Суббота подходит. Если не будет землетрясения — буду.', ['saturday', 'unless', 'earthquake', "i'll", 'works'], 'c')] },
    c: { msgs: [M("don't even joke about that in California 😂 see u saturday", 'даже не шути про это в Калифорнии. до субботы')], end: true },
  } },
  { id: 'maya8', who: 'maya', unlock: 'w4l12', title: 'Что ты решил?', start: 'a', nodes: {
    a: { msgs: [M('No pressure 🙂', 'Без давления'), M("But I'm curious — what's your gut telling you about the LA offer?", 'Но мне интересно — что подсказывает интуиция насчёт предложения в LA?')],
      replies: [
        R("I'm torn. I wish I could do both. I'd rather not leave Brooklyn, but LA is a huge opportunity.", 'Я разрываюсь. Хотел бы сделать и то, и другое. Предпочёл бы не уезжать из Бруклина, но LA — огромная возможность.', ['torn', 'wish', 'could', "i'd rather", 'opportunity', 'both'], 'b'),
        BAD('I wish I can stay in two cities.', 'I wish I could stay in two cities.', 'После wish про сейчас — could, а не can.', 'you wish you COULD, yes 🙂 me too sometimes', 'хотел бы, если бы МОГ, да. мне иногда тоже'),
        R("I'm seriously considering it. I'd like a few more days to think it over.", 'Серьёзно рассматриваю. Хотел бы ещё пару дней подумать.', ['considering', 'think', 'over', 'days', "i'd like"], 'b'),
      ] },
    b: { msgs: [M("That's a mature answer. Whatever you decide, I've got your back.", 'Взрослый ответ. Что бы ты ни решил, я тебя поддержу.')],
      replies: [R("Thanks, Maya. I couldn't have done any of this without you.", 'Спасибо, Майя. Без тебя я бы ничего этого не сделал.', ["couldn't have", 'without', 'thanks', 'thank'], 'c')] },
    c: { msgs: [M("You did the work. Now go celebrate — you've earned it 🥂", 'Работу сделал ты. Теперь иди праздновать — ты заслужил')], end: true },
  } },
];
