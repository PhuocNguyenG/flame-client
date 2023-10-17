"use client";

import * as React from "react";
import { cn, getLangByPathname, getPositionElement } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuActiveStyle,
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
import { TypeItemCategoryProduct } from "@/lib/type";
import FlameLogo from "@/assets/logo/flame-logo.svg";
import PhoneIcon from "@/assets/icon/phone-call.svg";
import MapMarkedIcon from "@/assets/icon/map-marked.svg";
import Image from "next/image";

import { setSlugCategoriesTrans } from "@/lib/redux/slice/router";
import { RootState, useAppDispatch } from "@/lib/redux/store";
import { Separator } from "../ui/separator";

export function MainNavBar({
  cateProduct,
  cateExport,
}: {
  cateProduct: TypeItemCategoryProduct[];
  cateExport: TypeItemCategoryProduct[];
}) {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);
  const { t } = useTransClient(lang);
  const dispatch = useAppDispatch();

  const [offset, setOffset] = React.useState<number | null>();
  const listRef = React.useRef<HTMLDivElement>();
  const [value, setValue] = React.useState<string>();
  const [activeTrigger, setActiveTrigger] = React.useState<HTMLDivElement>();
  const [contentTrigger, setContentTrigger] = React.useState<HTMLDivElement>();
  const [searchInputValue, setSearchInputValue] = React.useState("");

  React.useEffect(() => {
    const list = listRef.current;

    if (activeTrigger && list && contentTrigger) {
      const listWidth = list.offsetWidth;
      const listCenter = listWidth / 2;

      const triggerOffsetRight =
        listWidth -
        activeTrigger.offsetLeft -
        activeTrigger.offsetWidth +
        activeTrigger.offsetWidth / 2;

      let offsetDropdown = Math.round(listCenter - triggerOffsetRight);
      const offsetActiveTrigger = getPositionElement(activeTrigger).x;

      setOffset(
        activeTrigger.offsetWidth / 2 + offsetActiveTrigger <=
          contentTrigger.offsetWidth / 2
          ? offsetDropdown +
              contentTrigger.offsetWidth / 2 -
              (activeTrigger.offsetWidth / 2 + offsetActiveTrigger)
          : offsetDropdown
      );
    } else if (value === "") {
      setOffset(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrigger, value]);

  React.useEffect(() => {
    dispatch(
      setSlugCategoriesTrans(
        cateExport.concat(
          cateProduct
        ) as RootState["router"]["slugCategoriesTrans"]
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cateExport, cateProduct]);

  return (
    <>
      <div className="h-[28px] w-full bg-primary ">
        <div className="container h-full flex flex-row flex-wrap justify-between items-center text-secondary-foreground text-sm font-medium">
          <div className=""></div>
          <div className="flex flex-row flex-wrap h-full items-center justify-center gap-2 ">
            <Image
              src={MapMarkedIcon}
              alt="Map marker"
              width={18}
              height={18}
              sizes="30"
              className="h-auto opacity-80"
              unoptimized
            />
            <p>{t("AddressDetail")}</p>
            <Separator
              orientation="vertical"
              className="bg-secondary-foreground h-4/6"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-5 h-[112px] items-center justify-around w-full container">
        <div className="min-w-[100px] max-w-fit h-fit justify-center items-center inline-block bg-primary p-[1px] rounded-full">
          <Link
            lang={lang}
            href={"/"}
            className="min-w-[100px] block relative top-[2px] rounded-full group overflow-hidden"
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
        <div className="max-w-[500px] w-[inherit]">
          <SearchButton
            showOnTop
            inputValue={searchInputValue}
            setInputValue={setSearchInputValue}
          />
        </div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <div>
            <Image
              src={PhoneIcon}
              alt="Hỗ trợ khách hàng"
              sizes="30px"
              width={30}
              height={30}
              className="min-w-[30px]"
              unoptimized
            />
          </div>
          <div>
            <b className="text-[15px] whitespace-nowrap">
              {t("CustomerSupport")}
            </b>
            <p className="font-semibold text-[18px] text-red-600">
              {t("PhoneNumber")}
            </p>
          </div>
        </div>
        <div>
          <SwitchLanguage />
        </div>
      </div>
      <nav className="sticky flex flex-row w-full h-[50px] bg-primary drop-shadow-[0_5px_20px_rgba(0,0,0,.1)] top-0 z-10">
        <div className="flex flex-row w-full h-full justify-center items-start gap-2 container">
          <NavigationMenu
            value={value}
            onValueChange={(value) => setValue(value)}
            delayDuration={0}
          >
            <NavigationMenuList ref={listRef as any}>
              <NavigationMenuItem value={"Home"}>
                <Link lang={lang} legacyBehavior href="/" passHref>
                  <NavigationMenuLink
                    active={!!["/", "/en"].find((x) => x === pathname)}
                    className={navigationMenuTriggerStyle()}
                  >
                    {t("Home")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem value={"Product"}>
                <NavigationMenuTrigger
                  {...(!!["/product", "/san-pham"].find((x) =>
                    pathname.includes(x)
                  ) && { "data-active": true })}
                  ref={(node: any) => {
                    if ("Product" === value && activeTrigger !== node) {
                      setActiveTrigger(node);
                    }
                    return node;
                  }}
                >
                  <Link href={"/product"} lang={lang}>
                    {t("Product")}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  ref={(node: any) => {
                    if ("Product" === value) {
                      setContentTrigger(node);
                    }
                    return node;
                  }}
                >
                  <ul className="grid w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[300px] ">
                    {cateProduct.map((item, idx) => {
                      const title = lang === "en" ? item.en : item.vn;
                      const cate = lang === "en" ? item.enSlug : item.vnSlug;
                      const href = `/product/${cate}`;

                      return (
                        <Link
                          href={href}
                          lang={lang}
                          key={idx}
                          passHref
                          legacyBehavior
                        >
                          <ListItem
                            {...(!!["/product", "/san-pham"].find((x) =>
                              pathname.includes(x)
                            ) &&
                              pathname.includes(`/${cate}`) && {
                                "data-active": true,
                              })}
                            className={navigationMenuActiveStyle()}
                            title={title}
                          ></ListItem>
                        </Link>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem value={"Gift"}>
                <NavigationMenuTrigger
                  {...(!!["/gift", "/qua-tang-qua-bieu"].find((x) =>
                    pathname.includes(x)
                  ) && { "data-active": true })}
                  ref={(node: any) => {
                    if ("Gift" === value && activeTrigger !== node) {
                      setActiveTrigger(node);
                    }
                    return node;
                  }}
                >
                  {t("Gift_Product")}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  ref={(node: any) => {
                    if ("Gift" === value) {
                      setContentTrigger(node);
                    }
                    return node;
                  }}
                >
                  {/* <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                  <Link
                      href={lang === "en" ? "gift" : "qua-tang-qua-bieu"}
                      lang={lang}
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
                            <Link href={"/san-pham-say/combo-3"} lang={lang}>
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
                    {t("ComingSoon")}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value="Export">
                <NavigationMenuTrigger
                  {...(!!["/export", "/xuat-khau"].find((x) =>
                    pathname.includes(x)
                  ) && { "data-active": true })}
                  ref={(node: any) => {
                    if ("Export" === value && activeTrigger !== node) {
                      setActiveTrigger(node);
                    }
                    return node;
                  }}
                >
                  <Link href={"/export"} lang={lang}>
                    {t("ExportProduct")}
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  ref={(node: any) => {
                    if ("Export" === value) {
                      setContentTrigger(node);
                    }
                    return node;
                  }}
                >
                  <ul className="grid w-[300px] gap-3 p-3 md:w-[300px] md:grid-cols-2 lg:w-[300px]">
                    {cateExport.map((item, idx) => {
                      const title = lang === "en" ? item.en : item.vn;
                      const cate = lang === "en" ? item.enSlug : item.vnSlug;
                      const href = `/export/${cate}`;

                      return (
                        <Link
                          href={href}
                          lang={lang}
                          key={idx}
                          passHref
                          legacyBehavior
                        >
                          <ListItem
                            {...(!!["/export", "/xuat-khau"].find((x) =>
                              pathname.includes(x)
                            ) &&
                              pathname.includes(`/${cate}`) && {
                                "data-active": true,
                              })}
                            className={navigationMenuActiveStyle()}
                            title={title}
                          ></ListItem>
                        </Link>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem value={"Contact"}>
                <Link lang={lang} legacyBehavior href="/contact" passHref>
                  <NavigationMenuLink
                    active={!!["/lien-he", "/en/contact"].find((x) => x === pathname)}
                    className={navigationMenuTriggerStyle()}
                  >
                    {t("ContactUs")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuIndicator />
            </NavigationMenuList>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <NavigationMenuViewport
                style={{
                  // Avoid transitioning from initial position when first opening
                  display: !offset ? "none" : undefined,
                  transform: `translateX(${offset}px)`,
                }}
              />
            </div>
          </NavigationMenu>

          <div className="flex flex-row gap-3 lg:gap-5 items-center ml-auto my-auto">
            <div className="max-w-[120px]">
              <SearchButton
                inputValue={searchInputValue}
                setInputValue={setSearchInputValue}
              />
            </div>
            <Basket />
            <AccountDropdown />
          </div>
          {/* Logo */}
        </div>
      </nav>
    </>
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
            "block !w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-foreground/20 hover:text-secondary-foreground focus:bg-primary-foreground/20 focus:text-secondary-foreground ",
            className
          )}
          {...props}
        >
          <div className="text-sm whitespace-nowrap">{title}</div>
          {children && (
            <p className="line-clamp-2 normal-case text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
