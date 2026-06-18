import type { AdminChatAccess, AdminChatAccessMode } from "@/types/auth";
import { adminRolesData } from "@/data/adminRolesData";
import { settingsData } from "@/data/settingsData";

interface AdminChatModeBannerProps {
  access: AdminChatAccess;
}

const MODE_LABELS: Record<
  AdminChatAccessMode,
  { ar: string; en: string; tone: "amber" | "blue" | "red" | "green" }
> = {
  local_mock_preview: {
    ar: "معاينة محلية — بيانات تجريبية",
    en: "Local Mock Preview",
    tone: "amber",
  },
  supabase_connected_preview: {
    ar: "Supabase متصل — بدون مصادقة",
    en: "Supabase Connected",
    tone: "blue",
  },
  auth_required: {
    ar: "المصادقة مطلوبة",
    en: "Auth Required",
    tone: "red",
  },
  production_blocked: {
    ar: "محظور في الإنتاج",
    en: "Production Blocked",
    tone: "red",
  },
  authenticated: {
    ar: "مصادقة فعّالة",
    en: "Authenticated",
    tone: "green",
  },
};

const TONE_CLASSES = {
  amber: "border-amber-300 bg-amber-50 text-amber-950",
  blue: "border-flash-primary/30 bg-flash-primary-light text-flash-text",
  red: "border-red-300 bg-red-50 text-red-950",
  green: "border-emerald-300 bg-emerald-50 text-emerald-950",
};

export function AdminChatModeBanner({ access }: AdminChatModeBannerProps) {
  const lang = settingsData.defaultLanguage;
  const mode = MODE_LABELS[access.mode];
  const roleLabel =
    access.role && adminRolesData.labels[access.role]
      ? adminRolesData.labels[access.role][lang]
      : null;

  return (
    <div className="space-y-3">
      <div
        role="status"
        className={`rounded-xl border px-4 py-3 text-sm ${TONE_CLASSES[mode.tone]}`}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">{mode[lang]}</span>
          {roleLabel && (
            <span className="rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium">
              {roleLabel}
            </span>
          )}
          {access.email && (
            <span className="text-xs opacity-80">{access.email}</span>
          )}
        </div>
        {access.warnings.map((warning) => (
          <p key={warning} className="mt-2 text-xs leading-relaxed opacity-90">
            {warning}
          </p>
        ))}
      </div>
    </div>
  );
}
