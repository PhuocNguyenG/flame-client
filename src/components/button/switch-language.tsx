import React from "react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
import { redirect, useParams, useSelectedLayoutSegments } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/lib/i18n/setting";
const SwitchLanguage = () => {
  const params = useParams();
  const urlSegments = useSelectedLayoutSegments();
const lang = params.lang as Locale 
  const onSwitch = (value: boolean) => {
    setCookie("next-locale", lang, {});
    console.log(lang);
  };
  return (
    <>
      <Link
        href={
          lang === "vi"
            ? "/en/" + urlSegments.join("/")
            : "/" + urlSegments.join("/")
        }
        
      >
        {lang === "vi" ? "EN" : "VI"}
        {/* <Switch
        id="switch-language"
        checked={lang === "vi" ?? false}
        onChange={() =>onSwitch}
        /> */}
        {/* <Label htmlFor="switch-language">Airplane Mode</Label> */}
      </Link>
    </>
  );
};

export default SwitchLanguage;
