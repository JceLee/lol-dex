// app/api/items/route.ts

import { NextResponse } from "next/server";
import { Item } from "@/types/Item";

export async function GET() {
  try {
    // 버전 정보 가져오기
    const versionsRes = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json",
    );
    const versions = await versionsRes.json();
    const latestVersion = versions[0];

    // 아이템 목록 데이터 가져오기
    const itemsRes = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item.json`,
    );
    const itemsData = await itemsRes.json();

    // 데이터 변환
    const items: Item[] = Object.entries(itemsData.data).map(
      ([id, item]: any) => ({
        id,
        name: item.name,
        description: item.description,
        image: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${item.image.full}`,
        gold: item.gold,
        stats: item.stats,
      }),
    );

    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { message: "아이템 데이터를 가져오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
