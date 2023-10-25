import Carousel from "@/components/home/carousel";
import { FeaturedSection } from "@/components/home/section-featured";
import { ProductByCate } from "@/components/home/section-product";
import { Locale } from "@/lib/i18n/setting";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name:
      lang === "en"
        ? "Flame Agricultural | Vietnamese agricultural products"
        : "Nông sản Flame",
    image: "https://cdn.flameagricultural.com/Flame%20logo-1.png",
    description:
      lang === "en"
        ? "Flame agricultural is a brand created by PHUOC LINH Import Export Co., Ltd., specializing in providing agricultural products domestically and internationally."
        : "Nông sản Flame là thương hiệu được tạo bởi Công ty TNHH Xuất Nhập Khẩu PHƯỚC LINH, chuyên cung cấp các sản phẩm về nông sản, xuất nhập khẩu trong và ngoài nước.",
  };
  return (
    <div className="min-h-[1000px] mx-auto">
      <Carousel />
      <div className="container mt-5">
        {/* <FeaturedSection lang={lang}/> */}
        <ProductByCate lang={lang} />
      </div>
      <script
        id="Trang chủ | Flame"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
