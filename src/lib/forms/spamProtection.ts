import type { LanguageCode } from "@/types/common";

export const HONEYPOT_FIELD_NAME = "companyWebsite";

const COOLDOWN_MS = 30_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;

const COOLDOWN_PREFIX = "flash-pay-form-cooldown-";
const RATE_PREFIX = "flash-pay-form-rate-";

function readTimestamps(key: string): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is number => typeof item === "number");
  } catch {
    return [];
  }
}

function writeTimestamps(key: string, timestamps: number[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(timestamps));
  } catch {
    // localStorage unavailable — allow submission
  }
}

export function isHoneypotFilled(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

export function getGenericSubmissionError(lang: LanguageCode): string {
  return lang === "ar"
    ? "تعذر إرسال النموذج. يرجى المحاولة مرة أخرى."
    : "Unable to submit the form. Please try again.";
}

export function getCooldownMessage(lang: LanguageCode): string {
  return lang === "ar"
    ? "تم تجهيز طلبك بالفعل. يرجى الانتظار قليلًا قبل إرسال طلب جديد."
    : "Your request was already prepared. Please wait a moment before sending another.";
}

export function getRateLimitMessage(lang: LanguageCode): string {
  return lang === "ar"
    ? "عدد كبير من المحاولات. يرجى الانتظار بضع دقائق ثم المحاولة مجددًا."
    : "Too many attempts. Please wait a few minutes and try again.";
}

export function checkSubmissionCooldown(formId: string, lang: LanguageCode): string | null {
  if (typeof window === "undefined") return null;

  const key = `${COOLDOWN_PREFIX}${formId}`;
  try {
    const last = Number(window.localStorage.getItem(key));
    if (!Number.isFinite(last)) return null;
    if (Date.now() - last < COOLDOWN_MS) {
      return getCooldownMessage(lang);
    }
  } catch {
    return null;
  }

  return null;
}

export function checkSubmissionRateLimit(formId: string, lang: LanguageCode): string | null {
  const key = `${RATE_PREFIX}${formId}`;
  const now = Date.now();
  const recent = readTimestamps(key).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);

  if (recent.length >= MAX_SUBMISSIONS_PER_WINDOW) {
    return getRateLimitMessage(lang);
  }

  return null;
}

export function recordFormSubmission(formId: string): void {
  if (typeof window === "undefined") return;

  const now = Date.now();
  const cooldownKey = `${COOLDOWN_PREFIX}${formId}`;
  const rateKey = `${RATE_PREFIX}${formId}`;

  try {
    window.localStorage.setItem(cooldownKey, String(now));
  } catch {
    // ignore
  }

  const recent = readTimestamps(rateKey)
    .filter((timestamp) => now - timestamp < RATE_WINDOW_MS)
    .concat(now);

  writeTimestamps(rateKey, recent);
}

/** Honeypot trips are handled silently — do not reveal bot detection to submitters. */
export function runSpamChecks(
  formId: string,
  honeypotValue: string | undefined,
  lang: LanguageCode,
): string | null {
  if (isHoneypotFilled(honeypotValue)) {
    return null;
  }

  const cooldownError = checkSubmissionCooldown(formId, lang);
  if (cooldownError) return cooldownError;

  const rateLimitError = checkSubmissionRateLimit(formId, lang);
  if (rateLimitError) return rateLimitError;

  return null;
}
