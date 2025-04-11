import { Heart, Share2, Laptop } from "lucide-react"

interface ContentInfoProps {
  title: string
  creator: {
    name: string
    avatar: string
  }
  likes: number
}

export default function ContentInfo({ title, creator, likes }: ContentInfoProps) {
  return (
    <div className="p-4 bg-[#EACA91]/90 text-black rounded-md">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-[#f0a04b] flex items-center justify-center overflow-hidden">
          <span className="font-bold text-xs">{creator.name.charAt(0)}</span>
        </div>
        <span className="font-medium">{creator.name}</span>
        <span className="ml-auto text-xs bg-black/10 px-2 py-1 rounded">Full View</span>
      </div>

      <h1 className="text-xl font-bold mb-3">{title}</h1>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1">
          <Heart className="w-5 h-5" />
          <span className="text-sm">{likes}</span>
        </button>
        <button className="flex items-center gap-1">
          <Laptop className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-1">
          <Share2 className="w-5 h-5" />
          <span className="text-sm">Share</span>
        </button>
      </div>
    </div>
  )
}

