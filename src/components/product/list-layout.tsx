import { BannerProduct } from "./banner";
import { BreadcrumbProduct } from "./breadcrumb";
import { Locale } from "@/lib/i18n/setting";
import { LeftFilterProduct } from "./left-filter";
import { useTransServer } from "@/lib/i18n/server";

export default async function LayoutProductCategory({
  children,
  lang,
  category,
}: {
  children: React.ReactNode;
  lang: Locale;
  category: string;
}) {
  const { t } = await useTransServer(lang);

  return (
    <>
      <div className="flex flex-col w-full h-full bg-background-body pb-5">
        <div className="container flex flex-col w-full h-fit ">
          <BreadcrumbProduct lang={lang} category={category} />

          <div className="flex flex-row w-full flex-wrap min-[890px]:flex-nowrap h-full gap-5">
            <div className="!sticky top-[60px] min-w-[200px] h-fit hidden md:block ">
              <LeftFilterProduct
                category={category}
                lang={lang}
              />
            </div>
            <section className="w-full">
              <h2 className="mb-5 text-2xl font-bold leading-none tracking-tight text-gray-900 ">
                {t("ProductList")}
              </h2>
              <div className="w-full">{children}</div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
