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

const SearchButton = () => {
  const [inputValue, setInputValue] = React.useState("");
  const { i18n } = useTranslation();
  const { t } = useTransClient(i18n.language as Locale);

  React.useEffect(() => {
    const setSearch = setTimeout(() => {
      console.log("call api");
    }, 1000);

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
      <DialogTrigger>
        <Input
          defaultValue={inputValue}
          placeholder={t("Search")}
          className="w-[130px] text-transparent font-normal"
          style={{ textShadow: " 0 0 black" }}
          tabIndex={-1}
          readOnly
        />
      </DialogTrigger>
      <DialogContent className="!top-[15%]" iconClose={false}>
        <DialogHeader>
          <DialogTitle>
            <Input
              defaultValue={inputValue}
              placeholder={t("Search")}
              onChange={(value) => {
                setInputValue(value.target.value);
              }}
              autoFocus
            />
          </DialogTitle>
          <Separator />
          <DialogDescription>{t("Result")}:</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SearchButton;
