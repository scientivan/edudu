import React, { useState, useEffect } from "react";
import EditableTitle from "./EditableTitle";

interface GeneratedContentProps {
  title: string;
  imageUrl?: string;
  narrative?: string;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ title: initialTitle, imageUrl, narrative }) => {
  const fallbackImages = [
    "https://placehold.co/250x300?text=Image+1",
    "https://placehold.co/250x300?text=Image+2",
    "https://placehold.co/250x300?text=Image+3",
  ];
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState("No description yet. Click generate to create content.");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>(fallbackImages);
  
  useEffect(() => {

    if (imageUrl) {
      setImages([imageUrl]);
    } 

    if (narrative) {
      setDescription(narrative);
    } else {
      setDescription("No description yet. Click generate to create content.");
    }

    setCurrentImageIndex(0);
  }, [imageUrl, narrative]);

  // prev image dan next imagenya masih error karena aku generatenya cuma untuk satu foto, next harus dicoba dengan tiga foto
  // const prevImage = () => {
  //   setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  // };

  // const nextImage = () => {
  //   setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  // };

  // ✅ Guard clause untuk menghindari akses ke index array kosong
  if (images.length === 0) {
    return <div className="text-center text-gray-500">Loading images...</div>;
  }

  // ✅ Hitung prev/next index hanya setelah images tersedia
  // const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
  // const nextIndex = (currentImageIndex + 1) % images.length;

  return (
    <div className="w-xl h-xl bg-white p-6 rounded-lg relative">
      <EditableTitle title={title} setTitle={setTitle} />

      <div className="relative flex items-center justify-center mt-4 h-[320px]">
        {/* Previous Image Preview */}
        {/* <div className="absolute left-0 w-1/2 h-full overflow-hidden transform -translate-x-1/2">

          <img
            src={`https://images.weserv.nl/?url=${encodeURIComponent(images[prevIndex])}`}
            alt="prev"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500 opacity-50 transform scale-90"
            style={{ clipPath: "inset(0 0 0 50%)" }}
          />
        </div> */}

        {/* Current Image */}
        <img
          src={`https://images.weserv.nl/?url=${encodeURIComponent(images[currentImageIndex])}`}
          alt="Generated preview"
          className="rounded-md shadow-lg w-60 h-80 transition-all duration-500 scale-100"
          referrerPolicy="no-referrer"
        />

        {/* Next Image Preview */}
        {/* <div className="absolute right-0 w-1/2 h-full overflow-hidden transform translate-x-1/2">
          <img
            src={`https://images.weserv.nl/?url=${encodeURIComponent(images[nextIndex])}`}
            alt="next"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500 opacity-50 transform scale-90"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div> */}

        {/* Navigation Buttons */}
        {/* <button onClick={nextImage} className="absolute right-5 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-400">▶</button>
        <button onClick={prevImage} className="absolute left-5 bg-black text-white p-2 rounded-full shadow-md hover:bg-gray-400">◀</button> */}
      </div>

      <h3 className="text-lg font-semibold text-gray-700 mt-4">Narrative</h3>
      <textarea
        className="w-full h-32 p-2 border-none rounded mt-2 bg-gray-100 text-gray-800 cursor-default"
        value={description}
        readOnly
      />
    </div>
  );
};

export default GeneratedContent;
