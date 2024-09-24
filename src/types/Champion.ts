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

export interface Ability {
  // Ability 인터페이스 추가
  name: string;
  description: string;
  image: {
    full: string;
  };
}

export interface Stats {
  // Stats 인터페이스 추가
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}

// types/Champion.ts

export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface ImageInfo {
  [key: string]: string | number;
}

export interface ChampionStats {
  [key: string]: string;
}

export interface ChampionData {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  image: ImageInfo;
  tags: string[];
  partype: string;
  stats: ChampionStats;
}
