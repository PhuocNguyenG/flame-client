import ExportItem from "@/components/export/item-list";
import LayoutCategory from "@/components/export/layout-list";
import Loading from "@/components/export/loading-item-list";

import { Locale } from "@/lib/i18n/setting";
import { headers } from "next/headers";

import React, { Suspense } from "react";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return (
    <LayoutCategory lang={lang} pathname={pathname}>
      <Suspense fallback={<Loading />}>
        <ExportItem lang={lang} pathname={pathname} />
      </Suspense>
    </LayoutCategory>
  );
}
