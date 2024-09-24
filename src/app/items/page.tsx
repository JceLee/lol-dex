// app/items/page.tsx
import { fetchItemList } from "@/utils/serverApi";
import Image from "next/image";

export default async function ItemsPage() {
  const items = await fetchItemList();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">아이템 목록</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded p-4 hover:shadow-lg">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${item.image.full}`}
              alt={item.name}
              width={100}
              height={100}
              className="mx-auto"
            />
            <h2 className="mt-2 text-xl font-semibold">{item.name}</h2>
            <p className="text-gray-500">{item.plaintext}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
