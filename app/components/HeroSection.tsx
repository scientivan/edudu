import Link from "next/link";
// import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 ">
      
      {/* Bagian Teks Kiri */}
      <div className="md:col-span-6 flex flex-col justify-end ml-4 mb-6 pb-16">
        <h1 className="text-4xl font-bold text-[#EACA91] mb-2">
          Revolutionizing Education <br /> with AI-Generated Short Videos
        </h1>
        <p className="text-gray-300">Explore education with something interesting</p>
      </div>

      {/* Bagian Card */}
      <div className="md:col-span-6 grid grid-cols-2 gap-6">
        
        {/* Content Creator Card */}
        <div className="bg-[#1F3B5B] rounded-lg h-full p-6 flex flex-col items-center text-center glassmorphism">
          <img src="image.png" className="w-3xs" alt="" />
          <h2 className="text-2xl font-semibold mt-2 text-[#EACA91]">Content Creator</h2>
          <p className="text-gray-300 mb-24">Make something cool</p>
          <Link href="/creator" className="bg-[#EACA91] text-black font-semibold mt-auto px-6 py-2 rounded-md w-full">
            Try making content
          </Link>
        </div>

        {/* Non-Content Creator Card (Di Kanan) */}
        <div className="bg-[#1F3B5B] h-full rounded-lg p-6 flex flex-col items-center text-center glassmorphism">
          <img src="image.png" className="w-3xs" alt="" />
          <h2 className="text-2xl font-semibold mt-2 text-[#EACA91]">Non-Content Creator</h2>
          <p className="text-gray-300 mb-24">Explore something cool</p>
          <Link href="/explore" className="bg-[#EACA91] text-black font-semibold mt-auto px-6 py-2 rounded-md w-full">
            Explore
          </Link>
        </div>

      </div>
    </div>
    
  );
}
