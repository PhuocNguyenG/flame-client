import { getAllProduct, getListCateProduct } from "@/lib/api/server-side";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fetchData = await Promise.all([getListCateProduct(), getAllProduct()]);
  const cateProduct = fetchData[0].Product;
  const product = fetchData[1];
  const mapCate = cateProduct.map((item) => ({
    url: `https://flameagricultural.com/san-pham/${item.vnSlug}`,
    lastModified: "2023-11-13T18:29:51.896Z",
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
    lastModified: "2023-11-13T18:29:51.896Z",
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
      lastModified: "2023-11-13T18:29:51.896Z",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://flameagricultural.com/gioi-thieu",
      lastModified: "2023-11-13T18:29:51.896Z",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://flameagricultural.com/san-pham",
      lastModified: "2023-11-13T18:29:51.896Z",
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: "https://flameagricultural.com/xuat-khau",
      lastModified: "2023-11-13T18:29:51.896Z",
      changeFrequency: "weekly",
      priority: 0.8,
    },

    ...mapCate,
    ...mapProduct,
  ];
}
