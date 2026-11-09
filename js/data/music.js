// American street music: timeline, faces, iconic tracks. No lyrics are quoted (copyright) —
// only titles, facts and the English you need to understand the scene.
export const ERAS = [
  { year: '1900–1930', title: 'Blues', place: 'Mississippi Delta → Chicago', img: 'mu_blues', text: 'Музыка чернокожих американцев юга: гитара, губная гармошка, песни о тяжёлой жизни. Из блюза выросло почти всё — джаз, рок, соул и хип-хоп.', words: [{ en: 'to feel blue', ru: 'грустить' }, { en: 'the Delta', ru: 'дельта Миссисипи' }] },
  { year: '1920–1950', title: 'Jazz', place: 'New Orleans → Harlem, NYC', img: 'mu_jazz', text: 'Импровизация, свинг и клубы Гарлема. Louis Armstrong, Duke Ellington, позже — Miles Davis. Многие слова сленга (cool, hip, cat — «чувак») пришли от джазменов.', words: [{ en: 'cool', ru: 'классный — слово джазменов 1940-х' }, { en: 'to jam', ru: 'играть вместе, импровизировать' }] },
  { year: '1960s', title: 'Soul & Motown', place: 'Detroit, Memphis', img: 'mu_soul', text: 'Лейбл Motown из Детройта: Stevie Wonder, Marvin Gaye, The Supremes. Aretha Franklin — «королева соула». Музыка эпохи борьбы за гражданские права.', words: [{ en: 'soul', ru: 'душа; соул' }, { en: 'civil rights', ru: 'гражданские права' }] },
  { year: '1970s', title: 'Funk & Disco', place: 'везде', img: 'mu_funk', text: 'James Brown придумал фанк: всё строится на ритме и басе. Именно его барабанные брейки потом бесконечно крутили диджеи Бронкса.', words: [{ en: 'funky', ru: 'фанковый; необычный, со странным запахом (разг.)' }, { en: 'groove', ru: 'ритм, «качает»' }] },
  { year: '1973', title: 'Рождение хип-хопа', place: 'The Bronx, NYC', img: 'mu_herc', text: 'DJ Kool Herc, вечеринка на 1520 Sedgwick Avenue. Брейк-биты, первые MC, граффити на поездах метро и b-boys. Подробности — в уроке 7.', words: [{ en: 'block party', ru: 'вечеринка всего квартала на улице' }, { en: 'MC', ru: 'ведущий, рэпер (master of ceremonies)' }] },
  { year: '1979–1986', title: 'Old school', place: 'NYC', img: 'mu_oldschool', text: '«Rapper’s Delight» (1979) — первый рэп-хит на радио. «The Message» (1982) — первый рэп о реальной жизни гетто. Run-DMC в кроссовках adidas без шнурков делают хип-хоп модой.', words: [{ en: 'old school', ru: 'старая школа, классика' }, { en: 'sneakerhead', ru: 'фанат кроссовок' }] },
  { year: '1986–1996', title: 'Golden Age', place: 'NYC + LA', img: 'mu_golden', text: 'Public Enemy делают рэп политическим, N.W.A из Комптона рассказывают о жизни Лос-Анджелеса — так рождается west coast и gangsta rap.', words: [{ en: 'East Coast / West Coast', ru: 'Восточное / Западное побережье' }, { en: 'to drop an album', ru: 'выпустить альбом' }] },
  { year: '1994–1997', title: 'East vs West', place: 'NYC ↔ LA', img: 'mu_eastwest', text: 'Соперничество лейблов Bad Boy (Нью-Йорк, The Notorious B.I.G.) и Death Row (Лос-Анджелес, 2Pac). Оба рэпера погибли — 2Pac в 1996, Biggie в 1997. После этого индустрия призвала к миру.', words: [{ en: 'beef', ru: 'конфликт, вражда (сленг)' }, { en: 'diss track', ru: 'трек-оскорбление сопернику' }] },
  { year: '2000s', title: 'Юг и Детройт', place: 'Atlanta, New Orleans, Detroit', img: 'mu_south', text: 'OutKast из Атланты доказывают: «The South got something to say». Eminem из Детройта становится самым продаваемым рэпером десятилетия. Kanye West меняет звук продюсирования.', words: [{ en: 'the Dirty South', ru: 'южный хип-хоп' }, { en: 'producer', ru: 'продюсер, автор битов' }] },
  { year: '2010s', title: 'Trap и стриминг', place: 'Atlanta', img: 'mu_trap', text: 'Трэп из Атланты (Future, Migos, Travis Scott) с хай-хэтами и басом 808 захватывает мир. Kendrick Lamar в 2018 году получает Пулитцеровскую премию — первым из не-классических и не-джазовых музыкантов.', words: [{ en: 'trap', ru: 'трэп; изначально — место, где торгуют наркотиками' }, { en: '808', ru: 'драм-машина Roland TR-808, её бас' }] },
  { year: '2020s', title: 'Drill и новые звёзды', place: 'Brooklyn, Chicago, London', img: 'mu_drill', text: 'Drill родился в Чикаго, переехал в Лондон, а потом в Бруклин (Pop Smoke). Сегодня хип-хоп — самый популярный жанр в США по стримингу.', words: [{ en: 'to go viral', ru: 'стать вирусным' }, { en: 'feature / feat.', ru: 'участие другого артиста в треке' }] },
];

