import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get string lang by string path name
 * @param url Path name
 */
export const getLangByPathname = (pathname: string) => {
  if (pathname.startsWith("/en/") || pathname === "/en") {
    return "en";
  }
  return "vi";
};

export const getPositionElement = (element: HTMLDivElement) => {
  var xPosition = 0,
    yPosition = 0;

  while (element) {
    xPosition += element.offsetLeft + element.clientLeft;
    yPosition += element.offsetTop + element.clientTop;
    element = element.offsetParent as HTMLDivElement;
  }
  return {
    x: xPosition,
    y: yPosition,
  };
};

