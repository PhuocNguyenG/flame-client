import SearchPage from "@/components/pages/search";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import React from "react";

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
