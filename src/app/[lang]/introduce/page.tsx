import ComingSoon from "@/components/coming-soon";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { t } = await useTransServer(lang);
  return (
    <div className="container mt-2">
      <Breadcrumb data={[{ name: t("Introduce"), href: "/introduce" }]} />
      <ComingSoon />
      {/* <div className="container flex flex-wrap justify-center gap-7 w-full m-[30px_0px_30px_0px]">
            <div className="flex items-center max-w-[650px]">
              <div>
                {lang == "en"
                  ? 'en'
                  : 'vi'}
              </div>
            </div>
            <div className="rounded-lg shadow-[0px_0px_11px] w-[420px] h-fit">
              <img
                alt="VietNam's Agricultural by PhuocLinh | Nông sản Việt Nam bởi PhướcLinh"
                src={aboutUs.img}
                className="rounded-md"
              /> 
            </div>
          </div> */}
    </div>
  );
}
