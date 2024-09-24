// app/api/champions/route.ts

import { NextResponse } from "next/server";
import { Champion } from "@/types/Champion";

export async function GET() {
  try {
    // 버전 정보 가져오기
    const versionsRes = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json",
    );
    const versions = await versionsRes.json();
    const latestVersion = versions[0];

    // 챔피언 목록 데이터 가져오기
    const championsRes = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`,
    );
    const championsData = await championsRes.json();

    // 데이터 변환
    const champions: Champion[] = Object.values(championsData.data).map(
      (champion: any) => ({
        id: champion.id,
        name: champion.name,
        title: champion.title,
        image: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`,
      }),
    );

    return NextResponse.json(champions);
  } catch (error) {
    return NextResponse.json(
      { message: "챔피언 데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
