import { Locale } from "@/lib/i18n/setting";
import Link from "../link";
import { ExportRouterResult } from "@/lib/type";
import { useTransServer } from "@/lib/i18n/server";
import { Button } from "../ui/button";
import { getListCateExportProduct } from "@/lib/api/server-side";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export const LeftFilterExport = async ({
  lang,
  pathname,
  category,
}: {
  lang: Locale;
  pathname: string;
  category: string;
}) => {
  const categoryData = await getListCateExportProduct();
  const { t } = await useTransServer(lang);

  return (
    <>
      <div className="flex flex-col border border-border rounded-md bg-slate-50 [&>*]:p-2 ">
        <div className="font-bold bg-main pb-0 rounded-t-md">
          {t("CategoriesFilter")}
        </div>
        <RadioGroup
          defaultValue={category}
          className=" [&_a]:opacity-70 [&_a:has([data-state=checked])]:opacity-100 [&_label]:text-[15px]"
        >
          <div className="flex items-center">
            <Link
              href={lang === "en" ? "/export" : "/xuat-khau"}
              pathName={pathname}
              className="space-x-2 hover:opacity-100"
            >
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="hover:cursor-pointer ">
                {t("All")}
              </Label>
            </Link>
          </div>

          {categoryData?.map((component, idx) => {
            const title = lang === "en" ? component.en : component.vn;
            const href =
              lang === "en"
                ? `/export/${component.enSlug}`
                : `/xuat-khau/${component.vnSlug}`;
            return (
              <div className="flex items-center " key={idx}>
                <Link
                  href={href}
                  pathName={pathname}
                  className="space-x-2 hover:opacity-100"
                >
                  <RadioGroupItem
                    value={lang === "en" ? component.enSlug : component.vnSlug}
                    id="option-two"
                  />
                  <Label
                    htmlFor={
                      lang === "en" ? component.enSlug : component.vnSlug
                    }
                    className="hover:cursor-pointer"
                  >
                    {title}
                  </Label>
                </Link>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </>
  );
};
