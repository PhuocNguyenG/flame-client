import BasketPage from "@/components/pages/basket";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang?: Locale };
}): Promise<Metadata> {
  return {
    title: lang === "en" ? "Basket" : "Giỏ hàng",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="container flex flex-col mb-5 h-full">
      <BasketPage lang={lang} />
    </div>
  );
}
