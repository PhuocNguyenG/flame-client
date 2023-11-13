import React, { Suspense } from "react";
import { MainNavBar } from "./main-nav";
import { getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import dynamic from "next/dynamic";
const TopNav = dynamic(() => import("./top-nav"));

const NavBar = async ({ lang }: { lang: Locale }) => {
  const itemCate = getListCateProduct();
  const data = await Promise.all([itemCate]);

  return (
    <>
      <div className="max800:min-h-[50px] max800:bg-primary bg-white min-h-[112px]">
        <TopNav lang={lang} />
        <MainNavBar cateProduct={data[0].Product} cateExport={data[0].Export} />
      </div>
    </>
  );
};

export default NavBar;
