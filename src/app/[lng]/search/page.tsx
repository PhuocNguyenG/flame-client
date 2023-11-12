import SearchPage from "@/components/pages/search";
import { Locale } from "@/lib/i18n/setting";
import React from "react";

export const dynamic = "force-dynamic";

export default function Page({ params: { lng } }: { params: { lng: Locale } }) {
  return <SearchPage lng={lng} />;
}
