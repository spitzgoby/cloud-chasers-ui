export const Interstitial = ({ message, visible }: { message: string, visible: boolean }) => {
  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ${visible ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Please wait...</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}