// types/Item.ts

export interface Item {
  id: string;
  name: string;
  description: string;
  image: string; // 이미지 URL
  gold: {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
  };
  stats: {
    [key: string]: number;
  };
}
