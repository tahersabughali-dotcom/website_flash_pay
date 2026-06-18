# Flash Pay — Deployment Readiness Audit

**Date:** 2026-06-18  
**Target:** Public-only Vercel deploy (no admin, no Supabase, no AI, no realtime)

---

## Required production environment variables

```env
NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW=false
NEXT_PUBLIC_ENABLE_CHAT_ADMIN_PREVIEW=false
NEXT_PUBLIC_ENABLE_REQUEST_ADMIN_PREVIEW=false
NEXT_PUBLIC_ENABLE_CONTENT_ADMIN_PREVIEW=false
NEXT_PUBLIC_ENABLE_CHAT_AI=false
NEXT_PUBLIC_ENABLE_LIVE_CHAT_REALTIME=false
ENABLE_ADMIN_AUTH=false
NEXT_PUBLIC_SITE_URL=https://www.flashpay.uk
```

**Not required for public-only:**
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `ADMIN_ALLOWED_EMAILS`
- `NEXT_PUBLIC_SUPABASE_*` (optional; chat uses local engine)

---

## Automated checks (Step 35)

| Command | Result |
|---------|--------|
| `npm run check:production` | **14/14 PASS** |
| `npm run build` | **PASS** (33 routes) |
| `npm run lint` | **PASS** |
| `npx tsx scripts/run-chat-tests.ts` | **45/45, 0 risky** |

---

## Deployment risk matrix

| Risk | Public-only deploy | Full platform deploy |
|------|-------------------|----------------------|
| Admin preview exposed | ✅ Blocked by `featureFlags.ts` in production | ❌ Needs auth + env discipline |
| AI cost abuse | ✅ AI off by default | ❌ Needs rate limits + guardrails on AI output |
| Supabase data leak | ✅ Not connected | ❌ Needs RLS + server APIs |
| Secrets in repo | ✅ None found | ✅ Same |
| Misleading financial claims | ✅ Legal audit clean | ✅ Same |
| SEO admin leakage | ✅ robots + sitemap clean | ✅ Same |
| Form false receipt | ✅ WhatsApp-only, safe copy | ⚠️ Needs server validation if backend added |
| Middleware auth gap | ✅ Fixed allowlist check | ⚠️ Needs full auth testing |

---

## Vercel-specific notes

1. Set all `NEXT_PUBLIC_ENABLE_*` to `false` or omit (production resolver defaults OFF).
2. Do **not** set preview flags to `true` in production.
3. Hidden `/admin` URL is **not security** — documented in admin banners and docs.
4. `robots.txt` disallows `/admin/` and `/api/` — crawlers should not index admin.
5. OG image exists: `public/images/og-default.png`
6. `NEXT_PUBLIC_SITE_URL` should match production domain for canonical/OG URLs.

---

## Pre-deploy checklist status

| Item | Status |
|------|--------|
| `.env.example` safe defaults | ✅ |
| No `.env.local` committed | ✅ |
| Admin not in sitemap | ✅ |
| Legal pages in sitemap | ✅ |
| 404 noindex | ✅ |
| Admin noindex/nofollow | ✅ |
| Chat widget works offline (local engine) | ✅ |
| WhatsApp number from `settingsData` only | ✅ |
| Maintenance mode guard in `layout.tsx` | ✅ |

---

## Blockers for full platform deploy

1. Supabase Auth + RLS production policies
2. Server-side admin APIs (not browser service role)
3. `/api/chat` rate limiting + AI output validation
4. Request persistence with server validation (replace localStorage mock)
5. `ENABLE_ADMIN_AUTH=true` only after allowlist + middleware tested end-to-end
6. Security review of `supabase/schema.sql` before connect

---

## Safe to deploy?

| Deploy type | Verdict | Conditions |
|-------------|---------|------------|
| **Public-only marketing site** | **YES** | Correct Vercel env; run `check:production` in CI; manual smoke test |
| **Full platform** | **NO** | Complete items in blockers list |

---

## Post–Step 35 improvements

- Middleware email allowlist enforcement
- Chat API message length cap + guardrail-first routing
- Honeypot silent handling
- Form field sanitization on contact/business/partners
- Mobile footer FAB clearance (Step 34)
