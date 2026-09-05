/* Sofra — menu content.
   Section: { id, tr (Turkish title), title:{en,bn}, img (banner photo, optional), items:[...] }
   Item:    { n:{en,bn}, d:{en,bn}, p: price BDT, p2: second price BDT (non-platter, optional),
              c: allergen/diet codes "G/D/V", tag: "local"|"chef"|"new" (optional) }
   Codes: G gluten, D dairy, TN tree nuts, SS sesame, E egg, F fish, MO molluscs, SOY soy, V vegetarian, VG vegan, S spicy.
   "Platter" = served with Turkish bread, fries, rice, salad, sauce and yoghurt. "Non-platter" = the kebab alone with bread.
   Filters on the menu page derive from codes: Vegetarian = V or VG, Vegan = VG, Gluten-free = no G. */
window.SOFRA_MENU = [
  {
    id: "meze",
    tr: "Mezeler & Salatalar",
    title: { en: "Meze & Salads", bn: "মেজে ও সালাদ" },
    img: "assets/img/photos/hummus.jpg",
    items: [
      { n: { en: "Hummus", bn: "হুমুস" }, d: { en: "chickpea & tahini, olive oil, paprika, warm pide", bn: "ছোলা ও তাহিনি, জলপাই তেল, পাপরিকা, গরম পিদে" }, p: 450, c: "G/SS/VG" },
      { n: { en: "Haydari", bn: "হায়দারি" }, d: { en: "strained yoghurt with dill, mint & garlic", bn: "ছাঁকা দই, ডিল, পুদিনা ও রসুন" }, p: 420, c: "D/V" },
      { n: { en: "Babagannuş", bn: "বাবাগানুশ" }, d: { en: "smoked aubergine, tahini, lemon", bn: "ধোঁয়াটে বেগুন, তাহিনি, লেবু" }, p: 450, c: "SS/VG" },
      { n: { en: "Muhammara", bn: "মুহাম্মারা" }, d: { en: "roasted red pepper & walnut dip, pomegranate molasses", bn: "ঝলসানো লাল মরিচ ও আখরোটের ডিপ, ডালিমের গুড়" }, p: 480, c: "TN/SS/VG" },
      { n: { en: "Çoban Salatası", bn: "চোবান সালাদ" }, d: { en: "shepherd's salad — cucumber, tomato, onion, olives, sumac", bn: "রাখালের সালাদ — শসা, টমেটো, পেঁয়াজ, জলপাই, সুমাক" }, p: 490, c: "VG", tag: "local" },
      { n: { en: "Sezar Salatası", bn: "সিজার সালাদ" }, d: { en: "romaine, parmesan, croutons, grilled chicken", bn: "রোমেইন লেটুস, পারমেসান, ক্রুটন, গ্রিল করা মুরগি" }, p: 690, c: "G/D/E" },
      { n: { en: "Karides Salatası", bn: "কারিদেস সালাদ" }, d: { en: "prawn salad — mixed leaves, peppers, lime, pomegranate", bn: "চিংড়ির সালাদ — মিশ্র শাক, ক্যাপসিকাম, লেবু, ডালিম" }, p: 890, c: "MO" },
      { n: { en: "Meze Tabağı", bn: "মেজে থালা" }, d: { en: "five meze for the table, with a bread basket", bn: "টেবিলের জন্য পাঁচ রকম মেজে, রুটির ঝুড়িসহ" }, p: 1290, c: "G/D/TN/SS/V", tag: "chef" }
    ]
  },
  {
    id: "sicak",
    tr: "Çorbalar & Sıcak Başlangıçlar",
    title: { en: "Soups & Hot Starters", bn: "স্যুপ ও গরম স্টার্টার" },
    img: "assets/img/photos/calamari.jpg",
    items: [
      { n: { en: "Mercimek Çorbası", bn: "মেরজিমেক চোরবা" }, d: { en: "red lentil soup, lemon, dried mint, croutons", bn: "লাল মসুর ডালের স্যুপ, লেবু, শুকনো পুদিনা, ক্রুটন" }, p: 390, c: "G/V", tag: "local" },
      { n: { en: "Tavuk Çorbası", bn: "তাভুক চোরবা" }, d: { en: "chicken & vermicelli soup with fresh herbs", bn: "মুরগি ও সেমাইয়ের স্যুপ, তাজা হার্বসহ" }, p: 420, c: "G" },
      { n: { en: "Kalamar Tava", bn: "কালামার তাভা" }, d: { en: "crisp fried calamari, tartar sauce, lemon", bn: "মুচমুচে ভাজা স্কুইড, টারটার সস, লেবু" }, p: 890, c: "G/E/MO", tag: "chef" },
      { n: { en: "Sigara Böreği", bn: "সিগারা বোরেক" }, d: { en: "crisp filo rolls with feta & parsley", bn: "ফেটা পনির ও পার্সলে ভরা মুচমুচে ফিলো রোল" }, p: 490, c: "G/D/V" },
      { n: { en: "Karides Güveç", bn: "কারিদেস গুভেচ" }, d: { en: "prawns baked in a clay dish with tomato, garlic & kaşar", bn: "মাটির পাত্রে টমেটো, রসুন ও কাশার পনিরে বেক করা চিংড়ি" }, p: 990, c: "D/MO" },
      { n: { en: "Lahmacun", bn: "লাহমাজুন" }, d: { en: "thin crisp flatbread with spiced minced lamb, parsley & lemon", bn: "মশলাদার খাসির কিমা, পার্সলে ও লেবুসহ পাতলা মুচমুচে রুটি" }, p: 550, c: "G" }
    ]
  },
  {
    id: "kebap",
    tr: "Ocakbaşı Kebapları",
    title: { en: "From the Ocakbaşı", bn: "ওজাকবাশি থেকে" },
    img: "assets/img/photos/chicken-shish.jpg",
    items: [
      { n: { en: "Adana Kebap", bn: "আদানা কাবাব" }, d: { en: "hand-minced lamb with chili & tail fat, charred pepper & tomato, lavaş", bn: "হাতে কিমা করা খাসি, মরিচ ও চর্বি, ঝলসানো মরিচ ও টমেটো, লাভাশ" }, p: 1090, p2: 890, c: "G/S", tag: "chef" },
      { n: { en: "Beef Beyti Kebap", bn: "বিফ বেয়তি কাবাব" }, d: { en: "seasoned minced beef wrapped in lavaş, grilled, yoghurt & tomato sauce", bn: "মশলাদার গরুর কিমা লাভাশে মুড়িয়ে গ্রিল, দই ও টমেটো সস" }, p: 1370, p2: 1170, c: "G/D" },
      { n: { en: "Chicken Beyti Kebap", bn: "চিকেন বেয়তি কাবাব" }, d: { en: "seasoned minced chicken wrapped in soft lavaş, flame-grilled", bn: "মশলাদার মুরগির কিমা নরম লাভাশে মুড়িয়ে আগুনে গ্রিল" }, p: 1070, p2: 890, c: "G/D" },
      { n: { en: "Lamb Beyti Kebap", bn: "ল্যাম্ব বেয়তি কাবাব" }, d: { en: "seasoned minced lamb wrapped in lavaş, flame-grilled", bn: "মশলাদার খাসির কিমা লাভাশে মুড়িয়ে আগুনে গ্রিল" }, p: 1470, p2: 1270, c: "G/D" },
      { n: { en: "Tavuk Şiş Kebap", bn: "তাভুক শিশ কাবাব" }, d: { en: "marinated chicken, flame-grilled on skewers", bn: "মেরিনেট করা মুরগি, শিকে গেঁথে আগুনে গ্রিল" }, p: 990, p2: 790, c: "" },
      { n: { en: "Tavuk Kanat", bn: "তাভুক কানাত" }, d: { en: "marinated chicken wings, flame-grilled", bn: "মেরিনেট করা মুরগির ডানা, আগুনে গ্রিল" }, p: 990, p2: 690, c: "" },
      { n: { en: "Tavuk Pirzola", bn: "তাভুক পিরজোলা" }, d: { en: "marinated chicken chops, flame-grilled", bn: "মেরিনেট করা মুরগির চপ, আগুনে গ্রিল" }, p: 990, c: "" },
      { n: { en: "Kuzu Şiş", bn: "কুজু শিশ" }, d: { en: "cubes of lamb leg marinated in yoghurt & thyme", bn: "দই ও থাইমে মেরিনেট করা খাসির রানের মাংস" }, p: 1490, p2: 1290, c: "D" },
      { n: { en: "Kuzu Pirzola", bn: "কুজু পিরজোলা" }, d: { en: "four lamb chops, oregano, charred vegetables", bn: "চারটি খাসির চপ, ওরেগানো, ঝলসানো সবজি" }, p: 1890, c: "", tag: "chef" },
      { n: { en: "Izgara Köfte", bn: "ইজগারা কোফতে" }, d: { en: "grilled beef meatballs with cumin & parsley", bn: "জিরা ও পার্সলেসহ গ্রিল করা গরুর কোফতা" }, p: 990, p2: 790, c: "G" }
    ]
  },
  {
    id: "sofra",
    tr: "Sofra Tabakları",
    title: { en: "Sharing Boards", bn: "শেয়ারিং বোর্ড" },
    img: "assets/img/photos/board-3.jpg",
    items: [
      { n: { en: "Karışık Izgara for Two", bn: "দুজনের কারিশিক ইজগারা" }, d: { en: "Adana, chicken şiş, wings & köfte on a wooden board with rice, fries, salad & lavaş", bn: "কাঠের বোর্ডে আদানা, চিকেন শিশ, উইংস ও কোফতে; ভাত, ফ্রাই, সালাদ ও লাভাশসহ" }, p: 2990, c: "G/D", tag: "chef" },
      { n: { en: "Sofra Board for Four", bn: "চারজনের সোফরা বোর্ড" }, d: { en: "the full grill — lamb şiş, Adana, beyti, chicken şiş, wings, lamb chops — with all the sides", bn: "পুরো গ্রিল — কুজু শিশ, আদানা, বেয়তি, চিকেন শিশ, উইংস, খাসির চপ — সব সাইডসহ" }, p: 5490, c: "G/D" },
      { n: { en: "The Long Board for Eight", bn: "আটজনের লং বোর্ড" }, d: { en: "our metre-long board for the whole table, with meze, soup & ayran for everyone", bn: "পুরো টেবিলের জন্য আমাদের এক মিটার লম্বা বোর্ড; সবার জন্য মেজে, স্যুপ ও আয়রানসহ" }, p: 10900, c: "G/D", tag: "new" },
      { n: { en: "Corporate Table", bn: "কর্পোরেট টেবিল" }, d: { en: "set sharing menu per person, minimum ten guests, private room on request", bn: "জনপ্রতি নির্ধারিত শেয়ারিং মেনু, ন্যূনতম দশ জন, অনুরোধে প্রাইভেট রুম" }, p: 1490, c: "G/D" }
    ]
  },
  {
    id: "guvec",
    tr: "Güveçler & Tencere",
    title: { en: "From the Clay Pot", bn: "মাটির পাত্র থেকে" },
    img: "assets/img/photos/sac-kavurma.jpg",
    items: [
      { n: { en: "Kuzu Güveç", bn: "কুজু গুভেচ" }, d: { en: "slow-baked lamb with aubergine, pepper & tomato in a clay pot", bn: "মাটির পাত্রে বেগুন, মরিচ ও টমেটোসহ ধীরে বেক করা খাসি" }, p: 1290, c: "", tag: "chef" },
      { n: { en: "Saç Kavurma", bn: "সাচ কাভুরমা" }, d: { en: "beef sautéed on the saç with peppers, onion & tomato", bn: "সাচে মরিচ, পেঁয়াজ ও টমেটোসহ ভাজা গরুর মাংস" }, p: 1190, c: "" },
      { n: { en: "Tavuk Güveç", bn: "তাভুক গুভেচ" }, d: { en: "chicken, mushroom & kaşar baked in a clay dish", bn: "মাটির পাত্রে বেক করা মুরগি, মাশরুম ও কাশার পনির" }, p: 990, c: "D" },
      { n: { en: "Musakka", bn: "মুসাক্কা" }, d: { en: "layered aubergine, minced lamb & tomato, baked with béchamel", bn: "স্তরে স্তরে বেগুন, খাসির কিমা ও টমেটো, বেশামেলসহ বেক" }, p: 890, c: "G/D" },
      { n: { en: "Karnıyarık", bn: "কারনিয়ারিক" }, d: { en: "split aubergine stuffed with spiced mince, rice", bn: "মশলাদার কিমা ভরা বেগুন, ভাতসহ" }, p: 790, c: "" }
    ]
  },
  {
    id: "deniz",
    tr: "Deniz Ürünleri",
    title: { en: "Seafood", bn: "সামুদ্রিক খাবার" },
    img: "assets/img/photos/prawns.jpg",
    items: [
      { n: { en: "Izgara Karides", bn: "ইজগারা কারিদেস" }, d: { en: "grilled tiger prawns, garlic butter, rice, lime", bn: "গ্রিল করা বাগদা চিংড়ি, রসুন-মাখন, ভাত, লেবু" }, p: 1290, c: "D/MO", tag: "local" },
      { n: { en: "Günün Balığı", bn: "দিনের মাছ" }, d: { en: "catch of the day from the Bay, grilled with olive oil & oregano", bn: "বঙ্গোপসাগরের দিনের মাছ, জলপাই তেল ও ওরেগানোসহ গ্রিল" }, p: 1490, c: "F", tag: "local" },
      { n: { en: "Izgara Kalamar", bn: "ইজগারা কালামার" }, d: { en: "grilled calamari, rocket, lemon & chili oil", bn: "গ্রিল করা স্কুইড, রকেট পাতা, লেবু ও মরিচের তেল" }, p: 990, c: "MO/S" }
    ]
  },
  {
    id: "ilave",
    tr: "Yanında",
    title: { en: "Sides", bn: "সাইড" },
    items: [
      { n: { en: "Patates Kızartması", bn: "ফ্রেঞ্চ ফ্রাই" }, d: { en: "hand-cut fries", bn: "হাতে কাটা আলু ভাজা" }, p: 290, c: "VG" },
      { n: { en: "Pilav", bn: "পিলাভ" }, d: { en: "buttered rice with vermicelli", bn: "মাখন ও সেমাইসহ ভাত" }, p: 250, c: "G/D/V" },
      { n: { en: "Lavaş", bn: "লাভাশ" }, d: { en: "thin bread from the oven", bn: "চুলার পাতলা রুটি" }, p: 120, c: "G/VG" },
      { n: { en: "Cacık", bn: "জাজিক" }, d: { en: "yoghurt, cucumber, mint", bn: "দই, শসা, পুদিনা" }, p: 250, c: "D/V" },
      { n: { en: "Acılı Ezme", bn: "আজিলি এজমে" }, d: { en: "spicy chopped tomato & pepper relish", bn: "ঝাল কুচি টমেটো ও মরিচের রেলিশ" }, p: 250, c: "VG/S" }
    ]
  },
  {
    id: "tatli",
    tr: "Tatlılar",
    title: { en: "Desserts", bn: "মিষ্টি" },
    items: [
      { n: { en: "Fıstıklı Baklava", bn: "ফিস্তিকলি বাকলাভা" }, d: { en: "forty layers, Antep pistachio, clotted cream", bn: "চল্লিশ স্তর, আন্তেপ পেস্তা, কায়মাক" }, p: 590, c: "G/D/TN", tag: "chef" },
      { n: { en: "Künefe", bn: "কুনেফে" }, d: { en: "shredded pastry, melting cheese, syrup, pistachio — baked to order", bn: "সরু সেমাই, গলে যাওয়া পনির, সিরাপ, পেস্তা — অর্ডারে বেক" }, p: 690, c: "G/D/TN/V" },
      { n: { en: "Sütlaç", bn: "সুতলাচ" }, d: { en: "baked rice pudding, cinnamon", bn: "বেক করা চালের পায়েস, দারুচিনি" }, p: 390, c: "D/V" },
      { n: { en: "Kazandibi", bn: "কাজানদিবি" }, d: { en: "caramelised milk pudding", bn: "ক্যারামেল করা দুধের পুডিং" }, p: 390, c: "D/V" }
    ]
  },
  {
    id: "icecek",
    tr: "İçecekler",
    title: { en: "Drinks", bn: "পানীয়" },
    img: "assets/img/photos/mojito.jpg",
    items: [
      { n: { en: "Ayran", bn: "আয়রান" }, d: { en: "house-churned salted yoghurt drink", bn: "ঘরে মন্থন করা নোনতা দইয়ের পানীয়" }, p: 190, c: "D/V" },
      { n: { en: "Çay", bn: "চা" }, d: { en: "Turkish black tea in a tulip glass", bn: "টিউলিপ গ্লাসে তুর্কি কালো চা" }, p: 120, c: "VG" },
      { n: { en: "Türk Kahvesi", bn: "তুর্কি কফি" }, d: { en: "brewed in copper, served with lokum", bn: "তামার পাত্রে বানানো, লোকুমসহ পরিবেশিত" }, p: 250, c: "VG" },
      { n: { en: "Nane Limon Mojito", bn: "নানে লিমন মোহিতো" }, d: { en: "mint, lime & soda — alcohol-free", bn: "পুদিনা, লেবু ও সোডা — অ্যালকোহলমুক্ত" }, p: 350, c: "VG", tag: "new" },
      { n: { en: "Taze Meyve Suyu", bn: "তাজা ফলের রস" }, d: { en: "fresh juice of the day", bn: "দিনের তাজা রস" }, p: 320, c: "VG" },
      { n: { en: "Şalgam", bn: "শালগাম" }, d: { en: "fermented turnip juice, the Adana way", bn: "গাঁজানো শালগমের রস, আদানার ধাঁচে" }, p: 220, c: "VG" },
      { n: { en: "Su / Soda", bn: "পানি / সোডা" }, d: { en: "still or sparkling water", bn: "সাধারণ বা কার্বনেটেড পানি" }, p: 90, c: "VG" }
    ]
  }
];
