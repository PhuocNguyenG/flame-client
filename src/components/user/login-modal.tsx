"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Locale } from "@/lib/i18n/setting";
import { Separator } from "../ui/separator";
import GoogleButton from "../button/signin-google";
import { useTransClient } from "@/lib/i18n/client";
import { Input } from "../ui/input";

const LoginModal = ({
  lang,
  open = false,
  callBackOpen,
  children,
}: {
  lang: Locale;
  open: boolean;
  callBackOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
}) => {
  const { t } = useTransClient(lang);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => callBackOpen(isOpen)}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex flex-col justify-center items-center gap-3 w-full">
          <div className="text-xl font-semibold">{t("SignIn")}</div>
          <div className="flex flex-col w-full max-w-[270px]">
            <label>Email:</label>
            <Input
              placeholder={t("ComingSoon")}
              type="email"
              className="max-w-[270px]"
              disabled
            />
          </div>
          <div className="flex flex-col gap-1 justify-center items-center w-full h-fit">
            <Separator className=" max-w-[270px] bg-logo-foreground/40" />
            {t("Or")}
          </div>
          <GoogleButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
