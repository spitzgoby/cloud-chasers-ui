import { useState } from "react";
import { AirportTag } from "~/airportTag/airportTag";
import { airportGroups, airportThemeGroups, airports } from "~/data/stations";

const airportGroupOptions = [
  <option value="" disabled>
    Select an airport group
  </option>,
].concat(
  airportGroups.map(({ parentName, parentId }) => (
    <option key={`group-${parentId}`} value={`group.${parentId}`}>
      {parentName}
    </option>
  ))
);

const allAirportGroupOptions = airportGroupOptions.concat(
  airportThemeGroups.map(({ groupId, name }) => (
    <option key={`theme-${groupId}`} value={`theme.${groupId}`}>
      {name}
    </option>
  ))
);

export const AirportSelector = ({
  initialAirports,
  onClose,
  onUpdate,
  visible,
}: {
  initialAirports: string[];
  onClose: () => void;
  onUpdate: (airports: string[]) => void;
  visible: boolean;
}) => {
  const [filteredAirports, setFilteredAirports] = useState(() =>
    getAllAirportValues()
  );
  const [selectedAirports, setSelectedAirports] =
    useState<string[]>(initialAirports);

  return (
    <div>
      {visible && (
        <div className="bg-black/50 fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center">
          <div className="flex flex-col gap-2 justify-between relative rounded bg-white w-1/2 sm:w-full md:w-full lg:3/4 xl:w-1/2 p-8">
            <div className="flex justify-center">
              <h2 className="text-2xl font-bold">Select Markets</h2>
            </div>
            <div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <label className="font-bold">Quick Select</label>
                  <select
                    defaultValue=""
                    className="w-full md:w-1/2 px-4 py-2 border rounded-lg outline-none [&:invalid]:text-gray-400"
                    onChange={handleAirportGroupSelectorChange}
                    required
                  >
                    {allAirportGroupOptions}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="font-bold">Select</label>
                  <input
                    onChange={handleAirportFilterChange}
                    placeholder="Filter"
                    className="w-full md:w-1/2 px-4 py-2 border rounded-lg outline-none"
                  />
                </div>
                <div className="border rounded-lg max-h-48 overflow-y-auto scrollbar-hide">
                  {filteredAirports.map(renderAirportOption)}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <label className="font-bold">Selected Airports</label>
              <div className="flex flex-wrap gap-2">
              {selectedAirports.length > 0 &&
                selectedAirports.map((airport) => (
                  <AirportTag
                    airport={airport}
                    onRemoveAirport={handleAirportClick}
                  />
                ))}
                </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="border text-black rounded px-4 py-2 bg-white hover:bg-[#dde7ff] transition-color duration-200 hover:cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="border text-[#7f0c1b] rounded px-4 py-2 bg-white hover:bg-[#eea1ab] transition-color duration-200 hover:cursor-pointer"
                onClick={handleClearSelectedAirports}
              >
                Clear
              </button>
              <button
                className="text-black rounded px-4 py-2 bg-[#ffcb52] hover:bg-[#ffbf27] hover:cursor-pointer"
                onClick={() => onUpdate(selectedAirports)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function renderAirportOption({
    displayName,
    id,
  }: {
    displayName: string;
    id: string;
  }) {
    const isSelected = selectedAirports.includes(id);

    return (
      <div
        className={`flex justify-between p-2 cursor-pointer hover:bg-gray-100 ${isSelected ? "bg-[#dde7ff]" : ""}`}
        key={id}
        onClick={() => handleAirportClick(id)}
      >
        <div>{displayName}</div>
        <div>{isSelected && "Selected"}</div>
      </div>
    );
  }

  function handleClose() {
    setSelectedAirports(initialAirports);
    onClose();
  }

  function handleAirportGroupSelectorChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value } = event.target;
    let selectedAirports;

    const [type, id] = value.split(".");

    if (type === "group") {
      const group = airportGroups.find((group) => group.parentId === id);

      selectedAirports = group?.childAirportCodes ?? [];
    } else {
      const theme = airportThemeGroups.find((theme) => theme.groupId === id);

      selectedAirports = theme?.airports ?? [];
    }

    setSelectedAirports(selectedAirports);
  }

  function handleAirportClick(airportId: string) {
    if (selectedAirports.includes(airportId)) {
      setSelectedAirports(selectedAirports.filter((id) => id !== airportId));
    } else {
      setSelectedAirports([...selectedAirports, airportId]);
    }
  }

  function handleAirportFilterChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const filter = event.target.value.toLowerCase();

    if (event.target.value) {
      setFilteredAirports(
        airports.filter((airport) =>
          airport.displayName.toLowerCase().includes(filter)
        )
      );
    } else {
      setFilteredAirports(getAllAirportValues());
    }
  }

  function handleClearSelectedAirports() {
    setSelectedAirports([]);
  }

  function getAllAirportValues() {
    return airports.map(({ displayName, id }) => ({ displayName, id }));
  }
};
