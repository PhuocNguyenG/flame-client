"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import googleIcon from "@/assets/icon/google.svg";
import { signIn } from "next-auth/react";

const GoogleButton = ({ type }: { type?: "icon" | "with-text" }) => {
  return (
    <Button
      className="bg-white active:!bg-slate-200"
      onClick={() => signIn("google")}
    >
      <Image
        src={googleIcon}
        alt="Google SignIn"
        width={30}
        height={30}
        unoptimized
      />
    </Button>
  );
};

export default GoogleButton;
