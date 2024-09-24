// app/api/champions/[id]/route.ts

import { NextResponse } from "next/server";
import { Ability, ChampionDetail } from "@/types/Champion";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const { id } = params;

  try {
    // 버전 정보 가져오기
    const versionsRes = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json",
    );
    const versions = await versionsRes.json();
    const latestVersion = versions[0];

    // 챔피언 상세 정보 가져오기
    const championRes = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion/${id}.json`,
    );
    const championData = await championRes.json();

    if (!championData.data[id]) {
      return NextResponse.json({ message: "존재하지 않는 챔피언입니다." });
    }

    const championInfo = championData.data[id];

    // 데이터 변환
    const championDetail: ChampionDetail = {
      id: championInfo.id,
      name: championInfo.name,
      title: championInfo.title,
      image: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championInfo.image.full}`,
      lore: championInfo.lore,
      abilities: championInfo.spells.map((spell: Ability) => ({
        name: spell.name,
        description: spell.description,
        image: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${spell.image.full}`,
      })),
      stats: championInfo.stats,
    };

    return NextResponse.json(championDetail);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({
      message: "챔피언 정보를 가져오는 중 오류가 발생했습니다.",
    });
  }
}
