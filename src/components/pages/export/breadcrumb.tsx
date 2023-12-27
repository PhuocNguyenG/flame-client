import { getListCateProduct } from "@/lib/api/server-side";
import { Breadcrumb } from "../../ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { ExportDetailResult, TypeItemCategoryProduct } from "@/lib/type/type";
import { redirect } from "next/navigation";

export const BreadcrumbExport = async ({
  lang,
  category,
  detailData,
  className,
}: {
  lang: Locale;
  category?: string;
  detailData?: ExportDetailResult;
  className?: React.HTMLProps<HTMLElement>["className"];
}) => {
  const { t } = await useTransServer(lang);
  const listCate = (await getListCateProduct()).Export;
  const categoryData = listCate.find((item) => {
    if (item.vnSlug === category || item.enSlug === category) {
      return item;
    }
  }) as TypeItemCategoryProduct;

  const defaultData = [
    {
      name: t("Export"),
      href: lang === "en" ? "/export" : "/xuat-khau",
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
            ? "/export/" + categoryData.enSlug
            : "/xuat-khau/" + categoryData.vnSlug,
      })
    : defaultData;
  categoryData && detailData
    ? defaultData.push({
        name: lang === "en" ? detailData.en.name : detailData.vn.name,
        href: lang === "en" ? detailData.en.slug : detailData.vn.slug,
      })
    : defaultData;

  return (
    <div className={className}>
      <Breadcrumb data={defaultData} />
    </div>
  );
};
