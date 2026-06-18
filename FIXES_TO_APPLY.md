# Flash Pay — Fixes To Apply

**Date:** 2026-06-18  
**Legend:** ✅ Applied in Step 35 audit | ⏳ Recommended later | ❌ Do not fix in this phase

---

## Applied in Step 35 (safe fixes)

| ID | Severity | File(s) | Fix | Status |
|----|----------|---------|-----|--------|
| FIX-001 | HIGH | `middleware.ts` | Enforce `ADMIN_ALLOWED_EMAILS` in middleware after Supabase session | ✅ |
| FIX-002 | HIGH | `src/app/api/chat/route.ts` | Return guardrail/handoff local results before AI; max 1000 char messages; preserve `lang` in catch | ✅ |
| FIX-003 | MEDIUM | `src/lib/chat/unansweredQuestions.ts` | Dev-only `flashPayChatReviewUnanswered` console helper | ✅ |
| FIX-004 | MEDIUM | `src/lib/forms/spamProtection.ts`, `submitWhatsAppForm.ts` | Silent honeypot discard via `onHoneypotDiscard` | ✅ |
| FIX-005 | MEDIUM | `ContactForm.tsx`, `BusinessRequestForm.tsx`, `PartnerApplicationForm.tsx` | `sanitizeFormText` before WhatsApp message build | ✅ |
| FIX-006 | MEDIUM | All 4 form components | `onHoneypotDiscard` shows safe success without opening WhatsApp | ✅ |

## Applied in Step 34 (prior polish)

| ID | File(s) | Fix | Status |
|----|---------|-----|--------|
| FIX-007 | `BrandLogo.tsx` | Hydration-safe logo via `useHydrated()` | ✅ |
| FIX-008 | `AppFooter.tsx` | Mobile footer padding for WhatsApp FAB clearance | ✅ |

---

## Recommended — safe to fix before public deploy (not done)

| ID | Severity | File(s) | Issue | Fix | Safe now? |
|----|----------|---------|-------|-----|-----------|
| FIX-009 | MEDIUM | `src/app/not-found.tsx` | Canonical may default to `/` | Pass explicit path or omit canonical on 404 | Yes |
| FIX-010 | LOW | `src/app/currencies/page.tsx`, `payment-methods/page.tsx` | Metadata not from `staticPageSeo` registry | Unify with `seo.ts` keys | Yes |
| FIX-011 | LOW | `src/lib/forms/submitWhatsAppForm.ts` | All request types share `formId: "request"` | Per-slug cooldown keys | Yes |
| FIX-012 | MEDIUM | `src/components/admin-auth/AdminLoginForm.tsx` | Server-only auth flag not visible on client | Pass `authEnabled` prop from server page | Yes (when enabling auth) |

---

## Recommended — before full platform (do not fix now)

| ID | Severity | Issue | Fix |
|----|----------|-------|-----|
| FIX-013 | CRITICAL | Supabase RLS not production-ready | Enable production policies in `schema.sql` |
| FIX-014 | CRITICAL | Admin chat via browser anon client | Server routes + service role |
| FIX-015 | HIGH | `/api/chat` no rate limiting | Edge rate limit / middleware |
| FIX-016 | HIGH | AI output not fully validated | Post-process AI replies through guardrails |
| FIX-017 | HIGH | Magic link without allowlist pre-check | Server action before OTP |
| FIX-018 | MEDIUM | `isConfigured.ts` in client bundle graph | Split public/server modules |
| FIX-019 | MEDIUM | Request data in localStorage | Supabase persistence + RLS |
| FIX-020 | LOW | `getSupabaseServiceClient` unused | Wire or remove |
| FIX-021 | LOW | Sitemap `lastModified: new Date()` | Use content dates from data |
| FIX-022 | LOW | Admin login page route enumeration | Generic copy |

---

## Explicitly out of scope (per user instructions)

- ❌ Enable admin / AI / realtime in production
- ❌ Connect Supabase
- ❌ Deploy or git push
- ❌ Architecture rewrite
- ❌ Remove features
- ❌ Major data model changes

---

## Verification after fixes

```bash
npm run check:production   # 14/14 PASS
npm run build              # PASS
npm run lint               # PASS
npx tsx scripts/run-chat-tests.ts  # 45/45, 0 risky
```

All passed after Step 35 fixes.
