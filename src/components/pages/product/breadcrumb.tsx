"use client";
import { getListCateProduct } from "@/lib/api/server-side";
import { Breadcrumb } from "../../ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { TypeItemCategoryProduct, TypeOfCategory } from "@/lib/type";
import { useTransClient } from "@/lib/i18n/client";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export const BreadcrumbProduct = ({
  lang,
  listCate,
  category,
  detailData,
  className,
}: {
  lang: Locale;
  listCate: TypeOfCategory["Product"];
  category?: string;
  detailData?: TypeItemCategoryProduct;
  className?: React.HTMLProps<HTMLElement>["className"];
}) => {
  const { t } = useTransClient(lang);
  const categoryData = listCate?.find((item) => {
    if (item.vnSlug === category || item.enSlug === category) {
      return item;
    }
  }) as TypeItemCategoryProduct;

  const defaultData = [
    {
      name: t("Product"),
      href: lang === "en" ? "/product" : "/san-pham",
    },
  ];

  if (detailData && !categoryData) {
    redirect(`/${lang}`);
  }

  categoryData
    ? defaultData.push({
        name: lang === "en" ? categoryData.en : categoryData.vn,
        href:
          lang === "en"
            ? "/product/" + categoryData.enSlug
            : "/san-pham/" + categoryData.vnSlug,
      })
    : defaultData;
  categoryData && detailData
    ? defaultData.push({
        name: lang === "en" ? detailData.en : detailData.vn,
        href:
          lang === "en"
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
                    lang == "en"
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
  }, [lang]);
  return (
    <div className={className}>
      <Breadcrumb data={defaultData} />
    </div>
  );
};
