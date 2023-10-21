import Carousel from "@/components/home/carousel";
import { FeaturedSection } from "@/components/home/section-featured";
import { ProductByCate } from "@/components/home/section-product";
import { Locale } from "@/lib/i18n/setting";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return lang === "en"
    ? {
        title: "Flame | Agricultural products, import and export",
        description:
          "Flame agricultural is a brand created by PHUOC LINH Import Export Co., Ltd., specializing in providing agricultural products and also exporting them worldwide.",
      }
    : {
        title: "Flame | Sản phẩm nông sản và xuất nhập khẩu",
        description:
          "Nông sản Flame là thương hiệu được tạo bởi Công ty TNHH Xuất Nhập Khẩu PHƯỚC LINH, chuyên cung cấp các mặt hàng về nông sản và cũng xuất khẩu đi toàn thế giới.",
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
