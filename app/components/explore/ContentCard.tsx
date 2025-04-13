import Image from "next/image";
import { Heart, Share2, User } from "lucide-react";
import Link from "next/link";

export interface ContentItemProps {
  _id?: string;
  title: string;
  imagesLink: string;
  likeCount: number;
  watchCount: number;
    // creator: {
  //   name: string;
  //   avatar: string;
  // };
}

export default function ContentCard({
  _id,
  title,
  imagesLink,
  // creator,
  likeCount,
  watchCount,
}: ContentItemProps) {
  return (
    <Link href={`/content/${_id}`}>
      <div
        className="rounded-lg overflow-hidden hover:shadow-lg transition-shadow flex flex-col bg-[#0D2B45] cursor-pointer"
        style={{ width: "150px", height: "250px" }}
      >
        {/* Gambar di atas */}
        <div className="relative w-full h-[150px] overflow-hidden">
          <Image
            src={imagesLink || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
          />

          {/* Avatar Creator */}
          <div className="absolute bottom-2 left-2 flex items-center">
            <div className="w-5 h-5 rounded-full bg-[#EACA91] flex items-center justify-center overflow-hidden">
              <User className="w-3 h-3 text-black" />
            </div>
          </div>
        </div>

        {/* Info konten */}
        <div className="p-2 flex-1 flex flex-col justify-between">
          <h3 className="text-xs font-medium text-white line-clamp-2">{title}</h3>

          <div className="flex justify-between items-center text-[10px] text-gray-300 mt-auto">
            <div className="flex items-center gap-2">
              {/* Like count */}
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{likeCount}</span>
              </div>

              {/* Watch count */}
              <div className="flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <span>{watchCount}</span>
              </div>
            </div>

            {/* Share */}
            <button className="p-1 hover:bg-white/10 rounded">
              <Share2 className="w-2 h-2" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
