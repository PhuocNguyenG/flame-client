import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getIntroduce } from "@/lib/api/server-side";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lng },
}: {
  params: { lng?: Locale };
}): Promise<Metadata> {
  const data = await getIntroduce();

  return {
    title: lng === "en" ? "Introduce" : "Giới thiệu",
    description: lng === "en" ? data.en : data.vn,
    keywords: ["gioi thieu flame", "introduce"],
    robots: {
      follow: true,
      index: true,
    },
    openGraph: {
      title: lng === "en" ? "Introduce" : "Giới thiệu",
      description: lng === "en" ? data.en : data.vn,
      images: "https://cdn.flameagricultural.com/flame-simple.png",
      url:
        lng === "en"
          ? "https://flameagricultural.com/en/introduce"
          : "https://flameagricultural.com/gioi-thieu",
      siteName: lng === "en" ? "Flame agricultural" : "Nông sản Flame",
      locale: lng === "en" ? "en_US" : "vi_VN",
      type: "article",
    },
  };
}

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const fetchData = await Promise.all([useTransServer(lng), getIntroduce()]);
  const { t } = fetchData[0];

  const data = fetchData[1];

  return (
    <div className="container mt-2">
      <Breadcrumb data={[{ name: t("Introduce"), href: "/introduce" }]} />

      <div className="container flex flex-wrap  gap-7 w-full m-[30px_0px_30px_0px]">
        <div className="flex items-center">
          {lng == "en" ? (
            <div dangerouslySetInnerHTML={{ __html: data.en }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: data.vn }} />
          )}
        </div>
      </div>
    </div>
  );
}