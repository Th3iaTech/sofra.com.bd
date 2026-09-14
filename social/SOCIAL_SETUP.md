# Sofra — Facebook, Instagram, X & YouTube setup

Prompts for the Claude Chrome extension, plus the copy and image files it needs.
Fill in the `[…]` fields before pasting. Log in to Facebook / Google in the browser first.

Suggested order: Prompt 1 (Facebook) → 2 (Instagram) → 4 (X) → 5 (YouTube) → 3 (first posts).

> **Sign-up email:** sofra.com.bd is not live yet, so no `@sofra.com.bd` address can receive
> verification codes. Sign up with a Gmail you can open now, then change the account email to
> `info@sofra.com.bd` once the domain and Cloudflare Email Routing are working.

## Brand details (used in every prompt)

| Field | Value |
|---|---|
| Page name | **Sofra Dhaka** |
| Username / handle | **@sofra.dhaka** (fallbacks: `sofradhaka`, `sofra.gulshan`) |
| Category | Turkish Restaurant (secondary: Mediterranean Restaurant) |
| Short bio (FB, ≤101 chars) | The grill glows. Pull up a chair. Anatolian charcoal grill and sharing boards in Gulshan, Dhaka. |
| IG bio (≤150 chars) | The grill glows. Pull up a chair 🔥<br>Charcoal kebaps · clay-pot güveç · sharing boards<br>📍 EATORA, Gulshan 2 · Daily 12–11pm<br>📲 Book a table ↓ |
| X bio (≤160) | The grill glows. Pull up a chair 🔥 Charcoal kebaps, clay-pot güveç and sharing boards in Gulshan, Dhaka. কয়লা জ্বলছে। চেয়ার টেনে বসুন। |
| About / description | Sofra means the spread laid out when everyone sits down together. Ours is the food of southern Anatolia — Adana, Gaziantep, Hatay — cooked over charcoal and in clay, served on wooden boards built for the middle of the table. Halal meats minced by hand every afternoon, lavaş baked to order, ayran churned in-house. Sharing boards for two, four or eight, private room for 12–40 guests. |
| Main tagline | **The grill glows. Pull up a chair.** · কয়লা জ্বলছে। চেয়ার টেনে বসুন। |
| Long versions | Where the grill glows and nobody is in a hurry. · যেখানে কয়লা জ্বলে আর কারও কোনো তাড়া নেই।<br>Pull up a chair — the board is for everyone. · চেয়ার টেনে বসুন — বোর্ড সবার জন্য। |
| Alt tagline | Slow Anatolian cooking, shared the Dhaka way. · ধীর আনাতোলিয়ান রান্না, ঢাকার ঢঙে ভাগ করে খাওয়া। |
| Bangla description | ঢাকায় আনাতোলিয়ান রান্নাঘর — কাঠকয়লার কাবাব, শেয়ারিং বোর্ড, মেজে ও বাকলাভা। |
| Website | https://sofra.com.bd/ (demo copy until the domain is live: https://th3iatech.github.io/sofra.com.bd/) |
| Location | Sofra at **EATORA** Food Court & Lifestyle — map: https://share.google/tuDohqzPGflG0DSWH |
| Address | Plot-188, Gulshan North Avenue, Dhaka 1212 |
| Phone / WhatsApp | +880 1713-115005 (same number for calls and WhatsApp) |
| Email | info@sofra.com.bd |
| Hours | Monday–Sunday 12:00–23:00 |
| Price range | ৳৳৳ (BDT 800–1,500 per person) |
| Services | Dine-in, Reservations, Private dining, Group bookings, Takeaway |
| Payment | Cash, bKash, Nagad, Visa/Mastercard |

## Image files (this folder)

