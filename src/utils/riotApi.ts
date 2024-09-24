// utils/riotApi.ts

import { Champion, ChampionDetail } from "@/types/Champion";
import { Item } from "@/types/Item";
import { ChampionRotation } from "@/types/ChampionRotation";

const HOST = process.env.NEXT_PUBLIC_HOST;

let idToChampionMapCache: { [key: string]: string } | null = null;

export async function getChampionList(): Promise<Champion[]> {
  const response = await fetch(`${HOST}/api/champions`);
  if (!response.ok) {
    throw new Error("챔피언 목록을 가져오는 중 오류가 발생했습니다.");
  }
  return response.json();
}

export async function getIdToChampionMap(): Promise<{ [key: string]: string }> {
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

  // ID와 챔피언 이름 매핑
  const idToChampionMap: { [key: string]: string } = {};

  Object.values(championsData.data).forEach((champion: any) => {
    idToChampionMap[champion.key] = champion.id;
  });

  return idToChampionMap;
}

export async function getChampionById(id: string): Promise<ChampionDetail> {
  // 숫자 ID를 챔피언 이름으로 변환
  let championName = id;

  // ID가 숫자인 경우
  if (!isNaN(Number(id))) {
    const idToChampionMap = await getIdToChampionMap();
    championName = idToChampionMap[id];

    if (!championName) {
      throw new Error("유효하지 않은 챔피언 ID입니다.");
    }
  }

  // 버전 정보 가져오기
  const versionsRes = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
  );
  const versions = await versionsRes.json();
  const latestVersion = versions[0];

  // 챔피언 상세 정보 가져오기
  const response = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion/${championName}.json`,
  );

  if (!response.ok) {
    throw new Error("챔피언 정보를 가져오는 중 오류가 발생했습니다.");
  }

  const championData = await response.json();
  const championInfo = championData.data[championName];

  // 데이터 변환
  const championDetail: ChampionDetail = {
    id: championInfo.id,
    name: championInfo.name,
    title: championInfo.title,
    image: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championInfo.image.full}`,
    lore: championInfo.lore,
    abilities: championInfo.spells.map((spell: any) => ({
      name: spell.name,
      description: spell.description,
      image: `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/spell/${spell.image.full}`,
    })),
    stats: championInfo.stats,
  };

  return championDetail;
}

export async function getItemList(): Promise<Item[]> {
  const response = await fetch(`${HOST}/api/items`);
  if (!response.ok) {
    throw new Error("아이템 목록을 가져오는 중 오류가 발생했습니다.");
  }
  return response.json();
}

export async function getChampionRotation(): Promise<Champion[]> {
  const response = await fetch("/api/rotation");

  if (!response.ok) {
    throw new Error("챔피언 로테이션 정보를 가져오는 중 오류가 발생했습니다.");
  }
  const rotationData: ChampionRotation = await response.json();
  const championIds = rotationData.freeChampionIds;

  // 챔피언 상세 정보 가져오기
  const championPromises = championIds.map((id) =>
    getChampionById(id.toString()),
  );
  return Promise.all(championPromises);
}
