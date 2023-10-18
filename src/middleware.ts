import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { fallbackLng, locales } from "./lib/i18n/setting";
import { listRoute } from "./map-route";

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  // const pathname = request.nextUrl.pathname;

  // // Check if the default locale is in the pathname
  // if (
  //   pathname.startsWith(`/${fallbackLng}/`) ||
  //   pathname === `/${fallbackLng}`
  // ) {
  //   // e.g. incoming request is /vi/about
  //   // The new URL is now /about
  //   return NextResponse.redirect(
  //     new URL(
  //       pathname.replace(
  //         `/${fallbackLng}`,
  //         pathname === `/${fallbackLng}` ? "/" : ""
  //       ),
  //       request.url
  //     )
  //   );
  // }

  // const pathnameIsMissingLocale = locales.every(
  //   (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  // );

  // if (pathnameIsMissingLocale) {
  //   // We are on the default locale
  //   // Rewrite so Next.js understands

  //   // e.g. incoming request is /about
  //   // Tell Next.js it should pretend it's /vi/about

  //   return NextResponse.rewrite(
  //     new URL(`/${fallbackLng}${pathname}`, request.url)
  //   );
  // }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
