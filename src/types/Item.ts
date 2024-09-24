export interface Item {
  id: string;
  name: string;
  description: string;
  image: { full: string };
  gold: {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
  };
  stats: Record<string, number>;
}

export interface ItemType {
  id: string;
  name: string;
  description: string;
  image: string;
  gold: {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
  };
  stats: Record<string, number>;
}
