interface ProgressBarProps {
    currentSlide: number
    totalSlides: number
  }
  
  export default function ProgressBar({ currentSlide, totalSlides }: ProgressBarProps) {
    return (
      <div className="flex gap-2 mb-6 max-w-4xl mx-auto">
        {Array(totalSlides)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full flex-grow ${index === currentSlide ? "bg-[#EACA91]" : "bg-gray-600"}`}
            ></div>
          ))}
      </div>
    )
  }
  
  