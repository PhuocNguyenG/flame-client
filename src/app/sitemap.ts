import { getAllProduct, getListCateProduct } from "@/lib/api/server-side";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fetchData = await Promise.all([getListCateProduct(), getAllProduct()]);
  const cateProduct = fetchData[0].Product;
  const product = fetchData[1];
  const mapCate = cateProduct.map((item) => ({
    url: `https://flameagricultural.com/san-pham/${item.vnSlug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as
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
    lastModified: new Date(),
    changeFrequency: "weekly" as
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
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://flameagricultural.com/san-pham",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://flameagricultural.com/xuat-khau",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://flameagricultural.com/gioi-thieu",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...mapCate,
    ...mapProduct,
  ];
}
