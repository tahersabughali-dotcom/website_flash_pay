# Flash Pay Global Platform — Deployment Guide

Simple steps for deploying the website. No programming experience required for most steps.

---

## 1. Run the website locally (on your computer)

1. Open a terminal in the project folder.
2. Install dependencies (first time only):

```bash
npm install
```

3. Start the local preview:

```bash
npm run dev
```

4. Open your browser at: **http://localhost:3000**

---

## 2. Build for production (test before deploy)

```bash
npm run build
```

If this finishes without errors, the site is ready to build on the hosting server.

---

## 3. Lint (code quality check)

```bash
npm run lint
```

Fix any reported errors before deployment.

---

## 4. Settings to check before deployment

Edit **one main file**: `src/data/settingsData.ts`

| Setting | What to do |
|--------|------------|
| **whatsappNumber** | Set in `settingsData.ts` (single source of truth — do not duplicate elsewhere) |
| **websiteUrl** | Should be `https://www.flashpay.uk` when DNS is ready |
| **email** | Set your real support email (confirm the mailbox works) |
| **facebookUrl / instagramUrl / telegramUrl** | Add real links, or leave empty to hide |
| **logo** | Add file at `public/images/logo.png` (header shows text fallback if missing) |
| **seoDefaults.ogImage** | Add image at `public/images/og-default.png` (1200×630 px recommended) |
| **seoDefaults title/description** | Review wording for your market |

Also review:

- `src/data/featureFlagsData.ts` — turn off sections not ready for launch
- `src/data/socialLinksData.ts` — updates automatically from settings

**On Vercel (hosting):** add environment variable:

```
NEXT_PUBLIC_SITE_URL=https://www.flashpay.uk
```

Copy from `.env.example` — do **not** put passwords or API keys in the repo.

Optional chat (local testing / future AI):

```
NEXT_PUBLIC_CHAT_ENABLED=true
OPENAI_API_KEY=
```

**Important:** `OPENAI_API_KEY` is server-only. Never use `NEXT_PUBLIC_` for it and never import it in client components. Do not enable AI chat in production until tested locally. Without a key, the chat uses safe local fallback answers only.

Optional Supabase live chat (local foundation — **not production-ready without auth + RLS**):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

| Variable | Where used |
|----------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server (public) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser + server (public anon client) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** — never in client components |

1. Create a Supabase project and run `supabase/schema.sql` in the SQL Editor.
2. Copy URL and anon key to `.env.local` (do **not** commit `.env.local`).
3. For local testing only, uncomment the optional dev RLS policies at the bottom of `schema.sql`.
4. Enable Realtime on `chat_sessions` and `chat_messages` in Supabase dashboard.
5. Restart `npm run dev`.

Without Supabase env vars, the public chat widget and `/admin/chat` mock inbox continue to work locally.

Admin authentication (Step 14 — local foundation):

```
ADMIN_ALLOWED_EMAILS=admin@example.com:super_admin,support@example.com:support_agent
NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW=false
```

| Variable | Where used |
|----------|------------|
| `ADMIN_ALLOWED_EMAILS` | **Server only** — never import in client components |
| `NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW` | Public override for admin preview — **keep false in production** |

Feature flags in `src/data/featureFlagsData.ts`:

| Flag | Safe production default |
|------|-------------------------|
| `showChatAdminPreview` | `false` (set `true` locally only) |
| `showRequestAdminPreview` | `false` — local request dashboard preview only |
| `showAdminDashboardPreview` | `false` — local admin control panel at `/admin` |
| `showContentAdminPreview` | `false` — local content admin at `/admin/content` |
| `enableAdminAuth` | `false` until Supabase Auth + allowed emails are ready |
| `enableLiveChatRealtime` | `false` until RLS policies are production-ready |
| `enableChatAi` | `false` — also requires server `OPENAI_API_KEY` |

`/admin/chat` must not be used in production until `enableAdminAuth`, Supabase Auth, and `ADMIN_ALLOWED_EMAILS` are configured.

**Request management (`/admin/requests`):** local preview only in Step 21. Public request center still sends visitors to **WhatsApp**. Optional local drafts are stored in the browser for dev testing — not a production backend. Set `showRequestAdminPreview: false` before deploy. Do not enable `/admin/requests` in production without authentication, permissions, and a secure database (see `REQUEST_MANAGEMENT_PLAN.md`).

**Admin control panel (`/admin`):** local preview only in Step 26. Overview hub for requests, chat, content, coverage, and settings — all read-only or local mock. Set `showAdminDashboardPreview` and `showContentAdminPreview` to `false` before deploy. Admin routes are `noindex` and not in the sitemap. **Hidden URL access is not production security** — require Supabase Auth, roles, and RLS (see `ADMIN_DASHBOARD_PLAN.md`).

**Admin login & security (Step 27):** `/admin/login` is a safe placeholder when `enableAdminAuth` is off. Middleware + `resolveAdminRouteGate()` block admin routes when preview flags are false (`notFound`) or when production runs without full auth (redirect to login). Use `adminProductionSafety.ts` and `/admin/settings` for yes/no status only. **Never expose `SUPABASE_SERVICE_ROLE_KEY` or `ADMIN_ALLOWED_EMAILS` values to the browser.** Preview flags must be `false` in production unless authentication is fully enabled.

**Form spam protection (Step 29):** Public forms use client-side validation (`src/lib/forms/validation.ts`), honeypot fields, and localStorage cooldown/rate limits (`src/lib/forms/spamProtection.ts`). This is **basic local protection only** — not sufficient for production. Before connecting a real backend:

