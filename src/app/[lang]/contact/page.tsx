import ComingSoon from "@/components/coming-soon";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import React from "react";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { t } = await useTransServer(lang);
  return (
    <div className="container mt-2">
      <Breadcrumb data={[{ name: t("Contact"), href: "/contact" }]} />
      <ComingSoon />
    </div>
  );
}
