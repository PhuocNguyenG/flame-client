import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { fallbackLng, locales } from "./lib/i18n/setting";
import { listRoute } from "./map-route";

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Check if the default locale is in the pathname
  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    // e.g. incoming request is /vi/product
    // The new URL is now /product
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${fallbackLng}`,
          pathname === `/${fallbackLng}` ? "/" : ""
        ),
        request.url
      )
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // We are on the default locale
    // Rewrite so Next.js understands

    // e.g. incoming request is /san-pham
    // Tell Next.js it should pretend it's /vi/product
    const newPathname = pathname.split("/")
    .map((item) => {
      const routeTrans = listRoute.find((rou) => {
        return rou.vnSlug === item;
      })?.enSlug;

      return routeTrans ? routeTrans : item;
    })
    .join("/")

    return NextResponse.rewrite(
      new URL(`/${fallbackLng}${newPathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
