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
}: {
  showOnTop?: boolean;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
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
        className="w-full"
        {...(!showOnTop ? { hidden: !showSearchBtn } : {})}
      >
        <div
          className={`flex flex-row items-center ${
            showOnTop
              ? "border-2 shadow border-primary p-1 pr-2"
              : inputValue
              ? "border shadow border-secondary-foreground/60"
              : "border-none"
          } rounded-md w-full`}
          tabIndex={-1}
        >
          <Input
            value={inputValue}
            placeholder={t("Search")}
            className={`${
              showOnTop ? "text-primary" : "text-secondary-foreground"
            } font-normal border-none shadow-none focus-visible:ring-0 hover:cursor-pointer opacity-70`}
            style={{ textShadow: " 0 0 black" }}
            tabIndex={-1}
            readOnly
          />
          <MagnifyingGlassIcon
            focusable={"false"}
            className={` w-8 h-8 opacity-100 ${
              showOnTop ? "text-primary" : "text-white"
            } focus:outline-none `}
            tabIndex={-1}
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className="!top-[15%] bg-primary text-primary-foreground"
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
            />
          </DialogTitle>
          <Separator />
          <DialogDescription className="text-secondary-foreground">{t("Result")}:</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchButton;
