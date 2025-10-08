export const AirportTag = ({ airport, onRemoveAirport }: { airport: string, onRemoveAirport: (airport: string) => void }) => {
  return (
    <div className="p-2 rounded bg-[#dde7ff]">
      {airport}{" "}
      <button
        className="cursor-pointer"
        onClick={() => handleRemoveAirportClick()}
      >
        x
      </button>
    </div>
  );

  function handleRemoveAirportClick() {
    onRemoveAirport(airport);
  }
};
