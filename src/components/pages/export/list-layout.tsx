import { BreadcrumbExport } from "./breadcrumb";
import { Locale } from "@/lib/i18n/setting";
import { LeftFilterExport } from "./left-filter";
import { useTransServer } from "@/lib/i18n/server";

export default async function LayoutCategory({
  children,
  lng,
  category = "all",
}: {
  children: React.ReactNode;
  lng: Locale;
  category?: string;
}) {
  const { t } = await useTransServer(lng);

  return (
    <>
      <div className="flex flex-col w-full h-full bg-background-body pb-5">
        <div className="container flex flex-col w-full h-fit ">
          <BreadcrumbExport lng={lng} category={category} />

          <div className="flex flex-row w-full flex-wrap min801:flex-nowrap h-full gap-5">
            <div className="!sticky top-[60px] min-w-[200px] h-fit hidden min801:block ">
              <LeftFilterExport category={category} lng={lng} />
            </div>
            <section className="w-full">
              <h2 className="mb-5 text-xl font-bold leading-none tracking-tight text-gray-900 ">
                {t("ExportProduct")}
              </h2>
              <div className="w-full">{children}</div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
