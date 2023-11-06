import React, { Suspense } from "react";
import { MainNavBar } from "./main-nav";
import { getListCateProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";

const NavBar = async ({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) => {
  const itemCate = getListCateProduct();
  const data = await Promise.all([itemCate]);

  return (
    <>
      <Suspense>
        <MainNavBar cateProduct={data[0].Product} cateExport={data[0].Export} />
      </Suspense>
      {children}
    </>
  );
};

export default NavBar;
