import Carousel from "@/components/home/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default async function Home({ params }: any) {
  return (
    <main>
      <div className="min-h-[1000px]">
        <Carousel />
      </div>
    </main>
  );
}
