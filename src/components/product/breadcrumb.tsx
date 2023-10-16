import { getListCateProduct } from "@/lib/api/server-side";
import { Breadcrumb } from "../ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { TypeItemCategoryProduct } from "@/lib/type";
import { notFound } from "next/navigation";

export const BreadcrumbProduct = async ({
  lang,
  category,
  detailData,
  className
}: {
  lang: Locale;
  category?: string;
  detailData?: TypeItemCategoryProduct;
  className?:React.HTMLProps<HTMLElement>["className"]
}) => {
  const { t } = await useTransServer(lang);
  const listCate = (await getListCateProduct()).Product;
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
      href: lang === "en" ? "/product" : "/san-pham",
    },
  ];
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

  return (
    <div className={className}>
      <Breadcrumb data={defaultData} />
    </div>
  );
};
