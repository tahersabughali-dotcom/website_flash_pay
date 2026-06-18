import { settingsData } from "@/data/settingsData";

export function AdminChatEmptyState() {
  const lang = settingsData.defaultLanguage;

  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
      <p className="text-lg font-semibold text-flash-text">
        {lang === "ar" ? "اختر محادثة" : "Select a conversation"}
      </p>
      <p className="mt-2 max-w-sm text-sm text-flash-muted">
        {lang === "ar"
          ? "اختر جلسة من القائمة لعرض الرسائل والرد على الزائر."
          : "Choose a session from the list to view messages and reply to the visitor."}
      </p>
    </div>
  );
}
