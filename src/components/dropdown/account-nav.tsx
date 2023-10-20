"use client";
import React from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import GoogleButton from "../button/signin-google";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { useTransClient } from "@/lib/i18n/client";
import { getLangByPathname } from "@/lib/utils";

const AccountDropdown = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const pathname = usePathname();
  const { t } = useTransClient(getLangByPathname(pathname));
  const { data: session, status } = useSession();

  let timeOut: string | number | NodeJS.Timeout | undefined;
  const handleMouseEnter = () => {
    clearTimeout(timeOut);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  const SignedIn = () => {
    return (
      <div className="flex flex-col gap-2">
        {session?.user?.name}
        <Separator />
        <Button
          className="bg-secondary-foreground text-secondary active:!bg-slate-200"
          onClick={() => signOut()}
        >
          {t("SignOut")}
        </Button>
      </div>
    );
  };
  const NotSignIn = () => {
    return (
      <div className="flex flex-col gap-2 w-[150px] items-center">
        <GoogleButton />
        {/* <Separator />
        {t("Or")}
        <Input type="text" className="w-100%" placeholder="Email" />
        <Input type="text" className="w-100%" placeholder="Password" />
        <Button
          className="bg-primary active:!bg-slate-200"
          onClick={() =>
            signIn("credentials", {
              email: "nguyenphuock18@gmail.com",
              password: "sdfsdsf",
            })
          }
        >
          {t("SignIn")}
        </Button>
        <Button
          className="bg-white text-black active:!bg-slate-200"
          onClick={() =>
            signIn("credentials", {
              email: "nguyenphuock18@gmail.com",
              password: "sdfsdsf",
            })
          }
        >
          {t("Register")}
        </Button> */}
      </div>
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <PopoverTrigger
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {session?.user ? (
          <Avatar className="w-8 h-8">
            <AvatarImage src={session?.user?.image || ""} />
            <AvatarFallback>
              {session?.user?.name?.split("")[0].toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        ) : (
          <PersonIcon
            width={26}
            height={26}
            className="hover:scale-105 transition-all duration-300 text-secondary-foreground"
          />
        )}
      </PopoverTrigger>
      <PopoverContent
        sideOffset={11}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-primary text-secondary-foreground !border-t !border-primary-foreground border-0"
      >
        {session?.user ? SignedIn() : NotSignIn()}
      </PopoverContent>
    </Popover>
  );
};

export default AccountDropdown;
