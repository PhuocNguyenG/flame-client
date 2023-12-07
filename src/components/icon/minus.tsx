import { cn } from "@/lib/utils";
import React from "react";

export const MinusIcon = ({
  className = "text-primary",
}: {
  className?: React.HTMLProps<HTMLElement>["className"];
}) => (
  <svg
    className={cn(
      "min-h-[28px] min-w-[28px] max-h-[28px] max-w-[28px]",
      className
    )}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
