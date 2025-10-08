import type { ChangeEvent } from "react";
import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { ImagePreview } from "~/imagePreview/imagePreview";

type ReferenceImage = {
  imageId: string;
  imagePath: string;
  title: string;
};

type InputProps = {
  onChange?: (value: string) => void;
  onFileUpload?: (file: File) => void;
  placeholder: string;
};

export const Input = ({ onChange, onFileUpload, placeholder }: InputProps) => {
  const [value, setValue] = useState("");
  const [referenceImages, setReferenceImages] = useState<ReferenceImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const actions = [
    {action: triggerFileUpload, disabled: false, icon: "📎", key: "attach", type: "secondary" as const },
    {action: () => console.log("send clicked"), disabled: value.length === 0, icon: "✉️", key: "send", type: "primary" as const}
  ];

  return (
    <div className="w-full border rounded-lg">
      <div className="px-4 py-2">
        <textarea
          className="w-full outline-none resize-none min-h-6"
          onChange={handleInputChange}
          placeholder={placeholder}
          rows={1}
          onInput={handleAutoResize}
          value={value}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      <div className="border-t border-gray-200"></div>
      <div className="px-4 py-2 flex justify-between gap-2">
        <div className="flex gap-2">
          {referenceImages.length > 0 && referenceImages.map(({ imageId, imagePath, title }) => (
            <ImagePreview
              key={imageId}
              alt="Uploaded"
              imageId={imageId}
              imagePath={imagePath}
              onDelete={handleDeleteImage}
              title={title}
            />
          ))}
        </div>
        <div className="flex gap-2">
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
    setValue(event.target.value);
    onChange?.(event.target.value);
  }

  function handleAutoResize(event: React.FormEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setReferenceImages((prevImages) => [
          ...prevImages,
          { imageId: uuid(), imagePath: e.target?.result as string, title: file.name },
        ]);
      };
      reader.readAsDataURL(file);
      onFileUpload?.(file);
    }
  }

  function handleDeleteImage(imageId: string) {
    setReferenceImages((prevImages) => prevImages.filter((image) => image.imageId !== imageId));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function triggerFileUpload() {
    fileInputRef.current?.click();
  }
};
