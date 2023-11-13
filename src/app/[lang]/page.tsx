import Carousel from "@/components/pages/home/carousel";
import { FeaturedSection } from "@/components/pages/home/section-featured";
import { ProductByCate } from "@/components/pages/home/section-product";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang?: Locale };
}): Promise<Metadata> {
  return {
    title:
      lang === "en"
        ? "Flame Agricultural - Agricultural product distribution, import and export."
        : "Nông sản Flame - Phân phối sản phẩm nông sản và xuất nhập khẩu.",
    description:
      lang === "en"
        ? "Flame agricultural is a supplier of agricultural products, imported and exported around the world."
        : "Nông sản Flame là đơn vị cung cấp các sản phẩm về nông sản, xuất nhập khẩu đi thế giới.",
    openGraph: {
      title:
        lang === "en"
          ? "Flame Agricultural - Agricultural product distribution, import and export."
          : "Nông sản Flame - Phân phối sản phẩm nông sản và xuất nhập khẩu.",
      description:
        lang === "en"
          ? "Flame agricultural is a supplier of agricultural products, imported and exported around the world."
          : "Nông sản Flame là đơn vị cung cấp các sản phẩm về nông sản, xuất nhập khẩu đi thế giới.",
      images: "https://flameagricultural.com/static/flame-logo-simple.png",
      url:
        lang === "en"
          ? "https://flameagricultural.com/en"
          : "https://flameagricultural.com",
      type: "website",
    },
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="min-h-[1000px] mx-auto">
      {/* <Carousel /> */}
      <div className="container mt-5">
        {/* <FeaturedSection lang={lang}/> */}
        <ProductByCate lang={lang} />
      </div>
    </div>
  );
}
