import { HONEYPOT_FIELD_NAME } from "@/lib/forms/spamProtection";

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Hidden honeypot — off-screen, not focusable, ignored by assistive tech.
 * Bots may fill it; real users should never see or tab into it.
 */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0">
      <label htmlFor={`hp-${HONEYPOT_FIELD_NAME}`}>Company website</label>
      <input
        id={`hp-${HONEYPOT_FIELD_NAME}`}
        name={HONEYPOT_FIELD_NAME}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
