import { getListCateProduct } from "@/lib/api/server-side";
import { Breadcrumb } from "../ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { TypeItemCategoryProduct } from "@/lib/type";
import { notFound } from "next/navigation";

export const BreadcrumbExport = async ({
  lang,
  category,
  detailData,
}: {
  lang: Locale;
  category?: string;
  detailData?: TypeItemCategoryProduct;
}) => {
  const { t } = await useTransServer(lang);
  const listCate = (await getListCateProduct()).Export;
  const categoryData = listCate.find((item) => {
    if (item.vnSlug === category || item.enSlug === category) {
      return item;
    }
  }) as TypeItemCategoryProduct;

  if (detailData && !categoryData) {
    notFound();
  }

  const defaultData = [
    {
      name: t("Export"),
      href: lang === "en" ? "/export" : "/xuat-khau",
    },
  ];
  categoryData
    ? defaultData.push({
        name: lang === "en" ? categoryData.en : categoryData.vn,
        href:
          lang === "en"
            ? "/export/" + categoryData.enSlug
            : "/xuat-khau/" + categoryData.vnSlug,
      })
    : defaultData;
  categoryData && detailData
    ? defaultData.push({
        name: lang === "en" ? detailData.en : detailData.vn,
        href:
          lang === "en"
            ? "/export/" + categoryData.enSlug + "/" + detailData.enSlug
            : "/xuat-khau/" + categoryData.vnSlug + "/" + detailData.vnSlug,
      })
    : defaultData;

  return (
    <>
      <Breadcrumb data={defaultData} />
    </>
  );
};
