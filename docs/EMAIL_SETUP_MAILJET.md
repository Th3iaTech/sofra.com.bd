# Sofra — Email setup (free): Cloudflare Email Routing + Mailjet

Addresses: `info@`, `ceo@`, `chef@`, `mustafa@`, `yeasef@` `sofra.com.bd`

## How it works

**Mailjet only SENDS email; it has no inboxes.** So receiving and sending are split:

```
RECEIVE:  someone -> ceo@sofra.com.bd -> Cloudflare Email Routing (free) -> forwards to CEO's Gmail
SEND:     CEO's Gmail "Send mail as ceo@sofra.com.bd" -> Mailjet SMTP (free) -> recipient
```

Every person keeps using the Gmail app they already have and picks `@sofra.com.bd` as the From address.

**Free limits:** Mailjet allows 6,000 emails a month and **200 a day, shared by all 5 people plus the website**. Mail over the daily cap waits in a queue for the next day and is deleted after 3 days. Cloudflare Email Routing is free.

---

## Step 0 — Make the domain work (blocker)

`sofra.com.bd` currently does not resolve at all.
1. Log in to the BTCL domain portal. Confirm the domain is **registered, paid and active**.
2. Keep the portal open; you'll paste new nameservers in Step 1.

## Step 1 — Move DNS to Cloudflare (free)

1. Sign up at https://dash.cloudflare.com → **Add a domain** → `sofra.com.bd` → **Free** plan.
2. Cloudflare shows **2 nameservers** (e.g. `xxx.ns.cloudflare.com`). Copy both.
3. In the BTCL portal, replace the nameservers with those 2 and save.
4. Wait for Cloudflare to email "sofra.com.bd is now active". This can take up to 24–48h for `.com.bd`.

## Step 2 — Collect everyone's Gmail

Fill this in before continuing:

| Sofra address | Forward to (Gmail) | Who |
|---|---|---|
| `info@sofra.com.bd` | `__________@gmail.com` | shared / front desk |
| `ceo@sofra.com.bd` | `__________@gmail.com` | CEO |
| `chef@sofra.com.bd` | `__________@gmail.com` | Head chef |
| `mustafa@sofra.com.bd` | `__________@gmail.com` | Mustafa |
| `yeasef@sofra.com.bd` | `__________@gmail.com` | Yeasef |

Tip: create one shared Gmail (e.g. `sofra.dhaka.info@gmail.com`) for `info@` so it isn't tied to one person.

## Step 3 — Receiving: Cloudflare Email Routing

1. Cloudflare dashboard → `sofra.com.bd` → **Email** → **Email Routing** → **Get started / Onboard domain**.
2. Accept the DNS records it adds: MX `route1/2/3.mx.cloudflare.net`, an SPF TXT, and a DKIM TXT.
3. **Destination addresses** → add each Gmail from Step 2. Each person must open the Cloudflare verification email and click **Verify email address**.
4. **Routing rules** → **Create address** 5 times:
   - `info` → shared Gmail
   - `ceo` → CEO Gmail
   - `chef` → chef Gmail
   - `mustafa` → Mustafa Gmail
   - `yeasef` → Yeasef Gmail
5. Optional: **Catch-all** → send to the `info` Gmail, so typos like `reservation@` aren't lost.
6. **Test:** from any other email, send a message to each of the 5 addresses. Each should land in the right Gmail within a minute.

## Step 4 — Sending: Mailjet account

1. Sign up at https://www.mailjet.com → **Free** plan. Use the shared/info Gmail for the login. New accounts can be put under review for up to a day; answer honestly: restaurant, staff email + booking confirmations.
2. **Account settings → Senders & Domains → Add domain** → `sofra.com.bd`.
3. Mailjet shows a **domain ownership TXT record**. Add it in Cloudflare DNS, then click verify.
4. **Setup SPF/DKIM Authentication** (gear icon next to the domain):
   - **DKIM:** add the record exactly as Mailjet shows it (host `mailjet._domainkey`, copy type and value from Mailjet)
   - **SPF:** there must be **ONE** SPF record only. Edit the one Cloudflare created in Step 3 so it reads:
     ```
     v=spf1 include:_spf.mx.cloudflare.net include:spf.mailjet.com ~all
     ```
   - Wait until Mailjet shows SPF **OK** and DKIM **OK** in green.
5. **DMARC:** in Cloudflare DNS add a TXT record, name `_dmarc`:
   ```
   v=DMARC1; p=none; rua=mailto:info@sofra.com.bd
   ```
6. **Account settings → Email tracking:** turn **OFF** open tracking and click tracking. Otherwise Mailjet rewrites every link in staff emails and adds a tracking pixel.
7. **Account settings → SMTP and SEND API settings** (or **API Key Management**): copy the **API Key** (SMTP username) and **Secret Key** (SMTP password).

## Step 5 — Each person: Gmail "Send mail as" (repeat 5 times)

Do this on a **computer** in Gmail on the web; the phone app picks it up afterwards.

1. Gmail → ⚙️ → **See all settings** → **Accounts and Import** → **Send mail as** → **Add another email address**.
2. Name: `Sofra — CEO` (or the person's name). Email: `ceo@sofra.com.bd`. Leave **Treat as an alias** ticked → **Next**.
3. SMTP settings:
   | Field | Value |
   |---|---|
   | SMTP Server | `in-v3.mailjet.com` |
   | Port | `587` |
   | Username | Mailjet **API Key** |
   | Password | Mailjet **Secret Key** |
   | Security | **Secured connection using TLS** |
4. **Add account**. Gmail sends a confirmation email to `ceo@sofra.com.bd`. Cloudflare forwards it back to the same Gmail; click the link (or paste the code).
5. Back in **Accounts and Import**, set:
   - **When replying to a message:** "Reply from the same address the message was sent to"
   - Optional: make the `@sofra.com.bd` address **default**.
6. **Test:** compose → choose From `ceo@sofra.com.bd` → send to an outside address, e.g. a Yahoo/Outlook one. In the recipient's "Show original", check **SPF: PASS, DKIM: PASS, DMARC: PASS**.

## Step 6 — Final checks

- [ ] All 5 addresses receive (Step 3.6)
- [ ] All 5 people can send as their address (Step 5.6)
- [ ] Mailjet dashboard shows the sent test emails as **Delivered**
- [ ] https://www.mail-tester.com score **≥ 9/10** from one address
- [ ] `site-config.js`: set `email` to `info@sofra.com.bd` (currently `hello@`), and `reservationsEmail` to `info@` too, or add a `reservations` routing rule

## Things to know

| Topic | Note |
|---|---|
| Daily cap | 200/day for everyone combined. If staff hit it, upgrade Mailjet or move mailboxes to Zoho Mail free (up to 5 users, real inboxes). |
| Shared key | All 5 Gmails use the same Mailjet API key. If someone leaves: Mailjet → regenerate the Secret Key → update it in the remaining 4 Gmails. |
| Sent folder | Sent mail stays in each person's Gmail Sent folder, as normal. |
| Branding | The free plan adds Mailjet branding to campaign emails. Check a test email; SMTP relay mail is normally sent as-is. |
| No MX conflict | Don't add other MX records later (Zoho, cPanel). Cloudflare Email Routing must stay the only MX. |
| Website | Booking-form emails can later use the same Mailjet account (API) — they count toward the same 200/day. |
