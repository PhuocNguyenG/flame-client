import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { fallbackLng, locales } from "./lib/i18n/setting";
import { listRoute } from "./map-route";

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // const TransRoute = async (name: string): Promise<string> => {
  //   if (name.startsWith(`/en/`) || name === `/en`) {
  //     let result: string = name;
  //     return await listRoute
  //       .reduce(async (referencePoint, item) => {
  //         // Check for execution status of previous iteration, i.e. wait for it to get finished
  //         await referencePoint;
  //         // Process the current iteration
  //         if (name.includes(`/${item.vnSlug}`)) {
  //           result = name.replace(`/${item.vnSlug}`, `/${item.enSlug}`);
  //         }
  //       }, Promise.resolve())
  //       .then(() => {
  //         return result;
  //       });
  //   } else {
  //     let result: string = name;
  //     return await listRoute
  //       .reduce(async (referencePoint, item) => {
  //         // Check for execution status of previous iteration, i.e. wait for it to get finished
  //         await referencePoint;
  //         // Process the current iteration
  //         if (name.includes(`/${item.enSlug}`)) {
  //           result = name.replace(`/${item.enSlug}`, `/${item.vnSlug}`);
  //         }
  //       }, Promise.resolve())
  //       .then(() => {
  //         return result;
  //       });
  //   }
  // };

  // Check if the default locale is in the pathname
  if (
    pathname.startsWith(`/${fallbackLng}/`) ||
    pathname === `/${fallbackLng}`
  ) {
    // e.g. incoming request is /vi/about
    // The new URL is now /about
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

    // e.g. incoming request is /about
    // Tell Next.js it should pretend it's /vi/about

    return NextResponse.rewrite(
      new URL(`/${fallbackLng}${pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
