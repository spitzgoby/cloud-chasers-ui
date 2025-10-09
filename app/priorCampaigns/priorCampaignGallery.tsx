import * as React from "react";
import { Interstitial } from "../interstitial/interstitial";

type Item = { img: string; alt: string; jsonUrl?: string };

export default function PriorCampaignGallery() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [showInterstitial, setShowInterstitial] = React.useState(false);
  const [interstitialMsg, setInterstitialMsg] = React.useState("Loading previous campaigns…");

  // --- Carousel state ---
  const PAGE_SIZE = 6; // show 6 images per “slide” (2x3, adjusts nicely)
  const [page, setPage] = React.useState(0);

  const apiUrl = React.useMemo(
    () =>
      import.meta.env.DEV
        ? "/api/return_confirmed" // Vite proxy -> /dev/return_confirmed
        : "https://pf3w7890x3.execute-api.us-east-1.amazonaws.com/dev/return_confirmed",
    []
  );

  const toProxy = (url: string) =>
    url.replace("https://cloudchasers-image-bucket.s3.amazonaws.com", "/s3");

  const getBaseKey = (url: string) => {
    try {
      const u = new URL(url);
      const file = (u.pathname.split("/").pop() || "").toLowerCase();
      return file.replace(/\.(json|webp|png|jpg|jpeg)$/i, "");
    } catch {
      return url.toLowerCase();
    }
  };

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    setShowInterstitial(true);
    setInterstitialMsg("Loading previous campaigns…");
    setPage(0);

    try {
      // 1) fetch list of confirmed assets
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ return_confirmed: "A" }),
      });
      const text = await res.text();
      if (!res.ok) throw new Error(`API ${res.status}: ${text || res.statusText}`);

      const data = JSON.parse(text) as { confirmed_images?: string[] };
      const list = Array.isArray(data.confirmed_images) ? data.confirmed_images : [];

      // 2) pair .json with image by basename
      type Pair = { json?: string; img?: string };
      const pairs = new Map<string, Pair>();
      for (const url of list) {
        const key = getBaseKey(url);
        const entry = pairs.get(key) || {};
        const lower = url.toLowerCase();
        if (lower.endsWith(".json")) entry.json = url;
        else if (/\.(webp|png|jpg|jpeg)$/.test(lower)) entry.img = url;
        pairs.set(key, entry);
      }

      // 3) build items: only keep ones with a json partner
      const built: Item[] = [];
      for (const [, pair] of pairs) {
        if (!pair.json) continue;

        // choose provided image or synthesize path next to JSON
        let img = pair.img || "";
        if (!img && pair.json) {
          const u = new URL(pair.json);
          const base = (u.pathname.split("/").pop() || "").replace(/\.json$/i, "");
          img = `${u.origin}${u.pathname.replace(/[^/]+$/, "")}${base}.webp`;
        }
        if (!img) continue;

        built.push({
          img,
          alt: "Campaign image",
          jsonUrl: pair.json,
        });
      }

      setItems(built);
    } catch (e: any) {
      setError(e?.message || "Failed to load previous campaigns.");
      setItems([]);
    } finally {
      setLoading(false);
      setShowInterstitial(false);
    }
  }, [apiUrl]);

  React.useEffect(() => {
    load();
  }, [load]);

  // derived carousel values
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages - 1);
  const start = clampedPage * PAGE_SIZE;
  const currentSlice = items.slice(start, start + PAGE_SIZE);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));
  const goTo = (p: number) => setPage(Math.min(totalPages - 1, Math.max(0, p)));

  // keyboard arrows for convenience
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [totalPages]);

  if (loading) {
    return (
      <>
        <div className="min-h-[40vh]" />
        <Interstitial visible={showInterstitial} message={interstitialMsg} />
      </>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
        <button
          onClick={load}
          className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[50vh] grid place-items-center text-zinc-600">
        No campaigns found.
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-zinc-900">Previous Campaigns</h1>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={clampedPage === 0}
                className={[
                  "rounded-lg border px-3 py-1.5 text-sm",
                  clampedPage === 0
                    ? "cursor-not-allowed border-zinc-200 text-zinc-400"
                    : "border-zinc-300 text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
                aria-label="Previous"
              >
                ◀
              </button>
              <span className="text-sm text-zinc-600">
                Page <strong>{clampedPage + 1}</strong> / {totalPages}
              </span>
              <button
                onClick={goNext}
                disabled={clampedPage === totalPages - 1}
                className={[
                  "rounded-lg border px-3 py-1.5 text-sm",
                  clampedPage === totalPages - 1
                    ? "cursor-not-allowed border-zinc-2 00 text-zinc-400"
                    : "border-zinc-300 text-zinc-700 hover:bg-zinc-50",
                ].join(" ")}
                aria-label="Next"
              >
                ▶
              </button>
            </div>
          )}
        </div>

        {/* “Slide” content = a grid of PAGE_SIZE images */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentSlice.map((it, idx) => (
            <article
              key={`${clampedPage}-${idx}-${it.img}`}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >
              <a href={it.jsonUrl} target="_blank" rel="noopener noreferrer" className="block">
                <div className="aspect-[4/3]">
                  <img
                    src={it.img}
                    alt={it.alt}
                    className="block h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </a>

              {it.jsonUrl && (
                <div className="p-4 text-xs text-zinc-500">
                  <a
                    href={it.jsonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-zinc-700"
                  >
                    Open JSON
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Dots */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full border transition",
                  i === clampedPage
                    ? "border-sky-600 bg-sky-600"
                    : "border-zinc-300 bg-zinc-200 hover:bg-zinc-300",
                ].join(" ")}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <Interstitial visible={showInterstitial} message={interstitialMsg} />
    </>
  );
}
