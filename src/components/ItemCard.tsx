// components/ItemCard.tsx

import React from "react";
import { Item } from "@/types/Item";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps) {
  const { name, description, image, gold } = item;

  return (
    <div className="border border-[#E8E8E8] p-2 flex justify-start items-center flex-col  gap-2 max-h-[400px] overflow-auto ">
      <img src={image.full} alt={name} className="w-[64px] h-[64px]" />
      <h2 className="text-center">{name}</h2>
      <p className="text-[#53be81]">
        <strong>가격:</strong> {gold.total}
      </p>
      <p className="text-[#53be81]">
        <strong>팔떄:</strong> {gold.sell}
      </p>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="text-fuchsia-300"
      />
    </div>
  );
}
