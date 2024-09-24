// app/layout.tsx

import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "리그 오브 레전드 정보 앱",
  description: "Riot Games API를 활용한 LoL 정보 앱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="py-[100px]">
        <Header />
        <main className="container mx-auto mt-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
