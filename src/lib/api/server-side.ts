import { TAGS } from "../contants";
import { Locale } from "../i18n/setting";
import * as Type from "../type";

/**
 * Get all main product
 * @returns Array <ItemListProductResult[]>
 */
export const getAllProduct = async (): Promise<
  Type.ItemListProductResult[]
> => {
  const api = (await fetch(process.env.URL + "/product/get-all-products", {
    method: "GET",
    next: { tags: [TAGS.products] },
  }).then((res) => {
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
 * Get all export product
 * @returns Array <ItemListExportsResult[]>
 */
export const getAllExportProduct = async (): Promise<
  Type.ItemListExportsResult[]
> => {
  const api = (await fetch(
    process.env.URL + "/export/get-all-export-products",
    { method: "GET", next: { tags: [TAGS.exports] } }
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
 * Product detail
 * @returns <ProductDetailResult>
 */
export const getDetailProduct = async (
  slug: string,
  lang: Locale
): Promise<Type.ProductDetailResult> => {
  const api = (await fetch(process.env.URL + `/product/${slug}-${lang}`, {
    method: "GET",
    next: {
      tags: [TAGS.products],
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  })) as Type.ApiResult;

  if (api.statusCode === Type.Status.OK) {
    const result = api.result as Type.ProductDetailResult;
    return result;
  } else {
    return null!;
  }
};

/**
 * Export detail
 * @returns <ExportDetailResult>
 */
export const getDetailExportProduct = async (
  slug: string,
  lang: Locale
): Promise<Type.ExportDetailResult> => {
  const api = (await fetch(process.env.URL + `/export/${slug}-${lang}`, {
    method: "GET",
    next: { tags: [TAGS.exports] },
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
};

/**
 * List categories (name and slug) of Product, Export
 * @returns <TypeOfCategory>
 */
export const getListCateProduct = async (): Promise<Type.TypeOfCategory> => {
  const api = (await fetch(process.env.URL + "/type/get-product-type", {
    method: "GET",
    next: { tags: [TAGS.categories] },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  })) as Type.ApiResult;

  if (api.statusCode === Type.Status.OK) {
    const result = api.result as Type.TypeOfCategory;
    return result;
  } else {
    return {
      Product: [],
      Export: [],
    };
  }
};

/**
 * Introduce detail
 * @returns <IntroduceDetailResult>
 */
export const getIntroduce = async (): Promise<Type.IntroduceDetailResult> => {
  const api = (await fetch(process.env.URL + "/common/get-introduce", {
    method: "GET",
    next: { tags: [TAGS.introduce] },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  })) as Type.ApiResult;

  if (api.statusCode === Type.Status.OK) {
    const result = api.result as Type.IntroduceDetailResult;
    return result;
  } else {
    return { en: "", vn: "" };
  }
};
