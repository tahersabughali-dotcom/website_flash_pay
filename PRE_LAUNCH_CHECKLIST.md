# Flash Pay — Pre-Launch Checklist

Use this list before making the site public at **https://www.flashpay.uk**

Check each item when complete.

---

## Contact & settings (`src/data/settingsData.ts`)

- [ ] Real **WhatsApp number** set (not `0000000000`)
- [ ] **websiteUrl** set to `https://www.flashpay.uk`
- [ ] **NEXT_PUBLIC_SITE_URL** set on Vercel to `https://www.flashpay.uk`
- [ ] **Email** checked and mailbox works
- [ ] **Social links** checked (Facebook, Instagram, Telegram) or left empty
- [ ] **Logo** file added at `public/images/logo.png` (text fallback works until added)
- [ ] **Open Graph image** added at `public/images/og-default.png`
- [ ] **SEO titles and descriptions** reviewed
- [ ] **Support hours** updated if known

---

## Technical checks

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] **Sitemap** works: visit `/sitemap.xml` after deploy
- [ ] **Robots** works: visit `/robots.txt` after deploy
- [ ] **Feature flags** reviewed in `src/data/featureFlagsData.ts`
- [ ] **Chat widget** (`showChatWidget`) — keep off or test thoroughly before production
- [ ] **OPENAI_API_KEY** not exposed to browser; AI chat disabled until tested
- [ ] **Supabase chat** — do not enable in production until auth, RLS, and `/admin/chat` protection are live
- [ ] **SUPABASE_SERVICE_ROLE_KEY** never in client code or Git
- [ ] **`showChatAdminPreview`** and **`NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW`** disabled in production
- [ ] **`showRequestAdminPreview`** disabled in production — `/admin/requests` is local preview only
- [ ] **`showAdminDashboardPreview`** and **`showContentAdminPreview`** disabled in production
- [ ] **`/admin`** and all `/admin/*` routes not deployed publicly without Supabase Auth + secure database
- [ ] **`/admin/requests`** not enabled in production without Supabase Auth + secure database
- [ ] Public request center still relies on **WhatsApp** — do not claim internal receipt until backend is active
- [ ] **`enableAdminAuth`** enabled only with Supabase Auth + `ADMIN_ALLOWED_EMAILS`
- [ ] **`ADMIN_ALLOWED_EMAILS`** set on server only — no real emails in Git
- [ ] Run `supabase/schema.sql` and apply **production** RLS (not local-dev anon policies)
- [ ] `/admin/login` and `/admin/chat` tested with magic link auth locally before go-live
- [ ] No hardcoded WhatsApp number in components (only `settingsData.ts`)

---

## Public chat — before enabling in production

Before turning on `showChatWidget` or connecting live Supabase chat for real visitors:

- [ ] Run local chat QA: `npx tsx scripts/run-chat-tests.ts` (or `window.flashPayRunChatTests()` in dev console) — all cases must **pass** with no forbidden claims
- [ ] **`enableChatAi`** remains `false` unless AI is tested end-to-end with guardrails
- [ ] **Supabase** schema, RLS, and Realtime secured — no broad anon policies in production
- [ ] **`/admin/chat`** protected with `enableAdminAuth` + allowed emails — never public
- [ ] Chat must **not** promise guaranteed rates, fees, execution time, or official agency status
- [ ] Human handoff copy must state **WhatsApp is the fastest contact path** until live agents are active
- [ ] Review `src/data/chatTestCasesData.ts` after any knowledge or template change

---

## Request management dashboard (Step 21 — local preview only)

Before enabling request admin in production:

- [ ] **`showRequestAdminPreview: false`** in `src/data/featureFlagsData.ts` for production deploys
- [ ] **`/admin/requests`** protected with `enableAdminAuth` + `ADMIN_ALLOWED_EMAILS` — never public
- [ ] **`/admin/requests`** has `robots: noindex, nofollow` — not linked in main navigation or sitemap
- [ ] Public visitors still submit via **WhatsApp** — do not claim staff received the request until Supabase/backend is live
- [ ] Review `REQUEST_MANAGEMENT_PLAN.md` before creating production tables and RLS
- [ ] Local request drafts (`localStorage`) are **dev-only** — not a secure production datastore

---

## Admin control panel (Step 26 — local preview only)

Before enabling admin dashboard in production:

- [ ] **`showAdminDashboardPreview: false`** and **`showContentAdminPreview: false`** for production deploys
- [ ] **`/admin`**, `/admin/content`, `/admin/coverage`, `/admin/settings` protected with `enableAdminAuth` + `ADMIN_ALLOWED_EMAILS`
- [ ] All admin routes have `robots: noindex, nofollow` — not in sitemap or public navigation
- [ ] **Hidden URL is not security** — authentication and permissions required in production
- [ ] Review `ADMIN_DASHBOARD_PLAN.md` before enabling any admin route publicly

---

## Admin login & security (Step 27 — local foundation)

