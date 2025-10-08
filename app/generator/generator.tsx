import { useState } from "react";
import { AirportSelector } from "~/airportSelector/airportSelector";
import { Input } from "~/input/input";

import type { ReferenceImage } from "~/input/input";

export const Generator = () => {
  const [prompt, setPrompt] = useState("");
  const [airports, setAirports] = useState<string[]>([]);
  const [showAirportSelector, setShowAirportSelector] = useState(false);
  const [referenceImages, setReferenceImages] = useState<ReferenceImage[]>([]);

  return (
    <div>
      <Input 
        airports={airports}
        onAddAirportClick={handleAddAirportClick}
        onChange={handleCreateInputChange} 
        onDeleteReferenceImage={handleDeleteReferenceImage}
        onRemoveAirport={handleRemoveAirport}
        onUploadReferenceImage={handleReferenceImageUpload}
        placeholder="What do you want to create?"
        referenceImages={referenceImages}
        value={prompt}
      />
      <AirportSelector initialAirports={airports} onClose={handleAirportClose} onUpdate={handleAirportSelect} visible={showAirportSelector} />
    </div>
  );

  function handleAddAirportClick() {
    setShowAirportSelector(true)
  }

  function handleAirportClose() {
    setShowAirportSelector(false);
  }

  function handleAirportSelect(airports: string[]) {
    setAirports(airports);
    setShowAirportSelector(false);
  }

  function handleReferenceImageUpload(image: ReferenceImage) {
    setReferenceImages((referenceImages) => [...referenceImages, image]); 
  }

  function handleCreateInputChange(value: string) {
    setPrompt(value);
  }

  function handleDeleteReferenceImage(imageId: string) {
    setReferenceImages((referenceImages) => referenceImages.filter((image) => image.imageId !== imageId));
  }

  function handleRemoveAirport(airport: string) {
    setAirports((airports) => airports.filter((a) => a !== airport));
  }
};
