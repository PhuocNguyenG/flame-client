import { cn } from "@/lib/utils";
import React from "react";

export const TrashIcon = ({
  className = "text-primary",
}: {
  className?: React.HTMLProps<HTMLElement>["className"];
}) => (
  <svg
    className={cn(
      "min-h-[24px] min-w-[24px] max-h-[24px] max-w-[24px]",
      className
    )}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);