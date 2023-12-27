"use client";
import React from "react";
import { ScrollToTop } from "./scroll-to-top";
import { ZaloButton } from "../zalo";
import { WhatsAppButton } from "../whatsapp";

export default function FloatButton() {
  const [showTopBtn, setShowTopBtn] = React.useState(false);
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <div
      className={`fixed z-0 bottom-6 right-6 opacity-0 ${
        showTopBtn && "!opacity-100"
      } transition-all duration-500 flex flex-col gap-4`}
    >
      <WhatsAppButton />
      <ZaloButton />
      <ScrollToTop />
    </div>
  );
}
