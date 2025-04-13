"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

export interface CarouselItem {
  id: number | string
  title: string
  imageUrl: string
  narrative: string
  relativeIndex?: number
}

interface CarouselProps {
  items?: CarouselItem[]
  isLoading?: boolean
}

export default function Carousel({ items = [], isLoading = false }: CarouselProps) {
  const placeholderItems: CarouselItem[] = [
    {
      id: 1,
      title: "Video 1",
      imageUrl: "/placeholder.svg?height=300&width=200",
      narrative: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 2,
      title: "Video 2",
      imageUrl: "/placeholder.svg?height=300&width=200",
      narrative: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 3,
      title: "Video 3",
      imageUrl: "/placeholder.svg?height=300&width=200",
      narrative: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 4,
      title: "Video 4",
      imageUrl: "/placeholder.svg?height=300&width=200",
      narrative: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
    {
      id: 5,
      title: "Video 5",
      imageUrl: "/placeholder.svg?height=300&width=200",
      narrative: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
    },
  ]

  // Store displayItems in a ref to avoid dependency issues
  const itemsRef = useRef<CarouselItem[]>([])
  
  // Initialize displayItems only once or when items change
  useEffect(() => {
    itemsRef.current = items.length > 0 ? items : placeholderItems
  }, [items])
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState<CarouselItem[]>([])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calculate visible items when currentIndex changes
  useEffect(() => {
    const displayItems = itemsRef.current
    if (displayItems.length === 0) return
    
    const totalItems = displayItems.length
    const itemsToShow = []
    
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalItems) % totalItems
      itemsToShow.push({
        ...displayItems[index],
        relativeIndex: i // Store the relative position for easy reference
      })
    }
    
    setVisibleItems(itemsToShow)
  }, [currentIndex]) // Only depend on currentIndex, not on displayItems

  const goToPrev = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      const totalItems = itemsRef.current.length
      return prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    })
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const goToNext = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      const totalItems = itemsRef.current.length
      return (prevIndex + 1) % totalItems
    })
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const goToItem = (relativeIndex: number | undefined) => {
    if (isTransitioning || relativeIndex === undefined || relativeIndex === 0) return;
    
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => {
      const totalItems = itemsRef.current.length
      return (prevIndex + relativeIndex + totalItems) % totalItems
    })
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <div className="relative w-full overflow-hidden px-4">
      {/* Carousel Container - Full width with items stretching to edges */}
      <div 
        ref={carouselRef} 
        className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12 py-8"
      >
        {isLoading ? (
          // Loading skeleton placeholders
          Array(5)
            .fill(0)
            .map((_, index) => (
              <div 
                key={`loading-${index}`} 
                className={`flex-shrink-0 mx-auto
                  ${index === 2 ? 'w-[220px] h-[330px]' : 'w-[160px] h-[240px]'}`}
              >
                <div className="h-full rounded-lg animate-pulse"></div>
                <div className="h-4 mt-2 rounded animate-pulse w-3/4"></div>
              </div>
            ))
        ) : visibleItems.length > 0 ? (
          // Actual items
          visibleItems.map((item, idx) => {
            const isCentered = idx === 2;
            const isEdge = idx === 0 || idx === 4;
            const altText = item.title || `Carousel item ${idx+1}`;
            
            return (
              <div 
                key={`${item.id}-${idx}`} 
                className={`flex flex-col transition-all duration-500 ease-in-out
                  ${isTransitioning ? 'transform-gpu' : ''}
                  ${isCentered 
                    ? 'w-[220px] z-10 scale-110' 
                    : isEdge
                      ? 'w-[160px] opacity-50' 
                      : 'w-[160px] opacity-80'}`}
              >
                <div 
                  className={`relative bg-gradient-to-b from-white to-gray-300 rounded-lg overflow-hidden
                    ${isCentered ? 'h-[330px]' : 'h-[240px]'}
                    ${!isCentered ? 'cursor-pointer hover:opacity-100 transition-opacity' : ''}`}
                  onClick={() => !isCentered && goToItem(item.relativeIndex)}
                >
                  <Image
                    src={item.imageUrl || "/placeholder.svg?height=300&width=200"}
                    alt={altText}
                    width={isCentered ? 220 : 160}
                    height={isCentered ? 330 : 240}
                    className="w-full h-full object-cover"
                    priority={isCentered}
                  />
                </div>
                <div className={`mt-2 text-xs text-center transition-opacity duration-300 w-full
                  ${isCentered ? 'text-gray-300' : 'text-gray-500'}`}>
                  {isCentered 
                    ? (item.narrative || "Click video here to watch topic...") 
                    : "Click untuk baca lebih lanjut"}
                </div>
              </div>
            );
          })
        ) : (
          // No items state
          <div className="w-full py-8 text-center text-gray-400">No content available</div>
        )}
      </div>

      {/* Navigation Arrows - Positioned relative to the container */}
      {itemsRef.current.length > 0 && (
        <>
          <button
            onClick={goToPrev}
            disabled={isTransitioning}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#8a2be2] rounded-full flex items-center justify-center z-20 opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            disabled={isTransitioning}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#8a2be2] rounded-full flex items-center justify-center z-20 opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  )
}