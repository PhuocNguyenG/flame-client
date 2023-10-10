import { BannerExport } from "@/components/export/banner";
import { Locale } from "@/lib/i18n/setting";

export default function Layout({
  lang,
  pathname,
  category,
  slug,
  children,
}: {
  lang: Locale;
  pathname: string;
  category: string;
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-col w-full h-full">
        <BannerExport />
        <div className="flex flex-col w-full h-fit  ">{children}</div>
      </div>
    </>
  );
}
