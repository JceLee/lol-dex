// types/Item.ts
export interface Item {
  id: number;
  name: string;
  description: string;
  plaintext: string;
  gold: {
    base: number;
    total: number;
    sell: number;
    purchasable: boolean;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  // 추가적인 필드는 필요에 따라 확장 가능합니다.
}
