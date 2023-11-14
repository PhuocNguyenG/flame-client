"use client";
import React, { Suspense, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../../ui/input";
import { Separator } from "../../ui/separator";
import { useTransClient } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/setting";
import { MagnifyingGlassIcon, SymbolIcon } from "@radix-ui/react-icons";
import Link from "../../link";
import { addAccentVietNamese } from "@/lib/utils";
import { QueryApiSearchByKey } from "@/lib/api/client-side";
import { TypeItemCategoryProduct } from "@/lib/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import CrossIcon from "../../icon/cross-25";
import UpdateSearchInput from "./trigger-update-input";

const SearchDialog = React.memo(function SearchDialog({
  lang,
  listCateProduct,
  showOnTop = false,
  inputValue,
  setInputValue,
  dimension,
}: {
  lang: Locale;
  listCateProduct: TypeItemCategoryProduct[];
  showOnTop?: boolean;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  dimension?: { width: number; height: number };
}) {
  const pathname = usePathname();
  const route = useRouter();
  const [open, setOpen] = useState(false);
  const { t } = useTransClient(lang);
  const [showSearchBtn, setShowSearchBtn] = useState(window.scrollY > 90);
  const [searchKey, setSearchKey] = useState(inputValue);
  const { data = [], isFetching } = QueryApiSearchByKey(searchKey, lang);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 90) {
        setShowSearchBtn(true);
      } else {
        setShowSearchBtn(false);
      }
    });
  }, []);

  React.useEffect(() => {
    let searchTimeout: string | number | NodeJS.Timeout | undefined;
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      setSearchKey(inputValue);
    }, 1000);

    return () => {
      clearTimeout(searchTimeout);
    };
  }, [inputValue]);

  const onSubmit = React.useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement> &
        React.ChangeEvent<HTMLInputElement>
    ) => {
      if (e.key === "Enter") {
        NProgress.start();
        route.push(
          `/${lang === "en" ? "en/search" : "tim-kiem"}?s=${e.target.value}`
        );
      }
    },
    []
  );

  return (
    <>
      <Suspense>
        <UpdateSearchInput setInputValue={setInputValue} />
      </Suspense>
      <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <DialogTrigger
          className={`w-full none-select-text `}
          {...(dimension && dimension.width <= 800
            ? {}
            : !showOnTop
            ? { hidden: !showSearchBtn }
            : {})}
          aria-label="search-button"
        >
          <div
            className={`flex flex-row items-center justify-center ${
              showOnTop
                ? "border-2 shadow border-primary p-1 pr-2"
                : `border-[0px] !border-b-[1px] rounded-none !border-primary-foreground/40 min801:border-none lg:border-solid`
            } rounded-md w-full none-select-text`}
            tabIndex={-1}
          >
            <Input
              value={inputValue}
              placeholder={t("Search")}
              className={`${
                showOnTop
                  ? "text-primary"
                  : "text-secondary-foreground hidden max800:block lg:block "
              } font-normal border-none shadow-none focus-visible:ring-0 hover:cursor-pointer opacity-70`}
              style={{ textShadow: " 0 0 black" }}
              tabIndex={-1}
              readOnly
            />
            <MagnifyingGlassIcon
              focusable={"false"}
              className={`min-w-[30px] h-8 opacity-70 ${
                showOnTop ? "text-primary" : "text-white"
              } focus:outline-none !none-select-text`}
              tabIndex={-1}
            />
          </div>
        </DialogTrigger>
        <DialogOverlay className="!bg-gradient-to-b from-black/30 backdrop-blur-none" />
        <DialogContent
          className="!top-[30px] sm:!top-[50px] max-w-2xl bg-white text-primary gap-3 !translate-y-0 "
          iconClose={true}
        >
          <DialogTitle>
            <div className="flex flex-row items-center pr-2 w-full h-fit border-2 rounded-md border-primary/50 translate">
              <Input
                value={inputValue}
                placeholder={t("Search")}
                onChange={(value) => {
                  setInputValue(value.target.value);
                }}
                className="border-none shadow-none focus-visible:ring-0"
                autoFocus
                type="text"
                autoComplete="off"
                onKeyDown={onSubmit}
                id="input-search"
              />
              <div
                className={`w-6 h-6 mr-1 ${
                  inputValue
                    ? "opacity-100 hover:!cursor-pointer"
                    : " opacity-0"
                } transition-all duration-300 hover:cursor-text`}
              >
                <CrossIcon
                  className={`p-[2px] rounded-lg text-primary `}
                  onClick={() => {
                    setInputValue("");
                    document?.getElementById("input-search")?.focus();
                  }}
                />
              </div>
              <Separator orientation="vertical" className="h-6 bg-primary" />
              <div className="w-5 h-5 shrink-0 ml-2">
                {isFetching ? (
                  <SymbolIcon className="w-full h-full animate-spin" />
                ) : (
                  <MagnifyingGlassIcon
                    className="w-7 h-7 left-[-3px] top-[-3px] relative hover:cursor-pointer block none-select-text"
                    onClick={() =>
                      onSubmit({
                        key: "Enter",
                        target: { value: inputValue },
                      } as React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>)
                    }
                  />
                )}
              </div>
            </div>
          </DialogTitle>
          <Separator className="bg-primary/10 " />
          <div className="text-primary text-base">
            <div className="flex flex-col w-full h-fit">
              {data.length ? (
                data.map((item, idx) => {
                  const title = lang === "en" ? item.en.name : item.vn.name;

                  const cateObject = listCateProduct?.find(
                    (cate) => cate.enSlug === item.productType
                  );
                  const href = `/product/${
                    lang === "en"
                      ? `${cateObject?.enSlug}/${item.enSlug}`
                      : `${cateObject?.vnSlug}/${item.vnSlug}`
                  }`;
                  return (
                    <Link href={href} lang={lang} key={idx}>
                      <div className="flex flex-row w-full h-fit px-3 py-2 md:py-3 hover:bg-gray-200 rounded-md cursor-pointer border-b">
                        <div className=" w-[95px] h-[95px] md:h-[100px] md:w-[100px] shrink-0 overflow-hidden rounded-md">
                          <picture className="h-[95px] w-[95px] md:h-[100px] md:w-[100px] ">
                            <source
                              srcSet={item.banner}
                              type="image/webp"
                              width="85"
                              height="85"
                            />
                            <source
                              srcSet="/static/simple-product.svg"
                              type="image/webp"
                              width="85"
                              height="85"
                            />
                            <img
                              loading="lazy"
                              decoding="async"
                              alt={title}
                              className="h-[95px] w-[95px] md:h-[100px] md:w-[100px] object-contain"
                              src="/static/img-error.svg"
                            />
                          </picture>
                        </div>
                        <div className="flex flex-col flex-auto pl-3 text-lg">
                          <span
                            className="line-clamp-2 w-full text-base sm:text-lg tracking-wide capitalize m-0"
                            dangerouslySetInnerHTML={{
                              __html: title.replaceAll(
                                new RegExp(
                                  addAccentVietNamese(inputValue),
                                  "gi"
                                ),
                                (value) => {
                                  return `<span class="font-semibold">${value}</span>`;
                                }
                              ),
                            }}
                          ></span>
                          <span className="flex items-center text-base  sm:text-base font-semibold h-fit w-full italic text-price [text-shadow:0px_0px_black]">
                            {item.price && item.price > 0 ? (
                              <>
                                {item.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/gm, ".")}{" "}
                                {lang === "en" ? "VND" : "đ"}
                              </>
                            ) : (
                              <>{t("ContactForPrice")}</>
                            )}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              ) : searchKey.length && !isFetching ? (
                <div>
                  {t("CannotFindWithThisKey")}
                  <span className="font-semibold">&quot;{searchKey}&quot;</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
});

export default SearchDialog;
