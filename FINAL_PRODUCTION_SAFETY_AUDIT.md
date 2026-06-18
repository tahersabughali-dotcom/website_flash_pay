# Flash Pay Global Platform — Final Production Safety Audit

**Audit date:** 2026-06-17  
**Scope:** Full local codebase review before any Supabase production connection or deployment  
**Auditor:** Step 30 automated + manual code review  
**Status:** LOCAL DEVELOPMENT ONLY — **NOT READY FOR PRODUCTION DEPLOY**

---

## 1. Executive summary

Flash Pay is a **well-structured, Arabic-first marketing and request-routing platform** with strong legal disclaimers, chat guardrails, and admin preview foundations. Public flows correctly route users to **official WhatsApp** with safe “prepared, not received” language.

**However, the current configuration is intentionally tuned for local development.** Admin preview flags are **enabled**, admin auth is **disabled**, form protection is **client-side only**, and there is **no production backend** for requests. **Do not deploy or push to production without completing the required pre-deploy actions in Section 17.**

| Area | Status |
|------|--------|
| Build / TypeScript | ✅ Pass |
| ESLint | ✅ Pass (0 errors) |
| Chat QA | ✅ 45/45 passed, 0 risky |
| Public legal wording | ✅ Safe (denials & disclaimers only) |
| Admin route exposure | ⚠️ Local preview ON — unsafe for production as-is |
| Form spam protection | ⚠️ Client-only — not production-grade |
| Supabase / backend | ❌ Not production-ready |
| **Deploy now?** | **❌ NO** |

---

## 2. Build / lint / chat QA status

| Command | Result |
|---------|--------|
| `npm run build` | ✅ Success — 33 app routes compiled |
| `npm run lint` | ✅ Success — 0 errors, 0 warnings |
| `npx tsx scripts/run-chat-tests.ts` | ✅ 45/45 passed, 0 failed, 0 risky |
| `npm test` | N/A — no test script in `package.json` |

---

## 3. Public routes review

**Route templates audited:** 22 public page types + dynamic `[slug]` routes + 404.

| Route | Loads (build) | SEO metadata | Safe wording | Notes |
|-------|---------------|--------------|--------------|-------|
| `/` | ✅ | ✅ | ✅ | Hero, trust strip, CTAs; overflow clipped in layout |
| `/services` | ✅ | ✅ | ✅ | Availability disclaimers |
| `/services/[slug]` | ✅ | ✅ per service | ✅ | Active services only in sitemap |
| `/countries` | ✅ | ✅ | ✅ | No “all countries supported” claim |
| `/countries/[slug]` | ✅ | ✅ | ✅ | FAQ denies official agency where asked |
| `/currencies` | ✅ | ✅ | ✅ | Confirmation via WhatsApp |
| `/payment-methods` | ✅ | ✅ | ✅ | Partner-network availability |
| `/request` | ✅ | ✅ | ✅ | Honeypot, validation, safe success copy |
| `/route-finder` | ✅ | ✅ | ✅ | Search local; WhatsApp via CTA only |
| `/markets` | ✅ | ✅ | ✅ | Indicative only |
| `/business` | ✅ | ✅ | ✅ | Form → WhatsApp, not stored server-side |
| `/partners` | ✅ | ✅ | ✅ | Same |
| `/network` | ✅ | ✅ | ✅ | Partner coordination wording |
| `/academy` | ✅ | ✅ | ✅ | Educational disclaimers |
| `/academy/[slug]` | ✅ | ✅ | ✅ | Published articles only in sitemap |
| `/trust` | ✅ | ✅ | ✅ | Official channels + disclaimers |
| `/contact` | ✅ | ✅ | ✅ | Form protection active |
| `/wallet` | ✅ | ✅ | ✅ | Coming soon — no active wallet |
| `/trade` | ✅ | ✅ | ✅ | Coming soon — no active trading |
| `/privacy-policy` | ✅ | ✅ | ✅ | Step 28 legal page |
| `/terms` | ✅ | ✅ | ✅ | Step 28 legal page |
| `/risk-disclaimer` | ✅ | ✅ | ✅ | Step 28 legal page |
| `/security` | ✅ | ✅ | ✅ | Step 28 legal page |
| `404` | ✅ | ✅ + noindex | ✅ | Clean NotFoundState |

**RTL / LTR:** `settingsData.defaultLanguage` is `ar`; `LtrText` used for version numbers and technical values; `dir` set on legal/login pages.

