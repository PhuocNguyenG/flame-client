import { cn } from "@/lib/utils";

export const ErrorMarkIcon = ({
  className,
}: {
  className?: React.HTMLProps<HTMLElement>["className"];
}) => (
  <div
    aria-hidden
    className={cn(
      "min-w-[25px] min-h-[25px] max-w-[25px] max-h-[25px] opacity-0 rounded-xl bg-white relative rotate-45 animate-[circleAnimation_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards] delay-200 after:absolute after:rounded-[2px] after:opacity-0 after:bg-destructive after:bottom-[11px] after:left-[4px] after:h-[3px] after:w-[17px] after:delay-300 after:animate-[errorMarkLine1Animation_0.15s_ease-out_forwards] before:absolute before:rounded-[2px] before:opacity-0 before:bg-destructive before:bottom-[11px] before:left-[4px] before:h-[3px] before:w-[17px] before:delay-300 before:animate-[errorMarkLine2Animation_0.15s_ease-out_forwards] !before:rotate-90 ",
      className
    )}
  />
);
