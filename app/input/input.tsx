import type { ChangeEvent } from "react";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
import { AirportTag } from "~/airportTag/airportTag";

import { AirplaneIcon, AttachIcon, SendIcon } from "~/icons";
import { ImagePreview } from "~/imagePreview/imagePreview";

export type ReferenceImage = {
  imageId: string;
  imagePath: string;
  title: string;
};

type InputProps = {
  airports: string[];
  onAddAirportClick: () => void;
  onChange: (value: string) => void;
  onDeleteReferenceImage?: (imageId: string) => void;
  onRemoveAirport?: (airport: string) => void;
  onSubmitPrompt: () => void;
  onUploadReferenceImage?: (image: ReferenceImage) => void;
  placeholder: string;
  referenceImages: ReferenceImage[];
  value: string;
};

export const Input = ({
  airports,
  onAddAirportClick,
  onChange,
  onDeleteReferenceImage,
  onRemoveAirport,
  onSubmitPrompt,
  onUploadReferenceImage,
  placeholder,
  referenceImages = [],
  value,
}: InputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const actions = [
    {
      action: onAddAirportClick,
      disabled: false,
      icon: AirplaneIcon,
      key: "airplane",
      title: "Add a station",
      type: "secondary" as const,
    },
    {
      action: triggerFileUpload,
      disabled: false,
      icon: AttachIcon,
      key: "attach",
      title: "Attach a reference image",
      type: "secondary" as const,
    },
    {
      action: onSubmitPrompt,
      disabled: value.length === 0,
      icon: SendIcon,
      key: "send",
      title: "Generate new content with the given prompt",
      type: "primary" as const,
    },
  ];

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
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
        <div className="flex flex-col gap-2">
          {referenceImages.length > 0 && (
            <div className="flex gap-2">
              {referenceImages.map(({ imageId, imagePath, title }) => (
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
          )}
          <div className="flex flex-wrap gap-2">
            {airports.map((airport) => (
              <AirportTag
                airport={airport}
                onRemoveAirport={handleRemoveAirport}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {actions.map(({ action, disabled, icon: Icon, key, title, type }) => (
            <button
              className={getActionButtonClassName({ disabled, type })}
              key={key}
              onClick={action}
              title={title}
            >
              <Icon className="w-4 h-4" fill="currentColor" />
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
          ? "bg-gray-300 text-gray-600"
          : "bg-[#304cb2] hover:bg-[#1a2c80] text-white"
        : "border border-blue-900 hover:bg-gray-100";
    const cursorClassName = disabled
      ? "cursor-default"
      : "cursor-pointer hover:-rotate-45";

    return `${colorClassName} ${cursorClassName} rounded-full w-8 h-8 flex items-center justify-center transition-colors transition-transform duration-200`;
  }

  function handleInputChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(event.target.value);
  }

  function handleAutoResize(event: React.FormEvent<HTMLTextAreaElement>) {
    const textarea = event.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const referenceImage = {
          imageId: uuid(),
          imagePath: e.target?.result as string,
          title: file.name,
        };

        onUploadReferenceImage?.(referenceImage);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDeleteImage(imageId: string) {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    onDeleteReferenceImage?.(imageId);
  }

  function handleRemoveAirport(airport: string) {
    onRemoveAirport?.(airport);
  }

  function triggerFileUpload() {
    fileInputRef.current?.click();
  }
};
