import ComingSoon from "@/components/coming-soon";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getIntroduce } from "@/lib/api/server-side";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang?: Locale };
}): Promise<Metadata> {
  const data = await getIntroduce();

  return {
    title: lang === "en" ? "Introduce" : "Giới thiệu",
    description: lang === "en" ? data.en : data.vn,
    keywords: ["gioi thieu flame", "introduce"],
    robots: {
      follow: true,
      index: true,
    },
    openGraph: {
      title: lang === "en" ? "Introduce" : "Giới thiệu",
      description:lang === "en" ? data.en : data.vn,
      images: "https://cdn.flameagricultural.com/flame-simple.png",
      url:
        lang === "en"
          ? "https://flameagricultural.com/en/introduce"
          : "https://flameagricultural.com/gioi-thieu",
      siteName: lang === "en" ? "Flame agricultural" : "Nông sản Flame",
      locale: lang === "en" ? "en_US" : "vi_VN",
      type: "article",
    },
  };
}

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
