import { Locale } from "@/lib/i18n/setting";
import React from "react"

export default function Page({
  params: { lang },
  }: {
  params: { lang: Locale };
  }) {
  return (
    <div className="container mt-2">Search page</div>
  )
}