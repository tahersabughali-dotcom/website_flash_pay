# Flash Pay — Security Audit

**Date:** 2026-06-18  
**Scope:** Full codebase security review (local audit only)  
**Files reviewed:** `middleware.ts`, `src/lib/auth/*`, `src/lib/config/*`, `src/app/admin/**`, `src/app/api/**`, `src/lib/supabase/*`, `src/lib/chat/*`, `src/lib/requests/*`, `.env.example`, `.gitignore`, `supabase/schema.sql`

---

## Summary

| Severity | Open (before fixes) | Fixed in Step 35 | Remaining |
|----------|---------------------|------------------|-----------|
| CRITICAL | 2 | 0 | 2 |
| HIGH | 6 | 2 | 4 |
| MEDIUM | 8 | 1 | 7 |
| LOW | 5 | 1 | 4 |

**Verdict:** Safe for **public-only** deploy with default production env. **Not safe** for full platform (admin + Supabase + AI) until RLS, server APIs, and rate limits are complete.

---

## CRITICAL

### SEC-001 — Supabase RLS policies not production-ready
- **File:** `supabase/schema.sql`
- **Issue:** RLS enabled but production policies are examples only; local dev `anon FOR ALL` policies are commented but documented as uncomment-for-dev. If deployed with broad anon policies, chat data is writable by anyone with the anon key.
- **Why it matters:** Browser admin chat uses anon client; security depends entirely on RLS.
- **Fix:** Implement and enable production RLS policies; never enable `local_dev_anon_*` in prod.
- **Safe to fix now:** No — requires Supabase Auth + policy design.
- **Leave for later:** Yes — until full platform phase.

### SEC-002 — Admin chat mutations from browser (anon client)
- **File:** `src/lib/chat/chatRepository.ts`
- **Issue:** List/reply/close/update run from client via Supabase anon key.
- **Why it matters:** Any RLS misconfiguration exposes inbox data.
- **Fix:** Server routes with service role + session checks.
- **Safe to fix now:** No — architectural change.
- **Leave for later:** Yes.

---

## HIGH

### SEC-003 — Middleware did not verify ADMIN_ALLOWED_EMAILS
- **File:** `middleware.ts` (was line 50 TODO)
- **Issue:** Any authenticated Supabase user could pass middleware.
- **Status:** **FIXED** — `isEmailInAdminAllowlist()` added.
- **Safe to fix now:** Done.

### SEC-004 — /api/chat AI bypassed guardrails when AI enabled
- **File:** `src/app/api/chat/route.ts`
- **Issue:** Raw OpenAI reply returned without guardrail check.
- **Status:** **PARTIALLY FIXED** — guardrail/handoff local results now returned before AI call.
- **Remaining:** Post-validate AI output text when AI is enabled.
- **Safe to fix now:** Partial done; full AI output validation when enabling AI.
- **Leave for later:** Full validation until AI is turned on.

### SEC-005 — /api/chat unauthenticated, no rate limit
- **File:** `src/app/api/chat/route.ts`
- **Issue:** Public POST; abuse/cost vector if AI enabled.
- **Status:** **PARTIALLY FIXED** — max message length 1000 chars added.
- **Remaining:** IP/session rate limiting.
- **Safe to fix now:** Rate limit can be added; not done (edge config needed).
- **Leave for later:** Recommended before enabling AI.

### SEC-006 — ENABLE_ADMIN_AUTH not visible to client login form
- **File:** `src/components/admin-auth/AdminLoginForm.tsx`, `src/lib/config/featureFlags.ts`
- **Issue:** Client component cannot read server-only `ENABLE_ADMIN_AUTH`; UI may disagree with server.
- **Fix:** Pass `authEnabled` from server page as prop.
- **Safe to fix now:** Yes.
- **Leave for later:** Before enabling admin auth.

### SEC-007 — Magic link without server allowlist pre-check
- **File:** `src/components/admin-auth/AdminLoginForm.tsx`
- **Issue:** OTP can be requested for any email (enumeration/spam).
- **Fix:** Server action validates email against allowlist before `signInWithOtp`.
- **Safe to fix now:** Yes, when auth is enabled.
- **Leave for later:** Yes.

### SEC-008 — Request PII in localStorage (dev preview)
- **File:** `src/lib/requests/requestRepository.ts`
- **Issue:** Mock requests stored in browser localStorage when admin preview on.
- **Fix:** Supabase + server persistence with RLS.
- **Safe to fix now:** No.
- **Leave for later:** Yes — expected for local preview.

