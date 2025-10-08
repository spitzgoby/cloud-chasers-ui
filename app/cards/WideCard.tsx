import React from "react";

import { safeImg } from "./sharedCard";
import type { CardItem } from "./sharedCard";

export default function WideCard({ item }: { item: CardItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[21/9] overflow-hidden">
        <img
          src={safeImg(item.img, item.title)}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-zinc-900">{item.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {item.metaData.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-zinc-50 px-2 py-1 text-[11px] text-zinc-700 ring-1 ring-inset ring-zinc-200">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
