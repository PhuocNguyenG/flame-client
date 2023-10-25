"use client";
import { useTransClient } from "@/lib/i18n/client";
import { Locale } from "@/lib/i18n/setting";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import LoginModal from "./login-modal";

const UserSideBarSection = ({
  lang,
  openLogin,
  callbackOpenLogin,
}: {
  lang: Locale;
  openLogin?: boolean;
  callbackOpenLogin: (isOpen: boolean) => void;
}) => {
  const { t } = useTransClient(lang);
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col justify-center items-center gap-3 w-full min-h-fit max-h-fit p-1 ">
      {session?.user ? (
        <>
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
              className="text-primary/80  py-1 h-7 border-primary/40 active:!bg-primary/10"
              disabled={status !== "authenticated"}
            >
              {t("Account")}
            </Button>
            <Button
              variant={"ghost"}
              className="text-primary/80 px-2 py-1 h-7 border-primary/40  active:!bg-primary/10 bg-gray-100/80"
              onClick={() => signOut()}
            >
              {t("SignOut")}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-row justify-center gap-2 w-full h-fit">
          <PersonIcon
            width={26}
            height={26}
            className="hover:scale-105 transition-all duration-300 text-primary"
          />
          <Button
            variant={"outline"}
            className="text-primary/80 px-2 py-1 h-7 border-primary/40  active:!bg-primary/10"
            loading={status === "loading"}
            onClick={() => callbackOpenLogin(true)}
          >
            {t("SignIn")}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserSideBarSection;