**WhatsApp:** Single source `settingsData.whatsappNumber`; `openWhatsAppInNewTab` and `WhatsAppButton` patterns consistent.

**Mobile (390px):** Layout uses `overflow-x-clip` on `<main>`, responsive grids, `min-w-0` patterns — no critical overflow issues identified in code review. Manual device test still recommended before deploy.

---

## 4. Admin routes review

| Route | noindex/nofollow | In sitemap | In public nav/footer | Guard | Secrets shown |
|-------|------------------|------------|----------------------|-------|---------------|
| `/admin` | ✅ | ❌ | ❌ | ✅ `resolveAdminRouteGate` + middleware | ❌ |
| `/admin/login` | ✅ | ❌ | ❌ | ✅ Always accessible placeholder | ❌ |
| `/admin/requests` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `/admin/chat` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `/admin/content` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `/admin/coverage` | ✅ | ❌ | ❌ | ✅ | ❌ |
| `/admin/settings` | ✅ | ❌ | ❌ | ✅ | Yes/no status only |

**Production guard:** `middleware.ts` + `resolveAdminRouteAccess.ts` + `adminProductionSafety.ts`.

**Preview flags false → 404:** Verified in architecture (Step 27).

**Hidden URL:** Documented in `ADMIN_DASHBOARD_PLAN.md`, `adminAuthNotes.ts`, admin banners — **not real security**.

**Login:** `enableAdminAuth: false` → Arabic placeholder, no fake login.

**⚠️ Step 31 update:** Raw preview flags may stay `true` in `featureFlagsData.ts` for local dev, but **`src/lib/config/featureFlags.ts` resolves them OFF in production** unless explicit `NEXT_PUBLIC_ENABLE_*` env vars are set. A production build no longer exposes admin routes via accidental raw `true` values alone.

---

## 5. Security review

| Check | Status |
|-------|--------|
| `.env.local` committed | ✅ Not tracked (`.gitignore` covers `.env*`) |
| `.env.example` has empty secrets | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` in client | ✅ Never imported in client components |
| `server.ts` server-only | ✅ `import "server-only"` added (Step 30) |
| `ADMIN_ALLOWED_EMAILS` public display | ✅ Values never shown; yes/no in settings only |
| Admin in `robots.txt` | ✅ `disallow: /admin/` |
| API routes | `/api/chat` disallowed in robots |
| Middleware admin protection | ✅ Present |

**Open items:** Middleware has TODO to verify `ADMIN_ALLOWED_EMAILS` in session; acceptable for local preview only.

---

## 6. Legal / financial safety wording review

**Forbidden-phrase scan** across `src/` (excluding test-case definitions):

| Phrase class | User-facing risky claims found? |
|--------------|--------------------------------|
| Guaranteed rates / سعر مضمون | ❌ None (only denials & test forbidden lists) |
| Fixed commission / عمولة ثابتة | ❌ None |
| Official agent claims | ❌ Denied in FAQ/legal (`لا ندّعي وكالة`) |
| Licensed bank | ❌ Denied in legal pages |
| Active wallet / trading | ❌ Coming-soon only |
| Investment advice as offer | ❌ Disclaimed everywhere |
| تم استلام طلبك | ❌ Not found in forms |
| All countries supported | ❌ “كل الدول” = nav label to countries hub only |

**Safe patterns in use:** تأكيد عبر WhatsApp، معلومات إرشادية فقط، تم تجهيز طلبك، قيد التطوير / قريبًا.

---

## 7. Form protection review

| Form | Honeypot | Cooldown 30s | Rate limit 5/10m | Validation | Sanitization | Safe success |
|------|----------|--------------|------------------|------------|--------------|--------------|
| `/request` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/contact` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/business` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/partners` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**Limitation:** All protection is **browser/localStorage only** — documented in Step 29 docs.

---

## 8. Chat safety review

| Check | Status |
|-------|--------|
| Chat QA 45/45 | ✅ |
| Guardrails before knowledge | ✅ `detectSensitiveGuardrail` runs first in `localChatEngine.ts` |
| Rate/timing/licensing/investment/wallet/trade | ✅ Safe templates + guardrails |
| Human handoff instant promise | ✅ No instant guarantee; WhatsApp fallback |
| Unanswered logs | ✅ `localStorage` only (`unansweredQuestions.ts`) |
| `enableChatAi` | ✅ `false` |
| `enableLiveChatRealtime` | ✅ `false` |
| Handoff ack wording | ✅ “وصلت رسالتك في الدردشة” — not “تم استلام طلبك” |

