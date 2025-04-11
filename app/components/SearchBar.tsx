"use client"
import { Search, X } from "lucide-react"
interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="relative w-full md:w-auto md:flex-1 max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-white border border-white/20 rounded-md py-2 pl-10 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-[#EACA91] text-gray-400"
      />
      {searchQuery && (
        <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <X className="h-5 w-5 text-gray-400 hover:text-white" />
        </button>
      )}
    </div>
  )
}