| File | Use |
|---|---|
| `profile-1080.png` | Profile picture — Facebook and Instagram |
| `fb-cover-eatora-1640x924.jpg` | Facebook cover — EATORA entrance with the Sofra logo (**uploaded manually 2026-09-14**) |
| `post-1-adana.jpg`, `post-2-board.jpg`, `post-3-calamari.jpg`, `post-4-lamb-chops.jpg`, `post-5-wings.jpg`, `post-6-hummus.jpg` | First six posts, 1080×1080 |
| `story-eatora-1080x1920.jpg` | First story — "Now open at EATORA" |
| `x-header-eatora-1500x500.jpg` | X (Twitter) header, EATORA entrance, text kept clear of the profile photo |
| `yt-banner-eatora-2560x1440.jpg` | YouTube banner; logo + text inside the 1546×423 area shown on every device |

Do **not** use `fb-cover-1640x924.jpg`, `post-2-long-board.jpg`, `post-4-room.jpg`, `post-5-mixed-grill.jpg`, `story-1080x1920.jpg`, `x-header-1500x500.jpg` or `yt-banner-2560x1440.jpg` — they show the old venue or its ADANA SOFRASI branding.
| `yt-profile-800.png` | YouTube profile picture (also fine for X) |

Full path on this PC: `D:\github\sofra.com.bd\social\` — the extension can only attach files via the browser's file picker, so have this folder open in Explorer.

---

## Prompt 1 — Create the Facebook Page

```
You are setting up a Facebook Page for a restaurant. I am already logged in to Facebook. Work step by step, tell me what you see before each click, and STOP and ask me if Facebook shows a captcha, a phone/email verification, or anything unexpected. Do not create anything twice — if a page named "Sofra Dhaka" already exists in my Pages list, open it instead of creating a new one.

1. Go to https://www.facebook.com/pages/create
2. Page name: Sofra Dhaka
   Category: Turkish Restaurant (if that is not offered, choose "Restaurant" and add "Mediterranean Restaurant" as a second category)
   Bio: The grill glows. Pull up a chair. Anatolian charcoal grill and sharing boards in Gulshan, Dhaka.
   Click Create Page.
3. Profile picture: click "Add profile picture" and choose
   D:\github\sofra.com.bd\social\profile-1080.png
   Cover photo: ALREADY UPLOADED manually (the EATORA entrance with the Sofra logo) — do not change it.
   If the file picker does not open, tell me and I will pick the file myself.
4. Open the page's "Edit details" / "Manage" > "Page setup" > "Set up your Page" and fill in:
   - Website: https://sofra.com.bd/
   - Email: info@sofra.com.bd
   - Phone: +880 1713-115005 (set the country code selector to Bangladesh +880, then enter 1713115005)
   - WhatsApp: +880 1713-115005 (same number)
   - Address: Plot-188, Gulshan North Avenue, Dhaka 1212, Dhaka, Bangladesh, and turn on "Show map"
   - Hours: Open on selected hours, Monday to Sunday 12:00 – 23:00
   - Price range: $$$
   - Services / options: Dine-in, Reservations, Takeaway
   - Description / About: Sofra means the spread laid out when everyone sits down together. Ours is the food of southern Anatolia — Adana, Gaziantep, Hatay — cooked over charcoal and in clay, served on wooden boards built for the middle of the table. Halal meats minced by hand every afternoon, lavaş baked to order, ayran churned in-house. Sharing boards for two, four or eight, private room for 12–40 guests.
   Save each section.
5. Set the username: Settings > Page setup > Username (or "Create @username") → sofra.dhaka. If it is taken, try sofradhaka, then sofra.gulshan, and tell me which one worked.
6. Add an action button: "Send WhatsApp message" → +880 1713-115005. If Facebook asks to verify the WhatsApp number with a code, STOP and ask me for it. If WhatsApp is not offered, use "Send message". Confirm with me before saving.
7. Finally, read back to me: the Page URL, the username that was accepted, and any fields you could not fill.
```

## Prompt 2 — Create the Instagram account (business) and link it

Instagram will send a confirmation code to the email or phone you use. The extension cannot read that code, so it will pause and ask you for it.

```
You are creating an Instagram business account for the restaurant Sofra and linking it to its Facebook Page "Sofra Dhaka". Work step by step, tell me what you see before each click, and STOP to ask me whenever Instagram or Facebook asks for a verification code, a captcha, a password or a date of birth. Never guess codes and never type a password — let me do it. Do not create a second account if one named sofra.dhaka / Sofra Dhaka already exists — tell me instead.

