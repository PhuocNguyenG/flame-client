import * as Type from "../type";

/**
 * Get all export product
 * @returns Array <ExportProductResult[]>
 */
export const getAllExportProduct = async (): Promise<
  Type.ExportProductResult[]
> => {
  const api = (await fetch(
    process.env.URL + "/export/get-all-products-export",
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
 * @returns Array <ExportCategoryResult[]>
 */
export const getListCateExportProduct = async (): Promise<
  Type.ExportCategoryResult[]
> => {
  // const api = (await fetch(
  //   process.env.URL + "/export/get-all-type-export",
  //   { method: "GET" }
  // ).then((res) => {
  //   if (res.ok) {
  //     return res.json();
  //   }
  // })) as Type.ApiResult;
  // if (api.statusCode === Type.Status.OK) {
  //   return api.result;
  // } else {
  //   return [];
  // }
  return [
    { en: "Organic", enSlug: "organic", vn: "Hữu cơ", vnSlug: "huu-co" },
    { en: "Dry", enSlug: "dry", vn: "Khô", vnSlug: "kho" },
  ] as Type.ExportCategoryResult[];
};
