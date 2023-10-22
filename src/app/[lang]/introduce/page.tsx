import ComingSoon from "@/components/coming-soon";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getIntroduce } from "@/lib/api/server-side";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import Image from "next/image";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const fetchData = await Promise.all([useTransServer(lang), getIntroduce()]);
  const { t } = fetchData[0];

  const data = fetchData[1];

  return (
    <div className="container mt-2">
      <Breadcrumb data={[{ name: t("Introduce"), href: "/introduce" }]} />

      <div className="container flex flex-wrap  gap-7 w-full m-[30px_0px_30px_0px]">
        <div className="flex items-center">
          <div>
            {lang == "en" ? (
              <div dangerouslySetInnerHTML={{ __html: data.en }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: data.vn }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
