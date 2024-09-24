// app/champions/[id]/page.tsx
import { fetchChampionDetail } from "@/utils/serverApi";
import Image from "next/image";
import { Metadata } from "next";

interface ChampionDetailPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ChampionDetailPageProps): Promise<Metadata> {
  const champion = await fetchChampionDetail(params.id);
  return {
    title: champion
      ? `${champion.name} - My Riot App`
      : "챔피언 상세 정보 - My Riot App",
    description: champion ? champion.lore : "챔피언 상세 정보",
  };
}

export default async function ChampionDetailPage({
  params,
}: ChampionDetailPageProps) {
  const champion = await fetchChampionDetail(params.id);

  if (!champion) {
    return <div>챔피언을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">{champion.name}</h1>
      <h2 className="text-2xl text-gray-600 mb-4">{champion.title}</h2>
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.image.full}`}
        alt={champion.name}
        width={200}
        height={200}
        className="mx-auto"
      />
      <p className="mt-4">{champion.lore}</p>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">스탯</h3>
        <ul className="list-disc list-inside">
          <li>공격력: {champion.info.attack}</li>
          <li>방어력: {champion.info.defense}</li>
          <li>마법력: {champion.info.magic}</li>
          <li>난이도: {champion.info.difficulty}</li>
        </ul>
      </div>
    </div>
  );
}
