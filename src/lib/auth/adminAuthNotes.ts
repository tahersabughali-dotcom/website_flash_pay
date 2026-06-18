/**
 * Admin authentication notes — Flash Pay Global Platform (Step 14)
 * See CHAT_LIVE_INBOX_PLAN.md for full production checklist.
 */

export const ADMIN_AUTH_TODO = [
  "Configure Supabase Auth (email magic link or password) in your Supabase project",
  "Set ADMIN_ALLOWED_EMAILS in server env (never expose to client)",
  "Set enableAdminAuth: true only when Supabase + allowed emails are ready",
  "Keep showChatAdminPreview: false and NEXT_PUBLIC_ENABLE_ADMIN_PREVIEW=false in production",
  "Apply production RLS policies from supabase/schema.sql (not local-dev anon policies)",
  "Verify middleware blocks /admin/* without valid session in production",
  "Never expose SUPABASE_SERVICE_ROLE_KEY to the browser",
  "Do not link /admin/chat in public navigation or sitemap",
  "Keep robots noindex on all admin pages",
  "Map chat_agents rows to authenticated Supabase users before go-live",
] as const;

export const ADMIN_AUTH_NOTES = {
  ar: "مسارات /admin/* محمية تدريجيًا. في الإنتاج يجب تفعيل Supabase Auth و ADMIN_ALLOWED_EMAILS قبل استخدام صندوق المحادثات.",
  en: "/admin/* routes are progressively protected. In production, enable Supabase Auth and ADMIN_ALLOWED_EMAILS before using the chat inbox.",
} as const;

export const ADMIN_LOGIN_NOTICE = {
  ar: "هذه الصفحة مخصصة لفريق Flash Pay فقط.",
  en: "This page is for Flash Pay team members only.",
} as const;

export const ADMIN_SECURITY_WARNING = {
  ar: "هذه لوحة تحكم تجريبية محلية. لا تستخدمها في الإنتاج قبل تفعيل تسجيل الدخول، الصلاحيات، وقاعدة بيانات آمنة.",
  en: "This is a local preview admin dashboard. Do not use in production before enabling authentication, roles, and a secure database.",
} as const;

export const ADMIN_LOGIN_NOT_ENABLED = {
  ar: "تسجيل الدخول الإداري غير مفعل بعد. هذه نسخة تجريبية محلية.",
  en: "Admin login is not enabled yet. This is a local preview build.",
} as const;

export const ADMIN_LOGIN_SUPABASE_MISSING = {
  ar: "تسجيل الدخول يتطلب إعداد Supabase في البيئة المحلية. لا تُعرض أي أسرار هنا.",
  en: "Login requires Supabase configuration in the local environment. No secrets are shown here.",
} as const;
