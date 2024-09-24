// app/page.tsx

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold">리그 오브 레전드 정보 앱</h1>
        <p className="mt-4 text-gray-500">
          Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.
        </p>
      </div>
      <div className="mt-[40px] flex flex-col justify-center gap-10">
        <div className="flex flex-col justify-center gap-10">
          <Link
            href={"/champions/"}
            className="flex flex-col justify-center items-center gap-5 text-amber-400"
          >
            <div className="relative w-[400px] h-[300px]">
              <Image
                src={
                  "https://wallpapers.com/images/featured/league-of-legends-3ggpjbfly8o9uo8a.jpg"
                }
                alt="Picture of the author"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            챔피언 목록 보기
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-10">
          <Link
            href={"/rotation"}
            className="flex flex-col justify-center items-center gap-5 text-amber-400"
          >
            <div className="relative w-[400px] h-[300px]">
              <Image
                src={
                  "https://wallpapers.com/images/high/3d-league-of-legends-8yx3ab1xb69nn227.webp"
                }
                alt="Picture of the author"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            금주 로테이션 확인
          </Link>
        </div>
        <div className="flex flex-col justify-center gap-10">
          <Link
            href={"/items/"}
            className="flex flex-col justify-center items-center gap-5 text-amber-400"
          >
            <div className="relative w-[400px] h-[300px]">
              <Image
                src={
                  "https://wallpapers.com/images/high/arcane-league-of-legends-dark-alley-z81hrap8o7mezc0g.webp"
                }
                alt="Picture of the author"
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            아이템 목록 보기
          </Link>
        </div>
      </div>
    </>
  );
}
