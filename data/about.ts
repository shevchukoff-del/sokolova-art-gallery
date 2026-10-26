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
    eyebrow: "Образование · I",
    title: "Училище памяти 1905 года",
    text: "Окончила Московское государственное академическое художественное училище памяти 1905 года — школу классического рисунка и живописной дисциплины.",
    sourceName: "ArtNow",
    sourceUrl: "https://artnow.ru/ru/artists/3/30069.html",
  },
  {
    year: "2000",
    eyebrow: "Образование · II",
    title: "Строгановская академия",
    text: "Завершила обучение на факультете графики Московской государственной художественно-промышленной академии имени С. Г. Строганова.",
    sourceName: "АРТ-клуб «Корабль»",
    sourceUrl: "https://artclub.team/sokolova",
  },
  {
    year: "2005",
    eyebrow: "Персональная выставка",
    title: "ЦДРИ, Москва",
    text: "Персональная выставка в Центральном доме работников искусств на Кузнецком мосту стала одной из первых зафиксированных самостоятельных презентаций художницы.",
    sourceName: "ArtNow",
    sourceUrl: "https://artnow.ru/ru/artists/3/30069.html",
  },
  {
    year: "2007—10",
    eyebrow: "Ярмарка",
    title: "Четыре года «Арт‑Москвы»",
    text: "Работы Екатерины Соколовой были представлены на международной художественной ярмарке «Арт‑Москва» четыре года подряд: в 2007, 2008, 2009 и 2010 годах.",
    sourceName: "The Art Newspaper Russia",
    sourceUrl: "https://www.theartnewspaper.ru/posts/472/",
  },
  {
    year: "2008",
    eyebrow: "Москва · Нью-Йорк",
    title: "Выход на публичные торги",
    text: "Картины художницы появились на торгах Phillips de Pury в Нью‑Йорке и аукционного дома «Совком» в Москве. Так началась её открытая аукционная история.",
    sourceName: "askART / Совком",
    sourceUrl: "https://askart.com/auction_records/Katya_Sokolova/11155100/Katya_Sokolova",
  },
  {
    year: "2013—25",
    eyebrow: "Публичная история",
    title: "Работы продолжают путь",
    text: "Публикации и аукционные каталоги фиксируют дальнейшую жизнь произведений — от обзоров российского арт‑рынка до торгов в Нью‑Йорке и Москве.",
    sourceName: "Выставки и публикации",
    sourceUrl: "/press/",
  },
];

export const biographySources = [
  { name: "Официальный сайт художницы", url: "https://sokolova-art.com/" },
  { name: "ArtNow — творческая биография", url: "https://artnow.ru/ru/artists/3/30069.html" },
  { name: "АРТ-клуб «Корабль» — профиль", url: "https://artclub.team/sokolova" },
  { name: "The Art Newspaper Russia", url: "https://www.theartnewspaper.ru/posts/472/" },
  { name: "Аукционный дом «Совком»", url: "https://sovcom.ru/avtory/s/sokolova-k/" },
] as const;
