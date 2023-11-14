"use client";
import Link from "next/link";
import { listRoute } from "@/map-route";
import { useSelectedLayoutSegments } from "next/navigation";
import { RootState, store, useAppSelector } from "@/lib/redux/store";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ViFlag from "@/assets/gif/vi-flag.gif";
import EnFlag from "@/assets/gif/en-flag.gif";

const placeHolderFlag = {
  vi: "png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqUlEQVR4nOWUsQrCMBCGM/dVOlxqSNCK4Iv4UoKCio/jli1JR4eOJq4OgvySuEs1gQ49+ODnAh+5I4Sx6ZUWojJE6xJoISrmiGpDhBI4onocoW0+FBNeN7NEMWE4KYSjyhNayREOCo/LHK++TcQce/HsrxvahnA/K8AvEzF/26UbMrLfSTzdIhFz9g79XqJbcXQt4baVMDxHyAf2aOyHbX4R6tKfA5tcvQEX2z86x8IlXgAAAABJRU5ErkJggg==",
  en: "png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAACSklEQVR4nO2U208TQRTG9//x0cQXH6A+eHtRiiKXkICammq1XGK8RVATGxJRtAl4ia3Rh9aQxkbSQqtY6b2ljSJSRSu9IG1Tu1tdoV1hu/uZWdIKhtgHfNOT/JLJnJlvcuZ8MxT1PzYdtgHz/rhv+kc0xhYH7r5N1cotkZq6X4zYk/TCyVMCgYzX5ghtamd0+vHzwrzimPDs2hM5ZRmytH5pbwV7Zwgix+FNhEGb2oWaOqvEhC+DbHODBBmX53cessGgD4Hu7QGtVoFPJmF8GttHyerHtly4GkRG/wjZpoMovhhHqSTCZIljT7N9Q8GzVwJIGc3ItjSiMGqFIIowjyWg7A5slQTJol2NNhh0QdCXesCc7kIpnUaO4fA++q0i6Atn4TS4kFMcwdc+DcSlJXyMsVCe8UoHES1Ke292Bzm5TGgqh7w/BM7rAQQBJMqCQpED99IBPjYHnhcQjbOVfQSiRTn6jQpyh38iXbtdoto6R79R8fcFtWtKdvozmEt8hyCIWI7MgHO7IPB8peTlldUrQKkk5ZjgK0y+zq0vudyUjosBJD4vQmAY5C/3glYpMTEcgHcyu67L5zQhZHMcSqkFMF0doLs7MWIIY3eTbbUpqvO+bQ5PWmoAsQCxQuyhqdK5jWyzt8Uu2YpUwrldUi59+z5uDYZlFDHjyrsIckfbwVy/AZ1uCrL60arGJhzudGNmNg+xWACrvQmHRn+cGu8bPjCvPCH4TZ7FBoXjw+9Pq9rTk8mtkcEHkfSnOFs0muO1m/8MqH8+fgL8nq2X7t11sAAAAABJRU5ErkJggg==",
};

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
            priority
            loading="eager"
            src={ViFlag}
            placeholder={`data:image/${placeHolderFlag.vi}`}
            width={40}
            height={30}
            className="min-w-[40px] h-auto pl-[1px]"
            alt="Nông sản Flame"
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
            priority
            loading="eager"
            src={EnFlag}
            placeholder={`data:image/${placeHolderFlag.vi}`}
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
