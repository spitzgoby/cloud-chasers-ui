import { useState } from "react";
import { Input } from "~/input/input";

export const Generator = () => {
  const [value, setValue] = useState("");

  return (
    <Input actions={getInputActions()} onChange={handleCreateInputChange} placeholder="What do you want to create?" />
  );

  function getInputActions() {
    return [
      {action: () => console.log("attach clicked"), disabled: false, icon: "📎", key: "attach", type: "secondary" as const },
      {action: () => console.log("send clicked"), disabled: value.length === 0, icon: "✉️", key: "send", type: "primary" as const}
    ];
  }

  function handleCreateInputChange(value: string) {
    console.log(value);
    setValue(value);
  }
};
