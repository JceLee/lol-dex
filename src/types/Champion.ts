// types/Champion.ts

export interface Champion {
  id: string;
  name: string;
  title: string;
  image: string; // 이미지 URL
}

export interface ChampionDetail extends Champion {
  lore: string;
  abilities: Ability[];
  stats: Stats;
}

interface Ability {
  name: string;
  description: string;
  image: string;
}

interface Stats {
  [key: string]: number;
}
