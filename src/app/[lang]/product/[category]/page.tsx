import ProductItem from "@/components/product/item-list";
import LayoutProductCategory from "@/components/product/layout-list";
import Loading from "@/components/product/loading-item-list";
import { Locale } from "@/lib/i18n/setting";
import { headers } from "next/headers";
import React, { Suspense } from "react";

export default function ProductByCate({
  params: { lang, category },
}: {
  params: { lang: Locale; category: string };
}) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return (
    <LayoutProductCategory lang={lang} pathname={pathname} category={category}>
      <Suspense fallback={<Loading />}>
        <ProductItem lang={lang} pathname={pathname} category={category} />
      </Suspense>
    </LayoutProductCategory>
  );
}
