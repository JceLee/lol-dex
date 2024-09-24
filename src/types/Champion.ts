// types/Champion.ts
export interface Champion {
  id: string;
  key: string; // Riot API의 key는 문자열 형태지만, 숫자 ID와 매핑 시 사용됩니다.
  name: string;
  title: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

export interface ChampionDetail extends Champion {
  lore: string;
  tags: string[];
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  // 추가적인 필드는 필요에 따라 확장 가능합니다.
}
