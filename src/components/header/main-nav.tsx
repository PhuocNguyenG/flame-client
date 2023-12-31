"use client";

import * as React from "react";
import {
  useWindowSize,
  cn,
  getLangByPathname,
  getPositionElement,
} from "@/lib/utils";
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
import dynamic from "next/dynamic";
const AccountDropdown = dynamic(() => import("../user/top-nav-dropdown"));
import SearchDialog from "./search/input-dialog";
import Basket from "../button/basket-nav";
import SwitchLanguage from "../button/switch-language";
const SideNav = dynamic(() => import("./side-nav"));
import { useTransClient } from "@/lib/i18n/client";
import { usePathname } from "next/navigation";
import Link from "../link";
import { TypeItemCategoryProduct } from "@/lib/type";
import { setSlugCategoriesTrans } from "@/lib/redux/slice/router";
import { RootState, useAppDispatch } from "@/lib/redux/store";
import HotLine from "./hot-line";
import LogoHeader from "./logo-large";
import LoginModal from "../user/login-modal";
import nProgress from "nprogress";

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
  const dimension = useWindowSize();
  const [openLogin, setOpenLogin] = React.useState(false);
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
  nProgress.done();

  return (
    <>
      <div className="flex flex-row gap-5 max800:hidden h-[113px] items-center justify-around w-full container">
        <LogoHeader lang={lang} />

        <div className="max-w-[500px] lg:w-[inherit] w-[28%]">
          <SearchDialog
            lang={lang}
            listCateProduct={cateProduct}
            showOnTop
            inputValue={searchInputValue}
            setInputValue={setSearchInputValue}
          />
        </div>

        <HotLine lang={lang} />

        <div>
          <SwitchLanguage />
        </div>
      </div>
      <nav className="sticky flex flex-row w-full h-[60px] min801:h-[50px] bg-primary top-0 z-10 transition-all duration-500">
        <div className="flex flex-row w-full h-[60px] min801:h-[50px] justify-center items-start gap-2 container transition-all duration-500">
          {/* Side bar */}
          {useWindowSize().width <= 800 && (
            <div className="hidden max800:flex w-fit h-fit my-auto">
              <SideNav
                lang={lang}
                cateProduct={cateProduct}
                cateExport={cateExport}
                callbackOpenLogin={(isOpen) => setOpenLogin(isOpen)}
              />
            </div>
          )}
          <NavigationMenu
            value={value}
            onValueChange={(value) => setValue(value)}
            delayDuration={0}
            className="max800:hidden"
          >
            <NavigationMenuList ref={listRef as any}>
              <NavigationMenuItem value={"Home"}>
                <Link lang={lang} legacyBehavior href="/" passHref>
                  <NavigationMenuLink
                    active={!!["/", "/vi", "/en"].find((x) => x === pathname)}
                    className={navigationMenuTriggerStyle()}
                  >
                    {t("Home")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem value={"Introduce"}>
                <Link lang={lang} href="/introduce" passHref legacyBehavior>
                  <NavigationMenuLink
                    active={
                      !!["introduce", "gioi-thieu"].find((x) =>
                        pathname.split("/").includes(x)
                      )
                    }
                    className={navigationMenuTriggerStyle()}
                  >
                    {t("Introduce")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem value={"Product"}>
                <NavigationMenuTrigger
                  {...(!!["product", "san-pham", "search", "tim-kiem"].find(
                    (x) => pathname.split("/").includes(x)
                  ) && { "data-active": true })}
                  ref={(node: any) => {
                    if ("Product" === value && activeTrigger !== node) {
                      setActiveTrigger(node);
                    }
                    return node;
                  }}
                  className="none-select-text"
                >
                  {t("Product")}
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
                    <Link href={`/product`} lang={lang} passHref legacyBehavior>
                      <ListItem
                        {...(!!["product", "san-pham"].find((x) =>
                          pathname.split("/").includes(x)
                        ) &&
                          !pathname.split("/")[2] && {
                            "data-active": true,
                          })}
                        className={navigationMenuActiveStyle()}
                        title={t("All")}
                      ></ListItem>
                    </Link>
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
                            {...(!!["product", "san-pham"].find((x) =>
                              pathname.split("/").includes(x)
                            ) &&
                              pathname.split("/").includes(`${cate}`) && {
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

              {/* <NavigationMenuItem value={"Present"}>
                <NavigationMenuTrigger
                  {...(!!["present", "qua-tang-qua-bieu"].find((x) =>
                    pathname.split("/").includes(x)
                  ) && { "data-active": true })}
                  ref={(node: any) => {
                    if ("Present" === value && activeTrigger !== node) {
                      setActiveTrigger(node);
                    }
                    return node;
                  }}
                >
                  {t("Present_Product")}
                </NavigationMenuTrigger>
                <NavigationMenuContent
                  ref={(node: any) => {
                    if ("Present" === value) {
                      setContentTrigger(node);
                    }
                    return node;
                  }}
                >
                   <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                  <Link
                      href={lang === "en" ? "Present" : "qua-tang-qua-bieu"}
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
                </ul> 
                  <div className="grid gap-3 p-4 md:w-[300px] lg:w-[300px] text-center">
                    {t("ComingSoon")}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>*/}
              <NavigationMenuItem value="Export">
                <NavigationMenuTrigger
                  {...(!!["export", "xuat-khau"].find((x) =>
                    pathname.split("/").includes(x)
                  ) && { "data-active": true })}
                  ref={(node: any) => {
                    if ("Export" === value && activeTrigger !== node) {
                      setActiveTrigger(node);
                    }
                    return node;
                  }}
                  className="none-select-text"
                >
                  {t("Export")}
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
                    <Link href={`/export`} lang={lang} passHref legacyBehavior>
                      <ListItem
                        {...(!!["export", "xuat-khau"].find((x) =>
                          pathname.split("/").includes(x)
                        ) &&
                          !pathname.split("/")[2] && {
                            "data-active": true,
                          })}
                        className={navigationMenuActiveStyle()}
                        title={t("All")}
                      ></ListItem>
                    </Link>
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
                            {...(!!["export", "xuat-khau"].find((x) =>
                              pathname.split("/").includes(x)
                            ) &&
                              pathname.split("/").includes(`${cate}`) && {
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
              <NavigationMenuItem
                value={"Contact"}
                className="hidden min801:block"
              >
                <Link lang={lang} legacyBehavior href="/contact" passHref>
                  <NavigationMenuLink
                    active={
                      !!["lien-he", "contact"].find((x) =>
                        pathname.split("/").includes(x)
                      )
                    }
                    className={navigationMenuTriggerStyle()}
                  >
                    {t("Contact")}
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

          <div className="flex flex-row gap-4 lg:gap-5 items-center ml-auto my-auto ">
            <div className="flex justify-center max-w-[200px] min801:max-w-[150px] ">
              <SearchDialog
                lang={lang}
                listCateProduct={cateProduct}
                showOnTop={false}
                inputValue={searchInputValue}
                setInputValue={setSearchInputValue}
                dimension={dimension}
              />
            </div>
            <Basket />
            {/* <div className="hidden min481:flex w-fit h-fit">
              <AccountDropdown
                callbackOpenLogin={(value) => setOpenLogin(value)}
              />
            </div> */}
          </div>
        </div>
        {/* <LoginModal
          lang={lang}
          open={openLogin}
          callBackOpen={(isOpen) => setOpenLogin(isOpen)}
        /> */}
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
