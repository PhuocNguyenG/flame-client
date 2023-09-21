import { Locale } from "@/lib/i18n/setting";
import Link from "../link";
import {
  getAllExportProduct,
  getListCateExportProduct,
} from "@/lib/api/server-side";
import Image from "next/image";
import { RootState, store } from "@/lib/redux/store";
import { setSlugExportTrans } from "@/lib/redux/slice/router";

export default async function ExportItem({
  lang,
  pathname,
  category = "all",
}: {
  lang: Locale;
  pathname: string;
  category?: string;
}) {
  const fetchCategory =  getListCateExportProduct();
  const fetchAllProduct =  getAllExportProduct();
  const fetchData = await Promise.all([fetchCategory,fetchAllProduct])

  const dataCategory = fetchData[0];
  const product = fetchData[1];

  const cateSearch = dataCategory.find((item) => {
    if (item.vnSlug === category || item.enSlug === category) {
      return item;
    }
  })?.enSlug;

  
  const result =
    category !== "all"
      ? product.filter((item) => item.productType === cateSearch)
      : product;

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,300px)] list-none p-0 m-0 items-center justify-around ">
        {result?.map((item, idx) => {
          const detail = lang === "en" ? item.en : item.vn;
          const cate = dataCategory.find(
            (cate) => cate.enSlug === item.productType
          );
          const href =
            lang === "en"
              ? "/export/" + cate?.enSlug + "/" + item.enSlug
              : "/xuat-khau/" + cate?.vnSlug + "/" + item.vnSlug;
          return (
            <li className="flex p-[0px_8px_25px_8px] h-[340px] w-[300px]" key={idx}>
              <Link href={href} pathName={pathname} className="w-full h-full">
                <div className="bg-white rounded-md shadow-md hover:shadow-[0px_9px_16px_3px_#32323233] flex flex-col overflow-hidden w-full h-full border border-[#87000029] hover:cursor-pointer transition-all duration-500 group">
                  <div className="w-full min-h-[240px] max-h-[240px] p-3 rounded-md">
                    <Image
                      loading="eager"
                      src={item.banner}
                      alt=""
                      className="w-full h-full object-contain rounded-md group-hover:scale-105 duration-500"
                      width={100}
                      height={230}
                    />
                    
                  </div>
                  <div className="flex-1 p-2 text-secondary">
                    <h2 className="text-lg font-bold tracking-wide capitalize m-0">
                      {detail.name}
                    </h2>
                    <p className=" text-sm leading-tight font-normal">
                      {detail.origin}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
