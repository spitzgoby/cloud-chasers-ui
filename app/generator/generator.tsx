import { useState } from "react";
import { Input } from "~/input/input";

import type { ReferenceImage } from "~/input/input";

export const Generator = () => {
  const [value, setValue] = useState("");
  const [referenceImages, setReferenceImages] = useState<ReferenceImage[]>([]);

  return (
    <Input 
      onChange={handleCreateInputChange} 
      onDeleteReferenceImage={handleDeleteReferenceImage}
      onUploadReferenceImage={handleReferenceImageUpload}
      placeholder="What do you want to create?"
      referenceImages={referenceImages}
      value={value}
    />
  );

  function handleReferenceImageUpload(image: ReferenceImage) {
    setReferenceImages((referenceImages) => [...referenceImages, image]); 
  }

  function handleCreateInputChange(value: string) {
    setValue(value);
  }

  function handleDeleteReferenceImage(imageId: string) {
    setReferenceImages((referenceImages) => referenceImages.filter((image) => image.imageId !== imageId));
  }
};
