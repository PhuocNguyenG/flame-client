import { Skeleton } from "../ui/skeleton";

export default function Loading() {
  const result = [...Array(8).keys()];

  return (
    <>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 list-none p-0 m-0 ">
        {result?.map((item) => {
          return (
            <li className="flex h-[340px]" key={item}>
              <div className="w-full h-full">
                <div className="bg-white rounded-md flex flex-col overflow-hidden w-full h-full border border-border ">
                  <div className="w-full h-[240px] p-3 rounded-md">
                    <Skeleton className="w-full h-full rounded-md" />
                  </div>
                  <div className="flex flex-col flex-1 p-2 text-secondary-foreground gap-2">
                    <h2 className="text-lg font-bold tracking-wide capitalize m-0">
                      <Skeleton className="w-[50%] h-[20px] object-contain rounded-md" />
                    </h2>
                    <div className=" text-sm leading-tight font-normal">
                      <Skeleton className="w-[30%] h-[20px] object-contain rounded-md" />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
