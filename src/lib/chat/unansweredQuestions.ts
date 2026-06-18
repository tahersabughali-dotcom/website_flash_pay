const STORAGE_KEY = "flashpay_unanswered_questions";
const MAX_ENTRIES = 50;

export interface UnansweredQuestionEntry {
  question: string;
  lang: "ar" | "en";
  createdAt: string;
}

function sanitizeQuestion(text: string): string {
  return text.trim().slice(0, 500);
}

export function logUnansweredQuestion(question: string, lang: "ar" | "en"): void {
  if (typeof window === "undefined") return;

  const sanitized = sanitizeQuestion(question);
  if (!sanitized || sanitized.length < 3) return;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const existing: UnansweredQuestionEntry[] = raw ? (JSON.parse(raw) as UnansweredQuestionEntry[]) : [];

    const next: UnansweredQuestionEntry[] = [
      { question: sanitized, lang, createdAt: new Date().toISOString() },
      ...existing.filter((entry) => entry.question !== sanitized),
    ].slice(0, MAX_ENTRIES);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage unavailable — ignore
  }
}

export function getUnansweredQuestions(): UnansweredQuestionEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as UnansweredQuestionEntry[];
  } catch {
    return [];
  }
}

export function clearUnansweredQuestions(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Dev helper — call from browser console: window.flashPayChatReviewUnanswered() */
export function registerUnansweredQuestionsConsoleHelper(): void {
  if (typeof window === "undefined" || process.env.NODE_ENV === "production") return;
  (window as Window & { flashPayChatReviewUnanswered?: () => UnansweredQuestionEntry[] }).flashPayChatReviewUnanswered =
    () => {
      const items = getUnansweredQuestions();
      console.table(items);
      return items;
    };
}
