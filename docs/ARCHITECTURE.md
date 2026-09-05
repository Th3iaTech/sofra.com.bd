# Sofra — System Architecture

Restaurant platform for **sofra.com.bd**, split into three surfaces that share one backend.

```
                         SOFRA
                      sofra.com.bd
                           |
                  +--------+--------+
                  |                 |
             Customers          Management
                  |                 |
                  v                 v
        +----------------+   +--------------------+
        | Public Website |   | Admin Dashboard    |
        | sofra.com.bd   |   | admin.sofra.com.bd |
        +-------+--------+   +---------+----------+
                |                      |
                +----------+-----------+
                           |
                           v
                +---------------------+
                | Sofra Backend/API   |
                | api.sofra.com.bd    |
                +----------+----------+
                           |
          +----------------+-----------------+
          |                |                 |
          v                v                 v
      Database          Media            Integrations
       MySQL          Storage/CDN             |
                                             +- Email
                                             +- WhatsApp
                                             +- Facebook
                                             +- Instagram
                                             +- TikTok
                                             +- Google
                                             +- Analytics
```

## Surfaces

| Surface | Host | Audience | Purpose |
|---|---|---|---|
| Public Website | `sofra.com.bd` | Customers | Menu, about, location/hours, reservations, ordering, contact |
| Admin Dashboard | `admin.sofra.com.bd` | Management | Menu/price management, orders, reservations, media, social publishing, analytics |
| Backend / API | `api.sofra.com.bd` | Both front-ends | Single source of truth; auth, business logic, integration adapters |

## Data & storage

- **MySQL** — menu, categories, orders, reservations, customers, users/roles, content blocks.
- **Media Storage / CDN** — dish photos, banners, social assets. Served via CDN; API stores references only.

## Integrations (owned by the API layer)

| Integration | Direction | Use |
|---|---|---|
| Email | outbound | Reservation/order confirmations, admin alerts |
| WhatsApp | in/out | Order & reservation notifications, customer chat entry point |
| Facebook | outbound | Page posts, menu/promo publishing |
| Instagram | outbound | Photo/reel publishing |
| TikTok | outbound | Short-video publishing |
| Google | in/out | Business Profile (hours, reviews), Maps, Sign-in |
| Analytics | inbound | Site/app traffic and conversion tracking |

All third-party credentials live only on the API host (env vars / secrets), never in the two front-ends.

## Principles

1. Front-ends are thin: they call `api.sofra.com.bd` and never touch MySQL or integrations directly.
2. Public site must be fast on mobile data (primary BD audience) — SSR/static where possible, images through the CDN.
3. Bilingual-ready (Bangla / English) from day one.
4. Every integration is an adapter behind a common interface so channels can be added/removed without touching core logic.
