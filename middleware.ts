import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  isAdminAuthConfigured,
  isProductionEnvironment,
  parseAllowedAdminEmails,
} from "@/lib/auth/adminAccessConfig";
import { isAdminPathPreviewEnabled } from "@/lib/auth/resolveAdminRouteAccess";
import { createSupabaseMiddlewareClient } from "@/lib/supabase/serverAuth";

const ADMIN_LOGIN_PATH = "/admin/login";

function isEmailInAdminAllowlist(email: string): boolean {
  const normalized = email.trim().toLowerCase();
  return parseAllowedAdminEmails(process.env.ADMIN_ALLOWED_EMAILS).some(
    (entry) => entry.email === normalized,
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname.startsWith(ADMIN_LOGIN_PATH)) {
    return NextResponse.next();
  }

  const isProd = isProductionEnvironment();
  const previewAllowed = isAdminPathPreviewEnabled(pathname);
  const authConfigured = isAdminAuthConfigured();

  if (!previewAllowed && !authConfigured) {
    return new NextResponse(null, { status: 404 });
  }

  if (isProd && !authConfigured) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  if (authConfigured) {
    const response = NextResponse.next();
    const supabase = createSupabaseMiddlewareClient(request, response);

    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email) {
        if (isProd || !previewAllowed) {
          return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
        }
      } else if (!isEmailInAdminAllowlist(user.email)) {
        return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
      }

      return response;
    }
  }

  if (isProd && !previewAllowed) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
