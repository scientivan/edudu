"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Bar from "@/app/components/content/Bar";
import ContentViewer from "@/app/components/content/ContentViewer";
import ContentInfo from "@/app/components/content/ContentInfo";
import RelatedContent from "@/app/components/content/RelatedContent";
import AboutContent from "@/app/components/content/AboutContent";
import type { ContentItemProps } from "@/app/components/explore/ContentCard";
import { showDetailedContent, showContentsToViewPage } from "@/app/components/api";
import { useParams } from "next/navigation";

export default function ContentDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [allContent, setAllContent] = useState<ContentItemProps[]>([]);
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const contentArray = await showDetailedContent(id);
        const content = contentArray[0];
        const mainContent: ContentItemProps = {
          _id: content._id,
          title: content.title,
          imagesLink: content.imagesLink,
          likeCount: content.likeCount,
          watchCount: content.watchCount,
          captions : content.captions,
          desc : content.desc
        };
        
        const contentsArray = await showContentsToViewPage()
        console.log(contentsArray)
        const otherContent: ContentItemProps[] = contentsArray
          .filter((item) => item._id !== content._id) // Filter out the content with the same _id
          .map((item, index) => {
            return {
              _id: item._id ?? `related-${index}`,
              title: item.title ?? `Related Content ${index + 1}`,
              imagesLink: item.imagesLink ?? "/placeholder.svg?height=200&width=150",
              likeCount: item.likeCount ?? Math.floor(Math.random() * 100),
              watchCount: item.watchCount ?? Math.floor(Math.random() * 1000),
              captions: item.captions[0] ?? ["related"],
              desc: item.desc ?? "related",
            };
          });
          
        const combined = [mainContent, ...otherContent];
        setAllContent(combined);

        const requestedIndex = combined.findIndex((item) => item._id === id);
        setCurrentContentIndex(requestedIndex >= 0 ? requestedIndex : 0);
      } catch (error) {
        console.error("Failed to fetch contents:", error);
      }
    };

    fetchData();
  }, [id]);

  const handlePrevious = () => {
    setCurrentContentIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentContentIndex((prev) => {
      if (prev >= allContent.length - 1) return prev;
      return prev + 1;
    });
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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EACA91]"></div>
      </div>
    );
  }

  const contentDescription = currentContent.desc;

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
          <div className="lg:w-2/5 w-full">
            <ContentViewer
              imageUrl={currentContent.imagesLink}
              title={currentContent.title}
              onPrevious={handlePrevious}
              onNext={handleNext}
              currentIndex={currentContentIndex}
              totalItems={allContent.length}
            />
            <ContentInfo title={currentContent.title} likes={currentContent.likeCount} />
          </div>

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