- [ ] **`enableAdminAuth: false`** until Supabase Auth + `ADMIN_ALLOWED_EMAILS` are production-ready
- [ ] **All admin preview flags `false`** in production (`showAdminDashboardPreview`, `showContentAdminPreview`, `showRequestAdminPreview`, `showChatAdminPreview`)
- [ ] **`NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW=false`** in production
- [ ] **`SUPABASE_SERVICE_ROLE_KEY`** server-only — never in client bundle or browser
- [ ] **`ADMIN_ALLOWED_EMAILS`** server-only — show configured yes/no in settings only, never expose values
- [ ] **Hidden URL is not security** — `/admin/login` required before production admin use
- [ ] All `/admin/*` routes: **`robots: noindex, nofollow`** — not in sitemap or public navigation
- [ ] Run `src/lib/auth/adminProductionSafety.ts` checks via `/admin/settings` — **Production safe: yes** before go-live
- [ ] `/admin/login` shows placeholder when auth disabled — no fake successful login

---

## Local Supabase live chat test (Step 17A — dev only)

- [ ] `.env.local` created from `.env.example` (not committed)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set **server-side only** (never in client bundle)
- [ ] `supabase/schema.sql` applied — tables `chat_sessions`, `chat_messages`, `chat_agents` exist
- [ ] RLS enabled; **local-dev policies only** for local testing (disabled before production)
- [ ] Supabase Realtime enabled for `chat_sessions` + `chat_messages` (or accept polling fallback)
- [ ] Two-window test: visitor chat → admin inbox → agent reply → visitor
- [ ] Handoff status `waiting_for_human` syncs in both windows
- [ ] `/admin/chat` status panel shows connection mode (no secrets displayed)
- [ ] Disable unsafe dev RLS policies before any production deploy

---

## Functional tests

- [ ] **Mobile** tested (menu, forms, cards, no horizontal scroll)
- [ ] **WhatsApp** button opens correct number
- [ ] **Smart Request** form → WhatsApp message (optional local draft in dev only — not production receipt)
- [ ] **Business / Partner / Contact** forms → WhatsApp message (prepared, not server-received)
- [ ] **Form spam protection** — honeypot, cooldown, phone/amount validation (client-side only; server validation required before production)
- [ ] **Route Finder** WhatsApp CTA works
- [ ] **Markets** show indicative labels only (no fake live prices)
- [ ] **Trust Center** reviewed
- [ ] **Unknown page** shows clean 404

---

## Legal & safety

- [ ] No unsupported **legal claims** (licensed, authorized, guaranteed rates)
- [ ] **Wallet** page = Coming Soon only (no balances, no deposit/withdraw)
- [ ] **Trade** page = Coming Soon only (no buy/sell, no fake dashboard)
- [ ] Market content marked **informational only**
- [ ] Partner network wording is careful (no false agency claims)

---

## Production lockdown rules (Step 31)

Before deployment, verify **`src/lib/config/featureFlags.ts`** resolves admin previews to **OFF** in production:

- [ ] `NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW=false` (and per-route preview env vars false)
- [ ] `ENABLE_ADMIN_AUTH=false` until Supabase Auth + `ADMIN_ALLOWED_EMAILS` ready
- [ ] `NEXT_PUBLIC_ENABLE_CHAT_AI=false` until tested
- [ ] `NEXT_PUBLIC_ENABLE_LIVE_CHAT_REALTIME=false` until RLS secured
- [ ] Raw `featureFlagsData` preview `true` values do **not** bypass lockdown in production builds
- [ ] Admin routes return 404 / login gate when resolved previews are off
- [ ] Hidden URL is not security
- [ ] Server-side form validation before backend connection
- [ ] Supabase RLS before database writes

---

## Public-only deployment candidate (Step 32)

Run before any public marketing deploy:

```bash
npx tsx scripts/check-production-readiness.ts
```

Or: `npm run check:production`

**Safe to deploy public website only when:**

- [ ] Production readiness script passes (admin/AI/realtime resolved OFF)
- [ ] `PRE_LAUNCH_CHECKLIST.md` critical items checked
- [ ] Legal pages live (`/privacy-policy`, `/terms`, `/risk-disclaimer`, `/security`)
- [ ] Forms use **prepared** WhatsApp copy — not **received**
- [ ] No Supabase production connection unless RLS + auth ready separately

**Not included in public-only deploy:**

- Admin dashboard (`/admin/*`) — local preview only
- Request management inbox — not production backend
- Chat admin inbox — not production feature
- Database writes — require separate Supabase Auth + RLS + server validation

Hidden URL is **not** production security.

---

## Form spam protection (Step 29 — local client-side only)

- [ ] Honeypot field on `/request`, `/contact`, `/business`, `/partners`
- [ ] Cooldown + rate limit active (localStorage) — does not replace server protection
- [ ] Success messages say **prepared** (`تم تجهيز طلبك`) — not **received** unless backend is live
- [ ] **Server-side validation + rate limiting** required before production backend
- [ ] Optional CAPTCHA / Turnstile can be added later — not required for local dev
- [ ] Never rely on client validation or honeypot alone in production

---

## Domain & hosting

- [ ] **Domain connected** in Vercel (`www.flashpay.uk`)
- [ ] **DNS** propagated (domain shows valid in Vercel)
- [ ] **SSL/HTTPS** active (padlock in browser)
- [ ] Production URL matches settings and sitemap

---

## After launch (first 24 hours)

- [ ] Test site from phone on mobile data (not just Wi‑Fi)
- [ ] Share link and confirm Open Graph preview (after OG image added)
- [ ] Monitor for broken links or form issues
- [ ] Keep Vercel deployment history for rollback if needed

---

**Sign-off:** Site is ready for public launch when all critical items above are checked.

Critical = WhatsApp, settings, build, legal safety, SSL, and core form tests.
