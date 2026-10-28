export type AboutMilestone = {
  year: string;
  eyebrow: string;
  title: string;
  text: string;
  sourceName: string;
  sourceUrl: string;
};

export const aboutMilestones: AboutMilestone[] = [
  {
    year: "1975",
    eyebrow: "Москва",
    title: "Начало",
    text: "Екатерина Соколова родилась в Москве в семье художников. Город, его архитектура и ритм позднее стали одной из устойчивых тем её живописи.",
    sourceName: "ArtNow",
    sourceUrl: "https://artnow.ru/ru/artists/3/30069.html",
  },
  {
    year: "1996",
    eyebrow: "Образование",
    title: "Училище памяти 1905 года",
    text: "Окончила Московское государственное академическое художественное училище памяти 1905 года — школу классического рисунка и живописной дисциплины.",
    sourceName: "ArtNow",
    sourceUrl: "https://artnow.ru/ru/artists/3/30069.html",
  },
  {
    year: "2000",
    eyebrow: "Образование",
    title: "Строгановская академия",
    text: "Завершила обучение на факультете графики Московской государственной художественно-промышленной академии имени С. Г. Строганова.",
    sourceName: "АРТ-клуб «Корабль»",
    sourceUrl: "https://artclub.team/sokolova",
  },
  {
    year: "2005",
    eyebrow: "Персональная выставка",
    title: "ЦДРИ, Москва",
    text: "Персональная выставка в Центральном доме работников искусств на Кузнецком мосту стала одной из первых зафиксированных самостоятельных презентаций художника.",
    sourceName: "ArtNow",
    sourceUrl: "https://artnow.ru/ru/artists/3/30069.html",
  },
  {
    year: "2007",
    eyebrow: "Ярмарка",
    title: "Четыре года на «Арт‑Москве»",
    text: "С 2007 года работы Екатерины Соколовой четыре года подряд представлялись на международной художественной ярмарке «Арт‑Москва».",
    sourceName: "The Art Newspaper Russia",
    sourceUrl: "https://www.theartnewspaper.ru/posts/472/",
  },
  {
    year: "2008",
    eyebrow: "Москва · Нью-Йорк",
    title: "Выход на публичные торги",
    text: "Картины художника появились на торгах Phillips de Pury в Нью‑Йорке и аукционного дома «Совком» в Москве. Так началась её открытая аукционная история.",
    sourceName: "askART / Совком",
    sourceUrl: "https://askart.com/auction_records/Katya_Sokolova/11155100/Katya_Sokolova",
  },
  {
    year: "2013",
    eyebrow: "Арт-рынок",
    title: "Публичное признание",
    text: "Работы Екатерины Соколовой вошли в публичную историю российского арт‑рынка: результаты художника были отмечены в профессиональной прессе и аукционных обзорах.",
    sourceName: "Коммерсантъ FM",
    sourceUrl: "https://www.kommersant.ru/doc/2324903",
  },
  {
    year: "2021",
    eyebrow: "Нью-Йорк",
    title: "Возвращение на международные торги",
    text: "Картина «Young Woman and the Sea» была представлена на торгах Shapiro Auctions в Нью‑Йорке, продолжив международную аукционную историю художника.",
    sourceName: "Bidsquare / Shapiro Auctions",
    sourceUrl: "https://www.bidsquare.com/online-auctions/shapiro/katya-sokolova-russian-b-1975-2323202",
  },
  {
    year: "2024",
    eyebrow: "Аукционный каталог",
    title: "«Южный пейзаж»",
    text: "Акварель «Южный пейзаж» была включена в каталог московских торгов, показывая продолжающийся интерес к работам разных периодов.",
    sourceName: "Bidspirit / Moscow Trading",
    sourceUrl: "https://ru.bidspirit.com/ui/lotPage/moscowtrading/source/catalog/auction/44756/lot/33404/view",
  },
  {
    year: "2025—26",
    eyebrow: "Текущая практика",
    title: "Живопись, предметы, пространства",
    text: "Сегодня Екатерина продолжает работать с живописью и графикой, развивает авторские принты для текстиля и предметов и создаёт росписи для интерьеров.",
    sourceName: "Каталог работ",
    sourceUrl: "/works/",
  },
];

export const biographySources = [
  { name: "Официальный сайт художника", url: "https://sokolova-art.com/" },
  { name: "ArtNow — творческая биография", url: "https://artnow.ru/ru/artists/3/30069.html" },
  { name: "АРТ-клуб «Корабль» — профиль", url: "https://artclub.team/sokolova" },
  { name: "The Art Newspaper Russia", url: "https://www.theartnewspaper.ru/posts/472/" },
  { name: "Аукционный дом «Совком»", url: "https://sovcom.ru/avtory/s/sokolova-k/" },
] as const;
