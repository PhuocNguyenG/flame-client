import { Locale } from "@/lib/i18n/setting";
import Link from "../../link";
import { TypeItemCategoryProduct } from "@/lib/type/type";
import { useTransServer } from "@/lib/i18n/server";
import { Button } from "../../ui/button";
import { getListCateProduct } from "@/lib/api/server-side";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";

export const LeftFilterExport = async ({
  lang,
  category,
}: {
  lang: Locale;
  category: string;
}) => {
  const categoryData = (await getListCateProduct()).Export;
  const { t } = await useTransServer(lang);

  return (
    <>
      <div className="flex flex-col border border-border rounded-md bg-slate-50 [&>*]:p-3 ">
        <div className="font-bold bg-primary-foreground pb-0 rounded-t-md !p-2 !px-3">
          {t("AdvancedFilter")}:
        </div>
        <RadioGroup
          defaultValue={category}
          className="[&_a]:opacity-70 [&_a:has([data-state=checked])]:opacity-100 [&_label]:text-base [&_label]:leading-none [&_label]:font-semibold"
        >
          <div className="flex items-center">
            <Link
              href={"/export"}
              lang={lang}
              className="space-x-2 hover:opacity-100 flex flex-row items-center"
            >
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all" className="hover:cursor-pointer ">
                {t("All")}
              </Label>
            </Link>
          </div>

          {categoryData?.map((item, idx) => {
            const title = lang === "en" ? item.en : item.vn;
            const href = `/export/${lang === "en" ? item.enSlug : item.vnSlug}`;
            return (
              <div className="flex items-center " key={idx}>
                <Link
                  href={href}
                  lang={lang}
                  className="space-x-2 hover:opacity-100 flex flex-row items-center"
                >
                  <RadioGroupItem
                    value={lang === "en" ? item.enSlug : item.vnSlug}
                  />
                  <Label
                    htmlFor={lang === "en" ? item.enSlug : item.vnSlug}
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
