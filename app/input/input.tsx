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
    <div className="w-full border rounded-lg">
      <div className="px-4 py-2">
        <textarea
          className="w-full outline-none resize-none min-h-6"
          onChange={handleInputChange}
          placeholder={placeholder}
          rows={1}
          onInput={handleAutoResize}
        />
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="px-4 py-2 flex justify-end gap-2">
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

    return `${colorClassName} ${cursorClassName} rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200`;
  }

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(event.target.value);
  }

  function handleAutoResize(event: React.FormEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
};
