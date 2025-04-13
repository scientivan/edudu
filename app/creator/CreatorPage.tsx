import React, { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import LoadingPage from "../components/LoadingPage";
import CategorySelector from "../components/CategorySelector";
import Modal from "../components/Modal";
import GeneratedContent from "../components/GeneratedContent";
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import EdugramNFTABI from "../../lib/abi/EdugramNFTABI.json";
import { generateTextWithGemini, generateImageWithGemini, addContentToDatabase, changePaidStatus } from "../components/api";
import { useRouter } from "next/navigation";

interface CreatorPageProps {
  onBack?: () => void;
}

const CreatorPage: React.FC<CreatorPageProps> = () => {
  // const [title, setTitle] = useState("Click to edit");
  const title = "Click to Edit"
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [voiceStyle, setVoiceStyle] = useState("Presets 1");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [narrative, setNarrative] = useState<string>("");

  const { writeContract, data: hash } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({ hash });

  const [isMinting, setIsMinting] = useState(false);
  // const [mintStarted, setMintStarted] = useState(false);
  const [shouldContinue, setShouldContinue] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isFirstVisit = sessionStorage.getItem("firstVisit");
    if (!isFirstVisit) {
      sessionStorage.setItem("firstVisit", "true");
    }
  }, []);

  const handleGenerate = async () => {
    try {
      console.log('Generate button clicked');
      const narrativeResponse = await generateTextWithGemini({
        prompt: `Develop a story of three paragraph with this story's description: ${description}`
      });

      const imageResponse = await generateImageWithGemini({
        prompt: `Generate only just one highly detailed and artistic image representing this scene from a short story: ${narrativeResponse}. Make it visually compelling and unique.`,
      });

      console.log("Image link: ", imageResponse);

      setImageUrl(imageResponse.imageUrl);
      setNarrative(narrativeResponse.generatedText);

      await addContentToDatabase({
        title,
        desc: description,
        imagesLink: imageResponse.imageUrl,
        captions: [narrativeResponse.generatedText],
        likeCount : 0,
        watchCount : 0,
      });
      // localStorage.setItem("createdContent", createdContent._id);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  const handleMint = async () => {
    setIsMinting(true);
    // setMintStarted(true);
    try {
      await writeContract({
        abi: EdugramNFTABI,
        address: '0x412D0d0a077548da4C80e569801E52bB0dF944c0',
        functionName: 'mintTo',
        args: ["0xd96DAF4de578d5B42B719eD64Be4c447Bae42cC1"],
      });

      setShouldContinue(true);
    } catch (error) {
      console.error("Minting failed:", error);
      setIsMinting(false);
      setShouldContinue(false);
    }
  };

  useEffect(() => {
    const continueAfterMint = async () => {
        try {
          await changePaidStatus({
            title,
            desc: description,
          });
          console.log("✅ Paid status updated!");
          router.push("/explore");
        } catch (err) {
          console.error("Error updating paid status:", err);
        }

      setIsMinting(false);
      setShouldContinue(false);
    };

    if (isSuccess && shouldContinue) {
      continueAfterMint();
    }
  }, [isSuccess, shouldContinue]);

  return (
    <div className="flex justify-center items-center min-h-screen pb-8">
      <div className="flex gap-8 rounded-lg backdrop-blur-md">
        <div>
          <GeneratedContent title={title} imageUrl={imageUrl} narrative={narrative} />
        </div>

        <div className="w-xl bg-white p-6 rounded-lg relative">
          <h2 className="text-black mb-5 text-center">Details</h2>

          <label className="block text-black">Descriptions</label>
          <textarea
            className="w-full h-[160px] p-4 border-gray-700 rounded-2xl mt-1 cursor-pointer bg-gray-100 text-gray-700 placeholder-gray-500"
            value={description}
            onClick={() => setIsModalOpen(true)}
            readOnly
            placeholder="Type here"
          />

          <label className="block mt-4 mb-1 text-gray-700">Voice Style</label>
          <Dropdown
            value={voiceStyle}
            onChange={setVoiceStyle}
            className="bg-gray-100 text-black"
          />

          <label className="block mt-4 mb-2 text-gray-600">Category</label>
          <CategorySelector selected={selectedCategories} setSelected={setSelectedCategories} />

          <div className="absolute bottom-6 right-6">
            <button
              style={{ backgroundColor: 'var(--highlight)' }}
              className="mt-6 text-black px-6 py-2 rounded-md w-full cursor-pointer"
              onClick={handleGenerate}
            >
              Generate Content
            </button>
            <button
              disabled={isMinting}
              style={{ backgroundColor: 'var(--highlight)', opacity: isMinting ? 0.6 : 1 }}
              className="mt-6 text-black px-6 py-2 rounded-md w-full cursor-pointer"
              onClick={handleMint}
            >
              {isMinting ? "Minting..." : "Confirm2 →"}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} setFieldValue={setDescription} />}
      {(isLoading || isMinting) && <LoadingPage />}
    </div>
  );
};

export default CreatorPage;