export const ARTISTS = [
  { id: 'herc', name: 'DJ Kool Herc', years: 'с 1973', city: 'Bronx', img: 'mu_a_herc', text: 'Отец хип-хопа. Придумал повторять брейк на двух вертушках («merry-go-round»).' },
  { id: 'flash', name: 'Grandmaster Flash', years: 'с 1970-х', city: 'Bronx', img: 'mu_a_flash', text: 'Довёл диджеинг до искусства: скретч, точное сведение. Его группа — первая в Зале славы рок-н-ролла из хип-хопа (2007).' },
  { id: 'rundmc', name: 'Run-DMC', years: '1983–2002', city: 'Queens', img: 'mu_a_rundmc', text: 'Чёрные шляпы, кожаные куртки, adidas Superstar. Первые рэперы на MTV и первые, у кого был контракт с брендом кроссовок.' },
  { id: 'pac', name: '2Pac', years: '1971–1996', city: 'NYC → Oakland → LA', img: 'mu_a_pac', text: 'Поэт и бунтарь Западного побережья. Писал о бедности, полиции и надежде. Погиб в 25 лет в Лас-Вегасе.' },
  { id: 'biggie', name: 'The Notorious B.I.G.', years: '1972–1997', city: 'Brooklyn', img: 'mu_a_biggie', text: 'Biggie Smalls — голос Бруклина. Неторопливый флоу и истории «из грязи в князи». Погиб в 24 года.' },
  { id: 'nas', name: 'Nas', years: 'с 1991', city: 'Queens', img: 'mu_a_nas', text: 'Его дебют «Illmatic» (1994) часто называют лучшим рэп-альбомом в истории.' },
  { id: 'jayz', name: 'Jay-Z', years: 'с 1986', city: 'Brooklyn', img: 'mu_a_jayz', text: 'Из бруклинских Marcy Projects — в миллиардеры. Рэпер, бизнесмен, владелец лейбла и стримингового сервиса.' },
  { id: 'lauryn', name: 'Lauryn Hill', years: 'с 1990-х', city: 'New Jersey', img: 'mu_a_lauryn', text: 'Её единственный сольный альбом (1998) получил 5 «Грэмми», включая «Альбом года» — впервые для хип-хоп-альбома.' },
  { id: 'missy', name: 'Missy Elliott', years: 'с 1990-х', city: 'Virginia', img: 'mu_a_missy', text: 'Революционные клипы и звук. В 2023 году — первая женщина-рэпер в Зале славы рок-н-ролла.' },
  { id: 'outkast', name: 'OutKast', years: '1992–2007', city: 'Atlanta', img: 'mu_a_outkast', text: 'André 3000 и Big Boi доказали, что хип-хоп юга может быть умным и странным. Альбом года на «Грэмми» 2004.' },
  { id: 'em', name: 'Eminem', years: 'с 1996', city: 'Detroit', img: 'mu_a_em', text: 'Самый продаваемый рэпер 2000-х. Фильм «8 миля» (2002) — о рэп-баттлах Детройта; песня из него взяла «Оскар».' },
  { id: 'kendrick', name: 'Kendrick Lamar', years: 'с 2003', city: 'Compton, LA', img: 'mu_a_kendrick', text: 'Главный «рассказчик» современного рэпа. Пулитцеровская премия по музыке (2018). Хедлайнер Супербоула 2025.' },
];

