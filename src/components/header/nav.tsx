import React from "react";
import { MainNavBar } from "./main-nav";
import { getListCateProduct } from "@/lib/api/server-side";

const NavBar = async ({ children }: { children: React.ReactNode }) => {
  const itemCate = getListCateProduct();
  const data = await Promise.all([itemCate]);

  return (
    <>
      <MainNavBar cateProduct={data[0].Product} cateExport={data[0].Export} />
      {children}
    </>
  );
};

export default NavBar;
