import { BreadcrumbProduct } from "./breadcrumb";
import { Locale } from "@/lib/i18n/setting";
import { LeftFilterProduct } from "./left-filter";
import { useTransServer } from "@/lib/i18n/server";
import { getListCateProduct } from "@/lib/api/server-side";

export default async function LayoutProductCategory({
  children,
  lng,
  category,
}: {
  children: React.ReactNode;
  lng: Locale;
  category: string;
}) {
  const fetchCategory = getListCateProduct();
  const transText = useTransServer(lng);
  const fetchData = await Promise.all([fetchCategory, transText]);

  const dataCategory = fetchData[0].Product;
  const { t } = fetchData[1];

  return (
    <>
      <div className="flex flex-col w-full h-full bg-background-body pb-5">
        <div className="container flex flex-col w-full h-fit ">
          <BreadcrumbProduct
            lng={lng}
            listCate={dataCategory}
            category={category}
          />

          <div className="flex flex-row w-full flex-wrap min801:flex-nowrap h-full gap-5">
            <div className="!sticky top-[60px] min-w-[200px] h-fit hidden min801:block ">
              <LeftFilterProduct category={category} lng={lng} />
            </div>
            <section className="w-full">
              <span className="mb-5 text-xl font-bold leading-none tracking-tight text-gray-900 ">
                {t("ProductList")}
              </span>
              <div className="w-full">{children}</div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
