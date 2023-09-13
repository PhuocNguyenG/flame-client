import React from "react";
import { MainNavBar } from "./main-nav";
import { getListCateExportProduct } from "@/lib/api/server-side";

const NavBar =  async (props: any) => {
  const itemNavExport = getListCateExportProduct();
 const data = await Promise.all([itemNavExport])
  return (
    <header
      className="sticky flex flex-row w-full h-[60px] border-b-[1px] bg-white drop-shadow-[0_5px_20px_rgba(0,0,0,.1)] top-0 z-10"
    >
      <MainNavBar itemExport={data[0]} />
    </header>
  );
};

export default NavBar;
