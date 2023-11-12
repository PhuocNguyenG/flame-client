import ComingSoon from "@/components/coming-soon";
import { Locale } from "@/lib/i18n/setting";
import React from "react";

export const dynamic = "force-dynamic";

export default function Page({ params: { lng } }: { params: { lng: Locale } }) {
  return (
    <>
      <ComingSoon />
    </>
  );
}
