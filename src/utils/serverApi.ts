// utils/serverApi.ts
import { Champion, ChampionDetail } from "@/types/Champion";
import { Item } from "@/types/Item";

const DATA_DRAGON_VERSIONS_URL =
  "https://ddragon.leagueoflegends.com/api/versions.json";

export async function fetchLatestVersion(): Promise<string> {
  const res = await fetch(DATA_DRAGON_VERSIONS_URL);
  const versions: string[] = await res.json();
  return versions[0];
}

export async function fetchChampionList(): Promise<Champion[]> {
  try {
    const version = await fetchLatestVersion();
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`,
    );

    if (!res.ok) {
      throw new Error("챔피언 목록을 가져오는 데 실패했습니다.");
    }

    const data = await res.json();
    const champions: Champion[] = Object.values(data.data).map(
      (champ: any) => ({
        id: champ.id,
        key: champ.key,
        name: champ.name,
        title: champ.title,
        image: champ.image,
      }),
    );

    return champions;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function fetchChampionDetail(
  id: string,
): Promise<ChampionDetail | null> {
  try {
    const version = await fetchLatestVersion();
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion/${id}.json`,
    );

    if (!res.ok) {
      throw new Error("챔피언 상세 정보를 가져오는 데 실패했습니다.");
    }

    const data = await res.json();
    const champData = data.data[id];

    const championDetail: ChampionDetail = {
      id: champData.id,
      key: champData.key,
      name: champData.name,
      title: champData.title,
      image: champData.image,
      lore: champData.lore,
      tags: champData.tags,
      info: champData.info,
    };

    return championDetail;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchItemList(): Promise<Item[]> {
  try {
    const version = await fetchLatestVersion();
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/item.json`,
    );

    if (!res.ok) {
      throw new Error("아이템 목록을 가져오는 데 실패했습니다.");
    }

    const data = await res.json();
    const items: Item[] = Object.values(data.data).map((item: any) => ({
      id: parseInt(item.id),
      name: item.name,
      description: item.description,
      plaintext: item.plaintext,
      gold: item.gold,
      image: item.image,
    }));

    return items;
  } catch (error) {
    console.error(error);
    return [];
  }
}
