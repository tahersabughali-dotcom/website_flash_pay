import type { ExecutionType, LocalizedString } from "./common";

export interface ExecutionTypeDefinition {
  id: ExecutionType;
  label: LocalizedString;
  description: LocalizedString;
  /** Safe UI wording hint — never implies direct authorization */
  wordingHint: LocalizedString;
}
