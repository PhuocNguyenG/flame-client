import React from "react";
import { MainNavBar } from "./main-nav";
import { getListCateExportProduct } from "@/lib/api/server-side";
import { RootState, store } from "@/lib/redux/store";
import { setCategoryExportTrans } from "@/lib/redux/slice/router";

const NavBar = async ({ children }: { children: React.ReactNode }) => {
  const itemNavExport = await getListCateExportProduct();
  const data = await Promise.all([itemNavExport]);
  store.dispatch(
    setCategoryExportTrans(
      data[0] as RootState["router"]["categoryExportTrans"]
    )
  );

  const slugExportTransDynamic = store.getState().router.slugExportTrans;

  return (
    <>
      <header className="sticky flex flex-row w-full h-[60px] border-b-[1px] bg-white drop-shadow-[0_5px_20px_rgba(0,0,0,.1)] top-0 z-10">
        <MainNavBar
          cateExport={data[0]}
          slugExport={slugExportTransDynamic}
        />
      </header>

      {children}
    </>
  );
};

export default NavBar;
