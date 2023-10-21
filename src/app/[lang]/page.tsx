import Carousel from "@/components/home/carousel";
import { FeaturedSection } from "@/components/home/section-featured";
import { ProductByCate } from "@/components/home/section-product";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  return {
    title:
      lang === "en"
        ? "Flame | Agricultural products, import and export"
        : "Flame | Sản phẩm nông sản và xuất nhập khẩu",
    description:
      lang === "en"
        ? "Flame agricultural is a brand created by PHUOC LINH Import Export Co., Ltd., specializing in providing agricultural products and also exporting them worldwide."
        : "Nông sản Flame là thương hiệu được tạo bởi Công ty TNHH Xuất Nhập Khẩu PHƯỚC LINH, chuyên cung cấp các mặt hàng về nông sản và cũng xuất khẩu đi toàn thế giới.",
    openGraph: {
      url:
        lang === "en"
          ? "https://flameagricultural.com/en"
          : "https://flameagricultural.com",
      siteName: lang === "en" ? "Flame agricultural" : "Nông sản Flame",
      locale: lang === "en" ? "en_US" : "vi_VN",
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
      <Carousel />
      <div className="container mt-5">
        {/* <FeaturedSection lang={lang}/> */}
        <ProductByCate lang={lang} />
      </div>
    </div>
  );
}
