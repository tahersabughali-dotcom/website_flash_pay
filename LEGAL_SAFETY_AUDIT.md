# Flash Pay — Legal & Financial Safety Audit

**Date:** 2026-06-18  
**Scope:** All user-facing copy in `src/` and `src/data/`  
**Method:** Grep + manual review of matches + chat test forbidden lists

---

## Summary

| Category | Count |
|----------|-------|
| **UNSAFE positive claims** | **0** |
| **SAFE denials / disclaimers** | 55+ lines |
| **INFRA (guardrails/tests only)** | 40+ lines |
| **REVIEW (safe in context)** | 2 |

**Verdict:** Legal wording is **production-safe** for public marketing site. All forbidden phrases appear only as denials, FAQ questions with denying answers, or test/guardrail infrastructure.

---

## Forbidden phrase scan results

| Forbidden phrase | User-facing unsafe? | Notes |
|------------------|---------------------|-------|
| guaranteed rate / سعر مضمون | ❌ No | Only denials: "لا أسعار مضمونة", "not guaranteed" |
| fixed commission / عمولة ثابتة | ❌ No | Test lists only |
| official agent / وكيل رسمي | ❌ No | FAQ question with denying answer (`countriesData.ts:40-42`) |
| licensed bank / بنك مرخص | ❌ No | Denial in `legalPagesData.ts` |
| guaranteed instant transfer | ❌ No | Not found |
| live guaranteed price | ❌ No | Test lists only |
| active wallet / المحفظة متاحة | ❌ No | "No active wallet", "قيد التطوير" |
| active trading / التداول متاح | ❌ No | Denials; substring in negated legal text (REVIEW) |
| investment advice / نصيحة استثمارية | ❌ No | "ليست نصيحة استثمارية" throughout |
| all countries supported | ❌ No | "كل الدول" is nav label only, not coverage claim |
| transaction completed automatically | ❌ No | Not found |
| تم استلام طلبك | ❌ No | Not found |
| request received internally | ❌ No | Not found |

---

## Safe wording confirmed

| Pattern | Example location |
|---------|------------------|
| WhatsApp confirmation | `السعر يتم تأكيده عبر WhatsApp` — markets, services |
| Availability qualifiers | `التوفر حسب الدولة والعملة والمبلغ` |
| Informational only | `معلومات إرشادية فقط` — markets, academy |
| Not financial advice | `ليست نصيحة مالية` — trust, legal |
| Partner network honesty | `عبر شبكة الشركاء حيثما يتوفر` |
| Coming soon | Wallet, Trade, App — `قيد التطوير` / `قريباً` |
| Form success | `تم تجهيز طلبك. يمكنك إرساله الآن عبر WhatsApp.` — `formMessages.ts` |

---

## REVIEW items (safe, scanner may flag)

### LEG-001 — FAQ asks "هل Flash Pay وكيل رسمي؟"
- **File:** `src/data/countriesData.ts:40`
- **Severity:** LOW
- **Verdict:** SAFE — answer immediately denies direct agency
- **Fix:** None required
- **Leave for later:** Optional rephrase to avoid substring scanners

### LEG-002 — Legal page contains `تداول متاح` inside negation
- **File:** `src/data/legalPagesData.ts:229`
- **Text:** `لا توجد أرصدة فعّالة أو تداول متاح عبر الموقع حاليًا`
- **Severity:** LOW
- **Verdict:** SAFE — full sentence is denial
- **Fix:** None required

---

## Chat & form legal safety

| Area | Status |
|------|--------|
| Chat guardrails (`chatGuardrails.ts`) | ✅ Blocks rates, licensing, investment, wallet/trade |
| Chat QA tests | ✅ 45/45 pass, 0 risky |
| Form messages | ✅ No "تم استلام طلبك" |
| Contact form disclaimer | ✅ "لا يتم حفظ البيانات على خادم حالياً" |
| PayPal/Wise copy | ✅ "ليس وكالة مباشرة" on request types |

---

## Issues fixed in Step 35

None required — legal copy was already compliant. Step 35 improved form sanitization (data hygiene, not legal claims).

---

## Recommendations before launch

1. Re-run chat QA after any copy change: `npx tsx scripts/run-chat-tests.ts`
2. Add forbidden-phrase check to CI (optional script mirroring `chatTestCasesData.ts`)
3. Legal review by qualified counsel before claiming regulated services in new markets
