// app/champions/[id]/page.tsx

import { getChampionById } from "@/utils/riotApi";
import Image from "next/image";

interface Params {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Params) {
  const champion = await getChampionById(params.id);
  return {
    title: `${champion.name} - 리그 오브 레전드`,
    description: champion.title,
  };
}

export default async function ChampionDetailPage({ params }: Params) {
  const { id } = params;
  const champion = await getChampionById(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{champion.name}</h1>
      <h2 className="text-xl font-bold mb-4 text-red-300">{champion.title}</h2>
      <Image
        src={champion.image}
        alt={champion.name}
        width={240}
        height={240}
      />
      <p className="mt-4 text-gray-500">{champion.lore}</p>
      <p className="mt-10 mb-4 text-red-300 text-xl">{`${champion.name}의 스킬`}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {champion.abilities.map((ability, index) => (
          <div key={index} className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-2">{ability.name}</h3>
            <Image
              src={ability.image as unknown as string}
              alt={ability.name}
              width={64}
              height={64}
              className="mb-2"
            />
            <p>{ability.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
