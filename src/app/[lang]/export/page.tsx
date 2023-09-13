import Link from "@/components/link";
import { getAllExportProduct } from "@/lib/api/server-side";
import { Locale } from "@/lib/i18n/setting";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const result = await getAllExportProduct();
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  return (
    <main>
      <div>
        <ul className="grid grid-cols-[repeat(auto-fill,300px)] row-[100px] list-none p-0 m-0 items-center justify-center after:flex-auto after:">
          {result?.map((item, idx) => {
            const detail = lang === "en" ? item.en : item.vn;
            const href = lang === "en" ? item.enSlug : item.vnSlug;
            return (
              <li className="flex p-2 h-[340px] w-[300px]" key={idx}>
                <Link href={href} pathName={pathname} className="w-full h-full">
                  <div className="bg-white rounded-md shadow-md flex flex-col overflow-hidden w-full h-full border border-[#87000029] hover:cursor-pointer">
                    <div className="w-full h-[240px] p-5">
                      <Image
                        src={item.banner}
                        alt=""
                        className="w-full h-full object-contain"
                        width={100}
                        height={230}
                      />
                    </div>
                    <div className="flex-1 p-2 text-secondary-foreground">
                      <h2 className="text-lg font-bold tracking-wide capitalize m-0">
                        {detail.name}
                      </h2>
                      <p className=" text-sm leading-tight font-normal">
                        {detail.origin}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
