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

// export const usePathNameServer = () => {
//   const headersList = headers();
//   const pathname = headersList.get("x-invoke-path") || "";
//   return pathname
// }
