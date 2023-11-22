import { getAllProduct, getListCateProduct } from "@/lib/api/server-side";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fetchData = await Promise.all([getListCateProduct(), getAllProduct()]);
  const cateProduct = fetchData[0].Product;
  const product = fetchData[1];
  const mapCate = cateProduct.map((item) => ({
    url: `https://flameagricultural.com/san-pham/${item.vnSlug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as
      | "daily"
      | "yearly"
      | "always"
      | "hourly"
      | "weekly"
      | "monthly"
      | "never"
      | undefined,
    priority: 0.8,
  }));

  const mapProduct = product.map((item) => ({
    url: `https://flameagricultural.com/san-pham/${
      cateProduct.find((x) => x.enSlug === item.productType)?.vnSlug
    }/${item.vnSlug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as
      | "daily"
      | "yearly"
      | "always"
      | "hourly"
      | "weekly"
      | "monthly"
      | "never"
      | undefined,
    priority: 0.8,
  }));

  return [
    {
      url: "https://flameagricultural.com",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://flameagricultural.com/gioi-thieu",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://flameagricultural.com/san-pham",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://flameagricultural.com/xuat-khau",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://flameagricultural.com/dich-vu-nau-tiec",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://flameagricultural.com/chinh-sach-bao-mat",
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.6,
    },
    ...mapCate,
    ...mapProduct,
  ];
}
