"use client"

import { useEffect, useState } from "react"
// import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"
import SubjectFilter from "../components/explore/SubjectFilter"
import ContentGrid from "../components/explore/ContentGrid"
import type { ContentItemProps } from "../components/explore/ContentCard"
import { showContentsToViewPage } from "../components/api"
import { Content } from "../components/api"
export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [contentItems, setContentItems] = useState<ContentItemProps[]>([])

  const subjects = ["All Subjects", "Mathematics", "Science", "History", "Arts", "Languages", "Technology"]

  // Fetch content items once when page is visited
  useEffect(() => {
    const fetchContents = async () => {
      try {
        
        const contents = await showContentsToViewPage()
        const formattedContents: ContentItemProps[] = contents.map((item: Content) => ({
          title: item.title,
          imagesLink: item.imagesLink,
          likeCount: item.likeCount,
          watchCount: item.watchCount,
          // jika ada creator, bisa tambahkan juga
        }))
        setContentItems(formattedContents)
      } catch (error) {
        console.error("Failed to fetch contents:", error)
      }
    }

    fetchContents()
  }, [])

  const filteredContent = contentItems.filter((item) => {
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
