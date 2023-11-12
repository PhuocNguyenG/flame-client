"use client";

import { Locale } from "@/lib/i18n/setting";
import { TypeItemCategoryProduct } from "@/lib/type";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { useTransClient } from "@/lib/i18n/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import nProgress from "nprogress";

export default function LeftFilterProduct({
  lng,
  category,
  categories,
}: {
  lng: Locale;
  category: string;
  categories: TypeItemCategoryProduct[];
}) {
  const { t } = useTransClient(lng);
  const pathname = usePathname();
  const route = useRouter();
  const searchParams = useSearchParams();

  const changeCate = (cateCode: string) => {
    // Get old params
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (!cateCode) {
      current.delete("c");
    } else {
      current.set("c", cateCode);
    }
    nProgress.start();
    route.push(`${pathname}?${current.toString()}`);
  };
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
            <div className="space-x-2 hover:opacity-100 flex flex-row items-center">
              <RadioGroupItem
                value=""
                id="all"
                onClick={(e) => changeCate(e.currentTarget.value)}
              />
              <Label htmlFor="all" className="hover:cursor-pointer ">
                {t("All")}
              </Label>
            </div>
          </div>

          {categories?.map((item, idx) => {
            const title = lng === "en" ? item.en : item.vn;
            return (
              <div className="flex items-center " key={idx}>
                <div className="space-x-2 hover:opacity-100 flex flex-row items-center">
                  <RadioGroupItem
                    value={lng === "en" ? item.enSlug : item.vnSlug}
                    id={lng === "en" ? item.enSlug : item.vnSlug}
                    onClick={(e) => changeCate(e.currentTarget.value)}
                  />
                  <Label
                    htmlFor={lng === "en" ? item.enSlug : item.vnSlug}
                    className="hover:cursor-pointer"
                  >
                    {title}
                  </Label>
                </div>
              </div>
            );
          })}
        </RadioGroup>
      </div>
    </>
  );
}
