"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import { useRouter } from "next/navigation"

interface ContentViewerProps {
  imageUrl: string
  title: string
  onPrevious?: () => void
  onNext?: () => void
  currentIndex: number
  totalItems: number
}

export default function ContentViewer({ imageUrl, title, onPrevious, onNext, currentIndex, totalItems  }: ContentViewerProps) {
  // const router = useRouter();
  const isFirstItem = currentIndex === 0;
  const isLastItem = currentIndex === totalItems - 1;
  return (
      <div className="relative aspect-[3/4] w-full max-w-md mx-auto ">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover rounded-md" />

        {/* Navigation Arrows */}
        <button
          onClick={onPrevious}
          disabled={isFirstItem}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onNext}
          disabled={isLastItem}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
  )
}

