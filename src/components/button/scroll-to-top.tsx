"use client";
import { PinTopIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import React from "react";

export const ScrollToTop = () => {
  const isBrowser = () => typeof window !== "undefined";
  const ScrollToTop = () => {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button
      variant={"outline"}
      onClick={ScrollToTop}
      className={`bg-primary text-primary-foreground border-primary-foreground`}
      size={"icon"}
    >
      <PinTopIcon className="h-5 w-5 " />
    </Button>
  );
};
