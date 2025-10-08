import { useSearchParams } from "react-router-dom"; // or from "@remix-run/react"

export default function Summary() {
  const [params] = useSearchParams();
  const selected = params.get("selected");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 text-center p-8">
      <h1 className="text-2xl font-semibold text-zinc-900 mb-4">🎉 Confirmation</h1>
      {selected ? (
        <p className="text-zinc-700">
          You selected <span className="font-medium text-sky-600">{selected}</span> layout.
        </p>
      ) : (
        <p className="text-zinc-500">No layout selected.</p>
      )}
      <a href="/review" className="mt-6 text-sky-600 underline hover:text-sky-700">
        ← Go back
      </a>
    </div>
  );
}
