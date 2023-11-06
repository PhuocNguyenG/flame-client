import Carousel from "@/components/pages/home/carousel";
import { FeaturedSection } from "@/components/pages/home/section-featured";
import { ProductByCate } from "@/components/pages/home/section-product";
import { Locale } from "@/lib/i18n/setting";

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
