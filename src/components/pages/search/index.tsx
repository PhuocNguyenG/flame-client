import { Locale } from "@/lib/i18n/setting";
import { getListCateProduct } from "@/lib/api/server-side";
import SearchItem from "./list-item";

export default async function SearchPage({ lang }: { lang: Locale }) {
  const fetchCategory = getListCateProduct();
  const fetchData = await Promise.all([fetchCategory]);
  const dataCategory = fetchData[0].Product;

  return (
    <>
      <div className="flex flex-col w-full h-full bg-background-body py-5">
        <div className="container flex flex-col w-full h-fit ">
          <SearchItem categories={dataCategory} lang={lang} />
        </div>
      </div>
    </>
  );
}
