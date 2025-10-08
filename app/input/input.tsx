import type { ChangeEvent } from "react";

type InputButton = {
  action: () => void;
  disabled?: boolean;
  icon: string;
  key: string;
  type?: "primary" | "secondary";
};

type InputProps = {
  actions?: InputButton[];
  onChange?: (value: string) => void;
  placeholder: string;
};

export const Input = ({ actions = [], onChange, placeholder }: InputProps) => {
  return (
    <div className="w-full flex items-center px-4 py-2 border rounded-lg">
      <input
        className="flex-1 outline-none"
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      {actions.map(({ action, disabled, icon, key, type }) => (
        <button
          key={key}
          onClick={action}
          className={getActionButtonClassName({ disabled, type })}
        >
          {icon}
        </button>
      ))}
    </div>
  );

  function getActionButtonClassName({
    disabled,
    type,
  }: { disabled?: boolean; type?: "primary" | "secondary" } = {}) {
    const colorClassName =
      type === "primary"
        ? disabled
          ? "bg-gray-300"
          : "bg-blue-600 hover:bg-blue-900"
        : "border border-blue-900 hover:bg-gray-100";

    const cursorClassName = disabled ? "cursor-default" : "cursor-pointer";

    return `ml-4 ${colorClassName} ${cursorClassName} rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200`;
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event.target.value);
  }
};
