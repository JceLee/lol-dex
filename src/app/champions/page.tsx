// app/champions/page.tsx

import { getChampionList } from "@/utils/riotApi";
import ChampionCard from "@/components/ChampionCard";

export const revalidate = 86400; // ISR 재검증 시간 설정 (하루)

export default async function ChampionsPage() {
  const champions = await getChampionList();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">챔피언 목록</h1>
      <div className="grid grid-cols-4 gap-4">
        {champions.map((champion) => (
          <ChampionCard key={champion.id} champion={champion} />
        ))}
      </div>
    </div>
  );
}
