"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProps,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CheckMarkIcon } from "../icon/check-mark";
import { ErrorMarkIcon } from "../icon/error-mark";
import { BellMarkIcon } from "../icon/bell-mark";
import { cn, useHasFocus } from "@/lib/utils";

export default function Toaster() {
  const { toasts } = useToast();
  const isFocus = useHasFocus();

  const RenderIcon = (variant: ToastProps["variant"] = "default") => {
    switch (variant) {
      case "success":
        return <CheckMarkIcon />;
      case "error":
        return <ErrorMarkIcon />;
      default:
        return <BellMarkIcon />;
    }
  };

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="group">
            <div className="flex flex-row gap-3 items-center">
              {RenderIcon(props.variant)}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
            <div
              className={cn(
                "left-0 absolute bottom-0 h-1 w-full bg-secondary-foreground/90 opacity-0 animate-[progressToastAnimation_5.5s] group-hover:!paused",
                {
                  ["!bg-primary-foreground/90 "]: props.variant === "default",
                }
              )}
              style={{
                animationPlayState: isFocus ? "running" : "paused",
              }}
            ></div>
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
