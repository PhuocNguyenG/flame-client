import { Locale } from "../i18n/setting";
import * as Type from "../type";

/**
 * Get all export product
 * @returns Array <ExportDetailResult[]>
 */
export const getAllExportProduct = async (): Promise<
  Type.ExportDetailResult[]
> => {
  const api = (await fetch(
    process.env.URL + "/export/get-all-export-products",
    { method: "GET" }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
  })) as Type.ApiResult;
  if (api.statusCode === Type.Status.OK) {
    return api.result;
  } else {
    return [];
  }
};

/**
 * List category name and slug of export product
 * @returns Array <ExportRouterResult[]>
 */
export const getListCateExportProduct = async (): Promise<
  Type.ExportRouterResult[]
> => {
  try {
    const api = (await fetch(process.env.URL + "/type/get-export-type", {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    })) as Type.ApiResult;

    if (api.statusCode === Type.Status.OK) {
      const result = api.result as Type.ExportRouterResult[];
      return result;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);

    return [];
  }
};

/**
 * List category name and slug of export product
 * @returns Array <ExportRouterResult[]>
 */
export const getDetailExportProduct = async (
  slug: string,
  lang: Locale
): Promise<Type.ExportDetailResult> => {
  try {
    const api = (await fetch(process.env.URL + `/export/${slug}-${lang}`, {
      method: "GET",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    })) as Type.ApiResult;

    if (api.statusCode === Type.Status.OK) {
      const result = api.result as Type.ExportDetailResult;
      return result;
    } else {
      return null!;
    }
  } catch (error) {
    console.log(error);
    return null!;
  }
};
