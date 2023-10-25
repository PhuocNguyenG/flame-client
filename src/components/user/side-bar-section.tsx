"use client";
import { useTransClient } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/setting";
import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const UserSideBarSection = ({ lang }: { lang: Locale }) => {
  const { t } = useTransClient(lang);
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col items-start gap-3 w-full min-h-fit max-h-fit p-1 ">
      <div className="flex flex-row justify-center items-center gap-2 w-full">
        <Avatar className="w-10 h-10 border border-solid border-logo-foreground">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback>
            {session?.user?.name?.split("")[0].toLocaleUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="line-clamp-2 font-medium">{session?.user?.name}</p>
      </div>
      <div className="flex flex-row justify-around items-center gap-3 w-full">
        <Button
          variant={"outline"}
          className="text-primary/80 px-2 py-1 h-7 border-primary/40  active:!bg-primary/10"
        >
          {t("Account")}
        </Button>
        <Button
          variant={"ghost"}
          className="text-primary/80 px-2 py-1 h-7 border-primary/40  active:!bg-primary/10"
        >
          {t("SignOut")}
        </Button>
      </div>
    </div>
  );
};

export default UserSideBarSection;
