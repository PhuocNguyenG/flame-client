import ProductItem from "@/components/product/list-item";
import LayoutProductCategory from "@/components/product/list-layout";
import Loading from "@/components/loading/loading-item-list";
import { Locale } from "@/lib/i18n/setting";
import React, { Suspense } from "react";

export default function ProductByCate({
  params: { lang,  },
}: {
  params: { lang: Locale; };
}) {
  return (
    <LayoutProductCategory lang={lang} category={"all"}>
      <ProductItem lang={lang} category={"all"} />
    </LayoutProductCategory>
  );
}
