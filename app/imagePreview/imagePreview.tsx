type ImagePreviewProps = {
  alt: string;
  imageId: string;
  imagePath: string;
  onDelete?: (imageId: string) => void;
  title: string;
};

export const ImagePreview = ({ alt, imageId, imagePath, onDelete, title }: ImagePreviewProps) => {
  return (
    <div className="relative mb-2">
      <button
        className="absolute cursor-pointer top-1 right-1 text-white bg-black/70 rounded-full w-8 h-8"
        onClick={handleDeleteClick}
        title="Delete"
      >
        x
      </button>
      <img src={imagePath} alt={alt} className="max-w-xs max-h-32 rounded" />
      <div className="absolute rounded-b w-full text-center bottom-0 text-white bg-black/50">{title}</div>
    </div>
  );

  function handleDeleteClick() {
    onDelete?.(imageId);
  }
};
