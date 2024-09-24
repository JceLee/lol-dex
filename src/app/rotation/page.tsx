// app/rotation/page.tsx

"use client";

import { useEffect, useState } from "react";
import { getChampionRotation } from "@/utils/riotApi";
import ChampionCard from "@/components/ChampionCard";
import { Champion } from "@/types/Champion";

export default function RotationPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRotation() {
      try {
        const data = await getChampionRotation();
        setChampions(data);
      } catch (error) {
        console.error("로테이션 정보를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchRotation();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">이번 주 무료 챔피언</h1>
      <div className="grid grid-cols-4 gap-4">
        {champions.map((champion) => (
          <ChampionCard key={champion.id} champion={champion} />
        ))}
      </div>
    </div>
  );
}
