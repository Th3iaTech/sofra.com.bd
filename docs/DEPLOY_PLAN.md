# Sofra — Deploy Plan (website + email)

Status as of 2026-09-14. Companion to [ARCHITECTURE.md](ARCHITECTURE.md).

## 1. Where we are

| Item | State |
|---|---|
| Site | Static, 5 pages, bilingual. Live demo on GitHub Pages: https://th3iatech.github.io/sofra.com.bd/ |
| Repo | `Th3iaTech/sofra.com.bd`, **public** (org free plan blocks Pages on private repos) |
| Domain | `sofra.com.bd` **does not resolve**. Even BTCL's own servers (`surma`/`jamuna.btcl.net.bd`, `dns.bd`) return SERVFAIL, so registration/NS at BTCL must be checked first |
| Email | **None.** `hello@` and `reservations@sofra.com.bd` are only written in `assets/js/site-config.js` |
| Forms | Reservation form = WhatsApp link or `mailto:`; newsletter = `mailto:`. Nothing is sent from a server |
| Placeholders | phone, WhatsApp number, address, chef bio, set-menu price |

## 2. Email is two separate jobs

| Job | What it is | Example |
|---|---|---|
| **A. Mailboxes** | People read and reply to mail | `hello@`, `reservations@`, owner/manager |
| **B. Transactional sending** | The website sends mail automatically | New-booking alert to staff + confirmation to the guest |

Keep them on **different providers and different sending domains** (`sofra.com.bd` for people,
`mail.sofra.com.bd` for the website). Then a spam complaint about a website email can't
damage the mailboxes' reputation.

### A. Mailbox options

| Option | Cost | Pros | Cons | Verdict |
|---|---|---|---|---|
| **Zoho Mail — Forever Free** | Free (up to 5 users) | Real mailboxes, mobile app, good deliverability | Free tier = web + app only (no IMAP/Outlook); verify current limits | **Recommended start** |
| Google Workspace Business Starter | Paid per user/month | Gmail UX, best deliverability, Calendar/Drive | Recurring cost | Upgrade path if staff want Gmail |
| Cloudflare Email Routing -> personal Gmail | Free | Zero setup, no new app | Receive-only; replying *as* @sofra needs extra SMTP setup; messy for a team | OK only as a stopgap |
| HostUp cPanel mail | Already paid | Nothing to buy | Shared IP, Imunify360 greylisting history on that host, weak deliverability | Not recommended |
| Self-hosted (mailcow on a droplet) | VPS cost | Full control | DigitalOcean blocks outbound port 25 by default; IP reputation, patching, backups | **Rejected** |

Suggested mailboxes (fits 5 free users): `hello@` (main), `reservations@` (shared by floor staff),
`owner@`, `accounts@`; add `dmarc@` as an **alias** (not a user) for DMARC reports.

### B. Transactional options

| Option | Free tier (verify) | Notes |
|---|---|---|
| **Resend** | ~3,000/mo, 100/day | Clean API, simple domain verification. **Recommended** |
| Brevo | ~300/day | Also SMTP; has newsletter tooling for later |
| Amazon SES | Pay per use, very cheap | Needs AWS account + sandbox exit request |
| Form SaaS (Formspree / Web3Forms) | Small free tiers | No code, but their branding/limits, and no guest confirmation email |

A static site cannot hold an API key, so sending needs a **small server-side function**.
That is the main reason to move hosting (see 3).

## 3. Hosting decision

**Recommended: Cloudflare (DNS + Pages + Pages Functions + Turnstile), keep GitHub Pages as fallback.**

| | GitHub Pages (today) | Cloudflare Pages |
|---|---|---|
| Server-side form handler | No | Yes (`functions/api/reserve.js`) |
| Private repo | No (org plan) | Yes |
| Bot protection | No | Turnstile (free CAPTCHA) |
| DNS for email records | Needs separate DNS host | Same dashboard |
| CDN near BD mobile users | Fastly | Cloudflare edge network (has a Dhaka location) |
| Cost | Free | Free tier covers this site |

Vercel works too, but you'd still need a separate DNS provider for the mail records. HostUp could
also host it, but that means FTP deploys and shared-IP risk, for no real gain.

## 4. Target DNS (Cloudflare zone `sofra.com.bd`)

Placeholders `<...>` come from each provider's admin console. Copy them from there; don't guess.

