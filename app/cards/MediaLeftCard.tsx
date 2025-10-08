import React from "react";

import { safeImg } from "./sharedCard";
import type { CardItem } from "./sharedCard";

export default function MediaLeftCard({ item }: { item: CardItem }) {
  return (
    <article
      className="grid items-center gap-5 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md
                 grid-cols-1 sm:grid-cols-[180px_1fr]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <img
          src={safeImg(item.img, item.title)}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <h3 className="line-clamp-2 text-base font-semibold text-zinc-900">{item.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-600">Reduce noise and keep focus with practical steps…</p>
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