---

## 9. Request dashboard review

| Item | Status |
|------|--------|
| `/admin/requests` local preview | ✅ localStorage `flash-pay-service-requests-v1` |
| Created from `/request` only when `showRequestAdminPreview` | ✅ |
| Not production datastore | ✅ Documented |
| Sanitized notes in draft | ✅ max 1000 chars, control chars stripped |
| Future mappers prepared | ✅ `createRequestFromGenericFormPayload` helpers (not wired) |

---

## 10. Supabase readiness review

| Item | Status |
|------|--------|
| Schema file present | ✅ `supabase/schema.sql` |
| Production RLS | ❌ Not applied for production |
| `enableAdminAuth` | ❌ `false` (correct for now) |
| Service role client | ✅ Server-only, unused in routes yet |
| Live chat realtime | ❌ Disabled |
| **Connect production DB now?** | **❌ NO** |

---

## 11. SEO / sitemap / robots review

| Check | Status |
|-------|--------|
| Sitemap public pages only | ✅ Via `staticPageSeo` + active slugs |
| `/admin/*` excluded | ✅ Not in sitemap; robots disallow |
| Legal pages included | ✅ privacy, terms, risk, security |
| `/currencies`, `/payment-methods` | ✅ In sitemap |
| `/wallet`, `/trade` in sitemap | ⚠️ Coming-soon pages indexed (acceptable with safe copy) |
| Canonical via `buildPageMetadata` | ✅ |
| OG image `/images/og-default.png` | ✅ File exists |
| 404 noindex | ✅ Added Step 30 |

---

## 12. Mobile / RTL / UI review

| Area | Code review status |
|------|-------------------|
| Homepage hero | ✅ `overflow-hidden` on hero |
| Markets cards | ✅ Responsive grid |
| Request form | ✅ Stacked on mobile |
| Route finder | ✅ Standard form layout |
| Admin dashboard | ✅ Preview banners; responsive shell |
| Chat / WhatsApp FABs | ✅ Positioned per RTL conventions |
| Footer legal links | ✅ Wrap-friendly flex |
| Countries/currencies/payment pages | ✅ Card grids |

**Recommendation:** Manual 390px pass on real device before deploy (not blocking for local commit).

---

## 13. Environment variables review

| Variable | Exposure | Documented |
|----------|----------|------------|
| `NEXT_PUBLIC_SITE_URL` | Public | ✅ |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | ✅ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | ✅ |
| `ADMIN_ALLOWED_EMAILS` | Server only | ✅ |
| `OPENAI_API_KEY` | Server only | ✅ |
| `NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW` | Public override | ✅ default `false` in example |

`.env.local` not present in workspace; correctly gitignored.

---

## 14. Feature flags review

**File:** `src/data/featureFlagsData.ts`

### Local preview flags (MUST be `false` before production unless auth fully enabled)

| Flag | Current local value | Production-safe default |
|------|---------------------|-------------------------|
| `showAdminDashboardPreview` | `true` ⚠️ | `false` |
| `showContentAdminPreview` | `true` ⚠️ | `false` |
| `showChatAdminPreview` | `true` ⚠️ | `false` |
| `showRequestAdminPreview` | `true` ⚠️ | `false` |

### Production-sensitive flags

| Flag | Current | Notes |
|------|---------|-------|
| `enableAdminAuth` | `false` ✅ | Keep false until Supabase Auth + emails ready |
| `enableChatAi` | `false` ✅ | Requires server key + testing |
| `enableLiveChatRealtime` | `false` ✅ | Requires production RLS |

Comments document: preview = local only; hidden URL ≠ security.

---

## 15. What IS safe for production (after checklist)

- Public marketing pages with current legal disclaimers
- WhatsApp-first request/contact/business/partner flows (with server validation added)
- Legal pages (`/privacy-policy`, `/terms`, `/risk-disclaimer`, `/security`)
- Trust center and official channel messaging
- Chat widget with guardrails (if Supabase + RLS configured)
- SEO/sitemap structure for public routes
- Wallet/Trade as **coming soon** pages only

---

## 16. What is NOT safe for production (as-is)

