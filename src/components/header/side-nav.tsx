import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import FlameLogoSimple from "@/assets/logo/flame-logo-simple.png";
import Image from "next/image";
import { Locale } from "@/lib/i18n/setting";
import Link from "../link";

export const SideNav = ({
  lang,
  side,
}: {
  lang: Locale
  side?: "right" | "left" | "top" | "bottom";
}) => {
  return (
    <div className="flex flex-row gap-4 mr-1">
      <Sheet>
        <SheetTrigger className="none-select-text">
          <HamburgerMenuIcon className="text-primary-foreground min-w-[33px] h-full" />
        </SheetTrigger>
        <SheetContent side={side}>
          <SheetHeader>
            <SheetTitle>Are you sure absolutely sure?s df sdfs</SheetTitle>
          </SheetHeader>
          <Separator className="bg-primary" />
        </SheetContent>
      </Sheet>
      <Link lang={lang}
            href={"/"} className="h-fit w-fit">
        <Image
          src={FlameLogoSimple}
          alt="Flame logo"
          sizes="45px"
          width={45}
          height={30}
          className="min-w-[45px]"
          unoptimized
        />
      </Link>
    </div>
  );
};
