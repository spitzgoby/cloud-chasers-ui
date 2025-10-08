import React from "react";

import { safeImg } from "./sharedCard";
import type { CardItem } from "./sharedCard";

export default function FeatureCard({ item }: { item: CardItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={safeImg(item.img, item.title)}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900">{item.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
          Learn practical strategies to build and review creative ideas. From concept to execution, keep momentum…
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.metaData.map((t) => (
            <span
              key={t}
              className="rounded-md bg-zinc-50 px-2 py-1 text-[11px] text-zinc-700 ring-1 ring-inset ring-zinc-200"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
