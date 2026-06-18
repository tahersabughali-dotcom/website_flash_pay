import type { LanguageCode } from "@/types/common";
import { settingsData } from "@/data/settingsData";

export function AdminRequestEmptyState({ lang }: { lang?: LanguageCode }) {
  const language = lang ?? settingsData.defaultLanguage;

  return (
    <div className="flash-card flex flex-col items-center justify-center px-6 py-12 text-center">
      <p className="text-lg font-semibold text-flash-text">
        {language === "ar" ? "لا توجد طلبات مطابقة" : "No matching requests"}
      </p>
      <p className="mt-2 max-w-md text-sm text-flash-muted">
        {language === "ar"
          ? "جرّب فلترًا مختلفًا أو أنشئ طلبًا تجريبيًا من مركز الطلبات."
          : "Try different filters or create a sample request from the Request Center."}
      </p>
    </div>
  );
}
