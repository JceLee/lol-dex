// components/ChampionCard.tsx

import { Champion } from "@/types/Champion";
import Image from "next/image";
import Link from "next/link";

interface ChampionCardProps {
  champion: Champion;
}

export default function ChampionCard({ champion }: ChampionCardProps) {
  return (
    <Link href={`/champions/${champion.id}`}>
      <div className="border p-4 rounded hover:shadow-lg flex flex-col gap-2 justify-center items-center">
        <Image
          src={champion.image}
          alt={champion.name}
          width={200}
          height={200}
        />
        <h2 className="text-xl mt-2">{champion.name}</h2>
        <p className="text-gray-500">{champion.title}</p>
      </div>
    </Link>
  );
}
