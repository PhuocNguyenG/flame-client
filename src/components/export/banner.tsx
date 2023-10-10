import Image from "next/image";

export const BannerExport = () => {
  return (
    <span>
      <Image
        src={
          "https://media.techcombank.com/uploads/Banner_bieeur_phis_1_1_4fc344eb21.png?w=1920&q=75"
        }
        alt="Export banner"
        sizes="100vw"
        priority
        width={1000}
        height={1000}
        className="min-w-full w-0 max-w-full max-h-[100px] object-cover"
      />
    </span>
  );
};
