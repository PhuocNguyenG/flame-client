import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useTransServer } from "@/lib/i18n/server";
import { Locale } from "@/lib/i18n/setting";
import { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang?: Locale };
}): Promise<Metadata> {
  return {
    title:
      "Dịch vụ đặt, nấu tiệc tại nhà - Quận 12, Gò Vấp, Tân Bình - Tp.HCM | Nấu tiệc Thu Sương",
    description:
      "Dịch vụ đặt tiệc, nấu tiệc Thu Sương - Nấu tiệc tại nhà các quận Gò Vấp, quận 12, Tân Bình, Tp Hồ Chí Minh. Thực đơn phong phú, giá cả hợp lí, bình dân. Đặt tiệc tân gia, đám cưới, thôi nôi, …",
    keywords: [
      "dat tiec, nau tiec tai nha",
      "nau tiec quan 12",
      "nau tiec go vap",
      "nau tiec tan binh",
      "nau tiec thu suong",
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title:
        "Dịch vụ đặt, nấu tiệc tại nhà - Quận 12, Gò Vấp, Tân Bình - Tp.HCM | Nấu tiệc Thu Sương",
      description:
        "Dịch vụ đặt tiệc, nấu tiệc Thu Sương - Nấu tiệc tại nhà các quận Gò Vấp, quận 12, Tân Bình, Tp Hồ Chí Minh. Thực đơn phong phú, giá cả hợp lí, bình dân. Đặt tiệc tân gia, đám cưới, thôi nôi, …",
      url: "https://flameagricultural.com/dich-vu-nau-tiec",
      images: [
        {
          url: "https://cdn.flameagricultural.com/ThuSuong-Catering.jpg",
          width: 350,
          height: 500,
        },
      ],
      phoneNumbers: ["097 3912839"],
      authors: "Công ty TNHH TM-DV-XNK Phước Linh",
      siteName: lang === "en" ? "Flame Agricultural" : "Nông Sản Flame",
      type: "article",
    },
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const fetchData = await Promise.all([useTransServer(lang)]);
  const { t } = fetchData[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline:
      "Dịch vụ đặt, nấu tiệc tại nhà Thu Sương - Quận 12, Gò Vấp, Tân Bình, … - Tp.HCM",
    image: ["https://cdn.flameagricultural.com/ThuSuong-Catering.jpg"],
    datePublished: "2023-11-11T13:04:20.786Z",
    dateModified: "2023-11-11T14:21:35.323Z",
    author: [
      {
        "@type": "Person",
        name: "Hoàng Thị Thu",
        url: "https://flameagricultural.com",
      },
    ],
  };

  return (
    <>
      <Script
        id="catering-detail-structured-data-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, "\t") }}
      />
      <div className="container flex flex-col w-full h-full font-medium">
        <Breadcrumb data={[{ name: t("HomeCatering"), href: "/catering" }]} />

        <div className=" flex flex-col w-full h-fit">
          <h1 className=" text-3xl font-bold rounded-md w-full text-center px-5 max480:px-0 py-3 my-5 [text-shadow:0px_0px_black] border-4 border-logo text-[#beff00] bg-logo-foreground uppercase">
            Dịch vụ đặt tiệc tại nhà{" "}
            <span className="underline underline-offset-4 decoration-double whitespace-nowrap">
              Thu Sương
            </span>
          </h1>
          <p className="relative">
            ✨Chuyên cung cấp dịch vụ đặt tiệc, nấu tiệc tại nhà cùng với nhiều
            bộ thực đơn với mức giá rất hợp lý, bình dân, chất lượng. Thu Sương
            nhận đặt tiệc từ tiệc đám cưới, đám hỏi, đầy tháng, thôi nôi, sinh
            nhật, giỗ chạp, họp mặt gia đình, khai trương cửa hàng, công ty,
            doanh nghiệp hoặc tổ chức trọn gói theo yêu cầu.{" "}
            <span className="absolute -left-4 top-0 h-full w-2 bg-logo rounded-[2px]"></span>
          </p>
          <span className="flex flex-row justify-center text-3xl max480:text-2xl font-semibold tracking-wider w-full py-2 my-3">
            <div className="relative w-fit h-full rounded-md bg-primary text-[#beff00] px-5 py-1.5 z-[1] font-bold text-lg before:absolute before:top-[4px] before:-right-[0.5rem] before:bg-primary before:rounded-md before:h-[28px] before:w-[28px] before:-z-[1] before:rotate-45 after:absolute after:top-[4px] after:-left-[0.5rem] after:bg-primary after:rounded-md after:h-[28px] after:w-[28px] after:-z-[1] after:rotate-45 uppercase">
              Thực đơn
            </div>
          </span>
          <p>
            ✨Với hơn 20 bộ menu và hơn 80 món ăn mang nét đặt trưng của Việt
            Nam.
          </p>
          <div>
            <p>
              🥗Món khai vị là các món dùng để lót bụng của bữa tiệc, là món không thể thiếu. Món khai vị thường là các món nhẹ như món chiên giòn, soup, gỏi, salad hoặc các combo khai vị 2 đến 3 món, ….
            </p>
            <p>
              🍗Món ăn chính Khách hàng thường chọn các món ăn khô, nhiều đạm(nai, gà, bò, …), món rau củ quả, món nước(lẩu, …).
            </p>
            <p>
              🍑Để kết thúc bữa tiệc mọi người thường sẽ chọn món tráng miệng là
              trái cây, bánh plan hoặc thạch rau câu.
            </p>
          </div>
          <p>
            🎈<span className="underline">Lưu ý</span>: chi phí trên mỗi thực
            đơn đã bao gồm bàn ghế inox, bát đũa, ly, nhân viên phục vụ, … và
            phí vận chuyển 2 chiều (áp dụng khi quý khách đặt từ 3 bàn trở lên
            và trong nội thành thành phố Hồ Chí Minh). Nếu quý khách đặt dưới 3
            bàn, Thu Sương có thể sẽ phụ thu thêm tiền vận chuyển 2 chiều, tuỳ
            vào từng khu vực. Gọi ngay dịch vụ nấu Thu Sương{" "}
            <span>097.391.2839</span> để được hỗ trợ tư vấn báo giá dịch vụ
            nhanh chóng và chọn menu tiệc theo ý muốn.
          </p>
          <span className="flex flex-row justify-center text-3xl max480:text-2xl font-semibold tracking-wider w-full py-2 my-3">
            <div className="relative w-fit h-full rounded-md bg-primary text-[#beff00] px-5 py-1.5 z-[1] font-bold text-lg before:absolute before:top-[4px] before:-right-[0.5rem] before:bg-primary before:rounded-md before:h-[28px] before:w-[28px] before:-z-[1] before:rotate-45 after:absolute after:top-[4px] after:-left-[0.5rem] after:bg-primary after:rounded-md after:h-[28px] after:w-[28px] after:-z-[1] after:rotate-45 uppercase">
              Khả năng
            </div>
          </span>
          <p>
            ✨Đáp ứng tất cả các loại tiệc từ 1 bàn đến 50, 100 bàn và phục vụ
            thực đơn theo yêu cầu của khách hàng.
          </p>
          <p>
            ✨Luôn hỗ trợ khách hàng khi khách muốn thay đổi món hoặc hình thức
            tổ chức. Nguồn gốc của thực phẩm luôn tươi sống được nhập hàng vào
            sáng sớm ngày tổ chức tiệc để luôn đáp ứng tốt tình trạng thực phẩm
            cho khách hàng.
          </p>
          <p>
            ✨Bên cạnh đó, Thu Sương còn cung cấp thêm dịch vụ trang trí tiệc,
            cho thuê kèm thiết bị, sân khấu, MC, bàn ghế, dụng cụ ăn uống (chén,
            bát, đĩa, …) theo bộ với mức giá phải chăng.
          </p>
          <span className="flex flex-row justify-center text-3xl max480:text-2xl font-semibold tracking-wider w-full py-2 my-3">
            <div className="relative w-fit h-full rounded-md bg-primary text-[#beff00] px-5 py-1.5 z-[1] font-bold text-lg before:absolute before:top-[4px] before:-right-[0.5rem] before:bg-primary before:rounded-md before:h-[28px] before:w-[28px] before:-z-[1] before:rotate-45 after:absolute after:top-[4px] after:-left-[0.5rem] after:bg-primary after:rounded-md after:h-[28px] after:w-[28px] after:-z-[1] after:rotate-45 uppercase">
              Quy trình
            </div>
          </span>
          <div className="flex flex-col">
            Sau đây là 1 số bước mà bạn có thể liên hệ để đặt tiệc:
            <p>
              - Bước 1: Gọi điện vào số hotline hoặc nhắn tin qua zalo số điện
              thoại 097.291.2839 (Thu) để được tư vấn.
            </p>
            <p>
              - Bước 2: Cung cấp thông tin về bữa tiệc để được tư vấn chọn thực
              đơn theo loại, theo miền hoặc theo yêu cầu nhất định cho quý
              khách.
            </p>
            <p>
              - Bước 3: Sau khi thống nhất hoàn tất thực đơn, bên dịch vụ sẽ lên
              kế hoạch và báo giá tổng chi tiết các hạng mục.
            </p>
            <p>
              - Bước 4: Đúng ngày tổ chức tiệc, dịch vụ sẽ đến nơi mà quý khách
              muốn tổ chức tiệc để chuẩn bị, setup, trang trí không gian tiệc và
              đến giờ nhân viên sẽ lên món phục vụ quý khách
            </p>
            <p>
              - Bước 5: Khi xong tiệc, nhân viên của Thu Sương sẽ dọn dẹp và bàn
              giao lại mặt bằng như ban đầu cho quý khách.
            </p>
          </div>
          <span className="flex flex-row justify-center text-3xl max480:text-2xl font-semibold tracking-wider w-full py-2 my-3">
            <div className="relative w-fit h-full rounded-md bg-primary text-[#beff00] px-5 py-1.5 z-[1] font-bold text-lg before:absolute before:top-[4px] before:-right-[0.5rem] before:bg-primary before:rounded-md before:h-[28px] before:w-[28px] before:-z-[1] before:rotate-45 after:absolute after:top-[4px] after:-left-[0.5rem] after:bg-primary after:rounded-md after:h-[28px] after:w-[28px] after:-z-[1] after:rotate-45 uppercase">
              Thông tin liên hệ
            </div>
          </span>
          <div className="flex flex-col">
            <p>
              ☎️ <span className="font-semibold">Đặt tiệc</span>: 0973912839 -
              Thu (Zalo){" "}
            </p>
            <p>
              ⏰ <span className="font-semibold">Thời gian làm việc</span>: Tất
              cả các ngày trong tuần{" "}
            </p>
            <p>
              🏣 <span className="font-semibold">Địa chỉ</span> : 108/14, đường
              Thạnh Xuân 21 (TX21), Phường Thạnh Xuân, Quận 12, TP.HCM{" "}
            </p>
            <p className="font-semibold"> 🏆 UY TÍN - CHẤT LƯỢNG - TIẾT KIỆM</p>
          </div>
        </div>
      </div>
    </>
  );
}
