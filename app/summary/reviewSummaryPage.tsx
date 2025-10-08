import React from "react";

type AnnotatedItem = {
  img: string;
  title: string;
  description: string;
  secondaryDescription: string;
  ctaText: string;
  ctaLink: string;
};

export default function ReviewSummaryPage() {
  const [items, setItems] = React.useState<AnnotatedItem[] | null>(null);

  React.useEffect(() => {
    try {
      const raw = sessionStorage.getItem("submittedImages");
      if (raw) setItems(JSON.parse(raw));
    } catch {
      setItems(null);
    }
  }, []);

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-zinc-600">
        No submission found. Go back and fill in your images.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900">
        🎉 Confirmation
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it, idx) => (
          <article
            key={idx}
            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={it.img}
                alt={it.title || `Image ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-zinc-900">
                {it.title || `Image ${idx + 1}`}
              </h3>
              {it.description && (
                <p className="text-sm text-zinc-700">{it.description}</p>
              )}
              {it.secondaryDescription && (
                <p className="text-sm text-zinc-500 italic">
                  {it.secondaryDescription}
                </p>
              )}
              {it.ctaLink && (
                <a
                  href={it.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 rounded-md bg-sky-600 px-3 py-1 text-xs font-medium text-white hover:bg-sky-700"
                >
                  {it.ctaText || "Visit Link"}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <details className="mt-8 rounded-xl bg-zinc-100 p-4 shadow-inner">
        <summary className="cursor-pointer text-sm font-semibold text-sky-700">
          View Generated JSON
        </summary>
        <pre className="mt-3 text-xs text-zinc-700 overflow-x-auto whitespace-pre-wrap">
          {sessionStorage.getItem("generatedJSON")}
        </pre>
      </details>

      <a
        href="/review"
        className="mt-8 inline-block text-sky-600 underline hover:text-sky-700"
      >
        ← Edit submission
      </a>
    </div>
  );
}
