import { Locale } from "@/lib/i18n/setting";

export default function Page({
  params: { lang, category },
}: {
  params: { lang: Locale; category: string };
}) {
  return (
    <main>
      <div>Export cate {category}</div>
    </main>
  );
}
