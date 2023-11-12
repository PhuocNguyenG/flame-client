import { Locale } from "@/lib/i18n/setting";

export const FeaturedSection = ({ lng }: { lng: Locale }) => {
  return (
    <>
      <div className="flex flex-col w-full h-fit">
        <div> featured product</div>
        <div> list product</div>
      </div>
    </>
  );
};
