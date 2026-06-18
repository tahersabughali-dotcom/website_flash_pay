import {
  chatTestCasesData,
  globalForbiddenChatClaims,
  type ChatExpectedSafetyBehavior,
  type ChatTestCase,
} from "@/data/chatTestCasesData";
import { settingsData } from "@/data/settingsData";
import { generateLocalChatResponse, getDetectedIntentId } from "@/lib/chat/localChatEngine";

export interface ChatTestCaseResult {
  id: string;
  userMessage: string;
  passed: boolean;
  warnings: string[];
  failures: string[];
  reply: string;
  source: string;
  detectedIntent: string | null;
}

export interface ChatTestRunSummary {
  total: number;
  passed: number;
  warnings: number;
  failed: number;
  risky: number;
  results: ChatTestCaseResult[];
}

function includesAny(haystack: string, needles: string[]): string[] {
  const lower = haystack.toLowerCase();
  return needles.filter((needle) => lower.includes(needle.toLowerCase()));
}

function matchesSafetyBehavior(
  behavior: ChatExpectedSafetyBehavior,
  reply: string,
  source: string,
  triggersHandoff?: boolean,
): boolean {
  switch (behavior) {
    case "guardrail":
      return source === "guardrail" || source === "sensitive";
    case "handoff":
      return Boolean(triggersHandoff);
    case "coming_soon":
      return (
        source === "guardrail" ||
        source === "knowledge" ||
        source === "intent" ||
        /coming soon|قيد التطوير|غير متاح/i.test(reply)
      );
    case "redirect_scope":
      return (
        source === "fallback" ||
        source === "guardrail" ||
        source === "knowledge" ||
        source === "intent" ||
        /\/contact|\/request|Flash Pay/i.test(reply)
      );
    case "safe_info":
      return source === "knowledge" || source === "intent" || source === "local";
    default:
      return false;
  }
}

function evaluateTestCase(testCase: ChatTestCase, lang: "ar" | "en" = "ar"): ChatTestCaseResult {
  const result = generateLocalChatResponse(testCase.userMessage, { lang });
  const detectedIntent = getDetectedIntentId(testCase.userMessage);
  const warnings: string[] = [];
  const failures: string[] = [];

  const forbiddenHits = includesAny(result.reply, [
    ...globalForbiddenChatClaims,
    ...testCase.forbiddenClaims,
  ]);
  if (forbiddenHits.length > 0) {
    failures.push(`Forbidden claims found: ${forbiddenHits.join(", ")}`);
  }

  if (testCase.expectedIntent) {
    const acceptable = new Set([
      testCase.expectedIntent,
      ...(testCase.acceptableIntents ?? []),
    ]);
    if (!detectedIntent || !acceptable.has(detectedIntent)) {
      warnings.push(`Expected intent ${testCase.expectedIntent}, got ${detectedIntent ?? "none"}`);
    }
  }

  if (!matchesSafetyBehavior(testCase.expectedSafetyBehavior, result.reply, result.source, result.triggersHandoff)) {
    failures.push(
      `Expected safety behavior ${testCase.expectedSafetyBehavior}, got source=${result.source}, handoff=${Boolean(result.triggersHandoff)}`,
    );
  }

  if (testCase.shouldSuggestWhatsApp) {
    const hasWhatsApp =
      /whatsapp|واتساب/i.test(result.reply) ||
      result.reply.includes(settingsData.whatsappNumber);
    if (!hasWhatsApp) {
      warnings.push("Expected WhatsApp suggestion");
    }
  }

  if (testCase.shouldSuggestPage?.length) {
    for (const page of testCase.shouldSuggestPage) {
      if (!result.reply.includes(page)) {
        warnings.push(`Expected page link ${page}`);
      }
    }
  }

  if (result.source === "fallback") {
    warnings.push("Fallback response — consider improving knowledge match");
  }

  return {
    id: testCase.id,
    userMessage: testCase.userMessage,
    passed: failures.length === 0,
    warnings,
    failures,
    reply: result.reply,
    source: result.source,
    detectedIntent,
  };
}

export function runChatTestCases(lang: "ar" | "en" = "ar"): ChatTestRunSummary {
  const results = chatTestCasesData.map((testCase) => evaluateTestCase(testCase, lang));

  const failed = results.filter((item) => !item.passed).length;
  const passed = results.filter((item) => item.passed && item.warnings.length === 0).length;
  const warnings = results.filter((item) => item.passed && item.warnings.length > 0).length;
  const risky = results.filter((item) =>
    includesAny(item.reply, globalForbiddenChatClaims).length > 0,
  ).length;

  return {
    total: results.length,
    passed,
    warnings,
    failed,
    risky,
    results,
  };
}

export function formatChatTestSummary(summary: ChatTestRunSummary): string {
  const lines = [
    `Flash Pay Chat QA — ${summary.total} tests`,
    `Passed: ${summary.passed}`,
    `Warnings: ${summary.warnings}`,
    `Failed: ${summary.failed}`,
    `Risky: ${summary.risky}`,
  ];

  const failedResults = summary.results.filter((item) => !item.passed);
  if (failedResults.length > 0) {
    lines.push("", "Failures:");
    for (const item of failedResults) {
      lines.push(`- ${item.id}: ${item.failures.join("; ")}`);
    }
  }

  return lines.join("\n");
}

/** Local dev only — browser console helper */
export function registerChatTestConsoleHelper(): void {
  if (typeof window === "undefined") return;

  const win = window as Window & { flashPayRunChatTests?: () => ChatTestRunSummary };
  win.flashPayRunChatTests = () => {
    const summary = runChatTestCases("ar");
    console.log(formatChatTestSummary(summary));
    console.table(
      summary.results.map((item) => ({
        id: item.id,
        passed: item.passed,
        warnings: item.warnings.length,
        failures: item.failures.length,
        source: item.source,
        intent: item.detectedIntent,
      })),
    );
    return summary;
  };
}
