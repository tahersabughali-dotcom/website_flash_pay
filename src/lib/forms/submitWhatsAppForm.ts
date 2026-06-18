import type { LanguageCode } from "@/types/common";
import {
  isHoneypotFilled,
  runSpamChecks,
  recordFormSubmission,
} from "@/lib/forms/spamProtection";

export interface ProcessWhatsAppFormOptions {
  formId: string;
  lang: LanguageCode;
  honeypot: string;
  validate: () => string | null;
  onSubmit: () => void;
  /** Called when honeypot is filled — show safe success without opening WhatsApp. */
  onHoneypotDiscard?: () => void;
}

/** Validates spam protection + fields, then runs WhatsApp open callback. */
export function processWhatsAppFormSubmit(options: ProcessWhatsAppFormOptions): string | null {
  if (isHoneypotFilled(options.honeypot)) {
    options.onHoneypotDiscard?.();
    return null;
  }

  const spamError = runSpamChecks(options.formId, options.honeypot, options.lang);
  if (spamError) return spamError;

  const validationError = options.validate();
  if (validationError) return validationError;

  options.onSubmit();
  recordFormSubmission(options.formId);
  return null;
}

export const PUBLIC_FORM_IDS = {
  request: "request",
  contact: "contact",
  business: "business",
  partners: "partners",
} as const;
