"use client"
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { Locale } from "@/lib/i18n/setting";
import { listRoute } from "@/map-route";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { RootState, useAppSelector } from "@/lib/redux/store";
const SwitchLanguage = ({slugExportTrans}: {slugExportTrans:any}) => {
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();
  const lang = params.lang as Locale;
  const categoryExportTransDynamic = useAppSelector(
    (state: RootState) => state.router.categoryExportTrans
  );

  return (
    <>
      <Link
        href={
          lang === "vi"
            ? "/en/" +
              urlSegments
                .map((item) => {
                  const routeTrans = listRoute
                    .concat(categoryExportTransDynamic)
                    .concat(slugExportTrans)
                    .find((rou) => {
                      return rou.vnSlug == item;
                    })?.enSlug;

                  return routeTrans ? routeTrans : item;
                })
                .join("/")
            : "/" +
              urlSegments
                .map((item) => {
                  const routeTrans = listRoute
                    .concat(categoryExportTransDynamic)
                    .concat(slugExportTrans)
                    .find((rou) => {
                      return rou.enSlug == item;
                    })?.vnSlug;

                  return routeTrans ? routeTrans : item;
                })
                .join("/")
        }
      >
        {lang === "vi" ? "EN" : "VI"}
      </Link>
    </>
  );
};

export default SwitchLanguage;
