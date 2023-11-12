"use client";
import { getListCateProduct } from "@/lib/api/server-side";
import { Breadcrumb } from "../../ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { TypeItemCategoryProduct, TypeOfCategory } from "@/lib/type";
import { notFound } from "next/navigation";
import { useTransClient } from "@/lib/i18n/client";
import { useEffect } from "react";

export const BreadcrumbProduct = ({
  lng,
  listCate,
  category,
  detailData,
  className,
}: {
  lng: Locale;
  listCate: TypeOfCategory["Product"];
  category?: string;
  detailData?: TypeItemCategoryProduct;
  className?: React.HTMLProps<HTMLElement>["className"];
}) => {
  const { t } = useTransClient(lng);
  const categoryData = listCate?.find((item) => {
    if (item.vnSlug === category || item.enSlug === category) {
      return item;
    }
  }) as TypeItemCategoryProduct;

  if (detailData && !categoryData) {
    notFound();
  }

  const defaultData = [
    {
      name: t("Product"),
      href: lng === "en" ? "/product" : "/san-pham",
    },
  ];
  categoryData
    ? defaultData.push({
        name: lng === "en" ? categoryData.en : categoryData.vn,
        href:
          lng === "en"
            ? "/product/" + categoryData.enSlug
            : "/san-pham/" + categoryData.vnSlug,
      })
    : defaultData;
  categoryData && detailData
    ? defaultData.push({
        name: lng === "en" ? detailData.en : detailData.vn,
        href:
          lng === "en"
            ? "/product/" + categoryData.enSlug + "/" + detailData.enSlug
            : "/san-pham/" + categoryData.vnSlug + "/" + detailData.vnSlug,
      })
    : defaultData;

  /**
   * jsonLD breadcrumb
   */
  useEffect(() => {
    if (document) {
      const script: HTMLElement =
        document.getElementById("breadcrumb-structured-data-script") !== null
          ? (document.getElementById(
              "breadcrumb-structured-data-script"
            ) as HTMLElement)
          : document.createElement("script");
      script.id = "breadcrumb-structured-data-script";
      script.setAttribute("type", "application/ld+json");
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: defaultData.map((item, idx) => {
          return {
            "@type": "ListItem",
            position: idx + 1,
            name: item.name,
            ...(defaultData.length - 1 === idx
              ? {}
              : {
                  item: ` ${
                    lng == "en"
                      ? "https://flameagricultural.com/en"
                      : "https://flameagricultural.com"
                  }${item.href}`,
                }),
          };
        }),
      });
      document.head.appendChild(script);
    }
    return () => {
      document?.getElementById("breadcrumb-structured-data-script")?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng]);
  return (
    <div className={className}>
      <Breadcrumb data={defaultData} />
    </div>
  );
};
