// Modal.tsx
import { useState } from "react";
import { generateTextWithGemini } from "../components/api";

interface ModalProps {
  setIsModalOpen: (value: boolean) => void;
  setFieldValue: (value: string) => void; // menerima setter untuk title/desc/subject
}

const Modal: React.FC<ModalProps> = ({
  setIsModalOpen,
  setFieldValue,
}) => {
  const [tempText, setTempText] = useState("");
  // const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);


  const generateSuggestions = async () => {
    setLoading(true);
    try {
      const response = await generateTextWithGemini({ prompt : `generate (just only one) paragraph of unique and engaging stories description. Provide the response as a complete paragraph. Do not include any introductory or concluding words.` });
      const stories: string[] = response
        .split("\n\n")
        .map((story: string) => story.trim())
        .filter((story: string) => story.length > 0);

      setTempText(stories[0]||"");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   generateSuggestions();
  // }, [attributeType]);

  

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      onClick={() => setIsModalOpen(false)}  
    >
      <div 
        className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-w-full relative"
        onClick={(e) => e.stopPropagation()}  
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-300 hover:text-black"
          aria-label="close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-center text-black capitalize">
          Suggested
        </h2>

        <textarea
          className="w-full h-96 p-3 mt-3 border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-200 outline-none text-black"
          placeholder="Select or type your own"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
        />

        <div className="mt-4">
          <button
            onClick={generateSuggestions}
            className="w-full md:w-48 py-2 bg-[#EACA91] text-black rounded-lg hover:bg-amber-100 cursor-pointer"
          >
            {loading ? "Loading..." : "Generate Another"}
          </button>
        </div>

        

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => {
              setFieldValue(tempText);
              setIsModalOpen(false);
            }}
            className="w-48 justify-center px-6 py-2 text-black rounded-lg flex items-center gap-1 cursor-pointer bg-green-400 hover:bg-green-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
