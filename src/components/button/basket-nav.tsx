import React from "react";
import basket from "@/assets/icon/basket.svg";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";

const Basket = () => {
  return (
    <Link href={"/gio-hang"} className="w-[23px] h-[23px] relative hover:scale-105 transition-all duration-300" >
      <Badge className="absolute right-[-10px] bottom-[-10px]">19</Badge>
      <Image src={basket} alt="Basket" className="w-[23px] h-[23px]" />
    </Link>
  );
};

export default Basket;
