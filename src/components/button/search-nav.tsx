"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useTranslation } from "react-i18next";
import { useTransClient } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/setting";
import {
  MagnifyingGlassIcon,
  SymbolIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import Link from "../link";
import { addAccentVietNamese, removeAccentVietNamese } from "@/lib/utils";
import { QueryApiSearchByKey } from "@/lib/api/client-side";
import { TypeItemCategoryProduct } from "@/lib/type";

const SearchButton = ({
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
}) => {
  const { t } = useTransClient(lang);
  const [showSearchBtn, setShowSearchBtn] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const { data = [], isFetching } = QueryApiSearchByKey(searchKey, lang);
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

  //React query
  //   const {
  //     data: result = [],
  //     isFetching,
  //     refetch,
  //   } = querySearchByKey<SearchProductResult[]>({
  //     variables: { key: filter, lang: i18n.language },
  //   });

  return (
    <Dialog>
      <DialogTrigger
        className={`w-full `}
        {...(dimension && dimension.width <= 800
          ? {}
          : !showOnTop
          ? { hidden: !showSearchBtn }
          : {})}
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
            } focus:outline-none `}
            tabIndex={-1}
          />
        </div>
      </DialogTrigger>
      <DialogOverlay className="!bg-gradient-to-b from-black/30 backdrop-blur-none" />
      <DialogContent
        className="!top-[50px] max-w-2xl bg-white text-primary gap-3 !translate-y-0"
        iconClose={false}
      >
        <DialogTitle>
          <div className="flex flex-row items-center px-2 w-full h-fit border-2 rounded-md border-primary/50 translate ">
            <div className="w-5 h-5 shrink-0 ">
              {isFetching ? (
                <SymbolIcon className="w-full h-full animate-spin" />
              ) : (
                <MagnifyingGlassIcon className="w-7 h-7 left-[-3px] top-[-3px] relative" />
              )}
            </div>
            <Input
              defaultValue={inputValue}
              placeholder={t("Search")}
              onChange={(value) => {
                setInputValue(value.target.value);
              }}
              className="border-none shadow-none focus-visible:ring-0"
              autoFocus
              type="search"
            />
          </div>
        </DialogTitle>
        <Separator className="bg-primary/10 " />
        <div className="text-primary text-base">
          <div className="flex flex-col w-full h-fit">
            {data.map((item, idx) => {
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
                          width="80"
                          height="80"
                        />
                        <source
                          srcSet="/static/images/img-product.svg"
                          type="image/webp"
                          width="80"
                          height="80"
                        />
                        <img
                          loading="lazy"
                          decoding="async"
                          alt={title}
                          className="h-[95px] w-[95px] md:h-[100px] md:w-[100px] "
                          src="/estore-images/fallback-images/error/img-error-1_1.svg"
                        />
                      </picture>
                    </div>
                    <div className="flex flex-col flex-auto pl-3">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: title.replaceAll(
                            new RegExp(addAccentVietNamese(inputValue), "gi"),
                            (value) => {
                              return `<span class="font-semibold">${value}</span>`;
                            }
                          ),
                        }}
                      ></span>
                      {/* <span>30000k</span> */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchButton;
