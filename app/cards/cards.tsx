import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { ClassicCard, FeatureCard, MediaLeftCard, WideCard, type CardItem, cx } from "./index";

const demoData: CardItem[] = [
  {
    title: "World Cup Bold",
    img: "https://www.dallasfwc26.com/wp-content/uploads/2025/04/8_OFFICIAL-POSTER-1350x2048.jpg",
    metaData: ["soccer", "fifa", "dallas"],
  },
  {
    title: "World Cup cartoon",
    img: "https://i0.wp.com/roughdraftatlanta.com/wp-content/uploads/2025/03/FIFA-World-Cup-Atlanta-Poster.jpg?w=1200&ssl=1",
    metaData: ["soccer", "fifa", "cartoon", "atlanta"],
  },
  {
    title: "World Cup star",
    img: "https://s.yimg.com/ny/api/res/1.2/boGyuwLO1m27MZ64gXveKw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2MDA7aD05MDA7cT01MDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2025-03/9e5a2760-0501-11f0-bbef-6709345b9786",
    metaData: ["soccer", "fifa", "star", "player"],
  },
    {
    title: "World Cup dreamy",
    img: "https://e9jn6jeo54q.exactdn.com/app/uploads/2025/04/Poster-scaled.jpg?strip=all&lossy=0&ssl=1",
    metaData: ["soccer", "fifa", "dallas"],
  },
  {
    title: "World Cup cartoon",
    img: "https://i0.wp.com/roughdraftatlanta.com/wp-content/uploads/2025/03/FIFA-World-Cup-Atlanta-Poster.jpg?w=1200&ssl=1",
    metaData: ["soccer", "fifa", "cartoon", "atlanta"],
  },
  {
    title: "World Cup star",
    img: "https://s.yimg.com/ny/api/res/1.2/boGyuwLO1m27MZ64gXveKw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2MDA7aD05MDA7cT01MDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2025-03/9e5a2760-0501-11f0-bbef-6709345b9786",
    metaData: ["soccer", "fifa", "star", "player"],
  }
];

function TagPill({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition",
        active ? "border-sky-500 bg-sky-100 text-sky-700" : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100"
      )}
    >
      #{label}
      {active && <span className="ml-1">×</span>}
    </button>
  );
}

function Selectable({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "w-full text-left rounded-2xl transition",
        selected ? "ring-2 ring-sky-500 shadow-lg" : "ring-1 ring-transparent hover:ring-sky-100",
        className
      )}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
}

export default function Cards({ data = demoData }: { data?: CardItem[] }) {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const pageSize = 3;
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  const allTags = useMemo(() => {
    const s = new Set<string>();
    data.forEach((d) => d.metaData.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((d) => {
      const matchesQuery = !query
        ? true
        : [d.title, ...d.metaData].join(" ").toLowerCase().includes(query.toLowerCase());
      const matchesTags = activeTags.length === 0 || activeTags.every((t) => d.metaData.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [data, query, activeTags]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  React.useEffect(() => {
    setPage(0);
  }, [query, activeTags]);

  const [first, second, third] = pageItems;
  const rest = filtered.slice(start + pageSize); 

  const toggleTag = (t: string) =>
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const prev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
  const next = () => setPage((p) => (p + 1) % totalPages);

  const confirm = () => {
    if (!selected) return;
    navigate(`/confirmation?selected=${encodeURIComponent(selected)}`);
  };

  const touch = React.useRef<{ x: number | null }>({ x: null });
  const onTouchStart = (e: React.TouchEvent) => (touch.current.x = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touch.current.x == null) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    if (dx > 50) prev();
    if (dx < -50) next();
    touch.current.x = null;
  };

  return (
    <div className="mx-auto max-w-6xl p-6 bg-zinc-50">
      {/* Controls */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Search by title or tag…"
            className="w-full rounded-xl border border-zinc-200 bg-white py-2 px-3 text-sm outline-none ring-0 placeholder:text-zinc-400 focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
          />
        </div>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-500">Filters:</span>
          {allTags.map((t) => (
            <TagPill key={t} label={t} active={activeTags.includes(t)} onClick={() => toggleTag(t)} />
          ))}
          {activeTags.length > 0 && (
            <button
              onClick={() => setActiveTags([])}
              className="ml-auto text-xs text-zinc-600 underline underline-offset-4 hover:text-zinc-900"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div
        className="select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide content: trio layout */}
        <div className="lg:flex lg:items-start lg:gap-6">
          <div className="lg:w-2/3">
            {first && (
              <Selectable selected={selected === first.title} onClick={() => setSelected(first.title)}>
                <FeatureCard item={first} />
              </Selectable>
            )}
          </div>
          <div className="mt-6 flex flex-col gap-6 lg:mt-0 lg:w-1/3">
            {second && (
              <Selectable selected={selected === second.title} onClick={() => setSelected(second.title)}>
                <MediaLeftCard item={second} />
              </Selectable>
            )}
            {third && (
              <Selectable selected={selected === third.title} onClick={() => setSelected(third.title)}>
                <WideCard item={third} />
              </Selectable>
            )}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            className="rounded-lg border bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            ← Prev
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={cx(
                  "h-2 w-2 rounded-full",
                  i === safePage ? "bg-sky-600" : "bg-zinc-300 hover:bg-zinc-400"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="rounded-lg border bg-white px-4 py-2 text-sm text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Confirm bar */}
      <div className="sticky bottom-0 mt-8 flex items-center justify-end gap-3 rounded-xl border bg-white/80 p-4 backdrop-blur">
        <span className="text-sm text-zinc-600">
          {selected ? (
            <>
              Selected: <span className="font-medium text-zinc-900">{selected}</span>
            </>
          ) : (
            "Select a card to continue"
          )}
        </span>
        <button
          onClick={confirm}
          disabled={!selected}
          className={cx(
            "rounded-xl px-5 py-2 text-sm font-semibold text-white transition",
            selected ? "bg-sky-600 hover:bg-sky-700" : "bg-zinc-300 cursor-not-allowed"
          )}
        >
          Confirm
        </button>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed p-10 text-center text-sm text-zinc-500">
          No results. Try removing some filters.
        </div>
      )}
    </div>
  );
}
