import Image from "next/image"
import { Heart, Share2, User } from "lucide-react"
import Link from "next/link"
export interface ContentItemProps {
  id: string
  title: string
  imageUrl: string
  creator: {
    name: string
    avatar: string
  }
  likes: number
  views: number
}

export default function ContentCard({ id, title, imageUrl, creator, likes, views }: ContentItemProps) {
  return (
    <Link  href={`/content/${id}`}>
      <div
        className=" rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col cursor-pointer"
        style={{ width: "150px", height: "250px" }}
      >
        <div className="relative flex h-full">
          {/* Content Image - Left side */}
          <div className="relative w-[100px] h-full overflow-hidden">
            <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
            {/* Creator Avatar */}
            <div className="absolute bottom-2 left-2 flex items-center">
              <div className="w-5 h-5 rounded-full bg-[#EACA91] flex items-center justify-center overflow-hidden">
                <User className="w-3 h-3 text-black" />
              </div>
            </div>
          </div>

          {/* Content Info - Right side */}
          <div className="p-2 flex-1 flex flex-col justify-between">
            <h3 className="text-xs font-medium text-white line-clamp-2">{title}</h3>

            <div className="flex justify-between items-center text-[10px] text-gray-300 mt-auto">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                      stroke="currentColor"
                     strokeWidth="1.5"
                    />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  <span>{views}</span>
                </div>
              </div>

              <button className="p-1 hover:bg-white/10 rounded">
                <Share2 className="w-2 h-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

