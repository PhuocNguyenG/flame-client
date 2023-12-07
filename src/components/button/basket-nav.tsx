"use client";
import React from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import { useTransClient } from "@/lib/i18n/client";
import { convertToVND, getLangByPathname } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "../link";
import {
  clearBasket,
  openBasketSidebar,
  removeFromBasket,
  selectBasket,
  selectBasketTotalPrice,
  setBasketFromLocal,
  updateQuantityBasketById,
} from "@/lib/redux/slice/basket";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { PlusIcon } from "../icon/plus";
import { MinusIcon } from "../icon/minus";
import { TrashIcon } from "../icon/trash";
import { BasketIcon } from "../icon/basket";

const Basket = () => {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);
  const { t } = useTransClient(lang);
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const basketData = useAppSelector(selectBasket).listItem;
  const basketTotalPriceData = useAppSelector(selectBasketTotalPrice);
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  React.useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  React.useEffect(() => {
    if (basket.open) {
      setOpen(true);
      dispatch(openBasketSidebar(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket.open]);

  React.useEffect(() => {
    if (ls && ls.getItem("basket") && basketData.length < 1) {
      dispatch(setBasketFromLocal(JSON.parse(ls.getItem("basket") || "")|| []));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TooltipProvider delayDuration={300}>
      <Sheet open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <SheetTrigger asChild>
          <div>
            <Tooltip>
              <TooltipTrigger
                className="transition-all duration-300 min-w-[23px] min-h-[23px] none-select-text"
                aria-label="0, basket-button"
                onClick={() => setOpen(true)}
              >
                <div className="w-[28px] h-[28px] relative block">
                  <Badge
                    className={`absolute right-[-5px] bottom-[-10px] border border-primary-foreground`}
                  >
                    {basketData.length}
                  </Badge>
                  <BasketIcon className="h-8 text-white" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{t("Basket")}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </SheetTrigger>
        <SheetContent className="px-4 pb-2 w-[400px] max480:w-full">
          <div className="flex flex-col h-full">
            <SheetHeader className="h-[40px] ">
              <SheetTitle>{t("Basket")}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full transition-all duration-500 space-y-3 overflow-x-auto overflow-y-auto pr-2 pb-2 border-b">
              {basketData.length == 0 ? (
                <>
                  <div>{t("NothingInBasket")}</div>
                </>
              ) : (
                <>
                  {basketData.map((item, idx) => {
                    const name = lang === "en" ? item.en.name : item.vn.name;
                    const href = lang === "en" ? item.en.slug : item.vn.slug;
                    return (
                      <div
                        className="flex flex-row items-center h-auto w-full border-b border-primary/20 py-2"
                        key={idx}
                      >
                        <div className="min-h-[90px]">
                          <Link
                            href={href}
                            lang={lang}
                            className="flex items-center max-h-[90px] h-fit max-w-[90px] min-w-[90px] rounded-md"
                          >
                            <Image
                              priority
                              src={item.banner}
                              alt={name}
                              loading="eager"
                              className="w-full h-full object-contain rounded-md duration-500"
                              sizes="(max-width: 800px) 40vw, (max-width: 1060px) 30vw, 20vw"
                              width={200}
                              height={200}
                            />
                          </Link>
                        </div>
                        <div className="flex flex-col justify-between w-full h-full pl-3">
                          <div className="flex flex-col justify-between h-[70px]">
                            <span className="line-clamp-2 capitalize font-medium leading-5 h-10">
                              {name}
                            </span>
                            <div className="flex flex-row gap-2">
                              <span>
                                x
                                <span className="font-medium">
                                  {item.quantity}
                                </span>
                                &nbsp;=&nbsp;
                                <span className="whitespace-nowrap h-6 text-price font-semibold">
                                  {convertToVND(item.price * item.quantity)} đ
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row w-full h-[30px] items-center justify-between gap-2">
                            <div className="flex flex-row items-center border rounded-md border-primary/30">
                              <Button
                                variant={"ghost"}
                                className="h-7 w-7 rounded-r-none"
                                size={"icon"}
                                onClick={() => {
                                  dispatch(
                                    updateQuantityBasketById({
                                      _id: item._id,
                                      quantityType: "DECREASE",
                                    })
                                  );
                                }}
                              >
                                <MinusIcon />
                              </Button>
                              <Input
                                inputMode="numeric"
                                value={item.quantity}
                                className="w-10 h-7 px-1 text-center border-y-0 border-primary/30 shadow-none rounded-none"
                                onChange={(input) => {
                                  input.target.value =
                                    input.target.value.replace(/\D/g, "");
                                  dispatch(
                                    updateQuantityBasketById({
                                      _id: item._id,
                                      quantityNumber: Number(
                                        input.target.value.replace(/\D/g, "")
                                      ),
                                    })
                                  );
                                }}
                              />
                              <Button
                                variant={"ghost"}
                                className="h-7 w-7 rounded-l-none"
                                size={"icon"}
                                onClick={() => {
                                  dispatch(
                                    updateQuantityBasketById({
                                      _id: item._id,
                                      quantityType: "INCREASE",
                                    })
                                  );
                                }}
                              >
                                <PlusIcon />
                              </Button>
                            </div>
                            <Button
                              className="px-1 w-fit"
                              variant={"ghost"}
                              size={"icon"}
                              onClick={() => {
                                dispatch(removeFromBasket(item._id));
                              }}
                            >
                              <TrashIcon />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full h-fit py-3">
              <div className="flex flex-row items-center gap-2">
                <strong>{t("TotalPrice")}:</strong>
                <span>{convertToVND(basketTotalPriceData)} đ</span>
                {basketData.length > 0 ? (
                  <Button
                    variant={"ghost"}
                    className="ml-auto px-1 h-6"
                    onClick={() => {
                      dispatch(clearBasket());
                    }}
                  >
                    {t("Clear")}
                  </Button>
                ) : null}
              </div>
              <SheetClose asChild>
                <Link className="w-full" href={"/basket"} lang={lang}>
                  <Button className="w-full text-yellow-300">
                    {t("Basket")}/{t("Checkout")}
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
};

export default Basket;
