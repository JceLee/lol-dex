// app/champions/page.tsx

import ChampionCard from "@/components/ChampionCard";
import { fetchChampionList, fetchLatestVersion } from "@/utils/serverApi";

export const revalidate = 86400; // ISR 재검증 시간 설정 (하루)

export default async function ChampionsPage() {
  try {
    // 챔피언 목록과 최신 버전을 동시에 가져옵니다.
    const [champions, version] = await Promise.all([
      fetchChampionList(),
      fetchLatestVersion(),
    ]);

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">챔피언 목록</h1>
        <div className="grid grid-cols-4 gap-4">
          {champions.map((champion) => (
            <ChampionCard
              key={champion.id}
              champion={champion}
              version={version}
            />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>챔피언 데이터를 가져오는 데 실패했습니다.</div>;
  }
}
