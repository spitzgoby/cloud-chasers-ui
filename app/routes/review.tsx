import { useLocation } from "react-router";
import ImageAnnotator from "../annotator/ImageAnnotator";
import { useMemo } from "react";

export default function Review() {
  const { state: locationState } = useLocation();

  const { reference, resized_images: resizedImages } = locationState?.data ?? {};
  const backendImages = useMemo(() => {
    if (resizedImages) {
      if (Array.isArray(resizedImages)) {
        return resizedImages.map((resizedImage: any) => ({ img: resizedImage.xl as string, reference, resizedImages: resizedImage }));
      } else {
        return [{ img: resizedImages.xl as string, reference, resizedImages }];
      }
    }

    return [];
  }, [locationState]);

  return (
    <div className="bg-zinc-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900">Add details to your images</h1>
        <ImageAnnotator data={backendImages} />
      </div>
    </div>
  );
}