| Name | Type | Value | Purpose |
|---|---|---|---|
| (BTCL registry) | NS | the 2 Cloudflare nameservers assigned to the zone | Delegation |
| `@` | CNAME (flattened) | `<project>.pages.dev` (added via Pages -> Custom domains) | Website |
| `www` | CNAME | `<project>.pages.dev` + redirect rule www -> apex | Website |
| `@` | MX | Zoho MX set (e.g. `mx.zoho.com` 10 / `mx2` 20 / `mx3` 50 — use the region shown in console) | Mailboxes |
| `@` | TXT | `v=spf1 include:zoho.com ~all` | SPF for mailboxes |
| `<zoho-selector>._domainkey` | TXT | `<Zoho DKIM key>` | DKIM for mailboxes |
| `zb<code>` / verification | TXT or CNAME | `<Zoho verification>` | Domain ownership |
| `mail` (subdomain) | MX / TXT | `<Resend bounce MX + SPF>` | Transactional sending domain |
| `resend._domainkey.mail` | TXT | `<Resend DKIM key>` | DKIM for website email |
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:dmarc@sofra.com.bd; adkim=s; aspf=r` | DMARC (monitor first) |
| `@` | CAA | `0 issue "letsencrypt.org"`, `0 issue "pki.goog"` (optional) | Limit who can issue TLS certs |
| `admin`, `api` | — | reserved for Phase 2 backend | Later |

Grey-cloud (DNS-only) every mail record. Cloudflare can't proxy MX/TXT anyway, but check
there's no stray proxied `mail` A record.

## 5. Rollout

### Phase 0 — Unblock the domain (owner action, ~1 day + BTCL time)
1. Log in to the BTCL domain portal with the account that registered `sofra.com.bd`. Confirm it is **registered, paid, and active**, and note the expiry date.
2. If it isn't registered, register it (needs trade licence / NID per BTCL rules).
3. Don't change NS yet. First create the Cloudflare zone (Phase 1) so you know the target nameservers.

**Exit check:** registration active; renewal date on the calendar.

### Phase 1 — DNS + mailboxes (~2 hours of work, then propagation wait)
1. Create a free Cloudflare account and add zone `sofra.com.bd`. Note the 2 assigned nameservers.
2. At BTCL, set those 2 nameservers. Propagation for `.com.bd` can be slow; allow up to 48h.
3. Create the Zoho Mail org and add domain `sofra.com.bd`. Add the verification record, then MX, SPF and DKIM in Cloudflare.
4. Create the users and aliases from 2A. Install the Zoho Mail app for staff.
5. Add the DMARC record at `p=none`.

**Exit checks:**
- `Resolve-DnsName sofra.com.bd -Type NS -Server 1.1.1.1` returns the Cloudflare nameservers
- `Resolve-DnsName sofra.com.bd -Type MX -Server 1.1.1.1` returns Zoho
- Gmail -> `hello@` arrives; `hello@` -> Gmail arrives, and "Show original" shows **SPF=pass, DKIM=pass, DMARC=pass**
- mail-tester.com score of 9/10 or better from `hello@`

### Phase 2 — Website on the real domain (~half a day)
1. Cloudflare Pages -> connect the GitHub repo `Th3iaTech/sofra.com.bd`. Branch `main`, no build command, output dir `/`.
2. Add custom domains `sofra.com.bd` and `www.sofra.com.bd`, with a redirect rule www -> apex. TLS is automatic.
3. Add `_headers`: long cache for `assets/img/*` and `assets/*`, short cache for `*.html`, plus basic security headers (`X-Content-Type-Options`, `Referrer-Policy`, and a CSP that allows the cdnjs/jsdelivr libs already in use).
4. Fill the real phone, WhatsApp, address and social URLs in `site-config.js`.
5. GitHub Pages: leave it on as a fallback at the `github.io` URL. **Don't** add a `CNAME` file (the domain now points to Cloudflare).
6. Optional: once on Cloudflare the repo can go private again. Pages would then stop working, so decide consciously.

**Exit checks:** `https://sofra.com.bd` loads on mobile data; the Playwright suite (desktop + mobile) is green against the live URL; `http://` and `www` both redirect to `https://sofra.com.bd`.

### Phase 3 — Real reservation email (~1 day)
1. Sign up for Resend and add sending domain `mail.sofra.com.bd`. Add its DKIM/SPF/MX records, then wait for "Verified".
2. Add a Turnstile widget for `sofra.com.bd`. You get a site key (public) and a secret key.
3. Add `functions/api/reserve.js` (Cloudflare Pages Function):
   - Accept POST JSON `{name, phone, email, date, time, guests, notes, lang, turnstileToken}`
   - Verify Turnstile server-side and reject if it fails
   - Validate fields: length caps, date not in the past, guests 1–20; plain-text rendering only, never user HTML
   - Send email #1 to `reservations@sofra.com.bd` with `Reply-To:` set to the guest
   - Send email #2 to the guest: bilingual (EN/BN from `lang`), "request received — we will confirm by phone/WhatsApp"
   - Rate-limit per IP with a Cloudflare rate-limiting rule on `/api/reserve`
   - Secrets `RESEND_API_KEY` and `TURNSTILE_SECRET` as Pages env vars, **never in the repo**
4. Frontend: add a primary **"Book table"** button that POSTs to `/api/reserve`. Keep **WhatsApp** as the second option. Keep `mailto:` only as a no-JS fallback.
5. Newsletter: collect addresses in Brevo (or a Cloudflare D1 table) instead of `mailto:`. It needs a consent checkbox and an unsubscribe link before the first send.

**Why the safeguards matter:** a form that emails any address the visitor types in is a spam relay. Turnstile, the rate limit, a fixed template and plain text keep it from being abused, and keep `mail.sofra.com.bd` off blocklists.

**Exit checks:** a booking from a phone arrives in the `reservations@` Zoho inbox in under a minute and the guest copy lands in the **inbox, not spam** (test Gmail + Outlook + Yahoo); a submit without a Turnstile token gets 403; the 11th rapid submit gets 429.

### Phase 4 — Harden (2–4 weeks after Phase 3)
1. Read the DMARC reports. If only Zoho and Resend send for the domain, move to `p=quarantine`, later `p=reject`.
2. Turn on Cloudflare Web Analytics (free, cookie-less).
3. Set up the Google Business Profile with the website link and the reservations phone.
4. Monitoring: a free UptimeRobot check on `https://sofra.com.bd` and `/api/reserve` (GET -> 405) alerting to `owner@`.

### Phase 5 — Backend (per ARCHITECTURE.md, later)
- `api.sofra.com.bd` takes over the email adapter using the **same Resend domain**; the Pages Function then becomes a thin proxy or is removed.
- `admin.sofra.com.bd` gets a reservations inbox and status (pending/confirmed/cancelled), so confirmation emails can say "confirmed" instead of "received".

## 6. Rollback

| Failure | Rollback |
|---|---|
| Cloudflare Pages broken | Demo still on GitHub Pages; point the apex at `th3iatech.github.io` (A records 185.199.108–111.153) + add a `CNAME` file |
| Reservation function failing | Frontend falls back to the WhatsApp button (already there); disable the "Book table" button via `site-config.js` flag |
| Mail provider problem | MX changes take effect within the DNS TTL (set TTL 300 during migration, 3600 after) |
| Deliverability drop | DMARC stays at `p=none` until reports are clean; website mail is isolated on `mail.` so mailboxes are unaffected |

## 7. Running cost (starting point)

| Item | Cost |
|---|---|
| `.com.bd` domain (BTCL) | Annual renewal |
| Cloudflare DNS, Pages, Functions, Turnstile, Analytics | Free tier |
| Zoho Mail (up to 5 users) | Free tier |
| Resend | Free tier (fine for restaurant booking volume) |
| **Total recurring** | **Domain renewal only**, until Workspace or paid tiers are needed |

Free-tier limits change. Re-check each provider's pricing page on the day of signup.

## 8. Decisions needed from Sofra

1. **Domain:** who holds the BTCL login for `sofra.com.bd`, and is it registered and active?
2. **Mailboxes:** Zoho free (recommended) or Google Workspace (paid)? Which mailbox names?
3. **Hosting:** move to Cloudflare Pages (recommended) or stay on GitHub Pages with a form SaaS?
4. **Booking flow:** instant email confirmation ("request received") plus a staff call-back, or WhatsApp-only?
5. **Real details:** phone, WhatsApp number, street address, opening hours.