1. Go to https://www.instagram.com/accounts/emailsignup/ (if an Instagram account is already logged in, stop and ask me whether to log out first).
2. Sign up with the MOBILE NUMBER (not email — the email domain can't receive codes yet):
   - Mobile number: +880 1713115005
   - Full name: Sofra Dhaka
   - Username: sofra.dhaka (if taken try sofradhaka, then sofra.gulshan — tell me which was accepted)
   - Password: pause and let me type it
   - Birthday: pause and let me enter it
3. Instagram will send an SMS code to that number: stop and ask me for it, then enter it.
4. Skip "find friends", contact syncing, "follow suggested accounts" and notification prompts. Do not upload anything from these screens.
5. Switch to a business account: Settings and activity → "Account type and tools" → "Switch to professional account" → Business.
   - Category: Turkish Restaurant (if not offered: Restaurant). Show category on profile: ON.
   - Contact options: Email info@sofra.com.bd · Phone +880 1713-115005 · Address: Plot-188, Gulshan North Avenue, Dhaka 1212 (city Dhaka). Show contact info: ON.
   - If it offers to connect a Facebook Page here, choose "Sofra Dhaka" (pause if it asks me to log in to Facebook).
6. Edit profile:
   - Profile picture: D:\github\sofra.com.bd\social\profile-1080.png (if the file dialog won't cooperate, stop and tell me)
   - Name: Sofra · Anatolian Kitchen
   - Bio (four lines, exactly):
     The grill glows. Pull up a chair 🔥
     Charcoal kebaps · clay-pot güveç · sharing boards
     📍 EATORA, Gulshan 2 · Daily 12–11pm
     📲 Book a table ↓
   - Links → Add external link: URL https://sofra.com.bd/  Title: Book a table
   - Contact options / Action buttons: add WhatsApp +880 1713-115005 (if it sends a WhatsApp code, stop and ask me). If a "Reserve" or "Order food" button is offered, skip it.
   Save.
7. Link the Facebook Page (skip if step 5 already did it): Settings → Accounts Center → Accounts → Add accounts → Facebook, then in business settings connect the Page "Sofra Dhaka". Pause for me at any login.
8. Read back to me: the profile URL, the username accepted, whether the Facebook Page is linked, whether the WhatsApp button is live, and anything left unfinished. Do NOT post anything yet.
```

## Prompt 3 — First posts (run after both pages exist)

```
Publish the first posts on the Facebook Page "Sofra Dhaka" and cross-post to Instagram where the option exists. Use these files from D:\github\sofra.com.bd\social\ and these captions exactly. Post them one at a time, confirm each is published before the next, and stop if any upload fails.

Post 1 — post-1-adana.jpg
Adana kebap, the way it is done in Adana: lamb minced by hand every afternoon, seasoned with chili and tail fat, charred over charcoal and laid on warm lavaş. Platter or on its own — your call.
আদানা কাবাব — প্রতিদিন বিকালে হাতে কিমা করা খাসি, কাঠকয়লার আগুনে ঝলসানো, গরম লাভাশে।
📍 EATORA, Gulshan 2 · Book: link in bio
#SofraDhaka #AdanaKebap #TurkishFoodDhaka #GulshanEats #DhakaFoodies #Ocakbasi

Post 2 — post-2-board.jpg
The sharing board. Kebaps, köfte, wings, rice and fire-charred tomatoes, laid in the middle of the table for everyone to reach. Made for company.
শেয়ারিং বোর্ড — কাবাব, কোফতা, উইংস, ভাত আর আগুনে ঝলসানো টমেটো, পুরো টেবিলের মাঝখানে সবার জন্য।
#SofraDhaka #SharingBoard #TurkishRestaurantDhaka #GroupDining #DhakaFood

Post 3 — post-3-calamari.jpg
Kalamar tava: crisp-fried calamari, tartar sauce, a squeeze of lemon. The starter the table fights over.
#SofraDhaka #Calamari #DhakaEats #GulshanRestaurant

Post 4 — post-4-lamb-chops.jpg
Lamb chops straight off the charcoal, stacked over fries with blistered peppers and tomatoes. Bring an appetite. Open daily 12:00–23:00 at EATORA, Gulshan North Avenue.
কাঠকয়লায় ঝলসানো ল্যাম্ব চপস — ফ্রাই, ঝলসানো মরিচ আর টমেটোসহ। প্রতিদিন দুপুর ১২টা – রাত ১১টা, ইটোরা, গুলশান নর্থ অ্যাভিনিউ।
#SofraDhaka #LambChops #GulshanDhaka #AnatolianKitchen

Post 5 — post-5-wings.jpg
Kanat: chicken wings marinated in pepper paste, grilled over charcoal and served on lavaş with rice, a charred pepper and tomato.
কানাত — মরিচবাটায় মেরিনেট করা চিকেন উইংস, কাঠকয়লায় গ্রিল করা, লাভাশ, ভাত, ঝলসানো মরিচ আর টমেটোসহ।
#SofraDhaka #ChickenWings #TurkishGrill #DhakaFoodies

Post 6 — post-6-hummus.jpg
Start here. Hummus with warm pide, haydari, babagannuş, muhammara — five meze for the table with a bread basket, ৳1,290.
#SofraDhaka #Meze #Hummus #DhakaFoodies

Then upload story-eatora-1080x1920.jpg as a Story on both accounts with a location sticker for EATORA (if it can be found) and a link sticker to https://sofra.com.bd/
```

## Prompt 4 — Create the X (Twitter) account

X handles have no dots and are at most 15 characters, so the X handle is **@SofraDhaka**.

```
You are creating an X (Twitter) account for a restaurant. Work step by step, tell me what you see before each click, and STOP to ask me whenever X shows a verification code, a captcha/puzzle, a phone-number request, or asks for a password. Never guess codes and never type a password — let me do it.

1. Go to https://x.com/i/flow/signup and choose "Create account" (not "Sign up with Google/Apple").
2. Name: Sofra Dhaka
   Email: info@sofra.com.bd (if a verification code can't be received there yet, stop and I will give you a Gmail instead)
   Date of birth: [DD MM YYYY of the account owner]
3. When X asks for the verification code, stop and ask me for it. When it asks for a password, stop and let me type it.
4. Skip "upload a profile picture" for now if the file picker does not open (we'll do it in step 6), skip "import contacts", skip "turn on notifications", skip the interests/who-to-follow screens.
5. Username: SofraDhaka. If taken, try SofraDhakaBD, then SofraGulshan, and tell me which one was accepted.
6. Open the profile → "Edit profile" and set:
   - Header photo: D:\github\sofra.com.bd\social\x-header-eatora-1500x500.jpg
   - Profile photo: D:\github\sofra.com.bd\social\yt-profile-800.png
     (if a file picker cannot be opened, tell me and I will choose the files myself; when the crop box appears, keep the logo centred and click Apply)
   - Name: Sofra · Anatolian Kitchen
   - Bio: The grill glows. Pull up a chair 🔥 Charcoal kebaps, clay-pot güveç and sharing boards in Gulshan, Dhaka. কয়লা জ্বলছে। চেয়ার টেনে বসুন।
   - Location: EATORA, Gulshan North Avenue, Dhaka
   - Website: https://sofra.com.bd/
   Save.
7. Go to Settings and privacy → Your account → Account information → "Professional account" (or open https://x.com/i/flow/convert_to_professional), choose Business, category "Restaurant". Do NOT subscribe to Premium or Verified Organizations or enter any payment details — if a step requires payment, skip it and tell me.
8. Write and post a pinned first post:
   Now open at EATORA, Gulshan North Avenue 🔥 Sofra is the food of southern Anatolia — Adana kebap over charcoal, lavaş baked to order, meze & baklava for the whole table. Open daily 12:00–23:00.
   Book a table: https://sofra.com.bd/ · WhatsApp +880 1713-115005
   #SofraDhaka #TurkishFoodDhaka #GulshanEats
   Attach D:\github\sofra.com.bd\social\post-2-board.jpg. After posting, open the "…" menu on the post → "Pin to your profile".
9. Read back to me: the profile URL, the handle accepted, and anything left unfinished.
```

## Prompt 5 — Create the YouTube channel

A YouTube channel lives on a Google account. Using "custom name" creates a separate brand channel,
so the restaurant channel can later be shared with other managers without sharing your Gmail.

```
You are creating a YouTube channel for a restaurant. I am already logged in to my Google account in this browser. Work step by step, tell me what you see before each click, and STOP and ask me if Google asks for a password, a phone verification, a captcha, or anything unexpected. If a channel named "Sofra Dhaka" already exists under my account (check the account switcher), use it instead of creating another.

1. Go to https://www.youtube.com/account and click "Add or manage your channel(s)" → "Create a channel". If you are only offered "Create a channel" with my personal name, look for "use a custom name" / "Create a new channel" so it becomes a separate brand channel.
2. Name: Sofra Dhaka
   Handle: @sofra.dhaka (if taken try @sofradhaka, then @sofragulshan — tell me which was accepted)
   Tick the agreement box and click Create. If a profile picture step appears and the picker opens, use D:\github\sofra.com.bd\social\yt-profile-800.png.
3. Go to https://studio.youtube.com → Customization → "Profile" tab and set:
   - Banner image: D:\github\sofra.com.bd\social\yt-banner-eatora-2560x1440.jpg → keep the default crop (the logo is already inside the "visible on all devices" box) → Done
   - Picture: D:\github\sofra.com.bd\social\yt-profile-800.png
   - Name: Sofra Dhaka   Handle: (leave the accepted one)
   - Description:
     The grill glows. Pull up a chair.
     Sofra means the spread laid out when everyone sits down together. Ours is the food of southern Anatolia — Adana, Gaziantep, Hatay — cooked over charcoal and in clay, served on wooden boards built for the middle of the table. Kitchen stories, charcoal-grill videos and dishes from our restaurant at EATORA, Gulshan North Avenue, Dhaka.
     ঢাকায় আনাতোলিয়ান রান্নাঘর — কাঠকয়লার কাবাব, শেয়ারিং বোর্ড, মেজে ও বাকলাভা।
     Open daily 12:00–23:00 · Book a table: https://sofra.com.bd/
   - Links (add each): Website → https://sofra.com.bd/ ; Facebook → [Facebook Page URL from Prompt 1] ; Instagram → [Instagram URL from Prompt 2] ; X → [X URL from Prompt 4]
   - Contact info email: info@sofra.com.bd (if a verification code can't be received there yet, stop and I will give you a Gmail instead)
   If a file picker cannot be opened, tell me and I will choose the file myself.
   Click Publish (top right).
4. Studio → Customization → "Branding" → Video watermark: D:\github\sofra.com.bd\social\yt-profile-800.png, display "End of video". Publish.
5. Studio → Settings → Channel → Basic info: Country of residence Bangladesh; Keywords: Sofra, Sofra Dhaka, Turkish restaurant Dhaka, Adana kebap, Gulshan restaurant, Anatolian food, Dhaka food. Save. Do not change monetisation or advanced settings.
6. Read back to me: the channel URL (https://www.youtube.com/@…), the handle accepted, and anything left unfinished.
```

## After the pages exist

Put the real URLs into `assets/js/site-config.js` (`social.facebook`, `social.instagram`) so the icons on the website point to them, then push. The site currently shows Instagram / Facebook / TikTok icons; to show X and YouTube instead, `index.html` (header + footer icon rows) and `main.js` need the two new entries.
