import type { ChangeEvent } from "react";
import { useRef } from "react";
import { v4 as uuid } from "uuid";
// SVG Components with customizable colors
const AttachIcon = ({
  className = "w-4 h-4",
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) => (
  <svg className={className} viewBox="0 0 1200 1200" fill={fill}>
    <path d="m441.56 205.55c-28.242 28.242-56.602 56.602-84.844 84.844-48.164 48.164-96.445 96.445-144.61 144.61-38.906 38.906-79.453 76.406-106.52 125.16-27.656 49.922-42.773 106.29-43.945 163.36-1.1719 57.305 12.539 114.14 38.203 165.23 26.25 52.383 67.031 96.68 115.08 129.84 47.578 32.93 102.77 51.094 159.84 57.773 103.24 12.07 209.3-27.656 282.42-100.66 25.078-24.961 50.039-50.039 75.117-75.117 48.164-48.164 96.445-96.445 144.61-144.61 44.297-44.297 88.477-88.477 132.77-132.77 31.172-31.172 64.57-61.172 87.188-99.609 28.711-48.867 42.656-108.63 36.094-165.12-1.875-16.289-4.3359-32.344-8.7891-48.164-4.3359-15.352-10.547-30.352-17.227-44.883-12.305-26.367-29.883-50.742-50.156-71.484-39.492-40.43-93.516-69.844-149.77-78.281-15.938-2.3438-31.758-4.3359-47.812-4.2188-16.289 0.11719-32.578 2.1094-48.633 4.8047-28.242 4.8047-55.898 15.117-81.094 28.711-40.547 21.914-71.484 55.898-103.59 88.008-43.945 43.945-87.891 87.891-131.84 131.84-48.516 48.516-96.914 96.914-145.43 145.43-26.016 26.016-52.031 52.031-78.047 78.047-35.977 35.977-56.602 83.555-59.062 134.41-3.0469 63.281 27.188 125.51 76.875 163.95 50.039 38.672 116.95 52.266 178.01 33.984 35.273-10.547 64.805-30.586 90.586-56.367l271.76-271.76c17.344-17.344 18.633-49.219 0-66.328-18.75-17.227-47.812-18.516-66.328 0l-277.85 277.85c-4.4531 4.4531-9.1406 8.5547-14.062 12.539 3.1641-2.4609 6.3281-4.9219 9.4922-7.3828-10.547 8.2031-22.031 14.883-34.219 20.156 3.75-1.5234 7.5-3.1641 11.25-4.6875-12.539 5.1562-25.547 8.7891-39.023 10.547 4.1016-0.58594 8.3203-1.1719 12.422-1.6406-13.359 1.6406-26.836 1.6406-40.195 0 4.1016 0.58594 8.3203 1.1719 12.422 1.6406-13.477-1.875-26.484-5.3906-39.023-10.547 3.75 1.5234 7.5 3.1641 11.25 4.6875-12.305-5.2734-23.672-11.953-34.219-20.156 3.1641 2.4609 6.3281 4.9219 9.4922 7.3828-9.8438-7.8516-18.75-16.641-26.602-26.602 2.4609 3.1641 4.9219 6.3281 7.3828 9.4922-8.2031-10.547-14.883-22.031-20.156-34.219 1.5234 3.75 3.1641 7.5 4.6875 11.25-5.1562-12.539-8.7891-25.547-10.547-39.023 0.58594 4.1016 1.1719 8.3203 1.6406 12.422-1.6406-13.359-1.6406-26.836 0-40.195-0.58594 4.1016-1.1719 8.3203-1.6406 12.422 1.875-13.477 5.3906-26.484 10.547-39.023-1.5234 3.75-3.1641 7.5-4.6875 11.25 5.2734-12.305 11.953-23.672 20.156-34.219-2.4609 3.1641-4.9219 6.3281-7.3828 9.4922 14.531-18.398 32.695-34.336 49.219-50.859 32.578-32.578 65.156-65.156 97.734-97.734 39.727-39.727 79.453-79.453 119.3-119.3 33.633-33.633 67.383-67.383 101.02-101.02 14.297-14.297 28.594-28.711 43.008-43.008 6.9141-6.9141 14.18-13.242 21.914-19.219-3.1641 2.4609-6.3281 4.9219-9.4922 7.3828 15.469-11.836 32.227-21.68 50.156-29.297-3.75 1.5234-7.5 3.1641-11.25 4.6875 18.516-7.7344 37.969-13.008 57.773-15.82-4.1016 0.58594-8.3203 1.1719-12.422 1.6406 20.273-2.6953 40.781-2.6953 61.172 0-4.1016-0.58594-8.3203-1.1719-12.422-1.6406 19.922 2.8125 39.258 8.0859 57.773 15.82-3.75-1.5234-7.5-3.1641-11.25-4.6875 17.93 7.6172 34.688 17.461 50.156 29.297-3.1641-2.4609-6.3281-4.9219-9.4922-7.3828 15.352 11.953 29.18 25.781 41.133 41.133-2.4609-3.1641-4.9219-6.3281-7.3828-9.4922 11.836 15.469 21.68 32.227 29.297 50.156-1.5234-3.75-3.1641-7.5-4.6875-11.25 7.7344 18.516 13.008 37.969 15.82 57.773-0.58594-4.1016-1.1719-8.3203-1.6406-12.422 2.6953 20.273 2.6953 40.781 0 61.172 0.58594-4.1016 1.1719-8.3203 1.6406-12.422-2.8125 19.922-8.0859 39.258-15.82 57.773 1.5234-3.75 3.1641-7.5 4.6875-11.25-7.6172 17.93-17.461 34.688-29.297 50.156 2.4609-3.1641 4.9219-6.3281 7.3828-9.4922-16.055 20.508-35.859 38.438-54.258 56.836l-321.56 321.56c-15.703 15.703-31.172 31.875-47.344 47.109-7.5 7.0312-15.234 13.711-23.32 19.922 3.1641-2.4609 6.3281-4.9219 9.4922-7.3828-20.273 15.469-42.305 28.359-65.742 38.438 3.75-1.5234 7.5-3.1641 11.25-4.6875-24.961 10.547-51.094 17.695-77.93 21.328 4.1016-0.58594 8.3203-1.1719 12.422-1.6406-26.602 3.5156-53.555 3.5156-80.273 0 4.1016 0.58594 8.3203 1.1719 12.422 1.6406-26.836-3.6328-52.969-10.781-77.93-21.328 3.75 1.5234 7.5 3.1641 11.25 4.6875-23.438-10.078-45.469-22.969-65.742-38.438 3.1641 2.4609 6.3281 4.9219 9.4922 7.3828-20.742-16.055-39.375-34.688-55.547-55.547 2.4609 3.1641 4.9219 6.3281 7.3828 9.4922-15.469-20.273-28.359-42.305-38.438-65.742 1.5234 3.75 3.1641 7.5 4.6875 11.25-10.547-24.961-17.695-51.094-21.328-77.93 0.58594 4.1016 1.1719 8.3203 1.6406 12.422-3.5156-26.602-3.5156-53.555 0-80.273-0.58594 4.1016-1.1719 8.3203-1.6406 12.422 3.6328-26.836 10.781-52.969 21.328-77.93-1.5234 3.75-3.1641 7.5-4.6875 11.25 10.078-23.438 22.969-45.469 38.438-65.742-2.4609 3.1641-4.9219 6.3281-7.3828 9.4922 13.477-17.461 29.18-32.812 44.766-48.281 21.328-21.328 42.773-42.773 64.102-64.102 27.891-27.891 55.664-55.664 83.555-83.555 24.727-24.727 49.57-49.57 74.297-74.297 12.188-12.188 24.609-24.141 36.562-36.562 0.23438-0.23438 0.35156-0.35156 0.58594-0.58594 17.344-17.344 18.633-49.219 0-66.328-18.984-16.758-48.047-18.164-66.562 0.35156z" />
  </svg>
);

const SendIcon = ({
  className = "w-4 h-4",
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) => (
  <svg className={className} viewBox="0 0 1200 1200" fill={fill}>
    <path d="m1067.5 132.52c-26.25-26.109-65.203-34.688-99.984-22.031l-800.02 308.02c-38.531 13.875-63.984 50.672-63.422 91.641s27.047 77.062 65.953 89.859l323.48 107.48 106.5 322.5c12.562 38.719 48.281 65.25 89.016 66 39.656 0.32812 75.281-24.234 88.969-61.5l308.02-800.02v0.046875c14.719-34.688 7.4062-74.719-18.516-102zm-50.016 75.516-308.02 800.02 0.046875-0.046875c-2.7656 8.5781-11.016 14.156-20.016 13.5-8.7188-0.42188-16.266-6.1875-18.984-14.484l-106.5-319.5 186-184.03c14.766-14.766 14.766-38.719 0-53.484s-38.719-14.766-53.484 0l-183.52 183.52-319.5-106.03c-8.2969-2.6719-14.109-10.266-14.484-18.984-0.51562-8.9531 5.0156-17.109 13.5-20.016l800.02-308.02-0.046875 0.046875c7.8281-2.8125 16.594-0.84375 22.5 5.0156 5.8594 5.9062 7.8281 14.625 5.0156 22.453z" />
  </svg>
);

import { ImagePreview } from "~/imagePreview/imagePreview";

export type ReferenceImage = {
  imageId: string;
  imagePath: string;
  title: string;
};

type InputProps = {
  onChange: (value: string) => void;
  onDeleteReferenceImage?: (imageId: string) => void;
  onUploadReferenceImage?: (image: ReferenceImage) => void;
  placeholder: string;
  referenceImages: ReferenceImage[];
  value: string;
};

export const Input = ({
  onChange,
  onDeleteReferenceImage,
  onUploadReferenceImage,
  placeholder,
  referenceImages = [],
  value,
}: InputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const actions = [
    {
      action: triggerFileUpload,
      disabled: false,
      icon: AttachIcon,
      key: "attach",
      title: "Attach a reference image",
      type: "secondary" as const,
    },
    {
      action: () => console.log("send clicked"),
      disabled: value.length === 0,
      icon: SendIcon,
      key: "send",
      title: "Generate new content with the given prompt",
      type: "primary" as const,
    },
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
          {referenceImages.length > 0 &&
            referenceImages.map(({ imageId, imagePath, title }) => (
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
          : "bg-blue-600 hover:bg-blue-900 text-white"
        : "border border-blue-900 hover:bg-gray-100";

    const cursorClassName = disabled ? "cursor-default" : "cursor-pointer hover:-rotate-45";

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

  function triggerFileUpload() {
    fileInputRef.current?.click();
  }
};
