import { useState } from "react";
import { useNavigate } from "react-router";
import { AirportSelector } from "~/airportSelector/airportSelector";
import { Input } from "~/input/input";

import type { ReferenceImage } from "~/input/input";
import { Interstitial } from "~/interstitial/interstitial";

export const Generator = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [airports, setAirports] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [showAirportSelector, setShowAirportSelector] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [referenceImages, setReferenceImages] = useState<ReferenceImage[]>([]);

  return (
    <div>
      <Input
        airports={airports}
        onAddAirportClick={handleAddAirportClick}
        onChange={handleCreateInputChange}
        onDeleteReferenceImage={handleDeleteReferenceImage}
        onRemoveAirport={handleRemoveAirport}
        onSubmitPrompt={handleSubmitPrompt}
        onUploadReferenceImage={handleReferenceImageUpload}
        placeholder="What do you want to create?"
        referenceImages={referenceImages}
        value={prompt}
      />
      <AirportSelector
        initialAirports={airports}
        onClose={handleAirportClose}
        onUpdate={handleAirportSelect}
        visible={showAirportSelector}
      />
      {errorMessage && (
        <div className="mt-8 p-8 bg-[#eea1ab] text-[#7f0c1b] relative w-full rounded flex justify-center items-center">
          <button
            className="absolute cursor-pointer top-2 right-4"
            onClick={() => setErrorMessage("")}
          >
            x
          </button>
          {errorMessage}
        </div>
      )}
      <Interstitial visible={showInterstitial} message="Generating images..." />
    </div>
  );

  function handleAddAirportClick() {
    setShowAirportSelector(true);
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
    setReferenceImages((referenceImages) =>
      referenceImages.filter((image) => image.imageId !== imageId)
    );
  }

  function handleRemoveAirport(airport: string) {
    setAirports((airports) => airports.filter((a) => a !== airport));
  }

  // make a change to force a redeploy
  async function handleSubmitPrompt() {
    setShowInterstitial(true);

    try {
      const apiUrl = import.meta.env.DEV 
        ? "/api/{proxy+}" 
        : "https://2oxmer2e7xpnc5dpofyczm5tri0xuxar.lambda-url.us-east-1.on.aws/";
      
      const response = await fetch(apiUrl, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          images: referenceImages.map(
            ({ imagePath }) => imagePath.split(",")[1]
          ),
          prompt,
          stations: airports,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        navigate("/review", { state: { data } });
      } else {
        setErrorMessage("Oops, something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Oops, something went wrong. Please try again.");
    }

    setShowInterstitial(false);
  }
};
