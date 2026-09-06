# Sofra — Facebook Page & Instagram setup

Prompts for the Claude Chrome extension, plus the copy and image files it needs.
Fill in the `[…]` fields before pasting. Log in to Facebook / Instagram in the browser first.

## Brand details (used in every prompt)

| Field | Value |
|---|---|
| Page name | **Sofra Dhaka** |
| Username / handle | **@sofra.dhaka** (fallbacks: `sofradhaka`, `sofra.gulshan`) |
| Category | Turkish Restaurant (secondary: Mediterranean Restaurant) |
| Short bio (FB, ≤101 chars) | Anatolian kitchen in Gulshan, Dhaka. Charcoal kebaps, metre-long sharing boards, meze & baklava. |
| IG bio (≤150 chars) | 🔥 Charcoal kebaps · metre-long sharing boards · meze & baklava<br>📍 Gulshan 2, Dhaka · Open daily 12–11pm<br>📲 Book a table ↓ |
| About / description | Sofra means the spread laid out when everyone sits down together. Ours is the food of southern Anatolia — Adana, Gaziantep, Hatay — cooked over charcoal and in clay, served on wooden boards built for the middle of the table. Halal meats minced by hand every afternoon, lavaş baked to order, ayran churned in-house. Sharing boards for two, four or eight, private room for 12–40 guests. |
| Bangla tagline | ঢাকায় আনাতোলিয়ান রান্নাঘর — কাঠকয়লার কাবাব, শেয়ারিং বোর্ড, মেজে ও বাকলাভা। |
| Website | https://th3iatech.github.io/sofra.com.bd/ (switch to https://sofra.com.bd when the domain is live) |
| Address | [House 00, Road 00, Gulshan 2, Dhaka 1212] |
| Phone / WhatsApp | [+880 1XXX-XXXXXX] |
| Email | hello@sofra.com.bd |
| Hours | Monday–Sunday 12:00–23:00 |
| Price range | ৳৳৳ (BDT 800–1,500 per person) |
| Services | Dine-in, Reservations, Private dining, Group bookings, Takeaway |
| Payment | Cash, bKash, Nagad, Visa/Mastercard |

## Image files (this folder)

| File | Use |
|---|---|
| `profile-1080.png` | Profile picture — Facebook and Instagram |
| `fb-cover-1640x924.jpg` | Facebook cover (keep the logo inside the centre safe-area) |
| `post-1-adana.jpg` … `post-6-hummus.jpg` | First six posts, 1080×1080 |
| `story-1080x1920.jpg` | First story / reel cover |

Full path on this PC: `D:\github\sofra.com.bd\social\` — the extension can only attach files via the browser's file picker, so have this folder open in Explorer.

---

## Prompt 1 — Create the Facebook Page

```
You are setting up a Facebook Page for a restaurant. I am already logged in to Facebook. Work step by step, tell me what you see before each click, and STOP and ask me if Facebook shows a captcha, a phone/email verification, or anything unexpected. Do not create anything twice — if a page named "Sofra Dhaka" already exists in my Pages list, open it instead of creating a new one.

1. Go to https://www.facebook.com/pages/create
2. Page name: Sofra Dhaka
   Category: Turkish Restaurant (if that is not offered, choose "Restaurant" and add "Mediterranean Restaurant" as a second category)
   Bio: Anatolian kitchen in Gulshan, Dhaka. Charcoal kebaps, metre-long sharing boards, meze & baklava.
   Click Create Page.
3. In the next step (profile picture and cover), click "Add profile picture" and choose the file
   D:\github\sofra.com.bd\social\profile-1080.png
   then "Add cover photo" and choose
   D:\github\sofra.com.bd\social\fb-cover-1640x924.jpg
   Save. If the file picker does not open, tell me and I will pick the files myself.
4. Open the page's "Edit details" / "Manage" > "Page setup" > "Set up your Page" and fill in:
   - Website: https://th3iatech.github.io/sofra.com.bd/
   - Email: hello@sofra.com.bd
   - Phone: [+880 1XXX-XXXXXX]
   - WhatsApp: [same number]
   - Address: [House 00, Road 00, Gulshan 2, Dhaka 1212], Dhaka, Bangladesh, and turn on "Show map"
   - Hours: Open on selected hours, Monday to Sunday 12:00 – 23:00
   - Price range: $$$
   - Services / options: Dine-in, Reservations, Takeaway
   - Description / About: Sofra means the spread laid out when everyone sits down together. Ours is the food of southern Anatolia — Adana, Gaziantep, Hatay — cooked over charcoal and in clay, served on wooden boards built for the middle of the table. Halal meats minced by hand every afternoon, lavaş baked to order, ayran churned in-house. Sharing boards for two, four or eight, private room for 12–40 guests.
   Save each section.
