"use client";

import * as React from "react";
import { cn, getLangByPathname } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AccountDropdown from "../dropdown/account-nav";
import SearchButton from "../button/search-nav";
import Basket from "../button/basket-nav";
import SwitchLanguage from "../button/switch-language";
import { useTransClient } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/setting";
import { useParams, usePathname } from "next/navigation";
import Link from "../link";
import { ExportRouterResult } from "@/lib/type";
import FlameLogo from "@/assets/logo/flame-logo.svg";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setCategoryExportTrans } from "@/lib/redux/slice/router";
import { RootState } from "@/lib/redux/store";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function MainNavBar({
  cateExport,
  slugExport,
}: {
  cateExport: ExportRouterResult[];
  slugExport?: [{ enSlug: string; vnSlug: string }];
}) {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);
  const { t } = useTransClient(lang);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(
      setCategoryExportTrans(
        cateExport as RootState["router"]["categoryExportTrans"]
      )
    );
  }, [cateExport]);

  return (
    <div className="flex flex-row w-full h-full justify-center items-center gap-2">
      {/* Before logo */}
      <div className="flex flex-row flex-1 justify-end">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link pathName={pathname} legacyBehavior href="/" passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t("Home")}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger> {t("Product")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>{t("Gift_Product")}</NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <Link
                      href={lang === "en" ? "gift" : "qua-tang-qua-bieu"}
                      pathName={pathname}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink asChild>
                        <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-5 no-underline outline-none focus:shadow-md">
                          <div className="mb-2 mt-4 text-lg font-medium">
                            Quà tặng
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Dùng làm quà cho gia đình, bạn bè, đồng nghiệp, ...
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <Link href={"/san-pham-say/combo-3"} pathName={pathname}>
                    <ListItem title="Combo 3 loại trái cây">
                      Mít sấy, chuối sấy, hạt điều.
                    </ListItem>
                  </Link>
                  <ListItem
                    href="/san-pham-say/combo-5"
                    title="Combo 5 loại trái cây"
                  >
                    Mít sấy, chuối sấy, hạt điều, khoai sấy, hồng sấy.
                  </ListItem>
                  <ListItem href="/san-pham-say/tuy-chon" title="Tùy chọn ...">
                    Hạt dưa, bí, sen, thơm sấy, cóc, dừa, ...
                  </ListItem>
                </ul> */}
                <div className="grid gap-3 p-4 md:w-[300px] lg:w-[300px] text-center">
                  Coming soon
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Logo */}
      <div className="min-w-[100px] max-w-fit h-full justify-center items-center inline-block ">
        <Link
          pathName={pathname}
          href={"/"}
          className="min-w-[106px] p-[3px] !pt-[2px] pb-[0px] bg-white block relative top-[2px] rounded-full group overflow-hidden"
        >
          <Image
            alt="Flame | Agricultural by PhuocLinh"
            src={FlameLogo}
            height={90}
            width={90}
            sizes="100px"
            className="w-[100px] h-[100px]"
            priority
          />
          <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
        </Link>
      </div>

      {/* After logo */}
      <div className="flex-1">
        <div className="flex flex-row justify-between items-center max-w-[65%]">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("Export")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-3 md:w-[500px] md:grid-cols-3 lg:w-[600px] ">
                    <Link
                      href={lang === "en" ? "/export" : "/xuat-khau"}
                      pathName={pathname}
                    >
                      <ListItem key={"export"} title={"Tất cả"}></ListItem>
                    </Link>
                    {cateExport?.map((component, idx) => {
                      const title = lang === "en" ? component.en : component.vn;
                      const href =
                        lang === "en"
                          ? `/export/${component.enSlug}`
                          : `/xuat-khau/${component.vnSlug}`;
                      return (
                        <Link href={href} pathName={pathname} key={idx}>
                          <ListItem title={title}></ListItem>
                        </Link>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex flex-row gap-4 items-center">
            <SearchButton />
            <SwitchLanguage slugExportTrans={slugExport} />
            <Basket />
            <AccountDropdown />
          </div>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none whitespace-nowrap">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
