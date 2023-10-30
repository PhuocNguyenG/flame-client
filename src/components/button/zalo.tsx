"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import Zalo from "@/assets/icon/zalo-logo.svg";

export const ZaloButton = () => {

  return (
    <>
      <Button
        className="bg-blue-200"
        size={"icon"}
        onClick={() => window.open(`https://zalo.me/0973912839`, "_blank")}
      >
        <Image
          src={Zalo}
          alt="Zalo Flame"
          width={30}
          height={30}
          className="w-full h-full"
        />
      </Button>
    </>
  );
};
