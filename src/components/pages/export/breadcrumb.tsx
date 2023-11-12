import { getListCateProduct } from "@/lib/api/server-side";
import { Breadcrumb } from "../../ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { TypeItemCategoryProduct } from "@/lib/type";
import { notFound } from "next/navigation";

export const BreadcrumbExport = async ({
  lng,
  category,
  detailData,
  className,
}: {
  lng: Locale;
  category?: string;
  detailData?: TypeItemCategoryProduct;
  className?: React.HTMLProps<HTMLElement>["className"];
}) => {
  const { t } = await useTransServer(lng);
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
      href: lng === "en" ? "/export" : "/xuat-khau",
    },
  ];
  categoryData
    ? defaultData.push({
        name: lng === "en" ? categoryData.en : categoryData.vn,
        href:
          lng === "en"
            ? "/export/" + categoryData.enSlug
            : "/xuat-khau/" + categoryData.vnSlug,
      })
    : defaultData;
  categoryData && detailData
    ? defaultData.push({
        name: lng === "en" ? detailData.en : detailData.vn,
        href:
          lng === "en"
            ? "/export/" + categoryData.enSlug + "/" + detailData.enSlug
            : "/xuat-khau/" + categoryData.vnSlug + "/" + detailData.vnSlug,
      })
    : defaultData;

  return (
    <div className={className}>
      <Breadcrumb data={defaultData} />
    </div>
  );
};
