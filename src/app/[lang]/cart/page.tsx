'use client'

import ComingSoon from "@/components/coming-soon";
import { Locale } from "@/lib/i18n/setting";
import React from "react";

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <>
      <ComingSoon />
    </>
  );
}
