// app/api/rotation/route.ts

import { NextResponse } from "next/server";
import { ChampionRotation } from "@/types/ChampionRotation";

export async function GET() {
  const RIOT_API_KEY = process.env.RIOT_API_KEY;

  if (!RIOT_API_KEY) {
    return NextResponse.json(
      { message: "RIOT_API_KEY가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "챔피언 로테이션 데이터를 가져오는 중 오류가 발생했습니다.",
        },
        { status: response.status },
      );
    }

    const rotationData: ChampionRotation = await response.json();

    return NextResponse.json(rotationData);
  } catch (error) {
    return NextResponse.json(
      { message: "챔피언 로테이션 데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
