// Match with server
export enum Status {
  OK = "Successful",
  ERROR = "Error",
  EXIST = "Exist",
  EXPIRED = "Expired",
}

export enum Role {
  USER = 1,
  ADMIN = 2,
}
/**
 * "ACCOUNT",
 * "GOOGLE"
 */
export enum LoginWith {
  ACCOUNT = "ACCOUNT",
  GOOGLE = "GOOGLE",
}

export enum LanguageCode {
  EN = "en",
  VI = "vi",
}

// Only client
export enum Screen {
  Mobile = 512,
}

export interface ApiResult {
  statusCode: Status;
  result: any;
}

export interface TypeItemCategoryProduct {
  en: string;
  enSlug: string;
  vn: string;
  vnSlug: string;
}

export interface TypeCategoryProduct {
  Product: TypeItemCategoryProduct[];
  Export: TypeItemCategoryProduct[];
}

//Export
export interface ExportDetailResult {
  _id: string;
  enSlug: string;
  vnSlug: string;
  banner: string;
  listImages?: string[];
  weight?: string;
  productType: string;

  en: {
    name: string;
    ingredients: string;
    howToUse?: string;
    storage?: string;
    origin: string;
    description: string;
  };
  vn: {
    name: string;
    ingredients: string;
    howToUse?: string;
    storage?: string;
    origin: string;
    description: string;
  };

  isFeatured: boolean;
}


export interface ItemListExportsResult {
  _id: string;
  banner: string;
  enSlug: string;
  vnSlug: string;
  productType: string;
  en: {
    name: string;
    ingredients: string;
    origin: string;
  };
  vn: {
    name: string;
    ingredients: string;
    origin: string;
  };
  isFeatured: boolean;
}

//Product
export interface ItemListProductResult {
  _id: string;
  banner: string;
  enSlug: string;
  vnSlug: string;
  productType: string;
  price?: number
  en: {
    name: string;
    ingredients: string;
    origin: string;
  };
  vn: {
    name: string;
    ingredients: string;
    origin: string;
  };
  isFeatured: boolean;
}


export interface ProductDetailResult {
  _id: string;
  enSlug: string;
  vnSlug: string;
  banner: string;
  listImages?: string[];
  weight?: string;
  productType: string;
  price: number;
  available:boolean;

  en: {
    name: string;
    ingredients: string;
    howToUse?: string;
    storage?: string;
    origin: string;
    description: string;
  };
  vn: {
    name: string;
    ingredients: string;
    howToUse?: string;
    storage?: string;
    origin: string;
    description: string;
  };

  isFeatured: boolean;
}