1. **Admin preview flags enabled** with `enableAdminAuth: false`
2. **No server-side form validation or rate limiting**
3. **No production Supabase RLS / auth for admin**
4. **localStorage request drafts** presented as admin preview
5. **Client-only honeypot/cooldown** as sole abuse prevention
6. **Middleware email allowlist verification** not complete
7. **Deploying without setting preview flags to `false`**
8. **Enabling wallet/trade/payment execution** (not implemented — must stay coming soon)

---

## 17. Required actions before git push / deploy

### Critical (must do)

- [ ] Set all admin preview flags to `false` in `featureFlagsData.ts` for production builds
- [ ] Keep `enableAdminAuth: false` until Supabase Auth + `ADMIN_ALLOWED_EMAILS` verified
- [ ] Keep `enableChatAi` and `enableLiveChatRealtime` `false` until RLS + testing complete
- [ ] Set `NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW=false` in production env
- [ ] Never commit `.env.local` or real secrets
- [ ] Complete `PRE_LAUNCH_CHECKLIST.md` including legal, SSL, domain, forms
- [ ] Add **server-side** validation + rate limiting before accepting real submissions
- [ ] Apply production Supabase RLS; remove dev-only policies

### High (strongly recommended)

- [ ] Manual mobile test at 390px on homepage, request, admin preview
- [ ] Verify `NEXT_PUBLIC_SITE_URL=https://www.flashpay.uk` in production
- [ ] Confirm `support@flashpay.uk` mailbox active
- [ ] Two-window chat test if enabling Supabase
- [ ] Review `adminProductionSafety` shows **Production safe: yes** before go-live

### Medium (when backend connects)

- [ ] Wire `createRequestFromGenericFormPayload` only after server verification
- [ ] Complete middleware `ADMIN_ALLOWED_EMAILS` session check
- [ ] Optional CAPTCHA / Cloudflare Turnstile on public forms
- [ ] Audit logging for admin actions

---

## 18. Issues found and disposition (Step 30)

| Severity | Issue | Action |
|----------|-------|--------|
| **Critical** | Admin preview flags `true` — unsafe for production deploy | Documented; must flip before deploy |
| **Critical** | No server-side form protection | Documented; required before backend |
| **Critical** | Supabase not production-ready | Do not connect production DB yet |
| **High** | Client-only spam protection | Documented in Step 29 |
| **High** | Middleware allowlist TODO | Defer until auth enabled |
| **Medium** | `server.ts` lacked `server-only` guard | **Fixed** Step 30 |
| **Medium** | 404 page could be indexed | **Fixed** — added `robots: noindex` |
| **Low** | Duplicate JSDoc in feature flags | **Fixed** — comment cleanup |
| **Low** | Wallet/trade in sitemap while coming soon | Acceptable with disclaimers; monitor |
| **Fixed (Step 31)** | Raw preview `true` could expose admin in production | **Resolved** — `src/lib/config/featureFlags.ts` env-based lockdown |

---

## 21. Step 32 — Public release candidate (latest)

- **Script:** `scripts/check-production-readiness.ts` (`npm run check:production`)
- **Simulates:** `NODE_ENV=production` with preview/AI/realtime env cleared
- **Checks:** Resolved admin OFF, sitemap clean, legal pages, `.env.example` safe, public flags ON
- **Public-only deploy:** Possible **only** if script passes + checklist complete — admin/backend still not live
- **Not safe yet:** Full platform with admin, request DB, chat inbox, or Supabase writes

---

## 20. Step 31 — Production lockdown (latest)

- **Added:** `src/lib/config/featureFlags.ts` — `getResolvedFeatureFlags()` and per-flag resolvers
- **Behavior:** `NODE_ENV=production` ignores raw admin preview `true` unless `NEXT_PUBLIC_ENABLE_*` env is explicitly `true`
- **Admin guards:** `adminAccessConfig.ts`, middleware, route gates use resolved flags
- **Settings UI:** Raw vs resolved yes/no in `/admin/settings`
- **Deploy now?** Still **NO** — needs server validation, RLS, auth, and checklist — but production builds are **safer by default**

---

## 19. Sign-off

| Question | Answer |
|----------|--------|
| Safe to commit locally (audit doc + small fixes)? | ✅ Yes — no secrets in changes |
| Safe to deploy now? | ❌ **NO** |
| Safe to push to GitHub? | ⚠️ Only after reviewing diff contains no `.env.local` / secrets; flip preview flags before any production deploy from main |
| Deploy performed? | ❌ No |
| Git push performed? | ❌ No |

---

*This audit is a point-in-time local development review. Re-run build, lint, chat QA, and this checklist after any major change.*