---

## MEDIUM

### SEC-009 — isConfigured.ts referenced from client bundle
- **File:** `src/lib/supabase/isConfigured.ts`
- **Issue:** `readServiceRoleKey()` in module imported by client paths; value should not leak but env name ships to client graph.
- **Fix:** Split `isConfigured.public.ts` (server-only for service role).
- **Safe to fix now:** Yes.
- **Leave for later:** Recommended before Supabase connect.

### SEC-010 — Production redirects to /admin/login (confirms path exists)
- **File:** `middleware.ts`
- **Issue:** 404 vs redirect reveals admin surface.
- **Fix:** Return 404 for all `/admin/*` when auth off in production.
- **Safe to fix now:** Yes (behavior change).
- **Leave for later:** Optional hardening.

### SEC-011 — Admin settings exposes config in preview mode
- **File:** `src/components/admin-settings/AdminSettingsPage.tsx`
- **Issue:** Anyone reaching preview settings sees flag resolution, WhatsApp, site URL (not secrets).
- **Fix:** Restrict to authenticated admins; reduce preview fields.
- **Safe to fix now:** Partial — gated by preview flags (off in prod default).
- **Leave for later:** When admin goes live.

### SEC-012 — featureFlags.ts reads ADMIN_ALLOWED_EMAILS in shared module
- **File:** `src/lib/config/featureFlags.ts`
- **Issue:** Pulled into client dependency chains; values should not leak.
- **Fix:** Server-only resolution for email checks.
- **Safe to fix now:** Yes.
- **Leave for later:** Before full platform.

### SEC-013 — Dev console helper on public site
- **File:** `src/lib/chat/unansweredQuestions.ts`
- **Issue:** `window.flashPayChatReviewUnanswered()` registered in production.
- **Status:** **FIXED** — guarded with `NODE_ENV === "production"`.
- **Safe to fix now:** Done.

### SEC-014 — Client-only form spam protection
- **File:** `src/lib/forms/spamProtection.ts`
- **Issue:** Honeypot/cooldown in localStorage only.
- **Status:** **IMPROVED** — honeypot now silent discard (no error leak).
- **Acceptable for:** WhatsApp-only public site (no server writes).
- **Leave for later:** Server enforcement if forms post to API.

### SEC-015 — raw featureFlagsData admin preview true in dev
- **File:** `src/data/featureFlagsData.ts`
- **Issue:** Misconfigured prod env could re-enable previews.
- **Mitigation:** `featureFlags.ts` ignores raw true in production; `check:production` script.
- **Safe to fix now:** CI/deploy checklist only.
- **Leave for later:** Documented.

### SEC-016 — getSupabaseServiceClient unused
- **File:** `src/lib/supabase/server.ts`
- **Issue:** Dead code; no current leak.
- **Fix:** Wire for server admin APIs or remove until needed.
- **Safe to fix now:** Low priority.
- **Leave for later:** Yes.

---

## LOW

### SEC-017 — /admin/login page lists admin sub-routes
- **File:** `src/app/admin/login/page.tsx`
- **Fix:** Generic copy without route enumeration.
- **Leave for later:** Optional.

### SEC-018 — No brute-force rate limit on admin login
- **File:** `middleware.ts`, Supabase config
- **Leave for later:** When auth enabled.

---

## INFO (positive findings)

| Check | Status |
|-------|--------|
| No `.env.local` in repo | ✅ |
| `.gitignore` ignores `.env*` except `.env.example` | ✅ |
| No real API keys in source | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` not in client components | ✅ |
| `OPENAI_API_KEY` only in `api/chat/route.ts` | ✅ |
| `ADMIN_ALLOWED_EMAILS` values never rendered | ✅ |
| Admin not in sitemap | ✅ |
| `robots.ts` disallows `/admin/`, `/api/` | ✅ |
| Admin pages `noindex/nofollow` | ✅ |
| Hidden URL documented as not security | ✅ |
| Production resolved flags disable admin preview | ✅ |

---

## Step 35 security fixes applied

1. `middleware.ts` — email allowlist enforcement after Supabase session
2. `src/app/api/chat/route.ts` — max length 1000; guardrail results before AI
3. `src/lib/chat/unansweredQuestions.ts` — dev-only console helper
4. `src/lib/forms/spamProtection.ts` + `submitWhatsAppForm.ts` — silent honeypot handling
