import React from "react";
import { useNavigate } from "react-router";
import SWButton from "../components/SWAButton";

export type AnnotatedItem = {
  img: string;
  title: string;
  description: string;
  secondaryDescription: string;
  ctaText: string;
  ctaLink: string;
};

type AnnotatedItemUI = AnnotatedItem & { selected: boolean };

export default function ImageAnnotator({ data }: { data: { img: string }[] }) {
  const navigate = useNavigate();
  const [items, setItems] = React.useState<AnnotatedItemUI[]>(
    data.map((d) => ({
      img: d.img,
      title: "",
      description: "",
      secondaryDescription: "",
      ctaText: "",
      ctaLink: "",
      selected: false,
    }))
  );

  const updateField = <K extends keyof AnnotatedItemUI>(
    index: number,
    field: K,
    value: AnnotatedItemUI[K]
  ) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const toggleSelected = (index: number) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], selected: !copy[index].selected };
      return copy;
    });
  };

  const selectedCount = items.filter((i) => i.selected).length;
  const canSubmit = selectedCount > 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedItems = items.filter((i) => i.selected);

    const payload: AnnotatedItem[] = items
      .filter((i) => i.selected)
      .map(({ selected, ...rest }) => rest);

      const now = Date.now();
  const generatedJSON = payload.map((it, idx) => ({
    modDate: now,
    index: "content-service-placements-idx-prodb-v20240529",
    contentBlockId: null,
    id: `auto-${idx}-${now}`,
    crDate: now,
    type: "special-offer",
    lang: "en",
    pubDate: now,
    expDate: null,
    content: {
      displayType: "special-offer",
      placement: {
        fullyClickable: true,
        text: {
          primaryText: {
            fontSize: "1.5rem",
            value: it.description || "",
            fontWeight: "bold",
          },
          secondaryText: {
            size: "medium",
            value: it.secondaryDescription || "",
          },
        },
        graphic: {
          altText: it.title || "Image asset",
          imagePath: it.img || "",
          breakpoints: true,
          width: "996px",
          height: "560px",
        },
        callToAction: {
          buttonType: "primary",
          text: it.ctaText || "",
          type: "button",
          target: it.ctaLink || "",
        },
      },
      placementData: {
        scaleFont: true,
      },
    },
    revision: 1,
  }));

    sessionStorage.setItem("submittedImages", JSON.stringify(payload));
  sessionStorage.setItem("generatedJSON", JSON.stringify(generatedJSON, null, 2));

    navigate("/reviewSummaryPage");
  };

  const selectAll = () =>
    setItems((prev) => prev.map((i) => ({ ...i, selected: true })));
  const clearAll = () =>
    setItems((prev) => prev.map((i) => ({ ...i, selected: false })));

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="text-sm text-zinc-600">
          Selected: <span className="font-medium text-zinc-900">{selectedCount}</span> / {items.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="rounded-lg border bg-white px-3 py-1.5 text-xs text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            Select all
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="rounded-lg border bg-white px-3 py-1.5 text-xs text-zinc-700 shadow-sm hover:bg-zinc-50"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((it, idx) => (
          <div key={idx} className="rounded-2xl border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <label className="flex items-center gap-2 text-sm text-zinc-800">
                <input
                  type="checkbox"
                  checked={it.selected}
                  onChange={() => toggleSelected(idx)}
                  className="h-4 w-4 accent-sky-600"
                />
                Select this option
              </label>
              {it.selected ? (
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                  Selected
                </span>
              ) : (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600">
                  Not selected
                </span>
              )}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={it.img}
                alt={`Image ${idx + 1}`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-3 p-4">
              <input
                type="text"
                value={it.title}
                onChange={(e) => updateField(idx, "title", e.target.value)}
                placeholder="Add a title…"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />

              <textarea
                value={it.description}
                onChange={(e) => updateField(idx, "description", e.target.value)}
                placeholder="Primary description…"
                rows={2}
                className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />

              <textarea
                value={it.secondaryDescription}
                onChange={(e) =>
                  updateField(idx, "secondaryDescription", e.target.value)
                }
                placeholder="Secondary description (optional)…"
                rows={2}
                className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />

              <input
                type="text"
                value={it.ctaText}
                onChange={(e) => updateField(idx, "ctaText", e.target.value)}
                placeholder="Call-to-action text (e.g., Learn More)"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />

              <input
                type="url"
                value={it.ctaLink}
                onChange={(e) => updateField(idx, "ctaLink", e.target.value)}
                placeholder="Call-to-action link (https://...)"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
              />
            </div>
          </div>
        ))}
      </div>

    <div
    className="sticky bottom-0 z-30 mt-8 flex items-center justify-end gap-3
                rounded-xl border bg-white/95 p-4 backdrop-blur
                opacity-100 visible"
    >
    {!canSubmit && (
        <span className="text-xs text-amber-600">
        Select at least one image to continue.
        </span>
    )}

    <SWButton
        type="submit"
        disabled={!canSubmit}
        className={[
        "inline-flex items-center justify-center",
        "rounded-xl px-5 py-2 text-sm font-semibold shadow",
        canSubmit
            ? "bg-sky-600 text-white hover:bg-sky-700"
            : "bg-zinc-300 text-white cursor-not-allowed",
        // make sure it's never accidentally hidden:
        "opacity-100 !visible"
        ].join(" ")}
    >
        Submit
    </SWButton>
    </div>
    </form>
  );
}