- Add **server-side validation** on all submission API routes
- Add **rate limiting** per IP/session at the edge or API layer
- Optional **CAPTCHA** or **Cloudflare Turnstile** later (no paid service required for planning)
- **Never rely on client validation or honeypot alone**
- Success copy says requests are **prepared** for WhatsApp — not **received** unless backend storage is verified

**Production lockdown (Step 31):** Resolved feature flags in `src/lib/config/featureFlags.ts` force admin preview, AI chat, and live realtime **OFF in production** unless explicit safe env overrides are set. Raw `featureFlagsData.ts` values apply in development only. See `.env.example` — keep all `NEXT_PUBLIC_ENABLE_*` preview flags `false` before deploy. Hidden URL is not security.

### Public-only deployment candidate (Step 32)

A **public marketing site** may be deployed only when internal features remain resolved **OFF**:

| Feature | Public deploy requirement |
|---------|---------------------------|
| Admin previews | Resolved **OFF** (`npm run check:production`) |
| AI chat | Resolved **OFF** |
| Live realtime | Resolved **OFF** |
| Admin auth | Not ready without Supabase + emails + RLS |
| Request inbox / admin DB | **Not** a production feature yet |
| Forms | WhatsApp-only; **prepared** copy, not **received** |

```bash
npx tsx scripts/check-production-readiness.ts
```

Backend database work requires a **separate** phase: Supabase Auth, RLS, server-side validation. Hidden URL is not production security.

### Before enabling public chat in production

1. Run chat QA locally: `npx tsx scripts/run-chat-tests.ts` — answers must pass `src/data/chatTestCasesData.ts` with no forbidden claims.
2. Keep **`enableChatAi: false`** unless OpenAI responses are tested with the same guardrails as the local engine.
3. Secure Supabase (production RLS, Realtime scoped, service role server-only).
4. Protect **`/admin/chat`** with admin auth — never expose the inbox without login.
5. Do not let chat promise guaranteed **rates**, **timing**, or **official agency** relationships.
6. Human handoff must clearly say **official WhatsApp is the fastest path** until live agents are active.

### Local Supabase live chat test (Step 17A)

1. Copy `.env.example` → `.env.local` (never commit).
2. Set `NEXT_PUBLIC_SITE_URL=http://localhost:3000` and Supabase URL/anon/service-role keys.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. For local testing only: uncomment **LOCAL DEVELOPMENT ONLY** RLS policies in `schema.sql`.
5. Enable Realtime on `chat_sessions` and `chat_messages` in Supabase dashboard (or use polling fallback).
6. Run `npm run dev`.
7. Window A: `/` — open chat, send messages, test handoff.
8. Window B: `/admin/chat` — verify status panel, reply as agent, close/reopen session.
9. Before production: disable local-dev RLS, apply production policies, enable admin auth.

---

## 5. Deploy to Vercel

1. Create a free account at [vercel.com](https://vercel.com)
2. Connect your GitHub/GitLab/Bitbucket repository (or upload the project)
3. Vercel detects Next.js automatically
4. Add environment variable: `NEXT_PUBLIC_SITE_URL` = `https://www.flashpay.uk`
5. Click **Deploy**
6. Wait until the build completes successfully

Your site will get a temporary URL like `your-project.vercel.app` for testing.

---

## 6. Connect domain www.flashpay.uk

1. In Vercel: **Project → Settings → Domains**
2. Add: `www.flashpay.uk` and optionally `flashpay.uk`
3. Vercel shows the DNS records you need

---

## 7. DNS records (typical setup)

At your domain registrar (where you bought flashpay.uk), add what Vercel asks for. Usually:

| Type | Name | Value |
|------|------|--------|
| **CNAME** | `www` | `cname.vercel-dns.com` (or the value Vercel gives you) |
| **A** | `@` (root) | Vercel IP address (if you want flashpay.uk without www) |

DNS can take **15 minutes to 48 hours** to propagate.

**Do not assume DNS is connected until the domain shows as valid in Vercel.**

---

## 8. What to test after deployment

Use the checklist in **PRE_LAUNCH_CHECKLIST.md**. Minimum tests:

- Home page loads
- WhatsApp opens with correct number (after you set it)
- Forms open WhatsApp with structured messages
- `/sitemap.xml` loads in browser
- `/robots.txt` loads in browser
- Mobile layout looks correct
- `/wallet` and `/trade` show **Coming Soon** only
- Unknown URL shows 404 page
- HTTPS padlock is active (SSL)

---

## 9. Rollback if something goes wrong

**On Vercel:**

1. Go to **Deployments**
2. Find the last working deployment
3. Click **⋯ → Promote to Production**

**Locally:**

- Revert Git changes to the last good commit
- Redeploy

Keep a backup of `settingsData.ts` before major edits.

---

## 10. What NOT to change before deployment

- Do not add fake WhatsApp numbers or fake prices
- Do not claim licenses or direct agency for global brands
- Do not enable wallet balances or trading features
- Do not commit `.env.local` or secrets to Git
- Do not delete `src/data/` content files unless you know what you are doing
- Do not hardcode contact info in components — use `settingsData.ts` only

---

## Need help?

- Local run issues → check Node.js is installed (`node -v`)
- Build errors → run `npm run build` locally and read the error message
- Domain issues → wait for DNS, then check Vercel domain settings

This project does **not** include production admin authentication or wallet/trade features yet. Live chat has a **local Supabase foundation** (Step 13) — enable only after schema, RLS, and auth are ready.
