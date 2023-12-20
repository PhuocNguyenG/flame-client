import { cn } from "@/lib/utils";
import React from "react";

export const CheckMarkIcon = ({
  className,
}: {
  className?: React.HTMLProps<HTMLElement>["className"];
}) => (
  <div
    aria-hidden
    className={cn(
      "min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] opacity-0 rounded-xl bg-white relative rotate-45 animate-[circleAnimation_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards] delay-200 after:animate-[checkMarkAnimation_0.2s_ease-out_forwards] after:opacity-0 after:delay-300 after:absolute after:border-r-4 after:border-b-4 after:border-[#07bc0c] after:bottom-[7px] after:left-[7px] after:h-2.5 after:w-2.5 ",
      className
    )}
  />
);
