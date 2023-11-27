"use client";

import { toast } from "@/components/ui/use-toast";
import { Locale } from "@/lib/i18n/setting";
import { useEffect } from "react";

const CateringPageTrigger = ({ lang }: { lang: Locale }) => {
  useEffect(() => {
    if (lang === "en") {
      setTimeout(() => {
        toast({
          title: "This page is only used for the Vietnam region",
        });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return null;
};

export default CateringPageTrigger;
