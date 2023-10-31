import ExportItem from "@/components/pages/export/list-item";
import LayoutCategory from "@/components/pages/export/list-layout";
import { Locale } from "@/lib/i18n/setting";
import React, { Suspense } from "react";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <LayoutCategory lang={lang}>
      <ExportItem lang={lang} />
    </LayoutCategory>
  );
}
