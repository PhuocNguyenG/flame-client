import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import React from "react";
const SearchPage = dynamic(() => import("@/components/pages/search"));

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang?: Locale };
}): Promise<Metadata> {
  return {
    title: lang === "en" ? "Search result" : "Kết quả tìm kiếm",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <SearchPage lang={lang} />;
}
