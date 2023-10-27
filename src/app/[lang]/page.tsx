import Carousel from "@/components/home/carousel";
import { FeaturedSection } from "@/components/home/section-featured";
import { ProductByCate } from "@/components/home/section-product";
import { Locale } from "@/lib/i18n/setting";

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
