// Characters of "The Block". voice = folder in audio/ (see tools/gen_audio.py).
// Avatars: img keys in img.js. The learner's hero is Max from Kazan (voice follows the US/UK setting).
export const CHARS = {
  jay: {
    name: 'Jay', full: 'Jaylen Brooks', age: 20, city: 'Bronx → Brooklyn, NY', voice: 'jay', color: '#FF6319',
    img: 'av_jay', handle: '@jaymakesbeats',
    bio: 'Сосед Макса. Вырос в Бронксе, работает в магазине кроссовок на Fulton Street, по ночам пишет биты. Говорит на нью-йоркском сленге: bet, facts, deadass.',
    tags: ['хип-хоп', 'NYC сленг', 'биты'],
  },
  liam: {
    name: 'Liam', full: 'Liam Carter', age: 21, city: 'London → NYC', voice: 'liam', color: '#2F6BFF',
    img: 'av_liam', handle: '@liam.ldn',
    bio: 'Британец по обмену, учится с Максом на маркетинге. Вечно сравнивает Лондон и Нью-Йорк. Британский сленг: mate, innit, knackered, bloody.',
    tags: ['UK сленг', 'футбол', 'сарказм'],
  },
  ty: {
    name: 'Ty', full: 'Tyler Washington', age: 21, city: 'Atlanta → NYC', voice: 'ty', color: '#6CBE45',
    img: 'av_ty', handle: '@ty.lifts',
    bio: 'Студент-спортсмен из Атланты, учится по спортивной стипендии. Качалка, трэп и учёба. Южный сленг: y’all, finna, lowkey.',
    tags: ['спортзал', 'Атланта', 'учёба'],
  },
  diego: {
    name: 'Diego', full: 'Diego Ramirez', age: 22, city: 'Los Angeles', voice: 'diego', color: '#FCCC0A',
    img: 'av_diego', handle: '@diegoskates',
    bio: 'Кузен Джея из Лос-Анджелеса. Скейтер и бариста с Venice Beach. Калифорнийский вайб: dude, stoked, gnarly, hella.',
    tags: ['скейт', 'Калифорния', 'тако'],
  },
  marcus: {
    name: 'Marcus', full: 'Marcus Johnson', age: 19, city: 'South Side, Chicago', voice: 'marcus', color: '#00A1DE',
    img: 'av_marcus', handle: '@marcus.southside',
    bio: 'Младший брат Майи. Работает в магазине пластинок, играет в уличный баскетбол, знает историю чикагского хауса и дрилла. Любит спорить о пицце.',
    tags: ['Чикаго', 'баскетбол', 'хаус и дрилл'],
  },
  keisha: {
    name: 'Keisha', full: 'Keisha Washington', age: 23, city: 'Atlanta, GA', voice: 'keisha', color: '#FF5FA2',
    img: 'av_keisha', handle: '@keishamakesitlook',
    bio: 'Двоюродная сестра Тая. Стилист и креатор из Атланты, полмиллиона подписчиков. Деловая, смешная, южный сленг: periodt, snatched, I see you.',
    tags: ['Атланта', 'контент', 'бизнес блогера'],
  },
  zoe: {
    name: 'Zoe', full: 'Zoe Kim', age: 22, city: 'Los Angeles, CA', voice: 'zoe', color: '#00C2A8',
    img: 'av_zoe', handle: '@zoe.frames',
    bio: 'Студентка киношколы в Лос-Анджелесе, сёрфит и снимает документальное кино про скейтеров Венис-бич. Мечтательная, остроумная.',
    tags: ['кино', 'сёрф', 'Лос-Анджелес'],
  },
  maya: {
    name: 'Maya', full: 'Maya Johnson', age: 26, city: 'Chicago → Manhattan', voice: 'maya', color: '#B933AD',
    img: 'av_maya', handle: '@maya.markets',
    bio: 'Наставница Макса на стажировке в агентстве Northside Media. Учит деловому английскому: письма, созвоны, переговоры — и как не звучать грубо.',
    tags: ['деловой', 'маркетинг', 'Чикаго'],
  },
};

// People who only appear in lesson scenes.
export const EXTRAS = {
  max: { name: 'Max', voice: 'me', you: true },
  barista: { name: 'Barista', voice: 'x-f' },
  prof: { name: 'Professor', voice: 'x-m' },
  guy: { name: 'Guy at the party', voice: 'x-m2' },
  mom: { name: "Ty's mom", voice: 'x-f' },
  landlord: { name: 'Landlord', voice: 'x-m' },
  bodega: { name: 'Rafi (bodega)', voice: 'x-m2' },
  nurse: { name: 'Nurse', voice: 'x-f' },
  woman: { name: 'Neighbor', voice: 'x-f' },
  barber: { name: 'Dre (barber)', voice: 'x-m' },
  agent: { name: 'Airline agent', voice: 'x-f' },
  manager: { name: 'Brand manager', voice: 'x-m2' },
  director: { name: 'Casting director', voice: 'x-m' },
  vendor: { name: 'Vendor', voice: 'x-m2' },
};

export const speaker = id => CHARS[id] || EXTRAS[id] || { name: id, voice: 'f' };
