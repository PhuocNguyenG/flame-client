import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getIntroduce } from "@/lib/api/server-side";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang?: Locale };
}): Promise<Metadata> {
  const data = await getIntroduce();

  return {
    title: lang === "en" ? "Introduce" : "Giới thiệu",
    description:
      lang === "en"
        ? data.en.replace(/<[^>]+>/g, "")
        : data.vn.replace(/<[^>]+>/g, ""),
    keywords: ["gioi thieu flame", "introduce"],
    openGraph: {
      title: lang === "en" ? "Introduce" : "Giới thiệu",
      description:
        lang === "en"
          ? data.en.replace(/<[^>]+>/g, "")
          : data.vn.replace(/<[^>]+>/g, ""),
      images: "https://flameagricultural.com/static/flame-logo-simple.png",
      url:
        lang === "en"
          ? "https://flameagricultural.com/en/introduce"
          : "https://flameagricultural.com/gioi-thieu",
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
          {lang == "en" ? (
            <div dangerouslySetInnerHTML={{ __html: data.en }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data.vn }} />
          )}
        </div>
      </div>
    </div>
  );
}
