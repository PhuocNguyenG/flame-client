import React from "react";
import Link from "../link";
import Image from "next/image";
import { Locale } from "@/lib/i18n/setting";
import FlameLogo from "@/assets/logo/flame-logo.svg";
import { cn } from "@/lib/utils";

function LogoHeader({
  lang,
  className,
}: {
  lang: Locale;
  className?: React.HTMLProps<HTMLElement>["className"];
}) {
  return (
    <div
      className={cn(
        "min-w-[100px] max-w-fit h-fit justify-center items-center inline-block bg-primary p-[1px] rounded-full",
        className
      )}
    >
      <Link
        lang={lang}
        href={"/"}
        className="min-w-full block relative top-[2px] rounded-full group overflow-hidden"
      >
        <Image
          loading="lazy"
          alt="Flame | Agricultural by PhuocLinh"
          src={FlameLogo}
          height={90}
          width={90}
          sizes="100px"
          className="w-full h-full"
          priority
        />
        <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
      </Link>
    </div>
  );
}

export default LogoHeader;
