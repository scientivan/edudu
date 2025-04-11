"use client"

import { useState } from "react"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import SubjectFilter from "../components/explore/SubjectFilter"
import ContentGrid from "../components/explore/ContentGrid"
import type { ContentItemProps } from "../components/explore/ContentCard"

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  
    // Placeholder subjects for the dropdown
    const subjects = ["All Subjects", "Mathematics", "Science", "History", "Arts", "Languages", "Technology"]
  
    // Placeholder content items
    const placeholderItems: ContentItemProps[] = Array(24)
      .fill(null)
      .map((_, index) => ({
        id: `content-${index}`,
        title: index % 2 === 0 ? "Even Title" : "Odd Title",
        imageUrl: index % 2 === 0 ? "/placeholder.svg?height=150&width=100" : "/placeholder.svg?height=150&width=100",
        creator: {
          name: "Creator Name",
          avatar: "/placeholder.svg?height=24&width=24",
        },
        likes: Math.floor(Math.random() * 100),
        views: Math.floor(Math.random() * 1000),
      }))
  
    // Filter content based on search query and subject
    const filteredContent = placeholderItems.filter((item) => {
      const matchesSearch = searchQuery === "" || item.title.toLowerCase().includes(searchQuery.toLowerCase())
  
      const matchesSubject = !selectedSubject || selectedSubject === "All Subjects"
  
      return matchesSearch && matchesSubject
    })
  
    return (
      <div className="min-h-screen text-white">
  
        <main className="container mx-auto px-4 py-8">
          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
  
            <SubjectFilter
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              subjects={subjects}
            />
          </div>
  
          {/* Content Grid */}
          <ContentGrid items={filteredContent} />
        </main>
      </div>
    )
  }

