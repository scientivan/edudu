"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Bar from "@/app/components/content/Bar";
import ContentViewer from "@/app/components/content/ContentViewer";
import ContentInfo from "@/app/components/content/ContentInfo";
import RelatedContent from "@/app/components/content/RelatedContent";
import AboutContent from "@/app/components/content/AboutContent";
import type { ContentItemProps } from "@/app/components/explore/ContentCard";

interface ContentDetailProps {
  params: Promise<{ id: string }>; 
}

export default function ContentDetailPage({ params }: ContentDetailProps) {
  const { id } = use(params); 
  const router = useRouter();
  // const [content, setContent] = useState<ContentItemProps | null>(null);
  // const [relatedContent, setRelatedContent] = useState<ContentItemProps[]>([]);
  // const [currentSlide, setCurrentSlide] = useState(0);
  // const totalSlides = 4; 
  const [allContent, setAllContent] = useState<ContentItemProps[]>([])
  const [currentContentIndex, setCurrentContentIndex] = useState(0)


  // Fetch content data
  useEffect(() => {
    const mainContent: ContentItemProps = {
      id: id,
      title: "Viking w chem music",
      imageUrl: "/placeholder.svg?height=400&width=300",
      creator: {
        name: "MathTech",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      likes: 42,
      views: 189,
    };

    const otherContent: ContentItemProps[] = Array(3)
      .fill(null)
      .map((_, index) => ({
        id: `related-${index}`,
        title: `Related Content ${index + 1}`,
        imageUrl: "/placeholder.svg?height=200&width=150",
        creator: {
          name: "Creator name",
          avatar: "/placeholder.svg?height=24&width=24",
        },
        likes: Math.floor(Math.random() * 100),
        views: Math.floor(Math.random() * 1000),
      }))
    // setContent(fetchedContent);

    //Combine all content with the main content as the first item
    const combined = [mainContent, ...otherContent]
    setAllContent(combined);

    const fetchedRelatedContent: ContentItemProps[] = Array(3)
      .fill(null)
      .map((_, index) => ({
        id: `related-${index}`,
        title: index === 0 ? "Title 1" : "Title 2",
        imageUrl: "/placeholder.svg?height=200&width=150",
        creator: {
          name: "Creator Name",
          avatar: "/placeholder.svg?height=24&width=24",
        },
        likes: Math.floor(Math.random() * 100),
        views: Math.floor(Math.random() * 1000),
      }));

      //Find the index of the requested content
      const requestedIndex = combined.findIndex((item) => item.id === id)
      setCurrentContentIndex(requestedIndex >= 0? requestedIndex : 0)

  //   setRelatedContent(fetchedRelatedContent);
  }, [id]); // ✅ Gunakan `id` dari use(params)

  const handlePrevious = () => {
    setCurrentContentIndex((prev) =>{
      if(prev <= 0) return prev
      return prev -1
    });
  };

  const handleNext = () => {
    setCurrentContentIndex((prev) => {
      if(prev >= allContent.length -1) return prev
      return prev + 1
    });
  };

  const handleSelectContentByIndex = (index: number) =>{
    if(index >= 0 && index < allContent.length){
      setCurrentContentIndex(index)
    }
  }

const currentContent = allContent[currentContentIndex]||null

  if (!currentContent || allContent.length === 0) {
    return (
      <div className="min-h-screen bg-[#1F3B5B] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#EACA91]"></div>
      </div>
    );
  }

  const contentDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...`;

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

      <div className="flex flex-col lg:flex-row gap-32 ml-20  max-w-7xl  px-4">
        <div className="lg:w-2/5 w-full">
          
            <ContentViewer 
              imageUrl={currentContent.imageUrl} 
              title={currentContent.title} 
              onPrevious={handlePrevious} 
              onNext={handleNext} 
              currentIndex={currentContentIndex}
              totalItems={allContent.length}
            />
            <ContentInfo 
              title={currentContent.title} 
              creator={currentContent.creator} 
              likes={currentContent.likes} 
            />
          
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
