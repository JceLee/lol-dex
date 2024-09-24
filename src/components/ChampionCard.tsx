// components/ChampionCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Champion } from "@/types/Champion";

interface ChampionCardProps {
  champion: Champion;
  version: string;
}

export default function ChampionCard({ champion, version }: ChampionCardProps) {
  return (
    <Link
      href={`/champions/${champion.id}`}
      className="border rounded p-4 hover:shadow-lg"
    >
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`}
        alt={champion.name}
        width={100}
        height={100}
        className="mx-auto"
      />
      <h2 className="mt-2 text-xl font-semibold">{champion.name}</h2>
      <p className="text-gray-500">{champion.title}</p>
    </Link>
  );
}
