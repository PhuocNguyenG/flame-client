import { BannerExport } from "./banner";
import { BreadcrumbExport } from "./breadcrumb";
import { Locale } from "@/lib/i18n/setting";
import { LeftFilterExport } from "./left-filter";
import { useTransServer } from "@/lib/i18n/server";

export default async function LayoutCategory({
  children,
  lang,
  pathname,
  category = "all",
}: {
  children: React.ReactNode;
  lang: Locale;
  pathname: string;
  category?: string;
}) {
  const { t } = await useTransServer(lang);

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <BannerExport />
        <div className="flex flex-col w-full h-fit  ">
          <BreadcrumbExport lang={lang} category={category} />

          <h2 className="mb-5 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl text-center ml-0 min-[850px]:ml-[180px] ">
            {t("ExportProduct")}
          </h2>
          <div className="flex flex-row w-full h-full">
            <div className="!sticky top-[70px] min-w-[180px] h-full hidden min-[850px]:block ">
              <LeftFilterExport
                category={category}
                lang={lang}
                pathname={pathname}
              />
            </div>
            <section className="w-full h-full pl-3">{children}</section>
          </div>
        </div>
      </div>
    </>
  );
}
