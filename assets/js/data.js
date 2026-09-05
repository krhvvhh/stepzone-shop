/* ============================================================
   STEPZONE — резервна база товарів.
   Основне джерело даних — data/products.json (завантажується через fetch).
   Цей файл використовується як fallback, якщо сайт відкрито
   напряму з файлу (file://), де fetch до локального JSON заборонений.
   ============================================================ */

window.STEPZONE_PRODUCTS = [
  {
    id: "nike-air-max-97",
    name: "Nike Air Max 97 Silver Bullet",
    brand: "Nike",
    category: "lifestyle",
    gender: "unisex",
    price: 7490, oldPrice: 8990,
    rating: 4.8, reviews: 214,
    badge: "sale",
    colors: ["Срібний", "Чорний"],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_6310bed3-40b3-4fea-b1ed-184668727557_3840x.jpg?v=1735879315",
      "assets/img/nike-air-max-97-1.svg"
    ],
    description: "Легендарний силует 1997 року з наскрізною повітряною подушкою Max Air по всій довжині підошви. Хвилястий дизайн верху натхненний японськими швидкісними потягами.",
    specs: { "Верх": "Синтетика + сітка", "Підошва": "Гума / Max Air", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 12, createdAt: "2026-05-14", popular: true
  },
  {
    id: "nike-dunk-low-panda",
    name: "Nike Dunk Low Retro Panda",
    brand: "Nike",
    category: "lifestyle",
    gender: "unisex",
    price: 6290, oldPrice: null,
    rating: 4.9, reviews: 512,
    badge: "hit",
    colors: ["Чорно-білий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    images: [
      "https://www.dtlr.com/cdn/shop/files/HF5441-100_1200x1200.jpg?v=1735768724",
      "assets/img/nike-dunk-low-panda-1.svg"
    ],
    description: "Найпопулярніша розцвітка Dunk за останні роки. Класична баскетбольна форма 1985 року, шкіряний верх і чіткий чорно-білий блок — працює під будь-який образ.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "В'єтнам" },
    stock: 8, createdAt: "2026-06-02", popular: true
  },
  {
    id: "nike-air-force-1",
    name: "Nike Air Force 1 '07 Triple White",
    brand: "Nike",
    category: "lifestyle",
    gender: "unisex",
    price: 5490, oldPrice: null,
    rating: 4.9, reviews: 903,
    badge: "hit",
    colors: ["Білий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
      "assets/img/nike-air-force-1-1.svg"
    ],
    description: "Кросівки, які не виходять з моди з 1982 року. Повнозерниста шкіра, подушка Nike Air у п'яті та впізнаваний контур — базова пара в будь-якому гардеробі.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума / Nike Air", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "Індонезія" },
    stock: 25, createdAt: "2026-03-11", popular: true
  },
  {
    id: "nike-pegasus-41",
    name: "Nike Air Zoom Pegasus 41",
    brand: "Nike",
    category: "running",
    gender: "men",
    price: 6890, oldPrice: 7790,
    rating: 4.7, reviews: 168,
    badge: "sale",
    colors: ["Білий", "Чорний"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_10d73d48-0aa5-4d2e-b930-de7cfe1bf4d6_3840x.jpg",
      "assets/img/nike-pegasus-41-1.svg"
    ],
    description: "Робочий кінь щоденних пробіжок. Піна ReactX повертає більше енергії й нагрівається менше, а дві вставки Zoom Air додають відповіді на кожному кроці.",
    specs: { "Верх": "Інженерна сітка", "Підошва": "ReactX + Zoom Air", "Дроп": "10 мм", "Вага": "281 г", "Сезон": "Всесезон" },
    stock: 15, createdAt: "2026-04-20", popular: true
  },
  {
    id: "nike-vaporfly-3",
    name: "Nike ZoomX Vaporfly Next% 3",
    brand: "Nike",
    category: "running",
    gender: "unisex",
    price: 12990, oldPrice: null,
    rating: 4.9, reviews: 87,
    badge: "new",
    colors: ["Молочний", "Помаранчевий"],
    sizes: [40, 41, 42, 43, 44, 45],
    images: [
      "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_fe76d246-ca0c-42ef-b012-0e105c0ef0ca_3840x.jpg?v=1739576822",
      "assets/img/nike-vaporfly-3-1.svg"
    ],
    description: "Змагальні марафонки з карбоновою пластиною Flyplate і піною ZoomX. Верх Flyknit майже нічого не важить і швидко відводить вологу.",
    specs: { "Верх": "Flyknit", "Підошва": "ZoomX + карбон", "Дроп": "8 мм", "Вага": "196 г", "Призначення": "Змагання" },
    stock: 5, createdAt: "2026-07-30", popular: false
  },
  {
    id: "jordan-1-retro-high",
    name: "Air Jordan 1 Retro High OG Chicago",
    brand: "Jordan",
    category: "basketball",
    gender: "unisex",
    price: 9990, oldPrice: null,
    rating: 5.0, reviews: 431,
    badge: "hit",
    colors: ["Червоно-білий"],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_20547cf0-313d-492e-841b-19bc12ed1281_3840x.jpg?v=1717156718",
      "assets/img/jordan-1-retro-high-1.svg"
    ],
    description: "Та сама пара, з якої почалася історія Jordan Brand у 1985-му. Преміальна шкіра, високий силует і найвпізнаваніша розцвітка в історії кросівок.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума / Air-Sole", "Висота": "High", "Сезон": "Демісезон", "Країна": "Китай" },
    stock: 4, createdAt: "2026-05-28", popular: true
  },
  {
    id: "jordan-4-retro",
    name: "Air Jordan 4 Retro Military Black",
    brand: "Jordan",
    category: "basketball",
    gender: "men",
    price: 11490, oldPrice: 12900,
    rating: 4.8, reviews: 156,
    badge: "sale",
    colors: ["Білий", "Чорний"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_ac22706b-f97a-4f10-8fe4-2b6da5ac172e_3840x.jpg?v=1708349155",
      "assets/img/jordan-4-retro-1.svg"
    ],
    description: "Четверта модель Jordan з фірмовими сітчастими вставками і пластиковими «крилами». Один із найзбалансованіших силуетів лінійки.",
    specs: { "Верх": "Шкіра + сітка", "Підошва": "Гума / Air-Sole", "Висота": "Mid", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 6, createdAt: "2026-06-18", popular: true
  },
  {
    id: "adidas-samba-og",
    name: "adidas Samba OG",
    brand: "Adidas",
    category: "retro",
    gender: "unisex",
    price: 5290, oldPrice: null,
    rating: 4.8, reviews: 640,
    badge: "hit",
    colors: ["Білий", "Чорний"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_50399fd1-c666-476e-89f8-3b6ddf86663f_1920x.jpg?v=1705302514",
      "assets/img/adidas-samba-og-1.svg"
    ],
    description: "Футбольна класика 1950-х, що стала головним лайфстайл-силуетом останніх сезонів. Низький профіль, замшевий носок і гумова підошва «gum».",
    specs: { "Верх": "Шкіра + замша", "Підошва": "Гума gum", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "Індонезія" },
    stock: 20, createdAt: "2026-04-02", popular: true
  },
  {
    id: "adidas-gazelle",
    name: "adidas Gazelle Indoor",
    brand: "Adidas",
    category: "retro",
    gender: "women",
    price: 4990, oldPrice: 5690,
    rating: 4.7, reviews: 289,
    badge: "sale",
    colors: ["Бордовий", "Синій"],
    sizes: [36, 37, 38, 39, 40, 41, 42],
    images: [
      "https://assets.adidas.com/images/w_840,f_auto,q_auto/d4c22fed85b3401ab8392eca269c9575_9366/Gazelle_Indoor_Shoes_Burgundy_JH5403_01_standard.jpg",
      "assets/img/adidas-gazelle-1.svg"
    ],
    description: "Замшевий верх, контрастні смуги й вузький силует. Модель, яку носили всі — від спортсменів 70-х до сучасних it-girls.",
    specs: { "Верх": "Замша", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 14, createdAt: "2026-05-05", popular: true
  },
  {
    id: "adidas-ultraboost-5",
    name: "adidas Ultraboost 5",
    brand: "Adidas",
    category: "running",
    gender: "unisex",
    price: 8490, oldPrice: null,
    rating: 4.6, reviews: 197,
    badge: "new",
    colors: ["Чорний", "Сірий"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://assets.adidas.com/images/w_840,f_auto,q_auto/daf00970826441cc887c069e9b65bb4b_9366/Ultraboost_5_Shoes_Black_ID8847_HM1.jpg",
      "assets/img/adidas-ultraboost-5-1.svg"
    ],
    description: "Найм'якіша піна BOOST і адаптивний верх Primeknit. Однаково добре працює і на пробіжці, і на 15 тисячах кроків по місту.",
    specs: { "Верх": "Primeknit", "Підошва": "BOOST + Continental", "Дроп": "10 мм", "Вага": "310 г", "Сезон": "Всесезон" },
    stock: 11, createdAt: "2026-07-12", popular: true
  },
  {
    id: "adidas-campus-00s",
    name: "adidas Campus 00s",
    brand: "Adidas",
    category: "retro",
    gender: "unisex",
    price: 5590, oldPrice: null,
    rating: 4.7, reviews: 312,
    badge: null,
    colors: ["Сірий", "Зелений"],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    images: [
      "https://assets.adidas.com/images/w_840,f_auto,q_auto/ce738cbe5342421996feaf5001044964_9366/Campus_00s_Shoes_Grey_HQ8707_01_standard.jpg",
      "assets/img/adidas-campus-00s-1.svg"
    ],
    description: "Масивна замшева версія баскетбольного Campus у стилі нульових. Товста підошва, широкий носок, максимально впізнаваний вайб.",
    specs: { "Верх": "Замша", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "Індонезія" },
    stock: 17, createdAt: "2026-06-25", popular: false
  },
  {
    id: "nb-530",
    name: "New Balance 530 White Silver",
    brand: "New Balance",
    category: "lifestyle",
    gender: "unisex",
    price: 5190, oldPrice: null,
    rating: 4.7, reviews: 388,
    badge: "hit",
    colors: ["Білий", "Срібний", "Синій"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    images: [
      "https://www.mjfootwear.com/cdn/shop/files/new-balance-530-mens-sneakers-white-navy-silver-mr530sg-1_5000x.jpg?v=1716309428",
      "assets/img/nb-530-1.svg"
    ],
    description: "Ретро-ранери 90-х з амортизацією ABZORB. Легкі, з великим логотипом N і сріблястими вставками — найпопулярніша модель NB в Україні.",
    specs: { "Верх": "Сітка + синтетика", "Підошва": "ABZORB", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "В'єтнам" },
    stock: 22, createdAt: "2026-03-29", popular: true
  },
  {
    id: "nb-9060",
    name: "New Balance 9060 Sea Salt",
    brand: "New Balance",
    category: "lifestyle",
    gender: "unisex",
    price: 8290, oldPrice: 9290,
    rating: 4.8, reviews: 176,
    badge: "sale",
    colors: ["Бежевий", "Сірий"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://nb.scene7.com/is/image/NB/u9060eca_nb_02_i?$pdpflexf2$&wid=1000&hei=1000",
      "assets/img/nb-9060-1.svg"
    ],
    description: "Футуристичне переосмислення лінійки 99X. Хвилясті панелі, масивна підошва ABZORB SBS і нейтральна палітра, яка пасує до всього.",
    specs: { "Верх": "Сітка + замша", "Підошва": "ABZORB SBS", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 9, createdAt: "2026-06-08", popular: true
  },
  {
    id: "nb-1906r",
    name: "New Balance 1906R Protection Pack",
    brand: "New Balance",
    category: "lifestyle",
    gender: "men",
    price: 8990, oldPrice: null,
    rating: 4.8, reviews: 121,
    badge: "new",
    colors: ["Сірий", "Чорний"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://www.dtlr.com/cdn/shop/files/NB_U1906RSB_M014.jpg?v=1744751929",
      "assets/img/nb-1906r-1.svg"
    ],
    description: "Технологічний силует 2010 року у сучасному прочитанні: N-ergy, ABZORB SBS і стабілізатор Stability Web під п'ятою.",
    specs: { "Верх": "Сітка + TPU", "Підошва": "ABZORB / N-ergy", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "В'єтнам" },
    stock: 7, createdAt: "2026-07-21", popular: false
  },
  {
    id: "nb-fuelcell-rebel",
    name: "New Balance FuelCell Rebel v4",
    brand: "New Balance",
    category: "running",
    gender: "women",
    price: 6990, oldPrice: null,
    rating: 4.6, reviews: 94,
    badge: null,
    colors: ["Бежевий", "Білий"],
    sizes: [36, 37, 38, 39, 40, 41],
    images: [
      "https://runpacers.com/cdn/shop/files/Mens-New-Balance-FuelCell-Rebel-v4-Clay-Ash-White-Black.jpg?v=1730827256",
      "assets/img/nb-fuelcell-rebel-1.svg"
    ],
    description: "Легкі темпові кросівки з піною FuelCell. Ідеальні для інтервалів і швидких пробіжок до 15 км.",
    specs: { "Верх": "Інженерна сітка", "Підошва": "FuelCell", "Дроп": "6 мм", "Вага": "212 г", "Призначення": "Темпові" },
    stock: 13, createdAt: "2026-05-19", popular: false
  },
  {
    id: "asics-gel-1130",
    name: "ASICS GEL-1130 White Clay Canyon",
    brand: "ASICS",
    category: "retro",
    gender: "unisex",
    price: 5890, oldPrice: 6590,
    rating: 4.7, reviews: 254,
    badge: "sale",
    colors: ["Білий", "Бежевий"],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://feature.com/cdn/shop/files/Gel-1130-White-ClayCanyon-1201A256-113-1.jpg?v=1776095982",
      "assets/img/asics-gel-1130-1.svg"
    ],
    description: "Y2K-силует, що повернувся у велику моду. Сітчастий верх, срібні накладки й видима вставка GEL у п'яті.",
    specs: { "Верх": "Сітка + синтетика", "Підошва": "GEL / EVA", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 16, createdAt: "2026-04-27", popular: true
  },
  {
    id: "asics-nimbus-27",
    name: "ASICS GEL-Nimbus 27",
    brand: "ASICS",
    category: "running",
    gender: "men",
    price: 9290, oldPrice: null,
    rating: 4.9, reviews: 143,
    badge: "new",
    colors: ["Синій", "Сірий"],
    sizes: [40, 41, 42, 43, 44, 45, 46, 47],
    images: [
      "https://cdn.shopify.com/s/files/1/0129/6942/files/Asics-Mens-Gel-Nimbus-27-Indigo-Fog-Denim-Blue7_1200x.jpg",
      "assets/img/asics-nimbus-27-1.svg"
    ],
    description: "Найм'якіші кросівки ASICS для довгих дистанцій. Піна FF BLAST PLUS ECO і чашка PureGEL гасять удар навіть на 30-му кілометрі.",
    specs: { "Верх": "Інженерне плетіння", "Підошва": "FF BLAST+ / PureGEL", "Дроп": "8 мм", "Вага": "300 г", "Призначення": "Довгі дистанції" },
    stock: 10, createdAt: "2026-08-01", popular: true
  },
  {
    id: "puma-palermo",
    name: "PUMA Palermo Leather",
    brand: "Puma",
    category: "retro",
    gender: "unisex",
    price: 4390, oldPrice: 4990,
    rating: 4.5, reviews: 208,
    badge: "sale",
    colors: ["Зелений", "Білий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44],
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/396463/63/sv01/fnd/AUS/fmt/png/Palermo-Unisex-Sneakers",
      "assets/img/puma-palermo-1.svg"
    ],
    description: "Терасна класика 80-х: замшевий верх, товста підошва gum і фірмова Formstrip. Головний конкурент Samba за меншу ціну.",
    specs: { "Верх": "Замша + шкіра", "Підошва": "Гума gum", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 19, createdAt: "2026-05-09", popular: true
  },
  {
    id: "puma-speedcat",
    name: "PUMA Speedcat OG",
    brand: "Puma",
    category: "lifestyle",
    gender: "women",
    price: 4790, oldPrice: null,
    rating: 4.6, reviews: 167,
    badge: "hit",
    colors: ["Чорний", "Білий"],
    sizes: [36, 37, 38, 39, 40, 41],
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_2000,h_2000/global/398846/01/sv01/fnd/PNA/fmt/png/Speedcat-OG-Sneakers",
      "assets/img/puma-speedcat-1.svg"
    ],
    description: "Гоночний силует з архіву Формули-1. Ультранизький профіль, замша й тонка підошва — найголовніший тренд сезону.",
    specs: { "Верх": "Замша", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 8, createdAt: "2026-07-04", popular: true
  },
  {
    id: "puma-deviate-nitro-3",
    name: "PUMA Deviate NITRO 3",
    brand: "Puma",
    category: "running",
    gender: "unisex",
    price: 8790, oldPrice: null,
    rating: 4.7, reviews: 76,
    badge: "new",
    colors: ["Чорний", "Помаранчевий"],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://image.goat.com/transform/v1/attachments/product_template_pictures/images/103/583/252/original/309707_02.png.png?width=750",
      "assets/img/puma-deviate-nitro-3-1.svg"
    ],
    description: "Карбонова пластина PWRPLATE у поєднанні з піною NITROFOAM Elite. Універсальні марафонки для тренувань і стартів.",
    specs: { "Верх": "ULTRAWEAVE", "Підошва": "NITROFOAM + карбон", "Дроп": "8 мм", "Вага": "245 г", "Призначення": "Змагання" },
    stock: 6, createdAt: "2026-07-28", popular: false
  },
  {
    id: "converse-chuck-70",
    name: "Converse Chuck 70 High Top",
    brand: "Converse",
    category: "retro",
    gender: "unisex",
    price: 3690, oldPrice: null,
    rating: 4.6, reviews: 522,
    badge: null,
    colors: ["Чорний", "Кремовий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw10f77af3/images/a_107/162050C_A_107X1.jpg?sw=1200",
      "assets/img/converse-chuck-70-1.svg"
    ],
    description: "Преміальна версія легендарних кедів: щільніше полотно, вища гумова смуга й товстіша устілка OrthoLite.",
    specs: { "Верх": "Канвас", "Підошва": "Вулканізована гума", "Висота": "High", "Сезон": "Літо / демісезон", "Країна": "В'єтнам" },
    stock: 24, createdAt: "2026-03-18", popular: true
  },
  {
    id: "converse-run-star",
    name: "Converse Run Star Hike Platform",
    brand: "Converse",
    category: "lifestyle",
    gender: "women",
    price: 4890, oldPrice: 5490,
    rating: 4.5, reviews: 189,
    badge: "sale",
    colors: ["Чорний", "Білий"],
    sizes: [36, 37, 38, 39, 40, 41],
    images: [
      "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwabd90c97/images/a_107/166800C_A_107X1.jpg?sw=1200",
      "assets/img/converse-run-star-1.svg"
    ],
    description: "Chuck Taylor на рифленій платформі. +4 см зросту й характер, який складно не помітити.",
    specs: { "Верх": "Канвас", "Підошва": "Платформа, гума", "Висота": "High", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 12, createdAt: "2026-06-13", popular: false
  },
  {
    id: "vans-old-skool",
    name: "Vans Old Skool Classic",
    brand: "Vans",
    category: "lifestyle",
    gender: "unisex",
    price: 3290, oldPrice: null,
    rating: 4.7, reviews: 674,
    badge: "hit",
    colors: ["Чорно-білий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://assets.vans.com/images/t_img/c_fill,g_center,f_auto,h_2500,w_2000/v1747942442/VN000D3HY28-HERO/Old-Skool-Shoe-VANS-Black-White-HERO.png",
      "assets/img/vans-old-skool-1.svg"
    ],
    description: "Перша модель Vans із фірмовою бічною смугою Sidestripe. Замша, канвас і вафельна підошва, яка тримає на будь-якій поверхні.",
    specs: { "Верх": "Замша + канвас", "Підошва": "Вафельна гума", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "В'єтнам" },
    stock: 28, createdAt: "2026-02-25", popular: true
  },
  {
    id: "vans-knu-skool",
    name: "Vans Knu Skool Bold",
    brand: "Vans",
    category: "retro",
    gender: "unisex",
    price: 3890, oldPrice: 4390,
    rating: 4.4, reviews: 132,
    badge: "sale",
    colors: ["Синій", "Білий"],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44],
    images: [
      "https://assets.vans.com/images/t_img/c_fill,g_center,f_auto,h_2500,w_2000/v1740726744/VN0009QCNWD-HERO/Knu-Skool-Shoe-VANS-NavyTrue-White-HERO.png",
      "assets/img/vans-knu-skool-1.svg"
    ],
    description: "Пухка версія Old Skool із 90-х: товсті шнурки, роздутий язик і збільшена Sidestripe.",
    specs: { "Верх": "Замша + канвас", "Підошва": "Вафельна гума", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 15, createdAt: "2026-05-31", popular: false
  },
  {
    id: "reebok-club-c-85",
    name: "Reebok Club C 85 Vintage",
    brand: "Reebok",
    category: "retro",
    gender: "unisex",
    price: 3490, oldPrice: null,
    rating: 4.5, reviews: 241,
    badge: null,
    colors: ["Білий", "Зелений"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/092/466/993/original/1258969_01.jpg.jpeg?width=750",
      "assets/img/reebok-club-c-85-1.svg"
    ],
    description: "Тенісна класика 1985 року в мінімалістичному виконанні. М'яка шкіра, вінтажний відтінок підошви й нічого зайвого.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "В'єтнам" },
    stock: 21, createdAt: "2026-04-09", popular: false
  },
  {
    id: "reebok-nano-x5",
    name: "Reebok Nano X5 Training",
    brand: "Reebok",
    category: "training",
    gender: "men",
    price: 6190, oldPrice: 6990,
    rating: 4.6, reviews: 98,
    badge: "sale",
    colors: ["Чорний", "Сірий"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/110/072/221/original/1539732_01.jpg.jpeg?width=750",
      "assets/img/reebok-nano-x5-1.svg"
    ],
    description: "Кросівки №1 для кросфіту. Жорстка стабільна п'ята для присідів, гнучкий носок для стрибків і посилені боковини для канату.",
    specs: { "Верх": "Flexweave", "Підошва": "Floatride Energy Foam", "Дроп": "7 мм", "Вага": "295 г", "Призначення": "Кросфіт" },
    stock: 9, createdAt: "2026-06-20", popular: false
  },
  {
    id: "salomon-xt-6",
    name: "Salomon XT-6 Gore-Tex",
    brand: "Salomon",
    category: "trail",
    gender: "unisex",
    price: 10490, oldPrice: null,
    rating: 4.8, reviews: 112,
    badge: "new",
    colors: ["Чорний", "Сірий"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://cdn.dam.salomon.com/b0fff940-2909-4454-a498-b2f401614dd6/L41086600/PNG-2000px-max-72dpi.png",
      "assets/img/salomon-xt-6-1.svg"
    ],
    description: "Трейловий силует, що став іконою техвіру. Мембрана Gore-Tex, швидка шнурівка Quicklace і агресивний протектор Contagrip.",
    specs: { "Верх": "Сітка + Gore-Tex", "Підошва": "Contagrip", "Дроп": "9 мм", "Вага": "365 г", "Сезон": "Всесезон" },
    stock: 7, createdAt: "2026-07-16", popular: true
  },
  {
    id: "salomon-speedcross-6",
    name: "Salomon Speedcross 6",
    brand: "Salomon",
    category: "trail",
    gender: "men",
    price: 7690, oldPrice: 8490,
    rating: 4.7, reviews: 134,
    badge: "sale",
    colors: ["Синій", "Чорний"],
    sizes: [40, 41, 42, 43, 44, 45, 46, 47],
    images: [
      "https://cdn.dam.salomon.com/28eca41b-3f94-4420-a337-b31b00b7ca32/L49145100/PNG-2000px-max-72dpi.png",
      "assets/img/salomon-speedcross-6-1.svg"
    ],
    description: "Еталон бігу по багнюці. Глибокі 5-міліметрові ґрунтозачепи, щільна посадка SensiFit і захист носка від каміння.",
    specs: { "Верх": "Синтетика", "Підошва": "Contagrip TA", "Дроп": "10 мм", "Вага": "300 г", "Призначення": "Трейл" },
    stock: 11, createdAt: "2026-05-24", popular: false
  },
  {
    id: "nike-metcon-10",
    name: "Nike Metcon 10",
    brand: "Nike",
    category: "training",
    gender: "women",
    price: 6590, oldPrice: null,
    rating: 4.6, reviews: 88,
    badge: null,
    colors: ["Чорний", "Білий"],
    sizes: [36, 37, 38, 39, 40, 41],
    images: [
      "https://static.nike.com/a/images/t_default/u_9ddf04c7-2a9a-4d76-add1-d15af8f0263d,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5709c27f-742f-4236-93c5-fd398cde51f9/M+NIKE+METCON+10.png",
      "assets/img/nike-metcon-10-1.svg"
    ],
    description: "Стабільна платформа Hyperlift для важких присідань і знімна вставка під різні типи тренувань.",
    specs: { "Верх": "Сітка + TPU", "Підошва": "Гума / Hyperlift", "Дроп": "4 мм", "Вага": "270 г", "Призначення": "Зал" },
    stock: 14, createdAt: "2026-06-30", popular: false
  },
  {
    id: "adidas-forum-low",
    name: "adidas Forum Low CL",
    brand: "Adidas",
    category: "basketball",
    gender: "unisex",
    price: 4690, oldPrice: 5290,
    rating: 4.5, reviews: 203,
    badge: "sale",
    colors: ["Білий", "Синій"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://assets.adidas.com/images/w_840,f_auto,q_auto/836f18ee57e441d8938aaf1201323358_9366/Forum_Low_CL_Shoes_White_ID6858_01_standard.jpg",
      "assets/img/adidas-forum-low-1.svg"
    ],
    description: "Баскетбольна модель 1984 року з фірмовим ремінцем на щиколотці. Шкіряний верх і чистий білий блок.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума", "Застібка": "Шнурівка + ремінець", "Сезон": "Всесезон", "Країна": "Індонезія" },
    stock: 18, createdAt: "2026-04-15", popular: false
  },
  {
    id: "nike-air-max-dn",
    name: "Nike Air Max Dn Rebel",
    brand: "Nike",
    category: "lifestyle",
    gender: "unisex",
    price: 7990, oldPrice: null,
    rating: 4.6, reviews: 109,
    badge: "new",
    colors: ["Сірий", "Синій"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://cdn.shopify.com/s/files/1/0603/3031/1875/files/main-square_756ef1ee-ac5e-4327-959e-39b90ff339cf_3840x.jpg?v=1710497593",
      "assets/img/nike-air-max-dn-1.svg"
    ],
    description: "Система Dynamic Air із чотирьох камер під різним тиском. Відчуття, ніби йдеш по пружині — і футуристичний вигляд у комплекті.",
    specs: { "Верх": "Сітка + синтетика", "Підошва": "Dynamic Air", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 10, createdAt: "2026-08-05", popular: true
  },
  {
    id: "jordan-1-low",
    name: "Air Jordan 1 Low SE Craft",
    brand: "Jordan",
    category: "lifestyle",
    gender: "unisex",
    price: 6890, oldPrice: 7590,
    rating: 4.7, reviews: 174,
    badge: "sale",
    colors: ["Бежевий", "Коричневий"],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/100/306/473/original/1408469_01.jpg.jpeg?width=750",
      "assets/img/jordan-1-low-1.svg"
    ],
    description: "Низька версія AJ1 у ремісничій обробці: комбінація замші, нубуку й текстилю в теплих землистих тонах.",
    specs: { "Верх": "Замша + нубук", "Підошва": "Гума / Air-Sole", "Висота": "Low", "Сезон": "Демісезон", "Країна": "Китай" },
    stock: 13, createdAt: "2026-07-09", popular: false
  },
  {
    id: "nike-air-max-90",
    name: "Nike Air Max 90",
    brand: "Nike",
    category: "lifestyle",
    gender: "unisex",
    price: 6690, oldPrice: 7490,
    rating: 4.8, reviews: 342,
    badge: "sale",
    colors: ["Білий", "Сірий", "Червоний"],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b72ed14d-f0e6-4f26-89bc-5cf567f874ae/AIR+MAX+90.png",
      "assets/img/nike-air-max-90-1.svg"
    ],
    description: "Силует 1990 року, який зробив видиму подушку Air нормою. Замшеві накладки, класичний блок кольорів і підошва Waffle.",
    specs: { "Верх": "Шкіра + замша + сітка", "Підошва": "Гума / Max Air", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 18, createdAt: "2026-04-06", popular: true
  },
  {
    id: "nike-cortez",
    name: "Nike Cortez Leather",
    brand: "Nike",
    category: "retro",
    gender: "women",
    price: 4290, oldPrice: null,
    rating: 4.6, reviews: 198,
    badge: null,
    colors: ["Білий", "Червоний"],
    sizes: [36, 37, 38, 39, 40, 41],
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/464ab3ac-0dc0-4fd0-84bd-eae123a2db18/NIKE+CORTEZ.png",
      "assets/img/nike-cortez-1.svg"
    ],
    description: "Перша бігова модель Nike 1972 року. Тонкий силует, шкіряний верх і клиноподібна п'ята — та сама пара з «Форреста Гампа».",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Літо / демісезон", "Країна": "В'єтнам" },
    stock: 14, createdAt: "2026-03-22", popular: false
  },
  {
    id: "nike-blazer-mid-77",
    name: "Nike Blazer Mid '77 Vintage",
    brand: "Nike",
    category: "retro",
    gender: "unisex",
    price: 4890, oldPrice: null,
    rating: 4.7, reviews: 276,
    badge: null,
    colors: ["Білий", "Чорний"],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/099/439/682/original/502784_01.jpg.jpeg",
      "assets/img/nike-blazer-mid-77-1.svg"
    ],
    description: "Баскетбольна модель 1977 року з навмисно зістареною підошвою. Високий силует, шкіра й вінтажний свуш із контрастною строчкою.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума", "Висота": "Mid", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 21, createdAt: "2026-04-30", popular: true
  },
  {
    id: "nike-p-6000",
    name: "Nike P-6000",
    brand: "Nike",
    category: "lifestyle",
    gender: "unisex",
    price: 5490, oldPrice: null,
    rating: 4.5, reviews: 154,
    badge: "new",
    colors: ["Срібний", "Білий"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f8b7f4fd-ffa8-47b9-bb71-b5fbf9284a7e/WMNS+NIKE+P-6000.png",
      "assets/img/nike-p-6000-1.svg"
    ],
    description: "Мікс бігових Pegasus початку 2000-х. Металеві накладки, сітчастий верх і той самий Y2K-вигляд, який знову в моді.",
    specs: { "Верх": "Сітка + синтетика", "Підошва": "Гума / Air", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 12, createdAt: "2026-07-25", popular: true
  },
  {
    id: "nike-vomero-18",
    name: "Nike Vomero 18",
    brand: "Nike",
    category: "running",
    gender: "men",
    price: 7990, oldPrice: null,
    rating: 4.8, reviews: 122,
    badge: "new",
    colors: ["Чорний", "Молочний"],
    sizes: [40, 41, 42, 43, 44, 45, 46, 47],
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b8b41695-e592-471f-9f77-166e14969695/NIKE+VOMERO+18.png",
      "assets/img/nike-vomero-18-1.svg"
    ],
    description: "Найм'якіші бігові Nike. Подвійний шар піни ZoomX і ReactX гасить удар на довгих спокійних кілометрах.",
    specs: { "Верх": "Інженерна сітка", "Підошва": "ZoomX + ReactX", "Дроп": "10 мм", "Вага": "323 г", "Призначення": "Довгі дистанції" },
    stock: 9, createdAt: "2026-08-08", popular: false
  },
  {
    id: "jordan-3-retro",
    name: "Air Jordan 3 Retro White Cement",
    brand: "Jordan",
    category: "basketball",
    gender: "men",
    price: 10990, oldPrice: null,
    rating: 4.9, reviews: 263,
    badge: "hit",
    colors: ["Білий", "Сірий"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://media.sivasdescalzo.com/media/catalog/product/D/N/DN3707-100_sivasdescalzo-Jordan-AIR_JORDAN_3_RETRO-1677844256-1.jpg",
      "assets/img/jordan-3-retro-1.svg"
    ],
    description: "Модель, яка врятувала контракт Джордана з Nike у 1988-му. Слонячий принт, видима подушка Air і перша поява логотипа Jumpman.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума / Air-Sole", "Висота": "Mid", "Сезон": "Демісезон", "Країна": "Китай" },
    stock: 5, createdAt: "2026-06-05", popular: true
  },
  {
    id: "jordan-11-concord",
    name: "Air Jordan 11 Retro Concord",
    brand: "Jordan",
    category: "basketball",
    gender: "unisex",
    price: 12490, oldPrice: null,
    rating: 5, reviews: 389,
    badge: "hit",
    colors: ["Білий", "Чорний"],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/113/209/308/original/351614_01.jpg.jpeg",
      "assets/img/jordan-11-concord-1.svg"
    ],
    description: "Найвідоміша пара лінійки: лакована шкіра, вуглецева пластина в підошві й прозора гума. Та сама, у якій грали сезон 72-10.",
    specs: { "Верх": "Балістичний нейлон + лак", "Підошва": "Прозора гума / карбон", "Висота": "High", "Сезон": "Демісезон", "Країна": "Китай" },
    stock: 4, createdAt: "2026-07-02", popular: true
  },
  {
    id: "adidas-superstar",
    name: "adidas Superstar",
    brand: "Adidas",
    category: "retro",
    gender: "unisex",
    price: 4590, oldPrice: null,
    rating: 4.7, reviews: 812,
    badge: null,
    colors: ["Білий", "Чорний"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://media.sivasdescalzo.com/media/catalog/product/E/G/EG4958_sivasdescalzo-adidas-SUPERSTAR-1574864037-1.jpg",
      "assets/img/adidas-superstar-1.svg"
    ],
    description: "Гумовий «мушлевий» носок, який у 1969-му придумали для баскетболу, а потім носив увесь хіп-хоп. Найвпізнаваніша пара adidas.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "Індонезія" },
    stock: 26, createdAt: "2026-03-05", popular: true
  },
  {
    id: "adidas-stan-smith",
    name: "adidas Stan Smith",
    brand: "Adidas",
    category: "retro",
    gender: "unisex",
    price: 4190, oldPrice: 4790,
    rating: 4.6, reviews: 905,
    badge: "sale",
    colors: ["Білий", "Зелений"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/69721f2e7c934d909168a80e00818569_9366/Stan_Smith_Shoes_White_M20324_01_standard.jpg",
      "assets/img/adidas-stan-smith-1.svg"
    ],
    description: "Найпродаваніші кросівки в історії — понад 50 мільйонів пар. Мінімалістична шкіра, перфоровані смуги й зелена п'ята.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "Індонезія" },
    stock: 30, createdAt: "2026-02-18", popular: true
  },
  {
    id: "adidas-spezial",
    name: "adidas Handball Spezial",
    brand: "Adidas",
    category: "retro",
    gender: "unisex",
    price: 5690, oldPrice: null,
    rating: 4.8, reviews: 431,
    badge: "hit",
    colors: ["Синій", "Бежевий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/82d433384c7c435f9a2fa96d0101d323_9366/Handball_Spezial_Shoes_Blue_BD7633_01_00_standard.jpg",
      "assets/img/adidas-spezial-1.svg"
    ],
    description: "Гандбольна модель 1979 року, яка стала головним суперником Samba. Замша, гумова підошва gum і вужчий силует.",
    specs: { "Верх": "Замша", "Підошва": "Гума gum", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 16, createdAt: "2026-06-11", popular: true
  },
  {
    id: "adidas-adizero-boston-13",
    name: "adidas Adizero Boston 13",
    brand: "Adidas",
    category: "running",
    gender: "unisex",
    price: 8990, oldPrice: null,
    rating: 4.7, reviews: 96,
    badge: "new",
    colors: ["Білий", "Помаранчевий"],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://assets.adidas.com/images/w_500,f_auto,q_auto/1b826951503e46a19cd8431f95897df9_9366/Adizero_Boston_13_Shoes_White_JR4791_01_00_standard.jpg",
      "assets/img/adidas-adizero-boston-13-1.svg"
    ],
    description: "Темпові кросівки з піною LIGHTSTRIKE PRO і карбоновими стрижнями ENERGYRODS. Тренувальний брат марафонок Adios Pro.",
    specs: { "Верх": "Сітка", "Підошва": "LIGHTSTRIKE PRO", "Дроп": "6.5 мм", "Вага": "250 г", "Призначення": "Темпові" },
    stock: 8, createdAt: "2026-08-03", popular: false
  },
  {
    id: "nb-327",
    name: "New Balance 327",
    brand: "New Balance",
    category: "retro",
    gender: "women",
    price: 4790, oldPrice: null,
    rating: 4.5, reviews: 224,
    badge: null,
    colors: ["Сірий", "Білий"],
    sizes: [36, 37, 38, 39, 40, 41],
    images: [
      "https://extrabutterny.com/cdn/shop/products/MS327LAB-1_x2400.jpg?v=1588698290",
      "assets/img/nb-327-1.svg"
    ],
    description: "Переосмислення бігових моделей 70-х: витягнутий носок, велика літера N через увесь бік і рифлена підошва.",
    specs: { "Верх": "Замша + нейлон", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 15, createdAt: "2026-05-16", popular: false
  },
  {
    id: "nb-574",
    name: "New Balance 574 Core",
    brand: "New Balance",
    category: "lifestyle",
    gender: "unisex",
    price: 4390, oldPrice: 4990,
    rating: 4.6, reviews: 677,
    badge: "sale",
    colors: ["Сірий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://nb.scene7.com/is/image/NB/ml574evg_nb_02_i?$pdpflexf2$&wid=1000&hei=1000",
      "assets/img/nb-574-1.svg"
    ],
    description: "Найтиражніша модель New Balance. Замша й сітка, амортизація ENCAP і той самий сірий, з якого почалася любов до бренду.",
    specs: { "Верх": "Замша + сітка", "Підошва": "ENCAP", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "В'єтнам" },
    stock: 27, createdAt: "2026-03-14", popular: true
  },
  {
    id: "nb-2002r",
    name: "New Balance 2002R Protection Pack",
    brand: "New Balance",
    category: "lifestyle",
    gender: "unisex",
    price: 8790, oldPrice: null,
    rating: 4.9, reviews: 302,
    badge: "hit",
    colors: ["Сірий", "Срібний"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://media.sivasdescalzo.com/media/catalog/product/M/2/M2002RDA_sivasdescalzo-New_Balance-2002R_Rain_Cloud_-1648212129-1.jpg",
      "assets/img/nb-2002r-1.svg"
    ],
    description: "Навмисно «розібраний» верх із відкритими краями — концепція Protection Pack. Технології N-ergy та ABZORB SBS із 2010 року.",
    specs: { "Верх": "Сітка + замша", "Підошва": "ABZORB SBS / N-ergy", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 7, createdAt: "2026-06-28", popular: true
  },
  {
    id: "asics-kayano-14",
    name: "ASICS GEL-Kayano 14",
    brand: "ASICS",
    category: "retro",
    gender: "unisex",
    price: 6490, oldPrice: null,
    rating: 4.7, reviews: 281,
    badge: "hit",
    colors: ["Білий", "Срібний"],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://media.sivasdescalzo.com/media/catalog/product/1/2/1201A019-104_sivasdescalzo-Asics-GEL-KAYANO_14-1624967261-1.jpg",
      "assets/img/asics-kayano-14-1.svg"
    ],
    description: "Бігова модель 2008 року, що стала головним Y2K-силуетом. Сріблясті накладки, видимий GEL і футуристичні лінії.",
    specs: { "Верх": "Сітка + синтетика", "Підошва": "GEL / IGS", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 13, createdAt: "2026-05-21", popular: true
  },
  {
    id: "asics-gel-lyte-3",
    name: "ASICS GEL-Lyte III OG",
    brand: "ASICS",
    category: "retro",
    gender: "men",
    price: 5290, oldPrice: 5990,
    rating: 4.5, reviews: 187,
    badge: "sale",
    colors: ["Сірий", "Бежевий"],
    sizes: [40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://media.sivasdescalzo.com/media/catalog/product/1/2/1201A050-021_sivasdescalzo-Asics-GEL-LYTE_III_OG-1645452163-1.jpg",
      "assets/img/asics-gel-lyte-3-1.svg"
    ],
    description: "Модель 1990 року з фірмовим роздвоєним язиком, який не з'їжджає набік. Замша, сітка й вставка GEL у п'яті.",
    specs: { "Верх": "Замша + сітка", "Підошва": "GEL / EVA", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 11, createdAt: "2026-04-24", popular: false
  },
  {
    id: "puma-suede-classic",
    name: "PUMA Suede Classic XXI",
    brand: "Puma",
    category: "retro",
    gender: "unisex",
    price: 3690, oldPrice: null,
    rating: 4.5, reviews: 394,
    badge: null,
    colors: ["Червоний", "Білий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://www.shoebacca.com/cdn/shop/files/37491502_1l.jpg?v=1788479386",
      "assets/img/puma-suede-classic-1.svg"
    ],
    description: "Замшева класика 1968 року — пара, у якій Томмі Сміт вийшов на Олімпіаду. Головні кросівки брейк-дансу та хіп-хопу.",
    specs: { "Верх": "Замша", "Підошва": "Гума", "Застібка": "Шнурівка", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 22, createdAt: "2026-03-27", popular: false
  },
  {
    id: "reebok-classic-leather",
    name: "Reebok Classic Leather",
    brand: "Reebok",
    category: "retro",
    gender: "unisex",
    price: 3890, oldPrice: null,
    rating: 4.6, reviews: 456,
    badge: null,
    colors: ["Білий", "Сірий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://m.media-amazon.com/images/I/510q7WTj7GL._AC_SR920,736_.jpg",
      "assets/img/reebok-classic-leather-1.svg"
    ],
    description: "Бігова модель 1983 року з м'якої шкіри, яку швидко перевели в повсякденне носіння. Проста форма, що пасує до всього.",
    specs: { "Верх": "Натуральна шкіра", "Підошва": "EVA + гума", "Застібка": "Шнурівка", "Сезон": "Всесезон", "Країна": "В'єтнам" },
    stock: 24, createdAt: "2026-04-11", popular: false
  },
  {
    id: "converse-chuck-low",
    name: "Converse Chuck Taylor All Star Low",
    brand: "Converse",
    category: "lifestyle",
    gender: "unisex",
    price: 2890, oldPrice: null,
    rating: 4.5, reviews: 731,
    badge: null,
    colors: ["Білий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    images: [
      "https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw4c5a201b/images/a_107/M7652C_A_107X1.jpg?sw=1200&strip=false",
      "assets/img/converse-chuck-low-1.svg"
    ],
    description: "Кеди, яких продали понад мільярд пар з 1917 року. Полотно, гумовий носок і нуль зайвих деталей.",
    specs: { "Верх": "Канвас", "Підошва": "Вулканізована гума", "Висота": "Low", "Сезон": "Літо / демісезон", "Країна": "В'єтнам" },
    stock: 32, createdAt: "2026-02-28", popular: false
  },
  {
    id: "vans-sk8-hi",
    name: "Vans Sk8-Hi",
    brand: "Vans",
    category: "lifestyle",
    gender: "unisex",
    price: 3990, oldPrice: null,
    rating: 4.7, reviews: 588,
    badge: "hit",
    colors: ["Чорний", "Білий"],
    sizes: [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://assets.vans.com/images/t_img/c_fill,g_center,f_auto,h_2500,w_2000/v1753917953/VN000D5IB8C-HERO/Sk8Hi-Shoe-VANS-Black-White-HERO.png",
      "assets/img/vans-sk8-hi-1.svg"
    ],
    description: "Перша модель Vans із високим захистом щиколотки, створена для скейтерів у 1978-му. Замша, канвас і вафельна підошва.",
    specs: { "Верх": "Замша + канвас", "Підошва": "Вафельна гума", "Висота": "High", "Сезон": "Демісезон", "Країна": "В'єтнам" },
    stock: 19, createdAt: "2026-04-18", popular: true
  },
  {
    id: "salomon-acs-pro",
    name: "Salomon ACS Pro",
    brand: "Salomon",
    category: "trail",
    gender: "unisex",
    price: 11490, oldPrice: null,
    rating: 4.8, reviews: 74,
    badge: "new",
    colors: ["Білий", "Сірий"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://www.sneakersnstuff.com/cdn/shop/files/L47179900-1__02461.1719452816.1280.1280.jpg",
      "assets/img/salomon-acs-pro-1.svg"
    ],
    description: "Найтехнологічніший силует Salomon Sportstyle. Каркас Agile Chassis, шнурівка Quicklace і багатошаровий верх.",
    specs: { "Верх": "Сітка + TPU", "Підошва": "Contagrip / ACS", "Дроп": "10 мм", "Вага": "380 г", "Сезон": "Демісезон" },
    stock: 6, createdAt: "2026-08-12", popular: true
  },
  {
    id: "on-cloudmonster-2",
    name: "On Cloudmonster 2",
    brand: "On",
    category: "running",
    gender: "unisex",
    price: 9490, oldPrice: null,
    rating: 4.7, reviews: 118,
    badge: "new",
    colors: ["Чорний", "Сірий"],
    sizes: [39, 40, 41, 42, 43, 44, 45, 46],
    images: [
      "https://m.media-amazon.com/images/I/71Q8C6yukdL._AC_SR920,736_.jpg",
      "assets/img/on-cloudmonster-2-1.svg"
    ],
    description: "Максимальна амортизація від швейцарського бренду. Гігантські елементи CloudTec і пластина Speedboard штовхають уперед.",
    specs: { "Верх": "Інженерна сітка", "Підошва": "CloudTec Phase / Helion", "Дроп": "6 мм", "Вага": "297 г", "Призначення": "Щоденні пробіжки" },
    stock: 10, createdAt: "2026-07-19", popular: true
  },
  {
    id: "hoka-clifton-10",
    name: "HOKA Clifton 10",
    brand: "HOKA",
    category: "running",
    gender: "unisex",
    price: 8290, oldPrice: null,
    rating: 4.8, reviews: 205,
    badge: "hit",
    colors: ["Помаранчевий", "Білий"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    images: [
      "https://dms.deckers.com/hoka/image/upload/t_pdp-slider-large-wp/v1776177734/1162030-PRSM_1.png",
      "assets/img/hoka-clifton-10-1.svg"
    ],
    description: "Легендарна «хмара» HOKA десятого покоління. Товстенна піна, але вага менша за 250 грамів і геометрія Meta-Rocker для перекату.",
    specs: { "Верх": "Інженерне плетіння", "Підошва": "CMEVA / Meta-Rocker", "Дроп": "8 мм", "Вага": "248 г", "Призначення": "Щоденні пробіжки" },
    stock: 14, createdAt: "2026-07-06", popular: true
  }
];

window.STEPZONE_CATEGORIES = [
  { id: "lifestyle",  name: "Лайфстайл",   desc: "На кожен день" },
  { id: "running",    name: "Бігові",      desc: "Асфальт і темп" },
  { id: "retro",      name: "Ретро",       desc: "Класика 70–00-х" },
  { id: "basketball", name: "Баскетбольні", desc: "Корт і вулиця" },
  { id: "training",   name: "Тренувальні", desc: "Зал і кросфіт" },
  { id: "trail",      name: "Трейл",       desc: "Ліс, гори, бруд" }
];
