"use client";
import Link from "next/link";
import { listRoute } from "@/map-route";
import { useSelectedLayoutSegments } from "next/navigation";
import { RootState, store, useAppSelector } from "@/lib/redux/store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ViFlag from "@/assets/gif/vi-flag.gif";
import EnFlag from "@/assets/gif/en-flag.gif";

const SwitchLanguage = ({
  className,
}: {
  className?: React.HTMLProps<HTMLElement>["className"];
}) => {
  const urlSegments = useSelectedLayoutSegments();
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
      <div
        className={cn(
          "flex flex-col md:flex-row flex-wrap gap-3 h-fit w-fit justify-center",
          className
        )}
      >
        <Link
          href={`/${urlSegments
            .map((item) => {
              const routeTrans = listRouteTrans.find((rou) => {
                return rou.enSlug == item;
              })?.vnSlug;

              return routeTrans ? routeTrans : item;
            })
            .join("/")}`}
          className="flex flex-row justify-center items-center"
        >
          <Image
            src={ViFlag}
            width={40}
            height={30}
            className="min-w-[40px] h-auto pl-[1px]"
            alt="Nông sản Flame | Nông sản Việt"
            unoptimized
          />
        </Link>
        <Link
          href={`/en/${urlSegments
            .map((item) => {
              const routeTrans = listRouteTrans.find((rou) => {
                return rou.vnSlug == item;
              })?.enSlug;
              return routeTrans ? routeTrans : item;
            })
            .join("/")}`}
          className="flex flex-row justify-center items-center"
        >
          <Image
            src={EnFlag}
            width={40}
            height={30}
            className="min-w-[40px] h-auto pl-[1px]"
            alt="Flame Agricultural"
            unoptimized
          />
        </Link>
      </div>
    </>
  );
};

export default SwitchLanguage;
