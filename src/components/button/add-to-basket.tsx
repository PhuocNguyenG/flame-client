"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { BasketItemType, addToBasket } from "@/lib/redux/slice/basket";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";

interface ButtonAddToBasketProps extends ButtonProps {
  data: BasketItemType;
}

const ButtonAddToBasket = ({ data, ...props }: ButtonAddToBasketProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      variant={"default"}
      onClick={() => {
        dispatch(addToBasket(data));
      }}
      {...props}
    />
  );
};

export default ButtonAddToBasket;