5. Set the username: Settings > Page setup > Username (or "Create @username") → sofra.dhaka. If it is taken, try sofradhaka, then sofra.gulshan, and tell me which one worked.
6. Add an action button: "Book now" or "Send WhatsApp message" pointing to the WhatsApp number; if that is not available use "Send message".
7. Finally, read back to me: the Page URL, the username that was accepted, and any fields you could not fill.
```

## Prompt 2 — Create the Instagram account (business) and link it

Instagram will send a confirmation code to the email or phone you use. The extension cannot read that code, so it will pause and ask you for it.

```
You are creating an Instagram business account for a restaurant. Work step by step and STOP to ask me whenever Instagram asks for a verification code, a captcha, or a password. Never guess codes.

1. Go to https://www.instagram.com/accounts/emailsignup/
2. Sign up with:
   - Email: [hello@sofra.com.bd or the email I give you]
   - Full name: Sofra Dhaka
   - Username: sofra.dhaka (if taken try sofradhaka, then sofra.gulshan — tell me which was accepted)
   - Password: [I will type this myself — pause and let me]
   - Birthday: [DD MM YYYY of the account owner]
3. When Instagram asks for the confirmation code, stop and ask me for it, then enter it.
4. Skip "find friends" / contact sync steps.
5. Open Settings > Account type and tools > Switch to professional account > Business.
   Category: Turkish Restaurant (or "Restaurant").
   Show category on profile: yes. Show contact info: yes.
   Contact: email hello@sofra.com.bd, phone [+880 1XXX-XXXXXX], address [House 00, Road 00, Gulshan 2, Dhaka 1212].
6. Edit profile:
   - Profile photo: D:\github\sofra.com.bd\social\profile-1080.png (if the picker does not open, tell me)
   - Name: Sofra · Anatolian Kitchen, Dhaka
   - Bio (three lines):
     🔥 Charcoal kebaps · metre-long sharing boards · meze & baklava
     📍 Gulshan 2, Dhaka · Open daily 12–11pm
     📲 Book a table ↓
   - Website / link: https://th3iatech.github.io/sofra.com.bd/
   Save.
7. Link to the Facebook Page: Settings > Accounts Center > Accounts > Add accounts (or Edit profile > "Page" > connect) → choose the Facebook Page "Sofra Dhaka". If it asks me to log in to Facebook, pause for me.
8. Read back to me: the profile URL, the username accepted, and anything left unfinished.
```

## Prompt 3 — First posts (run after both pages exist)

```
Publish the first posts on the Facebook Page "Sofra Dhaka" and cross-post to Instagram where the option exists. Use these files from D:\github\sofra.com.bd\social\ and these captions exactly. Post them one at a time, confirm each is published before the next, and stop if any upload fails.

Post 1 — post-1-adana.jpg
Adana kebap, the way it is done in Adana: lamb minced by hand every afternoon, seasoned with chili and tail fat, charred over charcoal and laid on warm lavaş. Platter or on its own — your call.
আদানা কাবাব — প্রতিদিন বিকালে হাতে কিমা করা খাসি, কাঠকয়লার আগুনে ঝলসানো, গরম লাভাশে।
📍 Gulshan 2, Dhaka · Book: link in bio
#SofraDhaka #AdanaKebap #TurkishFoodDhaka #GulshanEats #DhakaFoodies #Ocakbasi

Post 2 — post-2-long-board.jpg
The Long Board. One metre of the whole grill — Adana, beyti, chicken şiş, wings, lamb chops — laid down the middle of the table with meze, soup and ayran for everyone. Made for eight. Made for company.
আটজনের লং বোর্ড — পুরো গ্রিল টেবিলের মাঝখানে, সবার জন্য মেজে, স্যুপ আর আয়রানসহ।
#SofraDhaka #SharingBoard #TurkishRestaurantDhaka #GroupDining #DhakaFood

Post 3 — post-3-calamari.jpg
Kalamar tava: crisp-fried calamari, tartar sauce, a squeeze of lemon. The starter the table fights over.
#SofraDhaka #Calamari #DhakaEats #GulshanRestaurant

Post 4 — post-4-room.jpg
The room: long tables, lantern light, İznik patterns and a charcoal ocakbaşı at its heart. Open daily 12:00–23:00, Gulshan 2.
সোফরার ঘর — লম্বা টেবিল, লণ্ঠনের আলো, আর প্রাণকেন্দ্রে কাঠকয়লার ওজাকবাশি।
#SofraDhaka #DhakaRestaurant #GulshanDhaka #AnatolianKitchen

Post 5 — post-5-mixed-grill.jpg
Karışık ızgara for two: Adana, chicken şiş, wings and köfte on one board, with rice, fries, salad and lavaş. ৳2,990 for the table.
#SofraDhaka #MixedGrill #TurkishGrill #DateNightDhaka

Post 6 — post-6-hummus.jpg
Start here. Hummus with warm pide, haydari, babagannuş, muhammara — five meze for the table with a bread basket, ৳1,290.
#SofraDhaka #Meze #Hummus #DhakaFoodies

Then upload story-1080x1920.jpg as a Story on both accounts with the text "Now open · Gulshan, Dhaka" and a link sticker to https://th3iatech.github.io/sofra.com.bd/
```

## After the pages exist

Put the real URLs into `assets/js/site-config.js` (`social.facebook`, `social.instagram`) so the icons on the website point to them, then push.
