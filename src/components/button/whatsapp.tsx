"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import WhatsApp from "@/assets/icon/whatsapp-logo.svg";

export const WhatsAppButton = () => {
  return (
    <>
      <Button
        className="bg-[#16BE45]"
        size={"icon"}
        onClick={() => window.open(`https://wa.me/+84973912839`, "_blank")}
      >
        <Image src={WhatsApp} alt="Whatsapp Flame" width={27} height={27} unoptimized/>
      </Button>
    </>
  );
};
