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

export interface ExportDetailResult {
  _id: string;
  enSlug: string;
  vnSlug: string;
  banner: string;
  listImages: string[];
  weight: string;
  productType: string;

  en: {
    name: string;
    ingredients: string;
    howToUse: string;
    storage: string;
    origin: string;
    description: string;
  };
  vn: {
    name: string;
    ingredients: string;
    howToUse: string;
    storage: string;
    origin: string;
    description: string;
  };

  isFeatured: boolean;
}

export interface ExportRouterResult {
  en: string;
  enSlug: string;
  vn: string;
  vnSlug: string;
}
