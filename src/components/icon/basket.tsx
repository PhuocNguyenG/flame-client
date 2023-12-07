import { cn } from "@/lib/utils";
import React from "react";
export const BasketIcon = ({
  className = "text-white",
}: {
  className?: React.HTMLProps<HTMLElement>["className"];
}) => (
  <svg
    className={cn(
      "h-[28px] w-[28px]",
      className
    )}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);
