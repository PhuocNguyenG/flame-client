"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useTranslation } from "react-i18next";
import { useTransClient } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/setting";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const SearchButton = ({
  showOnTop = false,
  inputValue,
  setInputValue,
  dimension,
}: {
  showOnTop?: boolean;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  dimension?: { width: number; height: number };
}) => {
  const [showSearchBtn, setShowSearchBtn] = React.useState(false);
  const { i18n } = useTranslation();
  const { t } = useTransClient(i18n.language as Locale);

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
    const setSearch = setTimeout(() => {}, 1000);

    return () => {
      clearTimeout(setSearch);
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
      <DialogContent
        className="!top-[15%] bg-white text-primary"
        iconClose={false}
      >
        <DialogHeader>
          <DialogTitle>
            <Input
              defaultValue={inputValue}
              placeholder={t("Search")}
              onChange={(value) => {
                setInputValue(value.target.value);
              }}
              className="border-primary-foreground/50"
              autoFocus
              type="search"
            />
          </DialogTitle>
          <Separator />
          <DialogDescription className="text-primary">
            {t("Result")}:
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchButton;
