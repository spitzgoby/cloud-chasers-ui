import { useState } from "react";
import { Input } from "~/input/input";

export const Generator = () => {
  const [value, setValue] = useState("");

  return (
    <Input 
      onChange={handleCreateInputChange} 
      onFileUpload={handleFileUpload}
      placeholder="What do you want to create?" 
    />
  );

  function handleFileUpload(file: File) {
    console.log("File uploaded:", file.name, file.size);
    // Handle file upload logic here
  }

  function triggerFileUpload() {
    // This will be passed to the Input component
  }

  function handleCreateInputChange(value: string) {
    console.log(value);
    setValue(value);
  }
};
