import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import React from "react";

export default async function Page({
  params: { lng },
}: {
  params: { lng: Locale };
}) {
  const { t } = await useTransServer(lng);

  return (
    <div className="container mt-2">
      <Breadcrumb
        data={[{ name: t("PrivacyPolicy"), href: "/privacy-policy" }]}
      />

      <div className="container flex flex-wrap gap-7 w-full m-[30px_0px_30px_0px]">
        <div className="flex items-center">
          {lng == "en" ? (
            // <div dangerouslySetInnerHTML={{ __html: data.en }} />
            <div>Updating</div>
          ) : (
            <div>Đang cập nhật</div>
          )}
        </div>
      </div>
    </div>
  );
}
