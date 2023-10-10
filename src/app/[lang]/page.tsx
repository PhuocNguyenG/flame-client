import Carousel from "@/components/home/carousel";


export default async function Home({ params }: any) {
  return (

      <div className="min-h-[1000px] max-w-[1400px] mx-auto">
        <Carousel />
      </div>

  );
}