export const TRACKS = [
  { title: "Rapper's Delight", artist: 'The Sugarhill Gang', year: 1979, img: 'mu_t_1', why: 'Первый рэп, попавший в хит-парады. 15 минут фанкового бита и историй.', en: [{ en: 'delight', ru: 'восторг, удовольствие' }] },
  { title: 'The Message', artist: 'Grandmaster Flash & the Furious Five', year: 1982, img: 'mu_t_2', why: 'Первый «серьёзный» рэп — о жизни в бедном районе, без вечеринок.', en: [{ en: 'message', ru: 'послание, сообщение' }] },
  { title: 'Walk This Way', artist: 'Run-DMC feat. Aerosmith', year: 1986, img: 'mu_t_3', why: 'Рэп + рок. Клип, где рэперы буквально ломают стену между жанрами, сделал хип-хоп мейнстримом.', en: [{ en: 'walk this way', ru: 'иди сюда / делай как я' }] },
  { title: 'Fight the Power', artist: 'Public Enemy', year: 1989, img: 'mu_t_4', why: 'Гимн протеста из фильма Спайка Ли «Делай как надо». Рэп как голос улицы.', en: [{ en: 'to fight the power', ru: 'бороться с системой' }] },
  { title: 'Juicy', artist: 'The Notorious B.I.G.', year: 1994, img: 'mu_t_5', why: 'Главная история «из грязи в князи» в хип-хопе. Гимн Бруклина.', en: [{ en: 'juicy', ru: 'сочный; классный (сленг)' }] },
  { title: 'California Love', artist: '2Pac feat. Dr. Dre', year: 1995, img: 'mu_t_6', why: 'Гимн Западного побережья: солнце, вечеринка, Калифорния.', en: [{ en: 'West Coast', ru: 'Западное побережье' }] },
  { title: 'Ms. Jackson', artist: 'OutKast', year: 2000, img: 'mu_t_7', why: 'Извинение перед мамой бывшей девушки. Юг показал, что рэп может быть нежным.', en: [{ en: 'apologize', ru: 'извиняться' }] },
  { title: 'Lose Yourself', artist: 'Eminem', year: 2002, img: 'mu_t_8', why: 'Первая рэп-песня, получившая «Оскар». О единственном шансе, который нельзя упустить.', en: [{ en: 'one shot', ru: 'один шанс' }, { en: 'to lose yourself', ru: 'отдаться полностью' }] },
  { title: 'Empire State of Mind', artist: 'Jay-Z feat. Alicia Keys', year: 2009, img: 'mu_t_9', why: 'Самый известный гимн Нью-Йорка XXI века. Его играют на стадионах и на Таймс-сквер.', en: [{ en: 'state of mind', ru: 'состояние души' }] },
  { title: 'Alright', artist: 'Kendrick Lamar', year: 2015, img: 'mu_t_10', why: 'Песня надежды, которую пели на протестах движения Black Lives Matter.', en: [{ en: "We gon' be alright", ru: 'у нас всё будет хорошо (разг.)' }] },
];

export const MUSIC_TIPS = [
  'Слушай треки с текстом на Genius.com: там каждую строчку объясняют фанаты — это отличный урок сленга.',
  'Выбирай clean version (без мата), если слушаешь при других людях.',
  'Рэп — сложный английский: быстрый, с диалектом (AAVE) и отсылками. Не расстраивайся, если понимаешь 20%. Начни с интервью рэперов — они говорят медленнее.',
  'Некоторые слова из рэпа (особенно n-word) — табу для тебя в реальной жизни, даже если звучат в каждой песне. См. карточку «Слова, которые нельзя никогда».',
];
