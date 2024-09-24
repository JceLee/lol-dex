// app/items/page.tsx

import { getItemList } from "@/utils/riotApi";
import ItemCard from "@/components/ItemCard";

export default async function ItemsPage() {
  const items = await getItemList();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">아이템 목록</h1>
      <div className="grid grid-cols-6 gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
