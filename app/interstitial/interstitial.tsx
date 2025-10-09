export const Interstitial = ({ message, visible }: { message: string, visible: boolean }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-6 flex justify-center">
          <div className="h-12 w-12 animate-spin-slow rounded-full border-4 border-sky-200 border-t-sky-600"></div>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-zinc-900">Please wait</h2>
        <p className="text-sm text-zinc-600">{message}</p>
      </div>
    </div>
  );
}