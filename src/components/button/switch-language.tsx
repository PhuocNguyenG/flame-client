"use client";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import Link from "next/link";
import { Locale } from "@/lib/i18n/setting";
import { listRoute } from "@/map-route";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import { RootState, store, useAppSelector } from "@/lib/redux/store";
import { GlobeIcon, TriangleDownIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
const SwitchLanguage = () => {
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();
  const lang = params.lang as Locale;
  const slugCategoryTransDynamic = useAppSelector(
    (state: RootState) => state.router.slugCategoriesTrans
  );
  const slugDetailTransDynamic = useAppSelector(
    (state: RootState) => state.router.slugProductDetailTrans
  );
  const listRouteTrans = listRoute
    .concat(slugCategoryTransDynamic)
    .concat(slugDetailTransDynamic);

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap gap-3 h-fit w-fit justify-center">
        <Link
          href={
            "/" +
            urlSegments
              .map((item) => {
                const routeTrans = listRouteTrans.find((rou) => {
                  return rou.enSlug == item;
                })?.vnSlug;

                return routeTrans ? routeTrans : item;
              })
              .join("/")
          }
          className="flex flex-row justify-center items-center"
        >
          <Image
            src={
              "https://res.cloudinary.com/flame-media/image/upload/v1696660624/dev/gif/g38opy7jqwm9ojrm1tlr.gif"
            }
            width={40}
            height={30}
            className="min-w-[40px] h-auto pl-[1px]"
            alt="vi"
          />
        </Link>
        <Link
          href={
            "/en/" +
            urlSegments
              .map((item) => {
                const routeTrans = listRouteTrans.find((rou) => {
                  return rou.vnSlug == item;
                })?.enSlug;

                return routeTrans ? routeTrans : item;
              })
              .join("/")
          }
          className="flex flex-row justify-center items-center"
        >
          <Image
            src={
              "https://res.cloudinary.com/flame-media/image/upload/v1696660625/dev/gif/ek7affoa6zu5korzc9tj.gif"
            }
            width={40}
            height={30}
            className="min-w-[40px] h-auto pl-[1px]"
            alt="en"
          />
        </Link>
      </div>
    </>
  );
};

export default SwitchLanguage;
