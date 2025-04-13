"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Bar from "@/app/components/content/Bar";
import ContentViewer from "@/app/components/content/ContentViewer";
import ContentInfo from "@/app/components/content/ContentInfo";
import RelatedContent from "@/app/components/content/RelatedContent";
import AboutContent from "@/app/components/content/AboutContent";
import type { ContentItemProps } from "@/app/components/explore/ContentCard";
import { showDetailedContent } from "@/app/components/api";

interface ContentDetailProps {
  params: { id: string };
}

export default function ContentDetailPage({ params }: ContentDetailProps) {
  const { id } = params;
  const router = useRouter();

  const [allContent, setAllContent] = useState<ContentItemProps[]>([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contentArray = await showDetailedContent(id);
        const main = contentArray[0];

        const mainContent: ContentItemProps = {
          _id: main._id,
          title: main.title,
          imagesLink: main.imagesLink,
          likeCount: main.likeCount,
          watchCount: main.watchCount,
        };

        const dummyRelated: ContentItemProps[] = Array.from({ length: 3 }, (_, i) => ({
          _id: `related-${i}`,
          title: `Related Content ${i + 1}`,
          imagesLink: "/placeholder.svg?height=200&width=150",
          creator: {
            name: "Creator Name",
            avatar: "/placeholder.svg?height=24&width=24",
          },
          likeCount: Math.floor(Math.random() * 100),
          watchCount: Math.floor(Math.random() * 1000),
        }));

        const combined = [mainContent, ...dummyRelated];
        setAllContent(combined);

        const index = combined.findIndex((item) => item._id === id);
        setCurrentContentIndex(index >= 0 ? index : 0);
      } catch (err) {
        console.error("Failed to fetch content:", err);
      }
    };

    fetchData();
  }, [id]);

  const handlePrevious = () => {
    setCurrentContentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentContentIndex((prev) =>
      prev < allContent.length - 1 ? prev + 1 : prev
    );
  };

  const handleSelectContentByIndex = (index: number) => {
    if (index >= 0 && index < allContent.length) {
      setCurrentContentIndex(index);
    }
  };

  const currentContent = allContent[currentContentIndex] || null;

  if (!currentContent || allContent.length === 0) {
    return (
      <div className="min-h-screen bg-[#1F3B5B] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EACA91]" />
      </div>
    );
  }

  const contentDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...";

  return (
    <div className="min-h-screen text-white">
      <div className="container w-full mx-auto px-4 py-8">
        <Bar currentSlide={currentContentIndex} totalSlides={allContent.length} />

        <div className="max-w-7xl mx-auto relative">
          <button
            onClick={() => router.back()}
            className="absolute -left-12 top-0 w-8 h-8 bg-[#EACA91] rounded-full flex items-center justify-center text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-32 ml-20 max-w-7xl px-4">
          {/* Left Panel */}
          <div className="lg:w-2/5 w-full">
            <ContentViewer
              imageUrl={currentContent.imagesLink}
              title={currentContent.title}
              onPrevious={handlePrevious}
              onNext={handleNext}
              currentIndex={currentContentIndex}
              totalItems={allContent.length}
            />
            <ContentInfo
              title={currentContent.title}
              likes={currentContent.likeCount}
            />
          </div>

          {/* Right Panel */}
          <div className="lg:w-3/5 w-full bg-[#1f3049] rounded-2xl p-4 lg:p-12">
            <RelatedContent
              items={allContent}
              currentIndex={currentContentIndex}
              onSelectIndex={handleSelectContentByIndex}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
            <AboutContent description={contentDescription} />
          </div>
        </div>
      </div>
    </div>
  );
}
