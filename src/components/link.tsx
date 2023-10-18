"use client";
import { getLangByPathname } from "@/lib/utils";
import NextLink, { LinkProps } from "next/link";
import { HTMLProps, FC } from "react";
import { listRoute } from "@/map-route";
type MyLink = {
  lang: string;
} & LinkProps &
  React.RefAttributes<HTMLAnchorElement> &
  HTMLProps<HTMLAnchorElement>;

const Link = ({
  as,
  children,
  href,
  replace,
  scroll,
  shallow,
  passHref,
  lang,
  legacyBehavior,
  ...rest
}: MyLink) => {
  const oldHref = href[0] === "/" ? href : `/${href}`;

  const newHref =
    lang === "en"
      ? `/en${oldHref
          .split("/")
          .map((item) => {
            const routeTrans = listRoute.find((rou) => {
              return rou.vnSlug === item;
            })?.enSlug;

            return routeTrans ? routeTrans : item;
          })
          .join("/")}`
      : oldHref
          .split("/")
          .map((item) => {
            const routeTrans = listRoute.find((rou) => {
              return rou.enSlug === item;
            })?.vnSlug;

            return routeTrans ? routeTrans : item;
          })
          .join("/");

  return (
    <NextLink
      as={as}
      href={newHref}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      legacyBehavior={legacyBehavior}
      {...rest}
    >
      {children}
    </NextLink>
  );
};
export default Link;
