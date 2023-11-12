"use client";
import { usePathname } from "next/navigation";
import Link from "../link";
import { getLangByPathname } from "@/lib/utils";

export const Breadcrumb = ({
  data = [],
}: {
  data: { name: string; href: string }[];
}) => {
  const pathname = usePathname();
  const lang = getLangByPathname(pathname);

  return (
    <>
      {data?.length > 0 && (
        <nav className="flex m-[15px_0px] min481:ml-4" aria-label="Breadcrumb">
          <ol className="flex flex-row flex-wrap items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                lang={lang}
                href={"/"}
                className="inline-flex items-center text-sm font-medium text-gray-500 "
                aria-label=""
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
              </Link>
            </li>
            {data.map((item, idx) => {
              return (
                <li key={idx}>
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    {data.length - 1 === idx ? (
                      <p className="text-sm font-semibold text-gray-700 ml-2 hover:cursor-default whitespace-nowrap">
                        {item.name}
                      </p>
                    ) : (
                      <Link
                        lang={lang}
                        href={item.href}
                        className="ml-1 text-sm font-medium text-gray-500 whitespace-nowrap"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </>
  );
};
