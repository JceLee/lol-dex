// app/rotation/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Champion } from "@/types/Champion";
import { getChampionRotation } from "@/utils/riotApi";
import ChampionCard from "@/components/ChampionCard";

interface RotationData {
  freeChampions: Champion[];
  version: string;
}

export default function RotationPage() {
  const [rotationData, setRotationData] = useState<RotationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRotation() {
      try {
        const data: RotationData = await getChampionRotation();
        setRotationData(data);
      } catch (err) {
        console.log(err);
        setError("로테이션 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchRotation();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error || !rotationData) {
    return <div>{error || "데이터를 가져올 수 없습니다."}</div>;
  }

  const { freeChampions, version } = rotationData;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        챔피언 로테이션 (이번주 무료로 플레이 할 수 있어요!)
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {freeChampions.map((champion) => (
          <ChampionCard
            key={champion.id}
            champion={champion}
            version={version}
          />
        ))}
      </div>
    </div>
  );
}
