import SearchPage from "@/components/pages/search";
import { Locale } from "@/lib/i18n/setting";
import React from "react";

export const dynamic = "force-dynamic";

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return <SearchPage lang={lang} />;
}
