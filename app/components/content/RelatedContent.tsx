"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ContentItemProps } from "../explore/ContentCard"
// import { useRouter } from "next/navigation"

interface RelatedContentProps {
  items: ContentItemProps[]
  currentIndex: number
  onSelectIndex: (index: number) => void
  onPrevious: () => void
  onNext: () => void
}



export default function RelatedContent({  items,currentIndex, onSelectIndex, onPrevious, onNext }: RelatedContentProps) {
  const isFirstItem = currentIndex === 0
  const isLastItem = currentIndex === items.length - 1
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">More Content</h2>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {items.map((item, index) => (
            <div 
              key={item._id} 
              className={`min-w-[200px] bg-[#1f3b5b] rounded-lg overflow-hidden cursor-pointer ${index === currentIndex? "ring-2 ring-white" : ""}`}
              onClick={() => onSelectIndex(index)}
              >
              <div className="relative aspect-[3/4] w-full">
                <Image src={item.imagesLink || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-2 text-xs">
                {index === currentIndex ? "Current image" : `Image ${index + 1}`}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={onPrevious}
          disabled={isFirstItem}
          className={`absolute -left-9 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/50 rounded-full 
          flex items-center justify-center
          ${isFirstItem? "bg-black/30 text-gray-400 cursor-not-allowed" :
            "bg-black/50 text-white cursor-pointer hover:bg-black/70"}
          }`}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={onNext}
          disabled={isLastItem}
        className={`absolute -right-9 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/50 rounded-full 
        flex items-center justify-center 
        ${isLastItem 
          ? "bg-black/30 text-gray-400 cursor-not-allowed"
          : "bg-black/50 text-white cursor-pointer hover:bg-black/70"
        }`}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

