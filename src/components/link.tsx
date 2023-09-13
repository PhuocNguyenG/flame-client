import { getLangByPathname } from "@/lib/utils";
import NextLink, { LinkProps } from "next/link";
import { HTMLProps, FC } from "react";

type MyLink = {
  pathName: string;
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
  pathName,
  legacyBehavior,
  ...rest
}: MyLink) => {
  const lang = getLangByPathname(pathName);
  const oldHref = href[0] === "/" ? href : `/${href}`;
  const newHref = lang === "en" ? `/en${oldHref}` : oldHref;

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
