"use client";
import { MinusIcon } from "@/components/icon/minus";
import { PlusIcon } from "@/components/icon/plus";
import { TrashIcon } from "@/components/icon/trash";
import Link from "@/components/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { QueryApiCity } from "@/lib/api/client-side";
import { useTransClient } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/setting";
import {
  clearBasket,
  removeFromBasket,
  selectBasket,
  selectBasketTotalPrice,
  updateQuantityBasketById,
} from "@/lib/redux/slice/basket";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { convertToVND } from "@/lib/utils";
import {
  ArchiveIcon,
  ChevronLeftIcon,
  FileTextIcon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

const BasketPage = ({ lang }: { lang: Locale }) => {
  const [isCheckout, setIsCheckout] = React.useState(false);
  const [addressState, setAddressState] = React.useState({
    city: "79",
    district: "",
    ward: "",
  });
  const { t } = useTransClient(lang);
  const dispatch = useAppDispatch();
  const { data } = QueryApiCity();

  const basket = useAppSelector(selectBasket);
  const basketData = useAppSelector(selectBasket).listItem;
  const basketTotalPriceData = useAppSelector(selectBasketTotalPrice);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  const paymentType = [
    {
      textTrans: "COD",
      codeType: "cod",
    },
    {
      textTrans: "ZALO",
      codeType: "zalopay",
    },
    {
      textTrans: "MOMO",
      codeType: "momo",
    },
    {
      textTrans: "LocalATM",
      codeType: "localatm",
    },
    {
      textTrans: "ATM",
      codeType: "atm",
    },
  ];
  React.useEffect(() => {
    if (ls && ls.getItem("addressReceive")) {
      setAddressState(JSON.parse(ls.getItem("addressReceive") || ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col w-full h-full transition-all duration-500 space-y-3 pr-2 pb-2">
      {isCheckout ? (
        <Button
          className="flex flex-row items-center w-fit mt-3"
          onClick={() => setIsCheckout(false)}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Quay lại giỏ hàng
        </Button>
      ) : (
        <Breadcrumb data={[{ name: t("Basket"), href: "/basket" }]} />
      )}
      <h3 className="w-full text-center text-2xl font-semibold ">
        {isCheckout ? t("Checkout") : t("Basket")}
      </h3>
      {basketData.length == 0 ? (
        <>
          <div>{t("NothingInBasket")}</div>
        </>
      ) : (
        <>
          <span className="mb-5 flex flex-row gap-2 items-center text-xl font-semibold border-b-2 w-fit border-primary">
            <FileTextIcon className="w-5 h-5" />
            <span>
              {" "}
              {t("ProductList")}({basketData.length})
            </span>
          </span>
          {basketData.map((item, idx) => {
            const name = lang === "en" ? item.en.name : item.vn.name;
            const href = lang === "en" ? item.en.slug : item.vn.slug;
            return (
              <div
                className="flex flex-row items-center h-auto w-full border-b border-primary/20 py-2"
                key={idx}
              >
                <div className="flex flex-row items-center min-h-[90px]">
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
                <div className="flex flex-row items-center justify-between w-full h-fit pl-3">
                  <div className="flex flex-col justify-between w-2/6">
                    <span className="line-clamp-2 capitalize font-medium leading-5 ">
                      {name}
                    </span>
                  </div>
                  <div className="flex flex-row w-full items-center justify-between gap-2 h-fit">
                    <div className="flex flex-col w-1/6 items-center">
                      <span className="font-medium">{t("UnitPrice")}</span>
                      <span className="whitespace-nowrap text-price font-medium ">
                        {convertToVND(item.price)} đ
                      </span>
                    </div>
                    <div className="flex flex-col items-center w-1/6 h-fit">
                      <span className="font-medium">{t("Quantity")}</span>
                      {isCheckout ? (
                        <span className="whitespace-nowrap text-price font-medium ">
                          {item.quantity}
                        </span>
                      ) : (
                        <div className="flex flex-row items-center border rounded-md border-primary/30 w-fit">
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
                              input.target.value = input.target.value.replace(
                                /\D/g,
                                ""
                              );
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
                      )}
                    </div>
                    <div className="flex flex-col w-1/6 border-l-2 pl-3 items-center">
                      <span className="font-medium ">{t("Total")}</span>
                      <span className="whitespace-nowrap text-price font-semibold ">
                        {convertToVND(item.price * item.quantity)} đ
                      </span>
                    </div>
                    {isCheckout ? null : (
                      <div className="w-1/6">
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
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
      <div className="flex flex-row justify-end">
        <div className="flex flex-col items-center gap-2">
          {basketData.length > 0 ? (
            <>
              {isCheckout ? null : (
                <>
                  <Button
                    variant={"ghost"}
                    className="ml-auto px-1 h-6"
                    onClick={() => {
                      dispatch(clearBasket());
                    }}
                  >
                    {t("Clear")}
                  </Button>

                  <div className="flex flex-row items-center gap-2">
                    <strong>{t("TotalPrice")}:</strong>
                    <span className="text-2xl text-price font-semibold">
                      {convertToVND(basketTotalPriceData)} đ
                    </span>
                  </div>

                  <Button
                    className="w-full max-w-[240px] text-yellow-300"
                    onClick={() => setIsCheckout(true)}
                  >
                    {t("Checkout")}
                  </Button>
                </>
              )}
            </>
          ) : null}
        </div>
      </div>
      {isCheckout && (
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex flex-col w-full md:w-2/3 gap-3">
            <div className="flex flex-row gap-2 items-center text-xl font-semibold border-b-2 w-fit border-primary">
              <PersonIcon className="w-5 h-5" />
              <h1> {t("UserOrderInfo")}</h1>
            </div>
            <div className="flex flex-row gap-3 ">
              <div className="grid w-1/2">
                <Label htmlFor="UserOrderName">
                  {t("UserOrderName")}&nbsp;*
                </Label>
                <Input id="UserOrderName" placeholder={t("Name")} />
              </div>
              <div className="grid w-1/2">
                <Label htmlFor="UserOrderPhone">
                  {t("UserOrderPhone")}&nbsp;*
                </Label>
                <Input id="UserOrderPhone" placeholder={t("Phone")} />
              </div>
            </div>
            <div className="grid w-full">
              <Label htmlFor="UserOrderEmail">
                {t("UserOrderEmail")}&nbsp;({t("NotRequired")})
              </Label>
              <Input id="UserOrderEmail" placeholder={t("Email")} />
            </div>
            <div className="flex flex-row gap-2 items-center text-xl font-semibold border-b-2 w-fit border-primary">
              <ArchiveIcon className="w-5 h-5" />
              <span>{t("ReceiveInfo")}</span>
            </div>
            <div className="flex gap-3">
              <div className="grid w-1/2">
                <Label htmlFor="UserReceiveName">
                  {t("UserReceiveName")}&nbsp;*
                </Label>
                <Input id="UserReceiveName" placeholder={t("Name")} />
              </div>
              <div className="grid w-1/2">
                <Label htmlFor="UserReceivePhone">
                  {t("UserReceivePhone")}&nbsp;*
                </Label>
                <Input id="UserReceivePhone" placeholder={t("Phone")} />
              </div>
            </div>
            <div className="grid">
              <Label>{t("Address")}&nbsp;*</Label>
              <div className="flex gap-3">
                <Select
                  defaultValue={addressState.city}
                  onValueChange={(value) => {
                    setAddressState({ ...addressState, city: value });
                    ls?.setItem(
                      "addressReceive",
                      JSON.stringify({ ...addressState, city: value })
                    );
                  }}
                >
                  <SelectTrigger className="w-1/2 ">
                    <SelectValue placeholder="Thành phố" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {data?.map((item) => {
                      return (
                        <SelectItem value={item.Id} key={item.Id}>
                          {item.Name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select
                  defaultValue={addressState.district}
                  onValueChange={(value) => {
                    setAddressState({ ...addressState, district: value });
                    ls?.setItem(
                      "addressReceive",
                      JSON.stringify({ ...addressState, district: value })
                    );
                  }}
                >
                  <SelectTrigger className="w-1/2 ">
                    <SelectValue placeholder="Quận/Huyện" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {data
                      ?.find((city) => city.Id === addressState.city)
                      ?.Districts.map((item) => {
                        return (
                          <SelectItem value={item.Id} key={item.Id}>
                            {item.Name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              </div>
              {data
                ?.find((city) => city.Id === addressState.city)
                ?.Districts.find(
                  (district) => district.Id === addressState.district
                )?.Wards && (
                <Select
                  defaultValue={addressState.ward}
                  onValueChange={(value) => {
                    setAddressState({ ...addressState, ward: value });
                    ls?.setItem(
                      "addressReceive",
                      JSON.stringify({ ...addressState, ward: value })
                    );
                  }}
                >
                  <SelectTrigger className="w-full mt-3">
                    <SelectValue placeholder="Phường" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {data
                      ?.find((city) => city.Id === addressState.city)
                      ?.Districts.find(
                        (district) => district.Id === addressState.district
                      )
                      ?.Wards.map((item) => {
                        return (
                          <SelectItem value={item.Id} key={item.Id}>
                            {item.Name}
                          </SelectItem>
                        );
                      })}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="grid w-full">
              <Label htmlFor="AddressReceiveDetail">
                {t("AddressReceiveDetail")}&nbsp;*
              </Label>
              <Input id="AddressReceiveDetail" />
            </div>
            <div className="grid w-full">
              <Label htmlFor="Note">{t("Note")}</Label>
              <Textarea id="Note" />
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/3 h-full gap-3 sticky  top-[60px]">
            <div className="flex flex-row gap-2 items-center text-xl font-semibold border-b-2 w-fit border-primary">
              <ReaderIcon className="w-5 h-5" />
              <span>{t("PaymentTypeInfo")}</span>
            </div>
            <div>
              <RadioGroup className="[&_a]:opacity-70 [&_a:has([data-state=checked])]:opacity-100 [&_label]:text-base [&_label]:leading-none [&_label]:font-semibold">
                {paymentType.map((item) => {
                  return (
                    <Label
                      htmlFor={item.codeType}
                      className=" flex gap-2 items-center p-2 hover:cursor-pointer hover:bg-gray-100 rounded-sm"
                      key={item.codeType}
                    >
                      <RadioGroupItem
                        value={item.codeType}
                        id={item.codeType}
                      />
                      {t(item.textTrans)}
                    </Label>
                  );
                })}
              </RadioGroup>
            </div>
            <div className="grid w-full p-2 gap-2 bg-logo/5 border rounded-sm">
              <div className="flex flex-row justify-between items-center">
                <span>Tổng giá:</span>
                <span>{convertToVND(basketTotalPriceData)} đ</span>
              </div>
              <div className="flex flex-row justify-between items-center">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <Separator />
              <div className="flex flex-row justify-between items-center text-lg font-semibold">
                <span>Thành tiền:</span>
                <span className="text-xl text-price">
                  {convertToVND(basketTotalPriceData)} đ
                </span>
              </div>

              <Button>Mua hàng</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketPage;
