import { RemoveIcon } from "~/icons";

export const AirportTag = ({ airport, onRemoveAirport }: { airport: string, onRemoveAirport: (airport: string) => void }) => {
  return (
    <div className="p-2 flex items-center gap-2 shadow-sm rounded bg-[#dde7ff]">
      {airport}{" "}
      <button
        className="cursor-pointer"
        onClick={() => handleRemoveAirportClick()}
        title="Remove airport"
      >
        <RemoveIcon />
      </button>
    </div>
  );

  function handleRemoveAirportClick() {
    onRemoveAirport(airport);
  }
};
