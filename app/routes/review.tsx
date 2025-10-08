import ImageAnnotator from "../annotator/ImageAnnotator";

export default function Review() {
  const backendImages = [
    { img: "https://www.dallasfwc26.com/wp-content/uploads/2025/04/8_OFFICIAL-POSTER-1350x2048.jpg" },
    { img: "https://i0.wp.com/roughdraftatlanta.com/wp-content/uploads/2025/03/FIFA-World-Cup-Atlanta-Poster.jpg?w=1200&ssl=1" },
    { img: "https://s.yimg.com/ny/api/res/1.2/boGyuwLO1m27MZ64gXveKw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTE2MDA7aD05MDA7cT01MDtjZj13ZWJw/https://s.yimg.com/os/creatr-uploaded-images/2025-03/9e5a2760-0501-11f0-bbef-6709345b9786" },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-2xl font-semibold text-zinc-900">Add details to your images</h1>
        <ImageAnnotator data={backendImages} />
      </div>
    </div>
  );
}
