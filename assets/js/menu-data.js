/* Sofra — menu content (source: Sofra-Menu-Display.pptx / SORFA Final Menu.docx, Oct 2026).
   Section: { id, tr (Turkish title), title:{en,bn}, items:[...] }
   Item:    { n:{en,bn}, sub:{en,bn} (optional subtitle), d:{en,bn} (optional), p: price BDT,
              img: photo path (optional; "-sm" variant must exist), wide: true for a panoramic photo spanning the row }
   Descriptions are only those the menu itself gives — leave d out rather than invent one. */
window.SOFRA_MENU = [
  {
    id: "mezze",
    tr: "Mezeler",
    title: { en: "Mezze", bn: "মেজে" },
    items: [
      { n: { en: "Mezze Platter", bn: "মেজে প্ল্যাটার" }, p: 499, img: "assets/img/menu/mezze.jpg", wide: true,
        d: { en: "Choose any 4 of 6 mezze. Served with 4 pcs of hot Turkish lavaş puff bread, tomato, green chilli and gherkin slices. Portion for 1.5 persons.",
             bn: "৬টি মেজে থেকে যেকোনো ৪টি বেছে নিন। সঙ্গে ৪ পিস গরম তুর্কি লাভাশ পাফ ব্রেড, টমেটো, কাঁচা মরিচ ও ঘেরকিনের টুকরো। দেড়জনের পরিমাণ।" } },
      { n: { en: "Single Mezze", bn: "সিঙ্গেল মেজে" }, p: 299,
        d: { en: "Any 2 mezze, Turkish cucumber salad and 2 pcs of bread.",
             bn: "যেকোনো ২টি মেজে, তুর্কি শসার সালাদ ও ২ পিস রুটি।" } }
    ]
  },
  {
    id: "starter",
    tr: "Başlangıç",
    title: { en: "Starter", bn: "স্টার্টার" },
    items: [
      { n: { en: "Falafel with Tahini Sauce", bn: "তাহিনি সসসহ ফালাফেল" }, p: 399, img: "assets/img/menu/falafel.jpg",
        d: { en: "4 pcs of falafel served hot with tahini sauce and 2 pcs of hot lavaş bread. With cucumber, green chilli and a small side of hummus.",
             bn: "৪ পিস গরম ফালাফেল, তাহিনি সস ও ২ পিস গরম লাভাশ রুটি। সঙ্গে শসা, কাঁচা মরিচ ও অল্প হুমুস।" } }
    ]
  },
  {
    id: "kebab",
    tr: "Kebaplar",
    title: { en: "Kebab", bn: "কাবাব" },
    items: [
      { n: { en: "Adana Kebab", bn: "আদানা কাবাব" }, p: 999, img: "assets/img/menu/adana.jpg",
        d: { en: "Beef or chicken. With Turkish pilaf, or with bread.",
             bn: "বিফ অথবা চিকেন। তুর্কি পোলাও অথবা রুটির সঙ্গে।" } },
      { n: { en: "Lamb Urfa Kebab", bn: "ল্যাম্ব উরফা কাবাব" }, p: 999, img: "assets/img/menu/urfa.jpg" },
      { n: { en: "Beyti Kebab", bn: "বেয়তি কাবাব" }, p: 999, img: "assets/img/menu/beyti.jpg" },
      { n: { en: "Tirit Kebab", bn: "তিরিত কাবাব" }, p: 999, img: "assets/img/menu/tirit.jpg" },
      { n: { en: "Iskender Kebab", bn: "ইস্কেন্দার কাবাব" }, p: 1099, img: "assets/img/menu/iskender.jpg" },
      { n: { en: "Ottoman Kebab", bn: "অটোমান কাবাব" }, p: 1099, img: "assets/img/menu/ottoman.jpg" }
    ]
  },
  {
    id: "share",
    tr: "Paylaşımlık",
    title: { en: "To Share", bn: "ভাগ করে খাওয়ার জন্য" },
    items: [
      { n: { en: "Mixed Grill", bn: "মিক্সড গ্রিল" }, p: 2499, img: "assets/img/menu/mixed-grill.jpg",
        d: { en: "2 types of kebab, Turkish chicken wings, 2 pcs lamb chop, grilled potato, grilled tomato, onion, garlic and green chilli. 2 mezze, 4 pcs of bread and fries.",
             bn: "২ ধরনের কাবাব, তুর্কি চিকেন উইংস, ২ পিস ল্যাম্ব চপ, গ্রিলড আলু, গ্রিলড টমেটো, পেঁয়াজ, রসুন ও কাঁচা মরিচ। সঙ্গে ২টি মেজে, ৪ পিস রুটি ও ফ্রাই।" } },
      { n: { en: "Mega Mixed Grill", bn: "মেগা মিক্সড গ্রিল" }, p: 3999,
        d: { en: "Group sharing, 4–5 people.", bn: "দলবেঁধে খাওয়ার জন্য, ৪–৫ জন।" } }
    ]
  },
  {
    id: "lamb",
    tr: "Kuzu",
    title: { en: "Lamb", bn: "ল্যাম্ব" },
    items: [
      { n: { en: "Lamb Chop", bn: "ল্যাম্ব চপ" }, p: 1999, img: "assets/img/menu/lamb-chop.jpg" },
      { n: { en: "Shank", bn: "শ্যাঙ্ক" }, p: 1499, img: "assets/img/menu/shank.jpg" }
    ]
  },
  {
    id: "chicken",
    tr: "Tavuk",
    title: { en: "Chicken", bn: "চিকেন" },
    items: [
      { n: { en: "Tavuk Kanat", bn: "তাভুক কানাত" }, sub: { en: "Turkish Chicken Wings", bn: "তুর্কি চিকেন উইংস" }, p: 999, img: "assets/img/menu/wings.jpg" }
    ]
  },
  {
    id: "wrap",
    tr: "Dürüm",
    title: { en: "Wrap", bn: "র‍্যাপ" },
    items: [
      { n: { en: "Turkish Shawarma Wrap", bn: "তুর্কি শাওয়ারমা র‍্যাপ" }, p: 999, img: "assets/img/menu/wrap.jpg",
        d: { en: "Beef or chicken.", bn: "বিফ অথবা চিকেন।" } }
    ]
  },
  {
    id: "dessert",
    tr: "Tatlılar",
    title: { en: "Dessert", bn: "ডেজার্ট" },
    items: [
      { n: { en: "Kunafa", bn: "কুনাফা" }, p: 499, img: "assets/img/menu/kunafa.jpg" },
      { n: { en: "Sütlaç", bn: "সুতলাচ" }, sub: { en: "Turkish Rice Pudding", bn: "তুর্কি চালের পায়েস" }, p: 499, img: "assets/img/menu/sutlac.jpg" }
    ]
  }
];
