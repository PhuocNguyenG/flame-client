"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { BasketItemType, addToBasket } from "@/lib/redux/slice/basket";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { toast } from "../ui/use-toast";
import { useTransClient } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/setting";

interface ButtonAddToBasketProps extends ButtonProps {
  lang: Locale;
  data: BasketItemType;
}

const ButtonAddToBasket = ({
  data,
  lang,
  ...props
}: ButtonAddToBasketProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTransClient(lang);
  return (
    <Button
      variant={"default"}
      onClick={() => {
        dispatch(addToBasket(data));
        toast({
          title: t("AddToBasketSuccess"),
          variant: "success",
        });
      }}
      {...props}
    />
  );
};

export default ButtonAddToBasket;
