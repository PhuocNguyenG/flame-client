import type { InitOptions } from "i18next";

export const fallbackLng = "vi";
export const locales = [fallbackLng, "en"] as const;
export type Locale = (typeof locales)[number];

export function getOptions(lng = fallbackLng): InitOptions {
  return {
    // debug: true, // Set to true to see console logs
    supportedLngs: locales,
    fallbackLng,
    lng: lng,
  };
}
