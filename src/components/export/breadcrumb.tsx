import { getListCateExportProduct } from "@/lib/api/server-side";
import { Breadcrumb } from "../ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { ExportRouterResult } from "@/lib/type";
import { notFound } from "next/navigation";

export const BreadcrumbExport = async ({
  lang,
  category,
  detailData,
}: {
  lang: Locale;
  category?: string;
  detailData?: ExportRouterResult;
}) => {
  const { t } = await useTransServer(lang);
  const listCate = await getListCateExportProduct();
  const categoryData = listCate.find((item) => {
    if (item.vnSlug === category || item.enSlug === category) {
      return item;
    }
  }) as ExportRouterResult;
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

  if(detailData && !categoryData){
    notFound();
  }
  return (
    <>
      <Breadcrumb data={defaultData} />
    </>
  );
};
