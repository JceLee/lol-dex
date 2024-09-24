// app/api/rotation/route.ts
import { NextResponse } from "next/server";
import { ChampionRotation } from "@/types/ChampionRotation";
import { fetchChampionList, fetchLatestVersion } from "@/utils/serverApi";

export async function GET() {
  const apiKey = process.env.RIOT_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API 키가 설정되지 않았습니다." });
  }

  try {
    const response = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": apiKey,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Riot API 호출에 실패했습니다." });
    }

    const data: ChampionRotation = await response.json();

    // 챔피언 목록과 최신 버전을 가져옵니다.
    const [champions, version] = await Promise.all([
      fetchChampionList(),
      fetchLatestVersion(),
    ]);

    // freeChampionIds를 기반으로 챔피언 상세 정보를 매핑합니다.
    const freeChampions = champions.filter((champion) =>
      data.freeChampionIds.includes(parseInt(champion.key)),
    );

    return NextResponse.json({ freeChampions, version });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 에러가 발생했습니다." });
  }
}
